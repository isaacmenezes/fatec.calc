
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Check, Info, TrendingUp, Zap, Award } from 'lucide-react';
import { CalculatorInputs, CalculatorResults, ViewState } from '../types';
import DesktopSidebar from './DesktopSidebar';

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
    let finalValue = value;
    
    // Validações básicas de range para os inputs digitados
    if (field === 'npc') finalValue = Math.min(60, Math.max(0, value));
    if (field === 'redacao') finalValue = Math.min(100, Math.max(0, value));
    if (field === 'enem' && value !== null) finalValue = Math.min(1000, Math.max(0, value));

    setInputs(prev => ({ ...prev, [field]: finalValue }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDF8F0] text-slate-900">
      <DesktopSidebar setView={setView} currentView={currentView} />

      <main className="flex-1 min-w-0 p-6 md:p-12 lg:p-16 overflow-y-auto">
        <header className="flex justify-between items-start mb-10 md:mb-16">
          <div className="space-y-1">
            <h1 className="md:hidden text-2xl font-black tracking-tighter mb-4 text-[#111111]">fatec.calc</h1>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-[#111111]">Simulador,</h2>
            <p className="text-slate-400 font-semibold text-sm md:text-base">Calcule sua nota final com bônus e ENEM.</p>
          </div>

          <button onClick={onOpenMenu} className="md:hidden p-2 text-[#111111]">
            <Menu size={32} />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-[1400px] mx-auto">
          
          {/* LADO ESQUERDO (Inputs) */}
          <div className="md:col-span-7 flex flex-col gap-8 order-2 md:order-1">
            
            {/* Card Desempenho */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 space-y-12 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-[#111111]">Desempenho Acadêmico</h3>
                <div className="bg-[#FDF8F0] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">Clique para digitar</div>
              </div>
              
              <div className="space-y-12">
                {/* NPC Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Acertos Objetivos</span>
                    <div className="flex items-baseline gap-1">
                      <input 
                        type="number" 
                        value={inputs.npc === 0 ? '' : inputs.npc} 
                        onChange={(e) => handleInputChange('npc', parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="text-4xl font-black text-[#111111] bg-transparent border-b-2 border-transparent hover:border-[#E990D1] focus:border-[#E990D1] w-20 text-right outline-none transition-all placeholder:text-slate-200"
                      />
                      <span className="text-3xl font-black text-slate-200">/60</span>
                    </div>
                  </div>
                  <input 
                    type="range" min="0" max="60" value={inputs.npc} 
                    onChange={(e) => handleInputChange('npc', parseInt(e.target.value))} 
                    className="w-full h-2.5 bg-[#FDF8F0] rounded-full appearance-none cursor-pointer" 
                    style={{ accentColor: '#E990D1' }}
                  />
                </div>

                {/* Redação Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Nota da Redação</span>
                    <div className="flex items-baseline gap-1">
                      <input 
                        type="number" 
                        value={inputs.redacao === 0 ? '' : inputs.redacao} 
                        onChange={(e) => handleInputChange('redacao', parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="text-4xl font-black text-[#111111] bg-transparent border-b-2 border-transparent hover:border-[#A5B4FC] focus:border-[#A5B4FC] w-24 text-right outline-none transition-all placeholder:text-slate-200"
                      />
                      <span className="text-3xl font-black text-slate-200">/100</span>
                    </div>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={inputs.redacao} 
                    onChange={(e) => handleInputChange('redacao', parseInt(e.target.value))} 
                    className="w-full h-2.5 bg-[#FDF8F0] rounded-full appearance-none cursor-pointer" 
                    style={{ accentColor: '#A5B4FC' }}
                  />
                </div>
              </div>
            </div>

            {/* Modalidades Grid */}
            <div className="grid grid-cols-2 gap-6">
              <button 
                onClick={() => handleInputChange('isAfro', !inputs.isAfro)} 
                className={`p-8 md:p-10 rounded-[40px] flex flex-col gap-3 text-left border transition-all duration-500 ${inputs.isAfro ? 'bg-[#E990D1] border-transparent shadow-[0_20px_40px_rgba(233,144,209,0.3)]' : 'bg-white border-black/5 hover:bg-[#FDF8F0]'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${inputs.isAfro ? 'bg-white/20 text-white' : 'bg-[#FDF8F0] text-slate-300'}`}>
                  <Check size={20} strokeWidth={4} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${inputs.isAfro ? 'text-white/80' : 'text-slate-400'}`}>Bônus Afro</span>
                <span className={`text-base md:text-xl font-black leading-tight ${inputs.isAfro ? 'text-white' : 'text-[#111111]'}`}>Inclusão Racial</span>
              </button>

              <button onClick={() => handleInputChange('isPublic', !inputs.isPublic)} className={`p-8 md:p-10 rounded-[40px] flex flex-col gap-3 text-left border transition-all duration-500 ${inputs.isPublic ? 'bg-[#A5B4FC] border-transparent shadow-[0_20px_40px_rgba(165,180,252,0.3)]' : 'bg-white border-black/5 hover:bg-[#FDF8F0]'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${inputs.isPublic ? 'bg-white/20 text-white' : 'bg-[#FDF8F0] text-slate-300'}`}>
                  <Check size={20} strokeWidth={4} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${inputs.isPublic ? 'text-white/80' : 'text-slate-400'}`}>Bônus Pública</span>
                <span className={`text-base md:text-xl font-black leading-tight ${inputs.isPublic ? 'text-white' : 'text-[#111111]'}`}>Escola Pública</span>
              </button>
            </div>

            {/* ENEM Card */}
            <div className="bg-white rounded-[40px] p-8 flex items-center justify-between border border-black/5">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#FCD34D] rounded-2xl flex items-center justify-center text-white"><Info size={28} /></div>
                <div>
                  <span className="text-lg font-black block">Utilizar ENEM?</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Melhora a nota objetiva</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {inputs.enem !== null && (
                  <input 
                    type="number" 
                    value={inputs.enem === 0 ? '' : inputs.enem} 
                    onChange={(e) => handleInputChange('enem', parseInt(e.target.value) || 0)} 
                    placeholder="0"
                    className="w-24 bg-[#FDF8F0] border border-black/5 rounded-2xl text-center font-black text-xl py-3 outline-none focus:ring-2 focus:ring-[#FCD34D] transition-all placeholder:text-slate-200" 
                  />
                )}
                <button onClick={() => handleInputChange('enem', inputs.enem === null ? 500 : null)} className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${inputs.enem !== null ? 'bg-[#111111] border-[#111111] text-white shadow-xl' : 'border-slate-100 text-slate-200 hover:border-slate-200'}`}>
                  {inputs.enem !== null && <Check size={28} strokeWidth={4} />}
                </button>
              </div>
            </div>
          </div>

          {/* LADO DIREITO (Resultados) */}
          <div className="md:col-span-5 flex flex-col gap-6 order-1 md:order-2">
            
            <div className="bg-[#111111] rounded-[48px] p-10 md:p-14 flex flex-col items-center text-center shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-20 -mt-20" />
              
              <Award className="text-[#E990D1] mb-6" size={48} />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-4 z-10">Nota Final Projetada</span>
              
              <motion.div 
                key={results.nfc} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-8xl md:text-[110px] font-black text-white tracking-tighter leading-none z-10"
              >
                {results.nfc.toFixed(2)}
              </motion.div>

              <div className="mt-8 bg-white/10 border border-white/5 px-6 py-2 rounded-full z-10 backdrop-blur-md">
                <span className="text-[10px] font-black text-[#E990D1] uppercase tracking-widest">Cálculo Oficial FATEC</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm flex flex-col items-center">
                <TrendingUp size={24} className="text-[#A5B4FC] mb-4" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nota Objetiva</span>
                <span className="text-3xl font-black text-[#111111]">{results.n.toFixed(2)}</span>
              </div>
              <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm flex flex-col items-center">
                <Zap size={24} className="text-[#FCD34D] mb-4" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bônus Total</span>
                <span className="text-3xl font-black text-[#E990D1]">+{((results.multiplier - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="bg-[#E990D115] border border-[#E990D130] rounded-[40px] p-8 flex items-center gap-6">
              <div className="w-12 h-12 bg-[#E990D1] rounded-2xl flex items-center justify-center text-white shrink-0">
                <Info size={24} />
              </div>
              <p className="text-xs font-bold text-[#E990D1] leading-relaxed">
                A nota final é composta por 80% da prova objetiva e 20% da redação, aplicada após os bônus.
              </p>
            </div>
          </div>
        </div>

        <div className="h-20 md:hidden" />
      </main>
    </div>
  );
};

export default SimulatorView;
