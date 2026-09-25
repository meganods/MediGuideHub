const fs = require("fs");
const path = require("path");

// Load Firestore posts
async function getAllPosts() {
  let firestorePosts = [];
  try {
    const { initializeApp, cert, getApps } = require("firebase-admin/app");
    const { getFirestore } = require("firebase-admin/firestore");
    const serviceAccount = require("../firebase-service-account.json");
    if (!getApps().length) {
      initializeApp({ credential: cert(serviceAccount) });
    }
    const db = getFirestore();
    const snap = await db.collection("posts").get();
    firestorePosts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Firestore read error:", e.message);
  }

  return firestorePosts;
}

// AI Detection indicators based on standard NLP / LLM perplexity and stylistic analysis
const AI_BUZZWORDS = [
  "in today's fast-paced world",
  "in today's fast paced world",
  "delve into",
  "delves into",
  "delving into",
  "testament to",
  "tapestry",
  "beacon of",
  "vital role",
  "crucial role",
  "pivotal role",
  "navigating the",
  "demystifying",
  "in conclusion",
  "to summarize",
  "in summary",
  "in essence",
  "it is important to remember",
  "it is crucial to note",
  "it is worth noting",
  "let's explore",
  "let us explore",
  "furthermore",
  "moreover",
  "consequently",
  "realm",
  "symphony",
  "foster",
  "harnessing",
  "a journey towards",
  "unveiling the",
  "a holistic approach",
  "game-changer",
  "cornerstone of",
  "unlock the power",
  "shed light on",
  "deep dive",
  "embark on",
  "plays a vital",
  "plays a crucial",
  "plays a pivotal"
];

// Clinical / Human Specificity Markers
const CLINICAL_SPECIFICITY_MARKERS = [
  "mg/dl",
  "ng/ml",
  "pg/ml",
  "hba1c",
  "mmhg",
  "uspstf",
  "pubmed",
  "clinical trial",
  "randomized controlled",
  "dosage",
  "contraindication",
  "pharmacokinetics",
  "bioavailability",
  "differential diagnosis",
  "etiology",
  "pathophysiology",
  "serum ferritin",
  "transferrin saturation",
  "microcytic",
  "macrocytic",
  "methylmalonic acid",
  "homocysteine",
  "intrinsic factor",
  "cholecalciferol",
  "ergocalciferol",
  "steatohepatitis",
  "fibroscan",
  "transaminase"
];

function analyzeArticle(post) {
  const text = (post.title + " " + (post.excerpt || "") + " " + (post.content || "")).toLowerCase();
  const rawContent = post.content || "";
  
  // Word count
  const words = rawContent.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // 1. Buzzword Matches
  const buzzwordMatches = [];
  let buzzwordCount = 0;
  for (const phrase of AI_BUZZWORDS) {
    const regex = new RegExp("\\b" + phrase.replace(/'/g, "['’]") + "\\b", "gi");
    const matches = rawContent.match(regex);
    if (matches) {
      buzzwordCount += matches.length;
      buzzwordMatches.push({ phrase, count: matches.length });
    }
  }

  // 2. Clinical Specificity Matches
  const clinicalMatches = [];
  let clinicalCount = 0;
  for (const marker of CLINICAL_SPECIFICITY_MARKERS) {
    const regex = new RegExp("\\b" + marker + "\\b", "gi");
    const matches = text.match(regex);
    if (matches) {
      clinicalCount += matches.length;
      clinicalMatches.push({ marker, count: matches.length });
    }
  }

  // 3. Sentence Length Uniformity (Low Variance = AI tendency)
  const sentences = rawContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgSentLength = sentenceLengths.length ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length : 0;
  const variance = sentenceLengths.length
    ? sentenceLengths.reduce((a, b) => a + Math.pow(b - avgSentLength, 2), 0) / sentenceLengths.length
    : 0;
  const stdDev = Math.sqrt(variance);

  // 4. Repetitive transition density (per 1000 words)
  const buzzwordDensityPer1k = wordCount > 0 ? (buzzwordCount / wordCount) * 1000 : 0;
  const clinicalDensityPer1k = wordCount > 0 ? (clinicalCount / wordCount) * 1000 : 0;

  // 5. Structural template indicators (e.g. bolded header colons, bullet list density)
  const boldColonHeaders = (rawContent.match(/(\*\*|###)[^\n:]+:/g) || []).length;
  const bulletCount = (rawContent.match(/^\s*[-*]\s+/gm) || []).length;

  // Calculate composite AI Probability Score (0 to 100)
  // Higher score = More AI traits; Lower score = More Human / Clinical depth
  let aiScore = 50; // baseline

  // Factor 1: Buzzwords
  aiScore += buzzwordDensityPer1k * 8;

  // Factor 2: Clinical specificity deduction
  aiScore -= clinicalDensityPer1k * 5;

  // Factor 3: Sentence burstiness (Human writing has high stdDev > 9, AI has low stdDev 4-7)
  if (stdDev < 6) aiScore += 10;
  else if (stdDev > 10) aiScore -= 10;

  // Factor 4: Generic conclusions
  if (/in conclusion|to wrap up|in summary|final thoughts/i.test(rawContent)) {
    aiScore += 8;
  }

  // Clamp 0 to 100
  aiScore = Math.max(5, Math.min(95, Math.round(aiScore)));

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category || post.categoryName || "Health",
    wordCount,
    aiScore,
    buzzwordCount,
    buzzwordDensityPer1k: buzzwordDensityPer1k.toFixed(1),
    topBuzzwords: buzzwordMatches.slice(0, 5),
    clinicalCount,
    clinicalDensityPer1k: clinicalDensityPer1k.toFixed(1),
    topClinical: clinicalMatches.slice(0, 5),
    stdDev: stdDev.toFixed(1),
    bulletCount
  };
}

async function run() {
  const posts = await getAllPosts();
  console.log(`Analyzing ${posts.length} blog posts...\n`);

  const results = posts.map(analyzeArticle);

  // Sort descending by AI score (Most AI first)
  results.sort((a, b) => b.aiScore - a.aiScore);

  console.log("=== AI CONTENT ANALYSIS RESULTS ===");
  results.forEach((r, idx) => {
    console.log(`\n#${idx + 1} [AI Score: ${r.aiScore}%] ${r.title}`);
    console.log(`   Slug: /blog/${r.slug}`);
    console.log(`   Words: ${r.wordCount} | Buzzwords: ${r.buzzwordCount} (${r.buzzwordDensityPer1k}/1k w) | Clinical Terms: ${r.clinicalCount} (${r.clinicalDensityPer1k}/1k w) | Sentence StdDev: ${r.stdDev}`);
    if (r.topBuzzwords.length) {
      console.log(`   Frequent AI Clichés: ${r.topBuzzwords.map(b => `"${b.phrase}" (${b.count})`).join(", ")}`);
    }
    if (r.topClinical.length) {
      console.log(`   Clinical Markers: ${r.topClinical.map(c => `"${c.marker}" (${c.count})`).join(", ")}`);
    }
  });

  // Save detailed JSON report
  fs.writeFileSync(
    path.join(__dirname, "ai_content_report.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("\nSaved detailed report to scripts/ai_content_report.json");
}

run();
