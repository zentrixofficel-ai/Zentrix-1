import React from "react";
import { AppNotification, NavTab } from "../types";
import {
  Bell,
  CheckCheck,
  Trash2,
  X,
  Calendar,
  Flame,
  HelpCircle,
  Sparkles,
  Info,
} from "lucide-react";

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectTab: (tab: NavTab) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "reminder":
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case "quiz":
        return <HelpCircle className="w-4 h-4 text-[#3867E8]" />;
      case "achievement":
        return <Flame className="w-4 h-4 text-[#18A889]" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#14203D] w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#142B52] to-[#1E3A6C] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm md:text-base">বিজ্ঞপ্তি ও নোটিফিকেশন</h3>
              <p className="text-[11px] text-slate-300">
                {unreadCount > 0 ? `${unreadCount} টি নতুন বার্তা` : "সব বার্তা পড়া হয়েছে"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="text-[#3867E8] dark:text-blue-400 font-bold hover:underline disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>সব পঠিত চিহ্নিত করুন</span>
          </button>

          <button
            onClick={onClearAll}
            disabled={notifications.length === 0}
            className="text-rose-500 font-bold hover:underline disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>সব মুছুন</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-xs font-semibold">কোনো বিজ্ঞপ্তি নেই</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  if (n.linkTab) {
                    onSelectTab(n.linkTab);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !n.read
                    ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/80 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs shrink-0">
                    {getNotificationIcon(n.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-extrabold text-[#142B52] dark:text-white leading-tight">
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#3867E8] shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {n.message}
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono mt-1.5">
                      {n.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
