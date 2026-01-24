
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowDown, ArrowRight, Square, Box } from 'lucide-react';
import { ViewState } from '../App';

interface AboutViewProps {
  onOpenMenu: () => void;
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

const AboutView: React.FC<AboutViewProps> = ({ onOpenMenu, setView, currentView }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const sections = [
    {
      title: "Prova Objetiva",
      subtitle: "(Estrutura do Vestibular)",
      content: "A prova é composta por 54 questões de múltipla escolha e uma redação. As questões abrangem Português, Matemática, Física, Química, Biologia, História, Geografia e Inglês."
    },
    {
      title: "Cálculo da Nota",
      subtitle: "(Pesos e Médias)",
      content: "A nota objetiva é calculada com base no seu desempenho (0 a 60 acertos). O sistema de pesos prioriza as disciplinas específicas do curso escolhido."
    },
    {
      title: "Critérios da Redação",
      subtitle: "(Critérios de Avaliação)",
      content: "A redação vale de 0 a 100 pontos. É avaliado o domínio da norma culta, coesão, coerência e a pertinência ao tema proposto."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-80 bg-[#1a1a1a] border-r border-white/5 flex-col p-8 sticky top-0 h-screen shrink-0">
        <div className="space-y-4">
          <button 
            onClick={() => setView('simulator')}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${currentView === 'simulator' ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/5 text-white/20 hover:bg-white/10 hover:text-white/40'}`}
          >
             <Square fill="currentColor" size={24} />
          </button>
          <button 
            onClick={() => setView('about')}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${currentView === 'about' ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/5 text-white/20 hover:bg-white/10 hover:text-white/40'}`}
          >
             <Box fill="currentColor" size={24} />
          </button>
        </div>
        <div className="mt-auto pt-8 border-t border-white/5">
           <div className="w-full h-0.5 bg-white/10 mb-6" />
           <button 
            onClick={() => setView('landing')}
            className="text-2xl font-black tracking-tighter hover:text-[#ee4370] transition-colors text-left"
           >
             fatec.calc
           </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div className="space-y-1">
             <h1 className="md:hidden text-2xl font-black tracking-tighter mb-4 text-white">fatec.calc</h1>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">Como funciona,</h2>
            <p className="text-white/40 font-medium text-sm">Tudo o que você precisa saber sobre o vestibular.</p>
          </div>
          <button onClick={onOpenMenu} className="md:hidden p-2">
            <Menu size={32} />
          </button>
        </header>

        <div className="flex flex-col gap-6">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className={`bg-[#333333] rounded-[32px] p-6 md:p-8 border border-white/5 transition-all cursor-pointer ${openIndex === idx ? 'ring-2 ring-white/10 bg-[#444]' : 'hover:bg-[#3a3a3a]'}`}
              onClick={() => setOpenIndex(idx)}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-lg md:text-2xl font-black leading-tight tracking-tight">{section.title}</h3>
                  <span className="text-[10px] md:text-sm text-white/40 font-bold uppercase tracking-wider">{section.subtitle}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center">
                  {openIndex === idx ? <ArrowDown size={24} /> : <ArrowRight size={24} />}
                </div>
              </div>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                       <div className="aspect-video bg-[#222] rounded-[24px] flex items-center justify-center border border-white/5">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                             <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white/20" />
                          </div>
                       </div>
                       <div className="flex flex-col justify-center">
                          <p className="text-sm md:text-xl text-white/80 leading-relaxed font-medium">
                            {section.content}
                          </p>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="h-10 md:hidden" />
      </main>
    </div>
  );
};

export default AboutView;
