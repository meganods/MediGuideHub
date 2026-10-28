import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mediguide4u.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.firebasestorage.app",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
            "source": "/editorial-team",
            "destination": "/authors",
            "permanent": true
      },
      {
            "source": "/editorial-board",
            "destination": "/authors",
            "permanent": true
      },
      {
            "source": "/author/dr-krishan-chugh-mbbs-md-pediatrics-fap",
            "destination": "/author/dr-krishan-chugh-md",
            "permanent": true
      },
      {
            "source": "/blog/category/:slug*",
            "destination": "/category/:slug*",
            "permanent": true
      },
      {
            "source": "/category/diabetes",
            "destination": "/category/heart-health",
            "permanent": true
      },
      {
            "source": "/category/lifestyle-diseases",
            "destination": "/category/heart-health",
            "permanent": true
      },
      {
            "source": "/category/vaccination",
            "destination": "/category/preventive-care",
            "permanent": true
      },
      {
            "source": "/category/fitness",
            "destination": "/category/wellness",
            "permanent": true
      },
      {
            "source": "/category/children-s-health",
            "destination": "/category/preventive-care",
            "permanent": true
      },
      {
            "source": "/blog/fatty-liver-disease-symptoms-causes-diagnosis-and-lifestyle-management",
            "destination": "/blog/masld-fatty-liver-disease-symptoms-fibroscan-reversal-diet",
            "permanent": true
      },
      {
            "source": "/blog/vitamin-b12-deficiency-symptoms-causes-and-treatment",
            "destination": "/blog/vitamin-b12-deficiency-neuropathy-symptoms-treatment-guide",
            "permanent": true
      },
      {
            "source": "/blog/vitamin-d3-k2-synergy-calcium-artery-health",
            "destination": "/blog/vitamin-d-deficiency-symptoms-causes-risk-factors-and-how-to-maintain-healthy-levels",
            "permanent": true
      },
      {
            "source": "/blog/iron-deficiency-without-anemia-ferritin-fatigue",
            "destination": "/blog/iron-deficiency-anemia-symptoms-causes-and-treatment",
            "permanent": true
      },
      {
            "source": "/blog/sarcopenia-muscle-loss-seniors-protein-exercise",
            "destination": "/blog/active-aging-seniors-guide",
            "permanent": true
      },
      {
            "source": "/blog/zone-2-cardio-mitochondrial-health-fat-burning",
            "destination": "/blog/vo2-max-heart-rate-zones-cardio-longevity",
            "permanent": true
      },
      {
            "source": "/blog/burnout-vs-depression-differences-recovery-plan",
            "destination": "/blog/clinical-depression-symptoms-causes-therapy-treatment",
            "permanent": true
      },
      {
            "source": "/blog/coronary-calcium-scan-cac-score-interpretation",
            "destination": "/blog/coronary-artery-disease-symptoms-causes-treatment",
            "permanent": true
      },
      {
            "source": "/blog/heart-palpitations-pvcs-pacs-causes-when-to-worry",
            "destination": "/blog/atrial-fibrillation-afib-symptoms-risks-treatment",
            "permanent": true
      },
      {
            "source": "/blog/anxiety-and-sleep-hygiene-evidence-based-strategies",
            "destination": "/blog/circadian-rhythm-sleep-architecture-rem-deep-sleep-guide",
            "permanent": true
      },
      {
            "source": "/blog/pelvic-floor-dysfunction-prolapse-incontinence-therapy",
            "destination": "/blog/endometriosis-symptoms-diagnosis-pelvic-pain-treatment",
            "permanent": true
      },
      {
            "source": "/blog/truth-about-superfoods-micronutrients",
            "destination": "/blog/intermittent-fasting-autophagy-insulin-sensitivity",
            "permanent": true
      },
      {
            "source": "/blog/doms-muscle-soreness-exercise-recovery-science",
            "destination": "/blog/cardio-vs-strength-training-muscle-fat-loss-longevity",
            "permanent": true
      },
      {
            "source": "/blog/designing-weekly-workout-routine",
            "destination": "/blog/cardio-vs-strength-training-muscle-fat-loss-longevity",
            "permanent": true
      },
      {
            "source": "/blog/chronic-systemic-inflammation-causes-diet-lifestyle",
            "destination": "/blog/hs-crp-blood-test-systemic-inflammation-heart-risk",
            "permanent": true
      },
      {
            "source": "/blog/pediatric-dehydration-infants-ors-warning-signs",
            "destination": "/blog/pediatric-fever-management-temperature-guide-when-to-see-doctor",
            "permanent": true
      },
      {
            "source": "/blog/childhood-ear-infections-otitis-media-antibiotics-tubes",
            "destination": "/blog/childhood-asthma-triggers-inhaler-guide-action-plan",
            "permanent": true
      },
      {
            "source": "/blog/childhood-food-allergies-ige-testing-epipen-plan",
            "destination": "/blog/childhood-rashes-eczema-hand-foot-mouth-identification",
            "permanent": true
      },
      {
            "source": "/blog/childhood-nutrition-developmental-milestones",
            "destination": "/blog/pediatric-fever-management-temperature-guide-when-to-see-doctor",
            "permanent": true
      },
      {
            "source": "/blog/tdap-booster-vaccine-tetanus-pertussis-schedule",
            "destination": "/blog/adult-vaccination-schedule-preventive-guide",
            "permanent": true
      },
      {
            "source": "/blog/pneumococcal-vaccine-pcv20-ppsv23-pneumonia-guide",
            "destination": "/blog/shingles-vaccine-shingrix-side-effects-eligibility",
            "permanent": true
      },
      {
            "source": "/blog/meningococcal-vaccine-menacwy-menb-teens-college",
            "destination": "/blog/hpv-vaccine-cancer-prevention-age-safety-guide",
            "permanent": true
      },
      {
            "source": "/blog/polypharmacy-in-seniors-deprescribing-beers-criteria",
            "destination": "/blog/early-signs-dementia-alzheimers-vs-normal-aging",
            "permanent": true
      },
      {
            "source": "/blog/osteoarthritis-joint-pain-cartilage-care-treatment",
            "destination": "/blog/osteoporosis-bone-density-dexa-scan-prevention",
            "permanent": true
      },
      {
            "source": "/blog/diabetic-kidney-disease-uacr-egfr-management",
            "destination": "/blog/chronic-kidney-disease-ckd-stages-egfr-diet",
            "permanent": true
      },
      {
            "source": "/blog/diabetic-retinopathy-stages-eye-exam-prevention",
            "destination": "/blog/diabetic-neuropathy-symptoms-nerve-pain-management",
            "permanent": true
      },
      {
            "source": "/blog/continuous-glucose-monitors-cgm-time-in-range-guide",
            "destination": "/blog/hypoglycemia-low-blood-sugar-symptoms-emergency-treatment",
            "permanent": true
      },
      {
            "source": "/blog/prediabetes-insulin-resistance-reversal-guide",
            "destination": "/blog/metabolic-syndrome-criteria-risks-reversal-plan",
            "permanent": true
      },
      {
            "source": "/blog/social-anxiety-disorder-symptoms-cbt-exposure",
            "destination": "/blog/panic-attack-vs-anxiety-attack-symptoms-grounding-techniques",
            "permanent": true
      },
      {
            "source": "/blog/gut-microbiome-probiotics-prebiotics-gut-brain-axis",
            "destination": "/blog/ibs-low-fodmap-diet-symptoms-management",
            "permanent": true
      },
      {
            "source": "/blog/womens-health-checks-preventive-care",
            "destination": "/blog/essential-preventive-health-screenings-by-age",
            "permanent": true
      },
      {
            "source": "/blog/skin-cancer-screening-abcde-melanoma-mole-check",
            "destination": "/blog/colon-cancer-screening-colonoscopy-cologuard-guide",
            "permanent": true
      }
];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

