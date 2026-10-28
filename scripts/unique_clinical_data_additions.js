// Unique Third Clinical Blocks for Posts needing word count expansion to reach 1,550-1,850 words
// Completely unique, disease-specific clinical guidelines and diagnostic protocols

module.exports = {
  "migraine-vs-tension-headache-aura-cgrp-treatment": {
    id: "block-migraine-snoop4-triptan-table",
    type: "diagnostic_criteria",
    heading: "Diagnostic Algorithm: ICHD-3 Differential Matrix & Red-Flag SNOOP4 Triage",
    content: "When evaluating acute headaches, clinicians must systematically exclude secondary, life-threatening etiologies before confirming a primary benign headache disorder. The clinical standard is the validated SNOOP4 red-flag mnemonic: Systemic symptoms (fever, unexplained weight loss, malignancy), Neurological signs (focal weakness, confusion, papilledema on fundoscopy), Onset sudden (thunderclap headache reaching maximum intensity in <1 minute, suggestive of subarachnoid hemorrhage), Older age of onset (>50 years, concerning for giant cell arteritis or intracranial space-occupying lesions), and Pattern change (progressive worsening in frequency or severity).",
    items: [
      "**ICHD-3 Migraine Without Aura Diagnostic Rule**: At least 5 attacks lasting 4–72 hours untreated, with >=2 pain characteristics (unilateral location, pulsating quality, moderate/severe intensity, aggravated by routine physical activity) AND >=1 associated symptom (nausea/vomiting, photophobia and phonophobia).",
      "**ICHD-3 Tension-Type Headache Rule**: At least 10 episodes lasting 30 minutes to 7 days, with >=2 pain characteristics (bilateral location, pressing/tightening non-pulsating quality, mild/moderate intensity, not aggravated by routine walking/climbing stairs) AND neither nausea nor vomiting, and no more than one of photophobia or phonophobia.",
      "**Stratified Oral Triptan Selection**: Sumatriptan (50–100mg, gold standard benchmark), Rizatriptan (10mg orally disintegrating tablet, fast onset of action <30 mins), and Eletriptan (40mg, highest lipophilicity and blood-brain barrier penetration with lower recurrence rates).",
      "**Preventive Threshold Indications**: Initiation of daily preventive pharmacotherapy (topiramate 50-100mg, propranolol 80-160mg, amitriptyline 25-50mg, or CGRP monoclonals) is indicated when migraine attacks occur on >=4 days/month with significant disability, or when acute abortive medications are ineffective or contraindicated."
    ]
  },

  "bph-enlarged-prostate-symptoms-medications-psa": {
    id: "block-bph-ipss-uroflowmetry-pvr",
    type: "diagnostic_criteria",
    heading: "IPSS Symptom Score Stratification, Uroflowmetry Curves & PVR Retention Triage",
    content: "Objective urological evaluation of lower urinary tract symptoms (LUTS) combines validated patient questionnaires with non-invasive physiological flow measurements. The International Prostate Symptom Score (IPSS) evaluates 7 distinct voiding and storage symptoms graded from 0 to 5 points: incomplete emptying, frequency, intermittency, urgency, weak stream, straining, and nocturia. A companion eighth question assesses overall subjective quality of life ('How would you feel if you had to spend the rest of your life with your urinary condition just the way it is now?').",
    items: [
      "**IPSS Severity Stratification**: Mild LUTS (0–7 points, typically managed with watchful waiting and lifestyle adaptations), Moderate LUTS (8–19 points, candidates for medical monotherapy or dual therapy), Severe LUTS (20–35 points, candidates for intensive medical therapy or surgical intervention).",
      "**Non-Invasive Uroflowmetry Benchmarks**: Maximum urinary flow rate (Qmax) performed with voided volume >=150 mL; Qmax >15 mL/second is considered normal, 10–14 mL/s is equivocal, and Qmax <10 mL/s confirms significant urodynamic bladder outlet obstruction.",
      "**Post-Void Residual (PVR) Volume Cutoffs**: Transabdominal ultrasound measurement immediately following voiding; PVR <50 mL is normal, 50–199 mL requires surveillance, and PVR >=200 mL indicates significant detrusor decompensation requiring active decompression or urological intervention.",
      "**Lifestyle Voiding Hygiene Protocols**: Avoid fluid intake 2–3 hours before bedtime, restrict bladder irritants (caffeine, alcohol, artificial sweeteners), practice double-voiding (urinating, waiting 30 seconds, and attempting to void again), and review over-the-counter decongestants (pseudoephedrine) and antihistamines that can precipitate acute urinary retention."
    ]
  },

  "obstructive-sleep-apnea-osa-cpap-heart-risks": {
    id: "block-osa-stopbang-polysomnography-bipap",
    type: "diagnostic_criteria",
    heading: "The STOP-Bang Screening Stratification & Polysomnographic Waveform Diagnostics",
    content: "Because daytime symptoms of sleep apnea are often subtle or dismissed as general fatigue, standardized clinical screening tools help prioritize patients for formal diagnostic sleep testing. The validated STOP-Bang questionnaire incorporates 4 subjective symptoms and 4 objective clinical measurements, assigning 1 point for each positive response: Snoring loudly, Tired/fatigued during daytime, Observed stopping breathing during sleep, high blood Pressure, BMI >35 kg/m2, Age >50 years, Neck circumference (>17 inches in men, >16 inches in women), and Gender male.",
    items: [
      "**STOP-Bang Risk Stratification**: Low Risk (score 0–2), Intermediate Risk (score 3–4), High Risk of Moderate-to-Severe OSA (score 5–8; carries an 85% sensitivity and high positive predictive value for AHI >=15 events/hr).",
      "**In-Lab Polysomnography (PSG) vs. Home Sleep Apnea Testing (HSAT)**: HSAT (measuring airflow, respiratory effort, and pulse oximetry) is appropriate for uncomplicated patients with high pre-test probability of moderate-to-severe OSA; full Type 1 in-lab PSG (including EEG, EOG, EMG, ECG) is required for patients with cardiopulmonary disease, morbid obesity, or suspected central sleep apnea.",
      "**Oxygen Desaturation Index (ODI)**: Measures the hourly frequency of SpO2 drops of >=3% or >=4% from baseline; an ODI >15 events/hour correlates directly with systemic vascular endothelial dysfunction and carotid intimamedia thickening.",
      "**Bilevel Positive Airway Pressure (BiPAP) Indications**: For patients requiring high CPAP pressures (>15 cmH2O) who experience expiratory discomfort, or those with concurrent obesity hypoventilation syndrome (OHS) or chronic hypercapnia, BiPAP delivers distinct higher inspiratory (IPAP) and lower expiratory (EPAP) pressures to support alveolar ventilation."
    ]
  },

  "hypothyroidism-hashimotos-tsh-levels-treatment": {
    id: "block-hashimotos-ultrasound-micronutrients",
    type: "diagnostic_criteria",
    heading: "Thyroid Sonographic Architecture, Doppler Vascularity & Micronutrient Co-Factors",
    content: "High-resolution thyroid ultrasonography provides critical morphological insights that complement biochemical laboratory panels. In chronic Hashimoto's thyroiditis, the normal fine, homogeneous, medium-gray thyroid parenchymal pattern is replaced by a diffuse, heterogeneous, hypoechoic architecture traversed by fibrous echogenic septations, creating a micronodular or pseudonodular pattern. Color Doppler imaging frequently demonstrates normal to reduced vascularity in late atrophic stages, contrasting with the intense diffuse hypervascularity ('thyroid inferno') typical of Graves' thyrotoxicosis.",
    items: [
      "**Thyroid Imaging Reporting and Data System (TIRADS)**: When focal dominant nodules coexist within heterogeneous Hashimoto's parenchyma, ACR TI-RADS scoring evaluates composition, echogenicity, shape, margins, and echogenic foci to determine fine-needle aspiration (FNA) biopsy thresholds.",
      "**Iodine Paradox (Wolff-Chaikoff Effect)**: In patients with underlying autoimmune thyroiditis, high-dose supplemental iodine (kelp, seaweed tablets) overwhelms thyroid autoregulation, inducing a prolonged Wolff-Chaikoff effect that paradoxically shuts down organification and precipitates severe overt hypothyroidism.",
      "**Zinc & Copper Micronutrient Synergy**: Zinc is an obligatory cofactor for thyroid hormone binding proteins and nuclear receptors; zinc deficiency impairs 5'-deiodinase activity, lowering serum free T3 output even when free T4 levels are adequate.",
      "**Autoimmune Polyendocrine Syndrome (APS) Screening**: Because Hashimoto's frequently clusters with other organ-specific autoimmune disorders, clinicians maintain high suspicion for concurrent celiac disease (tTG-IgA screening), type 1 diabetes, vitiligo, and Addison's disease (morning cortisol / ACTH screening)."
    ]
  },

  "peripheral-artery-disease-pad-symptoms-abi-treatment": {
    id: "block-pad-doppler-gardner-walking",
    type: "diagnostic_criteria",
    heading: "Duplex Ultrasound Waveform Velocity, TBI in Diabetes & The Walking Ladder Protocol",
    content: "Color duplex ultrasonography combines real-time B-mode imaging with pulsed-wave Doppler spectral analysis to anatomically locate and hemodynamically grade arterial stenoses throughout the aortoiliac, femoropopliteal, and infrapopliteal vessels. Normal lower-extremity peripheral arteries display a high-resistance, multiphasic flow pattern consisting of sharp forward systolic acceleration, brief early diastolic flow reversal, and late forward diastolic elasticity recoil.",
    items: [
      "**Peak Systolic Velocity Ratio (PSVR)**: Calculated by dividing the peak systolic velocity (PSV) within a focal stenotic jet by the PSV in the normal proximal adjacent arterial segment; a PSVR >=2.0 indicates a >=50% luminal stenosis, while a PSVR >=3.0 indicates a high-grade >=75% diameter stenosis.",
      "**Toe-Brachial Index (TBI) in Medial Calcinosis**: In patients with long-standing diabetes or end-stage renal disease, Mönckeberg's medial sclerosis calcifies the muscular layer of tibial and dorsalis pedis arteries, making them rigid and non-compressible (yielding falsely elevated ABI >1.40); digital toe arteries rarely calcify, making a TBI <=0.70 the definitive diagnostic threshold.",
      "**The Gardner-Skinner Progressive Treadmill Protocol**: Validated clinical exercise test (constant speed of 2.0 mph with incline increasing 2% every 2 minutes) measuring Initial Claudication Distance (ICD, onset of calf pain) and Absolute Claudication Distance (ACD, maximal walking limit).",
      "**Meticulous Limb Protective Precautions**: Daily visual inspection of interdigital spaces, professional podiatric nail trimming, wearing customized orthotic inserts to relieve metatarsal pressure points, and avoiding heating pads or hot water soaks that can cause unperceived thermal burns in ischemic extremities."
    ]
  },

  "heart-failure-hfpef-symptoms-diagnosis-management": {
    id: "block-hfpef-echo-diastolic-grading-lavi",
    type: "diagnostic_criteria",
    heading: "Echocardiographic Diastolic Stress Testing, Left Atrial Strain & E/e' Ratios",
    content: "Transthoracic echocardiography (TTE) is the central non-invasive imaging modality for diagnosing and characterizing diastolic dysfunction in HFpEF. According to the joint guidelines from the American Society of Echocardiography (ASE) and European Association of Cardiovascular Imaging (EACVI), clinical evaluation utilizes a multiparametric algorithm evaluating mitral inflow velocities (E and A waves), tissue Doppler annular velocities (e'), tricuspid regurgitation peak velocity, and indexed left atrial volume.",
    items: [
      "**The E/e' Ratio (Estimated Left Ventricular Filling Pressure)**: The ratio of peak early transmitral flow velocity (E wave) to tissue Doppler early diastolic mitral annular velocity (e'); an average E/e' ratio >14 indicates elevated left ventricular end-diastolic filling pressures (>15 mmHg), while a ratio <8 is considered normal.",
      "**Indexed Left Atrial Volume Index (LAVI)**: LAVI >34 mL/m2 serves as a reliable morphological biomarker of chronically elevated left atrial pressure and chronicity of diastolic wall stress, ruling out transient physiological hemodynamic fluctuations.",
      "**Tricuspid Regurgitation Jet Velocity (TR Vmax)**: Continuous-wave Doppler measurement of TR Vmax >2.8 m/s reflects secondary pulmonary arterial hypertension driven by backward transmission of elevated left heart filling pressures.",
      "**Home Weight & Fluid Action Thresholds**: Patients must record body weight daily immediately upon waking after voiding; an acute weight gain of >=3 pounds in 24 hours or >=5 pounds in one week indicates fluid retention, prompting preemptive temporary doubling of loop diuretic dosage to prevent emergency hospitalization."
    ]
  },

  "hs-crp-blood-test-systemic-inflammation-heart-risk": {
    id: "block-hscrp-multimarker-reynolds-homocysteine",
    type: "diagnostic_criteria",
    heading: "Multi-Biomarker Inflammatory Panels: hs-CRP, Homocysteine & The Reynolds Score",
    content: "Cardiovascular risk estimation is substantially enhanced by integrating hs-CRP into comprehensive multi-biomarker inflammatory panels. While traditional Framingham and ASCVD Pooled Cohort Equations rely primarily on chronological age, cholesterol, and blood pressure, they misclassify up to 20–30% of individuals who go on to suffer premature cardiovascular events. Incorporating hs-CRP and complementary metabolic markers provides crucial risk reclassification, particularly for individuals classified as borderline or intermediate risk.",
    items: [
      "**The Reynolds Risk Score Calculation**: Validated clinical algorithm incorporating gender, age, systolic blood pressure, total cholesterol, HDL-C, smoking status, parental history of premature MI (<60 years), and hs-CRP; reclassifies up to 40% of intermediate-risk women and 20% of intermediate-risk men into more accurate risk categories.",
      "**Lipoprotein-Associated Phospholipase A2 (Lp-PLA2)**: Vascular-specific inflammatory enzyme synthesized by macrophages within atheromatous plaques; an elevated Lp-PLA2 (>200 ng/mL) directly indicates active necrotic core plaque vulnerability and elevated stroke risk independent of systemic hs-CRP.",
      "**Plasma Homocysteine Vascular Toxicity**: Normal range (5–15 umol/L); moderate hyperhomocysteinemia (>15 umol/L) promotes endothelial oxidant stress, impairs nitric oxide synthesis, and stimulates vascular smooth muscle proliferation; optimized with active bioavailable B-vitamin cofactors (methylfolate, methylcobalamin, pyridoxal-5-phosphate).",
      "**Standardized Phlebotomy Pre-Analytical Protocol**: To prevent spurious laboratory artifacts, hs-CRP must be drawn when the patient has been free from acute febrile illness, dental procedures, active arthritis flares, and strenuous endurance exercise for at least 2 weeks."
    ]
  },

  "adult-adhd-signs-executive-dysfunction-management": {
    id: "block-adhd-differential-workplace-accommodations",
    type: "diagnostic_criteria",
    heading: "Differential Diagnosis: Adult ADHD vs. Bipolar II, Anxiety & Sluggish Cognitive Tempo",
    content: "Diagnostic accuracy in adult ADHD requires careful psychiatric differential evaluation, as executive dysfunction and restlessness frequently overlap with other conditions. Clinicians must distinguish ADHD's chronic, trait-like developmental pattern of inattention from the episodic, cyclical mood shifts of Bipolar II disorder, where distractibility occurs specifically during hypomanic or depressive episodes. Similarly, while generalized anxiety disorder involves difficulty concentrating because the mind is occupied by intrusive catastrophic worries, ADHD inattention stems from neurological under-arousal and difficulty sustaining effort on non-novel tasks.",
    items: [
      "**Sluggish Cognitive Tempo (SCT / Cognitive Disengagement Syndrome)**: A distinct neurocognitive profile characterized by excessive daydreaming, mental fogginess, slow processing speed, and lethargy; differs from classical ADHD by lacking impulsive motor hyperactivity and exhibiting poorer response to psychostimulants.",
      "**Substance Use Disorder Comorbidity Triage**: Approximately 15–25% of adults with untreated ADHD develop substance use disorders, often reflecting self-medication attempts to increase dopamine signaling; long-acting extended-release formulations (e.g., lisdexamfetamine) or non-stimulants (atomoxetine) are preferred to eliminate abuse liability.",
      "**Workplace Accommodations Under the ADA**: Evidence-based occupational modifications include noise-canceling headphones to reduce auditory distractors, written post-meeting project summaries, segmented multi-phase deadlines, and private workspace options.",
      "**Physical Exercise as a Dopaminergic Adjunct**: 30 minutes of acute moderate-to-vigorous aerobic exercise elevates striatal dopamine and norepinephrine concentrations, producing an immediate 2-to-4-hour window of improved executive focus and inhibitory control."
    ]
  },

  "science-of-stress-management": {
    id: "block-stress-hrv-coherence-jacobson",
    type: "diagnostic_criteria",
    heading: "Neurological Biomarkers: Heart Rate Variability (HRV) Coherence & Vagal Metrics",
    content: "Quantifying autonomic nervous system flexibility provides objective feedback on stress recovery and physiological resilience. During inhalation, the sympathetic nervous system briefly accelerates heart rate (vagal brake withdrawal); during exhalation, the parasympathetic vagus nerve decelerates heart rate—a physiological phenomenon termed Respiratory Sinus Arrhythmia (RSA). When an individual enters a state of physiological stress coherence, heart rate oscillations form a smooth, sine-wave pattern reflecting harmonic resonance between respiration, baroreflex blood pressure regulation, and central autonomic networks.",
    items: [
      "**Time-Domain HRV Metrics (RMSSD & SDNN)**: Root mean square of successive differences (RMSSD >40 ms reflects healthy, youthful parasympathetic vagal output, whereas RMSSD <20 ms indicates chronic sympathetic dominance, emotional exhaustion, and elevated all-cause mortality).",
      "**Jacobson's Progressive Muscle Relaxation (PMR)**: Structured somatic technique systematically tensing specific muscle groups (forearms, shoulders, facial muscles) for 5–7 seconds at 70% effort, followed by sudden, complete release for 20–30 seconds; trains somatic interoception to abolish subconscious chronic myofascial bracing.",
      "**Thermal Biofeedback & Peripheral Vasoconstriction**: Acute psychological stress triggers peripheral alpha-1-adrenergic vasoconstriction, lowering fingertip skin temperature by 5–10°F; thermal biofeedback trains patients to warm their hands via conscious vasodilation, down-regulating systemic sympathetic tone.",
      "**Cortisol Circadian Reset Protocol**: Anchor morning wake-up with immediate outdoor light and a high-protein breakfast, avoid intense cardiovascular workouts after 7:00 PM, and eliminate bright ambient overhead lights after sunset to allow natural nocturnal melatonin synthesis."
    ]
  },

  "pcos-symptoms-hormone-balance-treatment-guide": {
    id: "block-pcos-amh-dheas-endometrial-hyperplasia",
    type: "diagnostic_criteria",
    heading: "Androgen Phenotyping, Anti-Müllerian Hormone (AMH) & Endometrial Protection",
    content: "Comprehensive endocrinological workup in PCOS requires subtyping androgen hypersecretion sources and evaluating ovarian reserve markers. Anti-Müllerian Hormone (AMH)—secreted by granulosa cells of pre-antral and small antral follicles—is characteristically elevated 2- to 4-fold in PCOS due to the vast expansion of arrested follicular cohorts, serving as an accurate surrogate marker for polycystic ovarian morphology.",
    items: [
      "**AMH Diagnostic Thresholds**: While normal reproductive-aged AMH ranges from 1.0 to 3.5 ng/mL (7–25 pmol/L), women with PCOS typically exhibit AMH >=4.5 ng/mL (>=32 pmol/L); exceptionally high AMH (>10 ng/mL) indicates severe ovulatory arrest and heightened ovarian hyperstimulation syndrome (OHSS) risk during fertility treatments.",
      "**Adrenal Androgen Screening (DHEA-S)**: Dehydroepiandrosterone sulfate (DHEA-S) is synthesized exclusively by the adrenal cortex; elevated DHEA-S (>350 mcg/dL) indicates an adrenal androgen contribution, while markedly elevated levels (>700 mcg/dL) mandate imaging to rule out adrenal androgen-secreting adenomas.",
      "**Endometrial Hyperplasia & Cancer Prevention**: Chronic anovulatory cycles expose the endometrium to continuous, unopposed estrogen without cyclical progesterone luteal-phase shedding, multiplying the lifetime risk of endometrial hyperplasia and well-differentiated endometrioid adenocarcinoma by 3- to 5-fold.",
      "**Progestin Withdrawal Protocol**: For women with oligomenorrhea not using hormonal contraception, clinical guidelines mandate inducing a withdrawal bleed at least every 3 to 4 months using oral micronized progesterone (200 mg daily for 12–14 days) or medroxyprogesterone acetate (10 mg daily for 10–14 days)."
    ]
  },

  "gerd-acid-reflux-symptoms-causes-lifestyle-treatment": {
    id: "block-gerd-manometry-chicago-sleep-position",
    type: "diagnostic_criteria",
    heading: "High-Resolution Esophageal Manometry & The Anti-Reflux Bedtime Protocol",
    content: "High-Resolution Manometry (HRM) utilizes a solid-state catheter with 36 circumferential pressure sensors spaced at 1 cm intervals to generate dynamic esophageal pressure topography plots. Prior to considering anti-reflux surgery (such as Nissen fundoplication or magnetic sphincter augmentation), HRM is mandatory to rule out major esophageal motility disorders (such as achalasia, jackhammer esophagus, or absent peristalsis) that present with heartburn symptoms but would lead to catastrophic dysphagia if a surgical fundoplication wrap were constructed.",
    items: [
      "**The Chicago Classification v4.0 Parameters**: Evaluates Integrated Relaxation Pressure (IRP <15 mmHg confirms normal lower esophageal sphincter relaxation) and Distal Contractile Integral (DCI 450–8,000 mmHg·s·cm defines normal peristaltic contractile vigor).",
      "**6-Inch Bed Head Elevation Physics**: Elevating the head of the bed frame using solid 6-inch wooden blocks or a commercial under-mattress bed wedge maintains gravity-assisted esophageal acid clearance throughout sleep, reducing nocturnal acid exposure time by over 60% compared to stacking sleeping pillows.",
      "**The 3-Hour Postprandial Buffer Window**: The stomach requires 2 to 3 hours to evacuate solid food and down-regulate postprandial acid secretion; reclining within 3 hours of eating allows pooled gastric acid to submerge the lower esophageal junction, driving nocturnal reflux events.",
      "**Left Lateral Decubitus Sleep Position**: Sleeping on the left side positions the gastroesophageal junction anatomically above the level of the gastric acid pool in the gastric body, whereas right-sided sleeping submerges the sphincter in acid, doubling reflux episode duration."
    ]
  },

  "high-cholesterol-lipid-panel-diet-statin-guide": {
    id: "block-lipid-secondary-causes-ascvd-pooled",
    type: "diagnostic_criteria",
    heading: "Secondary Hyperlipidemia Workup & The ACC ASCVD 10-Year Risk Estimator",
    content: "Before attributing dyslipidemia solely to primary genetic or dietary factors, clinicians must systematically exclude secondary, treatable metabolic and endocrine etiologies. Hypothyroidism is a classical cause of secondary hypercholesterolemia, as diminished thyroid hormone downregulates hepatic LDL receptor gene transcription, slowing circulating LDL clearance; nephrotic syndrome drives compensatory hepatic albumin and VLDL synthesis, massively spiking total cholesterol.",
    items: [
      "**Secondary Dyslipidemia Screening Checklist**: Serum TSH (rule out hypothyroidism), fasting blood glucose and HbA1c (rule out diabetic dyslipidemia with high triglycerides/low HDL), urinalysis for proteinuria (rule out nephrotic syndrome), serum creatinine/eGFR (rule out CKD), and alkaline phosphatase/total bilirubin (rule out biliary obstruction).",
      "**ACC/AHA ASCVD Risk Estimator Plus**: Calculates 10-year risk of first hard ASCVD event (non-fatal MI, CHD death, fatal/non-fatal stroke): Low Risk (<5%), Borderline Risk (5% to 7.4%), Intermediate Risk (7.5% to 19.9%), High Risk (>=20%); intermediate-risk patients are prime candidates for CAC scoring to resolve clinical treatment ambiguity.",
      "**Risk-Enhancing Clinical Factors**: Family history of premature ASCVD (<55 men, <65 women), primary hypercholesterolemia (LDL-C 160–189 mg/dL), metabolic syndrome, CKD, chronic inflammatory conditions (rheumatoid arthritis, psoriasis, HIV), premature menopause (<40 years), and persistently elevated hs-CRP (>=2.0 mg/L).",
      "**Dietary Soluble Fiber Viscosity**: Consuming 10–15 grams of viscous soluble fiber daily (psyllium husk, oat beta-glucan, barley) binds bile acids in the intestinal lumen, forcing the liver to convert endogenous cholesterol into new bile acids, lowering circulating LDL-C by 5–10%."
    ]
  },

  "vitamin-b12-deficiency-neuropathy-symptoms-treatment-guide": {
    id: "block-b12-posterior-column-folate-trap",
    type: "diagnostic_criteria",
    heading: "Clinical Neurological Localization: Posterior Column Deficits & The Folate Trap",
    content: "Vitamin B12 deficiency produces a characteristic neuro-anatomical pattern of tissue damage termed Subacute Combined Degeneration (SCD). Demyelination begins patchily in the middle thoracic posterior (dorsal) and lateral funiculi of the spinal cord and extends rostrally and caudally, selectively degrading large, heavily myelinated axons responsible for proprioception and vibration sensation. Because peripheral sensory and motor nerve conduction velocities can remain normal in early isolated spinal cord disease, physical examination of sensory modalities is critical for early diagnosis before irreversible axonal loss occurs.",
    items: [
      "**Vibration & Proprioceptive Sensory Exam**: Loss of 128-Hz tuning fork vibration perception at the hallux interphalangeal joint and ankles is the earliest and most sensitive physical sign, followed by impaired joint position sense and a positive Romberg test (swaying or falling when standing with eyes closed).",
      "**Combined Upper and Lower Motor Neuron Signs**: Lateral corticospinal tract demyelination produces lower extremity spasticity, weakness, and extensor plantar responses (positive Babinski sign), paradoxically accompanied by diminished or absent ankle jerk deep tendon reflexes due to concurrent peripheral large-fiber neuropathy.",
      "**The Dangerous 'Folate Trap' Hazard**: Administering high-dose folic acid (>1,000 mcg/day) in an individual with unrecognized vitamin B12 deficiency bypasses the methionine synthase defect to drive thymidine synthesis, completely correcting the macrocytic megaloblastic anemia while allowing subacute combined spinal cord degeneration to progress unchecked to permanent paraplegia.",
      "**Reversible Neuropsychiatric Manifestations ('Megaloblastic Madness')**: Cobalamin deficiency impairs central monoamine neurotransmitter and S-adenosylmethionine (SAMe) synthesis, manifesting as progressive cognitive decline, acute delirium, paranoid psychosis, and severe depression that completely resolves with prompt cobalamin repletion."
    ]
  },

  "chronic-kidney-disease-ckd-stages-egfr-diet": {
    id: "block-ckd-hyperparathyroidism-nephrotoxins",
    type: "diagnostic_criteria",
    heading: "Secondary Hyperparathyroidism, Calcitriol Synthesis & Nephrotoxic Medication Triage",
    content: "As functional nephron mass declines below 50% in Stage 3 CKD, renal 1-alpha-hydroxylase enzyme capacity becomes progressively deficient, resulting in impaired bioactivation of calcidiol into active calcitriol [1,25(OH)2D]. The combination of reduced calcitriol synthesis and impaired phosphate filtration leads to systemic hypocalcemia, hyperphosphatemia, and compensatory parathyroid gland hyperplasia, triggering secondary hyperparathyroidism and high-turnover renal osteodystrophy (osteitis fibrosa cystica).",
    items: [
      "**CKD-Mineral Bone Disorder (CKD-MBD) Target Goals**: Maintain intact parathyroid hormone (iPTH) within target ranges: 35–70 pg/mL for Stage 3, 70–110 pg/mL for Stage 4, and 2 to 9 times the upper reference limit for dialysis Stage 5; treat with active oral vitamin D analogs (calcitriol 0.25 mcg, paricalcitol).",
      "**Inorganic vs. Organic Dietary Phosphorus**: Inorganic phosphate additives used in processed foods, packaged meats, and sodas are rapidly absorbed (90–100% intestinal bioavailability); in contrast, organic plant-based phosphorus (legumes, nuts, grains) is bound in phytates with low human bioavailability (40–50%), making whole plant foods safe in moderate CKD.",
      "**Nephrotoxic Medication Elimination Checklist**: Strict avoidance of over-the-counter NSAIDs (ibuprofen, naproxen, meloxicam) which inhibit vasodilatory renal prostaglandins, causing acute medullary ischemia; adjust dosages of renally cleared medications (gabapentin, allopurinol, cephalosporins) strictly based on measured eGFR.",
      "**Intravenous Iodinated Radiocontrast Precautions**: In patients with eGFR <30 mL/min undergoing contrast-enhanced CT scans, maintain oral and IV isotonic saline hydration protocols to prevent contrast-associated acute kidney injury (CA-AKI)."
    ]
  },

  "gout-hyperuricemia-causes-uric-acid-diet-treatment": {
    id: "block-gout-arthrocentesis-polarized-light",
    type: "diagnostic_criteria",
    heading: "Synovial Fluid Arthrocentesis: Polarized Light Microscopy & Urate Lithiasis",
    content: "While hyperuricemia and acute podagra (first MTP joint inflammation) are strongly suggestive, definitive diagnostic confirmation of gout requires diagnostic synovial fluid joint aspiration (arthrocentesis). In acute monoarthritis, aspirating the joint is medically mandatory to exclude septic arthritis, which can present with identical clinical signs of erythema, swelling, extreme tenderness, and constitutional fever, and can destroy articular cartilage within 24–48 hours if untreated.",
    items: [
      "**Compensated Polarized Light Microscopy**: Synovial fluid analysis reveals intracellular and extracellular needle-shaped monosodium urate (MSU) crystals demonstrating strong negative birefringence; crystals aligned parallel to the slow axis of the red compensator appear bright yellow, while perpendicular crystals appear blue.",
      "**Synovial White Blood Cell (WBC) Differentials**: Inflammatory gout synovial fluid typically contains 20,000 to 100,000 WBCs/uL with >80% polymorphonuclear neutrophils (PMNs); fluid must always be submitted for Gram stain and microbiological bacterial cultures regardless of crystal visualization.",
      "**Dual-Energy Computed Tomography (DECT)**: Advanced non-invasive cross-sectional imaging utilizing two distinct X-ray energy spectra to selectively identify and color-code subclinical uric acid crystal deposits within joints, periarticular tendons, and deep ligaments with >90% sensitivity and specificity.",
      "**Uric Acid Nephrolithiasis Prevention**: Approximately 10–20% of gout patients develop radiolucent pure uric acid kidney stones due to acidic urine (pH <5.5); alkalinizing the urine with oral potassium citrate (30–60 mEq/day) targeting urinary pH between 6.2 and 6.8 increases uric acid solubility by 10-fold, preventing stone recurrence."
    ]
  },

  "managing-blood-pressure-naturally": {
    id: "block-bp-home-monitoring-circadian-dipping",
    type: "diagnostic_criteria",
    heading: "Circadian Home BP Monitoring Protocols & The Nocturnal Dipping Classification",
    content: "Accurate blood pressure clinical management requires eliminating acute situational artifact through standardized home blood pressure monitoring (HBPM) and 24-hour ambulatory blood pressure monitoring (ABPM). White-coat hypertension (elevated in-clinic BP but normal home BP) affects up to 20–30% of patients, leading to inappropriate over-medication; conversely, masked hypertension (normal clinic BP but elevated home BP) carries high cardiovascular morbidity that goes undetected without out-of-office surveillance.",
    items: [
      "**AHA/ACC Standardized Measurement Protocol**: Rest quietly for 5 full minutes in a quiet room, seated with back supported, legs uncrossed and feet flat on the floor; use a clinically validated, automated upper-arm cuff of appropriate bladder size positioned at mid-sternal heart level; do not speak or look at smartphones during measurement.",
      "**The 7-Day Clinical Monitoring Schedule**: Record 2 blood pressure readings 1 minute apart in the morning (before medications and breakfast) and 2 readings in the evening for 7 consecutive days; discard the first day's measurements and average the remaining 12 readings to establish true baseline blood pressure.",
      "**Nocturnal Dipping Profiles & Mortality**: In healthy individuals, blood pressure drops by 10% to 20% during deep nocturnal sleep ('dippers'); 'non-dippers' (<10% nocturnal drop) and 'reverse dippers' (nighttime BP higher than daytime BP) face a 2- to 3-fold higher risk of stroke, left ventricular hypertrophy, and cognitive decline.",
      "**Caffeine & Exertional Pre-Test Clearance**: Patients must avoid vigorous physical exercise, caffeine, and tobacco consumption for at least 30 minutes prior to blood pressure assessment, and must empty their urinary bladder, as a distended bladder can falsely elevate systolic blood pressure by 10–15 mmHg."
    ]
  },

  "routine-blood-test-results-explained-cbc-cmp-kidney-liver": {
    id: "block-blood-preanalytical-artifacts-hemolysis",
    type: "diagnostic_criteria",
    heading: "Laboratory Pre-Analytical Artifacts: Hemolysis, Spurious Electrolytes & Timing",
    content: "Up to 70% of diagnostic laboratory errors occur during the pre-analytical phase—encompassing patient preparation, phlebotomy technique, specimen handling, and transport duration—rather than automated chemical analyzer malfunction. Clinicians must recognize classical patterns of pre-analytical artifact to avoid ordering expensive, invasive, and unnecessary secondary confirmatory workups.",
    items: [
      "**In Vitro Hemolysis & Spurious Hyperkalemia**: Traumatic venipuncture, using excessively small-gauge needles, or vigorous shaking of collection tubes ruptures fragile red blood cell membranes, releasing massive intracellular potassium stores into serum; reported as 'sample hemolyzed' with a falsely elevated potassium (>5.5 mEq/L) despite normal cellular physiology and a normal resting ECG.",
      "**EDTA Anticoagulant Tube Cross-Contamination**: Drawing blood into a lavender-top K2-EDTA tube before a chemistry serum separator tube can contaminate the sample with potassium-EDTA, yielding a catastrophic lab report of severe hyperkalemia (>8.0 mEq/L) and profound, near-zero hypocalcemia due to EDTA calcium chelation.",
      "**Prolonged Tourniquet Stasis Hemoconcentration**: Leaving a venous tourniquet in place for >1 to 2 minutes during difficult phlebotomy causes localized venous stasis and transudation of water into tissues, falsely elevating concentrations of high-molecular-weight proteins (total protein, albumin) and protein-bound total calcium by 5–10%.",
      "**Postprandial Lipemia & Fasting Requirements**: Ingesting a high-fat meal prior to blood collection creates cloudy, lipemic serum dense with chylomicrons, which mechanically interferes with spectrophotometric optical assays for hemoglobin, bilirubin, and transaminases."
    ]
  },

  "diabetic-neuropathy-symptoms-nerve-pain-management": {
    id: "block-neuropathy-can-gastroparesis-orthostasis",
    type: "diagnostic_criteria",
    heading: "Cardiovascular Autonomic Neuropathy (CAN) & Gastrointestinal Enteropathy Triage",
    content: "While distal symmetric sensorimotor polyneuropathy is the most common presentation of diabetic nerve damage, Diabetic Autonomic Neuropathy (DAN) affects autonomic ganglia and postganglionic unmyelinated fibers innervating the cardiovascular, gastrointestinal, and genitourinary organ systems. Cardiovascular Autonomic Neuropathy (CAN) carries the highest clinical mortality, resulting from vagal parasympathetic denervation that leaves cardiac chronotropic control unopposed to sympathetic stimulation.",
    items: [
      "**Clinical Signs of Cardiovascular Autonomic Neuropathy**: Resting resting tachycardia (fixed heart rate 100–110 bpm that fails to vary with respiration), loss of physiological heart rate variability (HRV), and exercise intolerance with blunted cardiac output response.",
      "**Orthostatic Hypotension Assessment**: Documented drop in systolic blood pressure >=20 mmHg or diastolic BP >=10 mmHg within 3 minutes of standing from a supine position without an adequate compensatory reflex tachycardia; managed with midodrine, fludrocortisone, and 30–40 mmHg graduated compression stockings.",
      "**Diabetic Gastroparesis Pathophysiology**: Vagal autonomic neuropathy impairs gastric antral motility and pyloric relaxation, causing delayed gastric emptying of solid food; presents with postprandial early satiety, nausea, bloating, and erratic glycemic fluctuations (insulin acting before digested glucose reaches circulation).",
      "**Gastroparesis Diagnostic Scintigraphy**: Evaluated via 4-hour 99mTc-labeled solid-meal gastric emptying scintigraphy; retention of >10% of the radio-labeled meal at 4 hours confirms gastroparesis; managed with small, low-fiber, low-fat meals and prokinetic agents (metoclopramide, erythromycin)."
    ]
  },

  "adult-vaccination-schedule-preventive-guide": {
    id: "block-vaccine-special-populations-asplenia",
    type: "diagnostic_criteria",
    heading: "Special Population Immunization: Asplenia, Immunosuppression & Live Vaccine Rules",
    content: "Clinical vaccine prescribing requires individualized tailoring based on underlying immune competence, anatomic organ function, and specific immunosuppressive pharmacological regimens. Individuals with anatomical asplenia (surgical splenectomy) or functional asplenia (sickle cell disease) lose splenic macrophage phagocytosis of unopsonized encapsulated bacteria, leaving them at extraordinary risk of Overwhelming Post-Splenectomy Infection (OPSI) and septic shock.",
    items: [
      "**Asplenia High-Priority Encapsulated Protocol**: Mandates sequential immunization against: (1) Streptococcus pneumoniae (PCV20 single dose), (2) Neisseria meningitidis (MenACWY 2-dose primary series with 5-year boosters + MenB 2-dose series), and (3) Haemophilus influenzae type b (Hib single dose).",
      "**Absolute Contraindication of Live-Attenuated Vaccines**: Live vaccines—including Measles-Mumps-Rubella (MMR), Varicella (Varivax), and live attenuated nasal influenza—are strictly contraindicated in pregnant women and severely immunocompromised individuals (e.g. CD4 <200 cells/uL, biologic TNF inhibitors, or chemotherapy) due to risk of uninhibited viral replication.",
      "**Universal Adult Hepatitis B Immunization**: The CDC ACIP recommends universal Hepatitis B vaccination (2-dose Heplisav-B or 3-dose standard recombinant series) for all adults aged 19 through 59 to eliminate viral transmission, chronic cirrhosis, and secondary hepatocellular carcinoma.",
      "**Timing Around Immunosuppressive Therapy**: When planned immunosuppressive chemotherapy or organ transplantation is scheduled, administer all indicated inactivated vaccines at least 2 weeks prior, and live vaccines at least 4 weeks prior, to maximize seroprotective antibody titers."
    ]
  },

  "coronary-artery-disease-symptoms-causes-treatment": {
    id: "block-cad-spect-stress-echo-vulnerable-plaque",
    type: "diagnostic_criteria",
    heading: "Myocardial Perfusion SPECT vs. Stress Echocardiography & Vulnerable Plaque Biology",
    content: "Selecting non-invasive functional stress testing modalities in coronary artery disease depends on the patient's baseline electrocardiographic interpretability, functional mobility, and pre-test clinical probability. In patients capable of walking on a treadmill with normal resting ST-segments, a standard exercise treadmill test (ETT) evaluating the Duke Treadmill Score provides valuable exercise capacity and prognostic data; however, in patients with baseline left bundle branch block (LBBB), left ventricular hypertrophy, or pre-excitation, advanced imaging modalities are required.",
    items: [
      "**Myocardial Perfusion Scintigraphy (SPECT/PET)**: Utilizes radiotracers (99mTc-sestamibi) at rest and during peak exercise (or vasodilator pharmacological stress with regadenoson); demonstrates reversible radiotracer defect (inducible ischemia) versus fixed defect (prior myocardial scar/infarction).",
      "**Stress Echocardiography Mechanics**: Real-time ultrasound imaging evaluating regional wall motion abnormalities; failure of a myocardial segment to hypercontract or emergence of new hypokinesis/akinesis during dobutamine infusion or treadmill exertion accurately identifies subtending epicardial coronary stenosis.",
      "**High-Risk Vulnerable Plaque Morphology on CTA**: High-risk plaque features on coronary CTA include low attenuation plaque (<30 Hounsfield Units, reflecting a large necrotic lipid core), positive outer vessel remodeling index (>1.1), and the 'napkin-ring sign' (thin fibrous cap with central hypoattenuation).",
      "**Fractional Flow Reserve (FFR & FFR-CT)**: Evaluates the physiological significance of an intermediate coronary stenosis (40–70% diameter narrowing); an FFR <=0.80 across a lesion confirms hemodynamically significant, ischemia-inducing stenosis warranting revascularization."
    ]
  },

  "type-2-diabetes-management-symptoms-diet-and-prevention": {
    id: "block-t2d-retinopathy-nephropathy-microvascular",
    type: "diagnostic_criteria",
    heading: "Comprehensive Microvascular Surveillance: Retinopathy, Nephropathy & Podiatry Care",
    content: "Long-term clinical success in type 2 diabetes requires rigorous, synchronized surveillance across all microvascular target organs to identify and halt subclinical tissue injury before irreversible functional failure develops. Diabetic microangiopathy originates from chronic hyperglycemia-induced capillary basement membrane thickening, pericyte apoptosis, and microaneurysm formation throughout the microcirculation.",
    items: [
      "**Annual Dilated Retinal Examination**: Standard of care beginning at the time of T2D diagnosis; fundoscopy evaluates for non-proliferative diabetic retinopathy (microaneurysms, intraretinal dot-blot hemorrhages, cotton-wool spots) and proliferative retinopathy with retinal neovascularization requiring urgent intravitreal anti-VEGF injections or panretinal laser photocoagulation.",
      "**Annual Urine Albumin-to-Creatinine Ratio (uACR)**: Spot morning urine collection; persistent uACR 30–300 mg/g defines microalbuminuria (early diabetic nephropathy), prompting initiation of SGLT2 inhibitors and ACEi/ARB therapy to prevent progression to macroalbuminuria (>300 mg/g) and declining eGFR.",
      "**Comprehensive Annual Diabetic Foot Examination**: Visual assessment of skin integrity, nail hygiene, structural foot deformities (hammer toes, bunions), palpation of dorsalis pedis and posterior tibial arterial pulses, and 10g monofilament sensory testing to categorize ulcer risk into low, moderate, or high risk.",
      "**Periodontal Disease Bidirectional Interplay**: Severe chronic periodontitis is an established complication of diabetes that intensifies systemic insulin resistance through continuous bacteremia and endotoxemia; professional dental scaling and periodontal therapy produces measurable HbA1c reductions of 0.4–0.5%."
    ]
  },

  "perimenopause-menopause-symptoms-hrt-management": {
    id: "block-peri-bone-loss-cardio-stratification",
    type: "diagnostic_criteria",
    heading: "Bone Density Loss Trajectory & Cardiovascular Risk Stratification Before HRT",
    content: "During the perimenopausal transition and the first 5 to 7 years following the final menstrual period, women experience an accelerated phase of bone resorption wherein up to 10% to 20% of trabecular bone mass is permanently lost due to osteoclastic uncoupling. Concurrently, the loss of vascular endothelial estrogen receptor-alpha (ER-alpha) activation down-regulates endothelial nitric oxide synthesis and accelerates arterial stiffness, making pre-treatment cardiovascular risk stratification mandatory prior to prescribing systemic hormonal therapy.",
    items: [
      "**Pre-HRT Cardiovascular Risk Assessment**: Clinicians calculate baseline 10-year ASCVD risk; systemic hormone therapy is safe and recommended for women <60 years old or within 10 years of menopause with ASCVD risk <5%; transdermal routes are strongly preferred for intermediate risk (5–7.4%), while systemic HRT is generally avoided in high-risk patients (>=10% or established ASCVD).",
      "**Baseline Mammography & Breast Density Review**: Screening mammography within the prior 12 months is mandatory prior to initiating combined estrogen-progestogen therapy, ensuring absence of occult suspicious microcalcifications or architectural distortion.",
      "**Lipid Subfraction Shifts During Menopause**: In the absence of endogenous estrogen, total cholesterol and LDL-C increase by 10–15%, ApoB rises, and protective HDL-C subfractions decline; monitoring lipid fractions every 12 months allows timely initiation of dietary adaptations or statin therapy.",
      "**Progestin Intolerance & Non-Bleeding Regimens**: Continuous combined HRT (daily oral micronized progesterone 100mg with daily transdermal estradiol) induces amenorrhea within 6 to 12 months, avoiding unpredictable withdrawal bleeding typical of cyclical sequential regimens."
    ]
  },

  "hypoglycemia-low-blood-sugar-symptoms-emergency-treatment": {
    id: "block-hypo-cgm-predictive-alerts-exercise",
    type: "diagnostic_criteria",
    heading: "Continuous Glucose Monitor (CGM) Predictive Alerts & Exercise Management",
    content: "Modern real-time Continuous Glucose Monitoring (rtCGM) systems have revolutionized hypoglycemia prevention through predictive algorithms that calculate the rate and trajectory of falling interstitial glucose concentrations. Rather than reacting after hypoglycemia has already impaired cerebral cognitive processing, modern CGM systems project glucose trends 20 to 30 minutes in advance, providing automated predictive low-glucose alerts that allow patients to intervene proactively with small carbohydrate corrections.",
    items: [
      "**Predictive Low-Glucose Alerts Thresholds**: Setting CGM predictive alerts to notify the user when sensor glucose is projected to drop below 80 mg/dL within 20 minutes allows ingestion of a modest 8–10g fast-acting carbohydrate snack, preempting neuroglycopenia without inducing rebound hyperglycemia.",
      "**Exercise-Induced Late-Onset Hypoglycemia**: Physical exercise stimulates insulin-independent GLUT4 glucose uptake during exertion, followed by hours of increased insulin sensitivity and muscle glycogen replenishment; patients face heightened risk of severe nocturnal hypoglycemia 6 to 15 hours post-exercise, requiring proactive bedtime basal insulin reductions (-10% to -20%).",
      "**Bedtime Glycemic Target Buffers**: In patients with recurrent nocturnal hypoglycemia or hypoglycemia unawareness, maintaining a bedtime sensor glucose between 100 and 140 mg/dL (and consuming a protein-complex carbohydrate snack like peanut butter on whole wheat if <100 mg/dL) provides an essential safety buffer.",
      "**Alcohol-Induced Hypoglycemia Mechanism**: Hepatic metabolism of ethanol via alcohol dehydrogenase generates excessive cytosolic NADH, which shuts down hepatic gluconeogenesis; in fasting individuals or insulin-treated patients, alcohol consumption can precipitate profound, refractory hypoglycemia that does not respond to glucagon rescue because liver glycogen stores are depleted."
    ]
  }
};
