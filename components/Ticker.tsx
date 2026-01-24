
import React from 'react';
import { motion } from 'framer-motion';

const Ticker: React.FC = () => {
  const text = "DE VESTIBULANDO PARA VESTIBULANDO • ";
  const repeatedText = Array(15).fill(text).join("");

  return (
    <div className="relative z-50 overflow-hidden py-4">
      <div 
        className="relative"
        style={{ transform: 'rotate(-1.5deg)' }}
      >
        <div className="bg-black py-6 md:py-8 overflow-hidden shadow-2xl">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap flex"
          >
            <span className="text-white text-3xl md:text-7xl font-black uppercase tracking-tighter inline-block">
              {repeatedText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
