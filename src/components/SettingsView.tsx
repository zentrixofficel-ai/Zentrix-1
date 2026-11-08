import React, { useState } from "react";
import {
  Settings,
  User,
  Target,
  Languages,
  RotateCcw,
  CheckCircle2,
  Trash2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface SettingsViewProps {
  langMode: "bengali" | "english" | "both";
  onChangeLangMode: (lang: "bengali" | "english" | "both") => void;
  dailyGoal: number;
  onChangeDailyGoal: (goal: number) => void;
  onResetQuizScore: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  langMode,
  onChangeLangMode,
  dailyGoal,
  onChangeDailyGoal,
  onResetQuizScore,
}) => {
  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem("wbbse_student_name") || "মাধ্যমিক পরীক্ষার্থী";
    } catch {
      return "মাধ্যমিক পরীক্ষার্থী";
    }
  });

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

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
    if (window.confirm("আপনি কি নিশ্চিত যে আপনার সমস্ত সিলেবাস প্রগ্রেস এবং বুকমার্ক মুছে ফেলতে চান?")) {
      try {
        localStorage.removeItem("wbbse_completed_chapters");
        localStorage.removeItem("wbbse_question_bookmarks");
        onResetQuizScore();
        alert("প্রগ্রেস সফলভাবে রিসেট করা হয়েছে।");
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] text-[#3867E8]">
              অ্যাপ সেটিংস (Settings)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
            ব্যক্তিগত প্রোফাইল ও অধ্যয়ন সংক্রান্ত সেটিংস
          </h2>
          <p className="text-xs text-slate-500">
            দৈনিক অনুশীলনের লক্ষ্য নির্ধারণ, ভাষা পছন্দ এবং অ্যাকাউন্টের তথ্য কাস্টমাইজ করুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#142B52]">
            <User className="w-4 h-4 text-[#3867E8]" />
            <span>শিক্ষার্থীর প্রোফাইল</span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                তোমার নাম / ডাকনাম:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs md:text-sm rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20 font-medium"
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
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-medium">
                ✓ প্রোফাইল তথ্য সফলভাবে সেভ হয়েছে!
              </div>
            )}
          </form>
        </div>

        {/* Daily Goal Settings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#142B52]">
            <Target className="w-4 h-4 text-[#18A889]" />
            <span>দৈনিক অনুশীলনের লক্ষ্য (Daily Target)</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            প্রতিদিন ঠিক কতগুলি প্রশ্ন সমাধান করতে চাও তা নির্ধারণ করো:
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20].map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => onChangeDailyGoal(goal)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  dailyGoal === goal
                    ? "bg-[#18A889] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {goal} টি / দিন
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#142B52]">
            <Languages className="w-4 h-4 text-[#3867E8]" />
            <span>ভাষা পছন্দ (Language Preference)</span>
          </div>

          <div className="space-y-2 text-xs">
            <button
              onClick={() => onChangeLangMode("both")}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                langMode === "both"
                  ? "border-[#3867E8] bg-[#EEF2FD] font-bold text-[#142B52]"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>উভয় ভাষা (Bilingual - বাংলা + English টার্ম)</span>
              {langMode === "both" && <CheckCircle2 className="w-4 h-4 text-[#3867E8]" />}
            </button>

            <button
              onClick={() => onChangeLangMode("bengali")}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                langMode === "bengali"
                  ? "border-[#3867E8] bg-[#EEF2FD] font-bold text-[#142B52]"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>শুধুমাত্র বাংলা (Bengali Medium)</span>
              {langMode === "bengali" && <CheckCircle2 className="w-4 h-4 text-[#3867E8]" />}
            </button>

            <button
              onClick={() => onChangeLangMode("english")}
              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                langMode === "english"
                  ? "border-[#3867E8] bg-[#EEF2FD] font-bold text-[#142B52]"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>English Medium</span>
              {langMode === "english" && <CheckCircle2 className="w-4 h-4 text-[#3867E8]" />}
            </button>
          </div>
        </div>

        {/* Data Reset & Storage */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-rose-700">
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>তথ্য পরিচালনা ও রিসেট (Data Reset)</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            কুইজ স্কোর রিসেট করতে চাইলে বা নতুন করে রিভিশন ট্র্যাকিং শুরু করতে চাইলে নিচের বোতাম ব্যবহার করুন।
          </p>

          <div className="space-y-2 pt-1">
            <button
              onClick={onResetQuizScore}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>শুধুমাত্র কুইজ স্কোর রিসেট করুন</span>
            </button>

            <button
              onClick={handleClearAllProgress}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>সমস্ত প্রগ্রেস ও বুকমার্ক মুছে ফেলুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* App Identifier & Branding Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3867E8] to-[#18A889] text-white flex items-center justify-center font-mono font-black text-lg shadow-sm">
            Zx
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#142B52]">zentix WB</h3>
              <span className="text-xs bg-[#18A889] text-white px-1.5 py-0.2 rounded font-bold font-mono">
                Zx
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Identifier: <strong className="text-slate-800">com.zentixwb.com</strong>
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-500 font-medium">
          <div>পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE) দশম শ্রেণি</div>
          <div className="text-emerald-700 font-bold font-mono mt-0.5">v1.0.0 • AI EdTech Platform</div>
        </div>
      </div>
    </div>
  );
};
