import { SubjectInfo, Question, StudyFact, MnemonicItem, SyllabusChapter } from "../types";

export const SUBJECTS: SubjectInfo[] = [
  {
    id: "bengali",
    nameEn: "Bengali (1st Lang)",
    nameBn: "বাংলা",
    iconName: "BookOpen",
    color: "from-purple-600 to-indigo-700",
    bgLight: "bg-purple-50 text-purple-900 border-purple-200",
    badgeBg: "bg-purple-100 text-purple-800",
    totalChapters: 12,
    description: "জ্ঞানচক্ষু, বহুরূপী, সিরাজউদ্দৌলা, ব্যাকরণ (কারক, সমাস) ও নির্মিতি",
  },
  {
    id: "english",
    nameEn: "English (2nd Lang)",
    nameBn: "English",
    iconName: "Languages",
    color: "from-blue-600 to-indigo-700",
    bgLight: "bg-blue-50 text-blue-900 border-blue-200",
    badgeBg: "bg-blue-100 text-blue-800",
    totalChapters: 8,
    description: "Father's Help, Bapu, Sea Fever, Grammar, Phrasal Verbs & Writing",
  },
  {
    id: "mathematics",
    nameEn: "Mathematics",
    nameBn: "গণিত",
    iconName: "Calculator",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 text-amber-900 border-amber-200",
    badgeBg: "bg-amber-100 text-amber-800",
    totalChapters: 16,
    description: "দ্বিঘাত সমীকরণ, সরল ও চক্রবৃদ্ধি সুদ, জ্যামিতি, পরিমিতি ও ত্রিকোণমিতি",
  },
  {
    id: "physical_science",
    nameEn: "Physical Science",
    nameBn: "ভৌত বিজ্ঞান",
    iconName: "Atom",
    color: "from-blue-700 to-sky-600",
    bgLight: "bg-sky-50 text-sky-900 border-sky-200",
    badgeBg: "bg-sky-100 text-sky-800",
    totalChapters: 8,
    description: "পরিবেশ, গ্যাস, আলো, চলতড়িৎ, রাসায়নিক বন্ধন, অজৈব ও জৈব রসায়ন",
  },
  {
    id: "life_science",
    nameEn: "Life Science",
    nameBn: "জীবন বিজ্ঞান",
    iconName: "Dna",
    color: "from-emerald-600 to-teal-700",
    bgLight: "bg-emerald-50 text-emerald-900 border-emerald-200",
    badgeBg: "bg-emerald-100 text-emerald-800",
    totalChapters: 5,
    description: "নিয়ন্ত্রণ ও সমন্বয়, বংশগতি, অভিব্যক্তি, পরিবেশ ও সংরক্ষণ",
  },
  {
    id: "history",
    nameEn: "History",
    nameBn: "ইতিহাস",
    iconName: "Scroll",
    color: "from-rose-600 to-red-700",
    bgLight: "bg-rose-50 text-rose-900 border-rose-200",
    badgeBg: "bg-rose-100 text-rose-800",
    totalChapters: 8,
    description: "ইতিহাসের ধারণা, সংস্কার, প্রতিরোধ ও বিদ্রোহ, ভারতের জাতীয় আন্দোলন",
  },
  {
    id: "geography",
    nameEn: "Geography",
    nameBn: "ভূগোল",
    iconName: "Globe",
    color: "from-teal-600 to-cyan-700",
    bgLight: "bg-teal-50 text-teal-900 border-teal-200",
    badgeBg: "bg-teal-100 text-teal-800",
    totalChapters: 6,
    description: "বহির্জাত প্রক্রিয়া, বায়ুমণ্ডল, বারিমণ্ডল, ভারতের ভূগোল ও উপগ্রহ চিত্র",
  },
];

export const SYLLABUS_MAP: Record<string, SyllabusChapter[]> = {
  physical_science: [
    {
      id: "ps-1",
      titleBn: "পরিবেশের জন্য ভাবনা (Concern about Our Environment)",
      titleEn: "Concern about Our Environment",
      subtopics: ["বায়ুমণ্ডলের স্তরবিন্যাস ও ওজোন স্তর", "গ্রিনহাউস এফেক্ট ও গ্লোবাল ওয়ার্মিং", "পুনর্নবীকরণযোগ্য শক্তি ও মিথেন হাইড্রেট"],
      marksWeightage: "Group A & B: 5 marks",
    },
    {
      id: "ps-2",
      titleBn: "গ্যাসের আচরণ (Behavior of Gases)",
      titleEn: "Behavior of Gases",
      subtopics: ["বয়েলের সূত্র ও লেখচিত্র", "চার্লসের সূত্র ও পরম শূন্য তাপমাত্রা", "আদর্শ গ্যাস সমীকরণ (PV=nRT) ও গ্রাহামের ব্যাপন সূত্র"],
      marksWeightage: "8 marks (Math + SA)",
    },
    {
      id: "ps-3",
      titleBn: "রাসায়নিক গণনা (Chemical Calculations)",
      titleEn: "Chemical Calculations",
      subtopics: ["ভরের সংরক্ষণ সূত্র", "মোল ধারণা ও মোলার ভর", "গ্যাসের মোলার আয়তন ও রাসায়নিক সমীকরণ সংক্রান্ত অঙ্ক"],
      marksWeightage: "4 marks (Math problem)",
    },
    {
      id: "ps-4",
      titleBn: "তাপের ঘটনাসমূহ (Thermal Phenomena)",
      titleEn: "Thermal Phenomena",
      subtopics: ["কঠিনের দৈর্ঘ্য, ক্ষেত্র ও আয়তন প্রসারণ গুণাঙ্ক", "তরলের প্রকৃত ও আপাত প্রসারণ", "তাপ পরিবাহিতাঙ্ক (K)"],
      marksWeightage: "5 marks",
    },
    {
      id: "ps-5",
      titleBn: "আলো (Light)",
      titleEn: "Light",
      subtopics: ["গলীয় দর্পণে প্রতিফলন ও ফোকাস দূরত্ব (f = r/2)", "প্রতিসরণ ও স্নেলের সূত্র (Snell's Law)", "লেন্স, বর্ণালী, বিচ্ছুরণ ও চোখের ত্রুটি"],
      marksWeightage: "12 marks (High-yield)",
    },
    {
      id: "ps-6",
      titleBn: "চলতড়িৎ (Current Electricity)",
      titleEn: "Current Electricity",
      subtopics: ["ওহমের সূত্র ও রোধের সূত্রাবলি", "জুলের তাপীয় ফল সংক্রান্ত সূত্র", "ফ্লেমিং-এর বামহস্ত নিয়ম ও গৃহবর্তনী"],
      marksWeightage: "12 marks (High-yield)",
    },
    {
      id: "ps-7",
      titleBn: "পরমাণুর নিউক্লিয়াস (Atomic Nucleus)",
      titleEn: "Atomic Nucleus",
      subtopics: ["তেজস্ক্রিয়তা ও আলফা/বিটা/গামা রশ্মির তুলনা", "ভর ত্রুটি ও নিউক্লীয় বন্ধন শক্তি", "নিউক্লীয় বিভাজন ও সংযোজন"],
      marksWeightage: "5 marks",
    },
    {
      id: "ps-8",
      titleBn: "পদার্থের ভৌত ও রাসায়নিক ধর্মসমূহ (Chemistry - Inorganic & Organic)",
      titleEn: "Inorganic & Organic Chemistry",
      subtopics: ["পর্যায় সারণি ও পর্যায়বৃত্ত ধর্ম", "আয়নীয় ও সমযোজী বন্ধন", "অজৈব রসায়ন (অ্যামোনিয়া, H2S, N2)", "জৈব রসায়ন (আইইউপিএসি নামকরণ, পলিমার)"],
      marksWeightage: "29 marks (Core Chemistry)",
    },
  ],
  life_science: [
    {
      id: "ls-1",
      titleBn: "জীবজগতের নিয়ন্ত্রণ ও সমন্বয় (Control and Coordination in Living Organisms)",
      titleEn: "Control and Coordination",
      subtopics: ["উদ্ভিদের চলন (ট্রপিক, ট্যাকটিক, ন্যাস্টিক)", "উদ্ভিদ হরমোন (অক্সিন, জিব্বেরেলিন, সাইটোকাইনিন)", "প্রাণী হরমোন ও অন্তঃক্ষরা গ্রন্থি", "মানব চক্ষু ও প্রতিবর্ত ক্রিয়া (Reflex Arc)"],
      marksWeightage: "19 marks",
    },
    {
      id: "ls-2",
      titleBn: "জীবনের ধারাবাহিকতা (Continuity of Life)",
      titleEn: "Continuity of Life",
      subtopics: ["ক্রোমোজোমের গঠন, ডিএনএ ও আরএনএ", "কোষ বিভাজন (মাইটোটিক ও মায়োসিস ধাপ)", "উদ্ভিদ ও প্রাণীর অযৌন ও যৌন জনন", "জনুক্রম ও মাইক্রোপ্রোপাগেশন"],
      marksWeightage: "17 marks",
    },
    {
      id: "ls-3",
      titleBn: "বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ (Heredity and Common Genetic Diseases)",
      titleEn: "Heredity and Genetic Diseases",
      subtopics: ["মেন্ডেলের একসংকর ও দ্বিসংকর জনন পরীক্ষা", "পৃথক্‌ভবন ও স্বাধীন সঞ্চালন সূত্র", "থ্যালাসেমিয়া, হিমোফিলিয়া ও বর্ণান্ধতা"],
      marksWeightage: "15 marks",
    },
    {
      id: "ls-4",
      titleBn: "অভিব্যক্তি ও অভিযোজন (Evolution and Adaptation)",
      titleEn: "Evolution and Adaptation",
      subtopics: ["ল্যামার্কবাদ ও ডারউইনবাদ", "সমসংস্থ ও সমবৃত্তীয় অঙ্গ", "সুন্দরী গাছ, ক্যাকটাস, পায়রা ও উটের অভিযোজন"],
      marksWeightage: "15 marks",
    },
    {
      id: "ls-5",
      titleBn: "পরিবেশ, তার সম্পদ এবং তাদের সংরক্ষণ (Environment and Conservation)",
      titleEn: "Environment and Conservation",
      subtopics: ["নাইট্রোজেন চক্র ও অম্লবৃষ্টি", "পরিবেশ দূষণ ও বায়োডাইভারসিটি হটস্পট", "ইন-সিটু ও এক্স-সিটু সংরক্ষণ, জেএফএম (JFM) ও পিবিআর (PBR)"],
      marksWeightage: "15 marks",
    },
  ],
  mathematics: [
    {
      id: "math-1",
      titleBn: "একচলবিশিষ্ট দ্বিঘাত সমীকরণ (Quadratic Equation in One Variable)",
      titleEn: "Quadratic Equation in One Variable",
      subtopics: ["ax² + bx + c = 0 সাধারণ রূপ", "শ্রীধর আচার্যের সূত্র ও নিরূপক (b² - 4ac)", "বীজদ্বয়ের যোগফল ও গুণফল", "বাস্তব সমস্যা সমাধান"],
      marksWeightage: "5 marks",
    },
    {
      id: "math-2",
      titleBn: "সরল সুদকষা ও চক্রবৃদ্ধি সুদ (Simple & Compound Interest)",
      titleEn: "Simple & Compound Interest",
      subtopics: ["I = Prt/100 সূত্র", "সমহার বৃদ্ধি বা হ্রাস", "চক্রবৃদ্ধি সুদের পর্ব ও সুদাসল নির্ণয়"],
      marksWeightage: "5 marks",
    },
    {
      id: "math-3",
      titleBn: "বৃত্ত সম্পর্কিত উপপাদ্য ও বৃত্তস্থ কোণ (Theorems Related to Circle)",
      titleEn: "Theorems on Circles",
      subtopics: ["বৃত্তের কেন্দ্রস্থ কোণ বৃত্তস্থ কোণের দ্বিগুণ", "অর্ধবৃত্তস্থ কোণ সমকোণ", "একই বৃত্তাংশস্থ সকল কোণ সমান"],
      marksWeightage: "5 marks (Theorem) + 3 marks (Application)",
    },
    {
      id: "math-4",
      titleBn: "পরিমিতি - ঘনবস্তু (Mensuration - Solids)",
      titleEn: "Mensuration - Solids",
      subtopics: ["আয়তঘন ও ঘনক", "লম্ব বৃত্তাকার চোঙ (Cylinder)", "গোলক ও অর্ধগোলক (Sphere)", "লম্ব বৃত্তাকার শঙ্কু (Cone)"],
      marksWeightage: "8 marks",
    },
    {
      id: "math-5",
      titleBn: "অনুপাত, সমানুপাত ও দ্বিঘাত করণী (Ratio, Proportion & Surds)",
      titleEn: "Ratio, Proportion & Surds",
      subtopics: ["যোগ-ভাগ প্রক্রিয়া (Componendo & Dividendo)", "k-পদ্ধতি", "দ্বিঘাত করণী নিরসন", "ভেদ (Variation)"],
      marksWeightage: "6 marks",
    },
    {
      id: "math-6",
      titleBn: "ত্রিকোণমিতি (Trigonometry)",
      titleEn: "Trigonometry",
      subtopics: ["ষষ্টিক ও বৃত্তীয় পদ্ধতি (π রেডিয়ান = 180°)", "sin, cos, tan, cot, sec, cosec অনুপাতসমূহ", "পূরক কোণের অনুপাত", "উচ্চতা ও দূরত্ব (Height & Distance)"],
      marksWeightage: "11 marks",
    },
    {
      id: "math-7",
      titleBn: "রাশিবিজ্ঞান (Statistics)",
      titleEn: "Statistics",
      subtopics: ["যৌগিক গড় (Mean - প্রত্যক্ষ, কল্পিত গড়, ক্রমবিচ্যুতি পদ্ধতি)", "মধ্যমা (Median)", "ওজাইভ (Ogive)", "সংখ্যাগুরুমান (Mode)"],
      marksWeightage: "8 marks",
    },
  ],
  history: [
    {
      id: "hist-1",
      titleBn: "ইতিহাসের ধারণা (Concept of History)",
      titleEn: "Concept of History",
      subtopics: ["নতুন সামাজিক ইতিহাস চর্চা", "খেলাধুলো, খাদ্য ও পরিবেশের ইতিহাস", "বঙ্গদর্শন, সোমপ্রকাশ, বামাবোধিনী পত্রিকা"],
      marksWeightage: "Group A, B, C",
    },
    {
      id: "hist-2",
      titleBn: "সংস্কার: বৈশিষ্ট্য ও মূল্যায়ন (Reform: Characteristics & Assessment)",
      titleEn: "Nineteenth Century Reform",
      subtopics: ["ব্রাহ্ম সমাজ আন্দোলন ও রাজা রামমোহন রায়", "বিদ্যাসাগর ও বিধবা বিবাহ", "উডের ডেসপ্যাচ ও পাশ্চাত্য শিক্ষা বিস্তার", "কলকাতা মেডিকেল কলেজ"],
      marksWeightage: "Group C, D",
    },
    {
      id: "hist-3",
      titleBn: "প্রতিরোধ ও বিদ্রোহ (Resistance & Rebellion)",
      titleEn: "Resistance & Rebellion",
      subtopics: ["সাঁওতাল বিদ্রোহ (১৮৫৫) ও সিধু-কানহু", "নীল বিদ্রোহ (১৮৫৯) ও হরিশচন্দ্র মুখার্জী", "মুন্ডা বিদ্রোহ ও বিরসা মুন্ডা"],
      marksWeightage: "Group C, D",
    },
    {
      id: "hist-4",
      titleBn: "সংঘবদ্ধতার গোড়ার কথা (Early Stages of Collective Action)",
      titleEn: "Early Collective Action",
      subtopics: ["১৮৫৭ সালের মহাবিদ্রোহের প্রকৃতি", "মহারানির ঘোষণাপত্র (১৮৫৮)", "ভারত সভা ও আনন্দমঠ উপন্যাস", "অবনীন্দ্রনাথ ঠাকুরের ভারতমাতা চিত্র"],
      marksWeightage: "8 Marks Long / 4 Marks",
    },
    {
      id: "hist-5",
      titleBn: "বিকল্প চিন্তা ও উদ্যোগ (Alternative Ideas & Initiatives)",
      titleEn: "Alternative Ideas & Initiatives",
      subtopics: ["শ্রীরামপুর মিশন প্রেস ও উইলিয়াম কেরি", "উপেন্দ্রকিশোর রায়চৌধুরীর ইউ. রায় অ্যান্ড সন্স", "বিশ্বভারতী ও রবীন্দ্রনাথের শিক্ষাদর্শন"],
      marksWeightage: "Group C, D",
    },
    {
      id: "hist-6",
      titleBn: "বিশ শতকের ভারতের আন্দোলন (20th Century Movements)",
      titleEn: "20th Century Nationalist Movements",
      subtopics: ["অসহযোগ, আইন অমান্য ও ভারত ছাড়ো আন্দোলন", "মাতাঙ্গিনী হাজরা, কল্পনা দত্ত, প্রীতিলতা ওয়াদ্দেদার", "ডালিত আন্দোলন ও বি. আর. আম্বেদকর"],
      marksWeightage: "High-yield Essay / 4 Marks",
    },
  ],
  geography: [
    {
      id: "geo-1",
      titleBn: "বহির্জাত প্রক্রিয়া ও ভূমিরূপ (Exogenetic Processes & Landforms)",
      titleEn: "Exogenetic Processes & Landforms",
      subtopics: ["নদীর ক্ষয় ও সঞ্চয় কার্যের ভূমিরূপ (আই ও ভি আকৃতির উপত্যকা, জলপ্রপাত, ব-দ্বীপ)", "হিমবাহের ক্ষয়কার্য (সার্ক, ফিওর্ড, ঝুলন্ত উপত্যকা)", "বায়ু ও জলধারার মিলিত কার্য"],
      marksWeightage: "5 marks Essay + MCQ",
    },
    {
      id: "geo-2",
      titleBn: "বায়ুমণ্ডল (Atmosphere)",
      titleEn: "Atmosphere",
      subtopics: ["বায়ুমণ্ডলের উষ্ণতার তারতম্যের কারণ", "বায়ুচাপ বলয় ও নিয়ত বায়ুপ্রবাহ", "ঘূর্ণবাত ও প্রতীপ ঘূর্ণবাত, বৃষ্টিপাতের প্রকারভেদ"],
      marksWeightage: "5 marks Essay + SA",
    },
    {
      id: "geo-3",
      titleBn: "বারিমণ্ডল ও বর্জ্য ব্যবস্থাপনা (Hydrosphere & Waste Management)",
      titleEn: "Hydrosphere & Waste",
      subtopics: ["সমুদ্রস্রোতের সৃষ্টির কারণ ও প্রভাব (উপসাগরীয় স্রোত)", "জোয়ার-ভাটা (ভরা কোটাল ও মরা কোটাল)", "বর্জ্য ব্যবস্থাপনায় শিক্ষার্থীদের ভূমিকা ও 3R পদ্ধতি"],
      marksWeightage: "7 marks",
    },
    {
      id: "geo-4",
      titleBn: "ভারত: প্রাকৃতিক পরিবেশ (India - Physical Environment)",
      titleEn: "India - Physical Environment",
      subtopics: ["উত্তরের পার্বত্য অঞ্চল ও উপদ্বীপীয় মালভূমি", "উত্তর ও দক্ষিণ ভারতের নদনদীর তুলনা", "মৌসুমি জলবায়ু ও ভারতের মৃত্তিকা শ্রেণীবিভাগ"],
      marksWeightage: "12 marks",
    },
    {
      id: "geo-5",
      titleBn: "ভারত: অর্থনৈতিক পরিবেশ (India - Economic Environment)",
      titleEn: "India - Economic Environment",
      subtopics: ["কৃষি ফসল: ধান, গম, চা, কার্পাস চাষের অনুকূল ভৌগোলিক পরিবেশ", "পূর্ব ও মধ্য ভারতে লৌহ-ইস্পাত শিল্পের কেন্দ্রীভবন", "তথ্যপ্রযুক্তি শিল্প ও ভারতের জনসংখ্যা বণ্টন"],
      marksWeightage: "12 marks",
    },
    {
      id: "geo-6",
      titleBn: "উপগ্রহ চিত্র ও ভূবৈচিত্র্যসূচক মানচিত্র (Satellite Imagery & Topographical Maps)",
      titleEn: "Satellite Imagery & Toposheet",
      subtopics: ["উপগ্রহ চিত্রের ব্যবহার ও গুরুত্ব", "ছদ্ম রঙ (FCC)", "ভূবৈচিত্র্যসূচক মানচিত্রের স্কেল ও সমন্বতি রেখা"],
      marksWeightage: "5 marks",
    },
  ],
  bengali: [
    {
      id: "ben-1",
      titleBn: "গল্প ও কবিতা (Stories & Poetry)",
      titleEn: "Stories & Poetry",
      subtopics: ["জ্ঞানচক্ষু (আশাপূর্ণা দেবী)", "বহুরূপী (সুবোধ ঘোষ)", "পথের দাবী (শরৎচন্দ্র চট্টোপাধ্যায়)", "আফ্রিকা ও প্রলয়োল্লাস"],
      marksWeightage: "Core Literature",
    },
    {
      id: "ben-2",
      titleBn: "নাটক: সিরাজউদ্দৌলা (Drama: Siraj-ud-Daulah)",
      titleEn: "Drama - Siraj-ud-Daulah",
      subtopics: ["শচীন্দ্রনাথ সেনগুপ্তের নাটক", "সিরাজউদ্দৌলা, ঘসেটি বেগম ও মীরজাফরের চরিত্র চিত্রণ", "ঐতিহাসিক নাটকের সংলাপ"],
      marksWeightage: "4 marks",
    },
    {
      id: "ben-3",
      titleBn: "ব্যাকরণ (Bengali Grammar)",
      titleEn: "Bengali Grammar",
      subtopics: ["কারক ও বিভক্তি, অকারক পদ", "সমাস (তৎপুরুষ, কর্মধারয়, বহুব্রীহি, দ্বন্দ্ব, দ্বিগু)", "বাক্য ও বাচ্য পরিবর্তন"],
      marksWeightage: "16 marks (MCQ + VSA)",
    },
    {
      id: "ben-4",
      titleBn: "নির্মিতি (Composition & Writing)",
      titleEn: "Composition",
      subtopics: ["প্রতিবেদন রচনা (Report Writing)", "কাল্পনিক সংলাপ (Dialogue)", "বঙ্গানুবাদ (Bengali Translation)", "প্রবন্ধ রচনা (Essay - 10 Marks)"],
      marksWeightage: "24 marks",
    },
  ],
  english: [
    {
      id: "eng-1",
      titleBn: "Prose Lessons",
      titleEn: "Prose",
      subtopics: ["Father's Help (R.K. Narayan)", "The Passing Away of Bapu (Nayantara Sehgal)", "Our Runaway Kite (L.M. Montgomery)", "The Cat (A.B. Paterson)"],
      marksWeightage: "Seen Passage: 20 marks",
    },
    {
      id: "eng-2",
      titleBn: "Poetry Lessons",
      titleEn: "Poetry",
      subtopics: ["The Snail (William Cowper)", "Sea Fever (John Masefield)", "My Own True Family (Ted Hughes)"],
      marksWeightage: "Poetry comprehension",
    },
    {
      id: "eng-3",
      titleBn: "Grammar & Vocabulary",
      titleEn: "Grammar & Vocabulary",
      subtopics: ["Voice Change & Narration Change", "Phrasal Verbs (Important List)", "Articles & Prepositions", "Joining of Sentences & Clauses"],
      marksWeightage: "20 marks",
    },
    {
      id: "eng-4",
      titleBn: "Writing Skills",
      titleEn: "Writing Skills",
      subtopics: ["Notice Writing (School & Club)", "Letter Writing (Editorial & Personal)", "Story Writing with Morals", "Process & Report Writing"],
      marksWeightage: "30 marks (3 x 10 marks)",
    },
  ],
};

// Pre-loaded high quality practice sets for instant interactive quiz
export const SAMPLE_QUESTIONS: Record<string, Question[]> = {
  physical_science: [
    {
      id: "ps-q1",
      type: "mcq",
      question: "স্থির তাপমাত্রায় নির্দিষ্ট ভরের গ্যাসের ক্ষেত্রে চাপ (P) ও আয়তন (V)-এর গুণফল (PV) বনাম চাপ (P) লেখচিত্রটি কেমন হবে?",
      options: [
        "মূলবিন্দুগামী সরলরেখা",
        "P-অক্ষের সমান্তরাল সরলরেখা",
        "একটি বৃত্তাকার বক্ররেখা",
        "অধিবৃত্তাকার লেখচিত্র"
      ],
      correctAnswer: "P-অক্ষের সমান্তরাল সরলরেখা",
      explanation: "বয়েলের সূত্রানুসারে স্থির উষ্ণতায় PV = ধ্রুবক (Constant)। ফলে P পরিবর্তিত হলেও PV অপরিবর্তিত থাকে, তাই লেখচিত্রটি অনুভূমিক অর্থাৎ P-অক্ষের সমান্তরাল সরলরেখা হয়।",
      tip: "বয়েলের সূত্রে স্থির রাশি দুটি হলো: গ্যাসের ভর ও গ্যাসের তাপমাত্রা।",
      difficulty: "medium",
      subject: "Physical Science",
      topic: "গ্যাসের আচরণ (Behavior of Gases)"
    },
    {
      id: "ps-q2",
      type: "mcq",
      question: "বায়ু থেকে কাঁচে আলোর প্রতিসরণের সময় নিচের কোন রাশিটি অপরিবর্তিত থাকে?",
      options: [
        "তরঙ্গদৈর্ঘ্য (Wavelength)",
        "গতিবেগ (Velocity)",
        "কম্পাঙ্ক (Frequency)",
        "বিস্তার (Amplitude)"
      ],
      correctAnswer: "কম্পাঙ্ক (Frequency)",
      explanation: "আলো এক মাধ্যম থেকে অন্য মাধ্যমে প্রতিসৃত হলে আলোর কম্পাঙ্ক (Frequency) উৎসের ধর্মের ওপর নির্ভর করে এবং মাধ্যম পরিবর্তনে সর্বদা অপরিবর্তিত থাকে। বেগ এবং তরঙ্গদৈর্ঘ্য উভয়ই পরিবর্তিত হয়।",
      tip: "সূত্রের রূপ: v = f × λ (যেখানে f ধ্রুবক, v কমলে λ ও কমে)।",
      difficulty: "easy",
      subject: "Physical Science",
      topic: "আলো (Light)"
    },
    {
      id: "ps-q3",
      type: "true_false",
      question: "গ্রিনহাউস গ্যাসগুলির মধ্যে বায়ুমণ্ডলে সর্বাধিক অবদানকারী গ্যাস হলো কার্বন ডাই-অক্সাইড (CO₂)।",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "বায়ুমণ্ডলে বিভিন্ন গ্রিনহাউস গ্যাসের মধ্যে CO₂ প্রায় ৬০% বিশ্ব উষ্ণায়নের জন্য দায়ী, তাই এটি প্রধান গ্রিনহাউস গ্যাস।",
      tip: "মিথেন (CH₄)-এর গ্লোবাল ওয়ার্মিং পোটেনশিয়াল CO₂ অপেক্ষা বেশি হলেও পরিমাণে CO₂ সবচেয়ে বেশি নির্গত হয়।",
      difficulty: "easy",
      subject: "Physical Science",
      topic: "পরিবেশের জন্য ভাবনা"
    },
    {
      id: "ps-q4",
      type: "mcq",
      question: "1 BOT (Board of Trade Unit) বলতে কত জুল তড়িৎ শক্তি বোঝায়?",
      options: [
        "3.6 × 10⁵ Joule",
        "3.6 × 10⁶ Joule",
        "746 Joule",
        "1000 Joule"
      ],
      correctAnswer: "3.6 × 10⁶ Joule",
      explanation: "1 BOT = 1 কিলোওয়াট-ঘণ্টা (1 kWh) = 1000 Watt × 3600 seconds = 3,600,000 Joules = 3.6 × 10⁶ J।",
      tip: "বাড়ি-ঘরের বৈদ্যুতিক মিটারের বিল BOT ইউনিট (kWh)-এ হিসাব করা হয়।",
      difficulty: "medium",
      subject: "Physical Science",
      topic: "চলতড়িৎ (Current Electricity)"
    },
    {
      id: "ps-q5",
      type: "mcq",
      question: "তেজস্ক্রিয় পরমাণুর নিউক্লিয়াস থেকে একটি β (বিটা) কণা নির্গত হলে সৃষ্ট নতুন মৌলের পরমাণু ক্রমাঙ্কের কী পরিবর্তন হয়?",
      options: [
        "1 একক কমে যায়",
        "1 একক বৃদ্ধি পায়",
        "2 একক কমে যায়",
        "কোনো পরিবর্তন হয় না"
      ],
      correctAnswer: "1 একক বৃদ্ধি পায়",
      explanation: "একটি নিউট্রন ভেঙ্গে একটি প্রোটন ও একটি বিটা কণায় পরিণত হয় (n → p + e⁻)। ফলে নিউক্লিয়াসে প্রোটন সংখ্যা তথা পরমাণু ক্রমাঙ্ক (Z) ১ একক বাড়ে কিন্তু ভরসংখ্যা (A) অপরিবর্তিত থাকে।",
      tip: "সোডি-ফাজানের সূত্র: আলফা (α) কণা নির্গমনে Z কমে ২ একক ও A কমে ৪ একক; বিটা (β) কণা নির্গমনে Z বাড়ে ১ একক।",
      difficulty: "hard",
      subject: "Physical Science",
      topic: "পরমাণুর নিউক্লিয়াস"
    }
  ],
  life_science: [
    {
      id: "ls-q1",
      type: "mcq",
      question: "উদ্ভিদের ফটোট্রপিক চলন নিয়ন্ত্রণে কোন উদ্ভিদ হরমোনটি প্রধান ভূমিকা গ্রহণ করে?",
      options: [
        "জিব্বেরেলিন (Gibberellin)",
        "সাইটোকাইনিন (Cytokinin)",
        "অক্সিন (Auxin - IAA)",
        "অ্যাবসিসিক অ্যাসিড (ABA)"
      ],
      correctAnswer: "অক্সিন (Auxin - IAA)",
      explanation: "অক্সিন হরমোন উদ্ভিদের কাণ্ডের অগ্রভাগে আলোর বিপরীত দিকে বেশি পরিমাণে সঞ্চিত হয় এবং সেখানকার কোষ বিভাজন দ্রুত ঘটিয়ে কাণ্ডকে আলোর উৎসের দিকে বাঁকিয়ে দেয়।",
      tip: "মনে রাখার উপায়: Auxin = Apex growth & Phototropism, Gibberellin = পর্বমধ্যের দৈর্ঘ্য বৃদ্ধি, Cytokinin = বার্ধক্য বিলম্বিত করা।",
      difficulty: "easy",
      subject: "Life Science",
      topic: "জীবজগতের নিয়ন্ত্রণ ও সমন্বয়"
    },
    {
      id: "ls-q2",
      type: "mcq",
      question: "কোষ চক্রের ইন্টারফেজের কোন দশায় DNA-এর প্রতিলিপিকরণ (DNA Replication) সম্পন্ন হয়?",
      options: [
        "G₁ দশা (Gap 1)",
        "S দশা (Synthetic phase)",
        "G₂ দশা (Gap 2)",
        "M দশা (Mitotic phase)"
      ],
      correctAnswer: "S দশা (Synthetic phase)",
      explanation: "ইন্টারফেজ দশার S (Synthesis) উপদশায় ডিএনএ পলিমারেজ উৎসেচকের সাহায্যে মূল ডিএনএ অণুর অনুরূপ নতুন ডিএনএ সংশ্লেষিত হয়।",
      tip: "কোষ চক্রের পর্যায়ক্রমিক ক্রম: G₁ → S → G₂ → M দশা।",
      difficulty: "medium",
      subject: "Life Science",
      topic: "জীবনের ধারাবাহিকতা"
    },
    {
      id: "ls-q3",
      type: "mcq",
      question: "মেন্ডেলের দ্বিসংকর জনন পরীক্ষায় F₂ জনুর ফিনোটাইপ অনুপাতটি কী?",
      options: [
        "3 : 1",
        "9 : 3 : 3 : 1",
        "1 : 2 : 1",
        "9 : 7"
      ],
      correctAnswer: "9 : 3 : 3 : 1",
      explanation: "মটর গাছের দুটি ভিন্ন বৈশিষ্ট্যের (যেমন হলুদ-গোল ও সবুজ-কুঞ্চিত) দ্বিসংকর জননের F₂ জনুতে ৪ প্রকার ফিনোটাইপ উৎপন্ন হয় যার অনুপাত ৯:৩:৩:১।",
      tip: "একসংকর জননের ফিনোটাইপ অনুপাত ৩:১ এবং জিনোটাইপ অনুপাত ১:২:১। দ্বিসংকর জননের জিনোটাইপ অনুপাত ১:২:২:৪:১:২:১:২:১।",
      difficulty: "easy",
      subject: "Life Science",
      topic: "বংশগতি এবং সাধারণ জিনগত রোগ"
    },
    {
      id: "ls-q4",
      type: "true_false",
      question: "বায়োডাইভারসিটি হটস্পট হিসেবে ভারতের সুন্দরবনকে 'সুন্দরল্যান্ড' (Sundaland) হটস্পটের অন্তর্গত করা হয়েছে।",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "ভারতের চারটি জীববৈচিত্র্য হটস্পট হলো: পূর্ব হিমালয়, পশ্চিমঘাট ও শ্রীলঙ্কা, ইন্দো-বার্মা এবং সুন্দরল্যান্ড (নিকোবর ও সুন্দরবন অঞ্চল এর সীমানার মধ্যে পড়ে)।",
      tip: "হটস্পট শব্দটি বিজ্ঞানী নরম্যান মায়ার্স ১৯৮৮ সালে প্রথম প্রবর্তন করেন।",
      difficulty: "medium",
      subject: "Life Science",
      topic: "পরিবেশ ও তার সংরক্ষণ"
    }
  ],
  mathematics: [
    {
      id: "math-q1",
      type: "mcq",
      question: "ax² + bx + c = 0 (a ≠ 0) দ্বিঘাত সমীকরণের বীজ দুটি বাস্তব ও সমান হওয়ার শর্ত কী?",
      options: [
        "b² - 4ac > 0",
        "b² - 4ac < 0",
        "b² - 4ac = 0",
        "b² + 4ac = 0"
      ],
      correctAnswer: "b² - 4ac = 0",
      explanation: "দ্বিঘাত সমীকরণের নিরূপক D = b² - 4ac। নিরূপকের মান ০ হলে শ্রীধর আচার্যের সূত্র x = (-b ± √0) / 2a = -b/2a, অর্থাৎ উভয় বীজই বাস্তব এবং সমান হয়।",
      tip: "b² - 4ac > 0 হলে বীজদ্বয় বাস্তব ও অসমান; b² - 4ac < 0 হলে কোনো বাস্তব বীজ থাকে না (কাল্পনিক)।",
      difficulty: "easy",
      subject: "Mathematics",
      topic: "একচলবিশিষ্ট দ্বিঘাত সমীকরণ"
    },
    {
      id: "math-q2",
      type: "mcq",
      question: "একটি লম্ব বৃত্তাকার চোঙের ব্যাসার্ধ r এবং উচ্চতা h হলে তার বক্রতলের ক্ষেত্রফল কত?",
      options: [
        "πr²h বর্গ একক",
        "2πrh বর্গ একক",
        "2πr(r + h) বর্গ একক",
        "1/3 πr²h বর্গ একক"
      ],
      correctAnswer: "2πrh বর্গ একক",
      explanation: "লম্ব বৃত্তাকার চোঙের বক্রতলের ক্ষেত্রফল = ভূমির পরিধি × উচ্চতা = 2πr × h = 2πrh বর্গ একক। সমগ্রতলের ক্ষেত্রফল হলে 2πr(r + h) হতো।",
      tip: "সূত্র মনে রাখুন: চোঙের আয়তন = πr²h, বক্রতল = 2πrh, সমগ্রতল = 2πr(r + h)।",
      difficulty: "easy",
      subject: "Mathematics",
      topic: "পরিমিতি - লম্ব বৃত্তাকার চোঙ"
    },
    {
      id: "math-q3",
      type: "mcq",
      question: "যদি sin θ - cos θ = 0 হয় (যেখানে 0° < θ < 90°), তবে tan θ-এর মান কত?",
      options: [
        "0",
        "1",
        "1/√3",
        "√3"
      ],
      correctAnswer: "1",
      explanation: "sin θ - cos θ = 0 ⇒ sin θ = cos θ ⇒ sin θ / cos θ = 1 ⇒ tan θ = 1 (যেখানে θ = 45°)।",
      tip: "θ = 45° কোণে sin 45° = 1/√2 এবং cos 45° = 1/√2 হওয়ায় তারা পরস্পর সমান।",
      difficulty: "medium",
      subject: "Mathematics",
      topic: "ত্রিকোণমিতি"
    },
    {
      id: "math-q4",
      type: "true_false",
      question: "কোনো বৃত্তস্থ চতুর্ভুজের বিপরীত কোণদ্বয় পরস্পর সম্পূরক (অর্থাৎ সমষ্টি ১৮০°)।",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "মাধ্যমিকের উপপাদ্য ৩৮ অনুসারে: বৃত্তস্থ চতুর্ভুজের বিপরীত কোণগুলি পরস্পর সম্পূরক (Supplementary), অর্থাৎ ∠A + ∠C = 180° এবং ∠B + ∠D = 180°।",
      tip: "এটি মাধ্যমিকে ৫ নম্বরের উপপাদ্য প্রমাণের অন্যতম জনপ্রিয় প্রশ্ন!",
      difficulty: "easy",
      subject: "Mathematics",
      topic: "বৃত্ত সম্পর্কিত উপপাদ্য"
    }
  ],
  history: [
    {
      id: "hist-q1",
      type: "mcq",
      question: "১৮৫৯-৬০ খ্রিস্টাব্দে সংঘটিত ঐতিহাসিক নীল বিদ্রোহের প্রথম সূচনা বাংলার কোন জেলায় হয়েছিল?",
      options: [
        "মেদিনীপুর",
        "নদীয়া (চৌগাছা গ্রাম)",
        "২৪ পরগনা",
        "মুর্শিদাবাদ"
      ],
      correctAnswer: "নদীয়া (চৌগাছা গ্রাম)",
      explanation: "১৮৫৯ খ্রিস্টাব্দের সেপ্টেম্বর মাসে নদীয়া জেলার কৃষ্ণনগরের কাছে চৌগাছা গ্রামে বিষ্ণুচরণ বিশ্বাস ও দিগম্বর বিশ্বাসের নেতৃত্বে নীলচাষীরা প্রথম বিদ্রোহ ঘোষণা করেন।",
      tip: "দীনবন্ধু মিত্রের 'নীলদর্পণ' নাটক এই বিদ্রোহের পটভূমিকায় রচিত, যার ইংরেজি অনুবাদ করেছিলেন মাইকেল মধুসূদন দত্ত এবং প্রকাশ করেছিলেন রেভারেন্ড জেমস লং।",
      difficulty: "medium",
      subject: "History",
      topic: "প্রতিরোধ ও বিদ্রোহ"
    },
    {
      id: "hist-q2",
      type: "mcq",
      question: "ভারতে প্রথম আধুনিক চিত্রশিল্পী হিসেবে 'ভারতমাতা' চিত্রটি কে অঙ্কন করেছিলেন?",
      options: [
        "রবীন্দ্রনাথ ঠাকুর",
        "অবনীন্দ্রনাথ ঠাকুর",
        "নন্দলাল বসু",
        "গগনেন্দ্রনাথ ঠাকুর"
      ],
      correctAnswer: "অবনীন্দ্রনাথ ঠাকুর",
      explanation: "১৯০৫ খ্রিস্টাব্দে বঙ্গভঙ্গ আন্দোলনের পটভূমিকায় অবনীন্দ্রনাথ ঠাকুর স্বদেশি ভাবনায় উদ্বুদ্ধ হয়ে চতুর্ভুজা সন্ন্যাসিনী রূপে 'ভারতমাতা' চিত্রটি আঁকেন।",
      tip: "ভারতমাতার চার হাতে ছিল বেদ (জ্ঞান), ধানের শিষ (অন্ন), রুদ্রাক্ষের মালা (দীক্ষা) ও শ্বেতবস্ত্র (বস্ত্র)। ভগিনী নিবেদিতা এই চিত্রের ভূয়সী প্রশংসা করেছিলেন।",
      difficulty: "easy",
      subject: "History",
      topic: "সংঘবদ্ধতার গোড়ার কথা"
    },
    {
      id: "hist-q3",
      type: "true_false",
      question: "১৮৫৭ খ্রিস্টাব্দের মহাবিদ্রোহের পর ১৮৫৮ সালের ১ নভেম্বর মহারানি ভিক্টোরিয়ার ঐতিহাসিক ঘোষণাপত্র এলাহাবাদে পাঠ করেছিলেন লর্ড ক্যানিং।",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "লর্ড ক্যানিং এলাহাবাদ দরবারে মহারানির ঐতিহাসিক ঘোষণাপত্র পাঠ করেন, যার মাধ্যমে ইস্ট ইন্ডিয়া কোম্পানির শাসনের অবসান ঘটে এবং ভারতের শাসনভার সরাসরি ব্রিটিশ রাজমুকুটের অধীনে চলে যায়।",
      tip: "লর্ড ক্যানিং ছিলেন ভারতের শেষ গভর্নর জেনারেল এবং প্রথম ভাইসরয়।",
      difficulty: "medium",
      subject: "History",
      topic: "সংঘবদ্ধতার গোড়ার কথা"
    }
  ],
  geography: [
    {
      id: "geo-q1",
      type: "mcq",
      question: "পর্বতের গায়ে ঝুলন্ত উপত্যকায় নদী প্রবাহিত হলে সাধারণত কোন ভূমিরূপটি গঠিত হয়?",
      options: [
        "অশ্বক্ষুরাকৃতি হ্রদ",
        "জলপ্রপাত (Waterfall)",
        "প্লাবনভূমি",
        "ব-দ্বীপ"
      ],
      correctAnswer: "জলপ্রপাত (Waterfall)",
      explanation: "হিমবাহের ক্ষয়কার্যের ফলে সৃষ্ট প্রধান উপত্যকার চেয়ে শাখা উপত্যকা উঁচুতে ঝুলে থাকলে তাকে ঝুলন্ত উপত্যকা বলে। পরবর্তীতে এখান দিয়ে নদী প্রবাহিত হলে খাড়া ঢাল বেয়ে জলপ্রপাত সৃষ্টি হয়।",
      tip: "ভারতের সর্বোচ্চ জলপ্রপাত কর্নাটকের বরাহী নদীর উপর কুঞ্চিকল জলপ্রপাত (৪৫৫ মিটার)।",
      difficulty: "easy",
      subject: "Geography",
      topic: "বহির্জাত প্রক্রিয়া ও ভূমিরূপ"
    },
    {
      id: "geo-q2",
      type: "mcq",
      question: "দক্ষিণ ভারতের কোন নদীকে তার পবিত্রতা ও দীর্ঘতার জন্য 'দক্ষিণের গঙ্গা' বলা হয়?",
      options: [
        "নর্মদা",
        "তাপ্তী",
        "গোদাবরী",
        "কাবেরী"
      ],
      correctAnswer: "গোদাবরী",
      explanation: "গোদাবরী দক্ষিণ ভারতের দীর্ঘতম নদী (১৪৬৫ কিমি) এবং ঐতিহ্যের দিক থেকে অত্যন্ত পবিত্র বলে গণ্য হওয়ায় একে 'বৃদ্ধ গঙ্গা' বা 'দক্ষিণের গঙ্গা' বলা হয়।",
      tip: "পবিত্রতার দিক থেকে তামিলনাড়ুর কাবেরী নদীকেও ক্ষেত্রবিশেষে দক্ষিণের গঙ্গা তুলনা করা হলেও ভৌগোলিক দৈর্ঘ্যে গোদাবরী সর্বপ্রধান।",
      difficulty: "medium",
      subject: "Geography",
      topic: "ভারতের নদনদী"
    },
    {
      id: "geo-q3",
      type: "true_false",
      question: "উপগ্রহ চিত্রে উদ্ভিদের সবুজ অরণ্য ও স্বাভাবিক উদ্ভিদকে সাধারণত লাল (Red) রঙে চিহ্নিত করা হয়।",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "উপগ্রহ চিত্রে ফলস কালার কম্পোজিট (FCC) প্রযুক্তিতে অবলোহিত (Infrared) তরঙ্গে উদ্ভিদের ক্লোরোফিল তীব্র প্রতিফলন ঘটায়, যার ফলে স্বাভাবিক উদ্ভিদ গাঢ় লাল বা উজ্জ্বল লাল রঙে প্রদর্শিত হয়।",
      tip: "FCC-তে জলাশয় নীল বা কালো, ঘরবাড়ি ধূসর বা নীলচে এবং বরফ সাদা রঙে দেখা যায়।",
      difficulty: "medium",
      subject: "Geography",
      topic: "উপগ্রহ চিত্র ও ভূবৈচিত্র্যসূচক মানচিত্র"
    }
  ],
  bengali: [
    {
      id: "ben-q1",
      type: "mcq",
      question: "'জ্ঞানচক্ষু' গল্পে তপনের নতুন মেসোমশাই কোন পত্রিকার সম্পাদককে তপনের গল্পটি ছাপানোর কথা বলেছিলেন?",
      options: [
        "আনন্দমেলা",
        "সন্ধ্যাতারা",
        "শুকতারা",
        "প্রবাসী"
      ],
      correctAnswer: "সন্ধ্যাতারা",
      explanation: "আশাপূর্ণা দেবীর রচিত 'জ্ঞানচক্ষু' গল্পে তপনের ছোট মেসোমশাই (যিনি একজন লেখক ছিলেন) 'সন্ধ্যাতারা' পত্রিকার সম্পাদকের পরিচিত হওয়ায় গল্পটি ছাপিয়ে দেওয়ার প্রতিশ্রুতি দেন।",
      tip: "গল্পটির মূল তাৎপর্য হলো তপনের ভেতরের আত্মমর্যাদা এবং সত্যকারের লেখক হয়ে ওঠার আত্মজ্ঞান।",
      difficulty: "easy",
      subject: "Bengali",
      topic: "জ্ঞানচক্ষু"
    },
    {
      id: "ben-q2",
      type: "mcq",
      question: "'রাজায় রাজায় যুদ্ধ হয়'—এই বাক্যে 'রাজায় রাজায়' কোন ধরনের কর্তা?",
      options: [
        "প্রযোজ্য কর্তা",
        "প্রযোজক কর্তা",
        "ব্যতিহার কর্তা",
        "উক্ত কর্তা"
      ],
      correctAnswer: "ব্যতিহার কর্তা",
      explanation: "একই ক্রিয়ার দ্বারা যখন দুই বা ততোধিক কর্তার পারস্পরিক বিরোধ বা প্রতিযোগিতা বোঝায়, তখন তাকে ব্যতিহার কর্তা বলে (যেমন: রাজায় রাজায় যুদ্ধ হয়, বাঘে মহিষে এক ঘাটে জল খায়)।",
      tip: "প্রযোজক কর্তা নিজে না করে অন্যকে দিয়ে কাজ করায় (মা শিশুকে চাঁদ দেখান), প্রযোজ্য কর্তা যাকে দিয়ে কাজ করানো হয় (শিশু)।",
      difficulty: "medium",
      subject: "Bengali",
      topic: "কারক ও অকারক সম্পর্ক"
    }
  ],
  english: [
    {
      id: "eng-q1",
      type: "mcq",
      question: "In R.K. Narayan's story 'Father's Help', Swami gave which excuse to avoid going to school on Monday morning?",
      options: [
        "He had a severe fever",
        "He had a headache",
        "He had forgotten his homework notebook",
        "His teacher Samuel beat him yesterday"
      ],
      correctAnswer: "He had a headache",
      explanation: "Swami gave the initial pretext at 9 o'clock that he had a headache to escape going to school on a Monday morning.",
      tip: "Key characters to remember: Swaminathan, Swami's father, and the teacher Samuel.",
      difficulty: "easy",
      subject: "English",
      topic: "Father's Help"
    },
    {
      id: "eng-q2",
      type: "mcq",
      question: "Identify the correct phrasal verb: 'The fire was extinguished by the firefighters.'",
      options: [
        "Put off",
        "Put out",
        "Put down",
        "Put up with"
      ],
      correctAnswer: "Put out",
      explanation: "'Put out' means to extinguish a fire or light. 'Put off' means postpone, and 'put up with' means tolerate.",
      tip: "High-yield Madhyamik Phrasal Verbs: Extinguish = Put out; Tolerate = Put up with; Abandon = Give up; Resemble = Take after.",
      difficulty: "medium",
      subject: "English",
      topic: "Grammar & Phrasal Verbs"
    }
  ]
};

// High-Yield Mnemonics and Memory Tricks
export const MNEMONICS_LIST: MnemonicItem[] = [
  {
    id: "m-reactivity",
    subject: "physical_science",
    title: "ধাতুর সক্রিয়তা শ্রেণি মনে রাখার ছন্দ (Metal Reactivity Series)",
    mnemonic: "Please Stop Calling Me A Careless Zebra, Instead Try Learning How Copper Saves Gold",
    explanation: "তড়িৎ-রাসায়নিক সক্রিয়তা শ্রেণিতে সবচেয়ে সক্রিয় ধাতু থেকে কম সক্রিয় ধাতুর ক্রম সহজেই মনে রাখুন।",
    fullFormOrBreakdown: [
      { key: "Please", value: "Potassium (K)" },
      { key: "Stop", value: "Sodium (Na)" },
      { key: "Calling", value: "Calcium (Ca)" },
      { key: "Me", value: "Magnesium (Mg)" },
      { key: "A", value: "Aluminium (Al)" },
      { key: "Careless", value: "Carbon (C)" },
      { key: "Zebra", value: "Zinc (Zn)" },
      { key: "Instead", value: "Iron (Fe)" },
      { key: "Try", value: "Tin (Sn)" },
      { key: "Learning", value: "Lead (Pb)" },
      { key: "How", value: "Hydrogen (H)" },
      { key: "Copper", value: "Copper (Cu)" },
      { key: "Saves", value: "Silver (Ag)" },
      { key: "Gold", value: "Gold (Au)" },
    ],
  },
  {
    id: "m-mitosis",
    subject: "life_science",
    title: "মাইটোটিক কোষ বিভাজনের চার দশার ক্রম (Mitosis Stages)",
    mnemonic: "I Passed My Anatomy Test (IPMAT)",
    explanation: "ইন্টারফেজ থেকে শুরু করে ক্যারিয়োকাইনেসিসের পর্যায়ক্রমিক চারটি ধাপ নির্ভুল মনে রাখার কৌশল।",
    fullFormOrBreakdown: [
      { key: "I", value: "Interphase (প্রস্তুতি পর্ব)" },
      { key: "P", value: "Prophase (ক্রোমাটিন ঘন ও নিউক্লিওলাস অবলুপ্ত)" },
      { key: "M", value: "Metaphase (ক্রোমোজোম বিষুব অঞ্চলে সাজানো)" },
      { key: "A", value: "Anaphase (ক্রোমাটিড মেরুর দিকে গমন - V, L, J, I রূপ)" },
      { key: "T", value: "Telophase (অপত্য নিউক্লিয়াস পুনর্গঠন)" },
    ],
  },
  {
    id: "m-trig",
    subject: "mathematics",
    title: "ত্রিকোণমিতির অনুপাত মনে রাখার কবিতা (Some People Have...)",
    mnemonic: "Some People Have Curly Brown Hair, Turned Permanently Black",
    explanation: "সমকোণী ত্রিভুজের বাহুর সাপেক্ষে sin, cos, tan-এর সূত্র সহজে মনে রাখার আন্তর্জাতিক ছন্দ।",
    fullFormOrBreakdown: [
      { key: "Some People Have", value: "sin θ = Perpendicular / Hypotenuse (লম্ব / অতিভুজ)" },
      { key: "Curly Brown Hair", value: "cos θ = Base / Hypotenuse (ভূমি / অতিভুজ)" },
      { key: "Turned Permanently Black", value: "tan θ = Perpendicular / Base (লম্ব / ভূমি)" },
    ],
  },
  {
    id: "m-bengal-rebellion",
    subject: "history",
    title: "বাংলার কৃষক ও উপজাতি বিদ্রোহের কালানুক্রম (Historical Chronology)",
    mnemonic: "চুয়ার (১৭৯৮) → কোল (১৮৩১) → সাঁওতাল (১৮৫৫) → নীল (১৮৫৯) → মুন্ডা (১৮৯৯)",
    explanation: "ঐতিহাসিক আন্দোলনের ক্রমিক সাল সাজাতে প্রায়শই মাধ্যমিকে প্রশ্ন আসে। 'চু-কো-সাঁ-নী-মু' ছন্দ মনে রাখুন!",
    fullFormOrBreakdown: [
      { key: "চুয়ার", value: "১৭৯৮-৯৯ (দুর্জন সিংহ, মেদিনীপুর)" },
      { key: "কোল", value: "১৮৩১-৩২ (বুদ্ধু ভগত, ছোটনাগপুর)" },
      { key: "সাঁওতাল", value: "১৮৫৫-৫৬ (সিধু ও কানহু, রাজমহল পাহাড়)" },
      { key: "নীল", value: "১৮৫৯-৬০ (দিগম্বর ও বিষ্ণুচরণ বিশ্বাস, নদীয়া)" },
      { key: "মুন্ডা", value: "১৮৯৯-১৯০০ (উলগুলান, বিরসা মুন্ডা)" },
    ],
  },
  {
    id: "m-atmosphere",
    subject: "geography",
    title: "বায়ুমণ্ডলের স্তরবিন্যাসের সহজ ক্রম (Layers of Atmosphere)",
    mnemonic: "The Silly Monkey Took Every Oreo (T-S-M-T-E)",
    explanation: "ভূপৃষ্ঠ থেকে ওপরের দিকে বায়ুমণ্ডলের স্তরগুলির নাম ক্রমানুসারে মনে রাখুন।",
    fullFormOrBreakdown: [
      { key: "The", value: "Troposphere (ক্ষুব্ধমণ্ডল - মেঘ, বৃষ্টি)" },
      { key: "Silly", value: "Stratosphere (শান্তমণ্ডল - জেট বিমান চলাচল, ওজোন স্তর)" },
      { key: "Monkey", value: "Mesosphere (শীতলতম স্তর - উল্কা পুড়ে ছাই)" },
      { key: "Took", value: "Thermosphere / Ionosphere (বেতার তরঙ্গ প্রতিফলন)" },
      { key: "Every", value: "Exosphere (হিলিয়াম ও হাইড্রোজেন গ্যাস)" },
    ],
  },
];

// Curated High-Yield Study Facts matching Prompt Schema
export const CURATED_STUDY_FACTS: StudyFact[] = [
  {
    fact: "পরম শূন্য তাপমাত্রা হলো -273.15°C বা 0 Kelvin, যে তাপমাত্রায় যেকোনো আদর্শ গ্যাসের আয়তন তাত্ত্বিকভাবে শূন্য হয়ে যায়।",
    whyItMatters: "চার্লসের সূত্র V_t = V_0(1 + t/273) থেকে প্রায় প্রতিবছর মাধ্যমিকে পরম শূন্য উষ্ণতার গাণিতিক প্রমাণ বা মান চাওয়া হয়।",
    memoryTip: "মনে রাখবেন: কেলভিন স্কেলে কোনো ঋণাত্মক মান (Negative temperature) সম্ভব নয়, সর্বনিম্ন মান ০ K।",
    subject: "Physical Science",
    topic: "গ্যাসের আচরণ (Behavior of Gases)",
  },
  {
    fact: "মানবদেহের শুক্রাণু ও ডিম্বাণুতে ক্রোমোজোম সংখ্যা n = 23 (হ্যাপ্লয়েড), কিন্তু দেহকোষ বা জাইগোটে 2n = 46 (ডিপ্লয়েড)।",
    whyItMatters: "মাইয়োসিস কোষ বিভাজনকে 'হ্রাস বিভাজন' বলা হয় কারণ জনন মাতৃকোষে ক্রোমোজোম সংখ্যা অর্ধেকে নেমে আসে।",
    memoryTip: "দেহকোষ = ডবল (২n = ৪৬), জননকোষ = হাফ (n = ২৩)। অটোজোম ৪৪টি, সেক্স ক্রোমোজোম ২টি (XX অথবা XY)।",
    subject: "Life Science",
    topic: "জীবনের ধারাবাহিকতা",
  },
  {
    fact: "যেকোনো বৃত্তস্থ চতুর্ভুজের একটি বাহুকে বর্ধিত করলে যে বহিঃস্থ কোণটি উৎপন্ন হয়, তা অন্তঃস্থ বিপরীত কোণের সমান হয়।",
    whyItMatters: "মাধ্যমিক জ্যামিতির ৩ নম্বরের প্রয়োগ এবং বহু এমসিকিউ এই বৈশিষ্ট্যের ওপর ভিত্তি করে আসে।",
    memoryTip: "বহিঃস্থ কোণ = অপজিট ভেতরের কোণ! (Exterior Angle = Opposite Interior Angle)।",
    subject: "Mathematics",
    topic: "বৃত্ত সম্পর্কিত উপপাদ্য",
  },
  {
    fact: "১৮৩৫ খ্রিস্টাব্দের মেকলে মিনিটস (Macaulay's Minute)-এর মাধ্যমে ভারতে প্রাচ্য শিক্ষার বদলে ইংরেজি ও পাশ্চাত্য শিক্ষাকে সরকারি নীতি হিসেবে স্বীকৃতি দেওয়া হয়।",
    whyItMatters: "মাধ্যমিকে প্রাচ্য-পাশ্চাত্য বিতর্ক (Oriental-Occidental controversy) ২ বা ৪ নম্বরের জন্য অত্যন্ত গুরুত্বপূর্ণ।",
    memoryTip: "মেকলে (১৮৩৫) ইংরেজি চালু করলেন, আর উড (১৮৫৪) সেই শিক্ষাব্যবস্থার মহাসনদ বা ম্যাগনাকার্টা তৈরি করলেন।",
    subject: "History",
    topic: "সংস্কার: বৈশিষ্ট্য ও মূল্যায়ন",
  },
  {
    fact: "ভারতের প্রধান তথ্যপ্রযুক্তি শিল্পকেন্দ্র কর্ণাটকের বেঙ্গালুরুকে 'ভারতের সিলিকন ভ্যালি' (Silicon Valley of India) বলা হয়।",
    whyItMatters: "ভূগোলের অর্থনৈতিক পরিবেশ অধ্যায়ে ভারতের তথ্যপ্রযুক্তি শিল্পের উন্নতির ভৌগোলিক কারণ প্রতিবছর ৩ বা ৫ নম্বরে আসে।",
    memoryTip: "বেঙ্গালুরু = অনুকূল মৃদু আবহাওয়া + দক্ষ প্রযুক্তিবিদ + বিমান যোগাযোগ = ভারতের সিলিকন ভ্যালি।",
    subject: "Geography",
    topic: "ভারত - অর্থনৈতিক পরিবেশ",
  },
];
