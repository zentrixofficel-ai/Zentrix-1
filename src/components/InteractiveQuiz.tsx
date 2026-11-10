import React, { useState, useEffect } from "react";
import { Question, SubjectId, PracticeSet, HistoryItem, BookmarkItem } from "../types";
import { SUBJECTS, SYLLABUS_MAP, SAMPLE_QUESTIONS } from "../data/madhyamikData";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Loader2,
  BookOpen,
  Filter,
  Check,
  ChevronRight,
  Flame,
  Volume2,
  Trophy,
  Award,
  Share2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

interface InteractiveQuizProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  langMode: "bengali" | "english" | "both";
  onRecordScore: (isCorrect: boolean) => void;
  onLogHistory?: (item: HistoryItem) => void;
  onAddBookmark?: (bookmark: BookmarkItem) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  currentSubject,
  onSelectSubject,
  langMode,
  onRecordScore,
  onLogHistory,
  onAddBookmark,
}) => {
  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];
  const chapters = SYLLABUS_MAP[currentSubject] || [];
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});

  // Quiz filters & questions state
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [filterType, setFilterType] = useState<"all" | "mcq" | "true_false">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User responses
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // AI Generator state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState<string>("");
  const [showGenModal, setShowGenModal] = useState<boolean>(false);

  // Load sample questions initially or when subject changes
  useEffect(() => {
    const list = SAMPLE_QUESTIONS[currentSubject] || [];
    setQuestions(list);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedQuestions({});
    setShowSummary(false);
    setGenerateError(null);
  }, [currentSubject]);

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    if (filterType !== "all" && q.type !== filterType) return false;
    if (filterDifficulty !== "all" && q.difficulty !== filterDifficulty) return false;
    return true;
  });

  const currentQ: Question | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (!currentQ || submittedQuestions[currentQ.id]) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const handleSubmitAnswer = () => {
    if (!currentQ) return;
    const answer = userAnswers[currentQ.id];
    if (!answer) return;

    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: true,
    }));

    const isRight = answer.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    onRecordScore(isRight);

    if (isRight) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#18A889", "#3867E8", "#F59E0B"],
      });
    }

    // Check if this was the last question
    const answeredCount = Object.keys(submittedQuestions).length + 1;
    if (answeredCount >= filteredQuestions.length && filteredQuestions.length > 0) {
      setTimeout(() => {
        setShowSummary(true);
        if (onLogHistory) {
          const currentTotalCorrect = totalCorrect + (isRight ? 1 : 0);
          onLogHistory({
            id: "hist_quiz_" + Date.now(),
            type: "quiz_attempt",
            title: `${selectedSubject.nameBn} - কুইজ অনুশীলন (${filteredQuestions.length}টি প্রশ্ন)`,
            subject: currentSubject,
            subjectNameBn: selectedSubject.nameBn,
            timestamp: new Date().toISOString(),
            score: { correct: currentTotalCorrect, total: filteredQuestions.length },
            details: `টপিক: ${currentQ.topic || selectedSubject.nameBn}, নির্ভুলতা: ${Math.round((currentTotalCorrect / filteredQuestions.length) * 100)}%`,
          });
        }
      }, 1500);
    }
  };

  const handleToggleBookmark = (q: Question) => {
    const isBookmarked = bookmarkedQuestions[q.id];
    setBookmarkedQuestions((prev) => ({ ...prev, [q.id]: !isBookmarked }));
    if (!isBookmarked && onAddBookmark) {
      onAddBookmark({
        id: "bm_" + q.id + "_" + Date.now(),
        type: "question",
        title: q.question.slice(0, 90) + (q.question.length > 90 ? "..." : ""),
        content: `সঠিক উত্তর: ${q.correctAnswer}\nব্যাখ্যা: ${q.explanation}`,
        subject: currentSubject,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmittedQuestions({});
    setCurrentIndex(0);
    setShowSummary(false);
  };

  // Generate dynamic questions using Gemini backend
  const handleGeneratePracticeSet = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const topicName =
        customTopic.trim() ||
        (selectedChapter !== "all"
          ? chapters.find((c) => c.id === selectedChapter)?.titleBn
          : chapters[0]?.titleBn || "WBBSE Madhyamik Syllabus");

      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedSubject.nameEn,
          topic: topicName,
          questionType: filterType === "all" ? "mcq" : filterType,
          count: 5,
          difficulty: filterDifficulty === "all" ? "medium" : filterDifficulty,
          language: langMode,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate questions");
      }

      const data: PracticeSet = await res.json();
      if (data.questions && data.questions.length > 0) {
        const formatted = data.questions.map((q) => ({
          ...q,
          subject: selectedSubject.nameEn,
          topic: data.topic || topicName,
        }));
        setQuestions(formatted);
        setCurrentIndex(0);
        setUserAnswers({});
        setSubmittedQuestions({});
        setShowSummary(false);
        setCustomTopic("");
        setShowGenModal(false);

        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        throw new Error("No questions received from AI tutor");
      }
    } catch (err: any) {
      console.error(err);
      setGenerateError(err.message || "Failed to generate questions");
    } finally {
      setIsGenerating(false);
    }
  };

  // Text-to-speech for question
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Count correct
  const totalAnswered = Object.keys(submittedQuestions).length;
  const totalCorrect = filteredQuestions.filter(
    (q) =>
      submittedQuestions[q.id] &&
      userAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
  ).length;

  const currentProgressPercent =
    filteredQuestions.length > 0
      ? Math.round(((currentIndex + 1) / filteredQuestions.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Subject Header & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] text-[#3867E8]">
                মক কুইজ এরিনা (Quiz Arena)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedSubject.nameBn} • {selectedSubject.nameEn}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              অধ্যায়ভিত্তিক বহুনির্বাচনী ও সত্য/মিথ্যা অনুশীলন
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              সঠিক বিকল্প নির্বাচন করে সাবমিট করুন। প্রতিটি উত্তরের বিশদ বিজ্ঞানসম্মত ব্যাখ্যা ও রিভিশন টিপস উপভোগ করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowGenModal(!showGenModal)}
              className="px-4 py-2 bg-gradient-to-r from-[#3867E8] to-[#2752CA] hover:from-[#2752CA] hover:to-[#1E3A6C] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI নতুন প্রশ্নপত্র তৈরি করুন</span>
            </button>

            <button
              onClick={handleResetQuiz}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="নতুন করে শুরু করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>রিসেট</span>
            </button>
          </div>
        </div>

        {/* AI Generator Collapsible Drawer */}
        {showGenModal && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#142B52] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#3867E8]" />
                Gemini AI দ্বারা নতুন WBBSE প্রশ্নপত্র প্রস্তুতকরণ:
              </span>
              <button
                onClick={() => setShowGenModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                বন্ধ করুন ✕
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder={`টপিক বা অধ্যায় লিখুন (যেমন: ${chapters[0]?.titleBn.slice(0, 35) || "গ্যাসের আচরণ, দ্বিঘাত সমীকরণ"})...`}
                className="flex-1 min-w-[240px] px-3.5 py-2 text-xs md:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]/30 font-medium"
              />

              <button
                onClick={handleGeneratePracticeSet}
                disabled={isGenerating}
                className="px-5 py-2 bg-[#18A889] hover:bg-[#12836B] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>তৈরি হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>জেনারেট করুন</span>
                  </>
                )}
              </button>
            </div>

            {generateError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                {generateError}
              </div>
            )}
          </div>
        )}

        {/* Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> ধরন:
            </span>
            <button
              onClick={() => {
                setFilterType("all");
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterType === "all"
                  ? "bg-[#142B52] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              সব ({questions.length})
            </button>
            <button
              onClick={() => {
                setFilterType("mcq");
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterType === "mcq"
                  ? "bg-[#142B52] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              MCQ (চার বিকল্প)
            </button>
            <button
              onClick={() => {
                setFilterType("true_false");
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                filterType === "true_false"
                  ? "bg-[#142B52] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              সত্য/মিথ্যা
            </button>
          </div>

          {/* Quick Score Counter */}
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-xs">
            <span className="text-slate-500">স্কোর:</span>
            <span className="font-bold text-[#18A889]">{totalCorrect} সঠিক</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">{totalAnswered} সম্পন্ন</span>
          </div>
        </div>
      </div>

      {/* FINAL SCORE SUMMARY VIEW */}
      {showSummary ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-white mx-auto shadow-md">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#142B52]">
              অভিনন্দন! কুইজ সম্পন্ন হয়েছে 🎯
            </h3>
            <p className="text-xs text-slate-500">
              {selectedSubject.nameBn} বিষয়ে আজকের অনুশীলন রিপোর্ট
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-[#F5F7FB] p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">মোট প্রশ্ন</div>
              <div className="text-xl font-black font-mono text-slate-800">{filteredQuestions.length}</div>
            </div>
            <div className="border-x border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold">সঠিক উত্তর</div>
              <div className="text-xl font-black font-mono text-[#18A889]">{totalCorrect}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">নির্ভুলতা</div>
              <div className="text-xl font-black font-mono text-[#3867E8]">
                {filteredQuestions.length > 0 ? Math.round((totalCorrect / filteredQuestions.length) * 100) : 0}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetQuiz}
              className="px-6 py-2.5 bg-[#142B52] hover:bg-[#0D1C36] text-white font-bold rounded-xl text-xs md:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় পরীক্ষা দিন</span>
            </button>

            <button
              onClick={() => setShowSummary(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs md:text-sm transition-colors cursor-pointer"
            >
              প্রশ্নোত্তর পর্যালোচনা
            </button>
          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-[#142B52]">
            এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            উপরে "AI নতুন প্রশ্নপত্র তৈরি করুন" বোতামে চাপুন অথবা ফিল্টার নির্বাচন পরিবর্তন করুন।
          </p>
        </div>
      ) : currentQ ? (
        /* QUESTION CARD */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Progress Header */}
          <div className="bg-[#F5F7FB] px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold bg-[#142B52] text-white px-2.5 py-1 rounded-lg">
                প্রশ্ন {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <span className="text-xs font-semibold text-slate-600 truncate max-w-xs md:max-w-md">
                {currentQ.topic || selectedSubject.nameBn}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono ${
                  currentQ.difficulty === "easy"
                    ? "bg-emerald-100 text-emerald-800"
                    : currentQ.difficulty === "medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                {currentQ.difficulty}
              </span>

              <button
                onClick={() => speakText(currentQ.question)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="প্রশ্ন শুনুন"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleToggleBookmark(currentQ)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  bookmarkedQuestions[currentQ.id]
                    ? "text-amber-500 bg-amber-50"
                    : "text-slate-400 hover:text-amber-500 hover:bg-slate-100"
                }`}
                title={bookmarkedQuestions[currentQ.id] ? "বুকমার্ক সংরক্ষিত" : "বুকমার্ক করুন"}
              >
                {bookmarkedQuestions[currentQ.id] ? (
                  <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-500" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full h-1 bg-slate-100">
            <div
              className="h-full bg-[#3867E8] transition-all duration-300"
              style={{ width: `${currentProgressPercent}%` }}
            />
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Question Text */}
            <h3 className="text-base md:text-lg font-bold text-[#142B52] leading-relaxed font-sans">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = userAnswers[currentQ.id] === option;
                const isSubmitted = submittedQuestions[currentQ.id];
                const isCorrectOption =
                  option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

                let cardStyle =
                  "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-800";

                if (isSelected && !isSubmitted) {
                  cardStyle =
                    "border-[#3867E8] bg-[#EEF2FD] text-[#142B52] font-semibold ring-2 ring-[#3867E8]/20";
                }

                if (isSubmitted) {
                  if (isCorrectOption) {
                    cardStyle =
                      "border-[#18A889] bg-[#E8F7F4] text-[#12836B] font-bold ring-2 ring-[#18A889]/30";
                  } else if (isSelected && !isCorrectOption) {
                    cardStyle =
                      "border-rose-400 bg-rose-50 text-rose-900 font-semibold line-through opacity-85";
                  } else {
                    cardStyle = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm transition-all flex items-start gap-3.5 cursor-pointer shadow-xs ${cardStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-xs font-mono font-bold ${
                        isSelected && !isSubmitted
                          ? "bg-[#3867E8] text-white"
                          : isSubmitted && isCorrectOption
                          ? "bg-[#18A889] text-white"
                          : isSubmitted && isSelected && !isCorrectOption
                          ? "bg-rose-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>

                    <span className="flex-1 pt-0.5 leading-snug">{option}</span>

                    {isSubmitted && isCorrectOption && (
                      <Check className="w-5 h-5 text-[#18A889] shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Action / Feedback Card */}
            {!submittedQuestions[currentQ.id] ? (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 italic">
                  * বিকল্প নির্বাচন করে "উত্তর যাচাই করুন" বোতামে চাপুন।
                </span>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswers[currentQ.id]}
                  className="px-6 py-2.5 bg-[#18A889] hover:bg-[#12836B] disabled:opacity-40 text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>উত্তর যাচাই করুন</span>
                </button>
              </div>
            ) : (
              /* Explanation Card */
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F5F7FB] animate-fadeIn">
                <div
                  className={`p-4 flex items-center gap-3 border-b ${
                    userAnswers[currentQ.id]?.trim().toLowerCase() ===
                    currentQ.correctAnswer.trim().toLowerCase()
                      ? "bg-[#E8F7F4] border-[#18A889]/30 text-[#12836B]"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  {userAnswers[currentQ.id]?.trim().toLowerCase() ===
                  currentQ.correctAnswer.trim().toLowerCase() ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#18A889] shrink-0" />
                      <div>
                        <div className="font-bold text-sm">চমৎকার! সঠিক উত্তর।</div>
                        <div className="text-xs">
                          সঠিক উত্তর: <strong>{currentQ.correctAnswer}</strong>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <div>
                        <div className="font-bold text-sm">ভুল হয়েছে, হতাশ হবেন না!</div>
                        <div className="text-xs text-rose-800">
                          সঠিক উত্তর: <strong>{currentQ.correctAnswer}</strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#3867E8]" />
                      ব্যাখ্যা (Detailed Explanation):
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>

                  {currentQ.tip && (
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-amber-900">
                          মাধ্যমিক রিভিশন টিপ (Revision Tip):
                        </div>
                        <div className="text-xs text-amber-800 mt-0.5">
                          {currentQ.tip}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                পূর্ববর্তী
              </button>

              {/* Number pills */}
              <div className="hidden sm:flex items-center gap-1">
                {filteredQuestions.map((q, idx) => {
                  const isAnswered = submittedQuestions[q.id];
                  const isCorrect =
                    isAnswered &&
                    userAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold flex items-center justify-center transition-all ${
                        isCurrent
                          ? "ring-2 ring-[#3867E8] ring-offset-1 font-black"
                          : ""
                      } ${
                        !isAnswered
                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          : isCorrect
                          ? "bg-[#18A889] text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-[#142B52] hover:bg-[#0D1C36] text-white rounded-xl text-xs md:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {currentIndex === filteredQuestions.length - 1 ? (
                  <>
                    <span>ফলাফল দেখুন</span>
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </>
                ) : (
                  <>
                    <span>পরবর্তী প্রশ্ন</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
