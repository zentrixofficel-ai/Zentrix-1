import React, { useState } from "react";
import {
  QuestionPaperItem,
  ImportantQuestionRecord,
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
  Shield,
  Upload,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  FolderPlus,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  Settings,
  X,
  AlertCircle,
} from "lucide-react";

interface AdminDashboardViewProps {
  currentClass: StudentClass;
  onChangeClass: (cls: StudentClass) => void;
  subjects: SubjectInfo[];
  onAddSubject: (subject: SubjectInfo) => void;
  onRemoveSubject: (id: string) => void;
  questionPapers: QuestionPaperItem[];
  onAddQuestionPaper: (paper: QuestionPaperItem) => void;
  onDeleteQuestionPaper: (id: string) => void;
  onTogglePublishPaper: (id: string) => void;
  importantQuestions: ImportantQuestionRecord[];
  onAddImportantQuestion: (q: ImportantQuestionRecord) => void;
  onDeleteImportantQuestion: (id: string) => void;
  onResetToDefaultArchive: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentClass,
  onChangeClass,
  subjects,
  onAddSubject,
  onRemoveSubject,
  questionPapers,
  onAddQuestionPaper,
  onDeleteQuestionPaper,
  onTogglePublishPaper,
  importantQuestions,
  onAddImportantQuestion,
  onDeleteImportantQuestion,
  onResetToDefaultArchive,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<"papers" | "questions" | "subjects">(
    "papers"
  );

  // New Question Paper Form State
  const [showAddPaperModal, setShowAddPaperModal] = useState<boolean>(false);
  const [paperClass, setPaperClass] = useState<StudentClass>(currentClass);
  const [paperSubject, setPaperSubject] = useState<string>(subjects[0]?.id || "bengali");
  const [paperYear, setPaperYear] = useState<number>(2026);
  const [paperExamType, setPaperExamType] = useState<ExamType>("board_final");
  const [paperTitle, setPaperTitle] = useState<string>("");
  const [paperDesc, setPaperDesc] = useState<string>("");
  const [paperSource, setPaperSource] = useState<string>("WBBSE Official Board Paper");
  const [paperVerif, setPaperVerif] = useState<VerificationStatus>("verified_board");
  const [paperMarks, setPaperMarks] = useState<number>(90);
  const [paperDuration, setPaperDuration] = useState<number>(195);
  const [paperFileSize, setPaperFileSize] = useState<string>("2.5 MB");

  // New Question Form State
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [qSubject, setQSubject] = useState<string>(subjects[0]?.id || "bengali");
  const [qChapter, setQChapter] = useState<string>("");
  const [qCategory, setQCategory] = useState<ImportantQuestionRecord["category"]>("very_important");
  const [qMarks, setQMarks] = useState<number>(3);
  const [qType, setQType] = useState<ImportantQuestionRecord["questionType"]>("analytical");
  const [qText, setQText] = useState<string>("");
  const [qSolution, setQSolution] = useState<string>("");
  const [qDifficulty, setQDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  // New Subject Form State
  const [newSubNameBn, setNewSubNameBn] = useState<string>("");
  const [newSubNameEn, setNewSubNameEn] = useState<string>("");

  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim()) return;

    const subInfo = subjects.find((s) => s.id === paperSubject);
    const examLabel = EXAM_TYPES_LABELS[paperExamType]?.bn || paperExamType;

    const newPaper: QuestionPaperItem = {
      id: "paper_" + Date.now(),
      classId: paperClass,
      subjectId: paperSubject,
      subjectNameBn: subInfo?.nameBn || paperSubject,
      year: paperYear,
      examType: paperExamType,
      examTypeNameBn: examLabel,
      title: paperTitle.trim(),
      description: paperDesc.trim() || `${subInfo?.nameBn} বিষয়ের প্রশ্নপত্র সংকলন`,
      fileSize: paperFileSize.trim() || "2.1 MB",
      source: paperSource.trim() || "WBBSE Archive",
      verificationStatus: paperVerif,
      isAvailable: true,
      totalMarks: paperMarks,
      durationMinutes: paperDuration,
      uploadedAt: new Date().toISOString().slice(0, 10),
      isPublished: true,
    };

    onAddQuestionPaper(newPaper);
    setShowAddPaperModal(false);
    setPaperTitle("");
    setPaperDesc("");
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qSolution.trim()) return;

    const subInfo = subjects.find((s) => s.id === qSubject);
    const newQ: ImportantQuestionRecord = {
      id: "iq_" + Date.now(),
      classId: currentClass,
      subjectId: qSubject,
      subjectNameBn: subInfo?.nameBn || qSubject,
      chapter: qChapter.trim() || "সাধারণ গুরুত্বপূর্ণ",
      category: qCategory,
      categoryNameBn:
        qCategory === "very_important"
          ? "অতি গুরুত্বপূর্ণ (V.I.P)"
          : qCategory === "frequently_practised"
          ? "বারবার আসা প্রশ্ন"
          : "পরীক্ষা প্রস্তুতি",
      marks: qMarks,
      questionType: qType,
      question: qText.trim(),
      solution: qSolution.trim(),
      difficulty: qDifficulty,
      year: 2025,
      source: "ZENTIX WB Teacher Panel",
    };

    onAddImportantQuestion(newQ);
    setShowAddQuestionModal(false);
    setQText("");
    setQSolution("");
    setQChapter("");
  };

  const handleCreateSubject = () => {
    if (!newSubNameBn.trim() || !newSubNameEn.trim()) return;
    const subId = newSubNameEn.toLowerCase().replace(/\s+/g, "_") + "_" + (currentClass === "class_6" ? "6" : "10");
    const newSub: SubjectInfo = {
      id: subId,
      classId: currentClass,
      nameBn: newSubNameBn.trim(),
      nameEn: newSubNameEn.trim(),
      iconName: "BookOpen",
      color: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50 text-blue-900 border-blue-200",
      badgeBg: "bg-blue-100 text-blue-800",
      totalChapters: 8,
      description: `${newSubNameBn.trim()} বিষয় পাঠ্যক্রম`,
    };
    onAddSubject(newSub);
    setNewSubNameBn("");
    setNewSubNameEn("");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-[#142B52] via-[#0D1C36] to-[#1E3A6C] rounded-3xl p-6 md:p-8 text-white shadow-lg border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Shield className="w-3.5 h-3.5" />
              <span>ADMINISTRATOR CONTROL PANEL • ZENTIX WB</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black">
              প্রশ্নপত্র ও শিক্ষা উপকরণ অ্যাডমিন ড্যাশবোর্ড
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              ষষ্ঠ ও দশম শ্রেণির নতুন প্রশ্নপত্র আপলোড, আসল বোর্ড পেপারের সত্যতা যাচাই, গুরুত্বপূর্ণ প্রশ্ন সমাধান সহ যোগ করা এবং বিষয় পরিচালনা করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm("ডিফল্ট আর্কাইভ রিসেট করতে চান? এতে পূর্বের সমস্ত আসল পেপার পুনরায় লোড হবে।")) {
                  onResetToDefaultArchive();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্ট আর্কাইভ সিড</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15">
          {[
            { id: "papers", label: "প্রশ্নপত্র সংগ্রহ পরিচালনা", icon: FileText },
            { id: "questions", label: "অতি গুরুত্বপূর্ণ প্রশ্ন সম্ভার", icon: HelpCircle },
            { id: "subjects", label: "বিষয় পরিচালনা (Subjects)", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#3867E8] text-white shadow-sm"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. QUESTION PAPERS MANAGEMENT */}
      {activeAdminTab === "papers" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#14203D] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-sm md:text-base text-[#142B52] dark:text-white">
                মোট প্রশ্নপত্র: {questionPapers.length} টি
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ষষ্ঠ ও দশম শ্রেণির আসল বোর্ড প্রশ্নপত্র, মডেল প্রশ্নপত্র এবং টেস্ট পেপার পরিচালনা।
              </p>
            </div>

            <button
              onClick={() => setShowAddPaperModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#18A889] hover:bg-[#12836B] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>নতুন প্রশ্নপত্র আপলোড / যোগ করুন</span>
            </button>
          </div>

          {/* Paper Add Modal */}
          {showAddPaperModal && (
            <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border-2 border-[#3867E8] shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-[#142B52] dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#3867E8]" />
                  <span>নতুন প্রশ্নপত্র আপলোড ও তথ্য ফরম</span>
                </h3>
                <button
                  onClick={() => setShowAddPaperModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePaper} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      শ্রেণি নির্বাচন:
                    </label>
                    <select
                      value={paperClass}
                      onChange={(e) => setPaperClass(e.target.value as StudentClass)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    >
                      <option value="class_10">দশম শ্রেণি (Class 10 Madhyamik)</option>
                      <option value="class_6">ষষ্ঠ শ্রেণি (Class 6)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিষয়:
                    </label>
                    <select
                      value={paperSubject}
                      onChange={(e) => setPaperSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nameBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বছর:
                    </label>
                    <select
                      value={paperYear}
                      onChange={(e) => setPaperYear(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold"
                    >
                      {ALL_YEARS_MADHYAMIK.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      পরীক্ষার ধরন:
                    </label>
                    <select
                      value={paperExamType}
                      onChange={(e) => setPaperExamType(e.target.value as ExamType)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    >
                      {Object.entries(EXAM_TYPES_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.bn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      যাচাইকরণের স্তর (Verification):
                    </label>
                    <select
                      value={paperVerif}
                      onChange={(e) => setPaperVerif(e.target.value as VerificationStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    >
                      {Object.entries(VERIFICATION_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.bn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ডকুমেন্ট উৎস (Source):
                    </label>
                    <input
                      type="text"
                      value={paperSource}
                      onChange={(e) => setPaperSource(e.target.value)}
                      placeholder="যেমন: WBBSE Official Board Archive"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    প্রশ্নপত্রের শিরোনাম (Title) <span className="text-rose-500">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="যেমন: মাধ্যমিক ২০২৬ ভৌত বিজ্ঞান অফিসিয়াল মডেল প্রশ্নপত্র"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সংক্ষিপ্ত বিবরণ ও অধ্যায় সংকেত:
                  </label>
                  <textarea
                    rows={2}
                    value={paperDesc}
                    onChange={(e) => setPaperDesc(e.target.value)}
                    placeholder="প্রশ্নপত্রের বিশেষ নির্দেশনা বা অধ্যায়ভিত্তিক বিবরণ..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPaperModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#18A889] hover:bg-[#12836B] text-white font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>প্রশ্নপত্র সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table of Papers */}
          <div className="bg-white dark:bg-[#14203D] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 font-mono uppercase text-[11px]">
                  <tr>
                    <th className="px-4 py-3">বছর / শ্রেণি</th>
                    <th className="px-4 py-3">বিষয়</th>
                    <th className="px-4 py-3">শিরোনাম</th>
                    <th className="px-4 py-3">ধরন ও সত্যতা</th>
                    <th className="px-4 py-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                  {questionPapers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold whitespace-nowrap">
                        <span className="text-[#3867E8]">{paper.year}</span>
                        <div className="text-[10px] text-slate-400">
                          {paper.classId === "class_6" ? "Class 6" : "Class 10"}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold whitespace-nowrap">
                        {paper.subjectNameBn}
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate font-medium">
                        {paper.title}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-semibold">
                          {paper.examTypeNameBn}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => onTogglePublishPaper(paper.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            paper.isPublished !== false
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-slate-400 hover:bg-slate-100"
                          }`}
                          title={paper.isPublished !== false ? "প্রকাশিত" : "অপ্রকাশিত"}
                        >
                          {paper.isPublished !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => onDeleteQuestionPaper(paper.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. IMPORTANT QUESTIONS MANAGEMENT */}
      {activeAdminTab === "questions" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#14203D] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-sm md:text-base text-[#142B52] dark:text-white">
                মোট গুরুত্বপূর্ণ প্রশ্ন: {importantQuestions.length} টি
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                অধ্যায়ভিত্তিক অতি গুরুত্বপূর্ণ (V.I.P) প্রশ্ন ও সমাধান পরিচালনা করুন।
              </p>
            </div>

            <button
              onClick={() => setShowAddQuestionModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#3867E8] hover:bg-[#2752CA] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন গুরুত্বপূর্ণ প্রশ্ন যোগ করুন</span>
            </button>
          </div>

          {/* Add Question Form Modal */}
          {showAddQuestionModal && (
            <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border-2 border-[#18A889] shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-[#142B52] dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#18A889]" />
                  <span>নতুন গুরুত্বপূর্ণ প্রশ্নোত্তর প্রস্তুতকরণ</span>
                </h3>
                <button
                  onClick={() => setShowAddQuestionModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিষয়:
                    </label>
                    <select
                      value={qSubject}
                      onChange={(e) => setQSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nameBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      অধ্যায় / টপিক:
                    </label>
                    <input
                      type="text"
                      required
                      value={qChapter}
                      onChange={(e) => setQChapter(e.target.value)}
                      placeholder="যেমন: গ্যাসের আচরণ / চলতড়িৎ"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ক্যাটাগরি:
                    </label>
                    <select
                      value={qCategory}
                      onChange={(e) => setQCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                    >
                      <option value="very_important">অতি গুরুত্বপূর্ণ (V.I.P)</option>
                      <option value="frequently_practised">বারবার আসা প্রশ্ন</option>
                      <option value="previous_year">বিগত বছরের প্রশ্ন (PYQ)</option>
                      <option value="exam_prep">পরীক্ষা প্রস্তুতি</option>
                      <option value="important">সাধারণ গুরুত্বপূর্ণ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      মান (Marks):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={qMarks}
                      onChange={(e) => setQMarks(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    প্রশ্ন (Question Text) <span className="text-rose-500">*</span>:
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    placeholder="সম্পূর্ণ প্রশ্নের বয়ান লিখুন..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    আদর্শ সমাধান / উত্তর সংকেত (Solution) <span className="text-rose-500">*</span>:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={qSolution}
                    onChange={(e) => setQSolution(e.target.value)}
                    placeholder="ধাপে ধাপে সঠিক সমাধান বা উত্তরের পয়েন্টগুলি লিখুন..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddQuestionModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#3867E8] hover:bg-[#2752CA] text-white font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>প্রশ্ন সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Questions list */}
          <div className="space-y-3">
            {importantQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white dark:bg-[#14203D] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#3867E8]">
                      {q.subjectNameBn}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {q.chapter}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-[#142B52] text-white px-2 py-0.5 rounded">
                      মান: {q.marks}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>
                </div>

                <button
                  onClick={() => onDeleteImportantQuestion(q.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SUBJECTS MANAGEMENT */}
      {activeAdminTab === "subjects" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm md:text-base text-[#142B52] dark:text-white">
              বর্তমান বিষয়সমূহ ({currentClass === "class_6" ? "ষষ্ঠ শ্রেণি" : "দশম শ্রেণি"})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-2"
                >
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-[#142B52] dark:text-white">
                      {sub.nameBn}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">{sub.nameEn}</p>
                  </div>

                  <button
                    onClick={() => onRemoveSubject(sub.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="বিষয় সরান"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new subject inline form */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                নতুন বিষয় যোগ করুন:
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={newSubNameBn}
                  onChange={(e) => setNewSubNameBn(e.target.value)}
                  placeholder="বাংলা নাম (যেমন: সমাজবিজ্ঞান)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
                <input
                  type="text"
                  value={newSubNameEn}
                  onChange={(e) => setNewSubNameEn(e.target.value)}
                  placeholder="ইংরেজি নাম (যেমন: Social Science)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
                <button
                  onClick={handleCreateSubject}
                  disabled={!newSubNameBn.trim() || !newSubNameEn.trim()}
                  className="px-4 py-2 rounded-xl bg-[#3867E8] hover:bg-[#2752CA] disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  যোগ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
