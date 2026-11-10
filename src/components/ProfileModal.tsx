import React, { useState } from "react";
import { UserAuthProfile } from "../types";
import {
  User,
  X,
  Sparkles,
  LogOut,
  LogIn,
  Check,
  ShieldCheck,
  Calendar,
  Award,
  Cloud,
  HardDrive,
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserAuthProfile;
  onUpdateProfile: (updated: Partial<UserAuthProfile>) => void;
  onLoginGoogle: () => void;
  onLogout: () => void;
  isCloudConnected: boolean;
}

const EMOJI_OPTIONS = ["🎓", "🌟", "📚", "🦁", "🎯", "🚀", "💡", "🔬", "🏆"];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onLoginGoogle,
  onLogout,
  isCloudConnected,
}) => {
  const [name, setName] = useState<string>(userProfile.displayName);
  const [selectedEmoji, setSelectedEmoji] = useState<string>(userProfile.avatarEmoji || "🎓");
  const [targetYear, setTargetYear] = useState<number>(userProfile.targetYear || 2026);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateProfile({
      displayName: name.trim() || "মাধ্যমিক পরীক্ষার্থী",
      avatarEmoji: selectedEmoji,
      targetYear,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#14203D] w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#142B52] to-[#1E3A6C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner">
              {selectedEmoji}
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg">শিক্ষার্থী প্রোফাইল</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                {userProfile.isGuest ? (
                  <span className="flex items-center gap-1 text-amber-300">
                    <HardDrive className="w-3.5 h-3.5" /> অতিথি মোড (লোকাল স্টোরেজ)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-300">
                    <Cloud className="w-3.5 h-3.5" /> ক্লাউড সংযুক্ত (Firebase)
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Avatar Emoji Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              আপনার অবতার বা প্রতীক বেছে নিন:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                    selectedEmoji === emoji
                      ? "bg-[#3867E8] text-white ring-2 ring-[#3867E8] shadow-xs scale-105"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              নাম (Student Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
            />
          </div>

          {/* Target Exam Year & Grade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                লক্ষ্য বছর
              </label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3867E8]"
              >
                <option value={2025}>২০২৫</option>
                <option value={2026}>২০২৬ (মাধ্যমিক)</option>
                <option value={2027}>২০২৭</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                শ্রেণি ও বোর্ড
              </label>
              <div className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                WBBSE Class 10
              </div>
            </div>
          </div>

          {/* Cloud Auth Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#18A889]" />
                <span>অ্যাকাউন্ট ও ক্লাউড সিঙ্ক</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-[#18A889]/10 text-[#18A889]">
                {userProfile.isGuest ? "GUEST" : "VERIFIED"}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Google দিয়ে সাইন ইন করলে একাধিক ডিভাইসে আপনার স্টাডি হিস্ট্রি, কুইজ রেজাল্ট ও নোটস সিঙ্ক থাকবে।
            </p>

            {userProfile.isGuest ? (
              <button
                onClick={onLoginGoogle}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#3867E8]" />
                <span>Google দিয়ে সাইন ইন / সাইন আপ করুন</span>
              </button>
            ) : (
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
                  {userProfile.email || userProfile.displayName}
                </div>
                <button
                  onClick={onLogout}
                  className="px-2.5 py-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>লগআউট</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            বাতিল
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-[#3867E8] hover:bg-[#2752CA] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>সংরক্ষিত!</span>
              </>
            ) : (
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
