import React from "react";
import { NavTab, SubjectId, UserAuthProfile, StudentClass, SubjectInfo } from "../types";
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
  Flame,
  ChevronRight,
  Menu,
  X,
  History,
  Bookmark,
  Bell,
  User,
  LogOut,
  LogIn,
  Moon,
  Sun,
  FileText,
  Sparkles,
  Shield,
  Layers,
  GraduationCap,
  Download,
} from "lucide-react";

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  currentClass: StudentClass;
  onChangeClass: (cls: StudentClass) => void;
  subjects: SubjectInfo[];
  langMode: "bengali" | "english" | "both";
  onChangeLangMode: (lang: "bengali" | "english" | "both") => void;
  quizScore: { correct: number; total: number };
  streakDays: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  unreadNotificationsCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  userProfile: UserAuthProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentSubject,
  onSelectSubject,
  currentClass,
  onChangeClass,
  subjects,
  langMode,
  onChangeLangMode,
  quizScore,
  streakDays,
  mobileMenuOpen,
  onToggleMobileMenu,
  unreadNotificationsCount = 0,
  onOpenNotifications,
  onOpenProfile,
  userProfile,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const primaryNavItems: {
    id: NavTab;
    labelBn: string;
    labelEn: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: "dashboard", labelBn: "ড্যাশবোর্ড", labelEn: "Dashboard", icon: LayoutDashboard },
    {
      id: "question_papers",
      labelBn: "প্রশ্নপত্র সংগ্রহশালা",
      labelEn: "All Question Papers",
      icon: FileText,
      badge: "PDF",
    },
    {
      id: "important_questions",
      labelBn: "অতি গুরুত্বপূর্ণ প্রশ্ন",
      labelEn: "Most Important Questions",
      icon: BookMarked,
      badge: "V.I.P",
    },
    { id: "quiz", labelBn: "অনুশীলন কুইজ", labelEn: "Practice Quiz", icon: HelpCircle, badge: "MCQ" },
    { id: "tutor", labelBn: "AI মাস্টারমশাই", labelEn: "AI Tutor", icon: Bot, badge: "AI" },
    { id: "evaluator", labelBn: "উত্তরপত্র মূল্যায়ন", labelEn: "Answer Evaluator", icon: FileCheck },
    { id: "memory", labelBn: "স্মরণিকা ও ট্রিকস", labelEn: "Memory Hub", icon: Brain },
    { id: "formula_book", labelBn: "ফর্মুলা বুক", labelEn: "Formula Book", icon: BookOpen },
    { id: "syllabus", labelBn: "সিলেবাস ট্র্যাকার", labelEn: "Syllabus Tracker", icon: CheckSquare },
  ];

  const secondaryNavItems: {
    id: NavTab;
    labelBn: string;
    labelEn: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: "history", labelBn: "অধ্যয়ন ইতিহাস", labelEn: "Study History", icon: History },
    { id: "notes", labelBn: "স্টাডি নোটস", labelEn: "Notes", icon: FileText },
    { id: "bookmarks", labelBn: "সংরক্ষিত বুকমার্ক", labelEn: "Bookmarks", icon: Bookmark },
    { id: "admin_panel", labelBn: "অ্যাডমিন প্যানেল", labelEn: "Admin Panel", icon: Shield, badge: "Admin" },
    { id: "settings", labelBn: "সেটিংস ও কন্ট্রোল", labelEn: "Settings", icon: Settings },
  ];

  const accuracy = quizScore.total > 0 ? Math.round((quizScore.correct / quizScore.total) * 100) : 0;

  const handleNavClick = (tabId: NavTab) => {
    onSelectTab(tabId);
    if (mobileMenuOpen) onToggleMobileMenu();
  };

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#142B52] dark:bg-[#0D1C36] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-[#1E3A6C] shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => handleNavClick("dashboard")}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#3867E8] to-[#18A889] flex items-center justify-center text-white font-black text-xs shadow-xs font-mono tracking-tighter">
              Zx
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
                <span>ZENTIX WB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Quick Class Switcher Pill */}
        <div className="flex items-center gap-1 bg-white/10 rounded-xl p-0.5 text-[11px] font-bold">
          <button
            onClick={() => onChangeClass("class_6")}
            className={`px-2 py-0.5 rounded-lg transition-all ${
              currentClass === "class_6" ? "bg-[#18A889] text-white shadow-xs" : "text-slate-300"
            }`}
          >
            ষষ্ঠ
          </button>
          <button
            onClick={() => onChangeClass("class_10")}
            className={`px-2 py-0.5 rounded-lg transition-all ${
              currentClass === "class_10" ? "bg-[#3867E8] text-white shadow-xs" : "text-slate-300"
            }`}
          >
            মাধ্যমিক
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="বিজ্ঞপ্তি"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm cursor-pointer border border-white/20"
            title="প্রোফাইল"
          >
            {userProfile.avatarEmoji || "🎓"}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={onToggleMobileMenu}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fadeIn"
        />
      )}

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#142B52] dark:bg-[#0D1C36] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#1E3A6C] lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-[#1E3A6C]">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNavClick("dashboard")}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3867E8] to-[#18A889] flex items-center justify-center text-white shadow-md font-mono font-black text-lg tracking-tighter">
                  Zx
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-base font-extrabold text-white tracking-tight leading-tight">
                      ZENTIX WB
                    </h1>
                    <span className="text-[10px] bg-[#18A889] text-white px-1.5 py-0.2 rounded font-bold font-mono">
                      Zx
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-mono tracking-tight mt-0.5">
                    com.zentixwb.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Dark mode button */}
                <button
                  onClick={onToggleDarkMode}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={isDarkMode ? "Light Mode" : "Dark Mode"}
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={onToggleMobileMenu}
                  className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Class Switcher inside Drawer */}
            <div className="mt-4 p-1.5 rounded-2xl bg-[#0D1C36]/90 border border-[#1E3A6C] flex items-center gap-1 text-xs">
              <button
                onClick={() => onChangeClass("class_6")}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  currentClass === "class_6"
                    ? "bg-[#18A889] text-white shadow-xs font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>ষষ্ঠ শ্রেণি (Class 6)</span>
              </button>

              <button
                onClick={() => onChangeClass("class_10")}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  currentClass === "class_10"
                    ? "bg-[#3867E8] text-white shadow-xs font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>দশম (Madhyamik)</span>
              </button>
            </div>

            {/* Student Profile Quick Strip */}
            <div
              onClick={() => {
                onOpenProfile();
                if (mobileMenuOpen) onToggleMobileMenu();
              }}
              className="mt-3 p-2.5 rounded-2xl bg-[#0D1C36]/80 dark:bg-black/30 border border-[#1E3A6C] flex items-center justify-between cursor-pointer hover:border-[#3867E8] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{userProfile.avatarEmoji || "🎓"}</span>
                <div>
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">
                    {userProfile.displayName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {userProfile.isGuest ? "অতিথি মোড" : "ক্লাউড সিঙ্ক"} • {currentClass === "class_6" ? "Class 6" : "Madhyamik"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 font-mono bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{streakDays}d</span>
              </div>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              মূল মেন্যু (Core Library)
            </div>

            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#3867E8] to-[#2752CA] text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.labelBn}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase font-mono ${
                          isActive
                            ? "bg-white/20 text-white"
                            : item.badge === "PDF"
                            ? "bg-amber-400 text-slate-950 font-black"
                            : item.badge === "V.I.P"
                            ? "bg-[#18A889] text-white"
                            : "bg-[#3867E8]/30 text-blue-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secondary Tools Navigation */}
          <div className="p-3 pt-0 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              স্টাডি টুলস ও অ্যাডমিন (Tools & Admin)
            </div>

            {secondaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#3867E8] to-[#2752CA] text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.labelBn}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}

            {/* Notifications Item in Drawer */}
            <button
              onClick={() => {
                onOpenNotifications();
                if (mobileMenuOpen) onToggleMobileMenu();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>বিজ্ঞপ্তি ও নোটিফিকেশন</span>
              </div>
              {unreadNotificationsCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-500 text-white font-mono">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>

          {/* Current Class Subjects List */}
          <div className="p-3 pt-0 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>{currentClass === "class_6" ? "ষষ্ঠ শ্রেণির বিষয়" : "মাধ্যমিকের বিষয়সমূহ"}</span>
              <span className="font-mono text-[9px] text-[#18A889]">({subjects.length})</span>
            </div>

            <div className="grid grid-cols-2 gap-1 px-1">
              {subjects.map((sub) => {
                const isSelected = sub.id === currentSubject;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onSelectSubject(sub.id);
                      if (mobileMenuOpen) onToggleMobileMenu();
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-left truncate transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#18A889] text-white font-black shadow-2xs"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {sub.nameBn}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-4 border-t border-[#1E3A6C] bg-[#0D1C36]/90 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onOpenProfile();
              if (mobileMenuOpen) onToggleMobileMenu();
            }}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {userProfile.isGuest ? (
              <>
                <LogIn className="w-3.5 h-3.5 text-[#3867E8]" />
                <span className="font-bold">Google সাইন ইন</span>
              </>
            ) : (
              <>
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-bold">লগআউট</span>
              </>
            )}
          </button>

          <div className="text-[10px] font-mono text-slate-400">
            v3.0 • ZENTIX WB
          </div>
        </div>
      </aside>
    </>
  );
};
