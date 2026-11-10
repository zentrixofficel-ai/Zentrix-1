import React from "react";
import { NavTab, SubjectId, SubjectInfo } from "../types";
import { SUBJECTS, SYLLABUS_MAP } from "../data/madhyamikData";
import {
  Calendar,
  Flame,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
  Brain,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Target,
  Zap,
  BookMarked,
  Atom,
  Dna,
  Calculator,
  Scroll,
  Globe,
  Languages,
  Download,
  Smartphone,
  ExternalLink,
  X,
} from "lucide-react";

interface DashboardProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  onSelectTab: (tab: NavTab) => void;
  quizScore: { correct: number; total: number };
  streakDays: number;
  dailyGoal: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentSubject,
  onSelectSubject,
  onSelectTab,
  quizScore,
  streakDays,
  dailyGoal = 15,
}) => {
  const [showDownloadModal, setShowDownloadModal] = React.useState<boolean>(false);
  // Approximate days left for Madhyamik exam (mid-February)
  const today = new Date();
  const examYear = today.getMonth() > 2 ? today.getFullYear() + 1 : today.getFullYear();
  const examDate = new Date(examYear, 1, 10);
  const diffTime = examDate.getTime() - today.getTime();
  const daysLeft = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Retrieve completed chapters from localStorage
  let completedChapters: Record<string, boolean> = {};
  try {
    const saved = localStorage.getItem("wbbse_completed_chapters");
    if (saved) completedChapters = JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }

  // Active current subject info
  const activeSubInfo = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];

  // Subject icon resolver
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case "Languages":
        return <Languages className="w-5 h-5 text-blue-600" />;
      case "Calculator":
        return <Calculator className="w-5 h-5 text-amber-600" />;
      case "Atom":
        return <Atom className="w-5 h-5 text-sky-600" />;
      case "Dna":
        return <Dna className="w-5 h-5 text-emerald-600" />;
      case "Scroll":
        return <Scroll className="w-5 h-5 text-rose-600" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-teal-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  // Stats calculation
  const accuracy = quizScore.total > 0 ? Math.round((quizScore.correct / quizScore.total) * 100) : 0;
  const goalProgress = Math.min(100, Math.round((quizScore.total / dailyGoal) * 100));

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#142B52] via-[#1E3A6C] to-[#2752CA] text-white p-6 md:p-8 shadow-md">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/15">
              <span className="font-mono bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">Zx</span>
              <span>zentix WB • পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE)</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug">
              নমস্কার, zentix WB-তে স্বাগত! 🌟
            </h1>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
              আজকের মাধ্যমিক প্রস্তুতিতে সম্পূর্ণ মনোযোগ দাও। সাতটি বিষয়ের অধ্যায়ভিত্তিক প্রশ্ন অনুশীলন, 
              AI মাস্টারমশাইয়ের সাহায্যে সন্দেহ মোচন এবং নিয়মিত রিভিশন তোমার কাঙ্ক্ষিত ফল নিশ্চিত করবে।
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab("quiz")}
                className="px-5 py-2.5 bg-[#18A889] hover:bg-[#12836B] text-white font-bold rounded-xl text-xs md:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                অনুশীলন শুরু করুন
              </button>

              <button
                onClick={() => onSelectTab("tutor")}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs md:text-sm backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-emerald-300" />
                মাস্টারমশাইকে প্রশ্ন করো
              </button>

              <button
                onClick={() => setShowDownloadModal(true)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs md:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>অ্যাপ ডাউনলোড (APK)</span>
              </button>
            </div>
          </div>

          {/* Exam Countdown Card */}
          <div className="bg-[#0D1C36]/80 backdrop-blur-md p-5 rounded-2xl border border-white/15 min-w-[240px] text-center space-y-3 self-start lg:self-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>মাধ্যমিক পরীক্ষা বাকি</span>
            </div>

            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl md:text-5xl font-black font-mono text-white tracking-tight">
                {daysLeft}
              </span>
              <span className="text-sm font-semibold text-slate-300">দিন</span>
            </div>

            <div className="text-[11px] text-emerald-300 font-medium bg-emerald-500/15 py-1 px-2.5 rounded-lg border border-emerald-400/20">
              ✓ প্রতিদিন ধারাবাহিক রিভিশনই সাফল্যের চাবিকাঠি
            </div>
          </div>
        </div>

        {/* Ambient subtle glow background elements */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#3867E8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#18A889]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Student Study Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {/* Total Questions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>প্রশ্ন সমাধান</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3867E8] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-extrabold text-[#142B52] font-mono">
              {quizScore.total}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">সর্বমোট অনুশীলনকৃত</div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>নির্ভুলতা (Accuracy)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#18A889] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-extrabold text-[#18A889] font-mono">
              {accuracy}%
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">{quizScore.correct} টি সঠিক উত্তর</div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>স্টাডি স্ট্রিক</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-extrabold text-amber-600 font-mono">
              {streakDays} দিন
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">ধারাবাহিক অধ্যয়ন</div>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>দৈনিক লক্ষ্য (Goal)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl md:text-3xl font-extrabold text-[#142B52] font-mono">
                {quizScore.total}/{dailyGoal}
              </span>
              <span className="text-xs font-bold text-[#18A889] font-mono">{goalProgress}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#18A889] rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3867E8] to-[#142B52] flex items-center justify-center text-white shrink-0 shadow-sm">
            {getSubjectIcon(activeSubInfo.iconName)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                চলমান অধ্যয়ন
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeSubInfo.nameBn} ({activeSubInfo.nameEn})
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              {activeSubInfo.nameBn} বিষয়ে কুইজ ও গুরুত্বপূর্ণ প্রশ্নোত্তর চর্চা
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {activeSubInfo.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab("quiz")}
            className="px-5 py-2.5 bg-[#3867E8] hover:bg-[#2752CA] text-white font-bold rounded-xl text-xs md:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>অনুশীলন চালিয়ে যান</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Seven Subject Cards Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#142B52] tracking-tight">
              মাধ্যমিকের সাতটি বিষয় (WBBSE Subjects)
            </h2>
            <p className="text-xs text-slate-500">
              প্রতিটি বিষয়ের জন্য আলাদা সিলেবাস ট্র্যাকার, গুরুত্বপূর্ণ প্রশ্নোত্তর ও টেস্ট পেপার সমাধান।
            </p>
          </div>

          <button
            onClick={() => onSelectTab("syllabus")}
            className="text-xs font-bold text-[#3867E8] hover:underline flex items-center gap-1"
          >
            <span>পূর্ণাঙ্গ সিলেবাস দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SUBJECTS.map((sub) => {
            const chapList = SYLLABUS_MAP[sub.id] || [];
            const completedCount = chapList.filter((c) => completedChapters[c.id]).length;
            const progress = chapList.length > 0 ? Math.round((completedCount / chapList.length) * 100) : 0;
            const isSelected = sub.id === currentSubject;

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`group bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                  isSelected
                    ? "border-[#3867E8] ring-2 ring-[#3867E8]/15"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {getSubjectIcon(sub.iconName)}
                    </div>

                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                      {chapList.length} অধ্যায়
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#142B52] group-hover:text-[#3867E8] transition-colors">
                      {sub.nameBn}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {sub.nameEn}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  {/* Progress info */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                      <span>সিলেবাস শেষ</span>
                      <span className="font-mono text-[#18A889] font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#18A889] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Continue practice button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSubject(sub.id);
                      onSelectTab("quiz");
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#3867E8] text-white hover:bg-[#2752CA] shadow-xs"
                        : "bg-slate-50 text-slate-700 hover:bg-[#3867E8] hover:text-white"
                    }`}
                  >
                    <span>অনুশীলন করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Cards (Notion/Linear style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AI Tutor Card */}
        <div
          onClick={() => onSelectTab("tutor")}
          className="bg-gradient-to-br from-indigo-50/60 to-blue-50/60 p-6 rounded-3xl border border-indigo-100 hover:border-indigo-300 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white border border-indigo-200 text-[#3867E8] flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B52]">
              AI ডিজিটাল মাস্টারমশাই
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              যেকোনো অঙ্কের সমাধান, বিজ্ঞানের সূত্রের কারণ বা ইতিহাসের ঘটনা সহজে বুঝে নাও।
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#3867E8]">
            <span>প্রশ্ন জিজ্ঞাসা করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Memory Hub Card */}
        <div
          onClick={() => onSelectTab("memory")}
          className="bg-gradient-to-br from-purple-50/60 to-pink-50/60 p-6 rounded-3xl border border-purple-100 hover:border-purple-300 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B52]">
              স্মরণিকা ও ছন্দবদ্ধ ট্রিকস
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ধাতুর সক্রিয়তা শ্রেণি, মাইটোসিস ধাপ ও ইতিহাসের সন-তারিখ মনে রাখার কৌশল।
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-600">
            <span>ট্রিকস ও ফ্ল্যাশকার্ড দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Formula Book Card */}
        <div
          onClick={() => onSelectTab("formula_book")}
          className="bg-gradient-to-br from-teal-50/60 to-emerald-50/60 p-6 rounded-3xl border border-teal-100 hover:border-teal-300 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white border border-teal-200 text-[#18A889] flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#142B52]">
              ফর্মুলা বুক ও শর্টনোটস
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              গণিত, ভৌতবিজ্ঞান ও ইতিহাসের প্রয়োজনীয় সকল সূত্র ও সংজ্ঞা এক ক্লিকে।
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#18A889]">
            <span>ফর্মুলা শিট খুলুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Download & Installation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3867E8] to-[#18A889] flex items-center justify-center text-white font-mono font-black text-xl shadow-md">
                Zx
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#142B52]">
                  zentix WB অ্যাপ ডাউনলোড ও ইনস্টল
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  com.zentixwb.com • Android & Web
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option 1: Direct APK Download */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#142B52] flex items-center gap-1.5 text-sm">
                    <Download className="w-4 h-4 text-[#3867E8]" />
                    ১. Android APK সরাসরি ডাউনলোড
                  </span>
                  <span className="bg-[#18A889] text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                    app-debug.apk
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  GitHub Releases থেকে সরাসরি APK ডাউনলোড করে ফোনে ইনস্টল করুন:
                </p>
                <a
                  href="https://github.com/zentrixofficel-ai/Zentrix-1/releases/latest/download/app-debug.apk"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-[#3867E8] hover:bg-[#2752CA] text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download app-debug.apk (Direct Link)</span>
                </a>
                <p className="text-[11px] text-slate-500 italic">
                  * ডাউনলোড শেষে ফাইলের ওপর চাপ দিয়ে "Install" বা "Allow from this source" চাপুন।
                </p>
              </div>

              {/* Option 2: 1-Click PWA Install */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-[#142B52] flex items-center gap-1.5 text-sm">
                  <Smartphone className="w-4 h-4 text-[#18A889]" />
                  ২. কোনো APK ছাড়া হোমস্ক্রিনে ১-ক্লিকে ইনস্টল
                </span>
                <p className="text-slate-600 leading-relaxed">
                  মোবাইল Chrome ব্রাউজারে উপরে ডানদিকের ৩-ডট মেনু (⋮) তে চাপুন এবং <strong>"Add to Home screen"</strong> বা <strong>"Install App"</strong> চাপুন। তৎক্ষণাৎ এটি ফোনের অ্যাপ হিসেবে ইনস্টল হয়ে যাবে।
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
