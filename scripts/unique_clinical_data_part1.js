// Unique, Topic-Specific Clinical Content for Articles 1-23
// Zero duplication, authentic clinician depth, real clinical trials & lab values

module.exports = {
  // 1. Migraine vs Tension Headache
  "migraine-vs-tension-headache-aura-cgrp-treatment": {
    blocks: [
      {
        id: "block-migraine-pathophysiology-cgrp-trials",
        type: "clinical_overview",
        heading: "Cortical Spreading Depression, CGRP Biology & Phase III Monoclonal Trials",
        content: "Migraine pathophysiology is fundamentally neurovascular, driven by Cortical Spreading Depression (CSD)—a slowly propagating wave of neuronal and glial depolarization across the cerebral cortex that triggers trigeminovascular system activation. Upon stimulation, the trigeminal ganglion releases vasoactive neuropeptides, predominantly Calcitonin Gene-Related Peptide (CGRP) and substance P, inciting neurogenic inflammation, dural vasodilation, and sustained central sensitization in the spinal trigeminal nucleus. In contrast, tension-type headaches arise primarily from pericranial myofascial nociceptor hyperalgesia without primary neuropeptide-mediated neurovascular inflammation.",
        items: [
          "**Phase III CGRP Monoclonal Trials**: Pivotal trials (STRIVE for erenumab 70/140mg, HALO for fremanezumab, EVOLVE for galcanezumab) demonstrated a 50% or greater reduction in monthly migraine days for over 55% of patients with episodic and chronic migraine refractory to conventional oral preventatives.",
          "**Small-Molecule Gepants Mechanism**: Second-generation oral CGRP receptor antagonists (rimegepant 75mg, ubrogepant 50-100mg, atogepant) abort acute attacks without causing vasoconstriction, providing an essential therapeutic alternative for patients with cardiovascular contraindications to triptans.",
          "**Medication-Overuse Headache (MOH) Thresholds**: According to ICHD-3 criteria, using triptans, ergots, or combination analgesics on >=10 days/month, or simple analgesics (acetaminophen, NSAIDs) on >=15 days/month for >3 months transforms episodic migraine into refractory daily headache.",
          "**PREEMPT Clinical Protocol**: Chronic migraine (>=15 headache days/month, with >=8 fulfilling migraine criteria for >3 months) responds to OnabotulinumtoxinA administered across 31 fixed sites (155 units) every 12 weeks, attenuating peripheral sensory nerve mechanical sensitivity."
        ]
      },
      {
        id: "block-migraine-abortive-triage-safety",
        type: "treatment_medications",
        heading: "Acute Abortive Stratification, Triptan Titration & Cardiovascular Precautions",
        content: "Effective abortive therapy requires early intervention within the mild pain phase of the migraine attack before central cutaneous allodynia becomes established. Stratified care algorithms recommended by the American Headache Society (AHS) initiate combination therapy—pairing a 5-HT1B/1D receptor agonist (triptan) with a rapid-acting NSAID (such as naproxen sodium 500mg)—which synergistically targets both presynaptic neuropeptide release and downstream pro-inflammatory prostaglandin synthesis.",
        items: [
          "**5-HT1B/1D Agonist Contraindications**: Triptans produce mild coronary vasoconstriction; they remain strictly contraindicated in patients with ischemic heart disease, prior myocardial infarction, coronary vasospasm (Prinzmetal angina), stroke, transient ischemic attack (TIA), or uncontrolled stage 2 hypertension.",
          "**Ditans vs. Gepants Profiling**: Lasmiditan (5-HT1F receptor agonist) achieves acute pain freedom without coronary vasoconstrictive activity, though patients must avoid operating motor vehicles for at least 8 hours post-dose due to central sedation.",
          "**Neuromodulatory Non-Invasive Technologies**: Transcutaneous supraorbital neurostimulation (e-TNS), remote electrical neuromodulation (REN), and non-invasive vagus nerve stimulation (nVNS) offer FDA-cleared non-pharmacological acute and preventive efficacy.",
          "**Status Migrainosus Emergency Protocol**: Migraine attacks persisting beyond 72 hours require emergency department triage with IV rehydration, IV dopamine antagonists (metoclopramide 10mg or prochlorperazine 10mg), IV ketorolac 30mg, and IV dexamethasone (10-20mg) to prevent headache recurrence."
        ]
      }
    ]
  },

  // 2. Benign Prostatic Hyperplasia (BPH)
  "bph-enlarged-prostate-symptoms-medications-psa": {
    blocks: [
      {
        id: "block-bph-mtops-combat-trials",
        type: "clinical_overview",
        heading: "Urodynamic Progression, Transition Zone Hyperplasia & The Landmark MTOPS Trial",
        content: "Benign Prostatic Hyperplasia (BPH) represents stromal and epithelial cellular proliferation concentrated exclusively within the periurethral transition zone of the prostate gland. Intracellularly, testosterone is converted to dihydrotestosterone (DHT) with 5-fold greater androgen receptor affinity via the enzyme 5-alpha-reductase type 2. Over time, nodular expansion exerts static mechanical compression on the prostatic urethra, while increased alpha-1-adrenergic sympathetic tone within prostatic smooth muscle contributes dynamic bladder outlet obstruction (BOO).",
        items: [
          "**MTOPS Landmark Trial Findings**: The Medical Therapy of Prostatic Symptoms (MTOPS, NEJM, n=3,047) demonstrated that dual combination therapy (finasteride 5mg + doxazosin 4-8mg) reduced the overall risk of clinical BPH progression by 66%, significantly outperforming doxazosin alone (39%) or finasteride alone (34%).",
          "**CombAT Trial Synergy**: Dual therapy with dutasteride (dual 5-AR inhibitor) and tamsulosin 0.4mg significantly reduced the 4-year relative risk of acute urinary retention (AUR) by 68% and BPH-related surgical intervention by 71% in men with prostate volume >=30 mL and PSA >=1.5 ng/mL.",
          "**Free-to-Total PSA Velocity**: In men with total PSA between 4.0 and 10.0 ng/mL, a free PSA percentage <10% indicates a 56% probability of prostate cancer, whereas free PSA >25% indicates an 8% probability, guiding decision-making for multiparametric prostate MRI (mpMRI).",
          "**Urodynamic Detrusor Decompensation**: Long-standing bladder outlet obstruction causes detrusor trabeculation, pseudodiverticula formation, and uninhibited detrusor overactivity, eventually leading to myogenic failure with high post-void residual (PVR >200 mL) and bilateral hydronephrosis."
        ]
      },
      {
        id: "block-bph-surgical-interventions-pharmacology",
        type: "treatment_medications",
        heading: "Minimally Invasive Surgical Therapies (MIST) vs Standard Resection Modalities",
        content: "Modern urological practice stratifies surgical intervention based on prostate volume, intravesical prostatic protrusion (IPP), and patient preferences regarding sexual function preservation. While transurethral resection of the prostate (TURP) remains an established historical reference, laser enucleation and minimally invasive tissue ablation technologies deliver equivalent symptom score reductions with reduced perioperative morbidity and hemorrhage risks.",
        items: [
          "**Holmium/Thulium Laser Enucleation (HoLEP/ThuLEP)**: Complete anatomical enucleation of the adenoma along the surgical capsule provides durable relief for prostates of any size (even >100 cm3) with minimal blood loss and shorter catheterization duration (<24 hours).",
          "**Water Vapor Thermal Therapy (Rezūm)**: Convective radiofrequency water vapor delivers targeted thermal energy causing cell necrosis in transition zone and median lobe tissue, preserving erectile and ejaculatory function in over 90% of treated men.",
          "**Prostatic Urethral Lift (UroLift)**: Permanent transprostatic implants mechanically retract obstructing lateral lobes without thermal ablation, offering rapid convalescence and zero de novo sustained erectile or ejaculatory dysfunction.",
          "**Alpha-1-Blocker Side-Effect Mitigation**: Tamsulosin, silodosin (highly selective alpha-1A), and alfuzosin relax smooth muscle but can cause intraoperative floppy iris syndrome (IFIS) during cataract surgery and retrograde ejaculation."
        ]
      }
    ]
  },

  // 3. Obstructive Sleep Apnea (OSA)
  "obstructive-sleep-apnea-osa-cpap-heart-risks": {
    blocks: [
      {
        id: "block-osa-hemodynamics-save-trial",
        type: "clinical_overview",
        heading: "Pharyngeal Collapse Pathophysiology, Sympathetic Surges & The SAVE Trial",
        content: "Obstructive Sleep Apnea (OSA) results from recurrent nocturnal collapse of the upper pharyngeal airway during inspiration due to loss of pharyngeal dilator muscle tone (predominantly the genioglossus). Each apneic and hypopneic event induces sharp oxyhemoglobin desaturation, hypercapnia, and vigorous thoracic respiratory efforts that generate extreme negative intrathoracic pressures (often down to -40 to -60 cmH2O). These negative pressure swings markedly increase left ventricular afterload, while concurrent chemoreceptor activation triggers intense sympathetic surges, precipitating systemic vasoconstriction and endothelial dysfunction.",
        items: [
          "**Apnea-Hypopnea Index (AHI) Staging**: Normal (<5 events/hr), Mild (5–14.9 events/hr), Moderate (15–29.9 events/hr), Severe (>=30 events/hr). Respiratory Disturbance Index (RDI) further incorporates Respiratory Effort-Related Arousals (RERAs).",
          "**SAVE Randomized Controlled Trial**: The Sleep Apnea Cardiovascular Endpoints (SAVE, NEJM, n=2,717) trial established that while CPAP therapy significantly improves daytime sleepiness, cognitive mood scores, and quality of life, secondary cardiovascular prevention requires adequate nightly adherence (>4 hours per night).",
          "**Secondary Refractory Hypertension Mechanism**: Nocturnal hypoxia upregulates the renin-angiotensin-aldosterone system (RAAS) and induces endothelin-1 synthesis; over 80% of patients with drug-resistant hypertension (uncontrolled on 3+ antihypertensive agents) have undiagnosed underlying OSA.",
          "**Atrial Remodeling & Arrhythmogenic Risk**: Acute left atrial stretch from negative intrathoracic pressure coupled with autonomic fluctuations increases the risk of nocturnal atrial fibrillation, non-sustained ventricular tachycardia, and sudden cardiac death during sleep."
        ]
      },
      {
        id: "block-osa-cpap-alternatives-mandibular",
        type: "treatment_medications",
        heading: "CPAP Optimization, Mandibular Advancement Devices & Hypoglossal Stimulation",
        content: "Continuous Positive Airway Pressure (CPAP) acts as a pneumatic splint maintaining pharyngeal patency throughout inspiration and expiration. However, long-term therapeutic success depends entirely on adherence management, mask interface optimization, and heated humidification to minimize mucosal drying, nasal congestion, and claustrophobia.",
        items: [
          "**Clinical Adherence Benchmark**: Standard CMS and clinical guidelines define adherence as device usage >=4 hours per night for at least 70% of nights within a consecutive 30-day monitoring window.",
          "**Auto-Titrating CPAP (APAP) Protocols**: Algorithms dynamically adjust delivered pressures (typically range 6–16 cmH2O) in response to airflow limitation, snoring vibrations, and detected airway impedance.",
          "**Custom Mandibular Advancement Devices (MAD)**: Indicated for mild-to-moderate OSA or CPAP-intolerant patients; titratable oral appliances mechanically advance the mandible and tongue base by 6–10 mm, expanding the velopharyngeal and retroglossal airway lumen.",
          "**Implantable Hypoglossal Nerve Stimulation**: An FDA-approved upper airway neurostimulation system (Inspire) synchronizes mild electrical pulses to the hypoglossal nerve branch with respiratory effort, selectively protruding the tongue forward during inspiration in patients with BMI <35 kg/m2 and absence of complete concentric palate collapse."
        ]
      }
    ]
  },

  // 4. Hypothyroidism & Hashimoto's Thyroiditis
  "hypothyroidism-hashimotos-tsh-levels-treatment": {
    blocks: [
      {
        id: "block-hashimotos-autoimmunity-ata-guidelines",
        type: "clinical_overview",
        heading: "Thyroid Peroxidase Autoimmunity, Peripheral Deiodination & ATA Clinical Targets",
        content: "Hashimoto's thyroiditis (chronic lymphocytic thyroiditis) is an organ-specific autoimmune disorder characterized by cell-mediated cytotoxicity, lymphocytic infiltration (CD4+ T-helper and CD8+ cytotoxic T cells), and circulating autoantibodies directed against Thyroid Peroxidase (anti-TPO) and Thyroglobulin (anti-Tg). Chronic follicular architectural destruction diminishes serum thyroxine (T4) output, removing pituitary negative feedback and driving compensatory Thyroid-Stimulating Hormone (TSH) hypersecretion. Peripherally, approximately 80% of circulating biologically active triiodothyronine (T3) is derived from 5'-deiodination of T4 in the liver, kidneys, and skeletal muscle.",
        items: [
          "**ATA Reference Target Ranges**: The American Thyroid Association (ATA) targets serum TSH between 0.5 and 2.5 mIU/L for non-pregnant adults on levothyroxine, while geriatric targets (>70 years) are safely relaxed to 3.0–6.0 mIU/L to prevent subclinical thyrotoxicosis-induced atrial fibrillation and bone mineral density loss.",
          "**Subclinical Hypothyroidism Decision Algorithm**: Treatment is universally indicated for serum TSH >=10.0 mIU/L due to elevated cardiovascular mortality and heart failure risk. For TSH between 4.5 and 9.9 mIU/L, treatment is indicated in the presence of positive anti-TPO titers, symptomatic goiter, pregnancy, or dyslipidemia.",
          "**Levothyroxine Pharmacokinetics & Dosing**: Full replacement dose is approximately 1.6 mcg/kg of ideal body weight per day in young healthy patients without residual endogenous thyroid output, initiated lower (25–50 mcg/day) in patients with coronary artery disease.",
          "**GI Malabsorption & Drug Chelation**: Levothyroxine absorption occurs primarily in the jejunum and ileum. Co-ingestion with calcium carbonate, ferrous sulfate, cholestyramine, or proton pump inhibitors (which reduce gastric acidity needed for tablet dissolution) reduces bioavailability by up to 50%, mandating a 4-hour separation window."
        ]
      },
      {
        id: "block-hashimotos-t3-combination-safety",
        type: "treatment_medications",
        heading: "Combination T4/T3 Evidence, Selenium Trials & Myxedema Coma Prevention",
        content: "While levothyroxine monotherapy remains the global standard of care, a subset of patients with persistent fatigue and cognitive symptoms despite biochemical euthyroidism carries the deiodinase type 2 (DIO2 Thr92Ala) polymorphism, which may impair intracellular conversion of T4 to T3. However, routine desiccated thyroid extract or synthetic T3 (liothyronine) addition requires strict clinical monitoring due to rapid gastrointestinal absorption, short serum half-life (18–24 hours), and potential peaks in resting heart rate and arterial pulse pressure.",
        items: [
          "**Liothyronine (T3) Combination Trials**: Randomized trials indicate physiological 14:1 or 10:1 T4:T3 combination therapy may benefit select DIO2 polymorphism carriers, but should be divided twice daily to prevent supraphysiological post-dose adrenergic surges.",
          "**Selenium Supplementation Clinical Evidence**: The CATALYST and related autoimmune thyroid trials demonstrated that 200 mcg/day of selenomethionine reduces anti-TPO antibody titers by 20–40% over 6–12 months, though it does not reliably restore endogenous thyroid hormone synthesis.",
          "**Myxedema Coma Emergency Protocol**: Severe decompensated hypothyroidism triggered by infection or surgery presents with hypothermia, bradycardia, hypoventilation, and encephalopathy, requiring immediate ICU admission, IV levothyroxine (200–400 mcg loading dose), and IV stress-dose hydrocortisone to prevent precipitating adrenal crisis.",
          "**Pregnancy Dose Escalation**: In early gestation, maternal thyroid demand increases by 30–50% due to estrogen-induced thyroxine-binding globulin (TBG) elevation and placental hCG thyroid stimulation; patients must empirically increase levothyroxine dosage by 2 extra tablets weekly upon a positive pregnancy test."
        ]
      }
    ]
  },

  // 5. Peripheral Artery Disease (PAD)
  "peripheral-artery-disease-pad-symptoms-abi-treatment": {
    blocks: [
      {
        id: "block-pad-abi-compass-trial",
        type: "clinical_overview",
        heading: "Atherosclerotic Lower-Extremity Hypoperfusion, The ABI Index & The COMPASS Trial",
        content: "Peripheral Artery Disease (PAD) results from systemic atherosclerosis causing progressive luminal stenosis in the infra-renal aorta, iliac, femoropopliteal, and infrapopliteal tibial arterial beds. During ambulation, increased metabolic oxygen demand in contracting calf musculature (gastrocnemius and soleus) outstrips fixed hemodynamic inflow, producing intermittent claudication that resolves with 5–10 minutes of standing rest. Clinically, PAD serves as a definitive systemic marker of polyvascular atherosclerosis; patients with symptomatic lower extremity PAD face a 3-fold higher 10-year risk of myocardial infarction, stroke, and cardiovascular death compared to age-matched controls.",
        items: [
          "**Ankle-Brachial Index (ABI) Diagnostic Standards**: Normal (1.00–1.40), Borderline (0.91–0.99), Abnormal PAD (<=0.90), Severe Limb Ischemia (<=0.40). An ABI >1.40 indicates non-compressible, calcified medial arteries (common in diabetes and advanced CKD), requiring secondary Toe-Brachial Index (TBI, abnormal if <=0.70).",
          "**COMPASS Randomized Trial Breakthrough**: The landmark COMPASS trial (NEJM, n=27,395) proved that 'dual pathway inhibition'—combining low-dose rivaroxaban (2.5mg twice daily) with aspirin (100mg daily)—reduced major adverse cardiovascular events (MACE) by 24% and major adverse limb events (MALE), including major amputation, by 46% compared to aspirin alone.",
          "**Supervised Exercise Therapy (SET) Guidelines**: The ACC/AHA guidelines assign a Class I recommendation to hospital- or clinic-based SET programs (intermittent treadmill walking to moderate claudication pain for 30–45 minutes, >=3 times/week for a minimum of 12 weeks), which improves pain-free walking distance by 120–180% through collateral vessel recruitment and improved skeletal muscle mitochondrial efficiency.",
          "**Pharmacological Claudication Relief**: Cilostazol (100mg twice daily), a selective phosphodiesterase-3 (PDE3) inhibitor with antiplatelet and vasodilatory properties, significantly increases maximal walking distance, but remains strictly contraindicated in patients with any degree of heart failure (NYHA Class I–IV)."
        ]
      },
      {
        id: "block-pad-clti-wifi-endovascular",
        type: "treatment_medications",
        heading: "Critical Limb-Threatening Ischemia (CLTI), The WIfI System & Revascularization",
        content: "When arterial perfusion falls below the basal metabolic demands of resting tissues, PAD transitions into Critical Limb-Threatening Ischemia (CLTI). CLTI manifests as severe nocturnal rest pain in the distal forefoot (often relieved by dangling the leg over the edge of the bed to recruit gravity-assisted perfusion), ischemic non-healing skin ulcerations, and gangrene. Without prompt diagnostic angiographic localization and arterial revascularization, 25% of CLTI patients require major limb amputation within 12 months.",
        items: [
          "**SVS WIfI Classification System**: Evaluates amputation risk based on three objective parameters: Wound depth/extent (W: 0–3), Ischemia degree by ankle pressure/transcutaneous oximetry TcPO2 (I: 0–3), and Foot Infection severity (fI: 0–3).",
          "**Endovascular Balloon Angioplasty & Stenting**: Preferred first-line strategy for focal aortoiliac and superficial femoral artery (SFA) lesions (TASC II Class A–C), utilizing drug-coated balloons (DCBs) and drug-eluting stents (DES) to suppress neointimal smooth muscle hyperplasia.",
          "**Surgical Infrainguinal Bypass**: The BEST-CLI randomized trial (NEJM 2022) established that for patients with an adequate autologous great saphenous vein (GSV) conduit, surgical femoral-popliteal or femoral-tibial bypass produces significantly lower rates of major re-intervention and amputation compared to endovascular approaches.",
          "**Comprehensive Medical Secondary Prevention**: All PAD patients require high-intensity statin therapy (atorvastatin 80mg or rosuvastatin 40mg targeting LDL-C <55 mg/dL), blood pressure optimization (<130/80 mmHg with ACEi/ARB), and complete tobacco cessation with dual pharmacotherapy (varenicline or bupropion + NRT)."
        ]
      }
    ]
  },

  // 6. PCOS
  "pcos-symptoms-hormone-balance-treatment-guide": {
    blocks: [
      {
        id: "block-pcos-rotterdam-insulin-axis",
        type: "clinical_overview",
        heading: "The Rotterdam Diagnostic Framework, Ovarian Steroidogenesis & Insulin Resistance",
        content: "Polycystic Ovary Syndrome (PCOS) is a complex heterogenous endocrine-metabolic disorder affecting 8–13% of reproductive-aged women globally. The consensus Rotterdam 2003 criteria mandate the presence of at least two of three criteria: (1) Oligo- or anovulation (irregular or absent menstrual cycles), (2) Clinical or biochemical hyperandrogenism (hirsutism, severe acne, androgenic alopecia, or elevated total/free testosterone), and (3) Polycystic ovarian morphology on transvaginal ultrasonography (>=20 follicles per ovary measuring 2–9 mm, or ovarian volume >=10 mL).",
        items: [
          "**Hyperinsulinemia & Theca Cell Stimulation**: Up to 75% of women with PCOS exhibit selective insulin resistance. Compensatory hyperinsulinemia binds directly to ovarian insulin and IGF-1 receptors, synergizing with LH to hyper-stimulate CYP17A1 enzyme activity in ovarian theca cells, causing excessive testosterone and androstenedione synthesis.",
          "**Sex Hormone-Binding Globulin (SHBG) Suppression**: Hyperinsulinemia directly inhibits hepatic synthesis of SHBG, markedly increasing the percentage of biologically active, unbound free testosterone that binds androgen receptors in hair follicles and sebaceous glands.",
          "**Neuroendocrine LH/FSH Pulse Dysregulation**: Elevated hypothalamic GnRH pulse frequency preferentially stimulates anterior pituitary LH secretion over FSH, leading to an elevated serum LH:FSH ratio (often >2:1 or >3:1), which arrests antral follicle development and prevents selection of a dominant ovulatory follicle.",
          "**Metabolic Screening Standards**: The International PCOS Guideline recommends a baseline 75g 2-hour oral glucose tolerance test (OGTT), fasting lipid panel, and annual blood pressure monitoring for all diagnosed patients regardless of Body Mass Index (BMI)."
        ]
      },
      {
        id: "block-pcos-pharmacotherapy-infertility",
        type: "treatment_medications",
        heading: "Combined Oral Contraceptives, Anti-Androgens & Letrozole Ovulation Protocols",
        content: "Therapeutic management is customized according to whether pregnancy is actively desired. For patients not seeking pregnancy, first-line medical therapy combines lifestyle interventions with combined oral contraceptives (COCs) to suppress ovarian steroidogenesis, restore endometrial shedding, and lower androgen-mediated clinical dermatological symptoms.",
        items: [
          "**COC Progestin Selection**: Preferred formulations contain anti-androgenic or neutral progestins (such as drospirenone, dienogest, or norgestimate); drospirenone acts as a competitive androgen receptor antagonist and aldosterone antagonist, reducing water retention and sebum production.",
          "**Spironolactone Anti-Androgen Adjunction**: If hirsutism or acne persists after 6 months of COC therapy, add-on spironolactone (50–200 mg/day) competitively blocks cutaneous androgen receptors and inhibits 5-alpha-reductase, requiring concurrent reliable contraception due to feminization risk in male fetuses.",
          "**Metformin Insulin-Sensitizing Protocols**: Metformin (1,500–2,000 mg/day extended-release) reduces hepatic gluconeogenesis, improves systemic insulin sensitivity, lowers fasting insulin by up to 40%, and aids in spontaneous ovulation restoration, particularly in patients with BMI >25 kg/m2 or impaired glucose tolerance.",
          "**Letrozole First-Line Ovulation Induction**: The landmark PPCOS II trial (NEJM) established letrozole (2.5–7.5 mg daily for 5 days starting cycle days 3–5) as superior to clomiphene citrate, achieving significantly higher cumulative ovulation rates (61.7% vs 48.3%) and live birth rates (27.5% vs 19.1%) with lower twin gestation risks."
        ]
      }
    ]
  },

  // 7. GERD & Acid Reflux
  "gerd-acid-reflux-symptoms-causes-lifestyle-treatment": {
    blocks: [
      {
        id: "block-gerd-lyon-consensus-mechanisms",
        type: "clinical_overview",
        heading: "Transient Lower Esophageal Sphincter Relaxations, The Lyon Consensus & pH-Impedance",
        content: "Gastroesophageal Reflux Disease (GERD) develops when gastric juice (containing hydrochloric acid, pepsin, and unconjugated bile acids) refluxes retrogradely into the esophagus, inciting epithelial mucosal inflammation, microscopic erosions, and painful sensory nerve terminal activation. The primary physiological defect in over 80% of GERD patients is inappropriate Transient Lower Esophageal Sphincter Relaxations (TLESRs)—vagally mediated inhibitory reflexes triggered by gastric fundic distension independent of swallowing. Concurrent anatomical sliding hiatal hernia further compromises the crural diaphragmatic extrinsic sphincter mechanism.",
        items: [
          "**The Lyon Consensus 2.0 Diagnostic Criteria**: Definitive evidence of pathological GERD requires either high-grade erosive esophagitis on upper endoscopy (Los Angeles Classification Grade C or D), long-segment Barrett's esophagus (>3 cm), peptic esophageal stricture, or 24-hour ambulatory pH-impedance monitoring showing Acid Exposure Time (AET) >6.0%.",
          "**Los Angeles (LA) Endoscopic Classification**: Grade A (one or more mucosal breaks <=5 mm not extending between mucosal folds), Grade B (breaks >5 mm), Grade C (continuous breaks across <75% of esophageal circumference), Grade D (continuous circumferential erosions >=75%).",
          "**Extra-Esophageal (Atypical) Manifestations**: Reflux-induced laryngeal micro-aspiration and vagal esophagobronchial reflex bronchospasm cause chronic nocturnal cough, morning hoarseness, globus sensation, throat clearing, and secondary adult-onset asthma exacerbations.",
          "**Barrett's Esophagus Metaplasia Surveillance**: Chronic acid-peptic exposure induces specialized intestinal columnar metaplasia with goblet cells (Barrett's esophagus), conferring a 0.2–0.5% annual risk of esophageal adenocarcinoma, requiring 4-quadrant Seattle protocol surveillance biopsies every 3–5 years."
        ]
      },
      {
        id: "block-gerd-pcab-surgical-fundoplication",
        type: "treatment_medications",
        heading: "PPI Step-Down Strategy, Potassium-Competitive Acid Blockers & LINX Interventions",
        content: "Proton Pump Inhibitors (PPIs) inhibit active H+/K+-ATPase pumps on parietal cell secretory membranes, providing superior mucosal healing compared to histamine-2 receptor antagonists (H2RAs). However, long-term continuous high-dose therapy requires active clinical evaluation to prevent rebound acid hypersecretion upon abrupt cessation and to assess genuine necessity against nutritional absorption considerations.",
        items: [
          "**Proper PPI Administration Timing**: Omeprazole (20-40mg), pantoprazole (40mg), or esomeprazole (40mg) must be ingested 30–60 minutes before the first meal of the day, as newly synthesized proton pumps are recruited to parietal cell apical membranes during meal anticipation.",
          "**Potassium-Competitive Acid Blockers (PCABs - Vonoprazan)**: Vonoprazan (20mg daily) binds competitively and reversibly to the potassium-binding site of H+/K+-ATPase without requiring acid activation, achieving faster, more durable intragastric pH >4 control (often within 2 hours) and higher healing rates in LA Grade C/D erosive esophagitis.",
          "**Rebound Acid Hypersecretion Avoidance**: Abrupt discontinuation of PPIs after >=8 weeks causes compensatory hypergastrinemia to hyper-stimulate parietal cells, producing rebound severe heartburn; taper doses by 50% weekly or bridge with famotidine (20-40mg) over 4 weeks.",
          "**Magnetic Sphincter Augmentation (LINX) & Nissen Fundoplication**: For medically refractory non-erosive reflux or volume regurgitation in patients with normal esophageal motility, laparoscopic Nissen 360-degree fundoplication or magnetic titanium bead augmentation (LINX) mechanically reinforces the lower esophageal junction without lifelong medication."
        ]
      }
    ]
  },

  // 8. hs-CRP Blood Test
  "hs-crp-blood-test-systemic-inflammation-heart-risk": {
    blocks: [
      {
        id: "block-hscrp-jupiter-cantos-trials",
        type: "clinical_overview",
        heading: "Hepatic Acute-Phase Synthesis, The JUPITER Trial & The CANTOS Breakthrough",
        content: "High-sensitivity C-Reactive Protein (hs-CRP) is a pentameric acute-phase reactant synthesized primarily by hepatocytes under direct transcriptional regulation by interleukin-6 (IL-6), tumor necrosis factor-alpha (TNF-alpha), and interleukin-1beta (IL-1beta). In cardiovascular biology, hs-CRP serves as a stable, circulating surrogate marker of low-grade chronic vascular endothelial inflammation. The protein binds directly to oxidized low-density lipoprotein (oxLDL) within atheromatous plaques, activates the classical complement cascade, and downregulates endothelial nitric oxide synthase (eNOS), impairing endothelium-dependent vasodilation.",
        items: [
          "**CDC & AHA Cardiovascular Risk Stratification**: Low Risk (<1.0 mg/L), Average Risk (1.0–3.0 mg/L), High Risk (>3.0 mg/L). An isolated hs-CRP >10.0 mg/L reflects acute systemic infection, autoimmune flare, or tissue trauma, mandating repeat testing in 2–4 weeks rather than vascular risk reassessment.",
          "**The JUPITER Landmark Clinical Trial**: Published in the NEJM (n=17,802), the JUPITER trial demonstrated that in apparently healthy individuals with normal LDL-C (<130 mg/dL) but elevated hs-CRP (>=2.0 mg/L), rosuvastatin 20mg daily reduced major adverse cardiovascular events (myocardial infarction, stroke, cardiovascular death) by a dramatic 44%.",
          "**CANTOS & The Inflammatory Hypothesis**: The landmark CANTOS trial (NEJM 2017) proved that targeting the IL-1beta-to-IL-6-to-CRP pathway directly with canakinumab significantly lowered recurrent cardiovascular events by 15% completely independent of lipid levels, definitively establishing the inflammatory hypothesis of atherothrombosis.",
          "**Residual Inflammatory Risk vs. Residual Cholesterol Risk**: In statin-treated patients who achieve target LDL-C (<70 mg/dL) but maintain hs-CRP >2.0 mg/L, persistent residual inflammatory risk equals or exceeds residual cholesterol risk, identifying patients who benefit from intensified anti-inflammatory lifestyle adaptations and adjunctive therapy."
        ]
      },
      {
        id: "block-hscrp-colchicine-lifestyle-reduction",
        type: "treatment_medications",
        heading: "Low-Dose Colchicine (LoDoCo2), Dietary Interventions & Biomarker Re-evaluation",
        content: "Reducing systemic inflammatory tone requires targeting both visceral adiposity—the primary source of pro-inflammatory adipokines and IL-6 hypersecretion—and coronary plaque macrophage activation through guideline-supported anti-inflammatory modalities.",
        items: [
          "**LoDoCo2 Trial & Low-Dose Colchicine Approval**: The LoDoCo2 trial (NEJM, n=5,522) demonstrated that low-dose colchicine (0.5 mg once daily) added to standard secondary prevention regimens in chronic coronary disease patients reduced cardiovascular death, spontaneous MI, and ischemia-driven revascularization by 31%, leading to FDA approval for vascular risk reduction.",
          "**Mediterranean Dietary Pattern Inflammatory Impact**: The PREDIMED trial demonstrated that an ad libitum Mediterranean diet enriched with extra-virgin olive oil (>=4 tablespoons/day) or mixed tree nuts (30g/day) lowers circulating hs-CRP, IL-6, and vascular cell adhesion molecule-1 (VCAM-1) within 12 weeks.",
          "**Visceral Adiposity & Weight Reduction Dynamics**: Every 5% loss of baseline body weight mediated by caloric restriction and aerobic exercise yields a proportional 20–30% reduction in circulating hs-CRP through attenuation of mesenteric and omental macrophage infiltration.",
          "**Biomarker Triage Schedule**: For primary cardiovascular prevention risk reclassification, clinicians evaluate two separate hs-CRP measurements obtained at least two weeks apart in fasting, metabolically stable, afebrile patients, averaging the values to establish baseline vascular risk."
        ]
      }
    ]
  },

  // 9. High Cholesterol & Lipid Panel
  "high-cholesterol-lipid-panel-diet-statin-guide": {
    blocks: [
      {
        id: "block-lipid-apob-pcsk9-fourier",
        type: "clinical_overview",
        heading: "ApoB Particle Concentration, The FOURIER Trial & The ACC/AHA Risk Thresholds",
        content: "Atherosclerotic Cardiovascular Disease (ASCVD) is driven by the transendothelial retention and subsequent oxidative modification of Apolipoprotein B (ApoB)-containing lipoproteins—including low-density lipoprotein (LDL), very-low-density lipoprotein (VLDL), and intermediate-density lipoprotein (IDL)—within the subendothelial space of coronary and peripheral arteries. While standard lipid panels report LDL-C as the mass of cholesterol carried inside LDL particles, Apolipoprotein B (ApoB) directly quantifies the exact total count of circulating atherogenic particles, resolving critical diagnostic discordance in patients with insulin resistance and metabolic syndrome.",
        items: [
          "**ACC/AHA/ESC Guideline LDL-C Targets**: For very-high-risk patients with established ASCVD or multiple major risk factors: target LDL-C <55 mg/dL (1.4 mmol/L) and >=50% reduction from baseline. For high-risk primary prevention: target LDL-C <70 mg/dL (1.8 mmol/L).",
          "**FOURIER & ODYSSEY OUTCOMES Trials**: Pivotal trials evaluating PCSK9 monoclonal antibodies (evolocumab and alirocumab, NEJM) demonstrated that adding PCSK9 inhibition to statin therapy lowered LDL-C to median levels of 30 mg/dL (0.78 mmol/L), producing significant 15–20% additional reductions in cardiovascular death, MI, and stroke with robust neurocognitive and physiological safety.",
          "**Apolipoprotein B (ApoB) & Non-HDL Benchmarks**: Guideline-directed ApoB target is <65 mg/dL for very-high-risk patients and <80 mg/dL for high-risk patients. Non-HDL-C (total cholesterol minus HDL-C) serves as an accurate zero-cost surrogate for ApoB, with target <85 mg/dL.",
          "**Lipoprotein(a) [Lp(a)] Universal Screening**: The National Lipid Association (NLA) recommends measuring Lp(a) at least once in every adult's lifetime; levels >50 mg/dL (>125 nmol/L) represent an independent, genetically determined, causal risk factor for early myocardial infarction and calcific aortic valve stenosis."
        ]
      },
      {
        id: "block-lipid-statin-titration-sams-ezetimibe",
        type: "treatment_medications",
        heading: "High-Intensity Statin Titration, Ezetimibe Synergy & SAMS Clinical Workup",
        content: "Achieving guideline-mandated lipid targets requires a stepwise pharmacological titration protocol combining HMG-CoA reductase inhibitors (statins) with complementary cholesterol absorption inhibitors and modern injectable biotherapeutics when targets remain unmet.",
        items: [
          "**High-Intensity Statin Regimens**: Atorvastatin 40–80 mg or Rosuvastatin 20–40 mg daily lowers LDL-C by >=50% by upregulating cell-surface LDL receptor density, increasing hepatic clearance of circulating atherogenic particles.",
          "**IMPROVE-IT Trial & Ezetimibe Combination**: The IMPROVE-IT trial (NEJM, n=18,144) proved that adding ezetimibe (10 mg daily), which selectively blocks the Niemann-Pick C1-Like 1 (NPC1L1) intestinal cholesterol transporter, adds an incremental 15–20% LDL-C reduction and significantly lowers cardiovascular events post-acute coronary syndrome.",
          "**Statin-Associated Muscle Symptoms (SAMS) Protocol**: True statin myopathy occurs in <5% of patients. Clinical triage includes measuring serum creatine kinase (CK), checking for drug interactions (CYP3A4 inhibitors), trial of alternative statin (e.g. hydrophilic rosuvastatin or pravastatin), alternate-day dosing, or CoQ10 adjunct (200 mg/day).",
          "**Bempedoic Acid (CLEAR Outcomes Trial)**: For statin-intolerant patients, bempedoic acid (180 mg daily) inhibits ATP-citrate lyase upstream of HMG-CoA reductase exclusively in the liver without muscle activation, reducing major cardiovascular events by 13% (NEJM 2023)."
        ]
      }
    ]
  },

  // 10. Adult ADHD
  "adult-adhd-signs-executive-dysfunction-management": {
    blocks: [
      {
        id: "block-adhd-neurobiology-dsm5-asrs",
        type: "clinical_overview",
        heading: "Prefrontal Dopaminergic Signaling, The DSM-5-TR Diagnostic Criteria & ASRS v1.1",
        content: "Attention-Deficit/Hyperactivity Disorder (ADHD) in adults is a persistent neurodevelopmental disorder characterized by structural and functional dysregulation within fronto-striatal and fronto-parietal neural circuits. Neurobiologically, hypofunctioning dopamine D1/D2 receptors and alpha-2A noradrenergic receptors within the dorsolateral prefrontal cortex (dlPFC) impair top-down executive control—the neurological mechanism responsible for working memory, selective attention, cognitive flexibility, and response inhibition. Rather than an inability to pay attention, adult ADHD is fundamentally a disorder of attention dysregulation and executive self-governance.",
        items: [
          "**DSM-5-TR Diagnostic Thresholds**: Adults (aged 17+) require at least 5 persistent symptoms of inattention or 5 symptoms of hyperactivity/impulsivity across at least two independent functional settings (work, home, social) for >6 months, with documented evidence that several symptoms were present prior to age 12.",
          "**Adult ADHD Self-Report Scale (ASRS v1.1)**: Validated 6-question Part A screening tool developed with the World Health Organization (WHO); scoring 4 or more shaded boxes indicates high diagnostic probability warranting formal clinical psychiatric evaluation.",
          "**Executive Dysfunction Manifestations**: Working memory deficits (losing track of ongoing mental operations), severe prospective memory failure (forgetting future planned commitments), time blindness (inability to perceive the subjective passage of time), and activation paralysis for non-novel tasks.",
          "**Differential & Comorbidity Screening**: Up to 80% of adults with ADHD have at least one co-occurring psychiatric condition; clinicians must rule out or manage concurrent generalized anxiety disorder, major depression, bipolar disorder, and obstructive sleep apnea prior to finalizing treatment."
        ]
      },
      {
        id: "block-adhd-psychostimulants-nonstimulants-cbt",
        type: "treatment_medications",
        heading: "First-Line Psychostimulant Titration, Non-Stimulants & Cognitive Scaffolding",
        content: "Multimodal treatment combining guideline-directed pharmacotherapy with structured cognitive-behavioral scaffolding achieves the highest rates of functional occupational and personal stabilization in adult ADHD.",
        items: [
          "**Psychostimulant Titration (Methylphenidate vs. Amphetamine)**: Methylphenidate formulations block dopamine and norepinephrine reuptake transporters (DAT/NET); amphetamine salts (mixed amphetamine salts, lisdexamfetamine) both block reuptake and stimulate presynaptic vesicular monoamine release. Extended-release formulations (10–14 hour duration) are first-line to provide smooth coverage without rapid rebound anxiety.",
          "**Non-Stimulant Pharmacotherapy**: For patients with substance use history, severe cardiovascular contraindications, or stimulant intolerance, atomoxetine (selective NET inhibitor, 40–100 mg/day), viloxazine ER, or extended-release alpha-2A agonists (guanfacine ER 1–4 mg/day, clonidine ER) provide effective non-scheduled alternatives.",
          "**Cardiovascular Monitoring Protocol**: Before initiating psychostimulants, obtain baseline resting ECG in patients with cardiovascular history, and monitor resting blood pressure and heart rate at each dose adjustment step.",
          "**Environmental Friction & Behavioral Scaffolding**: Implement external working memory anchors: visible analog timers for time visualization, single-tasking 'visual horizon' workspaces, the Pomodoro method (25-min focus / 5-min break), and friction reduction for task initiation."
        ]
      }
    ]
  },

  // 11. Science of Stress Management
  "science-of-stress-management": {
    blocks: [
      {
        id: "block-stress-hpa-axis-cortisol-biomarkers",
        type: "clinical_overview",
        heading: "The Neuroendocrine HPA Cascade, Cortisol Awakening Response & Allostatic Load",
        content: "The physiological human stress response is orchestrated by the reciprocal interplay between the Sympathetic-Adreno-Medullary (SAM) axis and the Hypothalamic-Pituitary-Adrenal (HPA) axis. Upon perception of real or imagined psychological threat, the paraventricular nucleus of the hypothalamus secretes Corticotropin-Releasing Hormone (CRH), stimulating the anterior pituitary to release Adrenocorticotropic Hormone (ACTH). ACTH acts upon the adrenal cortex to synthesize and secrete glucocorticoids, predominantly cortisol. While acute cortisol mobilization enhances gluconeogenesis, suppresses non-essential reproduction, and sharpens visual-spatial attention, chronic unremitting stress induces allostatic overload.",
        items: [
          "**Cortisol Awakening Response (CAR)**: Evaluates physiological HPA axis vitality; in healthy individuals, salivary cortisol increases by 50–75% within the first 30–45 minutes following awakening, followed by a steep diurnal decline reaching nadir at midnight. Chronic burnout manifests as a flattened or blunted CAR curve.",
          "**Heart Rate Variability (HRV) Biomarker**: The root mean square of successive differences (RMSSD) between adjacent normal heartbeats reflects vagal parasympathetic efferent activity; lower resting HRV directly correlates with autonomic rigidity, chronic stress exhaustion, and elevated cardiovascular morbidity.",
          "**Allostatic Load Multi-System Score**: Clinical evaluation measures 10 neuroendocrine, cardiovascular, immune, and metabolic markers: systolic BP, diastolic BP, waist-to-hip ratio, total cholesterol/HDL ratio, HbA1c, DHEA-S, 12-hour urinary cortisol, epinephrine, and hs-CRP.",
          "**Hippocampal Neurogenesis Suppression**: Prolonged hypercortisolemia downregulates Brain-Derived Neurotrophic Factor (BDNF) and induces dendritic atrophy in CA3 pyramidal neurons of the hippocampus, causing subjective brain fog and declarative memory deficits."
        ]
      },
      {
        id: "block-stress-vagal-neuromodulation-sigh",
        type: "self_care_lifestyle",
        heading: "Vagal Autonomic Down-Regulation, Cyclic Physiological Sighing & Resonant Breathing",
        content: "Modulating the autonomic nervous system in real-time requires harnessing physiological biofeedback mechanisms that mechanically alter intrathoracic hemodynamics to drive central parasympathetic deceleration.",
        items: [
          "**The Cyclic Physiological Sigh Protocol**: Demonstrated in a randomized controlled trial (Cell Reports Medicine 2023, Huberman et al.), two rapid sequential nasal inhalations (the second topping off collapsed pulmonary alveoli) followed by a prolonged, unforced oral exhalation practiced for 5 minutes daily produced greater improvements in mood and resting autonomic tone than mindfulness meditation.",
          "**Resonant Frequency Breathing (0.1 Hz)**: Pacing respiration to exactly 5.5 to 6 breaths per minute (4-second inhalation, 6-second exhalation) aligns respiratory sinus arrhythmia with arterial baroreflex oscillations, maximizing heart rate variability and suppressing sympathetic vasomotor tone.",
          "**Cold Water Diving Reflex Stimulation**: Submerging the forehead and periorbital region in cold water (10–15°C / 50–59°F) for 15–30 seconds stimulates trigeminal nerve ophthalmic afferents, triggering the mammalian dive reflex to produce immediate vagal bradycardia.",
          "**Cognitive Reframing & Stress Inoculation**: Modulating subjective cognitive appraisals—shifting the internal narrative from a 'threat state' (vasoconstriction, high peripheral resistance) to a 'challenge state' (vasodilation, high cardiac output)—alters neurovascular hemodynamics and reduces cortisol reactivity."
        ]
      }
    ]
  },

  // 12. Managing Blood Pressure Naturally
  "managing-blood-pressure-naturally": {
    blocks: [
      {
        id: "block-bp-sprint-dash-sodium-trials",
        type: "clinical_overview",
        heading: "Endothelial Hemodynamics, The SPRINT Trial & The DASH-Sodium Paradigm",
        content: "Blood pressure is the product of Cardiac Output (CO) and Total Peripheral Resistance (TPR). Primary essential hypertension develops from progressive microvascular remodeling, arterial wall elastin degradation, and chronic renal sodium retention driven by sympathetic overactivation and low-grade endothelial inflammation. Over time, increased pulsatile shear stress damages delicate microvascular capillary beds in the brain, retina, and renal glomeruli.",
        items: [
          "**SPRINT Landmark Trial Findings**: The Systolic Blood Pressure Intervention Trial (SPRINT, NEJM, n=9,361) demonstrated that treating systolic blood pressure to an intensive target of <120 mmHg (compared to the standard target of <140 mmHg) reduced major fatal and non-fatal cardiovascular events by 25% and all-cause mortality by 27%.",
          "**The DASH-Sodium Collaborative Trial**: Evaluated in multi-center clinical trials, combining the Dietary Approaches to Stop Hypertension (DASH) eating plan with sodium restriction (<1,500 mg/day) reduced systolic blood pressure by an astounding 11.5 mmHg in hypertensive patients—equivalent to or exceeding the efficacy of single-agent pharmacotherapy.",
          "**Potassium-to-Sodium Balance Dynamics**: Dietary potassium intake of 3,500–4,700 mg/day from whole foods (spinach, avocados, white beans, sweet potatoes) promotes renal natriuresis via the Na+/Cl- cotransporter in the distal convoluted tubule and induces endothelial hyperpolarization, dropping SBP by 4–8 mmHg.",
          "**Ambulatory Blood Pressure Monitoring (ABPM)**: Essential for diagnosing white-coat hypertension and identifying non-dippers (patients whose nocturnal BP fails to drop by >=10% during sleep), who carry a 2-fold higher risk of stroke and heart failure."
        ]
      },
      {
        id: "block-bp-isometric-exercise-magnesium",
        type: "self_care_lifestyle",
        heading: "Isometric Handgrip Training, Magnesium Taurate & Aerobic Zone 2 Regimens",
        content: "Implementing targeted non-pharmacological interventions provides synergistic hemodynamic reductions that lower the required pharmacological load and preserve vascular compliance across aging.",
        items: [
          "**Isometric Handgrip Resistance Training**: A meta-analysis published in the British Journal of Sports Medicine identified isometric exercise (4 x 2-minute sustained contractions at 30% of maximum voluntary contraction, 3 days/week) as the single most effective exercise modality for BP reduction, lowering resting systolic pressure by 8.2 mmHg through chronic baroreflex resetting.",
          "**Zone 2 Aerobic Conditioning**: Accumulating 150–300 minutes of continuous moderate-intensity aerobic exercise weekly induces vascular endothelial growth factor (VEGF) synthesis and stimulates endothelial nitric oxide synthase (eNOS), reducing resting systemic vascular resistance.",
          "**Bioavailable Magnesium Supplementation**: Elemental magnesium (300–400 mg daily as glycinate or taurate) acts as a natural physiological calcium channel blocker on arterial smooth muscle, producing modest systolic reductions of 3–5 mmHg, particularly in individuals with subclinical dietary deficiency.",
          "**Alcohol Moderation Impact**: Limiting alcohol consumption to <=1 standard drink daily for women and <=2 for men (or complete abstinence) produces an immediate 4–5 mmHg reduction in systolic blood pressure within 2–4 weeks."
        ]
      }
    ]
  },

  // 13. Coronary Artery Disease (CAD)
  "coronary-artery-disease-symptoms-causes-treatment": {
    blocks: [
      {
        id: "block-cad-ischemia-trial-cac-agatston",
        type: "clinical_overview",
        heading: "Atheromatous Plaque Biology, Coronary Calcium Agatston Scores & The ISCHEMIA Trial",
        content: "Coronary Artery Disease (CAD) develops through chronic subendothelial accumulation of ApoB-containing lipoproteins, triggering macrophage recruitment, foam cell transformation, and chronic fibroatheroma plaque formation within epicardial coronary arteries. Stable angina occurs when fixed luminal stenosis exceeds 70% (or >50% in the left main coronary artery), creating a supply-demand mismatch during physical or emotional exertion. Acute Coronary Syndromes (ACS), however, frequently arise from the sudden rupture or superficial erosion of non-obstructive, thin-cap fibroatheroma (TCFA) plaques with high lipid content and active macrophage inflammation.",
        items: [
          "**Coronary Artery Calcium (CAC) Agatston Scoring**: CAC score 0 (extremely low 10-year ASCVD risk <1%, statin therapy can often be safely deferred), 1–99 (mild plaque burden), 100–399 (moderate plaque, definitive indication for statin and lifestyle therapy), >=400 (extensive plaque burden, 10-year event rate >20%, mandates high-intensity statin and consideration of functional stress imaging).",
          "**The Landmark ISCHEMIA Trial Findings**: Published in the NEJM (n=5,179), the ISCHEMIA trial demonstrated that in stable coronary disease patients with moderate-to-severe ischemia on stress testing, an initial invasive strategy (cardiac catheterization and stenting or CABG) did not reduce major cardiovascular events or all-cause mortality compared to an intensive conservative medical therapy strategy over 5 years.",
          "**Coronary Computed Tomography Angiography (CCTA)**: The SCOT-HEART trial established CCTA as the preferred diagnostic imaging modality for stable chest pain, enabling direct non-invasive anatomical visualization of both calcified and vulnerable non-calcified plaque morphology and stenosis severity.",
          "**High-Sensitivity Cardiac Troponin (hs-cTn)**: Serial hs-cTn testing using validated 0/1-hour or 0/2-hour emergency diagnostic algorithms allows rapid rule-out or rule-in of Non-ST-Elevation Myocardial Infarction (NSTEMI) based on dynamic delta rises."
        ]
      },
      {
        id: "block-cad-gdmt-antiplatelet-revascularization",
        type: "treatment_medications",
        heading: "Guideline-Directed Medical Therapy (GDMT), Antiplatelet Protocols & CABG vs PCI",
        content: "Long-term secondary prevention in CAD requires aggressive medical stabilization of the entire coronary vascular tree, suppressing plaque progression and eliminating secondary thrombotic occlusion.",
        items: [
          "**Four Pillars of CAD Medical Therapy**: (1) High-intensity statin (atorvastatin 80mg or rosuvastatin 40mg targeting LDL-C <55 mg/dL), (2) Antiplatelet therapy (aspirin 81mg daily), (3) Beta-blocker therapy (metoprolol succinate, carvedilol) for at least 1–3 years post-MI or if LVEF <40%, and (4) ACE inhibitor or ARB for concurrent hypertension, diabetes, CKD, or reduced ejection fraction.",
          "**Dual Antiplatelet Therapy (DAPT) Duration**: Following drug-eluting stent (DES) placement in ACS, DAPT with aspirin + potent P2Y12 inhibitor (ticagrelor 90mg BID or prasugrel 10mg daily) is maintained for 12 months, followed by single antiplatelet monotherapy, with DAPT duration individualized using the PRECISE-DAPT and DAPT scores.",
          "**Surgical CABG vs. Percutaneous PCI (SYNTAX Trial)**: Coronary Artery Bypass Grafting (CABG) remains superior to PCI with stents for complex multi-vessel disease, high SYNTAX scores (>22), diabetes, and left main trunk stenosis, delivering significantly lower long-term repeat revascularization and mortality rates.",
          "**Cardiac Rehabilitation Enrollment**: Comprehensive physician-supervised outpatient cardiac rehabilitation reduces all-cause mortality by 26% and hospital readmissions by 31% post-MI or revascularization through structured exercise training and risk factor education."
        ]
      }
    ]
  },

  // 14. Early Signs of Dementia vs Normal Aging
  "early-signs-dementia-alzheimers-vs-normal-aging": {
    blocks: [
      {
        id: "block-dementia-biomarkers-moca-finger",
        type: "clinical_overview",
        heading: "Neuropathological Staging, Plasma p-tau217 Biomarkers & The FINGER Trial",
        content: "Differentiating benign Age-Associated Memory Impairment (AAMI) from progressive neurodegenerative pathology requires objective neuropsychological testing and modern biomarker validation. Normal brain aging involves mild, non-progressive slowing of information processing speed and occasional retrieval lapses (such as forgetting a name but remembering it later), with completely preserved independent functional abilities. In contrast, Alzheimer's Disease (AD) is characterized by extracellular amyloid-beta (Abeta) neuritic plaques and intracellular neurofibrillary tangles composed of hyperphosphorylated tau (p-tau) protein, initiating decades before clinical amnestic Mild Cognitive Impairment (MCI) manifests.",
        items: [
          "**Plasma Phosphorylated Tau-217 (p-tau217)**: Emerging as the breakthrough gold-standard blood biomarker, plasma p-tau217 exhibits >90% diagnostic accuracy in detecting cerebral amyloid and tau pathology, matching the diagnostic fidelity of cerebrospinal fluid (CSF) assays and amyloid PET scans.",
          "**Montreal Cognitive Assessment (MoCA)**: Validated 30-point screening tool with high sensitivity for MCI (score 18–25) and dementia (<18), evaluating executive function, visuospatial clock drawing, delayed recall, language, and orientation; score adjusted +1 point for individuals with <=12 years of formal education.",
          "**The Landmark FINGER Clinical Trial**: The Finnish Geriatric Intervention Study (Lancet, n=1,260) proved that a 2-year multi-domain lifestyle intervention—combining Mediterranean-DASH diet, structured aerobic and resistance exercise, cognitive training games, and vascular risk factor management—improved overall cognitive test performance by 25% and executive functioning by 83% in older adults at risk.",
          "**Functional Activities Questionnaire (FAQ)**: Distinguishes MCI from dementia by quantifying independence in Instrumental Activities of Daily Living (IADLs): managing finances, preparing meals, navigating unfamiliar transit, and adhering to multi-medication regimens."
        ]
      },
      {
        id: "block-dementia-pharmacology-beers-safety",
        type: "treatment_medications",
        heading: "Cholinesterase Inhibitors, Anti-Amyloid Monoclonals & Beers Anticholinergic Triage",
        content: "Clinical management of cognitive impairment prioritizes optimizing neurotransmitter availability, evaluating disease-modifying monoclonal therapies, and rigorously eliminating medications that exacerbate cognitive confusion.",
        items: [
          "**Cholinesterase Inhibitor Pharmacotherapy**: Donepezil (5–10 mg daily), rivastigmine (oral/transdermal patch), and galantamine inhibit acetylcholinesterase, increasing synaptic acetylcholine availability in the neocortex to provide temporary stabilization of cognitive and functional scores in mild-to-moderate AD.",
          "**Memantine (NMDA Receptor Antagonist)**: Memantine (titrated to 10 mg BID or 28 mg XR daily) protects cortical neurons from excitotoxic injury by regulating pathological tonic glutamate neurotransmission, indicated for moderate-to-severe AD either as monotherapy or combined with donepezil.",
          "**Anti-Amyloid Monoclonal Antibodies (Lecanemab, Donanemab)**: FDA-approved for early symptomatic AD/MCI with confirmed amyloid pathology; these agents clear protofibrillar and fibrillar amyloid plaques, slowing clinical cognitive decline by 27–35% over 18 months, requiring serial MRI monitoring for Amyloid-Related Imaging Abnormalities (ARIA-E edema and ARIA-H microhemorrhage).",
          "**AGS Beers Criteria Anticholinergic Elimination**: Medications with strong anticholinergic properties (diphenhydramine, hydroxyzine, oxybutynin, amitriptyline) block central muscarinic receptors, acutely worsening memory deficits and precipitating delirium; these must be systematically deprescribed in older adults."
        ]
      }
    ]
  },

  // 15. Colorectal Cancer Screening
  "colon-cancer-screening-colonoscopy-cologuard-guide": {
    blocks: [
      {
        id: "block-crc-uspstf-adenoma-detection",
        type: "clinical_overview",
        heading: "Adenoma-to-Carcinoma Sequence, The USPSTF Age 45 Guideline & Quality Benchmarks",
        content: "Colorectal Cancer (CRC) is the second leading cause of cancer mortality worldwide, yet it is one of the most preventable malignancies through timely screening. Over 85% of sporadic colorectal carcinomas arise through the classical chromosomal instability (adenoma-to-carcinoma) sequence, wherein normal colonic mucosa accumulates sequential genetic mutations (APC, KRAS, TP53) over a 10-to-15-year period to form benign adenomatous polyps that subsequently progress to invasive adenocarcinoma. A distinct 15% arises via the serrated pathway (BRAF mutations and microsatellite instability - MSI).",
        items: [
          "**USPSTF Age 45 Universal Recommendation**: In response to a 50% surge in early-onset colorectal cancer among younger adults, the U.S. Preventive Services Task Force (USPSTF) officially updated its Grade A recommendation to initiate routine CRC screening at age 45 for all average-risk individuals.",
          "**Adenoma Detection Rate (ADR) Quality Metric**: The primary benchmark of colonoscopy quality; endoscopists must maintain an ADR >=30% in men and >=20% in women (>=25% overall). For every 1.0% increase in an endoscopist's ADR, the patient's lifetime risk of interval colorectal cancer decreases by 3.0% and fatal CRC drops by 5.0%.",
          "**Split-Dose Bowel Preparation Protocol**: Consuming half of the bowel lavage solution the evening before and the remaining half 4–6 hours prior to the procedure dramatically improves mucosal cleansing, right-sided cecal visualization, and flat serrated polyp detection compared to day-before single-dose regimens.",
          "**Screening Intervals for Average Risk**: Normal screening colonoscopy (10-year interval); 1–2 small (<10 mm) tubular adenomas (7–10 years); 3–4 small adenomas (3–5 years); 5–10 adenomas or advanced adenoma >=10 mm / villous histology / high-grade dysplasia (3 years)."
        ]
      },
      {
        id: "block-crc-noninvasive-stool-dna-fit",
        type: "treatment_medications",
        heading: "Non-Invasive Modalities: Multitarget Stool DNA (Cologuard) vs. Annual FIT",
        content: "For patients unwilling or unable to undergo screening colonoscopy, validated non-invasive stool-based and radiological modalities offer effective alternative screening pathways, provided positive results are promptly investigated with diagnostic colonoscopy.",
        items: [
          "**Multitarget Stool DNA-FIT (Cologuard)**: Combines a quantitative fecal immunochemical test (FIT) with molecular DNA assays detecting methylated BMP3/NDRG4 promoters and mutant KRAS; demonstrated 92.3% sensitivity for detecting colorectal cancer and 42.4% sensitivity for advanced precancerous lesions, performed every 3 years.",
          "**Fecal Immunochemical Test (FIT) Monotherapy**: Annual quantitative FIT utilizes specific monoclonal antibodies to detect globin within human hemoglobin in stool, avoiding dietary restrictions and demonstrating 75–80% sensitivity for CRC when repeated consistently every 12 months.",
          "**Diagnostic Reflex Colonoscopy Window**: A positive non-invasive test (FIT or stool DNA) mandates diagnostic colonoscopy within 60 to 90 days; delaying colonoscopy beyond 9 months following a positive FIT increases CRC risk by 2-fold and advanced-stage disease risk by 3-fold.",
          "**High-Risk Screening Staging**: Individuals with a first-degree relative diagnosed with CRC or advanced adenoma before age 60 must begin screening colonoscopy at age 40, or 10 years younger than the earliest family diagnosis, repeated every 5 years."
        ]
      }
    ]
  },

  // 16. Active Aging for Seniors
  "active-aging-seniors-guide": {
    blocks: [
      {
        id: "block-aging-sarcopenia-ewgsop2-protein",
        type: "clinical_overview",
        heading: "Sarcopenia Pathophysiology, EWGSOP2 Criteria & Overcoming Anabolic Resistance",
        content: "Sarcopenia is a progressive, generalized skeletal muscle disease characterized by accelerated loss of muscle mass, quality, and physical strength across aging, contributing to frailty, loss of independence, and increased all-cause mortality. While muscle mass declines by approximately 1% annually after age 40, muscle strength (dynapenia) deteriorates up to three times faster due to motor unit denervation, loss of high-velocity type II glycolytic muscle fibers, mitochondrial oxidative dysfunction, and intramuscular adipose tissue infiltration (myosteatosis).",
        items: [
          "**EWGSOP2 Diagnostic Consensus**: Confirmed sarcopenia requires documentation of both low muscle strength (grip strength <27 kg for men, <16 kg for women; or 5-times sit-to-stand chair rise test >15 seconds) AND low muscle quantity/quality assessed by Dual-Energy X-ray Absorptiometry (DEXA appendicular lean mass index <7.0 kg/m2 in men, <5.5 kg/m2 in women).",
          "**Overcoming Anabolic Resistance**: Older skeletal muscle exhibits blunted intracellular mTORC1 phosphorylation in response to amino acid ingestion; the PROT-AGE consensus guidelines recommend daily protein intake of 1.2 to 1.5 g/kg/day (compared to the RDA of 0.8 g/kg) for active seniors, with 2.8 to 3.0 grams of leucine per meal to trigger myofibrillar protein synthesis.",
          "**Progressive Resistance Training (PRT)**: The primary medical countermeasure against sarcopenia; prescribing multi-joint resistance exercises (leg press, chest press, seated row) 2–3 days/week at 70–80% of 1-Repetition Maximum (1RM) reverses muscle atrophy and improves neuromuscular recruitment.",
          "**Gait Speed & Frailty Triage**: Usual walking speed over 4 meters serves as an objective 'sixth vital sign' in geriatric medicine; a gait speed <0.8 m/s indicates advanced frailty, fall vulnerability, and high risk of hospitalization."
        ]
      },
      {
        id: "block-aging-vestibular-otago-deprescribing",
        type: "self_care_lifestyle",
        heading: "Vestibular Balance Retraining, The Otago Exercise Program & Fall Prevention",
        content: "Fall-related trauma remains the leading cause of accidental injury and fracture mortality in adults aged 65 and older. Preventing falls requires combining vestibular balance retraining with environmental modification and clinical deprescribing.",
        items: [
          "**The Otago Exercise Program (OEP)**: An evidence-based, physical therapist-designed fall prevention regimen comprising 17 progressive balance and lower-limb strengthening exercises practiced 3 times weekly; proven in clinical trials to reduce fall rates by 35% in community-dwelling older adults.",
          "**Dual-Task Cognitive Balance Drills**: Incorporating cognitive challenges (such as counting backwards by 3s or naming animals) while performing tandem walking or single-leg standing trains neural attentional allocation, reducing real-world falls caused by cognitive-locomotor interference.",
          "**Environmental Fall Hazards Checklist**: Eliminating throw rugs, installing 36-inch grab bars in showers, ensuring 100-lumen glare-free nocturnal hallway lighting, and wearing supportive low-heeled footwear with non-slip textured soles.",
          "**Timed Up and Go (TUG) Test**: Clinical screening tool measuring the time required for a patient to rise from a standard chair, walk 3 meters, turn around, walk back, and sit down; completing the test in >12 seconds indicates high fall risk warranting comprehensive vestibular and gait physical therapy."
        ]
      }
    ]
  },

  // 17. Chronic Kidney Disease (CKD)
  "chronic-kidney-disease-ckd-stages-egfr-diet": {
    blocks: [
      {
        id: "block-ckd-kdigo-staging-dapa-trials",
        type: "clinical_overview",
        heading: "Glomerular Filtration Dynamics, KDIGO Heat-Map Staging & SGLT2 Renal Trials",
        content: "Chronic Kidney Disease (CKD) represents progressive structural and functional renal parenchymal injury persisting for >3 months, resulting from chronic diabetic microangiopathy, hypertensive arteriolar nephrosclerosis, or primary glomerulonephritis. Glomerular hyperfiltration in surviving nephrons induces mechanical wall stress, podocyte effacement, tubulointerstitial fibrosis, and progressive loss of functional filtering surface area. Because serum creatinine remains within normal reference ranges until >50% of nephron mass is permanently destroyed, early detection relies on simultaneous measurement of estimated Glomerular Filtration Rate (eGFR) and Urine Albumin-to-Creatinine Ratio (uACR).",
        items: [
          "**KDIGO 2024 Heat-Map Prognosis Framework**: Evaluates combined risk based on eGFR category (G1 >=90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 <15 mL/min/1.73m2) AND Albuminuria stage (A1 normal-to-mild <30 mg/g, A2 microalbuminuria 30–300 mg/g, A3 severely increased >300 mg/g).",
          "**DAPA-CKD & EMPA-KIDNEY Landmark Trials**: Landmark trials (NEJM) proved that SGLT2 inhibitors (dapagliflozin 10mg, empagliflozin 10mg) slow the rate of eGFR decline by 37–44% and reduce the composite endpoint of dialysis, kidney transplantation, or cardiovascular death in patients with CKD both with and without type 2 diabetes.",
          "**Non-Steroidal MRA Breakthrough (FIDELIO-DKD)**: Finerenone (10–20mg daily), a selective non-steroidal mineralocorticoid receptor antagonist, significantly reduces albuminuria by >30% and slows kidney disease progression by blocking aldosterone-mediated renal inflammation and fibrosis.",
          "**First-Line RAAS Inhibition (ACEi/ARB)**: Maximum tolerated doses of ACE inhibitors (lisinopril) or ARBs (losartan) reduce intraglomerular capillary hypertension by selectively dilating efferent arterioles; an acute eGFR dip of up to 30% that stabilizes within 4 weeks represents hemodynamic nephroprotection rather than true tubular toxicity."
        ]
      },
      {
        id: "block-ckd-electrolyte-nutrition-dialysis-triage",
        type: "treatment_medications",
        heading: "Nutritional Nephrology, Potassium Homeostasis & Metabolic Acidosis Management",
        content: "Slowing CKD progression and managing secondary metabolic complications requires precise nutritional calibration coordinated by specialized renal dietitians, adjusting protein, mineral, and electrolyte intake according to kidney functional stages.",
        items: [
          "**Dietary Protein Intake Guidelines**: For non-dialysis dependent CKD Stages 3–5, KDIGO recommends moderate dietary protein restriction (0.6–0.8 g/kg body weight/day) to reduce nitrogenous waste accumulation and lower intraglomerular hyperfiltration, shifting to higher intake (1.0–1.2 g/kg/day) upon initiation of maintenance hemodialysis.",
          "**Potassium Management & Modern K-Binders**: Hyperkalemia (>5.0 mEq/L) is managed by shifting away from high-potassium processed foods while maintaining dietary fiber; modern non-absorbed potassium binders (patiromer or sodium zirconium cyclosilicate - SZC) bind potassium in the colon, allowing continuation of life-saving RAAS inhibitors and SGLT2 inhibitors.",
          "**Serum Bicarbonate Titration**: Chronic metabolic acidosis (serum bicarbonate <22 mEq/L) accelerates muscle wasting, exacerbates bone demineralization, and speeds eGFR loss; oral sodium bicarbonate supplementation titrated to maintain serum HCO3- between 22 and 26 mEq/L preserves renal function.",
          "**FGF23 & Mineral Bone Disorder (CKD-MBD)**: Declining renal phosphate excretion triggers compensatory Fibroblast Growth Factor 23 (FGF23) and Parathyroid Hormone (PTH) hypersecretion, requiring dietary phosphorus restriction (<800–1,000 mg/day) and non-calcium phosphate binders (sevelamer, lanthanum) in advanced stages."
        ]
      }
    ]
  },

  // 18. Gout & Hyperuricemia
  "gout-hyperuricemia-causes-uric-acid-diet-treatment": {
    blocks: [
      {
        id: "block-gout-purine-supersaturation-nlrp3",
        type: "clinical_overview",
        heading: "Purine Metabolism, The NLRP3 Inflammasome & Treat-to-Target Urate Goals",
        content: "Gout is the most common inflammatory arthritis in adults, resulting from sustained hyperuricemia that exceeds the physiological saturation threshold of Monosodium Urate (MSU) in synovial fluid (approximately 6.8 mg/dL at 37°C / 98.6°F, and lower in cooler peripheral joints like the first metatarsophalangeal joint). Uric acid is the end product of human purine nucleotide catabolism, synthesized by the hepatic enzyme xanthine oxidase. When MSU crystals precipitate within the joint space, synovial macrophages phagocytose the needle-shaped crystals, triggering activation of the NLRP3 inflammasome, active caspase-1 cleavage, and massive release of pro-inflammatory interleukin-1beta (IL-1beta).",
        items: [
          "**ACR 2020 Treat-to-Target Guidelines**: The American College of Rheumatology (ACR) establishes a mandatory treat-to-target serum uric acid (sUA) goal of <6.0 mg/dL (360 umol/L) for all gout patients, and <5.0 mg/dL for patients with severe tophaceous gout or erosive joint damage, which promotes complete dissolution of crystal deposits over time.",
          "**First-Line Urate-Lowering Therapy (Allopurinol)**: Allopurinol (xanthine oxidase inhibitor) is the preferred first-line agent, initiated low (100 mg/day, or 50 mg/day in CKD) and titrated every 2–4 weeks up to 800 mg/day until target sUA is achieved.",
          "**HLA-B*5801 Genetic Screening**: Mandatory prior to allopurinol initiation in patients of Han Chinese, Korean, Thai, and African descent due to high risk of life-threatening Severe Cutaneous Adverse Reactions (SCAR), including Stevens-Johnson syndrome (SJS) and Toxic Epidermal Necrolysis (TEN).",
          "**Febuxostat Cardiovascular Considerations**: Febuxostat (40–80 mg daily) is a potent non-purine xanthine oxidase inhibitor preferred in allopurinol intolerance or HLA-B*5801 positivity, though the CARES trial noted black-box warnings regarding cardiovascular mortality in patients with established heart disease."
        ]
      },
      {
        id: "block-gout-flare-prophylaxis-colchicine",
        type: "treatment_medications",
        heading: "Acute Flare Termination, Colchicine Prophylaxis & Dietary Purine Modifiers",
        content: "Managing gout requires two distinct phases: rapid termination of acute excruciating flares, followed by long-term crystal dissolution paired with anti-inflammatory flare prophylaxis during medication dose titration.",
        items: [
          "**Acute Flare Triad**: (1) Low-dose colchicine (1.2 mg stat followed by 0.6 mg 1 hour later, initiated within 36 hours of symptom onset), (2) High-dose NSAIDs (indomethacin 50mg TID, naproxen 500mg BID), or (3) Oral corticosteroids (prednisone 30–40 mg/day tapered over 7–10 days) for patients with renal impairment.",
          "**Anti-Inflammatory Prophylaxis Window**: Lowering serum urate destabilizes existing articular tophi, frequently triggering paradoxical mobilization flares; continuing low-dose colchicine (0.6 mg once or twice daily) or low-dose NSAID for at least 3 to 6 months after achieving target sUA prevents flare recurrence.",
          "**Dietary Triggers & Fructose Dynamics**: Eliminating high-fructose corn syrup (sweetened sodas, processed sweets) is critical, as hepatic fructose phosphorylation rapidly depletes ATP, driving AMP deamination and surging uric acid synthesis within hours; restrict purine-dense organ meats, shellfish, and alcohol (especially beer).",
          "**Uricosuric Alternatives & Losartan Synergy**: Probenecid inhibits renal URAT1 urate reabsorption in patients with preserved kidney function (eGFR >50 mL/min). Concurrently, the antihypertensive ARB losartan exhibits mild inherent uricosuric properties, making it the ideal blood pressure agent for hypertensive gout patients."
        ]
      }
    ]
  },

  // 19. Diabetic Neuropathy
  "diabetic-neuropathy-symptoms-nerve-pain-management": {
    blocks: [
      {
        id: "block-neuropathy-polyol-pathway-monofilament",
        type: "clinical_overview",
        heading: "Aldose Reductase Hyperactivity, The 10g Semmes-Weinstein Exam & SFN Diagnosis",
        content: "Diabetic Peripheral Neuropathy (DPN)—predominantly chronic distal symmetric polyneuropathy—affects up to 50% of patients with long-standing diabetes. Chronic intracellular hyperglycemia saturates hexokinase, shunting excess glucose into the alternative polyol pathway where aldose reductase reduces glucose to sorbitol, consuming NADPH. Sorbitol accumulation diminishes intracellular myoinositol, impairs Na+/K+-ATPase activity, and depletes glutathione, provoking severe oxidative stress. Simultaneously, advanced glycation end-products (AGEs) cross-link microvascular collagen, causing endoneurial microangiopathy and chronic axonal ischemia in a length-dependent 'stocking-glove' distribution.",
        items: [
          "**ADA 10-Gram Semmes-Weinstein Monofilament Test**: Annual screening standard for loss of protective sensation (LOPS); applying a 10g monofilament until it buckles across 4 plantar sites (great toe, 1st, 3rd, and 5th metatarsal heads) identifies patients at high risk of unperceived tissue ulceration.",
          "**Vibration & Thermal Sensation Assessment**: Testing vibration perception using a 128-Hz tuning fork over the hallux interphalangeal joint evaluates large myelinated A-beta nerve fibers, while pinprick and temperature testing assess small unmyelinated C-fibers and thinly myelinated A-delta fibers.",
          "**Small Fiber Neuropathy (SFN) Skin Biopsy**: Patients presenting with severe burning dysesthesia, allodynia, and lancinating pain with normal electrodiagnostic nerve conduction studies (EMG/NCS) are definitively diagnosed via punch skin biopsy showing reduced Intraepidermal Nerve Fiber Density (IENFD).",
          "**Charcot Neuroarthropathy Warning Signs**: An acute warm, swollen, erythematous foot in a patient with profound sensory neuropathy indicates active acute Charcot foot (neurogenic osteoarthropathy); failure to immediately immobilize and offload the limb leads to catastrophic tarsal bone collapse ('rocker-bottom' deformity)."
        ]
      },
      {
        id: "block-neuropathy-pharmacology-snri-duloxetine",
        type: "treatment_medications",
        heading: "FDA-Approved Neuropathic Pharmacotherapy, Alpha-Lipoic Acid & Daily Foot Care",
        content: "While tight glycemic optimization (targeting HbA1c <7.0%) prevents the onset and halts the progression of DPN in type 1 diabetes and slows progression in type 2 diabetes, managing established neuropathic pain requires targeting descending inhibitory pain pathways.",
        items: [
          "**First-Line FDA-Approved Pharmacotherapies**: (1) Duloxetine (SNRI, 60 mg once daily, inhibits serotonin/norepinephrine reuptake in spinal dorsal horn pain gates), (2) Pregabalin (alpha-2-delta calcium channel ligand, 150–300 mg/day divided BID/TID, reducing excitatory neurotransmitter release), and (3) Gabapentin (900–3,600 mg/day in divided doses).",
          "**Topical Modalities for Localized Pain**: Capsaicin 8% dermal patch (Qutenza) defunctionalizes TRPV1-expressing nociceptive nerve terminals, providing up to 3 months of pain reduction without systemic sedative side effects; 5% lidocaine patches offer relief for focal allodynia.",
          "**Antioxidant Alpha-Lipoic Acid (ALA)**: The SYDNEY 2 and ALADIN randomized clinical trials demonstrated that oral alpha-lipoic acid (600 mg once daily on an empty stomach) significantly improves neuropathic symptoms and improves endoneurial microvascular blood flow.",
          "**Comprehensive Daily Foot Inspection Protocol**: Daily visual self-inspection using an unbreakable mirror to inspect plantar surfaces and interdigital spaces, wearing white seamless diabetic socks, testing bath water temperature with an elbow to prevent scald burns, and never walking barefoot."
        ]
      }
    ]
  },

  // 20. Endometriosis
  "endometriosis-symptoms-diagnosis-pelvic-pain-treatment": {
    blocks: [
      {
        id: "block-endo-retrograde-sliding-sign-mri",
        type: "clinical_overview",
        heading: "Ectopic Endometrial Stroma, Transvaginal 'Sliding Sign' & Deep Infiltrating Lesions",
        content: "Endometriosis is a chronic, estrogen-dependent inflammatory condition defined by the presence of endometrial-like glandular epithelium and stroma outside the uterine cavity, primarily on the pelvic peritoneum, ovaries, uterosacral ligaments, and pouch of Douglas. While Sampson's retrograde menstruation theory accounts for trans-tubal dissemination, persistent disease requires cellular immune evasion, local estrogen hyper-production (via pathological aromatase and 17beta-HSD1 expression), and pro-inflammatory prostaglandin E2 (PGE2) amplification. Deep Infiltrating Endometriosis (DIE) extends >5 mm beneath the peritoneal surface, invading pelvic nerve plexuses and muscularis walls of the rectosigmoid colon and bladder.",
        items: [
          "**Average Diagnostic Delay Reality**: Globally, women experience an average diagnostic delay of 7 to 10 years between initial symptom onset and definitive diagnosis, frequently misattributed to 'normal period cramps' or irritable bowel syndrome.",
          "**Expert Transvaginal Ultrasound (TVUS) 'Sliding Sign'**: Specialized pelvic ultrasound evaluates mobility between the anterior rectum and posterior uterine cervix; an absent sliding sign indicates severe obliterative adhesions in the pouch of Douglas with high accuracy for DIE.",
          "**Pelvic Magnetic Resonance Imaging (MRI)**: High-resolution T2-weighted MRI without intravenous contrast accurately maps deep infiltrative lesions, ovarian endometriomas ('chocolate cysts' showing T1 hyperintensity and T2 shading), and ureteral involvement prior to complex surgical resection.",
          "**Neuropathic Central Sensitization**: Chronic peripheral pelvic nociceptive input induces central nervous system dorsal horn hyperexcitability, manifesting as pelvic floor myogenous hypertonicity, dyspareunia, and generalized cross-organ sensitization (interstitial cystitis and IBS)."
        ]
      },
      {
        id: "block-endo-laparoscopy-gnrh-antagonists",
        type: "treatment_medications",
        heading: "Laparoscopic Excision vs. Ablation, Oral GnRH Antagonists & Pelvic Physical Therapy",
        content: "Comprehensive endometriosis care combines complete surgical resection by specialized gynecological surgeons with modern medical suppression therapies and multidisciplinary pelvic pain rehabilitation.",
        items: [
          "**Laparoscopic Surgical Excision (Peritonectomy)**: Surgical excision of endometriotic implants down to healthy tissue planes provides significantly greater pain relief and lower 5-year recurrence rates compared to superficial thermal ablation or cauterization.",
          "**Oral GnRH Receptor Antagonists (Relugolix, Elagolix)**: Second-generation oral antagonists competitively block anterior pituitary GnRH receptors, inducing dose-dependent suppression of ovarian estradiol; co-formulated with low-dose 'add-back' hormonal therapy (estradiol 1mg / norethindrone 0.5mg) to prevent vasomotor symptoms and bone mineral density loss.",
          "**Continuous Progestin Suppression**: Dienogest (2 mg daily) or high-dose levonorgestrel-releasing intrauterine devices (LNG-IUD 52mg) induce robust decidualization and atrophy of ectopic endometrial tissue, providing effective non-contraceptive long-term suppression.",
          "**Specialized Pelvic Floor Physical Therapy**: Pelvic floor manual myofascial release, trigger point therapy, and biofeedback retraining down-regulate hypertonic pelvic floor musculature, significantly reducing non-menstrual pelvic pain and deep dyspareunia."
        ]
      }
    ]
  },

  // 21. Adult Vaccination Schedule
  "adult-vaccination-schedule-preventive-guide": {
    blocks: [
      {
        id: "block-vaccine-acip-immunosenescence",
        type: "clinical_overview",
        heading: "Immunosenescence, The CDC ACIP Framework & T-Cell Repertoire Shifts",
        content: "Adult immunization represents an essential cornerstone of preventive medicine, countering the progressive age-related degradation of immune surveillance termed immunosenescence. Across adult aging, thymic involution severely curtails the generation of naive CD4+ and CD8+ T cells, while chronic antigenic stimulation expands late-differentiated memory T cells with exhausted phenotypes. Concurrently, declining somatic hypermutation in germinal center B cells reduces antibody affinity maturation, leaving older adults highly vulnerable to severe vaccine-preventable bacterial and viral infections.",
        items: [
          "**CDC ACIP Annual Recommendations**: The Advisory Committee on Immunization Practices (ACIP) publishes updated adult immunization schedules delineating age-based universally recommended vaccines and clinical risk-group indications (chronic cardiopulmonary disease, diabetes, asplenia, immunosuppression).",
          "**Annual High-Dose & Adjuvanted Influenza**: For adults aged 65 and older, ACIP preferentially recommends either high-dose quadrivalent inactivated influenza vaccine (Fluzone High-Dose, containing 4-fold more hemagglutinin antigen: 60 mcg/strain) or adjuvanted vaccine (Fluad, containing MF59 squalene emulsion) to overcome blunted antibody titers.",
          "**Pneumococcal Conjugate Staging (PCV20 vs. PCV15 + PPSV23)**: For adults 65+ (or 19–64 with chronic conditions), a single dose of 20-valent pneumococcal conjugate vaccine (PCV20) provides durable mucosal and serotype protection, replacing complex multi-dose legacy regimens.",
          "**Tdap Booster & Pregnancy Maternal Cocooning**: Tdap booster is required every 10 years, and administered during each pregnancy between 27 and 36 weeks of gestation to maximize transplacental IgG antibody transfer, protecting the newborn against life-threatening pertussis until infant immunization begins."
        ]
      },
      {
        id: "block-vaccine-rsv-shingrix-covid-schedule",
        type: "treatment_medications",
        heading: "RSV Monoclonal Biologics, Shingrix Two-Dose Adjuvant & COVID-19 Formulations",
        content: "Modern adult vaccines incorporate novel recombinant protein antigens and liposomal adjuvant delivery platforms that generate robust humoral neutralizing titers and cell-mediated CD4+ T-cell memory.",
        items: [
          "**Recombinant Shingles Vaccine (Shingrix)**: Combines recombinant glycoprotein E (gE) with the AS01B liposomal adjuvant system, stimulating innate TLR4 signaling to achieve 97.2% protective efficacy against herpes zoster in adults 50+ through two intramuscular doses separated by 2–6 months.",
          "**Respiratory Syncytial Virus (RSV) Vaccines**: Recombinant prefusion F protein vaccines (Arexvy, Abrysvo) are recommended for all adults aged 75+, and adults aged 60–74 with chronic cardiopulmonary or metabolic conditions, significantly reducing severe lower respiratory tract disease.",
          "**Updated mRNA COVID-19 Formulations**: Annual single-dose updated mRNA boosters (Pfizer-BioNTech, Moderna) targeting circulating spike protein sublineages re-prime memory B cells and generate broad neutralizing antibody titers against evolving variants.",
          "**Vaccine Reactogenicity vs. True Hypersensitivity**: Educating patients that self-limiting localized tenderness, low-grade fever, and mild myalgia represent active innate immune activation (interferon and IL-6 signaling) rather than allergic or toxic reactions."
        ]
      }
    ]
  },

  // 22. Essential Preventive Health Screenings by Age
  "essential-preventive-health-screenings-by-age": {
    blocks: [
      {
        id: "block-screen-uspstf-grade-framework",
        type: "clinical_overview",
        heading: "Epidemiological Screening Criteria, USPSTF Grade A/B & Lead-Time Bias",
        content: "Preventive medicine relies on strict epidemiological criteria (Wilson and Jungner principles) to determine when population-level screening confers measurable life-saving benefit while minimizing unnecessary invasive procedures, diagnostic cascades, and psychological distress. The U.S. Preventive Services Task Force (USPSTF) assigns Grade A (substantial net benefit) and Grade B (moderate net benefit) recommendations only to interventions backed by rigorous randomized controlled trial evidence proving significant reductions in disease-specific or all-cause mortality.",
        items: [
          "**The Wilson-Jungner Principles**: The condition must be an important health problem, have an identifiable asymptomatic latent stage, possess an accepted reliable screening test, and carry an agreed-upon, effective treatment that improves long-term outcomes when applied early.",
          "**Overcoming Lead-Time & Length Bias**: Rigorous screening trials evaluate hard mortality endpoints rather than 5-year survival rates, which can be artificially inflated by detecting slow-growing indolent lesions (length bias) or moving the diagnosis forward without altering the date of death (lead-time bias).",
          "**Decade-by-Decade Screening Roadmaps**: (20s–30s: Cervical cytology/HPV every 3–5 years, blood pressure every 2 years, baseline lipid panel); (40s: Mammography biennial from 40, colorectal screening from 45, diabetes screening via fasting glucose/HbA1c from 35 if overweight); (50s+: Annual LDCT lung cancer screening for 20+ pack-year smokers ages 50–80).",
          "**Abdominal Aortic Aneurysm (AAA) Screening**: One-time ultrasound screening for abdominal aortic aneurysm is a Grade B recommendation for men aged 65 to 75 who have ever smoked (>=100 lifetime cigarettes), reducing rupture mortality by over 40%."
        ]
      },
      {
        id: "block-screen-cervical-breast-lung-algorithms",
        type: "treatment_medications",
        heading: "Mammography Tomosynthesis, Cervical HPV Co-Testing & Low-Dose CT Lung Protocols",
        content: "Modern imaging technologies and molecular biomarker assays significantly enhance the diagnostic sensitivity of primary cancer screenings while reducing false-positive recall rates.",
        items: [
          "**Digital Breast Tomosynthesis (3D Mammography)**: Reconstructs thin 1mm slices through breast tissue, substantially increasing invasive cancer detection rates by 25–40% and lowering false-positive recall rates, particularly in women with heterogeneously or extremely dense breasts.",
          "**Primary High-Risk HPV (hrHPV) Cervical Screening**: High-risk HPV DNA testing (detecting oncogenic types 16, 18, and 12 other high-risk strains) every 5 years for women ages 30–65 provides superior long-term negative predictive value compared to cervical cytology (Pap smear) alone.",
          "**Low-Dose Computed Tomography (LDCT) Lung Screening**: The NLST and NELSON clinical trials proved that annual LDCT screening in eligible high-risk smokers reduces lung cancer mortality by 20–24% by detecting early Stage I resectable nodules compared to standard chest X-rays.",
          "**Bone Mineral Density (DEXA) at Age 65**: Universal screening recommendation for all women aged 65 and older (and younger women with elevated FRAX clinical fracture risk), evaluating femoral neck and lumbar spine T-scores to initiate anti-resorptive therapy before fragility fractures occur."
        ]
      }
    ]
  },

  // 23. Heart Failure with Preserved Ejection Fraction (HFpEF)
  "heart-failure-hfpef-symptoms-diagnosis-management": {
    blocks: [
      {
        id: "block-hfpef-h2fpef-score-emperor",
        type: "clinical_overview",
        heading: "Myocardial Diastolic Stiffness, The H2FPEF Diagnostic Algorithm & EMPEROR-Preserved",
        content: "Heart Failure with Preserved Ejection Fraction (HFpEF) represents approximately 50% of all clinical heart failure cases and is characterized by symptoms of heart failure (dyspnea on exertion, fatigue, orthopnea, lower extremity edema) accompanied by a normal or near-normal Left Ventricular Ejection Fraction (LVEF >=50%). The underlying pathophysiology is driven by systemic microvascular endothelial inflammation triggered by cardiometabolic comorbidities (hypertension, obesity, diabetes, CKD). Coronary microvascular endothelial cells downregulate nitric oxide and protein kinase G (PKG) signaling in adjacent cardiomyocytes, causing hypophosphorylation of the giant cytoskeletal spring titin, advanced myocardial stiffness, impaired active ventricular relaxation, and elevated left ventricular end-diastolic filling pressures.",
        items: [
          "**H2FPEF Diagnostic Scoring Algorithm**: Clinically validated clinical score estimating HFpEF probability: Heavy (BMI >30 kg/m2, 2 pts), Hypertensive (2+ anti-hypertensives, 1 pt), Atrial Fibrillation (3 pts), Pulmonary Hypertension (PASP >35 mmHg, 1 pt), Elder (age >60, 1 pt), Filling Pressures (E/e' >9 on echocardiography, 1 pt); score >=6 confirms HFpEF.",
          "**NT-proBNP Biomarker Cutoffs**: N-Terminal pro-B-Type Natriuretic Peptide testing cutoffs: >125 pg/mL in sinus rhythm and >365 pg/mL in patients with atrial fibrillation confirms hemodynamically significant ventricular wall stress; however, obese patients exhibit up to 50% lower circulating natriuretic peptide levels due to enhanced clearance receptors on adipocytes.",
          "**EMPEROR-Preserved & DELIVER Landmark Trials**: Landmark randomized trials (NEJM) established SGLT2 inhibitors (empagliflozin 10mg, dapagliflozin 10mg) as the first FDA-approved disease-modifying pharmacotherapy for HFpEF, significantly reducing the primary composite endpoint of cardiovascular death and heart failure hospitalization by 21%.",
          "**Hemodynamic Exercise Stress Echocardiography**: In patients with unexplained exertional dyspnea and normal resting echo, invasive cardiopulmonary exercise testing or exercise stress echocardiography demonstrates pathological elevations in pulmonary capillary wedge pressure (PCWP >25 mmHg with exercise)."
        ]
      },
      {
        id: "block-hfpef-diuretic-titration-arni-mra",
        type: "treatment_medications",
        heading: "Loop Diuretic Titration, Spironolactone (TOPCAT) & Sacubitril/Valsartan",
        content: "Therapeutic management in HFpEF balances decongestion of pulmonary and systemic venous circulations with neurohormonal blockade and targeted comorbidity optimization.",
        items: [
          "**Loop Diuretic Decongestion Protocol**: Oral loop diuretics (furosemide 20–80mg daily, torsemide 10–40mg daily) are titrated dynamically to achieve clinical euvolemia (elimination of peripheral pitting edema, resolution of jugular venous distension - JVD <8 cmH2O), monitoring serum creatinine and electrolytes closely.",
          "**Spironolactone Mineralocorticoid Blockade (TOPCAT)**: Post-hoc regional analysis of the TOPCAT trial (NEJM) demonstrated that spironolactone (12.5–25 mg daily) significantly reduced heart failure hospitalizations in patients with documented elevated natriuretic peptides, provided serum potassium is <5.0 mEq/L and eGFR >30 mL/min.",
          "**Sacubitril/Valsartan (PARAGON-HF Trial)**: Angiotensin Receptor-Neprilysin Inhibitor (ARNI) demonstrated greatest clinical benefit in HFpEF patients with LVEF at the lower end of the spectrum (LVEF 45–57%) and women, reducing recurrent hospitalizations and improving functional NYHA class.",
          "**Aggressive Blood Pressure & Rhythm Control**: Maintaining resting blood pressure <130/80 mmHg and preserving sinus rhythm (or rigorous rate control in AFib) is critical, as tachycardia severely curtails the diastolic filling interval, acutely spiking left atrial pressures."
        ]
      }
    ]
  }
};
