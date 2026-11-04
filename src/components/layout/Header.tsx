import React from 'react';
import { Menu, Search, Bell, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onToggleMobile: () => void;
  title: string;
  onQuickAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobile, title, onQuickAdd }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-white capitalize">{title}</h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">Enterprise Customer Intelligence & Pipeline Engine</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search accounts, leads, deals..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* AI Insight Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Forecast: +18.4% Q4</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-slate-900" />
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">Add Record</span>
        </button>
      </div>
    </header>
  );
};
