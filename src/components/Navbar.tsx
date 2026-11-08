import React from "react";
import { SUBJECTS } from "../data/madhyamikData";
import { SubjectId } from "../types";
import {
  GraduationCap,
  Calendar,
  Sparkles,
  Trophy,
  Flame,
  Languages,
} from "lucide-react";

interface NavbarProps {
  currentSubject: SubjectId;
  onSelectSubject: (id: SubjectId) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  langMode: "bengali" | "english" | "both";
  onChangeLangMode: (lang: "bengali" | "english" | "both") => void;
  quizScore: { correct: number; total: number };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSubject,
  onSelectSubject,
  activeTab,
  onSelectTab,
  langMode,
  onChangeLangMode,
  quizScore,
}) => {
  // Approximate days left for upcoming Madhyamik (usually mid-February)
  const today = new Date();
  const examYear = today.getMonth() > 2 ? today.getFullYear() + 1 : today.getFullYear();
  const examDate = new Date(examYear, 1, 10); // Feb 10th
  const diffTime = examDate.getTime() - today.getTime();
  const daysLeft = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];

  const accuracy =
    quizScore.total > 0
      ? Math.round((quizScore.correct / quizScore.total) * 100)
      : 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with WBBSE Identity */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-900 to-indigo-950 text-white px-4 py-2 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wide">
              WBBSE Class 10
            </span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="text-emerald-100 flex items-center gap-1.5 font-sans">
              পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ • মাধ্যমিক পরীক্ষা প্রস্তুতি সঙ্গী
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Exam Countdown */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-amber-300 font-semibold text-xs border border-white/10">
              <Calendar className="w-3.5 h-3.5" />
              <span>মাধ্যমিক বাকি: <strong className="text-white font-mono">{daysLeft}</strong> দিন</span>
            </div>

            {/* Streak & Score */}
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/20">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-mono">সঠিক: {quizScore.correct}/{quizScore.total} ({accuracy}%)</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-black/30 rounded-lg p-0.5 border border-white/10 text-[11px]">
              <Languages className="w-3 h-3 ml-1 text-slate-300" />
              <button
                onClick={() => onChangeLangMode("both")}
                className={`px-1.5 py-0.5 rounded ${
                  langMode === "both"
                    ? "bg-amber-400 text-slate-950 font-bold"
                    : "text-slate-200 hover:text-white"
                }`}
                title="উভয় ভাষা (Bilingual)"
              >
                উভয়
              </button>
              <button
                onClick={() => onChangeLangMode("bengali")}
                className={`px-1.5 py-0.5 rounded ${
                  langMode === "bengali"
                    ? "bg-amber-400 text-slate-950 font-bold"
                    : "text-slate-200 hover:text-white"
                }`}
                title="বাংলা"
              >
                বাং
              </button>
              <button
                onClick={() => onChangeLangMode("english")}
                className={`px-1.5 py-0.5 rounded ${
                  langMode === "english"
                    ? "bg-amber-400 text-slate-950 font-bold"
                    : "text-slate-200 hover:text-white"
                }`}
                title="English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                WB Madhyamik Study Companion
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                AI Tutor 2025-26
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              সাতটি বিষয়ের অধ্যায়ভিত্তিক প্রস্তুতি, প্রশ্নব্যাংক ও মেমরি ট্রিকস
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 gap-1.5 scrollbar-none">
          <button
            onClick={() => onSelectTab("quiz")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "quiz"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            অনুশীলন ও মক টেস্ট (Quiz)
          </button>

          <button
            onClick={() => onSelectTab("questions")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "questions"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            গুরুত্বপূর্ণ প্রশ্ন সম্ভার (Questions)
          </button>

          <button
            onClick={() => onSelectTab("tutor")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "tutor"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-amber-500">👨‍🏫</span>
            মাস্টারমশাই (AI Tutor)
          </button>

          <button
            onClick={() => onSelectTab("memory")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "memory"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-purple-500">🧠</span>
            স্মরণিকা ও ট্রিকস (Memory)
          </button>

          <button
            onClick={() => onSelectTab("syllabus")}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "syllabus"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-blue-500">📋</span>
            সিলেবাস ও ব্লুপ্রিন্ট
          </button>
        </div>
      </div>

      {/* Horizontal Subject Bar with All 7 Subjects */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mr-1">
            বিষয় নির্বাচন:
          </span>
          {SUBJECTS.map((sub) => {
            const isSelected = sub.id === currentSubject;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs font-semibold"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400"
                }`}
              >
                <span>{sub.nameBn}</span>
                <span className={`text-[10px] ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                  ({sub.nameEn})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
