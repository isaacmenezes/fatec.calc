
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ViewState } from '../types';

interface MobileMenuProps {
  onClose: () => void;
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, setView, currentView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#333333]/95 backdrop-blur-xl z-[100] p-6 flex flex-col"
    >
      <header className="flex justify-end">
        <button onClick={onClose} className="p-2">
          <X size={40} />
        </button>
      </header>

      <nav className="flex-1 flex flex-col justify-end pb-20 space-y-4">
        <button 
          onClick={() => setView('simulator')}
          className={`text-6xl font-black text-left tracking-tighter transition-all ${currentView === 'simulator' ? 'text-[#ee4370]' : 'text-white'}`}
        >
          Calculadora
        </button>
        <button 
          onClick={() => setView('about')}
          className={`text-6xl font-black text-left tracking-tighter transition-all ${currentView === 'about' ? 'text-[#ee4370]' : 'text-white'}`}
        >
          Como<br />funciona
        </button>
        <button 
          onClick={() => setView('landing')}
          className="text-xl font-bold text-white/40 pt-10"
        >
          Voltar ao Início
        </button>
      </nav>
    </motion.div>
  );
};

export default MobileMenu;
