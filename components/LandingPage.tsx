
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
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-[#0a0a0a]">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,_#1a56db22,_transparent_50%),_radial-gradient(circle_at_bottom_left,_#ee437011,_transparent_50%)]" />

      {/* Header */}
      <header className="flex justify-between items-center z-20 p-6 md:px-12 md:py-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white">fatec.calc</h1>
        
        {/* Mobile Toggle */}
        <button onClick={onOpenMenu} className="md:hidden p-2 text-white">
          <Menu size={32} />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12">
          <button onClick={onStart} className="text-sm font-bold uppercase tracking-widest text-white hover:text-[#ee4370] transition-colors">calculadora</button>
          <button onClick={() => {}} className="text-sm font-bold uppercase tracking-widest text-white hover:text-[#ee4370] transition-colors">como funciona</button>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:px-12 z-10 gap-12">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[120px] font-black leading-[0.9] tracking-tighter text-white"
          >
            SUA NOTA,<br className="hidden md:block" />SEM MISTÉRIO.
          </motion.h2>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-[#333333] text-white px-12 py-4 md:px-16 md:py-5 rounded-full text-xl font-bold shadow-xl border border-white/10 hover:bg-[#444] transition-all"
          >
            Vamos Lá
          </motion.button>
        </div>

        {/* Right Element Desktop */}
        <div className="hidden md:flex w-1/2 justify-end">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[450px] aspect-square bg-[#333333] rounded-[32px] flex items-center justify-center border border-white/5 relative overflow-hidden"
           >
              <div className="w-32 h-32 opacity-20 text-white">
                <svg viewBox="0 0 100 100" fill="currentColor">
                   <path d="M50 20 L80 80 L20 80 Z" />
                </svg>
              </div>
           </motion.div>
        </div>
      </main>

      {/* Ticker - Ajustado para não quebrar mobile */}
      <div className="z-20 py-4 md:my-10">
        <Ticker />
      </div>

      {/* Elements Grid Desktop */}
      <section className="p-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 z-10 pb-20">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="aspect-[4/5] md:aspect-[4/5] bg-[#333333] rounded-[32px] flex items-center justify-center border border-white/5 relative overflow-hidden group"
          >
             <div className="w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity text-white">
                <svg viewBox="0 0 100 100" fill="currentColor">
                   <path d="M50 20 L80 80 L20 80 Z" />
                </svg>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] p-12 flex flex-col items-center gap-2 z-20 border-t border-white/5 text-white">
        <div className="text-xl font-black tracking-tighter">fatec.calc</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">2026 - de vestibulando para vestibulando</div>
      </footer>
    </div>
  );
};

export default LandingPage;
