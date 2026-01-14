
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import CalculatorForm from './components/CalculatorForm';
import CalculatorResult from './components/CalculatorResult';
import LandingPage from './components/LandingPage';
import { CalculatorInputs } from './types';
import { useCalculator } from './hooks/useCalculator';
import { Menu, X, ArrowLeft, Info, BookOpen } from 'lucide-react';
import DashboardCard from './components/ui/DashboardCard';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'landing') {
    return <LandingPage onStart={(tab) => {
      if (tab) setActiveTab(tab);
      setView('app');
    }} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#f8f7f4] lg:p-6 text-slate-900">
      <div className="flex w-full h-full bg-white rounded-none lg:rounded-[48px] overflow-hidden shadow-2xl relative border-none">
        
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-40 px-6 flex items-center justify-between border-b border-gray-100">
          <h1 className="text-xl font-bold tracking-tight">fatec.calc</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-3 rounded-2xl bg-slate-50 text-slate-900 border border-slate-100"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm lg:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 w-72 z-[80] lg:hidden bg-[#111]"
              >
                <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} />
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/50">
                  <X size={24} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sidebar Desktop */}
        <div className="hidden lg:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#faf9f6]">
          <header className="hidden lg:flex items-center justify-between px-12 py-8 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('landing')}
                className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dashboard / {activeTab}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Manual Atualizado 2026</span>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12">
            <div className="max-w-6xl mx-auto pt-24 lg:pt-0">
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div 
                    key="dash" 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} 
                    className="flex flex-col gap-10"
                  >
                    <div>
                      <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Calculadora</h1>
                      <p className="text-gray-500 font-medium text-lg mt-2 tracking-tight">Consulte sua nota projetada com precisão oficial.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      <div className="lg:col-span-7">
                        <CalculatorForm inputs={inputs} setInputs={setInputs} />
                      </div>
                      <div className="lg:col-span-5">
                        <CalculatorResult results={results} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'redacao' && (
                  <motion.div 
                    key="red" 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-8"
                  >
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Critérios da Redação</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DashboardCard className="p-8 space-y-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                          <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Domínio da Norma Culta</h3>
                        <p className="text-gray-500 leading-relaxed">Demonstre conhecimento das regras gramaticais e ortográficas do português formal.</p>
                      </DashboardCard>
                      <DashboardCard className="p-8 space-y-4">
                        <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
                          <Info size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Desenvolvimento do Tema</h3>
                        <p className="text-gray-500 leading-relaxed">Organize seus argumentos de forma coerente e apresente repertório cultural pertinente.</p>
                      </DashboardCard>
                    </div>
                    <DashboardCard className="p-10 bg-slate-900 text-white border-none shadow-xl">
                      <h2 className="text-2xl font-bold mb-4">Lembre-se</h2>
                      <p className="text-slate-400 text-lg leading-relaxed">A redação representa 20% do cálculo final. Um bom desempenho aqui pode elevar drasticamente sua pontuação geral.</p>
                    </DashboardCard>
                  </motion.div>
                )}

                {activeTab === 'guide' && (
                  <motion.div 
                    key="gui" 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-8"
                  >
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Guia do Candidato</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Escola Pública</h4>
                        <p className="text-2xl font-black">+10%</p>
                      </div>
                      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <h4 className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-2">Afrodescendentes</h4>
                        <p className="text-2xl font-black">+3%</p>
                      </div>
                      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-2">Ambos</h4>
                        <p className="text-2xl font-black">+13%</p>
                      </div>
                    </div>
                    <DashboardCard className="p-12">
                      <h3 className="text-2xl font-bold mb-6">Composição da Prova</h3>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-gray-600 font-medium">
                          <div className="w-2 h-2 rounded-full bg-blue-500" /> 08 Português
                        </li>
                        <li className="flex items-center gap-4 text-gray-600 font-medium">
                          <div className="w-2 h-2 rounded-full bg-blue-500" /> 08 Matemática
                        </li>
                        <li className="flex items-center gap-4 text-gray-600 font-medium">
                          <div className="w-2 h-2 rounded-full bg-blue-500" /> 08 Biologia, Física, Química e Geografia
                        </li>
                        <li className="flex items-center gap-4 text-gray-600 font-medium">
                          <div className="w-2 h-2 rounded-full bg-blue-500" /> 05 História e Inglês
                        </li>
                        <li className="flex items-center gap-4 text-gray-600 font-medium">
                          <div className="w-2 h-2 rounded-full bg-slate-900" /> 05 Raciocínio Lógico
                        </li>
                      </ul>
                    </DashboardCard>
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
