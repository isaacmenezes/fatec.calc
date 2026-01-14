
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorResults } from '../types';
import DashboardCard from './ui/DashboardCard';
import { TrendingUp, Award, Zap } from 'lucide-react';

interface CalculatorResultProps {
  results: CalculatorResults;
}

const CalculatorResult: React.FC<CalculatorResultProps> = ({ results }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <DashboardCard className="bg-white flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden p-10">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Award size={120} />
        </div>
        
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center mb-10 shadow-sm border border-blue-100">
          <Award size={32} />
        </div>
        
        <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Nota Final Projetada</h3>
        
        <motion.div 
          key={results.nfc}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-8xl font-black text-slate-900 tracking-tighter mb-8"
        >
          {results.nfc.toFixed(2)}
        </motion.div>
        
        <div className="px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          Simulação Baseada no Edital
        </div>
      </DashboardCard>

      <div className="grid grid-cols-2 gap-4">
        <DashboardCard className="p-6">
          <TrendingUp size={20} className="text-blue-500 mb-4" />
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nota Objetiva</h4>
          <p className="text-2xl font-black text-slate-900">{results.n.toFixed(2)}</p>
        </DashboardCard>

        <DashboardCard className="p-6">
          <Zap size={20} className="text-pink-500 mb-4" />
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Redação</h4>
          <p className="text-2xl font-black text-slate-900">{(results.nf - (results.n * 0.8)).toFixed(2)}</p>
        </DashboardCard>
      </div>

      <DashboardCard className="bg-slate-900 text-white border-none p-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-slate-400 text-xs font-medium">Bônus Aplicado</span>
            <span className="font-bold text-blue-400">+{((results.multiplier - 1) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-400 text-xs font-medium">Peso Redação</span>
            <span className="font-bold text-white">20%</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default CalculatorResult;
