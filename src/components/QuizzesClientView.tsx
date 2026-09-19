"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Moon, 
  Brain, 
  Heart, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity,
  Award,
  BookOpen
} from "lucide-react";

interface QuizQuestion {
  question: string;
  options: { text: string; points: number }[];
}

interface QuizDefinition {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  questions: QuizQuestion[];
  results: {
    minScore: number;
    maxScore: number;
    title: string;
    level: "Optimal" | "Moderate" | "Needs Attention";
    color: string;
    bg: string;
    summary: string;
    recommendations: string[];
    suggestedSlug: string;
  }[];
}

const QUIZZES: QuizDefinition[] = [
  {
    id: "sleep",
    title: "Sleep Quality & Rest Index",
    description: "Evaluate your nighttime restorative sleep, sleep architecture, and daytime alertness.",
    icon: Moon,
    category: "Rest & Recovery",
    questions: [
      {
        question: "How many hours of actual sleep do you average per night?",
        options: [
          { text: "7 to 9 hours consistently", points: 3 },
          { text: "6 to 7 hours", points: 2 },
          { text: "5 to 6 hours", points: 1 },
          { text: "Less than 5 hours or irregular", points: 0 },
        ],
      },
      {
        question: "How long does it typically take you to fall asleep after turning off lights?",
        options: [
          { text: "10 to 20 minutes (Optimal)", points: 3 },
          { text: "Under 5 minutes (May indicate exhaustion)", points: 2 },
          { text: "30 to 60 minutes", points: 1 },
          { text: "Over 60 minutes or tossing and turning", points: 0 },
        ],
      },
      {
        question: "How often do you wake up in the middle of the night and struggle to return to sleep?",
        options: [
          { text: "Rarely or never", points: 3 },
          { text: "1-2 times per week", points: 2 },
          { text: "3-4 times per week", points: 1 },
          { text: "Almost every night", points: 0 },
        ],
      },
      {
        question: "Do you experience daytime drowsiness, brain fog, or need caffeine after 2 PM to stay alert?",
        options: [
          { text: "Rarely, I feel energetic", points: 3 },
          { text: "Occasionally in the mid-afternoon", points: 2 },
          { text: "Frequently, relying on energy drinks or coffee", points: 1 },
          { text: "Constantly exhausted throughout the day", points: 0 },
        ],
      },
    ],
    results: [
      {
        minScore: 10,
        maxScore: 12,
        title: "Excellent Sleep Quality",
        level: "Optimal",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        summary: "Your sleep habits indicate strong circadian rhythm alignment and sufficient restorative slow-wave sleep.",
        recommendations: [
          "Continue maintaining consistent wake-up times on weekends.",
          "Keep exposure to natural sunlight within 30 minutes of waking.",
          "Maintain a cool, dark sleeping sanctuary (65-68°F / 18-20°C).",
        ],
        suggestedSlug: "sleep-hygiene-circadian-health",
      },
      {
        minScore: 6,
        maxScore: 9,
        title: "Moderate Sleep Disruption",
        level: "Moderate",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        summary: "You are getting moderate rest, but micro-disruptions or late-night light exposure may impair deep sleep stages.",
        recommendations: [
          "Establish a digital sunset: turn off screens 60 minutes before bed.",
          "Avoid caffeine within 8 hours of bedtime.",
          "Consider magnesium-rich whole foods or relaxing wind-down routines.",
        ],
        suggestedSlug: "sleep-hygiene-circadian-health",
      },
      {
        minScore: 0,
        maxScore: 5,
        title: "Significant Sleep Debt / Insomnia Risk",
        level: "Needs Attention",
        color: "text-rose-700",
        bg: "bg-rose-50 border-rose-200 text-rose-800",
        summary: "Your responses suggest chronic sleep deficit, which can impact immunity, metabolic health, and cognitive function.",
        recommendations: [
          "Consult a primary care physician or sleep specialist to evaluate for sleep apnea or chronic insomnia.",
          "Keep a 7-day sleep log noting bedtime, wakeups, and caffeine intake.",
          "Avoid heavy meals or alcohol close to bedtime.",
        ],
        suggestedSlug: "sleep-hygiene-circadian-health",
      },
    ],
  },
  {
    id: "stress",
    title: "Stress & Burnout Risk Assessment",
    description: "Screen for perceived stress, physical autonomic tension, and mental overload.",
    icon: Brain,
    category: "Mental & Neurological",
    questions: [
      {
        question: "In the last month, how often have you felt unable to control important things in your life?",
        options: [
          { text: "Never or almost never", points: 3 },
          { text: "Sometimes", points: 2 },
          { text: "Fairly often", points: 1 },
          { text: "Very often / Constantly", points: 0 },
        ],
      },
      {
        question: "Do you experience physical stress signs (e.g. tight shoulders, clenching jaw, tension headaches, digestive upset)?",
        options: [
          { text: "Rarely or never", points: 3 },
          { text: "Occasionally under deadlines", points: 2 },
          { text: "Multiple days each week", points: 1 },
          { text: "Daily persistent physical tension", points: 0 },
        ],
      },
      {
        question: "How confident do you feel in your ability to handle personal problems and decompress after work?",
        options: [
          { text: "Very confident with reliable coping outlets", points: 3 },
          { text: "Moderately confident", points: 2 },
          { text: "Somewhat overwhelmed", points: 1 },
          { text: "Completely depleted and unable to recharge", points: 0 },
        ],
      },
      {
        question: "How frequently do you feel emotionally irritable or easily triggered by small inconveniences?",
        options: [
          { text: "Rarely", points: 3 },
          { text: "A few times a month", points: 2 },
          { text: "Several times a week", points: 1 },
          { text: "Almost constantly", points: 0 },
        ],
      },
    ],
    results: [
      {
        minScore: 10,
        maxScore: 12,
        title: "Low Stress & High Resilience",
        level: "Optimal",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        summary: "You demonstrate healthy autonomic balance and adaptive stress coping mechanisms.",
        recommendations: [
          "Continue daily mindfulness, joyful hobbies, and social connections.",
          "Maintain boundaries between work hours and personal recovery.",
        ],
        suggestedSlug: "stress-management-cortisol-wellness",
      },
      {
        minScore: 6,
        maxScore: 9,
        title: "Moderate Stress Load",
        level: "Moderate",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        summary: "You are managing, but elevated chronic cortisol can gradually lead to fatigue and immune suppression.",
        recommendations: [
          "Integrate 5 minutes of physiological sigh or box breathing into your workday.",
          "Take regular active micro-breaks away from screens.",
          "Prioritize daily physical movement like walking in nature.",
        ],
        suggestedSlug: "stress-management-cortisol-wellness",
      },
      {
        minScore: 0,
        maxScore: 5,
        title: "High Burnout & Overwhelm Risk",
        level: "Needs Attention",
        color: "text-rose-700",
        bg: "bg-rose-50 border-rose-200 text-rose-800",
        summary: "Your indicators reflect severe mental and physiological strain requiring intentional intervention.",
        recommendations: [
          "Speak with a licensed mental health professional or physician.",
          "Communicate with your support network or workplace to delegate pressing responsibilities.",
          "Incorporate restorative practices and check key clinical markers (thyroid, vitamin D, iron).",
        ],
        suggestedSlug: "stress-management-cortisol-wellness",
      },
    ],
  },
  {
    id: "cardio",
    title: "Cardiovascular Habit Scorecard",
    description: "Measure lifestyle behaviors linked to arterial elasticity, heart wellness, and longevity.",
    icon: Heart,
    category: "Cardiovascular",
    questions: [
      {
        question: "How many minutes of moderate-to-vigorous aerobic exercise (brisk walking, cycling, jogging) do you achieve weekly?",
        options: [
          { text: "150+ minutes (AHA Gold Standard)", points: 3 },
          { text: "75 to 149 minutes", points: 2 },
          { text: "30 to 74 minutes", points: 1 },
          { text: "Less than 30 minutes / Mostly sedentary", points: 0 },
        ],
      },
      {
        question: "How often do your meals feature whole foods (leafy greens, legumes, whole grains, nuts, and berries)?",
        options: [
          { text: "Daily with nearly every meal", points: 3 },
          { text: "Most days of the week", points: 2 },
          { text: "Occasionally (1-2 days/week)", points: 1 },
          { text: "Rarely; diet consists mainly of ultra-processed foods", points: 0 },
        ],
      },
      {
        question: "What is your tobacco / nicotine / vaping status?",
        options: [
          { text: "Non-smoker, no vaping or nicotine use", points: 3 },
          { text: "Former smoker (Quit >1 year ago)", points: 2 },
          { text: "Occasional or social smoking/vaping", points: 1 },
          { text: "Daily tobacco or nicotine user", points: 0 },
        ],
      },
      {
        question: "When was your blood pressure and fasting lipid panel last checked by a healthcare clinician?",
        options: [
          { text: "Within the past 12 months (Normal results)", points: 3 },
          { text: "1 to 2 years ago", points: 2 },
          { text: "Over 2 years ago", points: 1 },
          { text: "Never checked or unknown", points: 0 },
        ],
      },
    ],
    results: [
      {
        minScore: 10,
        maxScore: 12,
        title: "Robust Cardiovascular Protection",
        level: "Optimal",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        summary: "Your daily nutrition, movement, and avoidance of tobacco significantly minimize lifetime atherosclerosis risk.",
        recommendations: [
          "Continue periodic annual blood pressure and lipid panel screenings.",
          "Incorporate resistance training 2 days a week for metabolic health.",
        ],
        suggestedSlug: "hypertension-blood-pressure-guide",
      },
      {
        minScore: 6,
        maxScore: 9,
        title: "Moderate Heart Health Profile",
        level: "Moderate",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        summary: "You have positive foundational habits, but there are opportunities to strengthen cardiovascular resilience.",
        recommendations: [
          "Aim for at least 30 minutes of brisk walking 5 days a week.",
          "Embrace the Mediterranean or DASH dietary pattern.",
          "Check resting blood pressure at a pharmacy kiosk or home cuff.",
        ],
        suggestedSlug: "hypertension-blood-pressure-guide",
      },
      {
        minScore: 0,
        maxScore: 5,
        title: "Elevated Cardiovascular Risk Profile",
        level: "Needs Attention",
        color: "text-rose-700",
        bg: "bg-rose-50 border-rose-200 text-rose-800",
        summary: "Sedentary habits, processed foods, or lack of recent clinical screening increase long-term cardiometabolic risk.",
        recommendations: [
          "Schedule a comprehensive preventive checkup with a primary care physician.",
          "Begin with gentle, achievable movement: 10-minute post-meal walks.",
          "Consult a healthcare professional regarding smoking cessation resources.",
        ],
        suggestedSlug: "hypertension-blood-pressure-guide",
      },
    ],
  },
];

export default function QuizzesClientView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedQuizId, setSelectedQuizId] = useState<string>("sleep");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab && QUIZZES.some((q) => q.id === tab)) {
      setSelectedQuizId(tab);
      setCurrentStep(0);
      setAnswers([]);
      setIsCompleted(false);
    }
  }, [searchParams]);

  const activeQuiz = QUIZZES.find((q) => q.id === selectedQuizId) || QUIZZES[0];

  const handleSelectOption = (points: number) => {
    const updatedAnswers = [...answers, points];
    setAnswers(updatedAnswers);

    if (currentStep + 1 < activeQuiz.questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const handleChangeQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
    if (typeof window !== "undefined") {
      router.replace(`/quizzes?tab=${quizId}`, { scroll: false });
    }
  };

  // Calculate final score
  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
  const maxPossible = activeQuiz.questions.length * 3;
  const resultProfile = activeQuiz.results.find(
    (r) => totalScore >= r.minScore && totalScore <= r.maxScore
  ) || activeQuiz.results[0];

  return (
    <div className="min-h-screen bg-[#FDFDFC] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#113F48]/5 border border-[#113F48]/10 text-xs font-bold text-[#113F48]">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A15A]" /> Self-Assessment Screeners
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#113F48] tracking-tight">
            Interactive Health &amp; Wellness Quizzes
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Gain clarity on your sleep quality, stress levels, and cardiovascular habits through validated lifestyle questions.
          </p>
        </div>

        {/* Quiz Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {QUIZZES.map((quiz) => {
            const Icon = quiz.icon;
            const isSelected = activeQuiz.id === quiz.id;
            return (
              <button
                key={quiz.id}
                onClick={() => handleChangeQuiz(quiz.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#113F48] text-white border-[#113F48] shadow-md shadow-[#113F48]/10"
                    : "bg-white text-[#113F48] border-stone-200 hover:border-[#C9A15A] hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? "bg-white/10 text-[#C9A15A]" : "bg-stone-100 text-[#113F48]"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                    {quiz.category}
                  </span>
                </div>
                <span className="text-sm font-bold block">{quiz.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Quiz Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {!isCompleted ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Progress Header */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold border-b border-stone-100 pb-4">
                <span>Question {currentStep + 1} of {activeQuiz.questions.length}</span>
                <span className="text-[#C9A15A]">{Math.round(((currentStep) / activeQuiz.questions.length) * 100)}% Complete</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#113F48] to-[#C9A15A] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / activeQuiz.questions.length) * 100}%` }}
                />
              </div>

              {/* Current Question */}
              <div className="py-2 space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#113F48] leading-snug">
                  {activeQuiz.questions[currentStep].question}
                </h2>
                <p className="text-xs text-stone-400">Select the option that best reflects your recent routine:</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {activeQuiz.questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.points)}
                    className="w-full text-left p-4 rounded-2xl border border-stone-200/90 hover:border-[#C9A15A] hover:bg-[#C9A15A]/5 transition-all text-xs sm:text-sm font-semibold text-[#113F48] flex items-center justify-between group cursor-pointer shadow-xs"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-[#C9A15A] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Presentation */
            <div className="space-y-8 animate-in zoom-in-95 duration-200">
              
              <div className="text-center space-y-3 pb-6 border-b border-stone-100">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#113F48] text-[#C9A15A] mx-auto shadow-md">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Assessment Complete</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113F48] mt-1">
                    {resultProfile.title}
                  </h2>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${resultProfile.bg}`}>
                    Category: {resultProfile.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                    Score: {totalScore} / {maxPossible} pts
                  </span>
                </div>
              </div>

              {/* Result Summary */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {resultProfile.summary}
              </div>

              {/* Physician Recommendations */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#113F48] flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Evidence-Based Next Steps
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {resultProfile.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A] mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:text-[#113F48] hover:bg-stone-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" /> Retake Quiz
                </button>

                <Link
                  href="/blog"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#113F48] hover:bg-[#0D3037] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-[#C9A15A]" /> Explore Clinical Guides &rarr;
                </Link>
              </div>

            </div>
          )}

        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#C9A15A] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Medical Disclaimer:</strong> These lifestyle screening quizzes are designed exclusively for general educational insight. They are not clinical diagnostic tools and do not constitute formal psychiatric, neurological, or cardiological evaluation.
          </p>
        </div>

      </div>
    </div>
  );
}
