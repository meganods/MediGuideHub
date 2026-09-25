const fs = require("fs");
const path = require("path");

const mockDataPath = path.join(__dirname, "../src/lib/mockData.ts");
let tsCode = fs.readFileSync(mockDataPath, "utf8");

// Specific humanization and clinical enrichment rules for each category/post

// 1. Social Anxiety Disorder
tsCode = tsCode.replace(
  "\"introduction\": \"Social anxiety disorder (SAD), also termed social phobia, is far more than everyday shyness or occasional performance jitters. It is a persistent, debilitating psychiatric condition characterized by intense fear of being scrutinized, judged, or humiliated in social or performance settings.\",",
  "\"introduction\": \"In outpatient psychiatry, patients often spend years attributing their distress to 'severe introversion' before recognizing they meet clinical criteria for Social Anxiety Disorder (SAD). Unlike ordinary stage fright, SAD triggers autonomic hyperarousal—racing heart, tremor, diaphoresis, and visceral GI distress—in routine interpersonal interactions. Diagnostic validation via the Liebowitz Social Anxiety Scale (LSAS score > 30) and structured Cognitive Behavioral Therapy (CBT with in vivo exposure) offer evidence-based pathways to reclaiming vocational and social functioning.\","
);

// 2. Childhood Food Allergies
tsCode = tsCode.replace(
  "\"introduction\": \"Childhood food allergies have increased substantially in prevalence over recent decades, affecting approximately 8% of children globally. This condition occurs when the immune system mistakenly identifies harmless food proteins as dangerous invaders, launching an IgE-mediated or non-IgE-mediated inflammatory attack.\",",
  "\"introduction\": \"Pediatric food allergy visits have surged over the past two decades, presenting significant diagnostic and emotional challenges for families. True allergic responses are primarily type 1 hypersensitivities mediated by specific immunoglobulin E (sIgE antibodies), causing mast cell degranulation and histamine release within minutes of ingestion. Differentiating true IgE allergy (diagnosed via skin prick testing and serum IgE > 0.35 kU/L) from non-immune food intolerances is critical for avoiding unnecessary childhood dietary restrictions while maintaining life-saving emergency anaphylaxis protocols (epinephrine auto-injectors).\""
);

// 3. Obstructive Sleep Apnea (OSA)
tsCode = tsCode.replace(
  "\"introduction\": \"Obstructive Sleep Apnea (OSA) is a serious, highly prevalent sleep-related breathing disorder characterized by repetitive partial or complete collapse of the upper airway during sleep. Despite affecting an estimated 1 billion individuals worldwide, approximately 80% of moderate-to-severe cases remain undiagnosed.\",",
  "\"introduction\": \"In clinical practice, Obstructive Sleep Apnea (OSA) is one of the most underdiagnosed drivers of resistant hypertension, nocturnal arrhythmias, and secondary metabolic disease. When pharyngeal airway muscle tone relaxes during REM and deep NREM sleep, mechanical airway collapse produces repetitive hypopneas and apneas. This triggers cyclical nocturnal oxygen desaturations and intense sympathetic surges. Screening with the validated STOP-Bang questionnaire and home or in-lab polysomnography (confirming an Apnea-Hypopnea Index, AHI $\\ge 5$ events/hour) provides the foundation for transformative CPAP and positional therapies.\""
);

// 4. Intermittent Fasting & Autophagy
tsCode = tsCode.replace(
  "\"introduction\": \"Intermittent fasting (IF) has emerged as one of the most researched nutritional interventions in metabolic health and longevity science. Unlike conventional diets that focus strictly on what to eat, intermittent fasting structures when you eat, aligning nutrient intake with circadian biology.\",",
  "\"introduction\": \"From an endocrinology perspective, intermittent fasting (IF) shifts metabolic substrate utilization from continuous glucose oxidation toward hepatic fatty acid oxidation and ketogenesis. During sustained fasting windows exceeding 14 to 16 hours, declining circulating insulin levels activate cellular macroautophagy—the lysosomal degradation and recycling of senescent organelles and misfolded proteins. When combined with adequate protein intake (1.2–1.6 g/kg/day) during feeding windows, structured time-restricted eating (16/8 protocol) offers measurable improvements in HOMA-IR insulin sensitivity without inducing sarcopenia.\""
);

// 5. Adult ADHD
tsCode = tsCode.replace(
  "\"introduction\": \"Attention-Deficit/Hyperactivity Disorder (ADHD) is frequently mischaracterized as a condition exclusive to childhood. In reality, longitudinal clinical studies demonstrate that up to 60% of children diagnosed with ADHD continue to experience clinically significant symptoms throughout adulthood.\",",
  "\"introduction\": \"In adult psychiatric evaluations, ADHD frequently masquerades as chronic anxiety, mood instability, or career burnout. Adult ADHD is fundamentally a neurodevelopmental deficit in executive function and frontostriatal dopamine-norepinephrine signaling rather than simple physical hyperactivity. Adults with undiagnosed ADHD experience significant impairment in working memory, task initiation, and time estimation (temporal discounting). Using standardized diagnostic tools (such as the ASRS-v1.1 screener and DIVA-5 clinical interview) enables tailored multimodal treatment combining CBT scaffolding with optimized pharmacotherapy.\""
);

// 6. Panic Attacks vs Anxiety Attacks
tsCode = tsCode.replace(
  "\"introduction\": \"While the terms 'panic attack' and 'anxiety attack' are frequently used interchangeably in everyday conversation, they represent distinct psychological and physiological phenomena with different triggers, timelines, and clinical presentations.\",",
  "\"introduction\": \"Patients entering emergency departments with their first panic attack almost invariably believe they are experiencing an acute myocardial infarction. While chronic anxiety builds gradually in response to identifiable stressors, a panic attack is an abrupt surge of catastrophic physical terror that peaks within 10 minutes. Distinguishing between somatic sympathetic discharge (racing pulse, paresthesias, air hunger) and generalized anticipatory anxiety allows clinicians and patients to deploy targeted physiological down-regulation tools—such as cyclic physiological sighing and interoceptive exposure.\""
);

// 7. Common Childhood Rashes
tsCode = tsCode.replace(
  "\"introduction\": \"Dermatological symptoms represent one of the most frequent reasons parents seek pediatric medical evaluation. From sudden viral exanthems to chronic inflammatory conditions like eczema, childhood rashes can appear alarmingly dramatic.\",",
  "\"introduction\": \"In pediatric urgent care, skin eruptions are among the most common parental chief complaints. Distinguishing between benign self-limiting viral exanthems (such as Coxsackievirus Hand-Foot-and-Mouth or Roseola infantum) and immune-mediated dermatoses (like atopic dermatitis with epidermal barrier filaggrin mutations) requires meticulous examination of lesion morphology, blanching characteristics, and mucosal involvement. Understanding non-blanching petechiae red flags provides critical reassurance while safeguarding against invasive meningococcal infections.\""
);

// 8. Skin Cancer Screenings (ABCDE Rule)
tsCode = tsCode.replace(
  "\"introduction\": \"Skin cancer is by far the most commonly diagnosed malignancy worldwide, yet when detected in its earliest, localized stages, melanoma has a 5-year relative survival rate exceeding 99%.\",",
  "\"introduction\": \"In clinical dermatology, early detection is the single greatest determinant of melanoma prognosis: localized stage I melanoma carries a 5-year survival rate of >99%, whereas metastatic stage IV disease drops significantly. Moles and pigmented skin lesions undergo continuous micro-evolution driven by ultraviolet DNA damage. Utilizing dermatoscopy and the evidence-based ABCDE criteria (Asymmetry, Border irregularity, Color variegation, Diameter >6mm, and Evolution) equips patients and clinicians to identify suspicious melanocytic changes long before Breslow depth invasion occurs.\""
);

// 9. Shingles Vaccine (Shingrix)
tsCode = tsCode.replace(
  "\"introduction\": \"Herpes zoster, commonly known as shingles, is a painful neurocutaneous condition caused by the reactivation of the dormant Varicella-Zoster Virus (VZV)—the same virus responsible for chickenpox.\",",
  "\"introduction\": \"Nearly 99% of adults born before 1980 harbor latent Varicella-Zoster Virus (VZV) residing dormant in their dorsal root and cranial sensory ganglia. As cellular immunity wanes with aging (immunosenescence), the virus reactivates, migrating along sensory nerve axons to produce unilateral dermatomal vesicular lesions and excruciating neuropathic pain. The recombinant subunit adjuvanted vaccine (Shingrix) provides >90% clinical protection against debilitating postherpetic neuralgia (PHN), representing one of the most impactful preventive interventions for adults aged 50 and older.\""
);

// 10. HPV Vaccine Cancer Prevention
tsCode = tsCode.replace(
  "\"introduction\": \"Human Papillomavirus (HPV) is the most common sexually transmitted infection in the world, so prevalent that nearly every sexually active person will contract it at some point in their lifetime.\",",
  "\"introduction\": \"In oncology, the 9-valent Human Papillomavirus (HPV) vaccine represents a literal cancer-preventing milestone. High-risk oncogenic HPV serotypes (predominantly HPV-16 and HPV-18) integrate viral oncoproteins E6 and E7 into host epithelial DNA, degrading the p53 tumor suppressor protein and driving over 90% of cervical, anal, and oropharyngeal carcinomas. Administering the 9-valent vaccine during the recommended age windows (ages 9–14 for the 2-dose series; 15–26 for the 3-dose series) creates durable neutralizing antibody titers that virtually eradicate preventable HPV-related malignancies.\""
);

// 11. Pneumococcal Vaccine (PCV20 & PPSV23)
tsCode = tsCode.replace(
  "\"introduction\": \"Streptococcus pneumoniae (pneumococcus) is a major bacterial pathogen capable of causing severe, invasive infections including community-acquired pneumonia, bacteremia, and bacterial meningitis in older adults and immunocompromised individuals.\",",
  "\"introduction\": \"In geriatric and pulmonary medicine, Streptococcus pneumoniae remains a leading cause of preventable bacteremic pneumonia and sepsis. Older adults experience heightened vulnerability due to blunted mucosal ciliary clearance and splenic antibody declines. The modern conjugate vaccine (PCV20) elicits a robust T-cell-dependent immune memory response against 20 polysaccharide capsular serotypes, providing lifetime protection without the need for complex multi-vaccine scheduling in healthy seniors aged 65 and older.\""
);

// 12. Gut Microbiome & Brain Axis
tsCode = tsCode.replace(
  "\"introduction\": \"The human gut microbiome—a complex ecosystem of over 100 trillion microorganisms residing primarily in the large intestine—has revolutionized our understanding of human health, digestion, immunity, and neuropsychiatry.\",",
  "\"introduction\": \"The gastrointestinal tract houses over 100 trillion symbiotic microorganisms that function as a metabolically active endocrine and immune organ. Through the bidirectional gut-brain-microbiome axis, bacterial fermentation of prebiotic dietary fibers produces short-chain fatty acids (SCFAs like butyrate, acetate, and propionate) that modulate vagal nerve afferent signaling, blood-brain barrier integrity, and enteric serotonin synthesis (over 90% of bodily serotonin originates in the gut). Supporting microbial diversity through 30+ varied plant foods weekly directly enhances mucosal barrier tight junctions and downregulates systemic neuroinflammation.\""
);

// 13. Peripheral Artery Disease (PAD)
tsCode = tsCode.replace(
  "\"introduction\": \"Peripheral Artery Disease (PAD) is a common circulatory disorder characterized by atherosclerotic narrowing of the peripheral arteries, most frequently affecting the lower extremities.\",",
  "\"introduction\": \"In vascular cardiology, lower extremity Peripheral Artery Disease (PAD) is an unmistakable bellwether for systemic atherosclerosis: over 60% of patients with symptomatic claudication also have significant coronary or cerebrovascular disease. When arterial lumen narrowing restricts blood flow to working leg muscles during ambulation, ischemia produces cramping calf pain (intermittent claudication) relieved by rest. Non-invasive diagnosis using the Ankle-Brachial Index (ABI < 0.90 is diagnostic) combined with supervised exercise therapy and statin/antiplatelet therapy dramatically improves pain-free walking distance and limb salvage rates.\""
);

// 14. Heart Palpitations (PVCs & PACs)
tsCode = tsCode.replace(
  "\"introduction\": \"Heart palpitations—the subjective sensation of a fluttering, pounding, racing, or skipped heartbeat—are among the most common cardiac symptoms prompting medical consultation.\",",
  "\"introduction\": \"Experiencing a sudden 'thump,' flutter, or skipped heartbeat is an alarming sensation that prompts countless emergency department visits. In the vast majority of patients with structurally normal hearts, these sensations reflect benign ectopy: Premature Ventricular Contractions (PVCs) or Premature Atrial Contractions (PACs) where a compensatory pause causes the subsequent normal beat to feel unusually forceful. Meticulous clinical evaluation with 12-lead ECG, ambulatory 24-to-48-hour Holter monitoring, and serum electrolyte checks (magnesium > 2.0 mg/dL, potassium 4.0–4.5 mEq/L) helps differentiate benign ectopy from dangerous reentrant tachyarrhythmias.\""
);

// 15. Pelvic Floor Dysfunction
tsCode = tsCode.replace(
  "\"introduction\": \"Pelvic floor dysfunction is an umbrella term encompassing a spectrum of disorders that arise when the muscles, ligaments, and connective tissues supporting the pelvic organs become weakened, overactive, or uncoordinated.\",",
  "\"introduction\": \"Despite affecting up to one in three women and millions of men, pelvic floor dysfunction remains cloaked in silence and misdiagnosis. The pelvic diaphragm is a complex dynamic hammock of muscles supporting the bladder, bowel, and uterus. Symptoms range from stress urinary incontinence (intra-abdominal pressure spikes from coughing or exercise) to hypertonic pelvic floor tightness and levator ani spasm. Evaluation by a certified pelvic floor physical therapist using biofeedback and individualized manual release provides far superior clinical resolution compared to unsupervised generic Kegel exercises.\""
);

// 16. BPH (Enlarged Prostate)
tsCode = tsCode.replace(
  "\"introduction\": \"Benign Prostatic Hyperplasia (BPH) is an age-related non-cancerous enlargement of the prostate gland that affects approximately 50% of men in their 50s and up to 90% of men over age 80.\",",
  "\"introduction\": \"In clinical urology, Benign Prostatic Hyperplasia (BPH) is an almost universal histological finding as men age, driven by intraprostatic dihydrotestosterone (DHT) binding. As the transition zone of the prostate hypertrophies, it exerts mechanical compression on the prostatic urethra, leading to lower urinary tract symptoms (LUTS): nocturia, urinary hesitancy, and post-void dribbling. Evaluating symptom severity via the International Prostate Symptom Score (IPSS), checking serum Prostate-Specific Antigen (PSA), and deploying targeted therapies (alpha-1 blockers like tamsulosin or 5-alpha reductase inhibitors like finasteride) restores bladder emptying efficiency and prevents urinary retention.\""
);

// 17. Pediatric Dehydration & ORS
tsCode = tsCode.replace(
  "\"introduction\": \"Dehydration is one of the most critical complications of acute pediatric gastrointestinal illness, posing significant risks to infants and young children whose total body water percentage is substantially higher than adults.\",",
  "\"introduction\": \"In pediatric emergency medicine, acute gastroenteritis-induced dehydration is a high-priority clinical concern. Because infants have a higher surface-area-to-volume ratio and higher metabolic water turnover than adults, fluid deficits progress rapidly. Deploying low-osmolarity Oral Rehydration Salts (ORS with 75 mEq/L sodium and 75 mmol/L glucose) exploits sodium-glucose co-transport mechanisms in the intestinal brush border to maximize rapid fluid absorption, reducing the need for IV line placement by over 80% while avoiding dangerous hypernatremic complications.\""
);

// 18. Meningococcal Vaccines (MenACWY & MenB)
tsCode = tsCode.replace(
  "\"introduction\": \"Meningococcal disease is a rare but devastating bacterial infection caused by Neisseria meningitidis that can progress from mild flu-like symptoms to life-threatening bacterial meningitis or fulminant septic shock within 24 hours.\",",
  "\"introduction\": \"In adolescent and college health, invasive meningococcal disease caused by *Neisseria meningitidis* is one of the fastest-moving bacterial emergencies in medicine: a healthy teen can deteriorate from nonspecific fever and headache to fulminant purpura fulminans septic shock in less than 24 hours. Full immunization requires two distinct vaccines: the MenACWY conjugate vaccine (administered at age 11–12 with a booster at 16) and the separate Serogroup B (MenB) vaccine, ensuring comprehensive humoral bactericidal protection in high-density communal living environments.\""
);

// 19. Tdap Booster Schedule
tsCode = tsCode.replace(
  "\"introduction\": \"The Tdap vaccine provides combined protection against three serious bacterial infections: tetanus (lockjaw), diphtheria, and pertussis (whooping cough). While most adults completed their childhood primary vaccine series, immunity against these pathogens declines significantly over time.\",",
  "\"introduction\": \"In primary care and prenatal clinics, maintaining up-to-date Tdap (Tetanus, Diphtheria, and acellular Pertussis) protection is a dual strategy: preserving personal immunity against acute puncture wound clostridial tetanospasmin toxin, and 'cocooning' newborns from life-threatening whooping cough. Administering maternal Tdap between 27 and 36 weeks of each pregnancy stimulates high-affinity maternal IgG antibodies that cross the placenta, providing the neonate with vital passive immunity during the first two months of life prior to their own infant DTaP series.\""
);

// 20. Irritable Bowel Syndrome (IBS) & Low-FODMAP
tsCode = tsCode.replace(
  "\"introduction\": \"Irritable Bowel Syndrome (IBS) is a prevalent functional gastrointestinal disorder characterized by recurrent abdominal pain, bloating, and altered bowel habits (diarrhea, constipation, or alternating patterns) in the absence of organic structural disease.\",",
  "\"introduction\": \"In gastroenterology, Irritable Bowel Syndrome (IBS) is recognized as a disorder of gut-brain interaction (DGBI) involving visceral hypersensitivity, altered gut motility, and low-grade mucosal immune activation rather than a purely psychological issue. Using the Rome IV diagnostic criteria, clinicians categorize IBS into IBS-D (diarrhea), IBS-C (constipation), or IBS-M (mixed). A structured, three-phase Low-FODMAP diet (Elimination for 2–6 weeks, Systematic Reintroduction, and Personalization) successfully resolves chronic bloating and pain in over 70% of patients without permanently depleting beneficial bifidobacteria.\""
);

fs.writeFileSync(mockDataPath, tsCode, "utf8");
console.log("Successfully humanized all 20 targeted blog articles in mockData.ts!");
