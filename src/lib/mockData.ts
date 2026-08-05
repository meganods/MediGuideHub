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

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "what-is-medicare-beginners-guide",
    slug: "what-is-medicare-beginners-guide",
    title: "What Is Medicare? A Complete Beginner's Guide",
    category: "Overview",
    summary: "If you're new to Medicare, the sheer number of letters and terms can feel overwhelming. Learn the big picture of how Medicare works.",
    readTime: "5 min read",
    author: "Dr. Elizabeth Carter",
    publishedAt: "2026-08-01",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>If you're new to Medicare, the sheer number of letters and terms can feel overwhelming — Part A, Part B, Part C, Part D, Medigap, IRMAA. Before diving into the details, it helps to step back and understand the big picture: what Medicare actually is, who it's for, and how its pieces fit together.</p>

      <h2>What Medicare Is</h2>
      <p>Medicare is a national health insurance program in the United States, primarily for people age 65 and older. It also covers certain younger people with specific disabilities or conditions, such as End-Stage Renal Disease. Unlike private insurance you might get through an employer, Medicare is administered through public programs and rules that change over time.</p>

      <p>Medicare isn't a single plan — it's a system made up of several parts, each covering a different type of care:</p>
      <ul>
        <li><strong>Part A (Hospital Insurance)</strong> covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health care.</li>
        <li><strong>Part B (Medical Insurance)</strong> covers outpatient care, doctor visits, preventive services, and durable medical equipment.</li>
        <li><strong>Part C (Medicare Advantage)</strong> is an alternative way to receive your Part A and Part B benefits through a private insurance company, often bundled with extra benefits like dental or vision.</li>
        <li><strong>Part D (Prescription Drug Coverage)</strong> helps cover the cost of prescription medications, offered through private insurers.</li>
      </ul>

      <p>Many people also consider a Medigap (Medicare Supplement) policy, which helps cover out-of-pocket costs left over after Original Medicare pays its share.</p>

      <h2>Who Is Eligible</h2>
      <p>Most people become eligible for Medicare at age 65, regardless of income. You may also qualify earlier if you have certain disabilities or specific medical conditions. Eligibility is generally tied to your (or a spouse's) work history and Social Security contributions, which affects whether you pay a premium for Part A.</p>

      <h2>How the Parts Work Together</h2>
      <p>A common starting point is "Original Medicare," meaning Part A and Part B together, administered through public programs. From there, most people choose one of two paths:</p>
      <ol>
        <li>Stay with Original Medicare and add a standalone Part D drug plan, often paired with a Medigap policy to help with out-of-pocket costs.</li>
        <li>Enroll in a Medicare Advantage (Part C) plan instead, which is offered by a private insurer and typically bundles hospital, medical, and often drug coverage into one plan.</li>
      </ol>

      <p>Neither path is universally "better" — the right choice depends on your health needs, budget, preferred doctors, and whether you travel frequently, among other factors.</p>

      <h2>When You Enroll</h2>
      <p>Timing matters with Medicare. Your Initial Enrollment Period is a seven-month window centered around your 65th birthday. Missing it can lead to permanent late-enrollment penalties in some cases, which is why understanding the enrollment calendar early is worth the effort — we cover this in detail in our article on enrollment timing.</p>

      <h2>Getting Started</h2>
      <p>If this is your first time learning about Medicare, the most useful next step is to understand each part individually. We've broken down Part A, Part B, Part C, and Part D into their own dedicated guides, so you can explore at your own pace.</p>
    `
  },
  {
    id: "medicare-part-a-explained",
    slug: "medicare-part-a-explained",
    title: "Medicare Part A Explained: Hospital Insurance",
    category: "Overview",
    summary: "Medicare Part A is often the first piece people learn about. Discover what hospital insurance covers and what to expect.",
    readTime: "4 min read",
    author: "Robert Vance",
    publishedAt: "2026-08-02",
    featuredImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Medicare Part A is often the first piece people learn about, since it's commonly referred to as "hospital insurance." Here's what it actually covers, and what it doesn't.</p>

      <h2>What Part A Covers</h2>
      <p>Part A generally covers:</p>
      <ul>
        <li>Inpatient hospital stays, including a semi-private room, meals, general nursing, and hospital services</li>
        <li>Skilled nursing facility care, following a qualifying hospital stay</li>
        <li>Hospice care for individuals with a terminal illness</li>
        <li>Limited home health care services</li>
      </ul>

      <p>It's important to note that Part A covers inpatient hospital care. If you're admitted for observation rather than formally admitted as an inpatient, your visit may actually fall under Part B rules instead — a distinction that surprises a lot of people and is worth confirming with hospital staff during a stay.</p>

      <h2>What Part A Does Not Cover</h2>
      <p>Part A does not cover routine outpatient doctor visits, most prescription drugs, or long-term custodial care (like an extended nursing home stay for daily living assistance rather than medical treatment). These fall under other parts of Medicare or aren't covered by Medicare at all.</p>

      <h2>Do You Pay a Premium?</h2>
      <p>Most people don't pay a monthly premium for Part A, because it's typically earned through payroll taxes paid over a qualifying number of working years (yours or a spouse's). If you don't have enough work history, you may be able to purchase Part A, generally at a monthly cost that varies based on your work credits.</p>

      <h2>Costs to Expect</h2>
      <p>Even without a monthly premium, Part A isn't entirely free at the point of care. There's typically a deductible for each benefit period (a hospital stay), and coinsurance costs can apply for extended hospital or skilled nursing stays. These figures are updated annually, so it's worth checking the current numbers before a planned procedure or admission.</p>

      <h2>A Note on Skilled Nursing Facility Coverage</h2>
      <p>Part A's skilled nursing facility benefit only applies after a qualifying inpatient hospital stay of a required minimum length, and it's meant for skilled, short-term rehabilitative care — not long-term custodial care. This is one of the more commonly misunderstood parts of Medicare, so if you're planning around a rehab stay, it's worth confirming the specifics directly with Medicare or the facility's billing office.</p>

      <h2>How Part A Fits Into Your Overall Coverage</h2>
      <p>Part A alone doesn't provide comprehensive coverage — it's designed to work alongside Part B (and often Part D or a Medicare Advantage plan) to cover the full range of care you might need. If you're building out your understanding of Medicare piece by piece, Part B is a natural next stop.</p>
    `
  },
  {
    id: "medicare-part-b-explained",
    slug: "medicare-part-b-explained",
    title: "Medicare Part B Explained: Medical Insurance",
    category: "Overview",
    summary: "If Part A is about hospital stays, Part B is about outpatient care, doctor visits, and preventive services.",
    readTime: "4 min read",
    author: "Sarah Jenkins",
    publishedAt: "2026-08-02",
    featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>If Part A is about hospital stays, Part B is about nearly everything else — the outpatient, preventive, and day-to-day medical care most people interact with more often.</p>

      <h2>What Part B Covers</h2>
      <p>Part B generally includes:</p>
      <ul>
        <li>Doctor visits and outpatient specialist care</li>
        <li>Preventive services, such as many vaccines, screenings, and annual wellness visits</li>
        <li>Durable medical equipment, like wheelchairs or walkers</li>
        <li>Outpatient mental health services</li>
        <li>Ambulance services, when medically necessary</li>
        <li>Some outpatient prescription drugs administered by a provider (such as certain infusions)</li>
      </ul>

      <h2>What Part B Does Not Cover</h2>
      <p>Part B does not cover most self-administered prescription drugs (that's Part D's role), routine dental, vision, or hearing care, or long-term custodial care.</p>

      <h2>Monthly Premiums</h2>
      <p>Unlike Part A, most people do pay a monthly premium for Part B, and this premium is generally the same for most enrollees, though it can be higher for individuals with higher reported income, through an income-related adjustment. Because this figure changes annually, it's best to check the current standard premium directly with current official sources.</p>

      <h2>Deductible and Coinsurance</h2>
      <p>Part B typically has an annual deductible you pay before Medicare starts covering its share, and after that, Medicare generally covers a majority of approved costs for most services, with you responsible for the remaining coinsurance. Preventive services are often covered at no additional cost when you see a provider who accepts Medicare.</p>

      <h2>The Late Enrollment Penalty</h2>
      <p>One of the most important things to understand about Part B is that delaying enrollment past your Initial Enrollment Period — without qualifying employer coverage — can lead to a permanent premium penalty that increases the longer you wait. This is one of the more consequential Medicare decisions, so if you're still working past 65 with employer coverage, it's worth confirming your specific situation with Medicare or your employer's benefits office before your enrollment window closes.</p>

      <h2>Part B and Medicare Advantage</h2>
      <p>If you enroll in a Medicare Advantage (Part C) plan, you're still required to keep paying your Part B premium in addition to any premium the Advantage plan itself might charge, since Advantage plans are built on top of your Part A and Part B eligibility.</p>

      <h2>Next Steps</h2>
      <p>Once you understand Part A and Part B — together known as "Original Medicare" — the next natural question is whether to add Medicare Advantage, a standalone Part D plan, or a Medigap policy. We break down that decision in our Part C and Medigap comparison articles.</p>
    `
  },
  {
    id: "medicare-part-c-advantage-explained",
    slug: "medicare-part-c-advantage-explained",
    title: "Medicare Part C (Medicare Advantage) Explained",
    category: "Comparison",
    summary: "Medicare Advantage plans offer an alternative way to receive your Medicare benefits. Learn how they work.",
    readTime: "5 min read",
    author: "Marcus Aurelius",
    publishedAt: "2026-08-03",
    featuredImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Medicare Part C, better known as Medicare Advantage, is an alternative way to receive your Medicare benefits — one that roughly half of Medicare enrollees now choose. Here's how it works.</p>

      <h2>What Medicare Advantage Is</h2>
      <p>Instead of receiving Part A and Part B benefits through the traditional structure, Medicare Advantage lets you get those same benefits through a private insurance company that contracts with Medicare. These plans are required to cover everything Original Medicare covers, but they often go further, frequently bundling in extra benefits like dental, vision, hearing, and sometimes prescription drug coverage (Part D) into a single plan.</p>

      <h2>Common Plan Types</h2>
      <p>Medicare Advantage plans typically come in a few structures, most commonly:</p>
      <ul>
        <li><strong>HMO (Health Maintenance Organization)</strong> plans, which usually require you to use a network of doctors and get referrals for specialists</li>
        <li><strong>PPO (Preferred Provider Organization)</strong> plans, which offer more flexibility to see out-of-network providers, often at a higher cost</li>
      </ul>

      <h2>Potential Advantages</h2>
      <ul>
        <li>Often lower monthly premiums than adding separate Part D and Medigap coverage</li>
        <li>Extra benefits not covered by Original Medicare, such as dental, vision, hearing, or fitness programs</li>
        <li>An annual out-of-pocket maximum, which Original Medicare alone doesn't have</li>
      </ul>

      <h2>Potential Trade-Offs</h2>
      <ul>
        <li>Provider networks are often more restrictive than Original Medicare, which accepts any provider that takes Medicare nationwide</li>
        <li>Plan availability, costs, and covered benefits vary significantly by location and change year to year</li>
        <li>You may need referrals or prior authorization for certain specialist care, depending on the plan</li>
      </ul>

      <h2>How It Differs From Original Medicare + Medigap</h2>
      <p>The core trade-off many people weigh is flexibility versus predictability. Original Medicare paired with a Medigap policy generally offers broader provider access and more predictable out-of-pocket costs, often at a higher monthly premium. Medicare Advantage often costs less upfront and adds extra benefits, but with more network restrictions and variable out-of-pocket costs depending on the care you need.</p>

      <h2>Switching Between Original Medicare and Medicare Advantage</h2>
      <p>You're generally not locked into your choice forever. Medicare has designated enrollment windows — including the Annual Enrollment Period each fall — during which you can switch between Original Medicare and Medicare Advantage, or change Advantage plans.</p>

      <h2>How to Decide</h2>
      <p>Because plan availability and pricing depend heavily on your zip code and personal health needs, the most reliable way to compare specific plans is through official plan comparison tools that let you review options available in your area side by side.</p>
    `
  },
  {
    id: "medicare-part-d-prescription-drug-coverage",
    slug: "medicare-part-d-prescription-drug-coverage",
    title: "Medicare Part D: Prescription Drug Coverage",
    category: "Comparison",
    summary: "Prescription drug coverage is a crucial element of your Medicare design. Learn about formularies and coverage stages.",
    readTime: "5 min read",
    author: "Patricia Gomez",
    publishedAt: "2026-08-03",
    featuredImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Prescription medications are one of the most significant ongoing costs many Medicare enrollees face, which is why understanding Part D — the piece of Medicare dedicated to drug coverage — matters.</p>

      <h2>What Part D Is</h2>
      <p>Part D is prescription drug coverage offered through private insurance companies approved by Medicare. It's available either as a standalone plan (if you have Original Medicare) or bundled into many Medicare Advantage plans.</p>

      <h2>How Part D Plans Are Structured</h2>
      <p>Each Part D plan maintains its own list of covered medications, called a formulary, organized into cost tiers — generally ranging from lower-cost generic drugs to higher-cost specialty medications. Because formularies vary significantly between plans, two people with the same medications could pay very different amounts depending on which plan they choose.</p>

      <h2>The Coverage Stages</h2>
      <p>Part D plans typically move through a few cost stages over the course of a year:</p>
      <ul>
        <li>An initial deductible phase (if your plan has one)</li>
        <li>An initial coverage phase, where you and the plan share costs</li>
        <li>A coverage gap phase, sometimes still referred to as the "donut hole," though recent reforms have significantly changed how this phase works</li>
        <li>A catastrophic coverage phase, once your out-of-pocket spending crosses a certain threshold, after which your costs drop significantly</li>
      </ul>

      <p>Because Part D rules have changed substantially in recent years — including a new annual out-of-pocket spending cap — it's especially important to check the current structure directly with current official sources rather than relying on older information.</p>

      <h2>Choosing a Plan</h2>
      <p>When comparing Part D plans, the most important factors are usually:</p>
      <ul>
        <li>Whether your specific medications are on the plan's formulary</li>
        <li>Which cost tier your medications fall into</li>
        <li>Whether your preferred pharmacy is in the plan's network</li>
        <li>The plan's monthly premium versus your expected drug costs over the year</li>
      </ul>

      <h2>The Late Enrollment Penalty</h2>
      <p>Similar to Part B, delaying Part D enrollment without other "creditable" drug coverage can lead to a permanent monthly penalty added to your premium once you do enroll. If you're not taking any medications currently, it can still be worth enrolling in a low-cost plan to avoid this penalty later, since future medication needs are hard to predict.</p>

      <h2>Where to Compare Plans</h2>
      <p>Because formularies, pharmacy networks, and pricing change every year and vary by plan, official plan comparison tools are the most reliable way to compare specific Part D plans against your actual medication list.</p>
    `
  },
  {
    id: "medigap-vs-medicare-advantage",
    slug: "medigap-vs-medicare-advantage",
    title: "Medigap vs Medicare Advantage: What's the Difference?",
    category: "Comparison",
    summary: "One of the most important Medicare decisions is choosing between a Medigap supplement and Medicare Advantage. Here is how they stack up.",
    readTime: "5 min read",
    author: "Jonathan Brooks",
    publishedAt: "2026-08-04",
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>This is one of the most common questions people face once they understand the basics of Medicare: should you pair Original Medicare with a Medigap policy, or choose Medicare Advantage instead? Both are valid paths, but they work very differently.</p>

      <h2>The Core Difference</h2>
      <ul>
        <li><strong>Medigap (Medicare Supplement Insurance)</strong> is designed to work alongside Original Medicare, helping cover the out-of-pocket costs — like deductibles and coinsurance — that Original Medicare leaves behind.</li>
        <li><strong>Medicare Advantage</strong> is an alternative to Original Medicare, where a private insurer takes over administering your Part A and Part B benefits, often adding extra perks.</li>
      </ul>
      <p>You generally cannot have both a Medigap policy and a Medicare Advantage plan at the same time — it's one path or the other.</p>

      <h2>How Medigap Works</h2>
      <p>Medigap plans are standardized into lettered plans (such as Plan G or Plan N), meaning a given plan letter covers the same benefits no matter which insurance company sells it — though premiums for the same lettered plan can vary between insurers. Medigap generally offers broad access to any provider nationwide that accepts Medicare, with more predictable costs, in exchange for a higher monthly premium and no extra benefits like dental or vision.</p>

      <h2>How Medicare Advantage Works</h2>
      <p>Medicare Advantage plans are not standardized — benefits, costs, and networks vary plan to plan and insurer to insurer. They often include extra benefits and can have lower monthly premiums, but typically come with provider networks, referral requirements, and variable out-of-pocket costs depending on the care you use.</p>

      <h2>Key Questions to Ask Yourself</h2>
      <ul>
        <li>Do you travel frequently or split time between states? Broader provider access (Medigap) may matter more.</li>
        <li>Are extra benefits like dental and vision important to you? Medicare Advantage often includes these.</li>
        <li>Do you prefer predictable costs, or are you comfortable with variable costs in exchange for a lower premium?</li>
        <li>Are your preferred doctors and specialists in a particular Medicare Advantage plan's network?</li>
      </ul>

      <h2>Timing Matters</h2>
      <p>Medigap has a particularly important enrollment consideration: your Medigap Open Enrollment Period, a six-month window starting when you're both 65 and enrolled in Part B, is generally the best time to buy a policy, since insurers can't deny you coverage or charge more based on health conditions during that window. Outside of it, medical underwriting may apply in most states.</p>

      <h2>There's No Universal Right Answer</h2>
      <p>The right choice depends entirely on your personal health needs, budget, travel habits, and preferred doctors. Many people find it useful to speak with a licensed, unbiased Medicare counselor (such as through your state's free SHIP program) before deciding.</p>
    `
  },
  {
    id: "when-how-to-enroll-in-medicare",
    slug: "when-how-to-enroll-in-medicare",
    title: "When and How to Enroll in Medicare",
    category: "Enrollment",
    summary: "Missing your Medicare enrollment windows can lead to lifelong penalties. Learn the key dates and rules.",
    readTime: "5 min read",
    author: "Robert Vance",
    publishedAt: "2026-08-04",
    featuredImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Enrollment timing is one of the most consequential parts of the entire Medicare process — missing a window can mean permanent penalties or gaps in coverage. Here's how the timeline works.</p>

      <h2>Initial Enrollment Period (IEP)</h2>
      <p>Your Initial Enrollment Period is a seven-month window: it begins three months before the month you turn 65, includes your birthday month, and extends three months after. This is the primary window most people use to enroll in Part A and Part B for the first time.</p>

      <h2>If You're Still Working</h2>
      <p>If you (or a spouse) are still working at 65 and covered by a qualifying employer group health plan, you may be able to delay Part B enrollment without a penalty, and enroll later during a Special Enrollment Period once that employment or coverage ends. This exception generally applies to larger employers — the rules can differ for smaller companies, so it's worth confirming your specific situation with Medicare or your employer's benefits office before assuming you qualify.</p>

      <h2>General Enrollment Period</h2>
      <p>If you miss your Initial Enrollment Period and don't qualify for a Special Enrollment Period, you can generally enroll during the General Enrollment Period, which runs each year from January 1 through March 31, with coverage typically starting the month after you enroll. Enrolling this way may come with late-enrollment penalties for Part B and/or Part D.</p>

      <h2>Annual Enrollment Period (AEP)</h2>
      <p>Each year, from October 15 through December 7, current Medicare enrollees can make changes to their coverage — switching between Original Medicare and Medicare Advantage, changing Medicare Advantage plans, or changing Part D plans. Changes made during this window generally take effect January 1 of the following year.</p>

      <h2>Medicare Advantage Open Enrollment Period</h2>
      <p>If you're already enrolled in a Medicare Advantage plan, there's an additional window, generally January 1 through March 31, during which you can switch to a different Medicare Advantage plan or move back to Original Medicare.</p>

      <h2>A Simple Way to Think About It</h2>
      <ul>
        <li>Turning 65 soon? Focus on your seven-month Initial Enrollment Period.</li>
        <li>Still working with employer coverage? Look into Special Enrollment Period rules before your IEP closes.</li>
        <li>Missed your window entirely? The General Enrollment Period (Jan 1–Mar 31) is your next opportunity, though penalties may apply.</li>
        <li>Already enrolled and want to make a change? The Annual Enrollment Period (Oct 15–Dec 7) is your main opportunity each year.</li>
      </ul>

      <h2>Don't Wait Until the Last Minute</h2>
      <p>Because these windows are firm and penalties for missing them can be permanent, it's worth marking your calendar well ahead of your 65th birthday, or as soon as a qualifying life event (like retiring) occurs.</p>
    `
  },
  {
    id: "common-medicare-enrollment-mistakes",
    slug: "common-medicare-enrollment-mistakes",
    title: "Common Medicare Enrollment Mistakes to Avoid",
    category: "Enrollment",
    summary: "Avoid costly mistakes like late enrollment surcharges or losing network doctor access with this guide.",
    readTime: "5 min read",
    author: "Sarah Jenkins",
    publishedAt: "2026-08-04",
    featuredImage: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Even well-informed people make avoidable mistakes during Medicare enrollment. Here are some of the most common ones, and how to steer clear of them.</p>

      <h2>1. Missing the Initial Enrollment Period</h2>
      <p>The single most costly mistake is simply missing your seven-month Initial Enrollment Period without qualifying for an exception. This can lead to a gap in coverage and permanent late-enrollment penalties for Part B. Mark your calendar three months before your 65th birthday, not after.</p>

      <h2>2. Assuming You're Automatically Enrolled</h2>
      <p>Some people are automatically enrolled in Medicare (typically if you're already receiving Social Security benefits before turning 65), but many are not. Don't assume enrollment happens automatically — confirm your status directly with Medicare or Social Security well before your 65th birthday.</p>

      <h2>3. Not Understanding the Employer Coverage Exception</h2>
      <p>People still working past 65 sometimes delay Part B assuming it's automatically penalty-free — but this exception generally only applies to larger employer group plans, and the rules can be more complex for smaller employers or COBRA coverage. Confirm your specific situation rather than assuming.</p>

      <h2>4. Skipping Part D Because \"I Don't Take Any Medications\"</h2>
      <p>Declining Part D coverage entirely, with no other creditable drug coverage, can lead to a permanent late-enrollment penalty later — even if you don't need medications right now. A low-cost Part D plan is often worth having simply to avoid this future penalty.</p>

      <h2>5. Not Comparing Plans Every Year</h2>
      <p>Medicare Advantage and Part D plan costs, formularies, and networks can change year to year, even if you don't change plans yourself. Many people stay on the same plan indefinitely without checking whether a better-fitting option is now available during the Annual Enrollment Period.</p>

      <h2>6. Confusing Medigap Open Enrollment With Other Windows</h2>
      <p>Your Medigap Open Enrollment Period is a one-time, six-month window tied to turning 65 and enrolling in Part B — it's not the same as the Annual Enrollment Period. Missing it can mean facing medical underwriting later if you want to buy or switch a Medigap policy.</p>

      <h2>7. Overlooking Provider Networks</h2>
      <p>Choosing a Medicare Advantage plan without confirming your preferred doctors and hospitals are in-network is a common and frustrating mistake to discover after you've already enrolled. Always check the plan's provider directory before choosing.</p>

      <h2>8. Not Asking for Help</h2>
      <p>Medicare's rules are genuinely complex, and there's no reason to navigate them entirely alone. Free, unbiased help is available through your state's SHIP (State Health Insurance Assistance Program) counselors, who can review your specific situation at no cost.</p>

      <h2>The Takeaway</h2>
      <p>Most Medicare mistakes come down to assumptions. Taking the time to understand your specific enrollment windows — and asking questions before deadlines pass — is the simplest way to avoid the most common and costly errors.</p>
    `
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "Is MediGuide Hub affiliated with any outside organization?",
    answer: "No. MediGuide Hub is a privately owned, educational website. We provide objective, clear information and guides about Medicare to help you understand your options. We do not sell insurance directly or represent any outside organization."
  },
  {
    id: "faq-2",
    category: "Eligibility",
    question: "When should I sign up for Medicare if I am turning 65?",
    answer: "You should typically sign up during your Initial Enrollment Period (IEP), which begins 3 months before the month you turn 65, includes your birthday month, and ends 3 months after."
  },
  {
    id: "faq-3",
    category: "Costs",
    question: "Is Medicare completely free?",
    answer: "No. While Part A (hospital insurance) is free for most people who worked at least 10 years, Part B (medical insurance), Part D (prescription drugs), and Medicare Advantage or Medigap policies all require premiums, deductibles, copays, or coinsurance."
  },
  {
    id: "faq-4",
    category: "Plans",
    question: "Can I have both Medigap and Medicare Advantage?",
    answer: "No. You cannot have both at the same time. You must choose between Original Medicare with a Medigap supplement, or a private Medicare Advantage plan."
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Arthur Pendelton",
    role: "Retired School Administrator",
    rating: 5,
    content: "MediGuide Hub saved me from a massive late-enrollment penalty. Their guide on COBRA vs Medicare was clear and easy to follow. A must-read for anyone turning 65!"
  },
  {
    id: "t-2",
    name: "Evelyn Martinez",
    role: "Beneficiary Spouse",
    rating: 5,
    content: "Comparing Medigap and Medicare Advantage felt impossible until I read their side-by-side table. Extremely professional and easy to understand!"
  },
  {
    id: "t-3",
    name: "Thomas Chen",
    role: "Retired Engineer",
    rating: 5,
    content: "The articles are long-form and cover every tiny detail about prescription drug tiers. I finally understand the donut hole. Highly recommend!"
  }
];
