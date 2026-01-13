
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import CalculatorForm from './components/CalculatorForm';
import CalculatorResult from './components/CalculatorResult';
import { CalculatorInputs } from './types';
import { useCalculator } from './hooks/useCalculator';
import { Menu, X, Calculator } from 'lucide-react';
import DashboardCard from './components/ui/DashboardCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    npc: 30,
    enem: null,
    redacao: 70,
    isAfro: false,
    isPublic: false
  });

  const results = useCalculator(inputs);

  return (
    <div className="flex h-screen w-full bg-[#f8f7f4] overflow-hidden lg:p-6">
      <div className="flex w-full h-full bg-white rounded-none lg:rounded-[48px] overflow-hidden shadow-2xl relative">
        
        {/* Mobile Menu Toggle Button (Menu Burger) */}
        {!isMobileMenuOpen && (
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="lg:hidden fixed top-5 left-5 z-40 p-3 rounded-2xl bg-black text-white shadow-xl active:scale-95 transition-transform"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Wrapper */}
        <div className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out h-full`}>
          <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} />
          
          {/* Close Button - Only visible when menu is open */}
          {isMobileMenuOpen && (
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="absolute top-5 right-5 lg:hidden text-white hover:text-[#a6e3a1] transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto lg:overflow-hidden bg-[#faf9f6] p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto h-full flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div 
                    key="dash" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="flex flex-col gap-3 lg:gap-6 lg:h-full lg:justify-center"
                  >
                    <div className="pt-14 lg:pt-0">
                      <h1 className="text-2xl lg:text-4xl font-black text-gray-900 tracking-tight mb-0.5">Olá, Candidato!</h1>
                      <p className="text-gray-500 font-medium text-xs lg:text-base leading-tight">Calcule sua pontuação final para o vestibular da FATEC.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch lg:min-h-0 lg:flex-1">
                      <div className="lg:col-span-7">
                        <CalculatorForm inputs={inputs} setInputs={setInputs} />
                      </div>
                      <div className="lg:col-span-5">
                        <CalculatorResult results={results} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'guide' && (
                  <motion.div 
                    key="guide" 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col gap-4 lg:gap-6 lg:h-full lg:justify-center max-w-4xl mx-auto pt-14 lg:pt-0"
                  >
                    <h1 className="text-2xl lg:text-4xl font-black text-gray-900 tracking-tight">Guia do Candidato</h1>
                    
                    <div className="grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar lg:max-h-[75vh]">
                      <DashboardCard className="bg-[#111111] text-white border-none p-5 lg:p-7">
                        <h2 className="text-lg lg:text-2xl font-black mb-4 flex items-center gap-3">
                           <Calculator className="text-[#a6e3a1]" size={20} /> Como sua nota é calculada?
                        </h2>
                        
                        <div className="space-y-4 lg:space-y-5">
                          <section className="space-y-1">
                            <h3 className="text-[#a6e3a1] font-bold uppercase text-[9px] tracking-widest">Passo 1: Nota Objetiva (P)</h3>
                            <p className="text-gray-400 text-[10px] lg:text-xs">Performance normalizada de 0 a 100.</p>
                            <div className="bg-white/5 p-2 rounded-xl font-mono text-center text-xs lg:text-sm">
                               P = (100 × NPC) ÷ 60
                            </div>
                          </section>

                          <section className="space-y-1">
                            <h3 className="text-[#89b4fa] font-bold uppercase text-[9px] tracking-widest">Passo 2: Integração ENEM (N)</h3>
                            <p className="text-gray-400 text-[10px] lg:text-xs">O ENEM entra apenas se beneficiar (20% da nota objetiva).</p>
                            <div className="bg-white/5 p-2 rounded-xl font-mono text-center text-[10px] lg:text-xs italic">
                               N = (4P + ENEM%) ÷ 5
                            </div>
                          </section>

                          <section className="space-y-1">
                            <h3 className="text-[#cba6f7] font-bold uppercase text-[9px] tracking-widest">Passo 3: Nota Final (NF)</h3>
                            <p className="text-gray-400 text-[10px] lg:text-xs">Peso 8 para Prova Objetiva e peso 2 para Redação.</p>
                            <div className="bg-white/5 p-2 rounded-xl font-mono text-center text-xs lg:text-sm">
                               NF = (8N + 2R) ÷ 10
                            </div>
                          </section>

                          <section className="space-y-1 pt-3 border-t border-white/10">
                            <h3 className="text-[#f9e2af] font-bold uppercase text-[9px] tracking-widest">Resultado Final: NFC</h3>
                            <div className="bg-[#f9e2af] text-black p-2 rounded-xl font-black text-center text-sm lg:text-base">
                               NFC = NF × Bônus
                            </div>
                          </section>
                        </div>
                      </DashboardCard>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                        <DashboardCard className="bg-white p-4">
                          <h4 className="font-black text-gray-900 mb-0.5 uppercase text-[9px] tracking-widest">Dica</h4>
                          <p className="text-[10px] text-gray-500 leading-tight italic">
                            O ENEM nunca atrapalha. Se for inferior à prova, o sistema descarta automaticamente.
                          </p>
                        </DashboardCard>
                        <DashboardCard className="bg-[#a6e3a1] p-4">
                           <h4 className="font-black text-black mb-0.5 uppercase text-[9px] tracking-widest">Bonificação</h4>
                           <ul className="text-[10px] text-gray-800 space-y-0.5 font-bold">
                             <li>• Escola Pública: +10%</li>
                             <li>• Afrodescendente: +3%</li>
                           </ul>
                        </DashboardCard>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
