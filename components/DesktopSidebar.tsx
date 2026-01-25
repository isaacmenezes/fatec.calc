
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen } from 'lucide-react';
import { ViewState } from '../types';

interface DesktopSidebarProps {
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ setView, currentView }) => {
  const menuItems = [
    { id: 'simulator' as ViewState, icon: LayoutDashboard, label: 'Calculadora', color: '#E990D1' },
    { id: 'about' as ViewState, icon: BookOpen, label: 'Como Funciona', color: '#A5B4FC' },
  ];

  return (
    <aside className="hidden md:flex w-24 lg:w-28 bg-[#111111] border-r border-black/5 flex-col items-center py-10 sticky top-0 h-screen shrink-0 z-50">
      {/* Top Nav Items */}
      <div className="flex flex-col gap-8 w-full items-center">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <div key={item.id} className="relative group px-4 w-full flex justify-center">
              {/* Active Indicator Bar - Using Theme Color */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}88` }}
                />
              )}
              
              <button
                onClick={() => setView(item.id)}
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-black shadow-2xl scale-110' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                
                <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
                  {item.label}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Logo Section */}
      <div className="mt-auto w-full px-4 flex flex-col items-center gap-8">
        <div className="w-12 h-[1px] bg-white/10" />
        
        <button 
          onClick={() => setView('landing')}
          className="group relative flex items-center justify-center"
        >
          <div className="[writing-mode:vertical-lr] rotate-180 text-xl font-black tracking-tighter text-white/30 group-hover:text-white transition-colors duration-500">
            fatec.calc
          </div>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
