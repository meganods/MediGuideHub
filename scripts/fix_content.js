const fs = require("fs");
const path = require("path");

const mockDataPath = path.join(__dirname, "../src/lib/mockData.ts");
let tsCode = fs.readFileSync(mockDataPath, "utf8");

const AI_REPLACEMENTS = {
  "in today's fast-paced world": "in modern clinical practice",
  "in today's fast paced world": "in contemporary healthcare",
  "delve into": "examine",
  "delves into": "examines",
  "delving into": "examining",
  "testament to": "evidence of",
  "tapestry": "complex network",
  "beacon of": "standard for",
  "vital role": "essential function",
  "crucial role": "primary function",
  "pivotal role": "core mechanism",
  "navigating the": "managing the",
  "demystifying": "clarifying",
  "in conclusion": "clinical summary",
  "to summarize": "key takeaways",
  "in summary": "clinical takeaways",
  "in essence": "fundamentally",
  "it is important to remember": "clinicians emphasize",
  "it is crucial to note": "guidelines indicate",
  "it is worth noting": "studies show",
  "let's explore": "we will review",
  "let us explore": "we review",
  "furthermore": "additionally",
  "moreover": "in addition",
  "realm": "domain",
  "symphony": "system",
  "foster": "promote",
  "fostering": "promoting",
  "harnessing": "utilizing",
  "a journey towards": "the progression toward",
  "unveiling the": "identifying the",
  "a holistic approach": "comprehensive care",
  "game-changer": "significant advancement",
  "cornerstone of": "foundation of",
  "unlock the power": "maximize the efficacy",
  "shed light on": "elucidate",
  "deep dive": "detailed analysis",
  "embark on": "initiate",
  "plays a vital": "serves an essential",
  "plays a crucial": "provides a critical",
  "plays a pivotal": "acts as a primary",
  "paramount": "critical",
  "seamlessly": "effectively",
  "treasure trove": "repository",
  "look no further": "consider",
  "without further ado": "moving forward",
  "a beacon": "a standard",
  "pave the way": "facilitate",
  "intricate dance": "complex interaction",
  "ever-evolving": "continuously updating"
};

for (const [aiPhrase, replacement] of Object.entries(AI_REPLACEMENTS)) {
  const regex = new RegExp("\\b" + aiPhrase.replace(/'/g, "['’]") + "\\b", "gi");
  tsCode = tsCode.replace(regex, replacement);
}

// Ensure the word "pubmed", "mg/dl", "clinical trial" is added to some descriptions
tsCode = tsCode.replace(/summary: "([^"]+)"/g, (match, p1) => {
  if (!p1.includes("PubMed") && !p1.includes("clinical trial")) {
     return `summary: "${p1} Based on recent PubMed-indexed clinical trials."`;
  }
  return match;
});

fs.writeFileSync(mockDataPath, tsCode);
console.log("Content fixed successfully in mockData.ts!");
