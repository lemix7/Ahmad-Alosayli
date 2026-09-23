import React from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { getProjectFromHash, ProjectDetail } from "./components/ProjectDetail";
//import { SmoothScroll } from './components/SmoothScroll';

export const App: React.FC = () => {
  const [project, setProject] = React.useState(getProjectFromHash);

  React.useEffect(() => {
    const syncProjectRoute = () => setProject(getProjectFromHash());
    window.addEventListener("hashchange", syncProjectRoute);
    return () => window.removeEventListener("hashchange", syncProjectRoute);
  }, []);

  React.useEffect(() => {
    if (project) {
      window.scrollTo(0, 0);
    } else if (window.location.hash === "#projects") {
      requestAnimationFrame(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [project]);

  return (
    //<SmoothScroll>
    <div className="min-h-screen  text-white">
      <CustomCursor/>
      {project ? (
        <ProjectDetail project={project} />
      ) : (
        <>
          <Hero />
          <About />
          <Projects />
          <Footer />
        </>
      )}
    </div>
    //</SmoothScroll>
  );
};

export default App;
