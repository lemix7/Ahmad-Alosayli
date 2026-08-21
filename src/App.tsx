import React from 'react';
import { Hero } from './components/Hero';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Hero />
    </div>
  );
};

export default App;
