import React, { useState } from "react";
import { SubjectId, AnswerEvaluation } from "../types";
import { SUBJECTS, SYLLABUS_MAP } from "../data/madhyamikData";
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Loader2,
  RotateCcw,
  BookOpen,
  Send,
  HelpCircle,
} from "lucide-react";

interface AnswerEvaluatorProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  langMode: "bengali" | "english" | "both";
}

const SAMPLE_EVAL_QUESTIONS: Record<SubjectId, { question: string; sampleStudentAnswer: string }> = {
  physical_science: {
    question: "বয়েলের সূত্রটি বিবৃতি করো এবং এর ধ্রুবক দুটি কী কী উল্লেখ করো।",
    sampleStudentAnswer: "উষ্ণতা স্থির থাকলে গ্যাসের চাপ ও আয়তন গুণ করলে সমান হয়। এখানে ধ্রুবক হলো গ্যাসের ভর।",
  },
  life_science: {
    question: "উদ্ভিদের ফটোট্রপিক চলন নিয়ন্ত্রণে অক্সিন হরমোনের ভূমিকা সংক্ষেপে লেখো।",
    sampleStudentAnswer: "অক্সিন হরমোন কাণ্ডের অগ্রভাগে থাকে এবং আলোর দিকে উদ্ভিদের কাণ্ডকে বাঁকিয়ে দেয়।",
  },
  mathematics: {
    question: "ax² + bx + c = 0 দ্বিঘাত সমীকরণের বীজদ্বয় বাস্তব ও সমান হওয়ার শর্ত কী এবং শ্রীধর আচার্যের সূত্রটি লেখো।",
    sampleStudentAnswer: "শর্ত হলো b² - 4ac = 0। সূত্র হলো x = -b ± √(b² - 4ac) / 2a।",
  },
  history: {
    question: "১৮৫৭ সালের মহাবিদ্রোহে মঙ্গল পাণ্ডের ভূমিকা কী ছিল?",
    sampleStudentAnswer: "মঙ্গল পাণ্ডে ব্যারাকপুরে প্রথম বিদ্রোহ শুরু করেছিলেন কারণ এনফিল্ড রাইফেলের কার্তুজে চর্বি মেশানো ছিল।",
  },
  geography: {
    question: "নদীর পার্বত্য প্রবাহে গিরিখাত (Gorge) কীভাবে সৃষ্টি হয়?",
    sampleStudentAnswer: "নদী যখন পাহাড়ের মধ্য দিয়ে তীব্র বেগে বয়ে যায় তখন নিম্নক্ষয় বেশি হয় এবং 'I' বা 'V' আকৃতির গিরিখাত তৈরি হয়।",
  },
  bengali: {
    question: "'জ্ঞানচক্ষু' গল্পে তপনের নতুন মেসোমশাই তপনের গল্পটি পড়ে কী মন্তব্য করেছিলেন?",
    sampleStudentAnswer: "মেসোমশাই বলেছিলেন গল্পটি বেশ ভালো হয়েছে তবে একটু কারেকশন করে দিতে হবে।",
  },
  english: {
    question: "How did Father react when Swami gave the excuse of having a headache in 'Father's Help'?",
    sampleStudentAnswer: "Father told Swami that he must go to school and stop loafing about on Sundays so that he won't get a headache on Monday.",
  },
};

export const AnswerEvaluator: React.FC<AnswerEvaluatorProps> = ({
  currentSubject,
  onSelectSubject,
}) => {
  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];
  const chapters = SYLLABUS_MAP[currentSubject] || [];

  const [question, setQuestion] = useState<string>("");
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>(chapters[0]?.titleBn || "");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!question.trim() || !studentAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setErrorMsg(null);
    setEvaluation(null);

    try {
      const res = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedSubject.nameEn,
          topic: selectedChapter || chapters[0]?.titleBn || "WBBSE Madhyamik",
          question: question.trim(),
          studentAnswer: studentAnswer.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Evaluation request failed");
      }

      const result: AnswerEvaluation = await res.json();
      setEvaluation(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "মূল্যায়ন করতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleLoadSample = () => {
    const sample = SAMPLE_EVAL_QUESTIONS[currentSubject];
    if (sample) {
      setQuestion(sample.question);
      setStudentAnswer(sample.sampleStudentAnswer);
      setEvaluation(null);
      setErrorMsg(null);
    }
  };

  const handleReset = () => {
    setQuestion("");
    setStudentAnswer("");
    setEvaluation(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#E8F7F4] text-[#12836B]">
                স্ব-মূল্যায়ন পরীক্ষাগার (Answer Evaluator)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedSubject.nameBn} • {selectedSubject.nameEn}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              মাধ্যমিক উত্তরপত্র নিরীক্ষণ ও নম্বর যাচাই
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              যেকোনো প্রশ্নের স্বপক্ষে তোমার লেখা উত্তরটি জমা দাও। WBBSE বোর্ডের নম্বর প্রদান মানদণ্ডের ভিত্তিতে ভুল শুধরে দেওয়া হবে।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-2 text-xs font-bold text-[#3867E8] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>নমুনা প্রশ্ন বসান</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
              title="পরিষ্কার করুন"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Form & Evaluation Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#142B52] flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#3867E8]" />
            <span>উত্তরের বিবরণ পূরণ করুন</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              অধ্যায় নির্বাচন:
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20"
            >
              {chapters.map((chap) => (
                <option key={chap.id} value={chap.titleBn}>
                  {chap.titleBn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              প্রশ্নটি লিখুন (Exam Question):
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="যেমন: ওহমের সূত্রটি বিবৃতি করো এবং রোধের একক লেখো..."
              className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-300 bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              তোমার নিজস্ব ভাষায় লেখা উত্তর (Student's Answer):
            </label>
            <textarea
              rows={7}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="এখানে খাতায় যেভাবে লিখেছ ঠিক সেভাবে তোমার সম্পূর্ণ উত্তরটি টাইপ করো..."
              className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl border border-slate-300 bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20 leading-relaxed font-sans"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleEvaluate}
              disabled={!question.trim() || !studentAnswer.trim() || isEvaluating}
              className="w-full py-3 bg-[#18A889] hover:bg-[#12836B] disabled:opacity-40 text-white font-bold rounded-xl text-xs md:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI মাস্টারমশাই খাতা নিরীক্ষণ করছেন...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>উত্তরপত্র মূল্যায়ন করুন</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Evaluation Output Side */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          {!evaluation && !isEvaluating ? (
            <div className="my-auto text-center py-12 text-slate-400 space-y-2">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <FileCheck className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">
                এখনো কোনো উত্তর মূল্যায়ন করা হয়নি
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                বাঁদিকের ফর্মে প্রশ্ন ও তোমার উত্তর লিখে "উত্তরপত্র মূল্যায়ন করুন" বোতামে চাপুন অথবা "নমুনা প্রশ্ন বসান" ব্যবহার করুন।
              </p>
            </div>
          ) : isEvaluating ? (
            <div className="my-auto text-center py-16 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#3867E8] mx-auto" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#142B52]">
                  উত্তরটি WBBSE সিলেবাস অনুযায়ী যাচাই হচ্ছে...
                </h4>
                <p className="text-xs text-slate-400">
                  সংজ্ঞা, বৈজ্ঞানিক পরিভাষা এবং ব্যাকরণগত শুদ্ধতা বিশ্লেষণ করা হচ্ছে।
                </p>
              </div>
            </div>
          ) : evaluation ? (
            <div className="space-y-4 animate-fadeIn">
              {/* Verdict Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  evaluation.isCorrect
                    ? "bg-[#E8F7F4] border-[#18A889]/30 text-[#12836B]"
                    : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-[#18A889] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold text-sm">
                    {evaluation.isCorrect
                      ? "প্রশংসনীয়! উত্তরটি ধারণাগতভাবে সঠিক ও গ্রহণযোগ্য।"
                      : "উত্তরে ত্রুটি বা অসম্পূর্ণতা রয়েছে, উন্নতি প্রয়োজন।"}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {evaluation.feedback}
                  </p>
                </div>
              </div>

              {/* Model Answer */}
              <div className="p-4 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-1.5">
                <div className="text-[11px] font-bold text-[#142B52] uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#3867E8]" />
                  বোর্ড অনুমোদিত আদর্শ উত্তর (Model Answer):
                </div>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-sans font-medium">
                  {evaluation.correctAnswer}
                </p>
              </div>

              {/* Revision Tip */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1">
                <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  ভবিষ্যতে মনে রাখার কৌশল (Revision Tip):
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {evaluation.revisionTip}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
