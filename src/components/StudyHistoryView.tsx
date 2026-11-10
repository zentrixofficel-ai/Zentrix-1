import React, { useState } from "react";
import { HistoryItem, SubjectId, NavTab } from "../types";
import { SUBJECTS } from "../data/madhyamikData";
import {
  History,
  Trash2,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bot,
  BookOpen,
  FileText,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface StudyHistoryViewProps {
  history: HistoryItem[];
  onClearAll: () => void;
  onDeleteItem: (id: string) => void;
  onSelectTab: (tab: NavTab) => void;
  onSelectSubject: (sub: SubjectId) => void;
}

export const StudyHistoryView: React.FC<StudyHistoryViewProps> = ({
  history,
  onClearAll,
  onDeleteItem,
  onSelectTab,
  onSelectSubject,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredHistory = history.filter((item) => {
    const matchesType =
      selectedFilter === "all" ||
      (selectedFilter === "quiz" && item.type === "quiz_attempt") ||
      (selectedFilter === "tutor" && item.type === "tutor_query") ||
      (selectedFilter === "chapter" && item.type === "chapter_read") ||
      (selectedFilter === "note" && item.type === "note_created");

    const matchesSubject =
      subjectFilter === "all" || item.subject === subjectFilter;

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.details && item.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.subjectNameBn.includes(searchQuery);

    return matchesType && matchesSubject && matchesSearch;
  });

  const getItemIcon = (type: HistoryItem["type"]) => {
    switch (type) {
      case "quiz_attempt":
        return <HelpCircle className="w-5 h-5 text-[#3867E8]" />;
      case "tutor_query":
        return <Bot className="w-5 h-5 text-[#18A889]" />;
      case "chapter_read":
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case "note_created":
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <History className="w-5 h-5 text-slate-400" />;
    }
  };

  const formatTimestamp = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#3867E8] text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>অধ্যয়ন ইতিহাস ও ট্র্যাকিং</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#142B52] dark:text-white">
            আপনার প্রস্তুতি ও ইতিহাস
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            আপনি যা কিছু চর্চা করেছেন, কুইজ স্কোর, AI মাস্টারমশাইয়ের প্রশ্নাবলী এবং নোটের সম্পূর্ণ বিবরণ।
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("আপনি কি নিশ্চিত যে সম্পূর্ণ ইতিহাস মুছে ফেলতে চান?")) {
                onClearAll();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>সব মুছে ফেলুন</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#14203D] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ইতিহাস খুঁজুন (বিষয়, প্রশ্ন, অধ্যায়)..."
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "সব" },
            { id: "quiz", label: "কুইজ" },
            { id: "tutor", label: "AI টিউটর" },
            { id: "chapter", label: "অধ্যায়" },
            { id: "note", label: "নোট" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[#142B52] dark:bg-[#3867E8] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subject Filter */}
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3867E8] w-full md:w-auto"
        >
          <option value="all">সকল বিষয়</option>
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nameBn} ({s.nameEn})
            </option>
          ))}
        </select>
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#3867E8] mx-auto flex items-center justify-center">
            <History className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-base font-bold text-[#142B52] dark:text-white">
            কোনো অধ্যয়নের ইতিহাস পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            আপনি কুইজ অনুশীলন করলে, অধ্যায় পড়লে অথবা AI মাস্টারমশাইকে প্রশ্ন করলে এখানে তালিকাভুক্ত হবে।
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onSelectTab("quiz")}
              className="px-4 py-2 bg-[#3867E8] hover:bg-[#2752CA] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              কুইজ শুরু করুন
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#14203D] rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-2xs flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 mt-0.5 shrink-0">
                  {getItemIcon(item.type)}
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#142B52]/10 dark:bg-blue-900/40 text-[#142B52] dark:text-blue-300">
                      {item.subjectNameBn}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug break-words">
                    {item.title}
                  </h4>

                  {item.score && (
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-slate-500 dark:text-slate-400">স্কোর:</span>
                      <span className="font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        {item.score.correct} / {item.score.total} সঠিক ({Math.round((item.score.correct / item.score.total) * 100)}%)
                      </span>
                    </div>
                  )}

                  {item.details && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {item.details}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    onSelectSubject(item.subject);
                    if (item.type === "quiz_attempt") onSelectTab("quiz");
                    else if (item.type === "tutor_query") onSelectTab("tutor");
                    else if (item.type === "chapter_read") onSelectTab("syllabus");
                    else if (item.type === "note_created") onSelectTab("notes");
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#3867E8] hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="পুনরায় খুলুন"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
