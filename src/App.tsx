import React from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
//import { SmoothScroll } from './components/SmoothScroll';

export const App: React.FC = () => {
  return (
    //<SmoothScroll>
    <div className="min-h-screen  text-white">
      <CustomCursor/>
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
    //</SmoothScroll>
  );
};

export default App;
