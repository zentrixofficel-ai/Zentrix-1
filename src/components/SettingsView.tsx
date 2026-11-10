import React, { useState, useEffect } from "react";
import { UserAuthProfile, NotificationPreferences } from "../types";
import {
  Settings,
  User,
  Target,
  Languages,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Sparkles,
  ShieldCheck,
  Bell,
  BellOff,
  Mic,
  Image,
  MapPin,
  LogIn,
  LogOut,
  Cloud,
  HardDrive,
  Volume2,
  VolumeX,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface SettingsViewProps {
  langMode: "bengali" | "english" | "both";
  onChangeLangMode: (lang: "bengali" | "english" | "both") => void;
  dailyGoal: number;
  onChangeDailyGoal: (goal: number) => void;
  onResetQuizScore: () => void;
  userProfile: UserAuthProfile;
  onLoginGoogle: () => void;
  onLogout: () => void;
  notificationPrefs: NotificationPreferences;
  onUpdateNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  langMode,
  onChangeLangMode,
  dailyGoal,
  onChangeDailyGoal,
  onResetQuizScore,
  userProfile,
  onLoginGoogle,
  onLogout,
  notificationPrefs,
  onUpdateNotificationPrefs,
}) => {
  const [studentName, setStudentName] = useState<string>(userProfile.displayName);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Permission states
  const [micStatus, setMicStatus] = useState<string>("যাচাই করুন");
  const [micTesting, setMicTesting] = useState<boolean>(false);
  const [locStatus, setLocStatus] = useState<string>("ঐচ্ছিক (অফলাইন)");
  const [locDetails, setLocDetails] = useState<string>("");
  const [notifBrowserStatus, setNotifBrowserStatus] = useState<string>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("wbbse_student_name", studentName);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAllProgress = () => {
    if (
      window.confirm(
        "আপনি কি নিশ্চিত যে আপনার সমস্ত সিলেবাস প্রগ্রেস, স্টাডি ইতিহাস এবং বুকমার্ক মুছে ফেলতে চান?"
      )
    ) {
      try {
        localStorage.removeItem("wbbse_completed_chapters");
        localStorage.removeItem("wbbse_question_bookmarks");
        localStorage.removeItem("zentix_history");
        localStorage.removeItem("zentix_notes");
        localStorage.removeItem("zentix_bookmarks");
        onResetQuizScore();
        alert("প্রগ্রেস সফলভাবে রিসেট করা হয়েছে।");
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Test Microphone
  const testMicrophone = async () => {
    setMicTesting(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicStatus("অনুমোদিত ও সক্রিয় ✓");
        setTimeout(() => {
          stream.getTracks().forEach((t) => t.stop());
        }, 1500);
      } else {
        setMicStatus("ব্রাউজারে ভয়েস সাপোর্ট নেই");
      }
    } catch (err) {
      setMicStatus("অনুমতি প্রত্যাখ্যান / বন্ধ");
    } finally {
      setMicTesting(false);
    }
  };

  // Test Location
  const testLocation = () => {
    if ("geolocation" in navigator) {
      setLocStatus("যাচাই হচ্ছে...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocStatus("অনুমোদিত (স্থানীয় সময় সক্রিয়)");
          setLocDetails(
            `অক্ষাংশ: ${pos.coords.latitude.toFixed(2)}, দ্রাঘিমাংশ: ${pos.coords.longitude.toFixed(2)} (শুধুমাত্র লোকাল পরীক্ষা কেন্দ্র ব্যবহারের জন্য)`
          );
        },
        () => {
          setLocStatus("অনুমতি দেওয়া হয়নি (ঐচ্ছিক)");
          setLocDetails("");
        }
      );
    } else {
      setLocStatus("সমর্থিত নয়");
    }
  };

  // Request Browser Notification
  const requestBrowserNotification = async () => {
    if ("Notification" in window) {
      const res = await Notification.requestPermission();
      setNotifBrowserStatus(res);
      if (res === "granted") {
        new Notification("ZENTIX WB", {
          body: "বিজ্ঞপ্তি সফলভাবে সক্রিয় করা হয়েছে! মাধ্যমিক পরীক্ষার টিপস পাবেন।",
          icon: "/favicon.ico",
        });
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] dark:bg-blue-900/40 text-[#3867E8] dark:text-blue-300">
              অ্যাপ সেটিংস (Settings & Control)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52] dark:text-white">
            অ্যাকাউন্ট, বিজ্ঞপ্তি ও পারমিশন কন্ট্রোল
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            গুগল সাইন-ইন, বিজ্ঞপ্তি অন/অফ এবং ভয়েস, ক্যামেরা ও লোকেশন পারমিশনের সম্পূর্ণ নিয়ন্ত্রণ।
          </p>
        </div>
      </div>

      {/* 1. Firebase Google Authentication Panel */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm md:text-base font-extrabold text-[#142B52] dark:text-white">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#3867E8] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span>Google অ্যাকাউন্ট ও ক্লাউড সিঙ্ক (Firebase Auth)</span>
          </div>

          <span
            className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
              userProfile.isGuest
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
            }`}
          >
            {userProfile.isGuest ? (
              <>
                <HardDrive className="w-3.5 h-3.5" />
                <span>গেস্ট মোড (অফলাইন)</span>
              </>
            ) : (
              <>
                <Cloud className="w-3.5 h-3.5" />
                <span>Firebase ক্লাউড সংযুক্ত</span>
              </>
            )}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Google অ্যাকাউন্ট দিয়ে সাইন ইন করলে আপনার স্টাডি হিস্ট্রি, কুইজ স্কোর, তৈরি করা নোট এবং সংরক্ষিত প্রশ্নাবলি স্বয়ংক্রিয়ভাবে ক্লাউডে সিঙ্ক থাকবে এবং যে কোনো ডিভাইসে ব্যবহার করা যাবে।
        </p>

        {userProfile.isGuest ? (
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onLoginGoogle}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#3867E8] hover:bg-[#2752CA] text-white font-extrabold text-xs md:text-sm shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Google দিয়ে সাইন ইন / সাইন আপ করুন</span>
            </button>
            <span className="text-xs text-slate-400">
              (এক ক্লিকে দ্রুত সাইন ইন, কোনো পাসওয়ার্ড প্রয়োজন নেই)
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-xl shadow-xs">
                {userProfile.avatarEmoji || "🌟"}
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  {userProfile.displayName}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {userProfile.email || "সংযুক্ত শিক্ষার্থী"}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট করুন</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Notification Options (ON/OFF Toggles) */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm md:text-base font-extrabold text-[#142B52] dark:text-white">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <span>বিজ্ঞপ্তি সেটিংস (Notification Options On/Off)</span>
          </div>

          <button
            onClick={requestBrowserNotification}
            className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              notifBrowserStatus === "granted"
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-800"
                : "bg-blue-50 dark:bg-blue-950/40 text-[#3867E8] border-blue-200 hover:bg-blue-100"
            }`}
          >
            <span>
              {notifBrowserStatus === "granted"
                ? "ব্রাউজার পারমিশন চালু ✓"
                : "ব্রাউজার পারমিশন দিন"}
            </span>
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          কোন ধরনের বিজ্ঞপ্তি আপনি পেতে চান তা সহজেই চালু বা বন্ধ (On/Off) করুন:
        </p>

        <div className="space-y-3">
          {/* Daily Study Reminder */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div>
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                দৈনিক পড়ার রিমাইন্ডার (Daily Study Reminder)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                নির্দিষ্ট সময়ে পড়াশোনা শুরু করার জন্য প্রতিদিনের অনুস্মারক।
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateNotificationPrefs({
                  dailyReminder: !notificationPrefs.dailyReminder,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationPrefs.dailyReminder
                  ? "bg-[#18A889]"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPrefs.dailyReminder ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Daily Quiz Alerts */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div>
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                কুইজ ও চ্যালেঞ্জ অ্যালার্ট (Quiz & Challenge Alerts)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                প্রতিদিন নতুন ১০টি MCQ সেট প্রস্তুত হলে নোটিফিকেশন পাবেন।
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateNotificationPrefs({
                  quizAlerts: !notificationPrefs.quizAlerts,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationPrefs.quizAlerts
                  ? "bg-[#18A889]"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPrefs.quizAlerts ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Exam Countdown */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div>
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                মাধ্যমিক পরীক্ষা কাউন্টডাউন (Exam Countdown Alerts)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                মাধ্যমিক পরীক্ষার দিন গণনার বিজ্ঞপ্তি ও সাপ্তাহিক অগ্রগতি রিপোর্ট।
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateNotificationPrefs({
                  examCountdown: !notificationPrefs.examCountdown,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationPrefs.examCountdown
                  ? "bg-[#18A889]"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPrefs.examCountdown ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Streak Protection */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div>
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                স্ট্রিক রক্ষা সতর্কতা (Streak Protection Alert)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                দিনের স্ট্রিক অক্ষুণ্ণ রাখতে সন্ধ্যার সময় অ্যালার্ট।
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateNotificationPrefs({
                  streakProtection: !notificationPrefs.streakProtection,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationPrefs.streakProtection
                  ? "bg-[#18A889]"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPrefs.streakProtection ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Sound & Audio Effects */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div>
              <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                সাউন্ড এফেক্ট ও অডিও ফিডব্যাক (Audio Effects)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                কুইজ সমাধান ও ভয়েস অ্যাসিস্ট্যান্ট ব্যবহারের সাউন্ড।
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateNotificationPrefs({
                  soundEffects: !notificationPrefs.soundEffects,
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationPrefs.soundEffects
                  ? "bg-[#18A889]"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notificationPrefs.soundEffects ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. App Permissions & Privacy Center (Voice, Image, Location + Strict Privacy Guarantee) */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 text-sm md:text-base font-extrabold text-[#142B52] dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span>অ্যাপ পারমিশন ও ডেটা সুরক্ষা (Permissions & Privacy)</span>
        </div>

        {/* Privacy Guarantee Box */}
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs md:text-sm font-black text-teal-900 dark:text-teal-200">
            <CheckCircle2 className="w-4 h-4 text-[#18A889]" />
            <span>কারো কোনো ব্যক্তিগত তথ্য সংগ্রহ বা শেয়ার করা হয় না (100% Privacy Guarantee)</span>
          </div>
          <p className="text-xs text-teal-800 dark:text-teal-300 leading-relaxed font-sans">
            ZENTIX WB কঠোর শিক্ষার্থী গোপনীয়তা মেনে চলে। আপনার ছবি, ভয়েস রেকর্ডিং বা লোকেশন তথ্য কখনো কোনো তৃতীয় পক্ষের সাথে বিক্রি বা শেয়ার করা হয় না। সমস্ত ডেটা ১০০% বিশ্বস্ত ও নিরাপদে শুধুমাত্র শিক্ষা সহায়তার কাজে ব্যবহৃত হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Voice / Mic Permission */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-[#3867E8]">
                  <Mic className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#3867E8] font-mono">
                  VOICE
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-extrabold text-[#142B52] dark:text-white">
                ভয়েস ও মাইক্রোফোন
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                AI মাস্টারমশাই ও ভয়েস অ্যাসিস্ট্যান্টের মাধ্যমে কথা বলে প্রশ্ন করার জন্য ব্যবহৃত হয়।
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {micStatus}
              </span>
              <button
                onClick={testMicrophone}
                disabled={micTesting}
                className="px-3 py-1 rounded-lg bg-[#3867E8] hover:bg-[#2752CA] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {micTesting ? "শুনছি..." : "টেস্ট করুন"}
              </button>
            </div>
          </div>

          {/* Image / Camera Permission */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-[#18A889]">
                  <Image className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#18A889] font-mono">
                  CAMERA
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-extrabold text-[#142B52] dark:text-white">
                ছবি ও ক্যামেরা আপলোড
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                উত্তরের খাতা মূল্যায়ন, বইয়ের পাতার অংক ছবি তুলে AI সমাধান করার জন্য।
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#18A889]">সক্রিয় ও প্রস্তুত ✓</span>
              <label className="px-3 py-1 rounded-lg bg-[#18A889] hover:bg-[#12836B] text-white text-xs font-bold transition-colors cursor-pointer">
                <span>ছবি টেস্ট</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      alert("ছবি সফলভাবে নির্বাচন করা হয়েছে: " + e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Location Permission (Optional) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-mono">
                  LOCATION
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-extrabold text-[#142B52] dark:text-white">
                আঞ্চলিক লোকেশন (ঐচ্ছিক)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                স্থানীয় পরীক্ষা কেন্দ্র আপডেট ও স্থানীয় আবহাওয়া/সময় নির্ধারণের জন্য (সম্পূর্ণ ঐচ্ছিক)।
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {locStatus}
              </span>
              <button
                onClick={testLocation}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                যাচাই করুন
              </button>
            </div>
          </div>
        </div>

        {locDetails && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300">
            {locDetails}
          </div>
        )}
      </div>

      {/* 4. Student Name & Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#142B52] dark:text-white">
            <User className="w-4 h-4 text-[#3867E8]" />
            <span>শিক্ষার্থীর নাম ও পরিচয়</span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                তোমার নাম / ডাকনাম:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs md:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8] font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-[#3867E8] hover:bg-[#2752CA] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>নাম সংরক্ষণ করুন</span>
            </button>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl font-medium">
                ✓ প্রোফাইল তথ্য সফলভাবে সেভ হয়েছে!
              </div>
            )}
          </form>
        </div>

        {/* Daily Target */}
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#142B52] dark:text-white">
            <Target className="w-4 h-4 text-[#18A889]" />
            <span>দৈনিক অনুশীলনের লক্ষ্য (Daily Target)</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            প্রতিদিন ঠিক কতগুলি প্রশ্ন সমাধান করতে চাও তা নির্ধারণ করো:
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20].map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => onChangeDailyGoal(goal)}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dailyGoal === goal
                    ? "bg-[#18A889] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {goal} টি / দিন
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#142B52] dark:text-white">
            <Languages className="w-4 h-4 text-[#3867E8]" />
            <span>ভাষা পছন্দ (Language Preference)</span>
          </div>

          <div className="space-y-2 text-xs">
            <button
              onClick={() => onChangeLangMode("both")}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                langMode === "both"
                  ? "border-[#3867E8] bg-[#EEF2FD] dark:bg-blue-950/40 font-bold text-[#142B52] dark:text-white"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span>উভয় ভাষা (Bilingual - বাংলা + English)</span>
              {langMode === "both" && <CheckCircle2 className="w-4 h-4 text-[#3867E8]" />}
            </button>

            <button
              onClick={() => onChangeLangMode("bengali")}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                langMode === "bengali"
                  ? "border-[#3867E8] bg-[#EEF2FD] dark:bg-blue-950/40 font-bold text-[#142B52] dark:text-white"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span>শুধুমাত্র বাংলা (Bengali Medium)</span>
              {langMode === "bengali" && <CheckCircle2 className="w-4 h-4 text-[#3867E8]" />}
            </button>

            <button
              onClick={() => onChangeLangMode("english")}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                langMode === "english"
                  ? "border-[#3867E8] bg-[#EEF2FD] dark:bg-blue-950/40 font-bold text-[#142B52] dark:text-white"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span>English Medium</span>
              {langMode === "english" && <CheckCircle2 className="w-4 h-4 text-[#3867E8]" />}
            </button>
          </div>
        </div>

        {/* Data Reset & Storage */}
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-rose-700 dark:text-rose-400">
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>তথ্য পরিচালনা ও রিসেট (Data Reset)</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            কুইজ স্কোর রিসেট করতে চাইলে বা নতুন করে রিভিশন ট্র্যাকিং শুরু করতে চাইলে নিচের বোতাম ব্যবহার করুন।
          </p>

          <div className="space-y-2 pt-1">
            <button
              onClick={onResetQuizScore}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>শুধুমাত্র কুইজ স্কোর রিসেট করুন</span>
            </button>

            <button
              onClick={handleClearAllProgress}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>সমস্ত প্রগ্রেস ও ইতিহাস মুছে ফেলুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* App Identifier & Branding Card */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3867E8] to-[#18A889] text-white flex items-center justify-center font-mono font-black text-lg shadow-sm">
            Zx
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#142B52] dark:text-white">ZENTIX WB</h3>
              <span className="text-xs bg-[#18A889] text-white px-1.5 py-0.2 rounded font-bold font-mono">
                Zx
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              App ID: <strong className="text-slate-800 dark:text-slate-200">com.zentixwb.com</strong>
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div>পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE) দশম শ্রেণি</div>
          <div className="text-emerald-700 dark:text-emerald-400 font-bold font-mono mt-0.5">
            v2.1 • Firebase Auth & Cloud Firestore
          </div>
        </div>
      </div>
    </div>
  );
};
