
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Check, Info, Box, Square } from 'lucide-react';
import { CalculatorInputs, CalculatorResults } from '../types';
import { ViewState } from '../App';

interface SimulatorViewProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  results: CalculatorResults;
  onOpenMenu: () => void;
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

const SimulatorView: React.FC<SimulatorViewProps> = ({ inputs, setInputs, results, onOpenMenu, setView, currentView }) => {
  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const hasBonus = inputs.isAfro || inputs.isPublic;

  const noSpinnerStyle = `
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    input[type=number] { -moz-appearance: textfield; }
  `;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white">
      <style>{noSpinnerStyle}</style>

      {/* Sidebar Desktop - Hidden on Mobile */}
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

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <h1 className="md:hidden text-2xl font-black tracking-tighter mb-4">fatec.calc</h1>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">Bem Vindo,</h2>
            <p className="text-white/40 font-medium text-sm">Calcule sua nota final com bônus e ENEM.</p>
          </div>

          <button onClick={onOpenMenu} className="md:hidden p-2">
            <Menu size={32} />
          </button>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* LADO ESQUERDO (MOBILE PRIMEIRO) */}
          <div className="md:col-span-8 flex flex-col gap-6 order-2 md:order-1">
            
            {/* Resultados no Mobile - Aparece em destaque no topo do grid mobile */}
            <div className="md:hidden bg-[#333333] rounded-[32px] p-8 flex flex-col items-center border border-white/5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Resultado Final</span>
              <motion.div key={results.nfc} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-7xl font-black tracking-tighter leading-none">
                {results.nfc.toFixed(2)}
              </motion.div>
            </div>

            {/* Desempenho */}
            <div className="bg-[#333333] rounded-[32px] p-6 md:p-8 space-y-10 border border-white/5">
              <h3 className="text-lg font-bold">Desempenho<br /><span className="text-sm text-white/40 font-normal">(Questões e Redação)</span></h3>
              
              <div className="space-y-10">
                {/* Questões */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-wider">Questões</span>
                    <div className="flex items-center gap-1 font-black">
                      <input type="number" value={inputs.npc} onChange={(e) => handleInputChange('npc', Math.min(60, Math.max(0, parseInt(e.target.value) || 0)))} className="bg-transparent text-right w-10 text-2xl outline-none" />
                      <span className="text-2xl text-white/20">/ 60</span>
                    </div>
                  </div>
                  <div className="relative w-full h-8 flex items-center">
                    <div className="absolute w-full h-1 bg-white/10 rounded-full" />
                    <motion.div className="absolute h-1 bg-[#ee4370] rounded-full" style={{ width: `${(inputs.npc / 60) * 100}%` }} />
                    <input type="range" min="0" max="60" value={inputs.npc} onChange={(e) => handleInputChange('npc', parseInt(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer z-20" />
                    <motion.div className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-4 border-[#ee4370] pointer-events-none z-10" style={{ left: `calc(${(inputs.npc / 60) * 100}% - 10px)` }} />
                  </div>
                </div>

                {/* Redação */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-wider">Redação</span>
                    <div className="flex items-center gap-1 font-black">
                      <input type="number" value={inputs.redacao} onChange={(e) => handleInputChange('redacao', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} className="bg-transparent text-right w-16 text-2xl outline-none" />
                      <span className="text-2xl text-white/20">/ 100</span>
                    </div>
                  </div>
                  <div className="relative w-full h-8 flex items-center">
                    <div className="absolute w-full h-1 bg-white/10 rounded-full" />
                    <motion.div className="absolute h-1 bg-blue-600 rounded-full" style={{ width: `${inputs.redacao}%` }} />
                    <input type="range" min="0" max="100" value={inputs.redacao} onChange={(e) => handleInputChange('redacao', parseInt(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer z-20" />
                    <motion.div className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-4 border-blue-600 pointer-events-none z-10" style={{ left: `calc(${inputs.redacao}% - 10px)` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Extras */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleInputChange('isAfro', !inputs.isAfro)} className={`p-6 md:p-8 rounded-[32px] flex flex-col gap-2 text-left border transition-all ${inputs.isAfro ? 'bg-[#ee4370] border-transparent shadow-xl' : 'bg-[#333333] border-white/5'}`}>
                <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Extra</span>
                <span className="text-sm md:text-lg font-black leading-tight">(Afro)</span>
              </button>
              <button onClick={() => handleInputChange('isPublic', !inputs.isPublic)} className={`p-6 md:p-8 rounded-[32px] flex flex-col gap-2 text-left border transition-all ${inputs.isPublic ? 'bg-blue-600 border-transparent shadow-xl' : 'bg-[#333333] border-white/5'}`}>
                <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Extra</span>
                <span className="text-sm md:text-lg font-black leading-tight">(Pública)</span>
              </button>
            </div>

            {/* ENEM */}
            <div className="bg-[#333333] rounded-[32px] p-6 md:p-8 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center text-white/20"><Info size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-lg font-black uppercase tracking-tighter leading-none">ENEM</span>
                  <span className="text-[10px] text-white/40 font-medium">Opcional</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {inputs.enem !== null && (
                  <input type="number" placeholder="0" value={inputs.enem === 500 ? '' : (inputs.enem || '')} onChange={(e) => handleInputChange('enem', Math.min(1000, parseInt(e.target.value) || 0))} className="w-16 bg-[#222] border border-white/10 rounded-xl text-center font-black text-sm py-2 outline-none" />
                )}
                <button onClick={() => handleInputChange('enem', inputs.enem === null ? 500 : null)} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${inputs.enem !== null ? 'bg-white border-white text-black' : 'border-white/20'}`}>
                  {inputs.enem !== null && <Check size={20} strokeWidth={4} />}
                </button>
              </div>
            </div>
          </div>

          {/* LADO DIREITO (DESKTOP) */}
          <div className="hidden md:flex md:col-span-4 flex-col gap-6 order-1 md:order-2">
            
            {/* Resultados Desktop */}
            <div className="bg-[#333333] rounded-[32px] p-10 flex flex-col items-center border border-white/5 text-center shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Nota Final Projetada</span>
              <motion.div key={results.nfc} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-9xl font-black tracking-tighter leading-none mb-4">
                {results.nfc.toFixed(2)}
              </motion.div>
              <AnimatePresence>
                {inputs.enem !== null && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-white/60">ENEM:</span>
                    <span className="text-xs font-black text-[#ee4370]">{results.enemPercent?.toFixed(2)}%</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Detalhes Desktop */}
            <div className="bg-[#1a1a1a] rounded-[32px] p-8 flex-1 border border-white/5 space-y-6">
               <span className="text-xs font-bold uppercase tracking-widest text-white/40">Composição da Nota</span>
               <div className="space-y-4">
                  {!hasBonus ? (
                    <div className="p-10 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center text-white/10 font-bold uppercase tracking-widest text-center text-[10px]">Sem bônus aplicados</div>
                  ) : (
                    <div className="space-y-2">
                      {inputs.isAfro && (
                        <div className="bg-[#ee4370]/10 p-4 rounded-2xl border border-[#ee4370]/20 flex justify-between items-center">
                          <span className="text-xs font-black text-[#ee4370]">Bônus Afro</span>
                          <span className="text-xs font-black">+3%</span>
                        </div>
                      )}
                      {inputs.isPublic && (
                        <div className="bg-blue-600/10 p-4 rounded-2xl border border-blue-600/20 flex justify-between items-center">
                          <span className="text-xs font-black text-blue-500">Escola Pública</span>
                          <span className="text-xs font-black">+10%</span>
                        </div>
                      )}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        <div className="h-20 md:hidden" />
      </main>
    </div>
  );
};

export default SimulatorView;
