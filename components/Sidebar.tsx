
import React from 'react';
import { MENU_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 lg:w-72 h-full bg-[#111111] text-white flex flex-col p-10 lg:rounded-r-[48px] shadow-2xl relative z-50">
      <div className="flex items-center gap-3 mb-20 px-2">
        <div className="w-8 h-8 bg-[#f05179] rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">fatec.calc</h1>
      </div>

      <nav className="flex-1 space-y-6">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-8 px-2 opacity-50">Menu Principal</p>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-white text-black shadow-xl scale-105' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-semibold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-6">
          <p className="text-xs text-white/40 font-medium leading-relaxed">Feito com carinho para ajudar no seu ingresso na Fatec.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
