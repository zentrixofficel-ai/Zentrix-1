import React, { useState, useMemo } from "react";
import {
  QuestionPaperItem,
  StudentClass,
  SubjectInfo,
  ExamType,
  VerificationStatus,
} from "../types";
import {
  ALL_YEARS_MADHYAMIK,
  ALL_YEARS_CLASS_6,
  EXAM_TYPES_LABELS,
  VERIFICATION_LABELS,
} from "../data/questionPapersData";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowUpDown,
  GraduationCap,
  Layers,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

interface QuestionPaperLibraryViewProps {
  currentClass: StudentClass;
  onChangeClass: (newClass: StudentClass) => void;
  subjects: SubjectInfo[];
  questionPapers: QuestionPaperItem[];
  onOpenPdfViewer: (paper: QuestionPaperItem) => void;
  onSaveOffline?: (paper: QuestionPaperItem) => void;
  savedOfflineIds?: string[];
}

export const QuestionPaperLibraryView: React.FC<QuestionPaperLibraryViewProps> = ({
  currentClass,
  onChangeClass,
  subjects,
  questionPapers,
  onOpenPdfViewer,
  onSaveOffline,
  savedOfflineIds = [],
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedExamType, setSelectedExamType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"year_desc" | "year_asc" | "title">("year_desc");

  const availableYears = currentClass === "class_10" ? ALL_YEARS_MADHYAMIK : ALL_YEARS_CLASS_6;

  // Filter papers for current class
  const classPapers = useMemo(() => {
    return questionPapers.filter((p) => p.classId === currentClass);
  }, [questionPapers, currentClass]);

  // Apply filters
  const filteredPapers = useMemo(() => {
    return classPapers
      .filter((paper) => {
        const matchesSubject = selectedSubject === "all" || paper.subjectId === selectedSubject;
        const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear;
        const matchesExamType = selectedExamType === "all" || paper.examType === selectedExamType;
        const matchesSearch =
          !searchQuery.trim() ||
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.subjectNameBn.includes(searchQuery) ||
          paper.source.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSubject && matchesYear && matchesExamType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "year_desc") return b.year - a.year;
        if (sortBy === "year_asc") return a.year - b.year;
        return a.title.localeCompare(b.title);
      });
  }, [classPapers, selectedSubject, selectedYear, selectedExamType, searchQuery, sortBy]);

  // Check if a specific year was selected and has no papers
  const isSelectedYearUnavailable =
    selectedYear !== "all" &&
    filteredPapers.length === 0 &&
    !searchQuery.trim() &&
    selectedSubject === "all" &&
    selectedExamType === "all";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner with Class Switcher */}
      <div className="bg-gradient-to-r from-[#142B52] via-[#1E3A6C] to-[#2752CA] rounded-3xl p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/15">
              <span className="font-mono bg-white/20 text-white px-1.5 py-0.2 rounded text-[10px] font-bold">
                Zx Archive
              </span>
              <span>All Question Papers • সম্পূর্ণ প্রশ্নপত্র সংগ্রহশালা</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {currentClass === "class_10"
                ? "মাধ্যমিক বিগত বছরের প্রশ্নপত্র (২০০০ – ২০২৬)"
                : "ষষ্ঠ শ্রেণি পর্যায়ক্রমিক ও বার্ষিক প্রশ্নপত্র সংগ্রহ"}
            </h1>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
              {currentClass === "class_10"
                ? "পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের আসল বোর্ড প্রশ্নপত্র, টেস্ট পেপার, মডেল প্রশ্ন ও বিষয়ভিত্তিক সংকলন। আসল বোর্ড পেপার ও মডেল পেপারের নির্ভরযোগ্য সংগ্রহ।"
                : "প্রথম, দ্বিতীয় ও তৃতীয় পর্যায়ক্রমিক মূল্যায়ন (1st, 2nd, 3rd Summative) এবং বিভিন্ন জেলার সেরা স্কুলগুলির নমুনা প্রশ্নপত্র।"}
            </p>
          </div>

          {/* Class Switcher Pill */}
          <div className="bg-[#0D1C36]/80 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col gap-1.5 self-start lg:self-auto min-w-[220px]">
            <div className="text-[11px] font-bold text-slate-300 px-2 py-0.5 uppercase tracking-wider flex items-center justify-between">
              <span>শ্রেণি পরিবর্তন করুন:</span>
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  onChangeClass("class_6");
                  setSelectedSubject("all");
                  setSelectedYear("all");
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentClass === "class_6"
                    ? "bg-[#18A889] text-white shadow-sm scale-102"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                ষষ্ঠ শ্রেণি (Class 6)
              </button>

              <button
                onClick={() => {
                  onChangeClass("class_10");
                  setSelectedSubject("all");
                  setSelectedYear("all");
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentClass === "class_10"
                    ? "bg-[#3867E8] text-white shadow-sm scale-102"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                দশম শ্রেণি (Madhyamik)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Advanced Filters Bar */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="প্রশ্নপত্র খুঁজুন (যেমন: ২০২৫ গণিত, ভৌত বিজ্ঞান মডেল পেপার, টেস্ট পরীক্ষা)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
          />
        </div>

        {/* Dropdowns Filter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Subject Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
              বিষয় (Subject)
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            >
              <option value="all">সকল বিষয় ({subjects.length})</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.nameBn}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
              বছর (Year)
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            >
              <option value="all">সকল বছর ({availableYears.length})</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr.toString()}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
              পরীক্ষার ধরন (Exam Type)
            </label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            >
              <option value="all">সকল ধরন</option>
              {Object.entries(EXAM_TYPES_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.bn}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
              সাজান (Sort By)
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            >
              <option value="year_desc">বছর: নতুন থেকে পুরাতন</option>
              <option value="year_asc">বছর: পুরাতন থেকে নতুন</option>
              <option value="title">শিরোনাম অনুসারে (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Quick Year Chips (horizontal scrollable) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> দ্রুত বছর বাছাই:
          </span>
          <button
            onClick={() => setSelectedYear("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
              selectedYear === "all"
                ? "bg-[#142B52] dark:bg-[#3867E8] text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            সব
          </button>
          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr.toString())}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-colors shrink-0 cursor-pointer ${
                selectedYear === yr.toString()
                  ? "bg-[#3867E8] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Question Papers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            মোট <span className="font-mono text-[#3867E8] font-black">{filteredPapers.length}</span> টি প্রশ্নপত্র উপলব্ধ
          </div>

          <div className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            ✓ আসল বোর্ড পেপার ও মডেল পেপার স্বতন্ত্রভাবে চিহ্নিত
          </div>
        </div>

        {/* Missing / Unavailable Year State */}
        {isSelectedYearUnavailable ? (
          <div className="bg-white dark:bg-[#14203D] rounded-3xl p-12 text-center border-2 border-dashed border-amber-300 dark:border-amber-700/80 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-[#142B52] dark:text-white">
              Question Paper Not Available Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              {selectedYear} সালের আসল প্রশ্নপত্রটি এখনও আমাদের আর্কাইভ দল কর্তৃক ডিজিটাইজ বা সংগৃহীত হয়নি। কোনো বানোয়াট প্রশ্নপত্র প্রদর্শন করা কঠোরভাবে নিষিদ্ধ। খুব শীঘ্রই অনুমোদিত সূত্র থেকে এটি যুক্ত করা হবে।
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSelectedYear("all")}
                className="px-4 py-2 rounded-xl bg-[#3867E8] text-white text-xs font-bold shadow-xs hover:bg-[#2752CA] transition-colors cursor-pointer"
              >
                অন্যান্য বছরের প্রশ্নপত্র দেখুন
              </button>
            </div>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="bg-white dark:bg-[#14203D] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-[#142B52] dark:text-white">
              কোনো প্রশ্নপত্র পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              অনুগ্রহ করে ফিল্টার বা অনুসন্ধানের শব্দ পরিবর্তন করে পুনরায় চেষ্টা করুন।
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedSubject("all");
                  setSelectedYear("all");
                  setSelectedExamType("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper) => {
              const verif = VERIFICATION_LABELS[paper.verificationStatus] || VERIFICATION_LABELS.model_paper;
              const exam = EXAM_TYPES_LABELS[paper.examType] || { bn: paper.examType, en: paper.examType };
              const isSaved = savedOfflineIds.includes(paper.id);

              return (
                <div
                  key={paper.id}
                  className="bg-white dark:bg-[#14203D] rounded-3xl p-5 md:p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-[#142B52] dark:bg-blue-900/60 text-white">
                          {paper.year}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#3867E8] dark:text-blue-300">
                          {paper.subjectNameBn}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {exam.bn}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {onSaveOffline && (
                          <button
                            onClick={() => onSaveOffline(paper)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isSaved
                                ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title={isSaved ? "অফলাইনে সংরক্ষিত" : "অফলাইনে সেভ করুন"}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-sm md:text-base font-extrabold text-[#142B52] dark:text-white leading-snug">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {paper.description}
                      </p>
                    </div>

                    {/* Verification & Source */}
                    <div className="pt-2 flex flex-col gap-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-md font-bold border text-[10px] ${verif.badgeClass}`}>
                          {verif.bn}
                        </span>
                      </div>

                      <div className="text-slate-400 font-mono flex items-center justify-between">
                        <span>উৎস: {paper.source}</span>
                        <span>{paper.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-400 font-mono">
                      পূর্ণমান: <strong>{paper.totalMarks}</strong> | ৩ ঘণ্টা
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenPdfViewer(paper)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-[#142B52] dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#3867E8]" />
                        <span>অনলাইনে দেখুন</span>
                      </button>

                      <button
                        onClick={() => onOpenPdfViewer(paper)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#18A889] hover:bg-[#12836B] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF ডাউনলোড</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
