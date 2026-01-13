
import React from 'react';
import { MENU_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-full bg-[#111111] text-white flex flex-col p-8 lg:rounded-r-[40px] border-r border-white/5 shadow-2xl">
      <div className="flex items-center gap-3 mb-12 px-2">
        <h1 className="text-2xl font-black tracking-tighter text-white">fatec<span className="text-[#a6e3a1]">.</span>calc</h1>
      </div>

      <nav className="flex-1 space-y-3">
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6 px-2 opacity-50">Navegação</p>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-white text-black shadow-xl translate-x-2' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10 opacity-30">
        <p className="text-[10px] text-white font-black uppercase tracking-[0.25em] text-center">FATEC CALCULADORA</p>
      </div>
    </div>
  );
};

export default Sidebar;
