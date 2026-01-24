
import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onOpenMenu: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onOpenMenu }) => {
  return (
    <div className="relative min-h-screen flex flex-col p-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,_#1a56db55,_transparent_50%),_radial-gradient(circle_at_bottom_left,_#ee437033,_transparent_50%)]" />

      {/* Header */}
      <header className="flex justify-between items-center z-20">
        <h1 className="text-2xl font-black tracking-tighter">fatec.calc</h1>
        <button onClick={onOpenMenu} className="p-2">
          <Menu size={32} />
        </button>
      </header>

      {/* Hero Content (PNG 4) */}
      <main className="flex-1 flex flex-col items-center justify-center text-center z-10 pt-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8"
        >
          SUA NOTA,<br />SEM MISTÉRIO.
        </motion.h2>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-[#333333] text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl border border-white/10"
        >
          Vamos Lá
        </motion.button>
      </main>

      {/* Elements Base (PNG 4 Placeholder blocks) */}
      <section className="mt-auto pt-10 grid grid-cols-1 gap-4 z-10">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="aspect-[4/5] bg-[#333333] rounded-[32px] flex items-center justify-center border border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
               <path d="M50 20 L80 70 L20 70 Z" fill="white" />
            </svg>
          </div>
          <span className="text-white/20 font-black text-4xl uppercase tracking-widest rotate-90">Simulador</span>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
