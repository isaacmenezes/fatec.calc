
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
    <div className="grid grid-cols-1 gap-4 lg:h-full flex flex-col">
      <DashboardCard className="bg-white flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden p-5 lg:p-6 min-h-[160px]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-10 h-10 bg-[#a6e3a1] rounded-[14px] flex items-center justify-center mb-4 shadow-lg shadow-[#a6e3a1]/20"
        >
          <Award size={20} className="text-black" />
        </motion.div>
        
        <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-[8px] mb-0.5">Nota Final (NFC)</h3>
        
        <motion.div 
          key={results.nfc}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl lg:text-7xl font-black text-black tracking-tighter mb-2"
        >
          {results.nfc.toFixed(2)}
        </motion.div>
        
        <p className="text-gray-400 max-w-[180px] text-[9px] font-bold leading-relaxed uppercase tracking-widest opacity-60">
          Pontuação Final Estimada
        </p>

        <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-[#faf9f6] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </DashboardCard>

      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <DashboardCard className="bg-[#ffcad4] border-none p-3 lg:p-4">
          <TrendingUp size={16} className="mb-2 text-gray-900" />
          <h4 className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-0.5">Objetiva</h4>
          <p className="text-xl font-black text-black leading-none">{results.n.toFixed(2)}</p>
        </DashboardCard>

        <DashboardCard className="bg-[#89b4fa] border-none p-3 lg:p-4">
          <Zap size={16} className="mb-2 text-gray-900" />
          <h4 className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-0.5">Redação</h4>
          <p className="text-xl font-black text-black leading-none">{(results.nf - (results.n * 0.8)).toFixed(2)}</p>
        </DashboardCard>
      </div>

      <DashboardCard className="bg-[#111111] text-white border-none p-4 lg:p-6 shadow-2xl flex flex-col justify-center">
        <h3 className="font-black text-[8px] uppercase tracking-[0.2em] opacity-40 mb-3">Detalhamento</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2.5 bg-white/5 rounded-xl border border-white/5">
            <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Prova (P)</span>
            <span className="font-mono font-black text-white text-sm">{results.p.toFixed(2)}</span>
          </div>
          
          <AnimatePresence>
            {results.enemPercent !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between items-center p-2.5 bg-white/5 rounded-xl border border-white/5 overflow-hidden"
              >
                <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">ENEM %</span>
                <span className="font-mono font-black text-[#89b4fa] text-sm">{results.enemPercent.toFixed(2)}%</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center p-2.5 bg-white/5 rounded-xl border border-white/5">
            <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Bônus</span>
            <span className="font-mono font-black text-[#f9e2af] text-sm">+{((results.multiplier - 1) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default CalculatorResult;
