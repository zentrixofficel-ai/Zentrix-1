import React, { useState } from "react";
import { SubjectId, StudyFact, MnemonicItem } from "../types";
import { SUBJECTS, SYLLABUS_MAP, MNEMONICS_LIST, CURATED_STUDY_FACTS } from "../data/madhyamikData";
import {
  Brain,
  Lightbulb,
  Sparkles,
  Zap,
  RotateCw,
  BookmarkCheck,
  Loader2,
  Bookmark,
  Share2,
  CheckCircle,
} from "lucide-react";

interface MemoryHubProps {
  currentSubject: SubjectId;
  onSelectSubject?: (sub: SubjectId) => void;
  langMode: "bengali" | "english" | "both";
}

export const MemoryHub: React.FC<MemoryHubProps> = ({ currentSubject, langMode }) => {
  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];
  const chapters = SYLLABUS_MAP[currentSubject] || [];

  // State
  const [activeSubTab, setActiveSubTab] = useState<"facts" | "mnemonics" | "flashcards">("facts");
  const [studyFacts, setStudyFacts] = useState<StudyFact[]>(CURATED_STUDY_FACTS);
  const [customTopic, setCustomTopic] = useState<string>("");
  const [isGeneratingFact, setIsGeneratingFact] = useState<boolean>(false);
  const [factError, setFactError] = useState<string | null>(null);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<Record<number, boolean>>({});

  // Filter mnemonics for current subject or show all
  const filteredMnemonics = MNEMONICS_LIST.filter(
    (m) => m.subject === currentSubject || activeSubTab !== "mnemonics"
  );

  const displayMnemonics =
    filteredMnemonics.length > 0 ? filteredMnemonics : MNEMONICS_LIST;

  // Flashcard items derived from study facts and mnemonics
  const flashcardDeck = studyFacts.map((fact) => ({
    question: `${fact.subject} • ${fact.topic}: ${fact.whyItMatters}`,
    answer: fact.fact,
    tip: fact.memoryTip,
  }));

  const handleGenerateFact = async () => {
    setIsGeneratingFact(true);
    setFactError(null);
    try {
      const topicToAsk =
        customTopic.trim() ||
        chapters[0]?.titleBn ||
        `${selectedSubject.nameBn} মাধ্যমিক গুরুত্বপূর্ণ ধারণা`;

      const res = await fetch("/api/generate-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedSubject.nameEn,
          topic: topicToAsk,
          language: langMode,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate study fact");
      }

      const newFact: StudyFact = await res.json();
      if (newFact.fact) {
        setStudyFacts((prev) => [newFact, ...prev]);
        setCustomTopic("");
      }
    } catch (err: any) {
      console.error(err);
      setFactError(err.message || "Failed to generate fact");
    } finally {
      setIsGeneratingFact(false);
    }
  };

  const currentFlashcard = flashcardDeck[cardIndex] || flashcardDeck[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % flashcardDeck.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  const toggleMastery = (index: number) => {
    setMasteredCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-purple-100 text-purple-900">
                স্মৃতি সহায়িকা (Memory Hub)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedSubject.nameBn} • {selectedSubject.nameEn}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              স্মরণিকা, বৈজ্ঞানিক সূত্র ও ছন্দবদ্ধ ট্রিকস
            </h2>
            <p className="text-xs text-slate-500">
              কঠিন সমীকরণ, ঐতিহাসিক সন-তারিখ ও বৈজ্ঞানিক পর্যায়গুলি সহজে মনে রাখার স্মৃতি সহায়ক কৌশল।
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab("facts")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === "facts"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              হাই-ইল্ড ফ্যাক্টস
            </button>
            <button
              onClick={() => setActiveSubTab("mnemonics")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === "mnemonics"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ছন্দ ও নেমোনিক (Mnemonics)
            </button>
            <button
              onClick={() => setActiveSubTab("flashcards")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === "flashcards"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              রিভিশন ফ্ল্যাশকার্ড
            </button>
          </div>
        </div>

        {/* Generate Fact Row */}
        {activeSubTab === "facts" && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[220px]">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder={`টপিক লিখুন (যেমন: ${chapters[0]?.titleBn.slice(0, 35) || "বায়ুমণ্ডলের স্তর, মেন্ডেলের সূত্র"})...`}
                className="w-full px-3.5 py-2 text-xs md:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 bg-slate-50 font-medium"
              />
            </div>
            <button
              onClick={handleGenerateFact}
              disabled={isGeneratingFact}
              className="px-4 py-2 bg-[#142B52] hover:bg-[#0D1C36] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingFact ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI স্টাডি ফ্যাক্ট তৈরি করুন</span>
                </>
              )}
            </button>
          </div>
        )}

        {factError && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
            {factError}
          </div>
        )}
      </div>

      {/* Tab Content 1: High Yield Study Facts matching JSON schema */}
      {activeSubTab === "facts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {studyFacts.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 uppercase">
                    {item.subject} • {item.topic}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">#{idx + 1}</span>
                </div>

                {/* The Accurate Fact */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    সঠিক ও গুরুত্বপূর্ণ তথ্য (Study Fact):
                  </div>
                  <p className="text-sm font-bold text-[#142B52] leading-relaxed">
                    {item.fact}
                  </p>
                </div>

                {/* Why It Matters */}
                <div>
                  <div className="text-[11px] font-bold text-[#3867E8] uppercase tracking-wide mb-1">
                    কেন মাধ্যমিকে গুরুত্বপূর্ণ (Why It Matters):
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Memory Tip */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="bg-amber-50/90 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">
                      মনে রাখার সহজ ট্রিক (Memory Tip):
                    </div>
                    <p className="text-xs text-amber-800 mt-0.5 font-medium leading-relaxed">
                      {item.memoryTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 2: Mnemonics */}
      {activeSubTab === "mnemonics" && (
        <div className="space-y-4 animate-fadeIn">
          {displayMnemonics.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base md:text-lg font-bold text-[#142B52] flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  {m.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600">
                  {m.subject}
                </span>
              </div>

              {/* Mnemonic Catchphrase */}
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 p-4 rounded-2xl border border-purple-200/80">
                <div className="text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-1">
                  মনে রাখার ছন্দ (Catchphrase / Formula):
                </div>
                <div className="text-base md:text-lg font-extrabold text-purple-950 font-sans tracking-wide">
                  "{m.mnemonic}"
                </div>
                <p className="text-xs text-slate-600 mt-1.5">{m.explanation}</p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {m.fullFormOrBreakdown.map((item, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                      {item.key}
                    </span>
                    <span className="text-slate-800 font-medium text-right flex-1 truncate">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Flashcards Flip Deck */}
      {activeSubTab === "flashcards" && (
        <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              কার্ড {cardIndex + 1} / {flashcardDeck.length}
            </span>
            <span className="flex items-center gap-1.5 text-[#18A889] font-sans font-bold">
              <BookmarkCheck className="w-4 h-4" />
              আয়ত্ত সম্পন্ন: {Object.keys(masteredCards).filter((k) => masteredCards[Number(k)]).length} টি
            </span>
          </div>

          {/* Interactive Flippable Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[290px] bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-[#3867E8] shadow-md flex flex-col justify-between cursor-pointer transition-all relative overflow-hidden select-none"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider">
                {!isFlipped ? "প্রশ্ন / প্রসঙ্গ (Question Side)" : "উত্তর ও ব্যাখ্যা (Answer Side)"}
              </span>
              <span className="text-[11px] bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600 flex items-center gap-1 font-medium">
                <RotateCw className="w-3 h-3" /> ক্লিক করে উল্টান
              </span>
            </div>

            <div className="my-auto py-5 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#3867E8] uppercase tracking-wide">
                    মাথায় ভাবুন এবং মেলান:
                  </div>
                  <h3 className="text-base md:text-xl font-extrabold text-[#142B52] leading-snug">
                    {currentFlashcard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-xs font-bold text-[#18A889] uppercase tracking-wide">
                    সঠিক উত্তর ও মূল তথ্য:
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed font-sans">
                    {currentFlashcard.answer}
                  </h3>
                  {currentFlashcard.tip && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium inline-block text-left">
                      💡 <strong>টিপ:</strong> {currentFlashcard.tip}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <span className="text-slate-400 italic">
                {!isFlipped ? "উত্তরের জন্য কার্ডে ট্যাপ করুন" : "পরবর্তী কার্ডে এগিয়ে যান"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastery(cardIndex);
                }}
                className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  masteredCards[cardIndex]
                    ? "bg-[#E8F7F4] text-[#12836B]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                {masteredCards[cardIndex] ? "আয়ত্ত সম্পন্ন!" : "মনে রাখতে পেরেছি"}
              </button>
            </div>
          </div>

          {/* Flashcard Nav Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="px-5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs md:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              ← আগের কার্ড
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2 text-xs font-bold text-[#3867E8] hover:underline transition-colors cursor-pointer"
            >
              উল্টান (Flip Card)
            </button>
            <button
              onClick={handleNextCard}
              className="px-6 py-2.5 bg-[#142B52] hover:bg-[#0D1C36] text-white rounded-xl text-xs md:text-sm font-bold transition-colors cursor-pointer"
            >
              পরের কার্ড →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
