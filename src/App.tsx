/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  NavTab,
  SubjectId,
  HistoryItem,
  StudyNote,
  BookmarkItem,
  AppNotification,
  UserAuthProfile,
  NotificationPreferences,
  StudentClass,
  SubjectInfo,
  QuestionPaperItem,
  ImportantQuestionRecord,
} from "./types";
import { Sidebar } from "./components/Sidebar";
import { BottomNav } from "./components/BottomNav";
import { Dashboard } from "./components/Dashboard";
import { InteractiveQuiz } from "./components/InteractiveQuiz";
import { ImportantQuestions } from "./components/ImportantQuestions";
import { AITutor } from "./components/AITutor";
import { AnswerEvaluator } from "./components/AnswerEvaluator";
import { MemoryHub } from "./components/MemoryHub";
import { SyllabusTracker } from "./components/SyllabusTracker";
import { FormulaBook } from "./components/FormulaBook";
import { SettingsView } from "./components/SettingsView";
import { StudyHistoryView } from "./components/StudyHistoryView";
import { NotesView } from "./components/NotesView";
import { BookmarksView } from "./components/BookmarksView";
import { QuestionPaperLibraryView } from "./components/QuestionPaperLibraryView";
import { MostImportantQuestionsView } from "./components/MostImportantQuestionsView";
import { AdminDashboardView } from "./components/AdminDashboardView";
import { PdfViewerModal } from "./components/PdfViewerModal";
import { VoiceAssistantModal } from "./components/VoiceAssistantModal";
import { NotificationCenterModal } from "./components/NotificationCenterModal";
import { ProfileModal } from "./components/ProfileModal";
import { SUBJECTS } from "./data/madhyamikData";
import {
  CLASS_6_SUBJECTS,
  INITIAL_QUESTION_PAPERS,
  MOST_IMPORTANT_QUESTIONS_DATA,
} from "./data/questionPapersData";
import {
  createGuestProfile,
  signInWithGoogle,
  logoutUser,
  subscribeToAuthChanges,
  syncHistoryToCloud,
  syncNoteToCloud,
  deleteNoteFromCloud,
  syncBookmarkToCloud,
  deleteBookmarkFromCloud,
  isFirebaseConfigured,
} from "./services/firebase";
import {
  Mic,
  Bell,
  Sun,
  Moon,
  Flame,
  User,
  Languages,
  GraduationCap,
  FileText,
  Sparkles,
  BookMarked,
} from "lucide-react";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState<SubjectId>("bengali");
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Class state: "class_10" (Madhyamik) or "class_6"
  const [currentClass, setCurrentClass] = useState<StudentClass>(() => {
    try {
      const saved = localStorage.getItem("zentix_student_class");
      if (saved === "class_6" || saved === "class_10") return saved;
      return "class_10";
    } catch {
      return "class_10";
    }
  });

  // Subjects state for Class 10 and Class 6
  const [class10Subjects, setClass10Subjects] = useState<SubjectInfo[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_subjects_10");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SUBJECTS;
  });

  const [class6Subjects, setClass6Subjects] = useState<SubjectInfo[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_subjects_6");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CLASS_6_SUBJECTS;
  });

  const activeSubjects = useMemo(() => {
    return currentClass === "class_10" ? class10Subjects : class6Subjects;
  }, [currentClass, class10Subjects, class6Subjects]);

  // Question Papers State
  const [questionPapers, setQuestionPapers] = useState<QuestionPaperItem[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_question_papers");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_QUESTION_PAPERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_question_papers", JSON.stringify(questionPapers));
    } catch (e) {
      console.error(e);
    }
  }, [questionPapers]);

  // Most Important Questions State
  const [importantQuestions, setImportantQuestions] = useState<ImportantQuestionRecord[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_important_questions");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return MOST_IMPORTANT_QUESTIONS_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_important_questions", JSON.stringify(importantQuestions));
    } catch (e) {
      console.error(e);
    }
  }, [importantQuestions]);

  // Active PDF for In-App Viewer Modal
  const [activePdfPaper, setActivePdfPaper] = useState<QuestionPaperItem | null>(null);

  // Offline Saved Question Papers
  const [savedOfflinePaperIds, setSavedOfflinePaperIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_offline_papers");
      if (saved) return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const handleSaveOfflinePaper = (paper: QuestionPaperItem) => {
    setSavedOfflinePaperIds((prev) => {
      const exists = prev.includes(paper.id);
      const next = exists ? prev.filter((id) => id !== paper.id) : [...prev, paper.id];
      try {
        localStorage.setItem("zentix_offline_papers", JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleChangeClass = (newClass: StudentClass) => {
    setCurrentClass(newClass);
    try {
      localStorage.setItem("zentix_student_class", newClass);
    } catch (e) {
      console.error(e);
    }
    if (newClass === "class_6") {
      setCurrentSubject(class6Subjects[0]?.id || "bengali_6");
    } else {
      setCurrentSubject(class10Subjects[0]?.id || "bengali");
    }
  };

  const handleAddQuestionPaper = (paper: QuestionPaperItem) => {
    setQuestionPapers((prev) => [paper, ...prev]);
  };

  const handleDeleteQuestionPaper = (id: string) => {
    setQuestionPapers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleTogglePublishPaper = (id: string) => {
    setQuestionPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublished: p.isPublished === false ? true : false } : p))
    );
  };

  const handleAddImportantQuestion = (q: ImportantQuestionRecord) => {
    setImportantQuestions((prev) => [q, ...prev]);
  };

  const handleDeleteImportantQuestion = (id: string) => {
    setImportantQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddSubject = (subject: SubjectInfo) => {
    if (currentClass === "class_6") {
      setClass6Subjects((prev) => [...prev, subject]);
      try {
        localStorage.setItem("zentix_subjects_6", JSON.stringify([...class6Subjects, subject]));
      } catch (e) {
        console.error(e);
      }
    } else {
      setClass10Subjects((prev) => [...prev, subject]);
      try {
        localStorage.setItem("zentix_subjects_10", JSON.stringify([...class10Subjects, subject]));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleRemoveSubject = (id: string) => {
    if (currentClass === "class_6") {
      setClass6Subjects((prev) => prev.filter((s) => s.id !== id));
    } else {
      setClass10Subjects((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleResetToDefaultArchive = () => {
    setQuestionPapers(INITIAL_QUESTION_PAPERS);
    setImportantQuestions(MOST_IMPORTANT_QUESTIONS_DATA);
    setClass10Subjects(SUBJECTS);
    setClass6Subjects(CLASS_6_SUBJECTS);
    try {
      localStorage.setItem("zentix_question_papers", JSON.stringify(INITIAL_QUESTION_PAPERS));
      localStorage.setItem("zentix_important_questions", JSON.stringify(MOST_IMPORTANT_QUESTIONS_DATA));
      localStorage.removeItem("zentix_subjects_10");
      localStorage.removeItem("zentix_subjects_6");
    } catch (e) {
      console.error(e);
    }
  };

  // Modals state
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [showNotifModal, setShowNotifModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("zentix_dark_mode");
      if (saved !== null) return saved === "true";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("zentix_dark_mode", isDarkMode.toString());
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  // User Profile & Auth
  const [userProfile, setUserProfile] = useState<UserAuthProfile>(() => {
    try {
      const saved = localStorage.getItem("zentix_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return createGuestProfile();
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_user_profile", JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  // Auth listener for Google sign-in
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((profile) => {
      if (profile) {
        setUserProfile(profile);
      }
    });
    return () => unsubscribe();
  }, []);

  // Notification Preferences (On/Off options)
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem("zentix_notif_prefs");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      dailyReminder: true,
      quizAlerts: true,
      examCountdown: true,
      soundEffects: true,
      streakProtection: true,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_notif_prefs", JSON.stringify(notificationPrefs));
    } catch (e) {
      console.error(e);
    }
  }, [notificationPrefs]);

  const handleUpdateNotificationPrefs = (updated: Partial<NotificationPreferences>) => {
    setNotificationPrefs((prev) => ({ ...prev, ...updated }));
  };

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

  // Study History
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "hist_init_1",
        type: "chapter_read",
        title: "বাংলা - বহুরূপী (সুRule চ্যাটার্জী)",
        subject: "bengali",
        subjectNameBn: "বাংলা",
        timestamp: new Date().toISOString(),
        details: "অধ্যায় পাঠ ও মূল চরিত্রের বিশ্লেষণ সম্পন্ন",
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_history", JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  const handleAddHistory = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev.filter((h) => h.id !== item.id)]);
    syncHistoryToCloud(userProfile.uid, item);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Study Notes
  const [notes, setNotes] = useState<StudyNote[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_notes");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "note_init_1",
        title: "বয়েল ও চার্লসের সমন্বয় সূত্র",
        content:
          "বয়েলের সূত্র: V ∝ 1/P (T স্থির)\nচার্লসের সূত্র: V ∝ T (P স্থির)\nসমন্বয় সূত্র: PV/T = k (ধ্রুবক)\nn মোল আদর্শ গ্যাসের জন্য: PV = nRT (যেখানে R = সার্বজনীন গ্যাস ধ্রুবক)",
        subject: "physical_science",
        chapter: "গ্যাসের আচরণ",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "note_init_2",
        title: "মেন্ডেলের বংশগতির প্রধান সূত্রসমূহ",
        content:
          "১. পৃথক্‌ভবন সূত্র (Law of Segregation): জননকোষ সৃষ্টি কালে বিপরীতধর্মী অ্যালিল মিশ্রিত না হয়ে পরস্পর থেকে পৃথক হয়।\n২. স্বাধীন সঞ্চারণ সূত্র (Law of Independent Assortment): দুই বা ততোধিক জোড়া বিপরীত বৈশিষ্ট্যের বংশগতি স্বাধীনভাবে সঞ্চারিত হয়।",
        subject: "life_science",
        chapter: "বংশগতি ও সাধারণ কয়েকটি জিনগত রোগ",
        updatedAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_notes", JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  const handleAddNote = (newNote: Omit<StudyNote, "id" | "updatedAt">) => {
    const note: StudyNote = {
      ...newNote,
      id: "note_" + Date.now(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    syncNoteToCloud(userProfile.uid, note);
    handleAddHistory({
      id: "hist_note_" + Date.now(),
      type: "note_created",
      title: `নতুন নোট: ${note.title}`,
      subject: note.subject,
      subjectNameBn: SUBJECTS.find((s) => s.id === note.subject)?.nameBn || note.subject,
      timestamp: new Date().toISOString(),
    });
  };

  const handleUpdateNote = (updated: StudyNote) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    syncNoteToCloud(userProfile.uid, updated);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    deleteNoteFromCloud(userProfile.uid, id);
  };

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem("zentix_bookmarks");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "bm_init_1",
        type: "formula",
        title: "দ্বিঘাত সমীকরণের নিরূপক (Discriminant)",
        content: "ax² + bx + c = 0 সমীকরণের নিরূপক D = b² - 4ac। D > 0 হলে বীজদ্বয় বাস্তব ও অসমান।",
        subject: "mathematics",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem("zentix_bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const handleAddBookmark = (item: BookmarkItem) => {
    setBookmarks((prev) => [item, ...prev.filter((b) => b.id !== item.id)]);
    syncBookmarkToCloud(userProfile.uid, item);
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    deleteBookmarkFromCloud(userProfile.uid, id);
  };

  const handleClearBookmarks = () => {
    setBookmarks([]);
  };

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "notif_1",
      title: "মাধ্যমিক পরীক্ষা ২০২৬ কাউন্টডাউন",
      message: "পরীক্ষার দিন গণনা চলছে! প্রতিদিন অধ্যায়ভিত্তিক কুইজ ও রিভিশন সম্পন্ন করো।",
      timestamp: "আজ সকাল ৯:০০",
      read: false,
      type: "reminder",
      linkTab: "dashboard",
    },
    {
      id: "notif_2",
      title: "দৈনিক কুইজ চ্যালেঞ্জ প্রস্তুত",
      message: "আজকের স্পেশাল ১০টি MCQ প্রশ্ন সমাধান করে তোমার দৈনিক গোল সম্পূর্ণ করো।",
      timestamp: "আজ সকাল ৮:৩০",
      read: false,
      type: "quiz",
      linkTab: "quiz",
    },
    {
      id: "notif_3",
      title: "স্বাগত ZENTIX WB-তে! 🌟",
      message: "সাতটি বিষয়ের জন্য AI মাস্টারমশাই ও ভয়েস অ্যাসিস্ট্যান্ট সর্বদা সহায়ক।",
      timestamp: "গতকাল",
      read: true,
      type: "achievement",
      linkTab: "dashboard",
    },
  ]);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotifs = () => {
    setNotifications([]);
  };

  // Auth Handlers
  const handleLoginGoogle = async () => {
    try {
      const profile = await signInWithGoogle();
      if (profile) {
        setUserProfile(profile);
      }
    } catch (err: any) {
      alert("সাইন ইন ব্যর্থ হয়েছে: " + (err.message || "দয়া করে অতিথি হিসেবে চর্চা করুন।"));
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUserProfile(createGuestProfile());
  };

  // Persistence helpers
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

  const selectedSubject = activeSubjects.find((s) => s.id === currentSubject) || activeSubjects[0];

  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0B132B] text-[#1A2434] dark:text-[#E2E8F0] flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar Navigation (Desktop Fixed & Mobile Drawer) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentSubject={currentSubject}
        onSelectSubject={setCurrentSubject}
        currentClass={currentClass}
        onChangeClass={handleChangeClass}
        subjects={activeSubjects}
        langMode={langMode}
        onChangeLangMode={setLangMode}
        quizScore={quizScore}
        streakDays={streakDays}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        unreadNotificationsCount={unreadNotifCount}
        onOpenNotifications={() => setShowNotifModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        userProfile={userProfile}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Area (Offset by Sidebar on Desktop) */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-white/95 dark:bg-[#14203D]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-8 py-3.5 items-center justify-between shadow-2xs">
          {/* Active Subject and Breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Desktop Class Switcher Pill */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold mr-1 border border-slate-200/60 dark:border-slate-700">
              <button
                onClick={() => handleChangeClass("class_6")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  currentClass === "class_6"
                    ? "bg-[#18A889] text-white shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>ষষ্ঠ শ্রেণি</span>
              </button>
              <button
                onClick={() => handleChangeClass("class_10")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  currentClass === "class_10"
                    ? "bg-[#3867E8] text-white shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>দশম (Madhyamik)</span>
              </button>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

            <span className="w-2.5 h-2.5 rounded-full bg-[#18A889] animate-pulse-subtle shrink-0" />
            <div className="text-xs font-bold text-[#142B52] dark:text-white flex items-center gap-1.5 shrink-0">
              <span className="text-slate-400 font-medium">বিষয়:</span>
              <span className="font-extrabold text-sm">{selectedSubject?.nameBn}</span>
              <span className="text-slate-400 font-medium">({selectedSubject?.nameEn})</span>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {activeSubjects.map((sub) => {
                const isSelected = sub.id === currentSubject;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setCurrentSubject(sub.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-[#142B52] dark:bg-[#3867E8] text-white shadow-xs font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            {/* Voice Assistant Shortcut */}
            <button
              onClick={() => setShowVoiceModal(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#3867E8] to-[#18A889] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
              title="ভয়েস অ্যাসিস্ট্যান্ট"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Zx Voice</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setShowNotifModal(true)}
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#3867E8] transition-colors cursor-pointer"
              title="বিজ্ঞপ্তি"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setLangMode("both")}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  langMode === "both"
                    ? "bg-[#3867E8] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                উভয়
              </button>
              <button
                onClick={() => setLangMode("bengali")}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  langMode === "bengali"
                    ? "bg-[#3867E8] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLangMode("english")}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                  langMode === "english"
                    ? "bg-[#3867E8] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <span className="text-base">{userProfile.avatarEmoji}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[100px]">
                {userProfile.displayName}
              </span>
            </button>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 pb-28 lg:pb-12">
          {activeTab === "dashboard" && (
            <Dashboard
              currentClass={currentClass}
              onChangeClass={handleChangeClass}
              subjects={activeSubjects}
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              onSelectTab={setActiveTab}
              quizScore={quizScore}
              streakDays={streakDays}
              dailyGoal={dailyGoal}
              recentHistory={history}
              userProfile={userProfile}
              onOpenVoiceAssistant={() => setShowVoiceModal(true)}
              onOpenProfile={() => setShowProfileModal(true)}
            />
          )}

          {activeTab === "question_papers" && (
            <QuestionPaperLibraryView
              currentClass={currentClass}
              onChangeClass={handleChangeClass}
              subjects={activeSubjects}
              questionPapers={questionPapers}
              onOpenPdfViewer={(paper) => setActivePdfPaper(paper)}
              onSaveOffline={handleSaveOfflinePaper}
              savedOfflineIds={savedOfflinePaperIds}
            />
          )}

          {activeTab === "important_questions" && (
            <MostImportantQuestionsView
              currentClass={currentClass}
              onChangeClass={handleChangeClass}
              subjects={activeSubjects}
              questions={importantQuestions}
              onAddBookmark={(title, content, subject) => {
                handleAddBookmark({
                  id: "bm_" + Date.now(),
                  type: "question",
                  title,
                  content,
                  subject: subject as SubjectId,
                  createdAt: new Date().toISOString(),
                });
              }}
            />
          )}

          {activeTab === "admin_panel" && (
            <AdminDashboardView
              currentClass={currentClass}
              onChangeClass={handleChangeClass}
              subjects={activeSubjects}
              onAddSubject={handleAddSubject}
              onRemoveSubject={handleRemoveSubject}
              questionPapers={questionPapers}
              onAddQuestionPaper={handleAddQuestionPaper}
              onDeleteQuestionPaper={handleDeleteQuestionPaper}
              onTogglePublishPaper={handleTogglePublishPaper}
              importantQuestions={importantQuestions}
              onAddImportantQuestion={handleAddImportantQuestion}
              onDeleteImportantQuestion={handleDeleteImportantQuestion}
              onResetToDefaultArchive={handleResetToDefaultArchive}
            />
          )}

          {activeTab === "quiz" && (
            <InteractiveQuiz
              currentSubject={currentSubject}
              onSelectSubject={setCurrentSubject}
              langMode={langMode}
              onRecordScore={handleRecordScore}
              onLogHistory={handleAddHistory}
              onAddBookmark={handleAddBookmark}
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
              onLogHistory={handleAddHistory}
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

          {activeTab === "history" && (
            <StudyHistoryView
              history={history}
              onClearAll={handleClearHistory}
              onDeleteItem={handleDeleteHistoryItem}
              onSelectTab={setActiveTab}
              onSelectSubject={setCurrentSubject}
            />
          )}

          {activeTab === "notes" && (
            <NotesView
              notes={notes}
              currentSubject={currentSubject}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
              onSelectSubject={setCurrentSubject}
            />
          )}

          {activeTab === "bookmarks" && (
            <BookmarksView
              bookmarks={bookmarks}
              onDeleteBookmark={handleDeleteBookmark}
              onClearAll={handleClearBookmarks}
              onSelectTab={setActiveTab}
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
              userProfile={userProfile}
              onLoginGoogle={handleLoginGoogle}
              onLogout={handleLogout}
              notificationPrefs={notificationPrefs}
              onUpdateNotificationPrefs={handleUpdateNotificationPrefs}
            />
          )}
        </main>

        {/* Floating Voice Assistant FAB button (Visible on desktop & mobile) */}
        <button
          onClick={() => setShowVoiceModal(true)}
          className="fixed bottom-20 lg:bottom-8 right-5 z-40 p-3.5 rounded-full bg-gradient-to-tr from-[#3867E8] to-[#18A889] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/30 dark:ring-slate-900/40 flex items-center gap-2 group"
          title="ZENTIX ভয়েস অ্যাসিস্ট্যান্ট"
          aria-label="Voice Assistant"
        >
          <Mic className="w-6 h-6 animate-pulse" />
          <span className="hidden md:inline text-xs font-extrabold pr-1 tracking-tight">
            ভয়েস প্রশ্ন করুন
          </span>
        </button>

        {/* Mobile-Friendly Sticky Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenMenu={() => setMobileMenuOpen(true)}
        />

        {/* Modals */}
        <VoiceAssistantModal
          isOpen={showVoiceModal}
          onClose={() => setShowVoiceModal(false)}
          currentSubject={currentSubject}
          onSelectSubject={setCurrentSubject}
        />

        <NotificationCenterModal
          isOpen={showNotifModal}
          onClose={() => setShowNotifModal(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotifsRead}
          onClearAll={handleClearNotifs}
          onSelectTab={setActiveTab}
        />

        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userProfile={userProfile}
          onUpdateProfile={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
          onLoginGoogle={handleLoginGoogle}
          onLogout={handleLogout}
          isCloudConnected={isFirebaseConfigured && !userProfile.isGuest}
        />

        {/* In-App PDF Viewer & Question Paper Reader Modal */}
        <PdfViewerModal
          paper={activePdfPaper}
          onClose={() => setActivePdfPaper(null)}
          onSaveOffline={handleSaveOfflinePaper}
          isSavedOffline={activePdfPaper ? savedOfflinePaperIds.includes(activePdfPaper.id) : false}
        />

        {/* Footer */}
        <footer className="mt-auto bg-white dark:bg-[#14203D] border-t border-slate-200/80 dark:border-slate-800 py-5 px-6 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#142B52] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                Zx
              </span>
              <span className="font-extrabold text-[#142B52] dark:text-white">
                ZENTIX WB
              </span>
              <span className="text-slate-400 font-mono text-[11px]">(com.zentixwb.com)</span>
              <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
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
