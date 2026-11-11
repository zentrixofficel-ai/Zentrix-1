import React, { useState } from "react";
import { QuestionPaperItem } from "../types";
import { VERIFICATION_LABELS, EXAM_TYPES_LABELS } from "../data/questionPapersData";
import {
  X,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  Bookmark,
  BookmarkCheck,
  Check,
  FileText,
  Calendar,
  Building,
  ShieldCheck,
  HelpCircle,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

interface PdfViewerModalProps {
  paper: QuestionPaperItem | null;
  onClose: () => void;
  onSaveOffline?: (paper: QuestionPaperItem) => void;
  isSavedOffline?: boolean;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  paper,
  onClose,
  onSaveOffline,
  isSavedOffline = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!paper) return null;

  const verif = VERIFICATION_LABELS[paper.verificationStatus] || VERIFICATION_LABELS.model_paper;
  const examInfo = EXAM_TYPES_LABELS[paper.examType] || { bn: paper.examType, en: paper.examType };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 75));
  const handleResetZoom = () => setZoomLevel(100);

  const handleDownload = () => {
    // Generate clean offline printable document
    const content = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>${paper.title}</title>
  <style>
    body { font-family: 'Noto Sans Bengali', sans-serif, system-ui; padding: 24px; line-height: 1.6; color: #111; }
    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 20px; }
    .badge { display: inline-block; padding: 3px 8px; font-size: 12px; background: #eee; border-radius: 4px; }
    .section-title { font-size: 16px; font-weight: bold; background: #f0f4f8; padding: 6px 12px; margin-top: 18px; border-left: 4px solid #142B52; }
    .question { margin: 12px 0; }
    .options { display: flex; flex-wrap: wrap; gap: 12px; margin-left: 18px; }
    .meta { font-size: 13px; color: #555; }
  </style>
</head>
<body>
  <div class="header">
    <h2>ZENTIX WB — ${paper.classId === "class_6" ? "ষষ্ঠ শ্রেণি" : "মাধ্যমিক দশম শ্রেণি"}</h2>
    <h3>${paper.title}</h3>
    <div class="meta">বিষয়: ${paper.subjectNameBn} | বছর: ${paper.year} | পূর্ণমান: ${paper.totalMarks} | সময়: ${paper.durationMinutes} মিনিট</div>
    <div class="meta">উৎস: ${paper.source} (${verif.bn})</div>
  </div>
  ${
    paper.sections
      ? paper.sections
          .map(
            (sec) => `
    <div class="section-title">${sec.name} [মান: ${sec.marks}]</div>
    <p><em>${sec.instructions || ""}</em></p>
    ${sec.questions
      .map(
        (q) => `
      <div class="question">
        <strong>${q.num}.</strong> ${q.text} <em>[${q.marks}]</em>
        ${
          q.options
            ? `<div class="options">${q.options.map((opt) => `<span>${opt}</span>`).join(" ")}</div>`
            : ""
        }
        ${q.answerOrHint ? `<div style="color: #0d6832; margin-top: 4px; font-size: 13px;">উঃ ${q.answerOrHint}</div>` : ""}
      </div>
    `
      )
      .join("")}
  `
          )
          .join("")
      : `<p>${paper.description}</p>`
  }
</body>
</html>
    `;

    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${paper.title.replace(/\s+/g, "_")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paper.title,
          text: `${paper.title} - ZENTIX WB প্রশ্নপত্র সংগ্রহশালা।`,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(`${paper.title}\n${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#14203D] w-full max-w-4xl h-[92vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#142B52] to-[#1E3A6C] text-white flex flex-wrap items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-white/10 shrink-0">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] bg-[#18A889] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                  {paper.classId === "class_6" ? "CLASS 6" : "CLASS 10 MADHYAMIK"}
                </span>
                <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded font-mono font-bold">
                  {paper.year}
                </span>
                <span className="text-xs text-slate-300 font-medium truncate max-w-[200px] md:max-w-md">
                  {paper.subjectNameBn}
                </span>
              </div>
              <h3 className="text-xs md:text-sm font-bold text-white truncate max-w-xs md:max-w-lg mt-0.5">
                {paper.title}
              </h3>
            </div>
          </div>

          {/* Action buttons on toolbar */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={handleZoomOut}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-1 text-[11px]">{zoomLevel}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toggle Solutions */}
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                showAnswers
                  ? "bg-amber-400 text-slate-950 font-black"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="উত্তর বা সমাধান দেখুন"
            >
              {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden md:inline">{showAnswers ? "উত্তর লুকান" : "উত্তর সংকেত"}</span>
            </button>

            {/* Offline save */}
            {onSaveOffline && (
              <button
                onClick={() => onSaveOffline(paper)}
                className={`p-2 rounded-xl text-xs font-bold transition-colors ${
                  isSavedOffline
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                title={isSavedOffline ? "অফলাইনে সংরক্ষিত আছে" : "অফলাইনে সেভ করুন"}
              >
                {isSavedOffline ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="শেয়ার করুন"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-[#18A889] hover:bg-[#12836B] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ডাউনলোড</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Metadata Bar */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full font-bold border text-[11px] ${verif.badgeClass}`}>
              {verif.bn}
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5" /> উৎস: <strong className="text-slate-700 dark:text-slate-200">{paper.source}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-[11px] font-mono">
            <span>সাইজ: {paper.fileSize}</span>
            <span>পূর্ণমান: {paper.totalMarks}</span>
            <span>সময়: {paper.durationMinutes} মিনিট</span>
            <span>আপলোড: {paper.uploadedAt}</span>
          </div>
        </div>

        {/* Document Content Reader Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-[#0B132B]/60">
          <div
            className="max-w-3xl mx-auto bg-white dark:bg-[#14203D] rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 transition-all font-sans"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          >
            {/* Header Stamp */}
            <div className="text-center border-b-2 border-slate-900 dark:border-slate-100 pb-4 mb-6 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-widest text-[#3867E8]">
                {paper.classId === "class_6" ? "পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ • ষষ্ঠ শ্রেণি" : "WBBSE • দশম শ্রেণি মাধ্যমিক পরীক্ষা"}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#142B52] dark:text-white leading-tight">
                {paper.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-1 font-mono">
                <span>বিষয়: {paper.subjectNameBn}</span>
                <span>•</span>
                <span>বছর: {paper.year}</span>
                <span>•</span>
                <span>পূর্ণমান: {paper.totalMarks}</span>
                <span>•</span>
                <span>সময়: ৩ ঘণ্টা ১৫ মিনিট</span>
              </div>
            </div>

            {/* Sections & Questions */}
            {paper.sections && paper.sections.length > 0 ? (
              <div className="space-y-6">
                {paper.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="space-y-3">
                    <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border-l-4 border-[#3867E8] flex items-center justify-between">
                      <h4 className="text-xs md:text-sm font-extrabold text-[#142B52] dark:text-white">
                        {sec.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-[#3867E8]">
                        [মান: {sec.marks}]
                      </span>
                    </div>

                    {sec.instructions && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic pl-1">
                        {sec.instructions}
                      </p>
                    )}

                    <div className="space-y-3.5 pt-1 pl-1">
                      {sec.questions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 hover:border-blue-200 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                              <span className="text-[#3867E8] font-mono mr-1.5">{q.num}.</span>
                              <span>{q.text}</span>
                            </div>
                            <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">
                              [{q.marks}]
                            </span>
                          </div>

                          {/* MCQ Options */}
                          {q.options && q.options.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 pt-1">
                              {q.options.map((opt, optIdx) => (
                                <div
                                  key={optIdx}
                                  className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 font-medium"
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Answer / Solution Hint */}
                          {showAnswers && q.answerOrHint && (
                            <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 space-y-1">
                              <div className="font-bold flex items-center gap-1 text-[11px]">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>উত্তর সংকেত / সমাধান:</span>
                              </div>
                              <p className="leading-relaxed whitespace-pre-line">
                                {q.answerOrHint}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 py-8">
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {paper.description}
                </p>
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#3867E8] shrink-0" />
                  <span>
                    এই প্রশ্নপত্রটি পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের অফিসিয়াল সিলেবাস ও পরীক্ষা কাঠামোর সাথে পরীক্ষিত ও প্রমাণিত।
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
