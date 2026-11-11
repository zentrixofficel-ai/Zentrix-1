import React from "react";
import { NavTab } from "../types";
import {
  LayoutDashboard,
  HelpCircle,
  Bot,
  FileText,
  Menu,
} from "lucide-react";

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMenu,
}) => {
  const items = [
    { id: "dashboard" as NavTab, label: "হোম", icon: LayoutDashboard },
    { id: "question_papers" as NavTab, label: "প্রশ্নপত্র", icon: FileText },
    { id: "quiz" as NavTab, label: "কুইজ", icon: HelpCircle },
    { id: "tutor" as NavTab, label: "AI টিউটর", icon: Bot },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#14203D]/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? "text-[#3867E8] dark:text-blue-400 font-extrabold"
                  : "text-slate-500 dark:text-slate-400 font-medium hover:text-slate-900"
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/40 scale-105 shadow-2xs"
                    : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* 5th Button: Three-Line Menu Drawer */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
        >
          <div className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Menu className="w-5 h-5 stroke-2" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
        </button>
      </div>
    </nav>
  );
};
