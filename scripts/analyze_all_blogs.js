const fs = require("fs");
const path = require("path");

function getMockPosts() {
  const tsCode = fs.readFileSync(path.join(__dirname, "../src/lib/mockData.ts"), "utf8");
  const startMarker = "export const INITIAL_BLOG_POSTS: BlogPost[] = [";
  const startIdx = tsCode.indexOf(startMarker);
  if (startIdx === -1) throw new Error("Could not find INITIAL_BLOG_POSTS in mockData.ts");

  const eqIdx = tsCode.indexOf("=", startIdx);
  const arrayStart = tsCode.indexOf("[", eqIdx);
  
  let depth = 0;
  let endIdx = arrayStart;
  for (let i = arrayStart; i < tsCode.length; i++) {
    if (tsCode[i] === "[") depth++;
    else if (tsCode[i] === "]") {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  const jsonStr = tsCode.slice(arrayStart, endIdx);
  return JSON.parse(jsonStr);
}

function extractFullText(post) {
  let parts = [
    post.title || "",
    post.summary || "",
    post.quickAnswer || "",
    post.introduction || "",
    post.content || ""
  ];

  if (Array.isArray(post.contentBlocks)) {
    for (const block of post.contentBlocks) {
      if (block.heading) parts.push(block.heading);
      if (block.content) parts.push(block.content);
      if (Array.isArray(block.items)) parts.push(...block.items);
      if (Array.isArray(block.headers)) parts.push(...block.headers);
      if (Array.isArray(block.rows)) {
        for (const row of block.rows) {
          if (Array.isArray(row)) parts.push(...row);
        }
      }
    }
  }

  if (Array.isArray(post.clinicalPearls)) {
    parts.push(...post.clinicalPearls);
  }

  if (Array.isArray(post.faqs)) {
    for (const faq of post.faqs) {
      if (faq.question) parts.push(faq.question);
      if (faq.answer) parts.push(faq.answer);
    }
  }

  if (Array.isArray(post.sections)) {
    for (const sec of post.sections) {
      if (sec.heading) parts.push(sec.heading);
      if (sec.content) parts.push(sec.content);
      if (Array.isArray(sec.subsections)) {
        for (const sub of sec.subsections) {
          if (sub.heading) parts.push(sub.heading);
          if (sub.content) parts.push(sub.content);
        }
      }
    }
  }

  return parts.join("\n\n");
}

// AI Cliches, Formulaic Transitions, and Filler Phrases
const AI_PATTERNS = [
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
  "fostering",
  "harnessing",
  "a journey towards",
  "unveiling the",
  "a holistic approach",
  "game-changer",
  "cornerstone of",
  "unlock the power",
  "shed light on",
  "embark on",
  "plays a vital",
  "plays a crucial",
  "plays a pivotal",
  "paramount",
  "seamlessly",
  "treasure trove",
  "look no further",
  "without further ado",
  "a beacon",
  "pave the way",
  "intricate dance",
  "ever-evolving"
];

// High-Value Clinical/Medical Precision Terms (Human clinician signature)
const CLINICAL_PRECISION_TERMS = [
  "lsas", "liebowitz", "dsm-5", "diaphoresis", "sertraline", "ssri", "hyperarousal", "sige", "mast cell", "degranulation", "epinephrine", "anaphylaxis", "skin prick", "ahi", "polysomnography", "hypopnea", "cpap", "stop-bang", "homa-ir", "macroautophagy", "time-restricted eating", "asrs-v1.1", "diva-5", "temporal discounting", "frontostriatal", "myocardial infarction", "allodynia", "hyperesthesia", "coxsackievirus", "roseola infantum", "filaggrin", "petechiae", "breslow depth", "dermatoscopy", "melanocytic", "postherpetic neuralgia", "phn", "dorsal root", "varicella-zoster", "oncoproteins", "p53", "cervical", "oropharyngeal", "9-valent", "scfas", "short-chain fatty acids", "butyrate", "enteric", "claudication", "ankle-brachial index", "holter", "premature ventricular contraction", "premature atrial contraction", "levator ani", "stress urinary incontinence", "biofeedback", "international prostate symptom score", "ipss", "tamsulosin", "finasteride", "oral rehydration salts", "hypernatremic", "purpura fulminans", "menacwy", "menb", "tetanospasmin", "dtap", "rome iv", "low-fodmap", "bifidobacteria",
  "mg/dl", "ng/ml", "pg/ml", "hba1c", "mmhg", "uspstf", "pubmed", 
  "randomized controlled", "dosage", "contraindication", "pharmacokinetics", 
  "bioavailability", "differential diagnosis", "etiology", "pathophysiology", 
  "serum ferritin", "transferrin saturation", "microcytic", "macrocytic", 
  "methylmalonic acid", "homocysteine", "intrinsic factor", "cholecalciferol", 
  "ergocalciferol", "steatohepatitis", "fibroscan", "transaminase",
  "thiazide", "ace inhibitor", "arb", "calcium channel blocker", "statin",
  "vo2 max", "sarcopenia", "hypertrophy", "delayed onset muscle soreness",
  "cortisol", "hpa axis", "allostatic load", "vagal tone", "parasympathetic",
  "mammography", "pap smear", "dexa scan", "osteopenia", "osteoporosis",
  "bariatric", "atrophic gastritis", "parietal cell", "folate", "reticulocyte",
  "mcv", "rdw", "hepcidin", "total iron binding capacity", "tibc",
  "alt", "ast", "ggt", "masld", "mash", "nafld", "nash",
  "endothelial", "nitric oxide", "dash diet", "sodium reduction",
  "cardiorespiratory", "resistance training", "progressive overload",
  "interstitial", "time in range", "retinopathy", "microaneurysm",
  "egfr", "uacr", "beers criteria", "deprescribing", "agatston",
  "calcification", "cgrp", "otitis media", "tympanic", "antipyretic"
];

function analyzePost(post) {
  const fullText = extractFullText(post);
  const words = fullText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // 1. Buzzword Matches
  const buzzwordMatches = [];
  let buzzwordCount = 0;
  for (const phrase of AI_PATTERNS) {
    const regex = new RegExp("\\b" + phrase.replace(/'/g, "['’]") + "\\b", "gi");
    const matches = fullText.match(regex);
    if (matches) {
      buzzwordCount += matches.length;
      buzzwordMatches.push({ phrase, count: matches.length });
    }
  }

  // 2. Clinical Term Matches
  const clinicalMatches = [];
  let clinicalCount = 0;
  for (const term of CLINICAL_PRECISION_TERMS) {
    const regex = new RegExp("\\b" + term.replace(/\//g, "\\/") + "\\b", "gi");
    const matches = fullText.match(regex);
    if (matches) {
      clinicalCount += matches.length;
      clinicalMatches.push({ term, count: matches.length });
    }
  }

  // 3. Sentence Length Standard Deviation (Burstiness)
  const sentences = fullText.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgSentLength = sentenceLengths.length ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length : 0;
  const variance = sentenceLengths.length
    ? sentenceLengths.reduce((a, b) => a + Math.pow(b - avgSentLength, 2), 0) / sentenceLengths.length
    : 0;
  const stdDev = Math.sqrt(variance);

  // 4. Rate per 1,000 words
  const buzzwordDensity = wordCount > 0 ? (buzzwordCount / wordCount) * 1000 : 0;
  const clinicalDensity = wordCount > 0 ? (clinicalCount / wordCount) * 1000 : 0;

  // 5. Structure
  const hasClinicalPearls = Array.isArray(post.clinicalPearls) && post.clinicalPearls.length > 0;
  const hasReferences = Array.isArray(post.references) && post.references.length > 0;
  const hasContentBlocks = Array.isArray(post.contentBlocks) && post.contentBlocks.length > 0;
  const hasFaqs = Array.isArray(post.faqs) && post.faqs.length > 0;

  // Composite AI Likelihood Score
  // Baseline = 35
  let score = 35;

  // Factor 1: AI Buzzwords density
  score += buzzwordDensity * 12;

  // Factor 2: Lack of clinical specific markers
  if (clinicalDensity < 2.0) score += 18;
  else if (clinicalDensity < 4.0) score += 8;
  else if (clinicalDensity > 8.0) score -= 15;
  else if (clinicalDensity > 5.0) score -= 8;

  // Factor 3: Sentence Burstiness / Perplexity
  // Low stdDev (< 7) indicates repetitive AI phrasing
  if (stdDev < 6.5) score += 12;
  else if (stdDev > 12) score -= 10;

  // Factor 4: Generic Conclusion check
  if (/in conclusion|to wrap up|in summary|final thoughts/i.test(fullText)) {
    score += 8;
  }

  // Factor 5: References & Clinical Depth bonus
  if (hasReferences) score -= 10;
  if (hasClinicalPearls) score -= 6;
  if (hasContentBlocks) score -= 4;

  const aiScore = Math.max(5, Math.min(95, Math.round(score)));
  const humanScore = 100 - aiScore;

  return {
    id: post.id,
    title: post.title || post.metaTitle,
    slug: post.slug,
    category: post.category || "General",
    wordCount,
    aiScore,
    humanScore,
    buzzwordCount,
    buzzwordDensity: parseFloat(buzzwordDensity.toFixed(2)),
    topBuzzwords: buzzwordMatches.sort((a, b) => b.count - a.count).slice(0, 5),
    clinicalCount,
    clinicalDensity: parseFloat(clinicalDensity.toFixed(2)),
    topClinical: clinicalMatches.sort((a, b) => b.count - a.count).slice(0, 6),
    sentenceAvg: parseFloat(avgSentLength.toFixed(1)),
    sentenceStdDev: parseFloat(stdDev.toFixed(1)),
    referenceCount: Array.isArray(post.references) ? post.references.length : 0
  };
}

const posts = getMockPosts();
console.log(`Analyzing total ${posts.length} articles...`);

const results = posts.map(analyzePost);
results.sort((a, b) => b.aiScore - a.aiScore);

fs.writeFileSync(
  path.join(__dirname, "blog_ai_analysis_report.json"),
  JSON.stringify(results, null, 2)
);

console.log("\n--- TOP 10 HIGHEST AI CONTENT PROBABILITY BLOGS ---");
results.slice(0, 10).forEach((r, i) => {
  console.log(`${i + 1}. [AI Score: ${r.aiScore}% | Human: ${r.humanScore}%] ${r.title}`);
  console.log(`   Slug: /blog/${r.slug} | Words: ${r.wordCount} | Buzzwords: ${r.buzzwordCount} (${r.buzzwordDensity}/1k) | Clinical: ${r.clinicalCount} (${r.clinicalDensity}/1k)`);
  if (r.topBuzzwords.length) console.log(`   AI markers: ${r.topBuzzwords.map(b => `"${b.phrase}" (${b.count})`).join(", ")}`);
});

console.log("\n--- TOP 10 LOWEST AI (MOST HUMAN / CLINICAL) BLOGS ---");
results.slice(-10).reverse().forEach((r, i) => {
  console.log(`${i + 1}. [Human Score: ${r.humanScore}% | AI: ${r.aiScore}%] ${r.title}`);
  console.log(`   Slug: /blog/${r.slug} | Words: ${r.wordCount} | References: ${r.referenceCount} | Clinical Density: ${r.clinicalDensity}/1k`);
  if (r.topClinical.length) console.log(`   Key Clinical Terms: ${r.topClinical.map(c => `"${c.term}" (${c.count})`).join(", ")}`);
});
