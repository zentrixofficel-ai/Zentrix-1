import React from "react";
import { NavTab, SubjectId } from "../types";
import { SUBJECTS } from "../data/madhyamikData";
import {
  LayoutDashboard,
  HelpCircle,
  BookMarked,
  Bot,
  FileCheck,
  Brain,
  CheckSquare,
  BookOpen,
  Settings,
  GraduationCap,
  Flame,
  ChevronRight,
  Menu,
  X,
  Languages,
} from "lucide-react";

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  langMode: "bengali" | "english" | "both";
  onChangeLangMode: (lang: "bengali" | "english" | "both") => void;
  quizScore: { correct: number; total: number };
  streakDays: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentSubject,
  onSelectSubject,
  langMode,
  onChangeLangMode,
  quizScore,
  streakDays,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const navItems: { id: NavTab; labelBn: string; labelEn: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: "dashboard", labelBn: "ড্যাশবোর্ড", labelEn: "Dashboard", icon: LayoutDashboard },
    { id: "quiz", labelBn: "অনুশীলন কুইজ", labelEn: "Practice Quiz", icon: HelpCircle, badge: "MCQ" },
    { id: "questions", labelBn: "প্রশ্ন সম্ভার", labelEn: "Question Bank", icon: BookMarked },
    { id: "tutor", labelBn: "AI মাস্টারমশাই", labelEn: "AI Tutor", icon: Bot, badge: "AI" },
    { id: "evaluator", labelBn: "উত্তরপত্র মূল্যায়ন", labelEn: "Answer Evaluator", icon: FileCheck },
    { id: "memory", labelBn: "স্মরণিকা ও ট্রিকস", labelEn: "Memory Hub", icon: Brain },
    { id: "syllabus", labelBn: "সিলেবাস ট্র্যাকার", labelEn: "Syllabus Tracker", icon: CheckSquare },
    { id: "formula_book", labelBn: "ফর্মুলা বুক", labelEn: "Formula Book", icon: BookOpen },
    { id: "settings", labelBn: "সেটিংস", labelEn: "Settings", icon: Settings },
  ];

  const accuracy = quizScore.total > 0 ? Math.round((quizScore.correct / quizScore.total) * 100) : 0;

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#142B52] text-white px-4 py-3 flex items-center justify-between border-b border-[#1E3A6C] shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3867E8] to-[#18A889] flex items-center justify-center text-white font-black text-sm shadow-xs font-mono tracking-tighter">
              Zx
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>zentix WB</span>
                <span className="text-[10px] bg-[#18A889] text-white px-1.5 py-0.2 rounded font-semibold font-mono">
                  Zx
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Daily Streak */}
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-xs font-semibold border border-amber-400/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{streakDays}d</span>
          </div>

          {/* Lang toggle */}
          <button
            onClick={() => onChangeLangMode(langMode === "bengali" ? "english" : langMode === "english" ? "both" : "bengali")}
            className="text-[11px] px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium"
            title="ভাষা পরিবর্তন"
          >
            {langMode === "bengali" ? "বাংলা" : langMode === "english" ? "EN" : "উভয়"}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (and Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#142B52] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#1E3A6C] lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-[#1E3A6C]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3867E8] to-[#18A889] flex items-center justify-center text-white shadow-md font-mono font-black text-lg tracking-tighter">
                  Zx
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-base font-extrabold text-white tracking-tight leading-tight">
                      zentix WB
                    </h1>
                    <span className="text-[10px] bg-[#18A889] text-white px-1 rounded font-bold font-mono">
                      Zx
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-mono tracking-tight mt-0.5">
                    com.zentixwb.com
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Student Streak & Accuracy Bar */}
            <div className="mt-4 p-2.5 rounded-xl bg-[#0D1C36]/70 border border-[#1E3A6C] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-slate-300 font-medium">স্ট্রিক:</span>
                <span className="font-bold text-amber-300 font-mono">{streakDays} দিন</span>
              </div>
              <div className="text-slate-400">|</div>
              <div className="flex items-center gap-1">
                <span className="text-slate-300 font-medium">নির্ভুলতা:</span>
                <span className="font-bold text-[#18A889] font-mono">{accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              মেনু (Navigation)
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (mobileMenuOpen) onToggleMobileMenu();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all group ${
                    isActive
                      ? "bg-[#3867E8] text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                    <span>{item.labelBn}</span>
                    <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                      ({item.labelEn})
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#18A889]/20 text-[#18A889] border border-[#18A889]/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Subject Switcher */}
          <div className="p-3 mt-1 border-t border-[#1E3A6C]/80">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>সাতটি বিষয় (7 Subjects)</span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {SUBJECTS.map((sub) => {
                const isSelected = sub.id === currentSubject;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onSelectSubject(sub.id);
                      if (mobileMenuOpen) onToggleMobileMenu();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? "bg-white/15 text-white font-bold border-l-3 border-[#18A889]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-[#18A889]" />
                      <span className="truncate">{sub.nameBn}</span>
                      <span className="text-[10px] text-slate-400">({sub.nameEn})</span>
                    </div>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-[#18A889]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1E3A6C] bg-[#0D1C36]/50">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-slate-400" />
              <span>ভাষা:</span>
            </div>

            <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg text-[11px]">
              <button
                onClick={() => onChangeLangMode("both")}
                className={`px-2 py-0.5 rounded ${
                  langMode === "both" ? "bg-[#3867E8] text-white font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                উভয়
              </button>
              <button
                onClick={() => onChangeLangMode("bengali")}
                className={`px-2 py-0.5 rounded ${
                  langMode === "bengali" ? "bg-[#3867E8] text-white font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => onChangeLangMode("english")}
                className={`px-2 py-0.5 rounded ${
                  langMode === "english" ? "bg-[#3867E8] text-white font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          onClick={onToggleMobileMenu}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => onSelectTab("dashboard")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "dashboard" ? "text-[#3867E8]" : "text-slate-500"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>ড্যাশবোর্ড</span>
        </button>

        <button
          onClick={() => onSelectTab("quiz")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "quiz" ? "text-[#3867E8]" : "text-slate-500"
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span>কুইজ</span>
        </button>

        <button
          onClick={() => onSelectTab("tutor")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "tutor" ? "text-[#3867E8]" : "text-slate-500"
          }`}
        >
          <Bot className="w-5 h-5 text-[#18A889]" />
          <span>AI মাস্টার</span>
        </button>

        <button
          onClick={() => onSelectTab("questions")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "questions" ? "text-[#3867E8]" : "text-slate-500"
          }`}
        >
          <BookMarked className="w-5 h-5" />
          <span>প্রশ্ন সম্ভার</span>
        </button>

        <button
          onClick={onToggleMobileMenu}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-500"
        >
          <Menu className="w-5 h-5" />
          <span>মেনু</span>
        </button>
      </nav>
    </>
  );
};
