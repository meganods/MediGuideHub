"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Calculator, 
  Activity, 
  Droplets, 
  Heart, 
  Baby, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  RefreshCw,
  Info,
  Scale,
  ArrowRight
} from "lucide-react";

type ToolType = "bmi" | "tdee" | "water" | "bp" | "heart" | "pregnancy";

export default function ToolsClientView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTool, setActiveTool] = useState<ToolType>("bmi");

  useEffect(() => {
    const tab = searchParams?.get("tab") as ToolType | null;
    if (tab && ["bmi", "tdee", "water", "bp", "heart", "pregnancy"].includes(tab)) {
      setActiveTool(tab);
    }
  }, [searchParams]);

  const handleTabChange = (id: ToolType) => {
    setActiveTool(id);
    if (typeof window !== "undefined") {
      router.replace(`/tools?tab=${id}`, { scroll: false });
    }
  };

  // ──────────────────────────────────────────
  // 1. BMI STATE
  // ──────────────────────────────────────────
  const [bmiUnit, setBmiUnit] = useState<"metric" | "imperial">("metric");
  const [bmiHeightCm, setBmiHeightCm] = useState<number>(172);
  const [bmiHeightFt, setBmiHeightFt] = useState<number>(5);
  const [bmiHeightIn, setBmiHeightIn] = useState<number>(8);
  const [bmiWeightKg, setBmiWeightKg] = useState<number>(68);
  const [bmiWeightLbs, setBmiWeightLbs] = useState<number>(150);

  // ──────────────────────────────────────────
  // 2. TDEE & MACROS STATE
  // ──────────────────────────────────────────
  const [tdeeGender, setTdeeGender] = useState<"male" | "female">("male");
  const [tdeeAge, setTdeeAge] = useState<number>(30);
  const [tdeeWeightKg, setTdeeWeightKg] = useState<number>(70);
  const [tdeeHeightCm, setTdeeHeightCm] = useState<number>(175);
  const [tdeeActivity, setTdeeActivity] = useState<number>(1.375); // Light exercise
  const [tdeeGoal, setTdeeGoal] = useState<"lose" | "maintain" | "gain">("maintain");

  // ──────────────────────────────────────────
  // 3. WATER INTAKE STATE
  // ──────────────────────────────────────────
  const [waterWeightKg, setWaterWeightKg] = useState<number>(70);
  const [waterExerciseMins, setWaterExerciseMins] = useState<number>(30);
  const [waterClimate, setWaterClimate] = useState<"moderate" | "hot" | "cold">("moderate");

  // ──────────────────────────────────────────
  // 4. BLOOD PRESSURE STATE
  // ──────────────────────────────────────────
  const [bpSystolic, setBpSystolic] = useState<number>(118);
  const [bpDiastolic, setBpDiastolic] = useState<number>(78);

  // ──────────────────────────────────────────
  // 5. HEART RATE ZONES STATE
  // ──────────────────────────────────────────
  const [hrAge, setHrAge] = useState<number>(32);
  const [hrResting, setHrResting] = useState<number>(65);

  // ──────────────────────────────────────────
  // 6. PREGNANCY DUE DATE STATE
  // ──────────────────────────────────────────
  const todayIso = new Date().toISOString().split("T")[0];
  const defaultLmp = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const [lmpDate, setLmpDate] = useState<string>(defaultLmp);
  const [cycleDays, setCycleDays] = useState<number>(28);

  // ──────────────────────────────────────────
  // CALCULATIONS
  // ──────────────────────────────────────────

  // BMI Calculation
  const calculateBmi = () => {
    let heightM = 0;
    let weightKg = 0;

    if (bmiUnit === "metric") {
      heightM = bmiHeightCm / 100;
      weightKg = bmiWeightKg;
    } else {
      const totalInches = bmiHeightFt * 12 + bmiHeightIn;
      heightM = totalInches * 0.0254;
      weightKg = bmiWeightLbs * 0.453592;
    }

    if (heightM <= 0 || weightKg <= 0) return { bmi: 0, category: "Invalid", color: "text-stone-500", minHealthy: 0, maxHealthy: 0 };

    const bmi = +(weightKg / (heightM * heightM)).toFixed(1);
    const minHealthy = +(18.5 * heightM * heightM).toFixed(1);
    const maxHealthy = +(24.9 * heightM * heightM).toFixed(1);

    let category = "Normal weight";
    let color = "text-emerald-600";
    let bg = "bg-emerald-50 border-emerald-200 text-emerald-800";
    let advice = "Your weight is within the standard healthy clinical range for your height. Maintain a balanced diet and regular aerobic activity.";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-amber-600";
      bg = "bg-amber-50 border-amber-200 text-amber-800";
      advice = "You may benefit from nutrient-dense foods and strength training. Consult a healthcare provider to ensure nutritional adequacy.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "text-amber-600";
      bg = "bg-amber-50 border-amber-200 text-amber-800";
      advice = "A moderate caloric deficit, portion awareness, and 150 minutes of weekly aerobic exercise can support sustainable metabolic wellness.";
    } else if (bmi >= 30) {
      category = "Obesity Range";
      color = "text-rose-600";
      bg = "bg-rose-50 border-rose-200 text-rose-800";
      advice = "Discussing an individualized wellness and cardiovascular health plan with your primary care physician is recommended.";
    }

    return { bmi, category, color, bg, advice, minHealthy, maxHealthy };
  };

  // TDEE & Macro Calculation (Mifflin-St Jeor)
  const calculateTdee = () => {
    let bmr = 0;
    if (tdeeGender === "male") {
      bmr = 10 * tdeeWeightKg + 6.25 * tdeeHeightCm - 5 * tdeeAge + 5;
    } else {
      bmr = 10 * tdeeWeightKg + 6.25 * tdeeHeightCm - 5 * tdeeAge - 161;
    }

    const maintenance = Math.round(bmr * tdeeActivity);
    let targetCalories = maintenance;

    if (tdeeGoal === "lose") targetCalories = Math.max(1200, maintenance - 500);
    if (tdeeGoal === "gain") targetCalories = maintenance + 400;

    // Macro Split (30% Protein, 40% Carb, 30% Fat)
    const proteinGrams = Math.round((targetCalories * 0.30) / 4);
    const carbsGrams = Math.round((targetCalories * 0.40) / 4);
    const fatGrams = Math.round((targetCalories * 0.30) / 9);

    return { bmr: Math.round(bmr), maintenance, targetCalories, proteinGrams, carbsGrams, fatGrams };
  };

  // Water Intake Calculation
  const calculateWater = () => {
    // Base: 35ml per kg of body weight
    let baseMl = waterWeightKg * 35;
    // Exercise: add 350ml per 30 mins
    baseMl += (waterExerciseMins / 30) * 350;
    // Climate adjustment
    if (waterClimate === "hot") baseMl *= 1.15;
    if (waterClimate === "cold") baseMl *= 0.95;

    const liters = +(baseMl / 1000).toFixed(1);
    const glasses = Math.round(baseMl / 240); // 8oz (240ml) glasses
    return { liters, glasses };
  };

  // Blood Pressure Classification (AHA Guidelines)
  const checkBloodPressure = () => {
    if (bpSystolic >= 180 || bpDiastolic >= 120) {
      return {
        category: "Hypertensive Crisis",
        color: "text-rose-700",
        bg: "bg-rose-100 border-rose-300 text-rose-900",
        urgent: true,
        guidance: "Immediate medical evaluation is needed. If experiencing chest pain, shortness of breath, or vision changes, seek emergency care."
      };
    }
    if (bpSystolic >= 140 || bpDiastolic >= 90) {
      return {
        category: "Stage 2 Hypertension",
        color: "text-rose-600",
        bg: "bg-rose-50 border-rose-200 text-rose-800",
        urgent: false,
        guidance: "Cardiologists recommend lifestyle changes and clinical review for potential blood pressure management medication."
      };
    }
    if ((bpSystolic >= 130 && bpSystolic <= 139) || (bpDiastolic >= 80 && bpDiastolic <= 89)) {
      return {
        category: "Stage 1 Hypertension",
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        urgent: false,
        guidance: "Focus on dietary sodium reduction (DASH diet), potassium-rich foods, stress management, and regular exercise."
      };
    }
    if (bpSystolic >= 120 && bpSystolic <= 129 && bpDiastolic < 80) {
      return {
        category: "Elevated Blood Pressure",
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        urgent: false,
        guidance: "Proactive lifestyle modifications can prevent progression to hypertension."
      };
    }
    if (bpSystolic < 120 && bpDiastolic < 80) {
      return {
        category: "Normal Blood Pressure",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        urgent: false,
        guidance: "Your blood pressure is within the optimal American Heart Association range. Keep up heart-healthy habits!"
      };
    }
    return {
      category: "Assessment Incomplete",
      color: "text-stone-600",
      bg: "bg-stone-50 border-stone-200 text-stone-700",
      urgent: false,
      guidance: "Please enter standard systolic and diastolic readings."
    };
  };

  // Target Heart Rate Zones (Karvonen)
  const calculateHeartRate = () => {
    const maxHr = 220 - hrAge;
    const hrr = Math.max(20, maxHr - hrResting);

    const zones = [
      { name: "Zone 1: Active Recovery", range: `${Math.round(hrResting + hrr * 0.50)} - ${Math.round(hrResting + hrr * 0.60)} bpm`, desc: "Easy pace, promotes blood flow & recovery", color: "border-blue-400 bg-blue-50/50" },
      { name: "Zone 2: Fat Burning / Endurance", range: `${Math.round(hrResting + hrr * 0.60)} - ${Math.round(hrResting + hrr * 0.70)} bpm`, desc: "Aerobic base building, maximizes fat oxidation", color: "border-emerald-400 bg-emerald-50/50" },
      { name: "Zone 3: Aerobic Capacity", range: `${Math.round(hrResting + hrr * 0.70)} - ${Math.round(hrResting + hrr * 0.80)} bpm`, desc: "Improves cardiovascular efficiency & stamina", color: "border-teal-400 bg-teal-50/50" },
      { name: "Zone 4: Anaerobic / Threshold", range: `${Math.round(hrResting + hrr * 0.80)} - ${Math.round(hrResting + hrr * 0.90)} bpm`, desc: "High-intensity intervals, builds speed & lactate tolerance", color: "border-amber-400 bg-amber-50/50" },
      { name: "Zone 5: Maximum Performance", range: `${Math.round(hrResting + hrr * 0.90)} - ${maxHr} bpm`, desc: "Sprint peak output, sustainable for short bursts", color: "border-rose-400 bg-rose-50/50" },
    ];

    return { maxHr, zones };
  };

  // Pregnancy Due Date (Naegele's Rule)
  const calculatePregnancy = () => {
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) return null;

    // Naegele's rule: LMP + 280 days + (cycleDays - 28)
    const adjustmentDays = cycleDays - 28;
    const dueDate = new Date(lmp.getTime() + (280 + adjustmentDays) * 24 * 60 * 60 * 1000);
    const conceptionEstimate = new Date(lmp.getTime() + (14 + adjustmentDays) * 24 * 60 * 60 * 1000);

    const today = new Date();
    const diffMs = today.getTime() - lmp.getTime();
    const daysElapsed = Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));
    const currentWeek = Math.floor(daysElapsed / 7);
    const currentDay = daysElapsed % 7;

    let trimester = "First Trimester (Weeks 1-12)";
    if (currentWeek >= 13 && currentWeek <= 26) trimester = "Second Trimester (Weeks 13-26)";
    if (currentWeek >= 27) trimester = "Third Trimester (Weeks 27-40+)";

    return {
      dueDate: dueDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      conceptionDate: conceptionEstimate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      currentWeek,
      currentDay,
      trimester,
    };
  };

  const bmiData = calculateBmi();
  const tdeeData = calculateTdee();
  const waterData = calculateWater();
  const bpData = checkBloodPressure();
  const hrData = calculateHeartRate();
  const pregData = calculatePregnancy();

  const toolTabs: { id: ToolType; label: string; icon: any; badge?: string }[] = [
    { id: "bmi", label: "BMI & Ideal Weight", icon: Scale, badge: "Popular" },
    { id: "tdee", label: "Calorie & Macros (TDEE)", icon: Flame },
    { id: "water", label: "Daily Hydration", icon: Droplets },
    { id: "bp", label: "Blood Pressure Checker", icon: Activity, badge: "Clinical" },
    { id: "heart", label: "Target Heart Rate", icon: Heart },
    { id: "pregnancy", label: "Pregnancy Due Date", icon: Baby },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#113F48]/5 border border-[#113F48]/10 text-xs font-bold text-[#113F48]">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A15A]" /> Evidence-Based Clinical Tools
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#113F48] tracking-tight">
            Interactive Health &amp; Wellness Calculators
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Free, medically referenced calculation tools to help you understand your metrics, nutrition needs, and cardiovascular benchmarks.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pb-2 mb-8 max-w-5xl mx-auto px-2">
          {toolTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTool === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#113F48] text-white border-[#113F48] shadow-md shadow-[#113F48]/15 scale-[1.02]"
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#C9A15A] hover:text-[#113F48] hover:bg-stone-50/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-[#C9A15A]" : "text-stone-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[#C9A15A] text-white" : "bg-[#113F48]/10 text-[#113F48]"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tool Content Container */}
        <div id="tool-content-box" className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm transition-all">
          
          {/* ────────────────────────────────────────── */}
          {/* 1. BMI CALCULATOR */}
          {/* ────────────────────────────────────────── */}
          {activeTool === "bmi" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#113F48] flex items-center gap-2">
                    <Scale className="h-6 w-6 text-[#C9A15A]" /> Body Mass Index (BMI) &amp; Healthy Weight
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Calculated in accordance with World Health Organization (WHO) and CDC weight classification criteria.
                  </p>
                </div>
                {/* Unit Switcher */}
                <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200/60 self-start sm:self-auto">
                  <button
                    onClick={() => setBmiUnit("metric")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      bmiUnit === "metric" ? "bg-white text-[#113F48] shadow-xs" : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Metric (cm / kg)
                  </button>
                  <button
                    onClick={() => setBmiUnit("imperial")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      bmiUnit === "imperial" ? "bg-white text-[#113F48] shadow-xs" : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Imperial (ft / lbs)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Inputs */}
                <div className="lg:col-span-6 space-y-6">
                  {bmiUnit === "metric" ? (
                    <>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                          <span>Height</span>
                          <span className="text-[#113F48] font-mono">{bmiHeightCm} cm</span>
                        </div>
                        <input
                          type="range"
                          min={120}
                          max={220}
                          value={bmiHeightCm}
                          onChange={(e) => setBmiHeightCm(Number(e.target.value))}
                          className="w-full accent-[#113F48] cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                          <span>Weight</span>
                          <span className="text-[#113F48] font-mono">{bmiWeightKg} kg</span>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={180}
                          value={bmiWeightKg}
                          onChange={(e) => setBmiWeightKg(Number(e.target.value))}
                          className="w-full accent-[#113F48] cursor-pointer"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-2">Feet</label>
                          <input
                            type="number"
                            min={3}
                            max={7}
                            value={bmiHeightFt}
                            onChange={(e) => setBmiHeightFt(Number(e.target.value))}
                            className="w-full p-3 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] focus:border-[#C9A15A] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-2">Inches</label>
                          <input
                            type="number"
                            min={0}
                            max={11}
                            value={bmiHeightIn}
                            onChange={(e) => setBmiHeightIn(Number(e.target.value))}
                            className="w-full p-3 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] focus:border-[#C9A15A] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                          <span>Weight</span>
                          <span className="text-[#113F48] font-mono">{bmiWeightLbs} lbs</span>
                        </div>
                        <input
                          type="range"
                          min={70}
                          max={400}
                          value={bmiWeightLbs}
                          onChange={(e) => setBmiWeightLbs(Number(e.target.value))}
                          className="w-full accent-[#113F48] cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {/* Healthy Weight Guide */}
                  <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-stone-200/80 text-xs space-y-1.5">
                    <span className="font-bold text-[#113F48] block">Estimated Healthy Target Range</span>
                    <p className="text-stone-600 leading-relaxed">
                      For your height, a normal clinical BMI corresponds to approximately{" "}
                      <strong className="text-[#113F48]">{bmiData.minHealthy} kg – {bmiData.maxHealthy} kg</strong> (or{" "}
                      <strong className="text-[#113F48]">{Math.round(bmiData.minHealthy * 2.20462)} lbs – {Math.round(bmiData.maxHealthy * 2.20462)} lbs</strong>).
                    </p>
                  </div>
                </div>

                {/* Right: Results Card */}
                <div className="lg:col-span-6 bg-gradient-to-br from-[#113F48]/5 via-[#C9A15A]/5 to-transparent border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Your Calculated Score</span>
                    <div className="flex items-baseline gap-3 mt-2">
                      <span className="text-5xl sm:text-6xl font-black text-[#113F48] tracking-tight">
                        {bmiData.bmi}
                      </span>
                      <span className={`text-sm sm:text-base font-bold px-3 py-1 rounded-full border ${bmiData.bg}`}>
                        {bmiData.category}
                      </span>
                    </div>

                    {/* Visual Meter */}
                    <div className="mt-6 space-y-2">
                      <div className="h-3 w-full rounded-full bg-stone-200 overflow-hidden flex">
                        <div className="bg-amber-400 w-[18.5%]" title="Underweight (<18.5)" />
                        <div className="bg-emerald-500 w-[30%]" title="Normal (18.5-24.9)" />
                        <div className="bg-amber-500 w-[20%]" title="Overweight (25-29.9)" />
                        <div className="bg-rose-500 w-[31.5%]" title="Obese (30+)" />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-stone-400">
                        <span>15</span>
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                        <span>40+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-stone-200/80 text-xs">
                    <span className="font-bold text-[#113F48] flex items-center gap-1.5">
                      <Info className="h-4 w-4 text-[#C9A15A]" /> Physician Guidance:
                    </span>
                    <p className="text-stone-600 leading-relaxed">
                      {bmiData.advice}
                    </p>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 text-[#C9A15A] hover:text-[#113F48] font-bold transition-colors pt-1"
                    >
                      Read our Nutrition &amp; Metabolism Guides <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────── */}
          {/* 2. TDEE & MACRO CALCULATOR */}
          {/* ────────────────────────────────────────── */}
          {activeTool === "tdee" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-bold text-[#113F48] flex items-center gap-2">
                  <Flame className="h-6 w-6 text-[#C9A15A]" /> Total Daily Energy Expenditure (TDEE) &amp; Macros
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Mifflin-St Jeor clinical equation estimating basal metabolic rate, daily caloric burn, and balanced macronutrient distribution.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-5">
                  {/* Gender */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTdeeGender("male")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        tdeeGender === "male"
                          ? "bg-[#113F48] text-white border-[#113F48]"
                          : "bg-white text-stone-600 border-stone-200"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setTdeeGender("female")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        tdeeGender === "female"
                          ? "bg-[#113F48] text-white border-[#113F48]"
                          : "bg-white text-stone-600 border-stone-200"
                      }`}
                    >
                      Female
                    </button>
                  </div>

                  {/* Age / Weight / Height */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Age (yrs)</label>
                      <input
                        type="number"
                        min={15}
                        max={100}
                        value={tdeeAge}
                        onChange={(e) => setTdeeAge(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        min={30}
                        max={200}
                        value={tdeeWeightKg}
                        onChange={(e) => setTdeeWeightKg(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Height (cm)</label>
                      <input
                        type="number"
                        min={120}
                        max={220}
                        value={tdeeHeightCm}
                        onChange={(e) => setTdeeHeightCm(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                      />
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">Activity Level</label>
                    <select
                      value={tdeeActivity}
                      onChange={(e) => setTdeeActivity(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs font-semibold text-[#113F48] bg-white outline-none cursor-pointer"
                    >
                      <option value={1.2}>Sedentary (Little or no exercise, desk job)</option>
                      <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
                      <option value={1.55}>Moderately Active (Moderate exercise 3-5 days/week)</option>
                      <option value={1.725}>Very Active (Hard exercise 6-7 days/week)</option>
                      <option value={1.9}>Extra Active (Intense training / physical job)</option>
                    </select>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">Your Primary Health Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "lose", label: "Fat Loss (-500 kcal)" },
                        { id: "maintain", label: "Maintain Weight" },
                        { id: "gain", label: "Lean Gain (+400 kcal)" },
                      ].map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setTdeeGoal(g.id as any)}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                            tdeeGoal === g.id
                              ? "bg-[#C9A15A] text-white border-[#C9A15A] shadow-xs"
                              : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Card */}
                <div className="lg:col-span-6 bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Daily Target Energy</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl font-black text-[#113F48] tracking-tight">
                        {tdeeData.targetCalories.toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-stone-500">kcal / day</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Basal Metabolic Rate (BMR): <strong>{tdeeData.bmr} kcal</strong> • Maintenance: <strong>{tdeeData.maintenance} kcal</strong>
                    </p>
                  </div>

                  {/* Macronutrient Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-stone-200">
                    <span className="text-xs font-bold text-[#113F48] block">Optimal Daily Macronutrient Split:</span>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">Protein (30%)</span>
                        <span className="text-lg font-extrabold text-[#113F48]">{tdeeData.proteinGrams}g</span>
                        <span className="text-[10px] text-stone-400 block">{tdeeData.proteinGrams * 4} kcal</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Carbs (40%)</span>
                        <span className="text-lg font-extrabold text-[#113F48]">{tdeeData.carbsGrams}g</span>
                        <span className="text-[10px] text-stone-400 block">{tdeeData.carbsGrams * 4} kcal</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">Fats (30%)</span>
                        <span className="text-lg font-extrabold text-[#113F48]">{tdeeData.fatGrams}g</span>
                        <span className="text-[10px] text-stone-400 block">{tdeeData.fatGrams * 9} kcal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────── */}
          {/* 3. DAILY HYDRATION CALCULATOR */}
          {/* ────────────────────────────────────────── */}
          {activeTool === "water" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-bold text-[#113F48] flex items-center gap-2">
                  <Droplets className="h-6 w-6 text-[#C9A15A]" /> Daily Hydration &amp; Water Intake Calculator
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Calculates optimal fluid hydration based on body mass, daily physical exertion, and environmental climate.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                      <span>Body Weight</span>
                      <span className="text-[#113F48] font-mono">{waterWeightKg} kg ({Math.round(waterWeightKg * 2.20462)} lbs)</span>
                    </div>
                    <input
                      type="range"
                      min={35}
                      max={150}
                      value={waterWeightKg}
                      onChange={(e) => setWaterWeightKg(Number(e.target.value))}
                      className="w-full accent-[#113F48] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                      <span>Daily Exercise / High Activity</span>
                      <span className="text-[#113F48] font-mono">{waterExerciseMins} minutes</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={180}
                      step={15}
                      value={waterExerciseMins}
                      onChange={(e) => setWaterExerciseMins(Number(e.target.value))}
                      className="w-full accent-[#113F48] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">Climate Environment</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "cold", label: "Cold / Temperate" },
                        { id: "moderate", label: "Moderate Room Temp" },
                        { id: "hot", label: "Hot / Humid" },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setWaterClimate(c.id as any)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            waterClimate === c.id
                              ? "bg-[#113F48] text-white border-[#113F48]"
                              : "bg-white text-stone-600 border-stone-200"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="lg:col-span-6 bg-gradient-to-br from-blue-500/5 via-[#113F48]/5 to-transparent border border-blue-200/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Recommended Daily Fluid Intake</span>
                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="text-5xl font-black text-[#113F48] tracking-tight">
                        {waterData.liters}
                      </span>
                      <span className="text-xl font-bold text-stone-600">Liters / day</span>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 bg-blue-100/80 text-blue-950 font-bold text-xs px-3 py-1.5 rounded-xl">
                      <Droplets className="h-4 w-4 text-blue-600" /> ~ {waterData.glasses} Standard Glasses (8 oz / 240 ml)
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-1.5">
                    <span className="font-bold text-[#113F48]">Clinical Hydration Tip</span>
                    <p className="text-stone-600 leading-relaxed">
                      Sip fluids steadily throughout waking hours rather than chugging in single sittings. Electrolytes (sodium, potassium) are essential when exercising for over 60 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────── */}
          {/* 4. BLOOD PRESSURE CHECKER */}
          {/* ────────────────────────────────────────── */}
          {activeTool === "bp" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-bold text-[#113F48] flex items-center gap-2">
                  <Activity className="h-6 w-6 text-[#C9A15A]" /> Blood Pressure Category &amp; Risk Checker
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Categorized per American Heart Association (AHA) and American College of Cardiology clinical guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                      <span>Systolic (Upper Number - mmHg)</span>
                      <span className="text-[#113F48] font-mono text-base">{bpSystolic} mmHg</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={220}
                      value={bpSystolic}
                      onChange={(e) => setBpSystolic(Number(e.target.value))}
                      className="w-full accent-[#113F48] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                      <span>Diastolic (Lower Number - mmHg)</span>
                      <span className="text-[#113F48] font-mono text-base">{bpDiastolic} mmHg</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={140}
                      value={bpDiastolic}
                      onChange={(e) => setBpDiastolic(Number(e.target.value))}
                      className="w-full accent-[#113F48] cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs space-y-2">
                    <span className="font-bold text-[#113F48]">AHA Reference Guidelines</span>
                    <ul className="space-y-1 text-stone-600 text-[11px]">
                      <li>• <strong>Normal:</strong> Less than 120/80 mmHg</li>
                      <li>• <strong>Elevated:</strong> Systolic 120–129 and Diastolic &lt;80</li>
                      <li>• <strong>Stage 1 HTN:</strong> Systolic 130–139 or Diastolic 80–89</li>
                      <li>• <strong>Stage 2 HTN:</strong> Systolic 140+ or Diastolic 90+</li>
                      <li>• <strong>Crisis:</strong> Systolic &gt;180 and/or Diastolic &gt;120</li>
                    </ul>
                  </div>
                </div>

                {/* Result Card */}
                <div className="lg:col-span-6 border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FDFDFC]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Clinical Classification</span>
                    <div className="mt-3">
                      <span className={`inline-block text-lg sm:text-xl font-extrabold px-4 py-2 rounded-xl border ${bpData.bg}`}>
                        {bpData.category}
                      </span>
                    </div>
                    <div className="mt-4 text-3xl sm:text-4xl font-black text-[#113F48] tracking-tight font-mono">
                      {bpSystolic} / {bpDiastolic} <span className="text-sm font-normal text-stone-500">mmHg</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-stone-200 text-xs">
                    <span className="font-bold text-[#113F48] flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#C9A15A]" /> Recommendation:
                    </span>
                    <p className="text-stone-600 leading-relaxed">
                      {bpData.guidance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────── */}
          {/* 5. TARGET HEART RATE & ZONES */}
          {/* ────────────────────────────────────────── */}
          {activeTool === "heart" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-bold text-[#113F48] flex items-center gap-2">
                  <Heart className="h-6 w-6 text-[#C9A15A]" /> Target Heart Rate &amp; Cardio Training Zones
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Karvonen Heart Rate Reserve formula calculates personalized cardiovascular conditioning and fat burn ranges.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Age (Years)</label>
                    <input
                      type="number"
                      min={10}
                      max={95}
                      value={hrAge}
                      onChange={(e) => setHrAge(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Resting Heart Rate (bpm)</label>
                    <input
                      type="number"
                      min={40}
                      max={110}
                      value={hrResting}
                      onChange={(e) => setHrResting(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">Best measured immediately after waking up.</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#113F48] text-white space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#C9A15A]">Estimated Max Heart Rate</span>
                    <div className="text-3xl font-extrabold">{hrData.maxHr} bpm</div>
                  </div>
                </div>

                {/* Training Zones Breakdown */}
                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs font-bold text-[#113F48] block">Your 5 Aerobic &amp; Anaerobic Zones:</span>
                  <div className="space-y-2.5">
                    {hrData.zones.map((zone, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border ${zone.color} flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                      >
                        <div>
                          <span className="font-bold text-xs text-[#113F48] block">{zone.name}</span>
                          <span className="text-[11px] text-stone-500">{zone.desc}</span>
                        </div>
                        <span className="font-mono font-black text-sm text-[#113F48] whitespace-nowrap">
                          {zone.range}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────── */}
          {/* 6. PREGNANCY DUE DATE */}
          {/* ────────────────────────────────────────── */}
          {activeTool === "pregnancy" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-bold text-[#113F48] flex items-center gap-2">
                  <Baby className="h-6 w-6 text-[#C9A15A]" /> Pregnancy Due Date &amp; Milestone Calculator
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Naegele's rule calculation using the first day of your last menstrual period (LMP) and cycle duration.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">First Day of Last Menstrual Period (LMP)</label>
                    <input
                      type="date"
                      value={lmpDate}
                      onChange={(e) => setLmpDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Average Menstrual Cycle Length (Days)</label>
                    <input
                      type="number"
                      min={21}
                      max={45}
                      value={cycleDays}
                      onChange={(e) => setCycleDays(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-stone-200 text-sm font-bold text-[#113F48] outline-none"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">Default is 28 days.</span>
                  </div>
                </div>

                {/* Result */}
                {pregData && (
                  <div className="lg:col-span-7 bg-gradient-to-br from-[#C9A15A]/10 via-[#113F48]/5 to-transparent border border-[#C9A15A]/30 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#113F48]">Estimated Estimated Delivery Date (EDD)</span>
                      <div className="text-3xl sm:text-4xl font-black text-[#113F48] tracking-tight mt-2">
                        {pregData.dueDate}
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Estimated Conception Date: <strong>{pregData.conceptionDate}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200">
                      <div className="p-3 bg-white rounded-xl border border-stone-200">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block">Gestational Age</span>
                        <span className="text-lg font-extrabold text-[#113F48]">{pregData.currentWeek} Weeks, {pregData.currentDay} Days</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-stone-200">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block">Current Milestone</span>
                        <span className="text-xs font-extrabold text-[#C9A15A] block mt-1">{pregData.trimester}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Global Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#C9A15A] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Medical Disclaimer:</strong> These calculators are designed strictly for health literacy and educational purposes. Formulas provide statistical approximations and should not substitute clinical medical assessments, diagnosis, or personalized treatment plans by licensed physicians.
          </p>
        </div>

      </div>
    </div>
  );
}
