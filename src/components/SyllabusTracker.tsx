import React, { useState, useEffect } from "react";
import { SubjectId } from "../types";
import { SUBJECTS, SYLLABUS_MAP } from "../data/madhyamikData";
import {
  CheckSquare,
  Square,
  BookOpen,
  Award,
  Sparkles,
  Printer,
  ChevronRight,
  TrendingUp,
  FileText,
  Calculator,
  Atom,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface SyllabusTrackerProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
}

export const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({
  currentSubject,
  onSelectSubject,
}) => {
  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];
  const chapters = SYLLABUS_MAP[currentSubject] || [];

  // Completed chapter IDs stored in localStorage
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("wbbse_completed_chapters");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wbbse_completed_chapters", JSON.stringify(completedChapters));
    } catch (e) {
      console.error(e);
    }
  }, [completedChapters]);

  const toggleChapter = (chapterId: string) => {
    setCompletedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Calculate overall stats
  let totalAllChapters = 0;
  let completedAllCount = 0;

  SUBJECTS.forEach((sub) => {
    const list = SYLLABUS_MAP[sub.id] || [];
    totalAllChapters += list.length;
    list.forEach((c) => {
      if (completedChapters[c.id]) completedAllCount++;
    });
  });

  const subjectChapters = SYLLABUS_MAP[currentSubject] || [];
  const subjectCompletedCount = subjectChapters.filter((c) => completedChapters[c.id]).length;
  const subjectPercent =
    subjectChapters.length > 0
      ? Math.round((subjectCompletedCount / subjectChapters.length) * 100)
      : 0;

  const totalPercent =
    totalAllChapters > 0
      ? Math.round((completedAllCount / totalAllChapters) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] text-[#3867E8]">
                সিলেবাস ট্র্যাকার (Syllabus Tracker)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedSubject.nameBn} • {selectedSubject.nameEn}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              WBBSE দশম শ্রেণির পূর্ণাঙ্গ সিলেবাস ও রিভিশন তালিকা
            </h2>
            <p className="text-xs text-slate-500">
              যে যে অধ্যায়গুলি রিভিশন শেষ হয়েছে সেখানে টিকচিহ্ন দিন। তোমার প্রস্তুতি কত শতাংশ সম্পন্ন হলো তা স্বয়ংক্রিয়ভাবে ট্র্যাক হবে।
            </p>
          </div>

          {/* Overall Readiness Pill */}
          <div className="bg-[#142B52] text-white p-4 rounded-2xl flex items-center gap-4 self-start md:self-auto min-w-[240px] shadow-sm">
            <div className="flex-1">
              <div className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">
                সারগ্রাহী মাধ্যমিক প্রস্তুতি
              </div>
              <div className="text-2xl font-extrabold font-mono text-[#18A889]">
                {totalPercent}% সম্পন্ন
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                {completedAllCount} / {totalAllChapters} অধ্যায় সম্পন্ন
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs font-mono text-emerald-300">
              {totalPercent}%
            </div>
          </div>
        </div>

        {/* Current Subject Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>
              {selectedSubject.nameBn} ({selectedSubject.nameEn}) প্রস্তুতি:
            </span>
            <span className="text-[#18A889] font-mono">
              {subjectCompletedCount} / {subjectChapters.length} অধ্যায় ({subjectPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#18A889] transition-all duration-500 rounded-full"
              style={{ width: `${subjectPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapter Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chap, idx) => {
          const isDone = Boolean(completedChapters[chap.id]);

          return (
            <div
              key={chap.id}
              onClick={() => toggleChapter(chap.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-sm ${
                isDone
                  ? "bg-[#E8F7F4]/60 border-[#18A889]/40"
                  : "bg-white border-slate-200/90 hover:border-slate-300"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      className={`transition-colors ${
                        isDone ? "text-[#18A889]" : "text-slate-300 hover:text-slate-400"
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 fill-[#E8F7F4]" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                    <span
                      className={`text-xs font-mono font-bold ${
                        isDone ? "text-[#12836B]" : "text-slate-400"
                      }`}
                    >
                      অধ্যায় {idx + 1}
                    </span>
                  </div>

                  {chap.marksWeightage && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                      {chap.marksWeightage}
                    </span>
                  )}
                </div>

                <h3
                  className={`text-sm md:text-base font-bold ${
                    isDone ? "text-[#12836B] line-through opacity-85" : "text-[#142B52]"
                  }`}
                >
                  {chap.titleBn}
                </h3>

                <ul className="space-y-1 text-xs text-slate-600 pt-1">
                  {chap.subtopics.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      <span className="leading-snug">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className={isDone ? "text-[#18A889] font-bold" : "text-slate-400"}>
                  {isDone ? "✓ রিভিশন সম্পন্ন" : "অসম্পূর্ণ (ক্লিক করে সম্পন্ন করুন)"}
                </span>
                <span className="text-slate-400 font-medium">{chap.titleEn}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
