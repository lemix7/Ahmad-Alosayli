import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0c0c0c] text-white">
        <Hero />
        <About />
        <Projects />
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;

