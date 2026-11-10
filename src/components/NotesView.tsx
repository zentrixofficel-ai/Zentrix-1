import React, { useState } from "react";
import { StudyNote, SubjectId } from "../types";
import { SUBJECTS } from "../data/madhyamikData";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Search,
  Save,
  X,
  Copy,
  Check,
  Tag,
  BookOpen,
} from "lucide-react";

interface NotesViewProps {
  notes: StudyNote[];
  currentSubject: SubjectId;
  onAddNote: (note: Omit<StudyNote, "id" | "updatedAt">) => void;
  onUpdateNote: (note: StudyNote) => void;
  onDeleteNote: (id: string) => void;
  onSelectSubject: (sub: SubjectId) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  currentSubject,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onSelectSubject,
}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(currentSubject);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      !searchQuery.trim() ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.chapter && n.chapter.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setTitle("");
    setContent("");
    setChapter("");
    setSelectedSubject(currentSubject);
  };

  const handleStartEdit = (note: StudyNote) => {
    setEditingId(note.id);
    setIsCreating(false);
    setTitle(note.title);
    setContent(note.content);
    setChapter(note.chapter || "");
    setSelectedSubject(note.subject);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      const existing = notes.find((n) => n.id === editingId);
      if (existing) {
        onUpdateNote({
          ...existing,
          title: title.trim(),
          content: content.trim(),
          chapter: chapter.trim() || undefined,
          subject: selectedSubject,
          updatedAt: new Date().toISOString(),
        });
      }
      setEditingId(null);
    } else {
      onAddNote({
        title: title.trim(),
        content: content.trim(),
        chapter: chapter.trim() || undefined,
        subject: selectedSubject,
      });
      setIsCreating(false);
    }

    setTitle("");
    setContent("");
    setChapter("");
  };

  const handleCopy = (note: StudyNote) => {
    const text = `${note.title}\n\nবিষয়: ${note.subject}\nঅধ্যায়: ${note.chapter || "সাধারণ"}\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#18A889] text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>ব্যক্তিগত স্টাডি নোট ও রিভিশন শিট</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#142B52] dark:text-white">
            আমার স্টাডি নোটস
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            গুরুত্বপূর্ণ পয়েন্ট, ফর্মুলা এবং উত্তরের সারাংশ লিখে রাখুন। অফলাইনে সংরক্ষিত থাকে।
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-xl bg-[#18A889] hover:bg-[#12836B] text-white text-xs md:text-sm font-bold shadow-sm transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন নোট তৈরি করুন</span>
          </button>
        )}
      </div>

      {/* Note Editor Form (Modal/Card) */}
      {(isCreating || editingId) && (
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-6 border-2 border-[#3867E8] shadow-lg space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm md:text-base text-[#142B52] dark:text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#3867E8]" />
              <span>{isCreating ? "নতুন স্টাডি নোট লিখুন" : "নোট সম্পাদনা করুন"}</span>
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                বিষয় নির্বাচন করুন
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as SubjectId)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameBn} ({s.nameEn})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                অধ্যায় বা টপিক (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="যেমন: আলো / চলতড়িৎ / অনুপাত ও সমানুপাত"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              নোটের শিরোনাম <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: ওহমের সূত্র ও গাণিতিক প্রয়োগের ধাপসমূহ"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              নোটের বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="এখানে আপনার নোট বা পয়েন্টগুলি বিস্তারিতভাবে লিখুন..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              বাতিল
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className="px-5 py-2 rounded-xl bg-[#3867E8] hover:bg-[#2752CA] disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="সংরক্ষিত নোটের মধ্যে খুঁজুন..."
          className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#14203D] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
        />
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-[#14203D] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-[#18A889] mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-base font-bold text-[#142B52] dark:text-white">
            এখনও কোনো নোট তৈরি করা হয়নি
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            ক্লাসের গুরুত্বপূর্ণ সংকেত বা রিভিশন পয়েন্ট সহজে সংরক্ষণ করতে উপরে "নতুন নোট তৈরি করুন" বোতামে ক্লিক করুন।
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleStartCreate}
              className="px-4 py-2 bg-[#18A889] hover:bg-[#12836B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              প্রথম নোট লিখুন
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => {
            const sub = SUBJECTS.find((s) => s.id === note.subject);
            return (
              <div
                key={note.id}
                className="bg-white dark:bg-[#14203D] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#3867E8] dark:text-blue-300">
                      {sub?.nameBn || note.subject}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>

                  {note.chapter && (
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#18A889]" />
                      <span>{note.chapter}</span>
                    </div>
                  )}

                  <h4 className="text-sm md:text-base font-extrabold text-[#142B52] dark:text-white leading-snug">
                    {note.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line line-clamp-6">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleCopy(note)}
                    className="text-xs text-slate-500 hover:text-[#3867E8] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    {copiedId === note.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#3867E8] hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="সম্পাদনা"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
