
import React from 'react';
import { motion } from 'framer-motion';

const Ticker: React.FC = () => {
  const text = "DASHBOARD PREPARAÇÃO • CALCULE SEU FUTURO • SIMULE SUA VAGA • ";
  const repeatedText = Array(15).fill(text).join("");

  return (
    <div className="relative z-50 overflow-hidden py-4">
      <div 
        className="relative"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <div className="bg-[#111111] py-6 md:py-8 overflow-hidden shadow-2xl">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap flex"
          >
            <span className="text-white text-3xl md:text-6xl font-black uppercase tracking-tighter inline-block">
              {repeatedText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
