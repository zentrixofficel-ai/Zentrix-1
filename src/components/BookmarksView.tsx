import React, { useState } from "react";
import { BookmarkItem, SubjectId, NavTab } from "../types";
import { SUBJECTS } from "../data/madhyamikData";
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  HelpCircle,
  BookOpen,
  Brain,
  FileText,
  Search,
  ArrowRight,
} from "lucide-react";

interface BookmarksViewProps {
  bookmarks: BookmarkItem[];
  onDeleteBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectTab: (tab: NavTab) => void;
  onSelectSubject: (sub: SubjectId) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onDeleteBookmark,
  onClearAll,
  onSelectTab,
  onSelectSubject,
}) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = bookmarks.filter((b) => {
    const matchesType = filterType === "all" || b.type === filterType;
    const matchesSearch =
      !searchQuery.trim() ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getIcon = (type: BookmarkItem["type"]) => {
    switch (type) {
      case "question":
        return <HelpCircle className="w-4 h-4 text-[#3867E8]" />;
      case "formula":
        return <BookOpen className="w-4 h-4 text-amber-500" />;
      case "fact":
        return <Brain className="w-4 h-4 text-[#18A889]" />;
      default:
        return <FileText className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>সংরক্ষিত বুকমার্কস ও গুরুত্বপূর্ণ প্রশ্ন</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#142B52] dark:text-white">
            সংরক্ষিত সংগ্রহ
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            কঠিন প্রশ্ন, প্রয়োজনীয় সূত্র এবং ট্রিকস এক নজরে রিভিশন করুন।
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("আপনি কি সমস্ত সংরক্ষিত বুকমার্ক মুছে ফেলতে চান?")) {
                onClearAll();
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>সব বুকমার্ক মুছুন</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-[#14203D] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="বুকমার্কের মধ্যে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "সব" },
            { id: "question", label: "প্রশ্ন" },
            { id: "formula", label: "সূত্র" },
            { id: "fact", label: "ট্রিকস" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterType === tab.id
                  ? "bg-[#142B52] dark:bg-[#3867E8] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-base font-bold text-[#142B52] dark:text-white">
            কোনো বুকমার্ক সংরক্ষিত নেই
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            কুইজ বা সূত্রাবলি পড়ার সময় বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((b) => {
            const sub = SUBJECTS.find((s) => s.id === b.subject);
            return (
              <div
                key={b.id}
                className="bg-white dark:bg-[#14203D] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#3867E8] dark:text-blue-300 flex items-center gap-1.5">
                      {getIcon(b.type)}
                      <span>{sub?.nameBn || b.subject}</span>
                    </span>

                    <button
                      onClick={() => onDeleteBookmark(b.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                      title="বুকমার্ক সরান"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-sm font-extrabold text-[#142B52] dark:text-white leading-snug">
                    {b.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {b.content}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end">
                  <button
                    onClick={() => {
                      onSelectSubject(b.subject);
                      if (b.type === "question") onSelectTab("quiz");
                      else if (b.type === "formula") onSelectTab("formula_book");
                      else if (b.type === "fact") onSelectTab("memory");
                    }}
                    className="text-xs font-bold text-[#3867E8] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>অনুশীলন করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
