
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
    <div className="space-y-6 flex flex-col">
      <DashboardCard className="p-8">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Desempenho</h2>
            <p className="text-xs text-gray-400 font-medium mt-1">Simule seus valores com as barras</p>
          </div>
          <HelpCircle size={20} className="text-gray-200" />
        </div>

        <div className="space-y-12">
          {/* NPC Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Questões Comuns (0-60)</label>
              <div className="px-4 py-2 bg-slate-50 rounded-xl font-bold text-slate-900 border border-slate-100 min-w-[60px] text-center">
                {inputs.npc}
              </div>
            </div>
            <input 
              type="range" min="0" max="60" value={inputs.npc}
              onChange={(e) => handleInputChange('npc', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none accent-[#1a56db] cursor-pointer"
            />
          </div>

          {/* Redação Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nota Redação (0-100)</label>
              <div className="px-4 py-2 bg-slate-50 rounded-xl font-bold text-slate-900 border border-slate-100 min-w-[60px] text-center">
                {inputs.redacao}
              </div>
            </div>
            <input 
              type="range" min="0" max="100" value={inputs.redacao}
              onChange={(e) => handleInputChange('redacao', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none accent-[#f05179] cursor-pointer"
            />
          </div>

          {/* ENEM Optional */}
          <div className="pt-6 border-t border-gray-50">
             <button 
               onClick={() => handleInputChange('enem', inputs.enem === null ? 0 : null)}
               className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${
                 inputs.enem !== null ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-slate-50 text-slate-400 border border-slate-100'
               }`}
             >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${inputs.enem !== null ? 'bg-white text-black' : 'bg-gray-200'}`}>
                    {inputs.enem !== null && <Check size={14} strokeWidth={4} />}
                  </div>
                  <span className="font-bold text-sm">Utilizar nota do ENEM</span>
                </div>
                {inputs.enem === null && <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Opcional</span>}
             </button>
             
             <AnimatePresence>
               {inputs.enem !== null && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden mt-6"
                 >
                    <div className="bg-slate-50 rounded-3xl p-6 space-y-6 border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold uppercase">Nota ENEM (0-1000)</span>
                        <input 
                          type="number" min="0" max="1000" value={inputs.enem || ''}
                          onChange={(e) => handleInputChange('enem', Math.min(1000, Math.max(0, parseInt(e.target.value) || 0)))}
                          className="w-24 h-10 border border-slate-200 rounded-xl text-center font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="0-1000"
                        />
                      </div>
                      <input 
                        type="range" min="0" max="1000" value={inputs.enem || 0}
                        onChange={(e) => handleInputChange('enem', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none accent-slate-900"
                      />
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </DashboardCard>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleToggle('isAfro')}
          className={`group relative flex flex-col items-center justify-center gap-3 p-8 rounded-[32px] transition-all duration-300 border-2 ${
            inputs.isAfro ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-gray-100 hover:border-pink-200'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${inputs.isAfro ? 'bg-white text-slate-900' : 'bg-slate-50 text-slate-300'}`}>
            <Check size={20} strokeWidth={3} className={`${inputs.isAfro ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <span className="font-bold text-sm tracking-tight">Afrodescendente</span>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">+3% bônus</span>
        </button>

        <button 
          onClick={() => handleToggle('isPublic')}
          className={`group relative flex flex-col items-center justify-center gap-3 p-8 rounded-[32px] transition-all duration-300 border-2 ${
            inputs.isPublic ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-gray-100 hover:border-blue-200'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${inputs.isPublic ? 'bg-white text-slate-900' : 'bg-slate-50 text-slate-300'}`}>
            <Check size={20} strokeWidth={3} className={`${inputs.isPublic ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <span className="font-bold text-sm tracking-tight">Escola Pública</span>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">+10% bônus</span>
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
