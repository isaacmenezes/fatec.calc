
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowDown, ArrowRight } from 'lucide-react';

const AboutView: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const sections = [
    {
      title: "Card Informativo Aberto",
      subtitle: "(Informações sobre a prova é constituída)",
      content: "A prova da FATEC é composta por 54 questões de múltipla escolha e uma redação. As questões são divididas entre as disciplinas do núcleo comum do ensino médio e raciocínio lógico."
    },
    {
      title: "Card Informativo Fechado",
      subtitle: "(Informações sobre a correção)",
      content: "A correção utiliza um sistema de pesos que varia de acordo com o curso escolhido. Algumas disciplinas têm peso maior para cursos específicos."
    },
    {
      title: "Avaliação da Redação",
      subtitle: "(Critérios de Avaliação)",
      content: "A redação é avaliada de 0 a 100 pontos, considerando domínio da norma culta, coesão, coerência e desenvolvimento do tema."
    }
  ];

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter">fatec.calc</h1>
        <button onClick={onOpenMenu} className="p-2">
          <Menu size={32} />
        </button>
      </header>

      <div className="space-y-2">
        <h2 className="text-5xl font-black tracking-tighter leading-none">Como funciona,</h2>
        <p className="text-white/60 font-medium">Tudo o que você precisa saber sobre o vestibular.</p>
      </div>

      <div className="flex flex-col gap-4">
        {sections.map((section, idx) => (
          <div 
            key={idx}
            className={`bg-[#333333] rounded-[32px] p-6 border border-white/5 transition-all ${openIndex === idx ? 'ring-2 ring-white/10' : ''}`}
            onClick={() => setOpenIndex(idx)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-black leading-tight">{section.title}</h3>
                <span className="text-xs text-white/40">{section.subtitle}</span>
              </div>
              {openIndex === idx ? <ArrowDown size={24} /> : <ArrowRight size={24} />}
            </div>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pt-4">
                    <div className="aspect-video bg-[#222] rounded-2xl flex items-center justify-center">
                       {/* Placeholder for images from wireframe */}
                       <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white/20" />
                       </div>
                    </div>
                    <p className="text-white/80 leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="h-10" />
    </div>
  );
};

export default AboutView;
