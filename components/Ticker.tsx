import React from 'react';
import { motion } from 'framer-motion';

const Ticker: React.FC = () => {
  const text = "DE VESTIBULANDO PARA VESTIBULANDO • ";
  const repeatedText = Array(15).fill(text).join("");

  return (
    <div className="relative -mb-[90px] md:-mb-[100px] z-50">
      <div 
        className="relative"
        style={{ transform: 'rotate(-2deg)' }}
      >
        <div className="bg-black py-10 md:py-4 border-y-8 border-black overflow-hidden">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap"
          >
            <span className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter">
              {repeatedText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
