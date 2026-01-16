
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, PenTool, BookOpen, ArrowRight } from 'lucide-react';
import Ticker from './Ticker';

interface LandingPageProps {
  onStart: (tab?: string) => void;
}

interface MarkerTextProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  trigger: boolean;
}

const MarkerText: React.FC<MarkerTextProps> = ({
  children,
  color = "#ee4370",
  delay = 0.5,
  trigger
}) => (
  <span className="relative inline">
    <motion.span
      initial={{ width: 0 }}
      animate={trigger ? { width: "100%" } : { width: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      className="absolute bottom-1 left-0 h-[35%] opacity-40 z-[-1]"
      style={{ backgroundColor: color }}
    />
    <span className="relative z-10">{children}</span>
  </span>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const accordionItems = [
    {
      id: 'dashboard',
      number: '01',
      title: 'Calculadora',
      verticalText: 'CALC.',
      color: 'bg-white',
      textColor: 'text-black',
      icon: <Calculator className="text-[#ee4370]" size={32} />,
      description: 'Insira seus acertos e a nota da redação para calcular sua pontuação final no vestibular da Fatec. Ideal para acompanhar seu desempenho real.'
    },
    {
      id: 'redacao',
      number: '02',
      title: 'Redação',
      verticalText: 'REDAÇÃO',
      color: 'bg-[#1a56db]',
      textColor: 'text-white',
      icon: <PenTool className="text-[#1a56db]" size={32} />,
      description: 'Entenda os critérios de avaliação e simule sua nota para saber onde focar. Uma ferramenta essencial para a nota máxima.'
    },
    {
      id: 'guide',
      number: '03',
      title: 'Guia',
      verticalText: 'GUIA',
      color: 'bg-[#ee4370]',
      textColor: 'text-white',
      icon: <BookOpen className="text-#1a56db" size={32} />,
      description: 'Tudo o que você precisa saber sobre pesos, bonificações e o manual do candidato condensado de forma simples.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a56db] flex flex-col overflow-x-hidden selection:bg-[#ee4370] selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[800px] top-[-70px] opacity-100 md:opacity-100 z-10">
          <svg width="170" height="220" viewBox="0 0 100 20">
            <path d="M0 70 A 50 50 0 0 1 100 70" fill="black" />
            <path d="M0 25 A 50 50 0 0 1 100 25" fill="black" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[65%] left-[-80px] text-black opacity-100"
        >
          <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
            <rect x="45" y="0" width="10" height="100" />
            <rect x="45" y="0" width="10" height="100" transform="rotate(45 50 50)" />
            <rect x="45" y="0" width="10" height="100" transform="rotate(90 50 50)" />
            <rect x="45" y="0" width="10" height="100" transform="rotate(135 50 50)" />
          </svg>
        </motion.div>
      </div>

      <header className="px-6 py-6 md:px-12 flex justify-between items-center relative z-40">
        <h1 className="text-white text-[40px] md:text-[40px] font-black tracking-tighter">
          fatec<span className="text-[#ee4370]">.</span>calc
        </h1>
        <nav className="hidden md:flex gap-8 text-white/90 font-bold uppercase text-[12px] tracking-widest">
          <button onClick={() => onStart('dashboard')} className="hover:text-[#ee4370] transition-colors">Calculadora</button>
          <button onClick={() => onStart('redacao')} className="hover:text-[#ee4370] transition-colors">Análise de Redação</button>
          <button onClick={() => onStart('guide')} className="hover:text-[#ee4370] transition-colors">Guia do Candidato</button>
          <button onClick={() => onStart('guide')} className="hover:text-[#ee4370] transition-colors">Sobre</button>
        </nav>
      </header>

      <section className="flex-1 flex flex-col md:flex-row items-center px-6 md:px-12 pt-0 pb-16 md:pb-24 md:pl-0 relative z-10">
        
        <div className="hidden md:block w-full md:w-4/12 z-30 space-y-4 mb-12 md:mb-0 md:pl-4 text-left ml-12">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                onClick={() => onStart('dashboard')}
                className="group bg-white/10 backdrop-blur-md border-2 border-white rounded-full px-8 py-3 w-fit flex items-center gap-4 text-white font-black text-3xl cursor-pointer"
              >
                simule.
              </motion.div>
              <motion.div
                whileHover={{ rotate: 45, duration: 0.1 }}
                className="bg-[#ee4370] rounded-full p-3">
                <ArrowRight size={35} />
              </motion.div>
            </div>
            <motion.div
              className="group bg-white/10 backdrop-blur-md ml-16 border-2 border-white rounded-full px-8 py-3 w-fit flex items-center gap-4 text-white font-black text-3xl cursor-pointer">
              planeje.
            </motion.div>
          </div>
          <p className="text-white font-bold text-[25.5px] max-w-[250px] leading-tight py- text-xl">
Use nossas ferramentas para calcular sua nota, testar cenários e organizar seus próximos passos rumo à aprovação na Fatec.
          </p>
        </div>

        <div className="w-full max-w-[70%] relative z-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-8 relative overflow-hidden"
          >
            <div>
              <h2 className="text-[80px] md:text-[70px] font-black text-black leading-[0.95] mb-6 md:mb-8 tracking-tighter relative z-10 max-w-[600px]">
                Resultados instantâneos, sem complicação.
              </h2>
              <div className="space-y-8 md:space-y-10 relative z-10">
                <p className="text-black font-bold text-lg md:text-xl leading-snug tracking-tight max-w-[500px]">
                  Simule sua nota da Fatec em poucos cliques e entenda exatamente onde você está na disputa. Aqui, você visualiza seus resultados de forma clara, rápida e sem mistério — pra estudar com estratégia e menos ansiedade.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStart('dashboard')}
                    className="bg-[#ee4370] text-white font-bold -mt-[50px] text-xl md:text-xl px-8 py-4 md:px-8 md:py-4 shadow-[8px_8px_0px_#000] border-4 border-black active:shadow-none transition-all">
                    vamos lá
                  </motion.button>
            </div>

            <div className="absolute top-2 right-2 md:top-6 md:right-6 w-10 h-10 md:w-10 md:h-10 text-black pointer-events-none">
              <svg viewBox="0 0 100 100" fill="black">
                <rect x="80" y="0" width="20" height="100" />
                <rect x="0" y="80" width="100" height="20" />
                <path d="M0 0 L80 80" stroke="currentColor" strokeWidth="20" fill="none" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      <Ticker className="absolute -pt-10"/>

      {/* Acordeão */}
      <section className="flex flex-col md:flex-row md:h-[500px] bg-black z-20">
        {accordionItems.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                flex: isExpanded ? 6 : 1,
                minHeight: isExpanded ? '500px' : '60px'
              }}
              className={`relative cursor-pointer flex flex-col md:flex-row overflow-hidden transition-all duration-500 ${item.color}`}
              onClick={() => setExpandedIndex(index)}
            >
              <div className={`hidden md:flex md:flex-col items-center justify-end p-4 md:h-full w-full md:w-[100px] flex-shrink-0 z-10 ${item.textColor}`}>
                <span className="text-5xl md:text-5xl font-black tracking-tighter">
                  {item.number}
                </span>
                <span className="text-sm md:text-sm font-black md:[writing-mode:vertical-lr] md:rotate-180 uppercase tracking-widest whitespace-nowrap mt-2">
                  {item.verticalText}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 p-6 md:p-20 flex flex-col justify-center gap-6 md:gap-10 overflow-y-auto md:overflow-hidden"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="p-2 md:p-4 bg-white rounded-2xl shadow-[4px_4px_0px_#000] border-2 md:border-3 border-black flex-shrink-0">
                        {item.icon}
                      </div>
                      <h3 className={`text-7xl md:text-7xl font-black ${item.textColor} uppercase tracking-tighter leading-none`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-4 md:space-y-5 max-w-2xl">
                      <p className={`text-base md:text-xl font-bold ${item.textColor} leading-tight tracking-tight`}>
                        <MarkerText
                          trigger={isExpanded}
                          delay={0.4}
                          color={index === 0 ? "#ee4370" : "#ffffff"}
                        >
                          {item.description}
                        </MarkerText>
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onStart(item.id);
                        }}
                        className={`w-full md:w-fit flex items-center justify-center gap-3 px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-black uppercase tracking-tighter shadow-[4px_4px_0px_#000] border-3 border-black ${index === 0 ? 'bg-[#ee4370] text-white' : 'bg-white text-black'
                          }`}
                      >
                        Acessar <ArrowRight />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </section>

      <footer className="bg-black text-white p-8 flex flex-col items-center gap-4 border-t-4 border-white/10 relative z-30">
        <div className="text-3xl font-black tracking-tighter">
          fatec<span className="text-[#ee4370]">.</span>calc
        </div>
        <p className="text-white/40 font-bold tracking-[0.3em] text-[10px] text-center">
          Isaac Menezes © 2026
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
