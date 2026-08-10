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
    seoTitle: "Preventive Care Guides | mediguide4u",
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
    seoTitle: "Nutrition & Diet Guidelines | mediguide4u",
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
    seoTitle: "Mental Health & Wellness | mediguide4u",
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
    seoTitle: "Heart Health & Cardiovascular Care | mediguide4u",
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
    seoTitle: "Fitness & Wellness Advice | mediguide4u",
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
    seoTitle: "Senior Health & Healthy Aging | mediguide4u",
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
  },
  {
    id: "science-of-stress-management",
    slug: "science-of-stress-management",
    title: "The Science of Stress Management: Clinical Techniques for Daily Life",
    category: "Mental Health",
    summary: "Stress impacts every major organ in your body. Discover clinical techniques to reduce daily anxiety, lower cortisol levels, and improve your emotional resilience.",
    readTime: "8 min read",
    author: "Dr. Elizabeth Carter",
    publishedAt: "2026-08-04",
    featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: true,
    status: "Published",
    content: `
      <p>In our fast-paced modern world, stress is often dismissed as a mere mental inconvenience. However, clinical research shows that chronic stress acts as a physiological threat, altering hormone levels, raising blood pressure, and impairing immune function. Understanding the science of stress and implementing evidence-based management techniques is vital for long-term health.</p>

      <h2>The Physiology of Stress</h2>
      <p>When you encounter a perceived threat, your hypothalamus triggers a cascade of signals, instructing your adrenal glands to release hormones, including adrenaline and cortisol. Adrenaline increases your heart rate and elevates blood pressure. Cortisol, the primary stress hormone, increases sugars in the bloodstream, alters immune responses, and suppresses the digestive system. While this response is life-saving in emergencies, prolonged activation causes systemic wear and tear.</p>

      <h2>Long-Term Effects of High Cortisol</h2>
      <p>Consistent exposure to elevated cortisol levels can lead to numerous health complications:</p>
      <ul>
        <li><strong>Cardiovascular Issues:</strong> Increased risk of hypertension, arterial damage, and heart attacks.</li>
        <li><strong>Digestive Disruptions:</strong> Alterations in gut flora, resulting in conditions like IBS or acid reflux.</li>
        <li><strong>Immune Suppression:</strong> Reduced capacity to fight off infections, leading to more frequent illness.</li>
        <li><strong>Cognitive Decline:</strong> Chronic stress impairs memory consolidation and reduces prefrontal cortex function, making decisions harder.</li>
      </ul>

      <h2>Clinical Stress Reduction Techniques</h2>
      <p>Fortunately, scientific research has identified several highly effective methods to counteract the stress response:</p>
      
      <h3>1. Mindfulness-Based Stress Reduction (MBSR)</h3>
      <p>Developed by Dr. Jon Kabat-Zinn, MBSR combines mindfulness meditation and yoga. It teaches individuals to observe thoughts and sensations without judgment, rewiring neural pathways associated with anxiety and emotional regulation.</p>

      <h3>2. Cognitive Behavioral Reframing</h3>
      <p>Stress is frequently amplified by negative cognitive distortions. By identifying and challenging irrational thoughts (such as catastrophizing), you can reduce the perceived severity of stressors, lowering the physiological response.</p>

      <h3>3. Progressive Muscle Relaxation (PMR)</h3>
      <p>PMR involves systematically tensing and relaxing different muscle groups. This technique helps break the physical loop of anxiety, where mental stress leads to muscle tension, which in turn reinforces mental anxiety.</p>

      <h3>4. Strategic Diaphragmatic Breathing</h3>
      <p>Deep breathing stimulates the vagus nerve, which activates the parasympathetic nervous system (the "rest and digest" mode). By extending your exhalations to be longer than your inhalations, you signal to your brain that you are safe, rapidly lowering your heart rate.</p>

      <h2>Conclusion</h2>
      <p>Managing stress is not a luxury; it is a clinical necessity. By integrating diaphragmatic breathing, PMR, and cognitive reframing into your daily routine, you can protect your body from the damaging effects of chronic cortisol exposure and live a healthier, more balanced life.</p>
    `
  },
  {
    id: "active-aging-seniors-guide",
    slug: "active-aging-seniors-guide",
    title: "Active Aging: Complete Wellness and Mobility Guide for Seniors",
    category: "Senior Health",
    summary: "Healthy aging is about maintaining independence and vitality. Explore essential tips for joint mobility, balanced nutrition, cognitive exercise, and preventative screenings.",
    readTime: "9 min read",
    author: "Dr. Sarah Jenkins",
    publishedAt: "2026-08-04",
    featuredImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: false,
    status: "Published",
    content: `
      <p>Aging is an inevitable biological process, but the quality of your later years is highly influenced by lifestyle choices. Active aging focuses on optimizing opportunities for physical, social, and mental health, allowing older adults to maintain independence and a high quality of life.</p>

      <h2>Maintaining Physical Mobility</h2>
      <p>One of the primary challenges of aging is the loss of muscle mass (sarcopenia) and decreased joint flexibility. Staying physically active is the single most effective countermeasure. A balanced senior fitness routine should include three key components:</p>
      <ul>
        <li><strong>Strength Training:</strong> Using light weights or resistance bands twice a week builds muscle tissue, supports joint stability, and increases bone density, reducing the risk of osteoporosis.</li>
        <li><strong>Balance Exercises:</strong> Activities like Tai Chi or standing on one foot significantly improve stability, preventing falls, which are a leading cause of injury among seniors.</li>
        <li><strong>Aerobic Activity:</strong> Thirty minutes of moderate walking, swimming, or cycling five days a week keeps the cardiovascular system strong and maintains stamina.</li>
      </ul>

      <h2>Nutritional Strategies for Healthy Aging</h2>
      <p>As metabolic rates slow, nutrient absorption can decrease. Therefore, seniors need nutrient-dense meals that provide ample vitamins and minerals without excessive calories. Focus on:</p>
      <ul>
        <li><strong>High-Quality Protein:</strong> Vital for muscle preservation. Include lean chicken, fish, eggs, and legumes in your meals.</li>
        <li><strong>Calcium and Vitamin D:</strong> Critical for bone structure. Incorporate low-fat dairy, fortified foods, and leafy green vegetables.</li>
        <li><strong>Hydration:</strong> The sensation of thirst naturally declines with age. Make a conscious effort to drink water throughout the day, even if you do not feel thirsty.</li>
      </ul>

      <h2>Cognitive Stimulation</h2>
      <p>Mental exercise is just as crucial as physical movement. Engaging in cognitively demanding tasks creates new neural connections and helps preserve cognitive reserve. Reading challenging books, playing strategic puzzles, learning a new musical instrument, or participating in social discussions are excellent ways to keep the mind sharp.</p>

      <h2>Preventative Screenings for Seniors</h2>
      <p>Regular check-ups are essential to catch potential issues before they become severe. Older adults should consult their physicians to set a schedule for bone density scans, vision and hearing tests, colonoscopies, and cardiovascular evaluations.</p>

      <h2>Conclusion</h2>
      <p>Active aging is a holistic journey. By combining physical mobility exercises, a balanced, nutrient-rich diet, cognitive stimulation, and regular medical check-ups, seniors can preserve their independence, protect their health, and enjoy their golden years to the fullest.</p>
    `
  },
  {
    id: "designing-weekly-workout-routine",
    slug: "designing-weekly-workout-routine",
    title: "Designing Your Weekly Workout Routine: A Clinical Approach to Fitness",
    category: "Fitness & Wellness",
    summary: "Creating a balanced workout routine is key to long-term physical health. Learn how to combine cardio, strength training, and flexibility work effectively.",
    readTime: "8 min read",
    author: "Robert Vance",
    publishedAt: "2026-08-05",
    featuredImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    featured: false,
    trending: true,
    status: "Published",
    content: `
      <p>When it comes to exercise, consistency is crucial, but structure is what yields results. Without a well-designed workout routine, you run the risk of overtraining, muscle imbalances, or injury. A clinical approach to fitness involves combining different forms of exercise to support overall metabolic, cardiovascular, and musculoskeletal health.</p>

      <h2>The Core Pillars of a Complete Routine</h2>
      <p>A balanced weekly routine must incorporate three fundamental components, each serving a unique physiological purpose:</p>
      
      <h3>1. Resistance and Strength Training</h3>
      <p>Strength training is essential for building muscle tissue, boosting metabolic rate, and strengthening bones. Aim for 2 to 3 sessions per week, targeting all major muscle groups (legs, core, back, chest, and shoulders). Allow at least 48 hours of recovery between sessions for the same muscle group to prevent overuse injury.</p>

      <h3>2. Cardiovascular Conditioning</h3>
      <p>Cardio exercises strengthen your heart, lower resting blood pressure, and improve lung capacity. The American Heart Association recommends at least 150 minutes of moderate cardio (like brisk walking or swimming) or 75 minutes of vigorous cardio (like running or HIIT) per week, spread across several days.</p>

      <h3>3. Flexibility and Active Recovery</h3>
      <p>Flexibility training prevents injury, improves joint range of motion, and aids muscle recovery. Dedicate 5 to 10 minutes to static stretching after every workout, or incorporate dedicated sessions of yoga or mobility drills weekly.</p>

      <h2>Sample Weekly Schedule</h2>
      <p>Here is an example of a balanced weekly layout for general fitness:</p>
      <ul>
        <li><strong>Monday:</strong> Lower Body Strength + 10 mins post-workout stretch.</li>
        <li><strong>Tuesday:</strong> 30-45 mins Moderate-Intensity Cardio (Walking/Jogging).</li>
        <li><strong>Wednesday:</strong> Upper Body Strength + Core.</li>
        <li><strong>Thursday:</strong> Active Recovery (Light walking or gentle yoga).</li>
        <li><strong>Friday:</strong> Full Body Strength + Flexibility work.</li>
        <li><strong>Saturday:</strong> 30-45 mins Aerobic Conditioning (Cycling/Swimming).</li>
        <li><strong>Sunday:</strong> Full Rest Day.</li>
      </ul>

      <h2>Listening to Your Body</h2>
      <p>Overtraining is a common pitfall that can lead to chronic fatigue, mood disturbances, and muscle strains. Ensure you get adequate sleep (7-9 hours per night) and consume enough protein to support muscle repair. If you experience persistent joint pain or extreme fatigue, adjust your routine to include more rest.</p>

      <h2>Conclusion</h2>
      <p>A successful fitness journey relies on balance. By structured weekly planning that integrates strength training, cardiovascular exercise, and recovery, you can build a resilient body, enhance your physical capabilities, and maintain long-term wellness.</p>
    `
  },
  {
    id: "truth-about-superfoods-micronutrients",
    slug: "truth-about-superfoods-micronutrients",
    title: "The Truth About Superfoods and Micronutrients: Fueling Your Immune System",
    category: "Nutrition",
    summary: "Not all superfoods live up to the marketing hype. Learn which vitamin-rich whole foods provide the maximum scientific benefit for your cellular health.",
    readTime: "8 min read",
    author: "Robert Vance",
    publishedAt: "2026-08-05",
    featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    featured: false,
    trending: false,
    status: "Published",
    content: `
      <p>The term "superfood" is highly popular in grocery stores and health magazines, but it is not a scientific classification. While no single food can cure illnesses, certain nutrient-dense options contain exceptionally high amounts of vitamins, minerals, and antioxidants that support immune defense and cellular repair.</p>

      <h2>Understanding Micronutrients and Antioxidants</h2>
      <p>To understand the value of healthy eating, we must look at micronutrients—vitamins and minerals that our bodies cannot produce in sufficient quantities. Antioxidants, such as vitamins C and E, play a crucial role by neutralizing free radicals, which are unstable molecules that cause oxidative stress and damage cellular structures.</p>

      <h2>Scientific Benefits of True Superfoods</h2>
      <p>Here are several nutrient-dense foods backed by clinical evidence:</p>
      
      <h3>1. Berries (Blueberries, Blackberries, Raspberries)</h3>
      <p>Berries are rich in anthocyanins—a type of flavonoid with strong antioxidant properties. Regular consumption is linked to improved cardiovascular function, lowered inflammation, and enhanced cognitive performance.</p>

      <h3>2. Dark Leafy Greens (Kale, Spinach, Swiss Chard)</h3>
      <p>Leafy greens provide abundant vitamins A, C, and K, as well as folate and iron. These nutrients are essential for blood clotting, bone density, and immune cell proliferation. They also contain carotenoids, which protect visual health.</p>

      <h3>3. Fatty Fish (Salmon, Mackerel, Sardines)</h3>
      <p>Fatty fish are the premier source of omega-3 fatty acids. Omega-3s are critical components of cell membranes, particularly in the brain, and help reduce systemic inflammation throughout the body.</p>

      <h3>4. Fermented Foods (Yogurt, Kefir, Kimchi)</h3>
      <p>A major portion of your immune system resides in your gut. Fermented foods supply beneficial probiotics that strengthen the gut barrier, improve nutrient absorption, and regulate immune responses.</p>

      <h2>A Balanced Nutritional Framework</h2>
      <p>Relying on a single superfood is ineffective. The key to cellular health is diversity. Consuming a colorful array of vegetables, fruits, whole grains, and healthy fats ensures that your body receives a comprehensive spectrum of essential micronutrients.</p>

      <h2>Conclusion</h2>
      <p>Do not be swayed by exotic marketing labels. Incorporating local, accessible whole foods like berries, leafy greens, fatty fish, and fermented items into your daily meals is the most evidence-based way to nourish your cells and support your immune system.</p>
    `
  },
  {
    id: "managing-blood-pressure-naturally",
    slug: "managing-blood-pressure-naturally",
    title: "Managing Blood Pressure Naturally: Evidence-Based Lifestyle Strategies",
    category: "Heart Health",
    summary: "Hypertension affects millions worldwide. Discover simple, scientifically-proven lifestyle adjustments, dietary changes, and daily habits to normalize your blood pressure.",
    readTime: "9 min read",
    author: "Dr. Elizabeth Carter",
    publishedAt: "2026-08-06",
    featuredImage: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800",
    featured: true,
    trending: true,
    status: "Published",
    content: `
      <p>High blood pressure, or hypertension, is frequently referred to as a "silent killer" because it rarely presents visible symptoms while gradually damaging blood vessels and organs. Over time, uncontrolled hypertension increases the risk of heart disease, stroke, and kidney failure. Fortunately, clinical studies confirm that lifestyle modifications can be highly effective in reducing and managing blood pressure levels naturally.</p>

      <h2>The Impact of Diet: The DASH Pattern</h2>
      <p>Diet is a cornerstone of cardiovascular health. The Dietary Approaches to Stop Hypertension (DASH) eating plan is clinically proven to lower blood pressure. Key components of the DASH pattern include:</p>
      <ul>
        <li><strong>Sodium Reduction:</strong> Lowering daily sodium intake to under 2,300 mg (and ideally 1,500 mg) dramatically reduces fluid retention and vascular tension.</li>
        <li><strong>Potassium Enrichment:</strong> Potassium helps ease tension in blood vessel walls and prompts the body to excrete excess sodium. Foods rich in potassium include bananas, avocados, sweet potatoes, and leafy greens.</li>
        <li><strong>Whole Grains and Lean Proteins:</strong> Fiber-rich grains and lean proteins support arterial flexibility and weight management.</li>
      </ul>

      <h2>The Role of Regular Aerobic Exercise</h2>
      <p>Cardiovascular exercise strengthens the heart muscle, allowing it to pump blood with less effort, which directly lowers force on the arteries. Engaging in 30 minutes of moderate aerobic activity (such as brisk walking, swimming, or cycling) on most days of the week can lower blood pressure by 5 to 8 mm Hg.</p>

      <h2>Weight Management and Vascular Load</h2>
      <p>Blood pressure often raises as body weight increases. Being overweight can also cause disrupted breathing during sleep (sleep apnea), which further raises blood pressure. Losing even a small amount of weight if you are overweight can have a significant positive impact on arterial stress.</p>

      <h2>Limiting Stimulants and Managing Stress</h2>
      <p>Chronic stress triggers temporary spikes in blood pressure while encouraging unhealthy habits like overeating or poor sleep. Implementing mindfulness meditation, regular breaks, and deep breathing exercises helps modulate the nervous system, keeping pressure levels stable. Additionally, limiting alcohol and avoiding nicotine are critical, as both substances directly damage blood vessel walls.</p>

      <h2>Conclusion</h2>
      <p>Lowering blood pressure naturally is achievable through consistent lifestyle choices. By adopting the DASH diet, staying active, managing weight, and reducing stress, you can significantly protect your cardiovascular system and ensure a healthier heart.</p>
    `
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "Is mediguide4u affiliated with any outside medical organization?",
    answer: "No. mediguide4u is a privately owned, educational website. We provide objective, clear information and guides about general healthcare to help you live a healthier life."
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
    content: "mediguide4u's articles on preventive care completely changed my daily routine. A must-read for anyone looking to improve their health!"
  },
  {
    id: "t-2",
    name: "Evelyn Martinez",
    role: "Fitness Instructor",
    rating: 5,
    content: "The nutritional advice here is solid and evidence-based. It's refreshing to see clear, accurate health information."
  }
];
