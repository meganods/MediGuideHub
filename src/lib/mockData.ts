export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  publishedAt: string;
  featuredImage: string;
  author: string;
  readTime: string;
  
  // Advanced CMS fields
  status?: "Published" | "Draft" | "Scheduled";
  seoScore?: number;
  views?: number;
  updatedAt?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  videoUrl?: string;
  relatedArticles?: string[];
  featured?: boolean;
  trending?: boolean;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  focusKeyphrase?: string;
  schemaType?: string;
  robotsMeta?: string;
  canonicalUrl?: string;
  visibility?: string;
  allowComments?: boolean;
  lastReviewedDate?: string;
  reviewFrequency?: string;
  language?: string;
  versionNumber?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface BlogCategory {
  id?: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  bannerImage?: string;
  thumbnail?: string;
  displayOrder?: number;
  parentCategory?: string;
  featuredCategory?: boolean;
  status?: "Active" | "Inactive";
  seoTitle?: string;
  seoDesc?: string;
  seoFocusKeyword?: string;
  seoCanonical?: string;
  seoSchemaType?: string;
  seoOgImage?: string;
  articleCount?: number;
  seoScore?: number;
  createdAt?: string;
}

export const INITIAL_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-preventive-care",
    name: "Preventive Care",
    slug: "preventive-care",
    description: "Methods and routine screenings to sustain health and prevent illness.",
    icon: "Shield",
    displayOrder: 1,
    status: "Active",
    featuredCategory: true,
    seoTitle: "Preventive Care Guides | MediGuideHub",
    seoDesc: "Essential screening recommendations and health preservation advice."
  },
  {
    id: "cat-nutrition",
    name: "Nutrition",
    slug: "nutrition",
    description: "Evidence-based guidelines on healthy eating, diets, and metabolic wellness.",
    icon: "Activity",
    displayOrder: 2,
    status: "Active",
    featuredCategory: true,
    seoTitle: "Nutrition & Diet Guidelines | MediGuideHub",
    seoDesc: "Practical nutritional advice to fuel your body and mind."
  },
  {
    id: "cat-mental-health",
    name: "Mental Health",
    slug: "mental-health",
    description: "Psychological well-being, stress management, and emotional health.",
    icon: "Heart",
    displayOrder: 3,
    status: "Active",
    featuredCategory: true,
    seoTitle: "Mental Health & Wellness | MediGuideHub",
    seoDesc: "Resources and strategies for stress reduction and mental clarity."
  },
  {
    id: "cat-heart-health",
    name: "Heart Health",
    slug: "heart-health",
    description: "Cardiovascular health, blood pressure management, and heart disease prevention.",
    icon: "Stethoscope",
    displayOrder: 4,
    status: "Active",
    featuredCategory: true,
    seoTitle: "Heart Health & Cardiovascular Care | MediGuideHub",
    seoDesc: "Protect your heart with clinical insights and lifestyle strategies."
  },
  {
    id: "cat-fitness-wellness",
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
    description: "Physical activity, exercise routines, and active lifestyle tips.",
    icon: "BookOpen",
    displayOrder: 5,
    status: "Active",
    featuredCategory: true,
    seoTitle: "Fitness & Wellness Advice | MediGuideHub",
    seoDesc: "Incorporate regular exercise and movement into your daily life."
  },
  {
    id: "cat-senior-health",
    name: "Senior Health",
    slug: "senior-health",
    description: "Specialized health guides and wellness advice for older adults.",
    icon: "Award",
    displayOrder: 6,
    status: "Active",
    featuredCategory: true,
    seoTitle: "Senior Health & Healthy Aging | MediGuideHub",
    seoDesc: "Comprehensive guides for healthy aging and senior independence."
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "preventive-care-guide",
    slug: "preventive-care-guide",
    title: "The Ultimate Guide to Preventive Care",
    category: "Preventive Care",
    summary: "Preventive care is the foundation of a healthy life. Learn about the essential screenings and habits you need.",
    readTime: "5 min read",
    author: "Dr. Elizabeth Carter",
    publishedAt: "2026-08-01",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: true,
    status: "Published",
    content: `
      <p>Taking care of your health before problems arise is the most effective way to ensure a long, healthy life. Preventive care focuses on maintaining wellness and catching potential issues early when they are most treatable.</p>

      <h2>What is Preventive Care?</h2>
      <p>Preventive care includes health services like screenings, check-ups, and patient counseling that are used to prevent illnesses, disease, and other health problems, or to detect illness at an early stage when treatment is likely to work best.</p>

      <h2>Essential Screenings</h2>
      <ul>
        <li><strong>Annual Physical Exams:</strong> A yearly check-up with your primary care physician to monitor your overall health.</li>
        <li><strong>Blood Pressure Screenings:</strong> High blood pressure is a silent killer; regular checks are vital.</li>
        <li><strong>Cholesterol Checks:</strong> Monitoring your lipid profile to prevent heart disease.</li>
        <li><strong>Cancer Screenings:</strong> Depending on your age and gender, screenings like mammograms, colonoscopies, and Pap smears are crucial.</li>
      </ul>

      <h2>Healthy Lifestyle Choices</h2>
      <p>Beyond medical screenings, preventive care involves everyday choices. Eating a balanced diet, exercising regularly, avoiding tobacco, and limiting alcohol consumption play massive roles in your long-term health.</p>
    `
  },
  {
    id: "nutrition-for-mental-health",
    slug: "nutrition-for-mental-health",
    title: "How Nutrition Impacts Mental Health",
    category: "Nutrition",
    summary: "What you eat directly affects how you feel. Discover the connection between your diet and your mental well-being.",
    readTime: "4 min read",
    author: "Robert Vance",
    publishedAt: "2026-08-02",
    featuredImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: true,
    status: "Published",
    content: `
      <p>The link between diet and mental health is an emerging field of research known as nutritional psychiatry. It turns out that your brain is heavily influenced by the nutrients you consume.</p>

      <h2>The Gut-Brain Connection</h2>
      <p>Your gut is often called your "second brain." It produces a significant amount of serotonin, a neurotransmitter that regulates sleep and appetite, mediate moods, and inhibit pain. A healthy gut microbiome, supported by a diet rich in fiber and fermented foods, is essential for mental health.</p>

      <h2>Foods That Boost Mood</h2>
      <ul>
        <li><strong>Omega-3 Fatty Acids:</strong> Found in fatty fish, walnuts, and flaxseeds, these are crucial for brain function.</li>
        <li><strong>Leafy Greens:</strong> Spinach and kale are rich in folate, which helps produce dopamine.</li>
        <li><strong>Probiotics:</strong> Yogurt and kefir support gut health.</li>
      </ul>

      <p>Conversely, diets high in refined sugars and processed foods are linked to impaired brain function and a worsening of symptoms of mood disorders, such as depression.</p>
    `
  },
  {
    id: "benefits-of-regular-exercise",
    slug: "benefits-of-regular-exercise",
    title: "The Incredible Benefits of Regular Exercise",
    category: "Fitness & Wellness",
    summary: "Exercise isn't just about weight loss. Learn how staying active transforms your entire body and mind.",
    readTime: "4 min read",
    author: "Sarah Jenkins",
    publishedAt: "2026-08-02",
    featuredImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: true,
    status: "Published",
    content: `
      <p>We all know we should exercise, but understanding exactly why can be the motivation needed to make it a habit.</p>

      <h2>Physical Benefits</h2>
      <p>Regular physical activity strengthens your heart, lowers your blood pressure, and improves your cholesterol levels. It also builds muscle mass and bone density, which is particularly important as we age.</p>

      <h2>Mental Health Benefits</h2>
      <p>Exercise is a powerful depression fighter. It promotes all kinds of changes in the brain, including neural growth, reduced inflammation, and new activity patterns that promote feelings of calm and well-being. It also releases endorphins, powerful chemicals in your brain that energize your spirits and make you feel good.</p>
    `
  },
  {
    id: "understanding-heart-health",
    slug: "understanding-heart-health",
    title: "Understanding Heart Health",
    category: "Heart Health",
    summary: "Heart disease is a leading cause of death worldwide. Learn how to protect your most vital organ.",
    readTime: "5 min read",
    author: "Marcus Aurelius",
    publishedAt: "2026-08-03",
    featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: true,
    status: "Published",
    content: `
      <p>Your heart beats around 100,000 times a day, pumping blood throughout your body. Keeping it healthy is paramount.</p>

      <h2>Risk Factors</h2>
      <p>Several factors increase your risk of heart disease, including high blood pressure, high cholesterol, smoking, diabetes, obesity, and a sedentary lifestyle.</p>

      <h2>How to Protect Your Heart</h2>
      <ul>
        <li><strong>Eat a Heart-Healthy Diet:</strong> Focus on fruits, vegetables, whole grains, and lean proteins.</li>
        <li><strong>Stay Active:</strong> Aim for at least 150 minutes of moderate aerobic exercise a week.</li>
        <li><strong>Manage Stress:</strong> Chronic stress can damage your arteries and worsen other risk factors.</li>
      </ul>
    `
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "Is MediGuide Hub affiliated with any outside medical organization?",
    answer: "No. MediGuide Hub is a privately owned, educational website. We provide objective, clear information and guides about general healthcare to help you live a healthier life."
  },
  {
    id: "faq-2",
    category: "Preventive Care",
    question: "How often should I get a physical exam?",
    answer: "It is generally recommended to get a physical exam annually, but you should consult with your primary care physician to determine the best schedule based on your age, health status, and family history."
  },
  {
    id: "faq-3",
    category: "Nutrition",
    question: "What is considered a balanced diet?",
    answer: "A balanced diet includes a variety of foods from all food groups: fruits, vegetables, fruits, whole grains, lean proteins, and healthy fats, while minimizing processed foods, added sugars, and excessive sodium."
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Arthur Pendelton",
    role: "Health Enthusiast",
    rating: 5,
    content: "MediGuide Hub's articles on preventive care completely changed my daily routine. A must-read for anyone looking to improve their health!"
  },
  {
    id: "t-2",
    name: "Evelyn Martinez",
    role: "Fitness Instructor",
    rating: 5,
    content: "The nutritional advice here is solid and evidence-based. It's refreshing to see clear, accurate health information."
  }
];
