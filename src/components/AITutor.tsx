import React, { useState, useRef, useEffect } from "react";
import { SubjectId, HistoryItem } from "../types";
import { SUBJECTS, SYLLABUS_MAP } from "../data/madhyamikData";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Volume2,
  Lightbulb,
  MessageSquare,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle,
} from "lucide-react";

interface AITutorProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  langMode: "bengali" | "english" | "both";
  onLogHistory?: (item: HistoryItem) => void;
}

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

const SAMPLE_PROMPTS: Record<SubjectId, string[]> = {
  physical_science: [
    "বয়েলের সূত্র ও চার্লসের সূত্রকে সমন্বয় করে PV = nRT সমীকরণটি সহজভাবে বুঝিয়ে দাও।",
    "ফ্লেমিং-এর বামহস্ত নিয়মটি একটি বাস্তব উদাহরণের সাহায্যে ব্যাখ্যা করো।",
    "অবতল দর্পণে বস্তু ফোকাস ও বক্রতা কেন্দ্রের মাঝে থাকলে প্রতিবিম্বের বৈশিষ্ট্য কী হবে?",
    "আলফা (α), বিটা (β) এবং গামা (γ) রশ্মির ভেদন ক্ষমতা ও আধানের তুলনা করো।",
  ],
  life_science: [
    "উদ্ভিদের ফটোট্রপিক চলনে অক্সিন হরমোন কীভাবে কাজ করে?",
    "মেন্ডেলের পৃথক্‌ভবন সূত্রটি একসংকর জননের চেকারবোর্ড সহ বুঝিয়ে দাও।",
    "একটি প্রতিবর্ত চাপের (Reflex Arc) চিত্র এঁকে কোন কোন অংশ চিহ্নিত করতে হয়?",
    "থ্যালাসেমিয়া রোগের বংশগত কারণ এবং লক্ষণগুলি কী কী?",
  ],
  mathematics: [
    "শ্রীধর আচার্যের সূত্রের সাহায্যে 2x² - 5x + 2 = 0 সমীকরণটির সমাধান ধাপ ধরে করে দাও।",
    "বৃত্তের কেন্দ্রস্থ কোণ পরিধিস্থ কোণের দ্বিগুণ—উপপاد্যটি সহজে মনে রাখার কৌশল কী?",
    "একটি লম্ব বৃত্তাকার চোঙ ও শঙ্কুর ভূমির ব্যাসার্ধ সমান হলে তাদের আয়তনের সম্পর্ক কী?",
    "রাশিবিজ্ঞানে যৌগিক গড় বের করার প্রত্যক্ষ ও কল্পিত গড় পদ্ধতির পার্থক্য কী?",
  ],
  history: [
    "১৮৫৭ খ্রিস্টাব্দের মহাবিদ্রোহের প্রত্যক্ষ কারণ হিসেবে এনফিল্ড রাইফেলের ঘটনাটি সংক্ষেপে লেখো।",
    "১৮৫৯ সালের নীল বিদ্রোহের কারণ ও এই বিদ্রোহে হরিশচন্দ্র মুখোপাধ্যায়ের ভূমিকা কী ছিল?",
    "রবীন্দ্রনাথ ঠাকুরের শান্তিনিকেতন ও বিশ্বভারতী ভাবনার মূল শিক্ষাদর্শন কী ছিল?",
    "মহারানির ঘোষণাপত্র (১৮৫৮)-এর প্রধান ঐতিহাসিক গুরুত্ব কী ছিল?",
  ],
  geography: [
    "নদীর উচ্চগতিতে গিরিখাত ও ক্যানিয়ন কীভাবে সৃষ্টি হয় এবং তাদের পার্থক্য কী?",
    "ভারতের জলবায়ুতে দক্ষিণ-পশ্চিম মৌসুমি বায়ুর প্রভাব ব্যাখ্যা করো।",
    "পশ্চিমবঙ্গে চা চাষ এবং দুর্গাপুরে লৌহ-ইস্পাত শিল্প গড়ে ওঠার অনুকূল কারণগুলি কী?",
    "উপগ্রহ চিত্রে FCC (ফলস কালার কম্পোজিট) বলতে কী বোঝায়?",
  ],
  bengali: [
    "'জ্ঞানচক্ষু' গল্পে তপনের চোখ কীভাবে সত্যিকার অর্থে খুলে গেল?",
    "কারক ও অকারক পদের পার্থক্য এবং সমাসের প্রাথমিক নিয়মগুলি সংক্ষেপে বুঝিয়ে দাও।",
    "মাধ্যমিকে প্রতিবেদন রচনার সঠিক নিয়ম ও কাঠামো কী?",
    "সিরাজউদ্দৌলা নাটকে সিরাজের দেশপ্রেম ও মানসিক সংকট কীভাবে ফুটে উঠেছে?",
  ],
  english: [
    "Explain the theme and character transformation of Swami in 'Father's Help'.",
    "Give the rules and 5 important examples of Narration Change for Madhyamik.",
    "What is the standard format of an Editorial Letter in Madhyamik English?",
    "List 10 essential Phrasal Verbs frequently asked in Madhyamik.",
  ],
};

export const AITutor: React.FC<AITutorProps> = ({
  currentSubject,
  onSelectSubject,
  langMode,
  onLogHistory,
}) => {
  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];
  const chapters = SYLLABUS_MAP[currentSubject] || [];

  const [selectedChapter, setSelectedChapter] = useState<string>(chapters[0]?.titleBn || "");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: `নমস্কার! আমি তোমার **WB Madhyamik AI ডিজিটাল মাস্টারমশাই**। 🎓\n\nবর্তমানে আমরা **${selectedSubject.nameBn} (${selectedSubject.nameEn})** বিষয়ে আলোচনা করছি।\n\nযেকোনো অঙ্কের সূত্র, বৈজ্ঞানিক ব্যাখ্যা, ঐতিহাসিক কারণ বা ব্যাকরণের সংশয় নির্দ্বিধায় জিজ্ঞাসা করো। আমি মাধ্যমিকের মানদণ্ড অনুযায়ী সহজ ও নির্ভুলভাবে বুঝিয়ে দেব।`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsSending(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/ask-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          subject: selectedSubject.nameEn,
          topic: selectedChapter || chapters[0]?.titleBn,
          language: langMode,
          chatHistory: historyPayload,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Tutor server error");
      }

      const data = await res.json();
      const modelMsg: Message = {
        id: `m-${Date.now()}`,
        role: "model",
        text: data.reply || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, modelMsg]);

      if (onLogHistory) {
        onLogHistory({
          id: "hist_tutor_" + Date.now(),
          type: "tutor_query",
          title: `${selectedSubject.nameBn} - AI প্রশ্ন: "${text.slice(0, 60)}${text.length > 60 ? "..." : ""}"`,
          subject: currentSubject,
          subjectNameBn: selectedSubject.nameBn,
          timestamp: new Date().toISOString(),
          details: (data.reply || "").slice(0, 140) + "...",
        });
      }
    } catch (err: any) {
      console.error(err);
      const errMsg: Message = {
        id: `e-${Date.now()}`,
        role: "model",
        text: `দুঃখিত, উত্তর দিতে সমস্যা হয়েছে: ${err.message || "অনুগ্রহ করে পুনরায় চেষ্টা করুন।"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#_`]/g, "");
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const prompts = SAMPLE_PROMPTS[currentSubject] || SAMPLE_PROMPTS.physical_science;

  return (
    <div className="space-y-6">
      {/* Top Banner with Subject & Chapter selectors */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] text-[#3867E8]">
                ব্যক্তিগত ভার্চুয়াল শিক্ষক (AI Mastermoshai)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedSubject.nameBn} • {selectedSubject.nameEn}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              মাস্টারমশাইয়ের সাথে দ্বিমুখী শিক্ষণ ও ডাউট ক্লিয়ারিং
            </h2>
            <p className="text-xs text-slate-500">
              অঙ্কের ধাপ, বিজ্ঞানের নিয়ম, ঐতিহাসিক প্রেক্ষাপট কিংবা ভাষার ব্যাকরণ যেকোনো প্রশ্ন জিজ্ঞাসা করো।
            </p>
          </div>

          {/* Chapter Selector */}
          <div className="w-full md:w-72">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              অধ্যায় নির্বাচন:
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20"
            >
              {chapters.map((c) => (
                <option key={c.id} value={c.titleBn}>
                  {c.titleBn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Chat Interface Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Stream Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col h-[650px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[90%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold shadow-xs ${
                    msg.role === "user"
                      ? "bg-[#142B52] text-white"
                      : "bg-[#3867E8] text-white"
                  }`}
                >
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#142B52] text-white rounded-tr-none shadow-xs font-medium"
                      : "bg-[#F5F7FB] border border-slate-200/80 text-slate-800 rounded-tl-none space-y-2.5 shadow-xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans leading-relaxed">
                    {msg.text}
                  </div>

                  {msg.role === "model" && (
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60 mt-2">
                      <span className="font-medium text-slate-500">WBBSE AI Tutor</span>
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-slate-800 flex items-center gap-1 transition-colors text-slate-500"
                        title="পড়ে শোনান"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>শুনুন</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3 mr-auto max-w-[80%]">
                <div className="w-8 h-8 rounded-xl bg-[#3867E8] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#F5F7FB] border border-slate-200 p-4 rounded-2xl rounded-tl-none text-xs text-slate-600 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#3867E8]" />
                  <span>মাস্টারমশাই উত্তর প্রস্তুত করছেন...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`মাস্টারমশাইকে প্রশ্ন করো (${selectedSubject.nameBn})...`}
                disabled={isSending}
                className="flex-1 px-4 py-2.5 text-xs md:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20 focus:border-[#3867E8] bg-slate-50/70 font-medium"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className="px-5 py-2.5 bg-[#3867E8] hover:bg-[#2752CA] disabled:opacity-40 text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>পাঠান</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: Suggested Questions & Golden Rules */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#142B52] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>জনপ্রিয় প্রশ্নমালা (Click to Ask)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              যেকোনো প্রশ্নে ক্লিক করলেই মাস্টারমশাই পুঙ্খানুপুঙ্খ সমাধান দেবেন:
            </p>

            <div className="space-y-2">
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  disabled={isSending}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-[#3867E8] hover:bg-[#EEF2FD] text-xs text-slate-700 leading-snug transition-all cursor-pointer font-medium"
                >
                  💡 {p}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-3xl border border-amber-200/80 text-xs text-amber-900 space-y-2.5 shadow-xs">
            <div className="font-bold flex items-center gap-2 text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>মাধ্যমিক খাতার গোল্ডেন টিপস:</span>
            </div>
            <ul className="space-y-1.5 text-amber-900 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>ভৌতবিজ্ঞানের অঙ্কে ফর্মুলা, ডাটা ও একক স্পষ্টভাবে প্রদর্শন করবে।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>জীবনবিজ্ঞানের চিত্রে স্কেল টেনে নাম লিখলে ফুল ৫ নম্বর পাওয়া যায়।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>ইতিহাসের উত্তরে ঘটনার সঠিক সাল ও প্রাসঙ্গিক কারণের পয়েন্টিং জরুরি।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
