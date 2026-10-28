// Precise Comparison Tables for the 5 posts to reach 1,550-1,800 words

module.exports = {
  "migraine-vs-tension-headache-aura-cgrp-treatment": {
    id: "block-migraine-comparison-table",
    type: "comparison_table",
    heading: "Therapeutic Comparison: First-Line Abortive & Preventive Migraine Medications",
    columns: ["Therapeutic Class", "Representative Agent", "Mechanism of Action", "Clinical Onset", "Key Clinical Considerations"],
    rows: [
      {
        cells: [
          "5-HT1B/1D Agonist (Triptan)",
          "Sumatriptan (50–100mg oral, 6mg SC)",
          "Selective agonist of vascular 5-HT1B and neuronal 5-HT1D receptors; inhibits trigeminal CGRP release and induces cranial vasoconstriction",
          "15–30 mins (SC/nasal) or 45–60 mins (oral)",
          "First-line acute abortive; strictly contraindicated in coronary artery disease, stroke/TIA, peripheral vascular disease, or uncontrolled stage 2 hypertension."
        ]
      },
      {
        cells: [
          "Oral CGRP Antagonist (Gepant)",
          "Rimegepant (75mg oral ODT)",
          "Competitively binds calcitonin gene-related peptide (CGRP) receptor; blocks neurogenic vasodilation and neurogenic inflammation",
          "60 minutes",
          "Zero coronary vasoconstriction; safe in cardiovascular disease; dual-indicated for acute treatment and every-other-day episodic migraine prevention."
        ]
      },
      {
        cells: [
          "5-HT1F Receptor Agonist (Ditan)",
          "Lasmiditan (50–100mg oral)",
          "Selectively targets 5-HT1F receptors on trigeminal sensory neurons without activating 5-HT1B vasoconstrictive receptors",
          "45–60 minutes",
          "Non-vasoconstrictive option for vascular disease patients; carries mandatory 8-hour driving restriction due to central nervous system sedative side effects."
        ]
      },
      {
        cells: [
          "Subcutaneous CGRP Monoclonal",
          "Erenumab (70–140mg monthly)",
          "Human monoclonal antibody that specifically binds and inhibits the canonical CGRP receptor complex",
          "Monthly subcutaneous injection",
          "First-line biologic preventative for chronic or frequent episodic migraine; monitor for new-onset or worsening constipation and arterial hypertension."
        ]
      },
      {
        cells: [
          "Beta-Adrenergic Blocker",
          "Propranolol (80–240mg daily)",
          "Non-selective beta-1 and beta-2 adrenergic receptor blocker; stabilizes central catecholaminergic tone and raises cortical spreading depression threshold",
          "Daily oral maintenance",
          "Level A evidence for migraine prophylaxis; caution in reactive airway disease/asthma, symptomatic bradycardia, and high-degree AV block."
        ]
      }
    ]
  },

  "bph-enlarged-prostate-symptoms-medications-psa": {
    id: "block-bph-modality-comparison-table",
    type: "comparison_table",
    heading: "Clinical Comparison: Pharmacological & Minimally Invasive BPH Modalities",
    columns: ["Therapeutic Modality", "Primary Mechanism", "Onset of Symptom Relief", "Impact on Prostate Volume", "Ejaculatory / Sexual Profile"],
    rows: [
      {
        cells: [
          "Alpha-1A Adrenergic Antagonists (Tamsulosin 0.4mg, Silodosin 8mg)",
          "Relaxes smooth muscle tone in the prostatic stroma, bladder neck, and prostatic urethra",
          "Rapid relief within 3 to 7 days",
          "No reduction in prostate volume; does not alter PSA or halt long-term tissue growth",
          "Risk of retrograde ejaculation (up to 28% with silodosin) and intraoperative floppy iris syndrome (IFIS) during cataract surgery."
        ]
      },
      {
        cells: [
          "5-Alpha-Reductase Inhibitors (Finasteride 5mg, Dutasteride 0.5mg)",
          "Inhibits 5-AR isoenzymes, blocking conversion of testosterone to dihydrotestosterone (DHT)",
          "Delayed relief requiring 3 to 6 months of daily therapy",
          "Reduces prostate volume by 20–25% and reduces 4-year acute urinary retention risk by 57%",
          "Reduces serum PSA by 50% (multiply measured PSA by 2 for accurate cancer screening); 3–5% risk of erectile dysfunction and decreased libido."
        ]
      },
      {
        cells: [
          "Phosphodiesterase-5 Inhibitor (Tadalafil 5mg daily)",
          "Increases intracellular cyclic GMP, relaxing detrusor and prostatic smooth muscle",
          "1 to 2 weeks",
          "Zero reduction in prostate size; does not alter urinary retention progression",
          "Improves concurrent erectile dysfunction; strictly contraindicated with concurrent nitrate medications due to severe systemic hypotension."
        ]
      },
      {
        cells: [
          "Water Vapor Thermal Therapy (Rezūm System)",
          "Transurethral delivery of radiofrequency water vapor inducing targeted cellular necrosis in transition zone",
          "Gradual improvement over 4 to 12 weeks",
          "Ablates obstructive adenoma tissue and median lobe",
          "Minimally invasive outpatient procedure under local anesthesia; preserves erectile and ejaculatory function in over 90% of men."
        ]
      },
      {
        cells: [
          "Holmium Laser Enucleation (HoLEP)",
          "Complete anatomical enucleation of entire prostate adenoma along the surgical capsule",
          "Immediate relief within 24–48 hours post-catheter removal",
          "Removes up to 80–90% of transition zone tissue (effective for prostates >100 cm3)",
          "Lowest long-term re-operation rate (<1% at 10 years); high incidence of retrograde ejaculation (>75%), but preserves erectile nerve function."
        ]
      }
    ]
  },

  "obstructive-sleep-apnea-osa-cpap-heart-risks": {
    id: "block-osa-pap-modality-comparison-table",
    type: "comparison_table",
    heading: "Clinical Comparison: Positive Airway Pressure & Non-CPAP Therapies",
    columns: ["Therapy Type", "Mechanism of Action", "Primary Clinical Indications", "AHI Reduction Efficacy", "Adherence & Patient Factors"],
    rows: [
      {
        cells: [
          "Continuous Positive Airway Pressure (CPAP)",
          "Delivers constant pneumatic pressure throughout inspiration and expiration to splint upper pharynx open",
          "Gold standard first-line therapy for moderate-to-severe OSA (AHI >=15) and mild symptomatic OSA",
          "Normalizes AHI to <5 events/hr in >90% of compliant users",
          "Requires custom mask interface fitting, heated humidification, and pressure ramp adaptation; CMS adherence target >=4 hrs/night."
        ]
      },
      {
        cells: [
          "Auto-Titrating CPAP (APAP)",
          "Onboard algorithm dynamically adjusts delivered pressure breath-by-breath based on airflow resistance and snoring",
          "Variable pressure needs (REM-related apnea, positional supine sleep apnea, pressure intolerance)",
          "Equivalent AHI normalization to fixed CPAP",
          "Improves patient tolerance by delivering lower mean nocturnal pressures; useful for initial home diagnostic autotitration."
        ]
      },
      {
        cells: [
          "Bilevel Positive Airway Pressure (BiPAP)",
          "Delivers independent, higher inspiratory pressure (IPAP) and lower expiratory pressure (EPAP)",
          "Patients requiring high CPAP (>15 cmH2O) with expiratory intolerance; concurrent COPD (overlap syndrome) or obesity hypoventilation",
          "Normalizes AHI while actively reducing arterial PaCO2 and work of breathing",
          "Significantly reduces exhalation fatigue and aerophagia (air swallowing); requires clinical prescription titration."
        ]
      },
      {
        cells: [
          "Custom Mandibular Advancement Device (MAD)",
          "Titratable dental appliance mechanically protrudes mandible and tongue base anteriorly by 6–10 mm",
          "Mild-to-moderate OSA; CPAP-intolerant patients; travel device for frequent fliers",
          "Achieves >=50% AHI reduction in 65–75% of patients (most effective in non-obese patients)",
          "Higher patient comfort and adherence (>85%); requires fabrication by qualified dental sleep specialist; monitor for bite changes."
        ]
      },
      {
        cells: [
          "Hypoglossal Nerve Neurostimulation (Inspire)",
          "Implanted pulse generator delivers synchronized mild electrical pulses to hypoglossal nerve branch during inspiration",
          "Moderate-to-severe OSA (AHI 15–65), BMI <35 kg/m2, absence of complete concentric palate collapse on drug-induced sleep endoscopy",
          "Reduces AHI by >68% and normalizes daytime Epworth Sleepiness scores",
          "Surgically implanted system; activated by handheld patient remote at bedtime; high long-term satisfaction."
        ]
      }
    ]
  },

  "hypothyroidism-hashimotos-tsh-levels-treatment": {
    id: "block-hashimotos-lab-panel-comparison-table",
    type: "comparison_table",
    heading: "Diagnostic Comparison: Complete Thyroid Function & Autoantibody Panel",
    columns: ["Biomarker / Assay", "Standard Adult Reference Range", "Physiological Function", "Pattern in Hashimoto's Hypothyroidism", "Clinical Interpretation & Traps"],
    rows: [
      {
        cells: [
          "Thyroid-Stimulating Hormone (TSH)",
          "0.45 – 4.50 mIU/L (Optimal: 0.5 – 2.5)",
          "Anterior pituitary hormone that stimulates thyroid follicular hormone synthesis and release",
          "Elevated (>4.5 mIU/L, often >10 mIU/L in overt disease)",
          "Most sensitive screening biomarker; target range 0.5–2.5 on levothyroxine; high biotin intake (>5mg/day) can falsely lower TSH assay."
        ]
      },
      {
        cells: [
          "Free Thyroxine (Free T4)",
          "0.82 – 1.77 ng/dL (10.5 – 22.8 pmol/L)",
          "Unbound, biologically active prohormone available for peripheral tissue cellular deiodination",
          "Low in overt hypothyroidism (<0.8 ng/dL); normal in subclinical hypothyroidism",
          "Measure Free T4 directly via equilibrium dialysis; total T4 is distorted by pregnancy and estrogens which elevate thyroxine-binding globulin."
        ]
      },
      {
        cells: [
          "Free Triiodothyronine (Free T3)",
          "2.0 – 4.4 pg/mL (3.1 – 6.8 pmol/L)",
          "Active metabolic hormone with 4-fold higher affinity for nuclear thyroid receptors than T4",
          "Often normal until end-stage disease due to compensatory TSH-driven hyper-deiodination",
          "Poor screening test for primary hypothyroidism; measuring free T3 alone will miss early overt hypothyroidism."
        ]
      },
      {
        cells: [
          "Thyroid Peroxidase Antibodies (Anti-TPO)",
          "<9.0 IU/mL (Negative)",
          "Autoantibodies directed against thyroid peroxidase, the enzyme essential for iodine organification",
          "Markedly elevated (>100 to >1,000 IU/mL in >95% of cases)",
          "Confirms autoimmune etiology; titers predict risk of progression from subclinical to overt hypothyroidism (4.3% per year vs 2.6%)."
        ]
      },
      {
        cells: [
          "Thyroglobulin Antibodies (Anti-Tg)",
          "<1.0 IU/mL (Negative)",
          "Autoantibodies directed against thyroglobulin, the matrix protein for thyroid hormone synthesis",
          "Elevated in 60–80% of Hashimoto's patients",
          "Complementary autoimmune marker; vital to confirm negative status prior to using serum thyroglobulin for thyroid cancer surveillance."
        ]
      }
    ]
  },

  "peripheral-artery-disease-pad-symptoms-abi-treatment": {
    id: "block-pad-diagnostic-imaging-comparison-table",
    type: "comparison_table",
    heading: "Diagnostic Modalities: Lower-Extremity Vascular Perfusion Assessments",
    columns: ["Vascular Modality", "Measurement Parameter", "Normal Physiological Value", "PAD Ischemic Diagnostic Threshold", "Clinical Utility & Limitations"],
    rows: [
      {
        cells: [
          "Ankle-Brachial Index (ABI)",
          "Ratio of highest ankle systolic pressure to highest brachial systolic pressure",
          "1.00 – 1.40",
          "<=0.90 (Mild: 0.71–0.90, Moderate: 0.41–0.70, Severe: <=0.40)",
          "Universal first-line screening tool; false-negative (falsely normal or >1.40) in calcified, non-compressible arteries in diabetic/dialysis patients."
        ]
      },
      {
        cells: [
          "Toe-Brachial Index (TBI)",
          "Ratio of digital great toe systolic pressure (via photoplethysmography cuff) to brachial pressure",
          "0.70 – 0.85",
          "<=0.70 (Absolute toe pressure <30 mmHg indicates severe critical limb ischemia)",
          "Preferred alternative to ABI in diabetes and CKD; digital arteries are immune to Mönckeberg's medial calcinosis."
        ]
      },
      {
        cells: [
          "Color Duplex Ultrasonography",
          "Peak Systolic Velocity Ratio (PSVR) and spectral Doppler waveform velocity profile",
          "Triphasic high-resistance flow pattern with PSVR <1.5",
          "PSVR >=2.0 indicates >=50% stenosis; monophasic dampening indicates proximal occlusion",
          "Non-invasive anatomical mapping; zero radiation and zero nephrotoxic contrast; operator dependent in distal tibial vessels."
        ]
      },
      {
        cells: [
          "Computed Tomography Angiography (CTA)",
          "Multi-detector 3D helical arterial luminal contrast opacification",
          "Smooth, uninterrupted contrast flow throughout femoropopliteal and infrapopliteal tree",
          "Direct visualization of calcified and non-calcified plaque stenosis, occlusion length, and collaterals",
          "Rapid pre-procedural revascularization roadmap; requires iodinated contrast (caution in CKD) and dense calcium can cause blooming artifacts."
        ]
      },
      {
        cells: [
          "Transcutaneous Oximetry (TcPO2)",
          "Measures partial pressure of oxygen diffusing through heated skin sensor to forefoot",
          ">50 mmHg at room air",
          "<30 mmHg reflects severe tissue hypoxia; <20 mmHg indicates failure of spontaneous wound healing",
          "Crucial objective prognostic tool for predicting ischemic ulcer healing and determining viable amputation levels."
        ]
      }
    ]
  }
};
