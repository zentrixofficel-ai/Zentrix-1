import React, { useState, useEffect, useRef } from "react";
import { SubjectId } from "../types";
import { SUBJECTS } from "../data/madhyamikData";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  X,
  Sparkles,
  Bot,
  RotateCcw,
  Languages,
} from "lucide-react";

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubject: SubjectId;
  onSelectSubject?: (sub: SubjectId) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentSubject,
  onSelectSubject,
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechLang, setSpeechLang] = useState<"bn-IN" | "en-US">("bn-IN");
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const subjectInfo = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg("");
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setErrorMsg("মাইক্রোফোনের অনুমতি প্রয়োজন (Microphone permission needed)");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [speechLang]);

  // Clean stop speaking on close
  useEffect(() => {
    if (!isOpen) {
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
      if (recognitionRef.current) recognitionRef.current.abort();
      setIsListening(false);
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setErrorMsg("আপনার ব্রাউজারে ভয়েস রিকগনিশন সাপোর্ট নেই। অনুগ্রহ করে টাইপ করুন।");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setErrorMsg("");
      setTranscript("");
      try {
        recognitionRef.current.lang = speechLang;
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAsk = async (textToAsk?: string) => {
    const questionText = (textToAsk || transcript).trim();
    if (!questionText) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setLoading(true);
    setErrorMsg("");
    setResponse("");

    try {
      const res = await fetch("/api/ask-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          subject: subjectInfo.nameBn,
          topic: "সাধারণ ও অধ্যায়ভিত্তিক প্রশ্ন",
        }),
      });

      const data = await res.json();
      if (data && data.answer) {
        setResponse(data.answer);
        speakResponse(data.answer);
      } else {
        const fallback = `${subjectInfo.nameBn} সংক্রান্ত আপনার প্রশ্নের জন্য ধন্যবাদ। গুরুত্বপূর্ণ ধারণার উপর জোর দিন এবং পাঠ্যবইয়ের অধ্যায়টি পড়ুন।`;
        setResponse(fallback);
        speakResponse(fallback);
      }
    } catch (err) {
      const fallback = `দুঃখিত, সংযোগে সমস্যা হয়েছে। দয়া করে পুনরায় প্রশ্ন করুন।`;
      setResponse(fallback);
      speakResponse(fallback);
    } finally {
      setLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    // Clean markdown symbols for cleaner voice synthesis
    const cleanText = text.replace(/[*_#`~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = speechLang;
    utterance.rate = 0.95;

    // Pick suitable voice if available
    const voices = synthRef.current.getVoices();
    const matchingVoice = voices.find((v) =>
      v.lang.startsWith(speechLang === "bn-IN" ? "bn" : "en")
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#14203D] w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#142B52] to-[#1E3A6C] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3867E8] to-[#18A889] flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm md:text-base flex items-center gap-1.5">
                <span>ZENTIX ভয়েস অ্যাসিস্ট্যান্ট</span>
                <span className="text-[10px] bg-[#18A889] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                  Zx Voice
                </span>
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                বিষয়: <span className="text-white font-bold">{subjectInfo.nameBn}</span> ({subjectInfo.nameEn})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switch */}
            <button
              onClick={() => setSpeechLang(speechLang === "bn-IN" ? "en-US" : "bn-IN")}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 flex items-center gap-1"
              title="Change Voice Language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{speechLang === "bn-IN" ? "বাংলা" : "EN"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          {/* Animated Mic Display */}
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <div className="relative">
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-[#18A889]/30 animate-ping" />
              )}
              <button
                onClick={toggleListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
                  isListening
                    ? "bg-[#18A889] text-white ring-4 ring-[#18A889]/40"
                    : "bg-[#142B52] dark:bg-[#3867E8] text-white hover:bg-[#1E3A6C]"
                }`}
                aria-label={isListening ? "Stop listening" : "Start speaking"}
              >
                {isListening ? (
                  <Mic className="w-8 h-8 animate-bounce" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
            </div>

            {/* Listening Waveform */}
            {isListening ? (
              <div className="flex items-center gap-1.5 h-10">
                <span className="w-1.5 bg-[#18A889] rounded-full animate-voice-bar-1" />
                <span className="w-1.5 bg-[#18A889] rounded-full animate-voice-bar-2" />
                <span className="w-1.5 bg-[#18A889] rounded-full animate-voice-bar-3" />
                <span className="w-1.5 bg-[#18A889] rounded-full animate-voice-bar-4" />
                <span className="w-1.5 bg-[#18A889] rounded-full animate-voice-bar-5" />
                <span className="text-xs font-bold text-[#18A889] ml-2">শুনছি... কথা বলুন</span>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                মাইক্রোফোনে ট্যাপ করে প্রশ্ন বলুন বা নিচে লিখে প্রশ্ন করুন
              </p>
            )}

            {errorMsg && (
              <p className="text-xs text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Transcript input / display */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              আপনার প্রশ্ন:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="যেমন: সালোকসংশ্লেষ কাকে বলে? / What is photosynthesis?"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
              />
              <button
                onClick={() => handleAsk()}
                disabled={loading || !transcript.trim()}
                className="px-4 py-2.5 bg-[#3867E8] hover:bg-[#2752CA] disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>জিজ্ঞাসা</span>
              </button>
            </div>
          </div>

          {/* Suggested Quick Questions */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              দ্রুত জিজ্ঞাসা করুন:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "গুরুত্বপূর্ণ অধ্যায় কোনগুলি?",
                "মাধ্যমিকের ৫ নম্বরের প্রশ্নের উত্তর লেখার নিয়ম",
                "উপপাদ্য মনে রাখার ট্রিক",
                "ভৌত বিজ্ঞানের প্রধান সূত্রসমূহ",
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(q);
                    handleAsk(q);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#EEF2FD] dark:hover:bg-[#1E3A6C] text-slate-700 dark:text-slate-300 hover:text-[#3867E8] transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Response Box */}
          {loading && (
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#3867E8] animate-spin" />
              <div className="text-xs font-semibold text-[#142B52] dark:text-blue-200">
                AI মাস্টারমশাই উত্তর তৈরি করছেন...
              </div>
            </div>
          )}

          {response && !loading && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Bot className="w-4 h-4" />
                  <span>AI মাস্টারমশাইয়ের উত্তর</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isSpeaking ? (
                    <button
                      onClick={stopSpeaking}
                      className="px-2.5 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>ভয়েস থামান</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => speakResponse(response)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>আবার শুনুন</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
