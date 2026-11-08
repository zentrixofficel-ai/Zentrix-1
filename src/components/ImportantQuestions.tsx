import React, { useState, useEffect } from "react";
import { SubjectId, ImportantQuestionItem } from "../types";
import { SUBJECTS, SYLLABUS_MAP } from "../data/madhyamikData";
import {
  Sparkles,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Loader2,
  BookCheck,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Search,
  Printer,
  Filter,
} from "lucide-react";

interface ImportantQuestionsProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  langMode: "bengali" | "english" | "both";
}

const CURATED_IMPORTANT_QUESTIONS: Record<SubjectId, ImportantQuestionItem[]> = {
  physical_science: [
    {
      id: "imp-ps-1",
      marks: 2,
      category: "2 Marks (Short Answer / SA)",
      question: "বয়েলের সূত্রের ধ্রুবক দুটি কী কী? চার্লসের সূত্র অনুসারে পরম শূন্য তাপমাত্রার মান কত?",
      keyPointsToAnswer: [
        "বয়েলের সূত্রের ধ্রুবক দুটি হলো: (১) নির্দিষ্ট গ্যাসের ভর এবং (২) গ্যাসের উষ্ণতা বা তাপমাত্রা।",
        "চার্লসের সূত্র অনুসারে পরম শূন্য তাপমাত্রার মান হলো -273.15°C (বা -273°C) অথবা 0 Kelvin।",
      ],
      commonMistake: "অনেকে পরম শূন্য তাপমাত্রায় 0°C লিখে ফেলে বা একক লিখতে ভুলে যায়। মনে রাখবেন এটি -273°C অথবা 0 K।",
    },
    {
      id: "imp-ps-2",
      marks: 3,
      category: "3 Marks (Analytical / Numerical)",
      question: "কোনো গলীয় দর্পণের বক্রতা ব্যাসার্ধ (r) এবং ফোকাস দূরত্বের (f) মধ্যে সম্পর্কটি প্রতিষ্ঠা করো।",
      keyPointsToAnswer: [
        "উপাক্ষীয় রশ্মির ক্ষেত্রে অবতল বা উত্তল দর্পণ এঁকে আপতিত রশ্মি ও প্রতিফলিত রশ্মি চিহ্নিতকরণ।",
        "প্রতিফলনের সূত্রানুসারে আপতন কোণ = প্রতিফলন কোণ এবং একান্তর কোণের সম্পর্ক দেখিয়ে সমদ্বিবাহু ত্রিভুজ প্রমাণ।",
        "উপাক্ষীয় রশ্মির জন্য দর্পণের উন্মেষ ক্ষুদ্র ধরে প্রমাণ: f = r / 2।",
      ],
      commonMistake: "উপাক্ষীয় রশ্মি (Paraxial rays) এবং ক্ষুদ্র উন্মেষের শর্ত উল্লেখ না করলে পূর্ণ ৩ নম্বর পাওয়া যায় না।",
    },
    {
      id: "imp-ps-3",
      marks: 5,
      category: "5 Marks (Long Answer / Descriptive)",
      question: "ওহমের সূত্রটি বিবৃতি করো। পরিবাহীর রোধ কোন কোন বিষয়ের ওপর নির্ভর করে এবং কীভাবে?",
      keyPointsToAnswer: [
        "ওহমের সূত্র: উষ্ণতা ও অন্যান্য ভৌত অবস্থা অপরিবর্তিত থাকলে কোনো পরিবাহীর মধ্য দিয়ে তড়িৎপ্রবাহমাত্রা পরিবাহীর দুই প্রান্তের বিভবপ্রভেদের সমানুপাতিক (V = IR)।",
        "রোধের নির্ভরতা: (১) পরিবাহীর দৈর্ঘ্য (R ∝ l), (২) পরিবাহীর প্রস্থচ্ছেদের ক্ষেত্রফল (R ∝ 1/A), (৩) পরিবাহীর উপাদান (রোধাঙ্ক ρ), (৪) পরিবাহীর উষ্ণতা।",
        "সম্মিলিত রূপ: R = ρ (l / A)।",
      ],
      commonMistake: "ওহমের সূত্রের শুরুতে 'উষ্ণতা ও অন্যান্য ভৌত অবস্থা অপরিবর্তিত থাকলে' শর্তটি না লিখলে নম্বর কেটে যায়।",
    },
  ],
  life_science: [
    {
      id: "imp-ls-1",
      marks: 2,
      category: "2 Marks (Short Answer / SA)",
      question: "ট্রপিক চলন ও ন্যাস্টিক চলনের মধ্যে দুটি প্রধান পার্থক্য লেখো।",
      keyPointsToAnswer: [
        "উদ্দীপকের প্রভাব: ট্রপিক চলন উদ্দীপকের উৎসের গতিপথ অনুসারে ঘটে; ন্যাস্টিক চলন উদ্দীপকের তীব্রতার ওপর নির্ভর করে।",
        "হরমোনের ভূমিকা: ট্রপিক চলন অক্সিন হরমোন দ্বারা নিয়ন্ত্রিত; ন্যাস্টিক চলনে হরমোনের কোনো প্রত্যক্ষ ভূমিকা নেই।",
        "উদাহরণ: ফটোট্রপিক চলন কাণ্ডে আলোর দিকে; পদ্মফুলের আলোতে ফোটা (ফটোন্যাস্টি)।",
      ],
      commonMistake: "পার্থক্যের ভিত্তি কলাম উল্লেখ না করে ছক তৈরি করা। পার্থক্যের বিষয় উল্লেখ করলে ফুল মার্কস নিশ্চিত হয়।",
    },
    {
      id: "imp-ls-2",
      marks: 5,
      category: "5 Marks (Diagram + Theory)",
      question: "একটি আদর্শ নিউরোনের বিজ্ঞানসম্মত চিত্র অঙ্কন করে নিম্নলিখিত অংশগুলি চিহ্নিত করো: ডেনড্রন, মায়েলিন সিথ, র‍্যানভিয়ারের পর্ব, অ্যাক্সন হিলক।",
      keyPointsToAnswer: [
        "পরিচ্ছন্ন ও স্পষ্ট পেন্সিলে আঁকা নিউরনের চিত্র (৩ নম্বর)।",
        "চিত্রের ডানদিকে স্কেল দিয়ে টেনে সঠিক অংশ নির্দেশ করে নাম লেখা (প্রত্যেকটি ০.৫ নম্বর করে ৪টি = ২ নম্বর)।",
        "চিত্রের নিচে ক্যাপশন: 'চিত্র: একটি আদর্শ নিউরোনের গঠন'।",
      ],
      commonMistake: "পেন দিয়ে চিত্র আঁকা। মাধ্যমিকে জীববিজ্ঞানের সব ছবি শুধুমাত্র পেন্সিল ও ইরেজার দিয়ে আঁকা বাধ্যতামূলক।",
    },
  ],
  mathematics: [
    {
      id: "imp-math-1",
      marks: 5,
      category: "5 Marks (Theorem / উপপাদ্য)",
      question: "প্রমাণ করো যে, ব্যাস নয় এরূপ কোনো জ্যা-এর উপর বৃত্তের কেন্দ্র থেকে লম্ব অঙ্কন করলে, ওই লম্ব জ্যাটিকে সমদ্বিখণ্ডিত করে।",
      keyPointsToAnswer: [
        "প্রদত্ত: O কেন্দ্রীয় বৃত্তের AB ব্যাস নয় এরূপ একটি জ্যা এবং OD ⊥ AB।",
        "প্রামাণ্য: D বিন্দুটি AB জ্যা-কে সমদ্বিখণ্ডিত করে, অর্থাৎ AD = DB।",
        "অঙ্কন: O, A এবং O, B যুক্ত করা হলো।",
        "প্রমাণ: ΔOAD ও ΔOBD সমকোণী ত্রিভুজদ্বয়ের মধ্যে OA = OB (ব্যাসার্ধ), OD সাধারণ বাহু এবং ∠ODA = ∠ODB = 90°। RHS সর্বসমতা অনুসারে ΔOAD ≅ ΔOBD। সুতরাং AD = DB (প্রমাণিত)।",
      ],
      commonMistake: "চিত্র না আঁকা বা চিত্রে প্রদত্ত অক্ষরের সাথে প্রমাণের চিহ্নের অমিল ঘটানো। জ্যামিতিতে চিত্র বাধ্যতামূলক।",
    },
    {
      id: "imp-math-2",
      marks: 3,
      category: "3 Marks (Algebra / সমীকরণ)",
      question: "সমাধান করো: (x - 3)/(x + 3) - (x + 3)/(x - 3) + 6 6/7 = 0 (x ≠ 3, -3)।",
      keyPointsToAnswer: [
        "ধরি, (x - 3)/(x + 3) = a, অতএব (x + 3)/(x - 3) = 1/a।",
        "সমীকরণ রূপান্তর: a - 1/a + 48/7 = 0 ⇒ 7a² + 48a - 7 = 0।",
        "উৎপাদকে বিশ্লেষণ: (7a - 1)(a + 7) = 0 ⇒ a = 1/7 অথবা a = -7।",
        "a-এর মান বসিয়ে x-এর দুটি বীজ নির্ণয়: x = 4 অথবা x = -4।",
      ],
      commonMistake: "a-এর মান বের করার পর আসল অজ্ঞাত রাশি x-এর মান বের না করে অংক শেষ করে দেওয়া!",
    },
  ],
  history: [
    {
      id: "imp-hist-1",
      marks: 4,
      category: "4 Marks (Analytical)",
      question: "১৮৫৭ সালের মহাবিদ্রোহকে কি 'ভারতের প্রথম স্বাধীনতা যুদ্ধ' বলা যায়? তোমার উত্তরের সপক্ষে যুক্তি দাও।",
      keyPointsToAnswer: [
        "পটভূমি: বিনায়ক দামোদর সাভারকার তাঁর গ্রন্থে একে প্রথম স্বাধীনতা যুদ্ধ বলেছেন।",
        "সপক্ষে যুক্তি: ব্রিটিশ অপশাসনের বিরুদ্ধে ভারতের কৃষক, সিপাহি ও জনগণের ঐক্যবদ্ধ সশস্ত্র সংগ্রাম।",
        "বিপক্ষে যুক্তি: রমেশচন্দ্র মজুমদার ও সুরেন্দ্রনাথ সেনের মত—জাতীয় চেতনার অভাব ও স্থানীয় সীমাবদ্ধতা।",
        "উপসংহার: সীমাবদ্ধতা সত্ত্বেও এটি ছিল ব্রিটিশ সাম্রাজ্যবাদবিরোধী এক অভূতপূর্ব জাতীয় প্রতিরোধ।",
      ],
      commonMistake: "শুধুমাত্র একতরফা উত্তর লেখা। উভয় পক্ষের ঐতিহাসিকদের মতামত ও বইয়ের নাম উল্লেখ করা জরুরি।",
    },
  ],
  geography: [
    {
      id: "imp-geo-1",
      marks: 5,
      category: "5 Marks (Long Answer / রচনাধর্মী)",
      question: "নদীর ক্ষয়কার্যের ফলে সৃষ্ট যেকোনো তিনটি ভূমিরূপের সচিত্র বিবরণ দাও।",
      keyPointsToAnswer: [
        "ভূমিকা: উচ্চগতি বা পার্বত্য প্রবাহে নদীর নিম্নক্ষয় ও পার্শ্বক্ষয়ের ফলে সৃষ্ট প্রধান ভূমিরূপ।",
        "১. গিরিখাত ও ক্যানিয়ন (উৎপত্তি ও উদাহরণ যেমন সাংপো গিরিখাত)।",
        "২. জলপ্রপাত ও প্রপাতকূপ (সংজ্ঞা, কঠিন ও কোমল শিলার অবস্থান ও উদাহরণ)।",
        "৩. মন্থকূপ (নদীর তলদেশে শিলাখণ্ডের ঘর্ষণে সৃষ্ট গর্ত)।",
        "প্রতিটি ভূমিরূপের পাশে পরিচ্ছন্ন স্কেচ/চিত্র অঙ্কন।",
      ],
      commonMistake: "চিত্র ছাড়া ভৌগোলিক ভূমিরূপের বর্ণনা লেখা। ৫ নম্বরের প্রশ্নের জন্য চিত্র আবশ্যিক।",
    },
  ],
  bengali: [
    {
      id: "imp-ben-1",
      marks: 3,
      category: "3 Marks (Short Contextual)",
      question: "'পত্রিকাটি প্রকাশ হওয়া মাত্র তপনের বুকের রক্ত ছলকে ওঠে'—কোন পত্রিকার কথা বলা হয়েছে? কেন তপনের বুকের রক্ত ছলকে উঠেছিল?",
      keyPointsToAnswer: [
        "উদ্ধৃত অংশটি আশাপূর্ণা দেবীর রচিত 'জ্ঞানচক্ষু' গল্প থেকে গৃহীত। এখানে 'সন্ধ্যাতারা' পত্রিকার কথা বলা হয়েছে।",
        "পত্রিকার পাতায় তপনের লেখা গল্প 'প্রথম দিন' ছাপার অক্ষরে প্রকাশিত হতে দেখে তপন প্রবল আনন্দ ও উত্তেজনায় রোমাঞ্চিত হয়ে ওঠে।",
      ],
      commonMistake: "উৎস ও লেখকের নাম উল্লেখ না করে সরাসরি উত্তর দেওয়া। রচয়িতার নাম দিলে পূর্ণ মান নিশ্চিত হয়।",
    },
  ],
  english: [
    {
      id: "imp-eng-1",
      marks: 3,
      category: "3 Marks (Comprehension & Theme)",
      question: "Why did Swami feel a great reluctance to deliver the complaint letter to Samuel?",
      keyPointsToAnswer: [
        "Swami realized that his description of Samuel to his father was exaggerated and full of prejudice.",
        "Samuel was not really the cruel monster Swami had painted; he was friendly and considerate.",
        "Swami's conscience bothered him because he knew an innocent teacher might lose his job.",
      ],
      commonMistake: "Maintaining tense consistency. Use past tense for narrative comprehension answers.",
    },
  ],
};

export const ImportantQuestions: React.FC<ImportantQuestionsProps> = ({
  currentSubject,
  onSelectSubject,
}) => {
  const selectedSubject = SUBJECTS.find((s) => s.id === currentSubject) || SUBJECTS[0];
  const chapters = SYLLABUS_MAP[currentSubject] || [];

  const [selectedChapter, setSelectedChapter] = useState<string>("All Chapters");
  const [selectedMarksFilter, setSelectedMarksFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  // Bookmarks stored in localStorage
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("wbbse_question_bookmarks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [questionsList, setQuestionsList] = useState<ImportantQuestionItem[]>(
    CURATED_IMPORTANT_QUESTIONS[currentSubject] || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(
    (CURATED_IMPORTANT_QUESTIONS[currentSubject] || [])[0]?.id || null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("wbbse_question_bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    setQuestionsList(CURATED_IMPORTANT_QUESTIONS[currentSubject] || []);
    setExpandedId((CURATED_IMPORTANT_QUESTIONS[currentSubject] || [])[0]?.id || null);
  }, [currentSubject]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleGenerateImportant = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/important-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedSubject.nameEn,
          chapter: selectedChapter,
          markType: selectedMarksFilter === "all" ? "1, 2, 3 and 5 marks" : `${selectedMarksFilter} marks`,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch questions");
      }

      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setQuestionsList(data.items);
        setExpandedId(data.items[0].id);
      } else {
        throw new Error("No questions returned");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate questions. Showing curated syllabus questions.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Filtered Questions by Category, Search Query, and Bookmarks
  const filtered = questionsList.filter((item) => {
    if (showBookmarksOnly && !bookmarks[item.id]) return false;

    if (selectedMarksFilter !== "all") {
      if (selectedMarksFilter === "1" && item.marks !== 1) return false;
      if (selectedMarksFilter === "2" && item.marks !== 2) return false;
      if (selectedMarksFilter === "3" && item.marks !== 3) return false;
      if (selectedMarksFilter === "5" && item.marks < 4) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inQuestion = item.question.toLowerCase().includes(q);
      const inCategory = item.category.toLowerCase().includes(q);
      const inPoints = item.keyPointsToAnswer.some((p) => p.toLowerCase().includes(q));
      if (!inQuestion && !inCategory && !inPoints) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] text-[#3867E8]">
                গুরুত্বপূর্ণ প্রশ্নোত্তর ব্যাংক (Question Bank)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedSubject.nameBn} • {selectedSubject.nameEn}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              মাধ্যমিক অধ্যায়ভিত্তিক উচ্চ-সম্ভাব্য প্রশ্নমালা
            </h2>
            <p className="text-xs text-slate-500">
              বোর্ডের নম্বর বণ্টন (১, ২, ৩ ও ৫ নম্বর) অনুযায়ী উত্তরের আদর্শ রূপরেখা ও সতর্কবার্তা।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showBookmarksOnly
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>বুকমার্ক করা ({Object.keys(bookmarks).filter((k) => bookmarks[k]).length})</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* Board Disclaimer */}
        <div className="mt-4 p-3 bg-blue-50/80 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-2.5">
          <BookCheck className="w-4 h-4 text-[#3867E8] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>বোর্ড নির্দেশিকা ও সততা স্বীকৃতি:</strong> এই প্রশ্নাবলি পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE) মাধ্যমিক পাঠ্যক্রমের আলোকে প্রস্তুতকৃত শিক্ষামূলক কৃত্রিম বুদ্ধিমত্তা চালিত অনুশীলন সহায়ক। এগুলি বোর্ডের মূল প্রশ্নপত্র নয়, বরং বিগত বছরগুলির ধারা ও ধারণাগত গুরুত্ব বিবেচনা করে শিক্ষার্থীদের প্রস্তুতির জন্য তৈরি।
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
          {/* Live Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রশ্ন বা টপিক খুঁজুন (যেমন: ওহম, আলো, সাঁওতাল, দ্বিঘাত)..."
              className="w-full pl-10 pr-3.5 py-2 text-xs md:text-sm rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20 font-medium"
            />
          </div>

          {/* Chapter Selector */}
          <div className="w-[200px]">
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20"
            >
              <option value="All Chapters">সমগ্র সিলেবাস</option>
              {chapters.map((chap) => (
                <option key={chap.id} value={chap.titleBn}>
                  {chap.titleBn}
                </option>
              ))}
            </select>
          </div>

          {/* Marks Selector */}
          <div className="w-[140px]">
            <select
              value={selectedMarksFilter}
              onChange={(e) => setSelectedMarksFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20"
            >
              <option value="all">সকল মান (All)</option>
              <option value="1">১ নম্বর (VSA)</option>
              <option value="2">২ নম্বর (SA)</option>
              <option value="3">৩ নম্বর (Analytical)</option>
              <option value="5">৪/৫ নম্বর (Long)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateImportant}
            disabled={isLoading}
            className="px-4 py-2 bg-[#142B52] hover:bg-[#0D1C36] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI প্রশ্ন প্রস্তুত করুন</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Bookmark className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-bold text-slate-700">কোনো প্রশ্ন পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-400 mt-1">
              {showBookmarksOnly
                ? "আপনি এখনো কোনো প্রশ্ন বুকমার্ক করেননি।"
                : "অনুগ্রহ করে সার্চ কোয়েরি বা ফিল্টার পরিবর্তন করুন।"}
            </p>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isBookmarked = Boolean(bookmarks[item.id]);

            return (
              <div
                key={item.id || idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-slate-300"
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-tight ${
                        item.marks >= 5
                          ? "bg-purple-100 text-purple-900 border border-purple-200"
                          : item.marks >= 3
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : item.marks === 2
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}
                    >
                      মান: {item.marks}
                    </span>

                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-0.5">
                        {item.category || `${item.marks} নম্বরের প্রশ্ন`}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-[#142B52] leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? "text-amber-500 bg-amber-50"
                          : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      }`}
                      title={isBookmarked ? "বুকমার্ক সরানো" : "বুকমার্ক করুন"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
                    </button>

                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Collapsible Answer Outline */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-[#F5F7FB]/60 space-y-4 animate-fadeIn">
                    {/* Key points to answer */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-[#18A889] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#18A889]" />
                        পূর্ণ মান ({item.marks}) পাওয়ার জন্য আবশ্যিক পয়েন্টসমূহ:
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
                        {item.keyPointsToAnswer.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#18A889] mt-2 shrink-0" />
                            <span className="leading-relaxed font-sans">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Common mistakes */}
                    {item.commonMistake && (
                      <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-rose-900">
                            পরীক্ষায় প্রচলিত ভুল (Common Mistake):
                          </div>
                          <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">
                            {item.commonMistake}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
