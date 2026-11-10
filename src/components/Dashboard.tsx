import React, { useState } from "react";
import { NavTab, SubjectId, HistoryItem, UserAuthProfile } from "../types";
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
  History,
  FileText,
  Mic,
  Play,
} from "lucide-react";

interface DashboardProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  onSelectTab: (tab: NavTab) => void;
  quizScore: { correct: number; total: number };
  streakDays: number;
  dailyGoal: number;
  recentHistory?: HistoryItem[];
  userProfile: UserAuthProfile;
  onOpenVoiceAssistant: () => void;
  onOpenProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentSubject,
  onSelectSubject,
  onSelectTab,
  quizScore,
  streakDays,
  dailyGoal = 15,
  recentHistory = [],
  userProfile,
  onOpenVoiceAssistant,
  onOpenProfile,
}) => {
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);

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
        return <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case "Languages":
        return <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "Calculator":
        return <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "Atom":
        return <Atom className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case "Dna":
        return <Dna className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "Scroll":
        return <Scroll className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
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
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/15">
                <span className="font-mono bg-white/20 text-white px-1.5 py-0.2 rounded text-[10px] font-bold">
                  Zx
                </span>
                <span>ZENTIX WB • WBBSE দশম শ্রেণি</span>
              </div>

              <div
                onClick={onOpenProfile}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 cursor-pointer backdrop-blur-md text-xs font-bold text-white transition-colors"
              >
                <span>{userProfile.avatarEmoji}</span>
                <span>{userProfile.displayName}</span>
                <span className="text-emerald-300 text-[10px]">({userProfile.targetYear})</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
              নমস্কার {userProfile.displayName}, ZENTIX WB-তে স্বাগত! 🌟
            </h1>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
              আজকের মাধ্যমিক প্রস্তুতি শুরু করো। সাতটি বিষয়ের অধ্যায়ভিত্তিক প্রশ্ন, AI মাস্টারমশাই ও ভয়েস অ্যাসিস্ট্যান্ট তোমার সাথে আছে।
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab("quiz")}
                className="px-5 py-2.5 bg-[#18A889] hover:bg-[#12836B] text-white font-bold rounded-xl text-xs md:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>দৈনিক কুইজ শুরু করুন</span>
              </button>

              <button
                onClick={onOpenVoiceAssistant}
                className="px-4 py-2.5 bg-gradient-to-r from-[#3867E8] to-[#1E3A6C] hover:opacity-95 text-white font-bold rounded-xl text-xs md:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer border border-white/20"
              >
                <Mic className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>AI ভয়েস সহকারী</span>
              </button>

              <button
                onClick={() => onSelectTab("tutor")}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs md:text-sm backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-emerald-300" />
                <span>AI মাস্টারমশাই</span>
              </button>

              <button
                onClick={() => setShowDownloadModal(true)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs md:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>অ্যান্ড্রয়েড অ্যাপ (APK)</span>
              </button>
            </div>
          </div>

          {/* Exam Countdown Card */}
          <div className="bg-[#0D1C36]/85 backdrop-blur-md p-5 rounded-3xl border border-white/15 min-w-[240px] text-center space-y-3 self-start lg:self-auto shadow-xl">
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

            <div className="text-[11px] text-emerald-300 font-medium bg-emerald-500/15 py-1.5 px-3 rounded-xl border border-emerald-400/20">
              ✓ লক্ষ্য: প্রতিটি বিষয়ে ৯০%+ নম্বর
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-5">
        {/* Streak */}
        <div className="bg-white dark:bg-[#14203D] p-5 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">অধ্যয়ন স্ট্রিক</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black font-mono text-[#142B52] dark:text-white">
              {streakDays}
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">দিন চলমান 🔥</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 font-medium">প্রতিদিন কুইজ সমাধান করুন</div>
        </div>

        {/* Total Questions Practiced */}
        <div className="bg-white dark:bg-[#14203D] p-5 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">মোট প্রশ্ন চর্চা</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#3867E8]">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black font-mono text-[#142B52] dark:text-white">
              {quizScore.total}
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">টি প্রশ্ন সম্পন্ন</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 font-medium">সঠিক উত্তর: {quizScore.correct} টি</div>
        </div>

        {/* Accuracy */}
        <div className="bg-white dark:bg-[#14203D] p-5 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">কুইজ নির্ভুলতা</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#18A889]">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black font-mono text-[#142B52] dark:text-white">
              {accuracy}%
            </span>
            <span className="text-xs font-bold text-[#18A889]">
              {accuracy >= 80 ? "চমৎকার 🎯" : accuracy >= 50 ? "উন্নতিশীল 👍" : "অনুশীলন জরুরি 📚"}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 font-medium">নির্ভুল উত্তর প্রদানের হার</div>
        </div>

        {/* Daily Goal Progress */}
        <div className="bg-white dark:bg-[#14203D] p-5 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">দৈনিক লক্ষ্য</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black font-mono text-[#142B52] dark:text-white">
              {quizScore.total}/{dailyGoal}
            </span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-mono">
              {goalProgress}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#3867E8] to-[#18A889] h-full rounded-full transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Continue Learning + Daily Challenge Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Continue Learning Card */}
        <div className="lg:col-span-2 bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#3867E8] uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-[#3867E8]" />
                চালিয়ে যান (Continue Learning)
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#142B52]/10 dark:bg-white/10 text-[#142B52] dark:text-white">
                {activeSubInfo.nameBn}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-extrabold text-[#142B52] dark:text-white mt-2">
              {activeSubInfo.nameBn} ({activeSubInfo.nameEn}) প্রস্তুতি
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {activeSubInfo.description}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab("quiz")}
              className="px-5 py-2.5 rounded-xl bg-[#3867E8] hover:bg-[#2752CA] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>কুইজ অনুশীলন করুন</span>
            </button>

            <button
              onClick={() => onSelectTab("questions")}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <BookMarked className="w-4 h-4 text-[#18A889]" />
              <span>সাজেশন ও প্রশ্ন সম্ভার</span>
            </button>

            <button
              onClick={() => onSelectTab("notes")}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-500" />
              <span>আমার নোটস</span>
            </button>
          </div>
        </div>

        {/* Daily Quiz Challenge Widget */}
        <div className="bg-gradient-to-br from-[#142B52] to-[#1E3A6C] text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Zap className="w-3.5 h-3.5 fill-amber-300" />
              <span>আজকের চ্যালেঞ্জ</span>
            </div>

            <h3 className="text-base font-extrabold text-white">
              দৈনিক ১০টি স্পেশাল MCQ
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              প্রতিদিন নতুন সেট অনুশীলন করে জ্ঞান যাচাই করো ও লিডারবোর্ডে এগিয়ে থাকো।
            </p>
          </div>

          <button
            onClick={() => onSelectTab("quiz")}
            className="w-full py-2.5 rounded-xl bg-[#18A889] hover:bg-[#12836B] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>এখনই শুরু করো</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 Subject Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-[#142B52] dark:text-white">
              সাতটি বিষয় (WBBSE Subjects)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              যে কোনো বিষয়ে ট্যাপ করে প্রস্তুতি ও অধ্যায়ভিত্তিক চর্চা শুরু করুন
            </p>
          </div>
          <button
            onClick={() => onSelectTab("syllabus")}
            className="text-xs font-bold text-[#3867E8] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>সম্পূর্ণ সিলেবাস</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SUBJECTS.map((sub) => {
            const isSelected = sub.id === currentSubject;
            const chapters = SYLLABUS_MAP[sub.id] || [];
            const completedCount = chapters.filter((c) => completedChapters[c.id]).length;
            const progressPct = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`group relative bg-white dark:bg-[#14203D] rounded-3xl p-5 border transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "border-[#3867E8] ring-2 ring-[#3867E8]/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
                      {getSubjectIcon(sub.iconName)}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#18A889] text-white">
                        সক্রিয়
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-[#142B52] dark:text-white mt-3">
                    {sub.nameBn}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono font-medium">
                    {sub.nameEn}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400">অগ্রগতি</span>
                    <span className="font-mono text-[#18A889]">{progressPct}%</span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#18A889] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {chapters.length} টি অধ্যায়
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSubject(sub.id);
                        onSelectTab("quiz");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-[#3867E8] text-[#3867E8] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      অনুশীলন করুন
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Study History Preview Snippet */}
      {recentHistory.length > 0 && (
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#3867E8]" />
              <h3 className="text-sm md:text-base font-extrabold text-[#142B52] dark:text-white">
                সাম্প্রতিক অধ্যয়নের ইতিহাস
              </h3>
            </div>
            <button
              onClick={() => onSelectTab("history")}
              className="text-xs font-bold text-[#3867E8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>সব দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentHistory.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectSubject(item.subject);
                  if (item.type === "quiz_attempt") onSelectTab("quiz");
                  else if (item.type === "tutor_query") onSelectTab("tutor");
                  else onSelectTab("history");
                }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 hover:border-blue-300 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#142B52] dark:text-blue-300">
                    {item.subjectNameBn}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {item.timestamp ? item.timestamp.slice(11, 16) : ""}
                  </span>
                </div>
                <div className="text-xs font-extrabold text-slate-800 dark:text-white truncate">
                  {item.title}
                </div>
                {item.score && (
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    স্কোর: {item.score.correct}/{item.score.total}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APK Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#14203D] w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-5 bg-[#142B52] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-amber-300" />
                <h3 className="font-extrabold text-base">ZENTIX WB অ্যান্ড্রয়েড APK ডাউনলোড</h3>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold text-sm">GitHub Actions সরাসরি APK ডাউনলোড লিংক:</div>
                <a
                  href="https://github.com/zentrixofficel-ai/Zentrix-1/releases/latest/download/app-debug.apk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold underline break-all mt-1"
                >
                  https://github.com/zentrixofficel-ai/Zentrix-1/releases/latest/download/app-debug.apk
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">সহজ ৩টি ধাপ:</div>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>প্রজেক্টটি আপনার GitHub রিপোজিটরিতে পুশ করুন: <code className="font-mono font-bold text-slate-800 dark:text-slate-200">zentrixofficel-ai/Zentrix-1</code></li>
                  <li>GitHub Actions-এ স্বয়ংক্রিয়ভাবে Android Gradle বিল্ড শুরু হবে এবং APK রিলিজ হবে।</li>
                  <li>বিল্ড সম্পন্ন হলে উপরের ডাউনলোড লিংকে ক্লিক করে সরাসরি মোবাইলে <code className="font-mono font-bold">app-debug.apk</code> ইন্সটল করুন।</li>
                </ol>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#142B52] hover:bg-[#1E3A6C] text-white font-bold text-xs cursor-pointer"
                >
                  বুঝেছি
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
