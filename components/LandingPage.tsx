
import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Ticker from './Ticker';

interface LandingPageProps {
  onStart: () => void;
  onOpenMenu: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onOpenMenu }) => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-[#FDF8F0]">
      {/* Background Gradients - Soft and Pastel */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,_#E990D122,_transparent_50%),_radial-gradient(circle_at_bottom_left,_#A5B4FC22,_transparent_50%)]" />

      {/* Header */}
      <header className="flex justify-between items-center z-20 p-6 md:px-12 md:py-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#111111]">fatec.calc</h1>
        
        <button onClick={onOpenMenu} className="md:hidden p-2 text-[#111111]">
          <Menu size={32} />
        </button>

        <nav className="hidden md:flex gap-12">
          <button onClick={onStart} className="text-sm font-black uppercase tracking-widest text-[#111111] hover:text-[#E990D1] transition-colors">calculadora</button>
          <button onClick={() => {}} className="text-sm font-black uppercase tracking-widest text-[#111111] hover:text-[#A5B4FC] transition-colors">como funciona</button>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:px-12 z-10 gap-12">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter text-[#111111]"
          >
            SUA NOTA,<br className="hidden md:block" /><span className="text-[#E990D1]">SEM MISTÉRIO.</span>
          </motion.h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-[#111111] text-white px-12 py-5 md:px-16 md:py-6 rounded-full text-xl font-black shadow-2xl hover:shadow-[#E990D133] transition-all flex items-center gap-4"
          >
            Começar Simulação
          </motion.button>
        </div>

        {/* Right Element Desktop */}
        <div className="hidden md:flex w-1/2 justify-end">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[500px] aspect-square bg-white rounded-[64px] flex items-center justify-center border border-black/5 relative overflow-hidden shadow-2xl"
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E990D111] to-[#A5B4FC11]" />
              <div className="w-48 h-48 bg-[#FDF8F0] rounded-full flex items-center justify-center shadow-inner relative z-10">
                <div className="w-12 h-12 bg-[#E990D1] rounded-full animate-pulse" />
              </div>
           </motion.div>
        </div>
      </main>

      {/* Ticker - Dark for high contrast */}
      <div className="z-20 py-4 md:my-10">
        <Ticker />
      </div>

      {/* Footer */}
      <footer className="bg-white p-12 flex flex-col items-center gap-2 z-20 border-t border-black/5 text-[#111111]">
        <div className="text-xl font-black tracking-tighter">fatec.calc</div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">2026 - de vestibulando para vestibulando</div>
      </footer>
    </div>
  );
};

export default LandingPage;
