import React, { useState } from "react";
import {
  ImportantQuestionRecord,
  StudentClass,
  SubjectInfo,
} from "../types";
import {
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
} from "lucide-react";

interface MostImportantQuestionsViewProps {
  currentClass: StudentClass;
  onChangeClass: (cls: StudentClass) => void;
  subjects: SubjectInfo[];
  questions: ImportantQuestionRecord[];
  onAddBookmark?: (title: string, content: string, subject: string) => void;
}

export const MostImportantQuestionsView: React.FC<MostImportantQuestionsViewProps> = ({
  currentClass,
  onChangeClass,
  subjects,
  questions,
  onAddBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", label: "সব ক্যাটাগরি" },
    { id: "very_important", label: "অতি গুরুত্বপূর্ণ (V.I.P / ৩-৫ নম্বর)" },
    { id: "frequently_practised", label: "বারবার আসা প্রশ্নাবলী" },
    { id: "previous_year", label: "বিগত বছরের প্রশ্ন (PYQ)" },
    { id: "exam_prep", label: "পরীক্ষা প্রস্তুতি" },
    { id: "important", label: "গুরুত্বপূর্ণ অন্যান্য" },
  ];

  // Filter questions for current class
  const classQuestions = questions.filter((q) => q.classId === currentClass);

  const filteredQuestions = classQuestions.filter((q) => {
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    const matchesSubject = selectedSubject === "all" || q.subjectId === selectedSubject;
    const matchesSearch =
      !searchQuery.trim() ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subjectNameBn.includes(searchQuery);

    return matchesCategory && matchesSubject && matchesSearch;
  });

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyQuestion = (q: ImportantQuestionRecord) => {
    const text = `[ZENTIX WB — ${q.subjectNameBn}] (মান: ${q.marks})\nঅধ্যায়: ${q.chapter}\nপ্রশ্ন: ${q.question}\n\nউত্তর / সমাধান:\n${q.solution}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBookmarkToggle = (q: ImportantQuestionRecord) => {
    const isBookmarked = bookmarkedIds[q.id];
    setBookmarkedIds((prev) => ({ ...prev, [q.id]: !isBookmarked }));
    if (!isBookmarked && onAddBookmark) {
      onAddBookmark(
        `${q.subjectNameBn}: ${q.question.slice(0, 60)}...`,
        `অধ্যায়: ${q.chapter}\nমান: ${q.marks}\n\nউত্তর: ${q.solution}`,
        q.subjectId
      );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#142B52] via-[#1E3A6C] to-[#2752CA] rounded-3xl p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Most Important Questions • অতি গুরুত্বপূর্ণ প্রশ্নোত্তর সম্ভার</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {currentClass === "class_10"
                ? "মাধ্যমিক ১০০% প্রস্তুতি: সবচেয়ে গুরুত্বপূর্ণ প্রশ্নোত্তর"
                : "ষষ্ঠ শ্রেণি পর্যায়ক্রমিক মূল্যায়ন: অতি প্রয়োজনীয় প্রশ্নোত্তর"}
            </h1>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
              অভিজ্ঞ শিক্ষকমণ্ডলী ও বিগত ২০ বছরের বোর্ড পরীক্ষার প্রশ্নকাঠামো বিশ্লেষণ করে বাছাই করা গুরুত্বপূর্ণ প্রশ্নাবলি এবং সহজ ধাপে ধাপে সমাধান।
            </p>
          </div>

          {/* Class Switcher */}
          <div className="bg-[#0D1C36]/80 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col gap-1.5 self-start lg:self-auto min-w-[200px]">
            <div className="text-[11px] font-bold text-slate-300 px-2 py-0.5 uppercase tracking-wider flex items-center justify-between">
              <span>শ্রেণি:</span>
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onChangeClass("class_6")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentClass === "class_6"
                    ? "bg-[#18A889] text-white shadow-sm"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                ষষ্ঠ শ্রেণি
              </button>

              <button
                onClick={() => onChangeClass("class_10")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentClass === "class_10"
                    ? "bg-[#3867E8] text-white shadow-sm"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                দশম শ্রেণি
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory / Ethical Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">সতর্কতামূলক বিজ্ঞপ্তি (Important Disclaimer):</strong>
          <span className="ml-1">
            এই বিভাগে সংকলিত প্রশ্নোত্তরসমূহ শিক্ষার্থীদের ধারণা স্পষ্ট করা এবং বিগত বছরের গুরুত্বপূর্ণ ধারার প্রস্তুতির সহায়ক। পরীক্ষায় নিশ্চিত কমন আসার কোনো অবাস্তব দাবি বা নিশ্চয়তা দেওয়া হয় না। পরীক্ষার্থীদের সম্পূর্ণ পাঠ্যবই মনোযোগ দিয়ে পড়ার পরামর্শ দেওয়া হচ্ছে।
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="গুরুত্বপূর্ণ প্রশ্ন বা অধ্যায় খুঁজুন (যেমন: ওহমের সূত্র, উপপাদ্য, মেন্ডেল, দ্বিঘাত সমীকরণ)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Subject Dropdown */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
          >
            <option value="all">সকল বিষয়</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nameBn}
              </option>
            ))}
          </select>

          {/* Categories horizontal list */}
          <div className="flex items-center gap-1.5 w-full overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#142B52] dark:bg-[#3867E8] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>মোট {filteredQuestions.length} টি গুরুত্বপূর্ণ প্রশ্ন</span>
          <span>উত্তর দেখতে "সমাধান দেখুন" এ ক্লিক করুন</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-[#14203D] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#142B52] dark:text-white">
              কোনো প্রশ্ন পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              অনুগ্রহ করে ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const isRevealed = revealedSolutions[q.id];
              const isBookmarked = bookmarkedIds[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-[#14203D] rounded-3xl p-5 md:p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-2xs space-y-3.5"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#3867E8] dark:text-blue-300">
                        {q.subjectNameBn}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {q.chapter}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {q.categoryNameBn}
                      </span>
                      {q.year && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {q.year} Board
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopyQuestion(q)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="প্রশ্ন কপি করুন"
                      >
                        {copiedId === q.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleBookmarkToggle(q)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg transition-colors cursor-pointer"
                        title="সংরক্ষণ করুন"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <div className="font-mono text-xs font-extrabold px-2 py-1 rounded-lg bg-[#142B52] dark:bg-blue-900/60 text-white">
                        মান: {q.marks}
                      </div>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-sm md:text-base font-extrabold text-[#142B52] dark:text-white leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Difficulty & Source tag */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="capitalize">
                      কাঠিন্যের স্তর: <strong className="text-slate-600 dark:text-slate-300">{q.difficulty}</strong>
                    </span>
                    {q.source && <span>উৎস: {q.source}</span>}
                  </div>

                  {/* Solution Area */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="text-xs font-bold text-[#3867E8] dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{isRevealed ? "সমাধান লুকান" : "সম্পূর্ণ উত্তর / সমাধান দেখুন"}</span>
                    </button>

                    {isRevealed && (
                      <div className="mt-3 p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs md:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 leading-relaxed whitespace-pre-line animate-fadeIn">
                        <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>আদর্শ উত্তর ও ধাপসমূহ:</span>
                        </div>
                        <div className="pt-1">{q.solution}</div>
                      </div>
                    )}
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
