
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import SimulatorView from './components/SimulatorView';
import AboutView from './components/AboutView';
import MobileMenu from './components/MobileMenu';
import { CalculatorInputs } from './types';
import { useCalculator } from './hooks/useCalculator';

export type ViewState = 'landing' | 'simulator' | 'about';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    npc: 0,
    enem: null,
    redacao: 0,
    isAfro: false,
    isPublic: false
  });

  const results = useCalculator(inputs);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ee4370]">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingPage 
            key="landing"
            onStart={() => setView('simulator')} 
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        )}
        {view === 'simulator' && (
          <SimulatorView 
            key="simulator"
            inputs={inputs} 
            setInputs={setInputs} 
            results={results}
            onOpenMenu={() => setIsMenuOpen(true)}
            setView={setView}
            currentView={view}
          />
        )}
        {view === 'about' && (
          <AboutView 
            key="about"
            onOpenMenu={() => setIsMenuOpen(true)}
            setView={setView}
            currentView={view}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            onClose={() => setIsMenuOpen(false)} 
            setView={(v) => { setView(v); setIsMenuOpen(false); }}
            currentView={view}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
