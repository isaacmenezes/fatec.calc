
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Check, Info } from 'lucide-react';
import { CalculatorInputs, CalculatorResults } from '../types';

interface SimulatorViewProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  results: CalculatorResults;
  onOpenMenu: () => void;
}

const SimulatorView: React.FC<SimulatorViewProps> = ({ inputs, setInputs, results, onOpenMenu }) => {
  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const hasBonus = inputs.isAfro || inputs.isPublic;

  // Estilo para esconder as setas de input number
  const noSpinnerStyle = `
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  `;

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      <style>{noSpinnerStyle}</style>
      
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter">fatec.calc</h1>
        <button onClick={onOpenMenu} className="p-2">
          <Menu size={32} />
        </button>
      </header>

      <div className="space-y-1">
        <h2 className="text-5xl font-black tracking-tighter leading-none">Bem Vindo,</h2>
        <p className="text-white/40 font-medium text-sm">Frase enxuta explicativa sobre a página.</p>
      </div>

      {/* Card de Resultados (PNG 6) */}
      <div className="bg-[#333333] rounded-[32px] p-8 flex flex-col items-center border border-white/5 relative overflow-hidden">
        <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Resultados</span>
        
        <motion.div 
          key={results.nfc}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[100px] font-black tracking-tighter leading-none mb-2"
        >
          {results.nfc.toFixed(2)}
        </motion.div>

        {/* Info ENEM abaixo do resultado principal */}
        <AnimatePresence>
          {inputs.enem !== null && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/10 px-4 py-1 rounded-full flex items-center gap-2 mb-6"
            >
              <span className="text-[10px] font-black uppercase text-white/60">Equivalente ENEM:</span>
              <span className="text-xs font-black text-[#ee4370]">{results.enemPercent?.toFixed(2)}%</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detalhes apenas se houver bônus (Requisito: igual ao ENEM) */}
        <AnimatePresence>
          {hasBonus && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full space-y-3 overflow-hidden"
            >
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Detalhes</span>
              <div className="space-y-2">
                {inputs.isAfro && (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-12 bg-[#ee4370]/10 border border-[#ee4370]/30 rounded-2xl flex items-center justify-between px-4">
                    <span className="text-xs font-black uppercase text-[#ee4370]">Afrodescendência</span>
                    <span className="text-xs font-black">+3%</span>
                  </motion.div>
                )}
                {inputs.isPublic && (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-12 bg-blue-600/10 border border-blue-600/30 rounded-2xl flex items-center justify-between px-4">
                    <span className="text-xs font-black uppercase text-blue-500">Escola Pública</span>
                    <span className="text-xs font-black">+10%</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desempenho (Questões e Redação) */}
      <div className="bg-[#333333] rounded-[32px] p-6 space-y-10 border border-white/5">
        <h3 className="text-lg font-bold">Desempenho<br /><span className="text-sm text-white/40 font-normal">(Questões e Redação)</span></h3>
        
        <div className="space-y-10">
          {/* Questões - Slider com linha e bolinha */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-white/60 tracking-wider">Questões</span>
              <div className="flex items-center gap-1 font-black">
                <input 
                  type="number" 
                  value={inputs.npc}
                  onChange={(e) => handleInputChange('npc', Math.min(60, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="bg-transparent text-right w-10 text-2xl outline-none focus:text-[#ee4370] transition-colors"
                />
                <span className="text-2xl text-white/20">/ 60</span>
              </div>
            </div>
            
            <div className="relative w-full h-8 flex items-center">
              {/* Linha de Fundo */}
              <div className="absolute w-full h-1 bg-white/10 rounded-full" />
              {/* Linha de Progresso */}
              <motion.div 
                className="absolute h-1 bg-[#ee4370] rounded-full"
                style={{ width: `${(inputs.npc / 60) * 100}%` }}
              />
              {/* Range Input Invisível para a Bolinha */}
              <input 
                type="range" min="0" max="60" value={inputs.npc}
                onChange={(e) => handleInputChange('npc', parseInt(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
              />
              {/* Bolinha customizada que segue o valor */}
              <motion.div 
                className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] border-4 border-[#ee4370] pointer-events-none z-10"
                style={{ left: `calc(${(inputs.npc / 60) * 100}% - 12px)` }}
              />
            </div>
          </div>

          {/* Redação - Slider com linha e bolinha */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-white/60 tracking-wider">Redação</span>
              <div className="flex items-center gap-1 font-black">
                <input 
                  type="number" 
                  value={inputs.redacao}
                  onChange={(e) => handleInputChange('redacao', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="bg-transparent text-right w-16 text-2xl outline-none focus:text-blue-500 transition-colors"
                />
                <span className="text-2xl text-white/20">/ 100</span>
              </div>
            </div>
            
            <div className="relative w-full h-8 flex items-center">
              {/* Linha de Fundo */}
              <div className="absolute w-full h-1 bg-white/10 rounded-full" />
              {/* Linha de Progresso */}
              <motion.div 
                className="absolute h-1 bg-blue-600 rounded-full"
                style={{ width: `${inputs.redacao}%` }}
              />
              {/* Range Input Invisível */}
              <input 
                type="range" min="0" max="100" value={inputs.redacao}
                onChange={(e) => handleInputChange('redacao', parseInt(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
              />
              {/* Bolinha customizada */}
              <motion.div 
                className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] border-4 border-blue-600 pointer-events-none z-10"
                style={{ left: `calc(${inputs.redacao}% - 12px)` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bônus Extras */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleInputChange('isAfro', !inputs.isAfro)}
          className={`p-6 rounded-[32px] flex flex-col gap-2 text-left border transition-all ${inputs.isAfro ? 'bg-[#ee4370] border-transparent shadow-[0_0_20px_rgba(238,67,112,0.3)]' : 'bg-[#333333] border-white/5'}`}
        >
          <span className="text-xs font-bold uppercase opacity-60 tracking-widest">Extra</span>
          <span className="text-sm font-black leading-tight">(Afrodescendência)</span>
        </button>
        <button 
          onClick={() => handleInputChange('isPublic', !inputs.isPublic)}
          className={`p-6 rounded-[32px] flex flex-col gap-2 text-left border transition-all ${inputs.isPublic ? 'bg-blue-600 border-transparent shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-[#333333] border-white/5'}`}
        >
          <span className="text-xs font-bold uppercase opacity-60 tracking-widest">Extra</span>
          <span className="text-sm font-black leading-tight">(Escola Pública)</span>
        </button>
      </div>

      {/* ENEM Section */}
      <div className={`bg-[#333333] rounded-[32px] p-6 flex items-center justify-between border transition-all ${inputs.enem !== null ? 'border-white/20 bg-[#444]' : 'border-white/5'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${inputs.enem !== null ? 'bg-white text-black' : 'bg-[#222] text-white/20'}`}>
            <Info size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-tighter">Desempenho</span>
            <span className="text-xs text-white/40 font-medium">(Selecionar nota do ENEM)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {inputs.enem !== null && (
            <input 
              type="number" 
              placeholder="0-1000"
              value={inputs.enem === 500 ? '' : (inputs.enem || '')}
              onChange={(e) => handleInputChange('enem', Math.min(1000, parseInt(e.target.value) || 0))}
              className="w-20 bg-[#222] border border-white/10 rounded-lg text-center font-black text-sm py-2 focus:ring-2 focus:ring-[#ee4370] outline-none"
            />
          )}
          <button 
            onClick={() => handleInputChange('enem', inputs.enem === null ? 500 : null)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${inputs.enem !== null ? 'bg-white border-white text-black' : 'border-white/20'}`}
          >
            {inputs.enem !== null && <Check size={20} strokeWidth={3} />}
          </button>
        </div>
      </div>
      
      <footer className="text-center py-10 opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">fatec.calc • v2.0</p>
      </footer>
    </div>
  );
};

export default SimulatorView;
