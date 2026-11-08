import React, { useState } from "react";
import { SubjectId } from "../types";
import {
  BookOpen,
  Printer,
  Calculator,
  Atom,
  Clock,
  Sparkles,
  Dna,
  Check,
  Search,
} from "lucide-react";

interface FormulaBookProps {
  currentSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
}

export const FormulaBook: React.FC<FormulaBookProps> = () => {
  const [activeTab, setActiveTab] = useState<"math" | "physics" | "bio" | "history">("math");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#EEF2FD] text-[#3867E8]">
                কুইক রিভিশন হ্যান্ডবুক (Formula Book)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                WBBSE Class 10 Madhyamik
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#142B52]">
              মাধ্যমিক সূত্রাবলি, সমীকরণ ও ঐতিহাসিক সময়পঞ্জি
            </h2>
            <p className="text-xs text-slate-500">
              পরীক্ষার হলে যাওয়ার আগে এক নজরে চোখ বুলিয়ে নেওয়ার জন্য গুরুত্বপূর্ণ ফর্মুলা চিটশিট।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#142B52] hover:bg-[#0D1C36] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / পিডিএফ সেভ</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("math")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "math"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>গণিত সূত্র</span>
            </button>
            <button
              onClick={() => setActiveTab("physics")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "physics"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Atom className="w-3.5 h-3.5 text-sky-600" />
              <span>ভৌতবিজ্ঞান সমীকরণ</span>
            </button>
            <button
              onClick={() => setActiveTab("bio")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "bio"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Dna className="w-3.5 h-3.5 text-emerald-600" />
              <span>জীবনবিজ্ঞান অনুপাত</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-white text-[#142B52] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-rose-600" />
              <span>ইতিহাসের প্রধান সন</span>
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সূত্র খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#3867E8]/20"
            />
          </div>
        </div>
      </div>

      {/* FORMULA CARDS GRID */}
      {activeTab === "math" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          {/* Quadratic */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">বীজগণিত</span>
              <span className="text-[11px] font-mono text-slate-400">ax² + bx + c = 0</span>
            </div>
            <h4 className="text-sm font-bold text-[#142B52]">শ্রীধর আচার্যের সূত্র ও নিরূপক</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>x = [-b ± √(b² - 4ac)] / 2a</div>
              <div className="text-[11px] text-slate-500 font-normal">নিরূপক D = b² - 4ac</div>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>D &gt; 0 হলে বীজদ্বয় বাস্তব ও অসমান</li>
              <li>D = 0 হলে বীজদ্বয় বাস্তব ও সমান (-b/2a)</li>
              <li>D &lt; 0 হলে কোনো বাস্তব বীজ থাকে না</li>
            </ul>
          </div>

          {/* Mensuration: Cylinder & Sphere */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">পরিমিতি</span>
              <span className="text-[11px] font-mono text-slate-400">চোঙ ও গোলক</span>
            </div>
            <h4 className="text-sm font-bold text-[#142B52]">লম্ব বৃত্তাকার চোঙ ও গোলক</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>চোঙের আয়তন = πr²h</div>
              <div>চোঙের বক্রতল = 2πrh</div>
              <div>গোলকের আয়তন = (4/3)πr³</div>
              <div>গোলকের সমগ্রতল = 4πr²</div>
            </div>
            <p className="text-xs text-slate-600">
              অর্ধগোলকের সমগ্রতল = 3πr² (নিরেট) এবং বক্রতল = 2πr²।
            </p>
          </div>

          {/* Simple & Compound Interest */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">পাটিগণিত</span>
              <span className="text-[11px] font-mono text-slate-400">সুদকষা</span>
            </div>
            <h4 className="text-sm font-bold text-[#142B52]">সরল সুদ ও সমহার বৃদ্ধি</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>I = (P × r × t) / 100</div>
              <div>A = P(1 + r/100)ⁿ (চক্রবৃদ্ধি সুদ)</div>
            </div>
            <p className="text-xs text-slate-600">
              সুদের পর্ব ৬ মাস হলে r/2 এবং সময় 2n হবে।
            </p>
          </div>

          {/* Trigonometry */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">ত্রিকোণমিতি</span>
              <span className="text-[11px] font-mono text-slate-400">মান ও অভেদ</span>
            </div>
            <h4 className="text-sm font-bold text-[#142B52]">ত্রিকোণমিতিক অভেদাবলি</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>sin²θ + cos²θ = 1</div>
              <div>sec²θ - tan²θ = 1</div>
              <div>cosec²θ - cot²θ = 1</div>
            </div>
            <p className="text-xs text-slate-600">
              পূরক কোণ: sin(90° - θ) = cos θ, tan(90° - θ) = cot θ।
            </p>
          </div>

          {/* Statistics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">রাশিবিজ্ঞান</span>
              <span className="text-[11px] font-mono text-slate-400">গড় ও মধ্যমা</span>
            </div>
            <h4 className="text-sm font-bold text-[#142B52]">যৌগিক গড় ও সংখ্যাগুরুমান</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>প্রত্যক্ষ গড় x̄ = Σfᵢxᵢ / Σfᵢ</div>
              <div>কল্পিত গড় x̄ = a + (Σfᵢdᵢ / Σfᵢ)</div>
            </div>
            <p className="text-xs text-slate-600">
              যেখানে dᵢ = xᵢ - a (a হলো কল্পিত গড়)।
            </p>
          </div>

          {/* Circle Theorem summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">জ্যামিতি</span>
              <span className="text-[11px] font-mono text-slate-400">উপপাদ্য সূত্র</span>
            </div>
            <h4 className="text-sm font-bold text-[#142B52]">বৃত্তের কোণ ও চতুর্ভুজ</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 space-y-1">
              <div>• কেন্দ্রস্থ কোণ = ২ × বৃত্তস্থ কোণ</div>
              <div>• অর্ধবৃত্তস্থ কোণ = ৯০° (সমকোণ)</div>
              <div>• বৃত্তস্থ চতুর্ভুজের বিপরীত কোণদ্বয় সম্পূরক (১৮০°)</div>
            </div>
          </div>
        </div>
      )}

      {/* PHYS SCIENCE FORMULAS */}
      {activeTab === "physics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          {/* Gas Laws */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">গ্যাসের আচরণ</span>
            <h4 className="text-sm font-bold text-[#142B52]">বয়েল ও চার্লসের সমন্বয় সমীকরণ</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>(P₁V₁) / T₁ = (P₂V₂) / T₂</div>
              <div>PV = nRT = (w/M)RT</div>
            </div>
            <p className="text-xs text-slate-600">
              R = 8.314 J·mol⁻¹·K⁻¹। পরম শূন্য = -273°C = 0 K।
            </p>
          </div>

          {/* Current Electricity */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">চলতড়িৎ</span>
            <h4 className="text-sm font-bold text-[#142B52]">ওহমের সূত্র ও বৈদ্যুতিক ক্ষমতা</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>V = IR &nbsp;|&nbsp; R = ρ(l / A)</div>
              <div>H = I²Rt / 4.2 cal = I²Rt Joule</div>
              <div>P = VI = I²R = V²/R</div>
            </div>
            <p className="text-xs text-slate-600">
              1 BOT Unit = 1 kWh = 3.6 × 10⁶ Joule।
            </p>
          </div>

          {/* Light & Optics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">আলো</span>
            <h4 className="text-sm font-bold text-[#142B52]">প্রতিসরণ ও দর্পণ সমীকরণ</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>f = r / 2 (দর্পণ)</div>
              <div>₁μ₂ = sin i / sin r = v₁ / v₂</div>
              <div>রৈখিক বিবর্ধন m = v / u</div>
            </div>
            <p className="text-xs text-slate-600">
              প্রিজমের চ্যুতি কোণ δ = i₁ + i₂ - A।
            </p>
          </div>
        </div>
      )}

      {/* LIFE SCIENCE RATIOS */}
      {activeTab === "bio" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">বংশগতি</span>
            <h4 className="text-sm font-bold text-[#142B52]">মেন্ডেলের একসংকর ও দ্বিসংকর অনুপাত</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-900 space-y-1">
              <div>একসংকর ফিনোটাইপ = ৩ : ১</div>
              <div>একসংকর জিনোটাইপ = ১ : ২ : ১</div>
              <div>দ্বিসংকর ফিনোটাইপ = ৯ : ৩ : ৩ : ১</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">কোষ বিভাজন</span>
            <h4 className="text-sm font-bold text-[#142B52]">ক্রোমোজোম ও কোষচক্র</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 space-y-1">
              <div>• হ্যাপ্লয়েড সংখ্যা (n) = ২৩ (জননকোষ)</div>
              <div>• ডিপ্লয়েড সংখ্যা (2n) = ৪৬ (দেহকোষ)</div>
              <div>• ইন্টারফেজ ধাপ: G₁ → S (DNA দ্বিগুণ) → G₂</div>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TIMELINE */}
      {activeTab === "history" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4 animate-fadeIn">
          <h4 className="text-sm font-bold text-[#142B52]">
            মাধ্যমিক ইতিহাসের সবচেয়ে গুরুত্বপূর্ণ সন ও ঘটনার কালানুক্রম
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1 font-mono">
              <div className="font-bold text-rose-700">১৭৯৮: চুয়ার বিদ্রোহ (দুর্জন সিংহ)</div>
              <div className="font-bold text-slate-800">১৮১৭: হিন্দু কলেজ প্রতিষ্ঠা</div>
              <div className="font-bold text-slate-800">১৮২৮: ব্রাহ্মসভা প্রতিষ্ঠা (রামমোহন)</div>
              <div className="font-bold text-emerald-700">১৮২৯: সতীদাহ প্রথা রদ আইন</div>
              <div className="font-bold text-slate-800">১৮৩৫: কলকাতা মেডিকেল কলেজ ও মেকলে মিনিটস</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1 font-mono">
              <div className="font-bold text-rose-700">১৮৫৫: সাঁওতাল বিদ্রোহ (সিধু-কানহু)</div>
              <div className="font-bold text-emerald-700">১৮৫৬: বিধবা বিবাহ আইন পাস (বিদ্যাসাগর)</div>
              <div className="font-bold text-rose-700">১৮৫৭: মহাবিদ্রোহ (ব্যারাকপুর ও সারা ভারত)</div>
              <div className="font-bold text-blue-700">১৮৫৮: মহারানির ঘোষণাপত্র (লর্ড ক্যানিং)</div>
              <div className="font-bold text-rose-700">১৮৫৯: নীল বিদ্রোহ (নদীয়া)</div>
              <div className="font-bold text-purple-700">১৯০৫: বঙ্গভঙ্গ ও স্বদেশি আন্দোলন</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
