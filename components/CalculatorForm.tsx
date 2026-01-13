
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorInputs } from '../types';
import DashboardCard from './ui/DashboardCard';
import { HelpCircle, Check } from 'lucide-react';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, setInputs }) => {
  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: 'isAfro' | 'isPublic') => {
    handleInputChange(field, !inputs[field]);
  };

  return (
    <div className="space-y-5 h-full flex flex-col">
      <DashboardCard className="relative overflow-hidden group flex-1 flex flex-col p-5 lg:p-7">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">Seu Desempenho</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ajuste os valores para simular</p>
          </div>
          <HelpCircle size={20} className="text-gray-300" />
        </div>

        <div className="space-y-8 flex-1 flex flex-col justify-center">
          {/* NPC Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Questões Acertadas (0-60)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  min="0"
                  max="60"
                  value={inputs.npc}
                  onChange={(e) => handleInputChange('npc', Math.min(60, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-16 h-10 bg-gray-100 border border-gray-200 rounded-xl text-center font-black text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>
            <div className="relative h-2 flex items-center">
              <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
              <motion.div 
                className="absolute left-0 top-0 h-full bg-black rounded-full"
                animate={{ width: `${(inputs.npc / 60) * 100}%` }}
              />
              <input
                type="range" min="0" max="60" value={inputs.npc}
                onChange={(e) => handleInputChange('npc', parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>

          {/* Redação Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nota da Redação (0-100)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={inputs.redacao}
                  onChange={(e) => handleInputChange('redacao', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-16 h-10 bg-gray-100 border border-gray-200 rounded-xl text-center font-black text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>
            <div className="relative h-2 flex items-center">
              <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
              <motion.div 
                className="absolute left-0 top-0 h-full bg-[#cba6f7] rounded-full"
                animate={{ width: `${inputs.redacao}%` }}
              />
              <input
                type="range" min="0" max="100" value={inputs.redacao}
                onChange={(e) => handleInputChange('redacao', parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>

          {/* ENEM Optional Toggle */}
          <div className="pt-4 border-t border-gray-100">
             <button 
               onClick={() => handleInputChange('enem', inputs.enem === null ? 0 : null)}
               className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                 inputs.enem !== null 
                 ? 'bg-black border-black text-white shadow-lg' 
                 : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
               }`}
             >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${inputs.enem !== null ? 'bg-white text-black' : 'bg-gray-100'}`}>
                    {inputs.enem !== null && <Check size={14} strokeWidth={4} />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Nota do ENEM</span>
                </div>
                {inputs.enem === null && <span className="text-[8px] font-bold opacity-40 uppercase">Adicionar</span>}
             </button>
             
             <AnimatePresence>
               {inputs.enem !== null && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden mt-3"
                 >
                    <div className="bg-gray-100 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Performance ENEM</span>
                        <input 
                          type="number" min="0" max="1000" value={inputs.enem || ''}
                          onChange={(e) => handleInputChange('enem', Math.min(1000, Math.max(0, parseInt(e.target.value) || 0)))}
                          className="w-20 h-8 bg-white border border-gray-200 rounded-lg text-center font-black text-gray-900 text-sm focus:outline-none"
                        />
                      </div>
                      <input
                        type="range" min="0" max="1000" value={inputs.enem || 0}
                        onChange={(e) => handleInputChange('enem', parseInt(e.target.value))}
                        className="w-full h-1 bg-gray-300 rounded-full appearance-none accent-black"
                      />
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard className="bg-[#f9e2af] border-none p-5 lg:p-6 shadow-xl shadow-yellow-500/10">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-tighter mb-4">Bonificação</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleToggle('isAfro')}
            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
              inputs.isAfro ? 'bg-black text-white shadow-xl' : 'bg-white/40 text-gray-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${inputs.isAfro ? 'bg-white text-black' : 'bg-white/50 text-gray-400'}`}>
              {inputs.isAfro && <Check size={14} strokeWidth={4} />}
            </div>
            <div className="text-left overflow-hidden">
              <span className="block font-black text-[11px] leading-tight truncate">Afro</span>
              <span className="text-[8px] font-bold opacity-60 uppercase tracking-tighter">+3%</span>
            </div>
          </button>

          <button
            onClick={() => handleToggle('isPublic')}
            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
              inputs.isPublic ? 'bg-black text-white shadow-xl' : 'bg-white/40 text-gray-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${inputs.isPublic ? 'bg-white text-black' : 'bg-white/50 text-gray-400'}`}>
              {inputs.isPublic && <Check size={14} strokeWidth={4} />}
            </div>
            <div className="text-left overflow-hidden">
              <span className="block font-black text-[11px] leading-tight truncate">Pública</span>
              <span className="text-[8px] font-bold opacity-60 uppercase tracking-tighter">+10%</span>
            </div>
          </button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default CalculatorForm;
