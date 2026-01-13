
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
    <div className="grid grid-cols-1 gap-6 h-full flex flex-col">
      {/* Principal NFC Card */}
      <DashboardCard className="bg-white flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden p-6 lg:p-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-[#a6e3a1] rounded-[18px] flex items-center justify-center mb-6 shadow-lg shadow-[#a6e3a1]/20"
        >
          <Award size={24} className="text-black" />
        </motion.div>
        
        <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-[9px] mb-1">Nota Final (NFC)</h3>
        
        <motion.div 
          key={results.nfc}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl lg:text-8xl font-black text-black tracking-tighter mb-4"
        >
          {results.nfc.toFixed(2)}
        </motion.div>
        
        <p className="text-gray-400 max-w-[200px] text-[10px] font-bold leading-relaxed uppercase tracking-widest opacity-60">
          Pontuação Final Estimada
        </p>

        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#faf9f6] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </DashboardCard>

      <div className="grid grid-cols-2 gap-4">
        <DashboardCard className="bg-[#ffcad4] border-none p-4 lg:p-5">
          <TrendingUp size={20} className="mb-3 text-gray-900" />
          <h4 className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-1">Objetiva</h4>
          <p className="text-2xl font-black text-black">{results.n.toFixed(2)}</p>
        </DashboardCard>

        <DashboardCard className="bg-[#89b4fa] border-none p-4 lg:p-5">
          <Zap size={20} className="mb-3 text-gray-900" />
          <h4 className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-1">Redação</h4>
          <p className="text-2xl font-black text-black">{(results.nf - (results.n * 0.8)).toFixed(2)}</p>
        </DashboardCard>
      </div>

      <DashboardCard className="bg-[#111111] text-white border-none p-6 lg:p-7 shadow-2xl shadow-black/20 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-black text-[9px] uppercase tracking-[0.2em] opacity-40">Detalhamento</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Prova (P)</span>
            <span className="font-mono font-black text-white text-base">{results.p.toFixed(2)}</span>
          </div>
          
          <AnimatePresence>
            {results.enemPercent !== null && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/5 overflow-hidden"
              >
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">ENEM %</span>
                <span className="font-mono font-black text-[#89b4fa] text-base">{results.enemPercent.toFixed(2)}%</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Bônus</span>
            <span className="font-mono font-black text-[#f9e2af] text-base">+{((results.multiplier - 1) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default CalculatorResult;
