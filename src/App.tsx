/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { NavTab, SubjectId } from "./types";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { InteractiveQuiz } from "./components/InteractiveQuiz";
import { ImportantQuestions } from "./components/ImportantQuestions";
import { AITutor } from "./components/AITutor";
import { AnswerEvaluator } from "./components/AnswerEvaluator";
import { MemoryHub } from "./components/MemoryHub";
import { SyllabusTracker } from "./components/SyllabusTracker";
import { FormulaBook } from "./components/FormulaBook";
import { SettingsView } from "./components/SettingsView";
import { SUBJECTS } from "./data/madhyamikData";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Flame,
  Languages,
} from "lucide-react";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState<SubjectId>("bengali");
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Language preference: "both" (Bilingual), "bengali", or "english"
  const [langMode, setLangMode] = useState<"bengali" | "english" | "both">(() => {
    try {
      return (localStorage.getItem("wbbse_lang_mode") as any) || "both";
    } catch {
      return "both";
    }
  });

  // Daily goal: questions per day
  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("wbbse_daily_goal");
      return saved ? parseInt(saved, 10) : 15;
    } catch {
      return 15;
    }
  });

  // Quiz score stored in localStorage
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>(() => {
    try {
      const saved = localStorage.getItem("wbbse_quiz_score");
      return saved ? JSON.parse(saved) : { correct: 0, total: 0 };
    } catch {
      return { correct: 0, total: 0 };
    }
  });

  // Streak days calculation
  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastDate = localStorage.getItem("wbbse_last_active_date");
      const currentStreak = parseInt(localStorage.getItem("wbbse_streak_days") || "1", 10);

      if (!lastDate) {
        localStorage.setItem("wbbse_last_active_date", today);
        localStorage.setItem("wbbse_streak_days", "1");
        return 1;
      }

      if (lastDate === today) {
        return currentStreak;
      }

      const prevDate = new Date();
      prevDate.setDate(prevDate.getDate() - 1);
      const yesterday = prevDate.toISOString().slice(0, 10);

      if (lastDate === yesterday) {
        const nextStreak = currentStreak + 1;
        localStorage.setItem("wbbse_streak_days", nextStreak.toString());
        localStorage.setItem("wbbse_last_active_date", today);
        return nextStreak;
      } else {
        localStorage.setItem("wbbse_streak_days", "1");
        localStorage.setItem("wbbse_last_active_date", today);
        return 1;
      }
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wbbse_quiz_score", JSON.stringify(quizScore));
    } catch (e) {
      console.error(e);
    }
  }, [quizScore]);

  useEffect(() => {
    try {
      localStorage.setItem("wbbse_lang_mode", langMode);
    } catch (e) {
      console.error(e);
    }
  }, [langMode]);

  useEffect(() => {
    try {
      localStorage.setItem("wbbse_daily_goal", dailyGoal.toString());
    } catch (e) {
      console.error(e);
    }
  }, [dailyGoal]);

  const handleRecordScore = (isCorrect: boolean) => {
    setQuizScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleResetQuizScore = () => {
    const fresh = { correct: 0, total: 0 };
    setQuizScore(fresh);
    try {
      localStorage.setItem("wbbse_quiz_score", JSON.stringify(fresh));
    } catch (e) {
      console.error(e);
    }
  };

  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#1A2434] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentSubject={currentSubject}
        onSelectSubject={setCurrentSubject}
        langMode={langMode}
        onChangeLangMode={setLangMode}
        quizScore={quizScore}
        streakDays={streakDays}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Content Area (Offset by Sidebar on Desktop) */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-8 py-3.5 items-center justify-between shadow-2xs">
          {/* Active Subject and Breadcrumb */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#18A889] animate-pulse-subtle" />
            <div className="text-xs font-bold text-[#142B52] flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">বিষয়:</span>
              <span className="font-extrabold text-sm">{selectedSubject.nameBn}</span>
              <span className="text-slate-400 font-medium">({selectedSubject.nameEn})</span>
            </div>

            <div className="h-4 w-px bg-slate-200 mx-1" />

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {SUBJECTS.map((sub) => {
                const isSelected = sub.id === currentSubject;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setCurrentSubject(sub.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-[#142B52] text-white shadow-xs font-bold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {sub.nameBn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Header Right Widget */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setLangMode("both")}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition-all ${
                  langMode === "both"
                    ? "bg-[#3867E8] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                উভয় ভাষা
              </button>
              <button
                onClick={() => setLangMode("bengali")}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition-all ${
                  langMode === "bengali"
                    ? "bg-[#3867E8] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLangMode("english")}
                className={`px-2.5 py-0.5 rounded-lg font-bold transition-all ${
                  langMode === "english"
                    ? "bg-[#3867E8] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 pb-24 lg:pb-12">
          {activeTab === "dashboard" && (
            <Dashboard
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              onSelectTab={setActiveTab}
              quizScore={quizScore}
              streakDays={streakDays}
              dailyGoal={dailyGoal}
            />
          )}

          {activeTab === "quiz" && (
            <InteractiveQuiz
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              langMode={langMode}
              onRecordScore={handleRecordScore}
            />
          )}

          {activeTab === "questions" && (
            <ImportantQuestions
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              langMode={langMode}
            />
          )}

          {activeTab === "tutor" && (
            <AITutor
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              langMode={langMode}
            />
          )}

          {activeTab === "evaluator" && (
            <AnswerEvaluator
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              langMode={langMode}
            />
          )}

          {activeTab === "memory" && (
            <MemoryHub
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              langMode={langMode}
            />
          )}

          {activeTab === "syllabus" && (
            <SyllabusTracker
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
            />
          )}

          {activeTab === "formula_book" && (
            <FormulaBook
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              langMode={langMode}
              onChangeLangMode={setLangMode}
              dailyGoal={dailyGoal}
              onChangeDailyGoal={setDailyGoal}
              onResetQuizScore={handleResetQuizScore}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto bg-white border-t border-slate-200/80 py-5 px-6 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#142B52] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                Zx
              </span>
              <span className="font-extrabold text-[#142B52]">
                zentix WB
              </span>
              <span className="text-slate-400 font-mono text-[11px]">(com.zentixwb.com)</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="hidden md:inline">WBBSE দশম শ্রেণি মাধ্যমিক প্রস্তুতি</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>নিয়মিত অনুশীলন ও আত্মবিশ্বাস সাফল্যের চাবিকাঠি</span>
              <span>•</span>
              <span className="text-[#18A889] font-bold">লক্ষ্য: মাধ্যমিক ১০০% 🎯</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
