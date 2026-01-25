
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowDown, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';
import DesktopSidebar from './DesktopSidebar';

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
      content: "A prova é composta por 54 questões de múltipla escolha e uma redação. As questões abrangem Português, Matemática, Física, Química, Biologia, História, Geografia e Inglês.",
      color: "#E990D1"
    },
    {
      title: "Cálculo da Nota",
      subtitle: "(Pesos e Médias)",
      content: "A nota objetiva é calculada com base no seu desempenho (0 a 60 acertos). O sistema de pesos prioriza as disciplinas específicas do curso escolhido.",
      color: "#A5B4FC"
    },
    {
      title: "Critérios da Redação",
      subtitle: "(Critérios de Avaliação)",
      content: "A redação vale de 0 a 100 pontos. É avaliado o domínio da norma culta, coesão, coerência e a pertinência ao tema proposto.",
      color: "#FCD34D"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDF8F0] text-slate-900">
      <DesktopSidebar setView={setView} currentView={currentView} />

      <main className="flex-1 min-w-0 p-6 md:p-12 lg:p-16 overflow-y-auto">
        <header className="flex justify-between items-start mb-10 md:mb-16">
          <div className="space-y-1">
            <h1 className="md:hidden text-2xl font-black tracking-tighter mb-4 text-[#111111]">fatec.calc</h1>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-[#111111]">Como funciona,</h2>
            <p className="text-slate-400 font-semibold text-sm md:text-base">Entenda as regras do jogo antes de começar.</p>
          </div>
          <button onClick={onOpenMenu} className="md:hidden p-2 text-[#111111]">
            <Menu size={32} />
          </button>
        </header>

        <div className="flex flex-col gap-6 max-w-4xl">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-[40px] p-8 md:p-10 border border-black/5 transition-all duration-300 cursor-pointer ${openIndex === idx ? 'shadow-2xl ring-2 ring-black/5' : 'hover:bg-white/50 shadow-sm'}`}
              onClick={() => setOpenIndex(idx)}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-xl md:text-3xl font-black leading-tight tracking-tight text-[#111111]">{section.title}</h3>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-1" style={{ color: section.color }}>{section.subtitle}</span>
                </div>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-[#111111] text-white' : 'bg-[#FDF8F0] text-slate-300'}`}>
                  {openIndex === idx ? <ArrowDown size={32} /> : <ArrowRight size={32} />}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-50 mt-8">
                       <div className="aspect-video bg-[#FDF8F0] rounded-[32px] flex items-center justify-center border border-black/5 relative overflow-hidden group">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                             <div className="w-4 h-4 rounded-full" style={{ backgroundColor: section.color }} />
                          </div>
                       </div>
                       <div className="flex flex-col justify-center">
                          <p className="text-base md:text-xl text-slate-500 leading-relaxed font-semibold">
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
