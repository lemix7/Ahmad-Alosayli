import React from "react";
import { flushSync } from "react-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CurvePageTransition,
  type CurvePageTransitionHandle,
} from "./components/CurvePageTransition/CurvePageTransition";
import type { ProjectItem } from "./components/ProjectCard";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { getProjectFromHash, ProjectDetail } from "./components/ProjectDetail";
//import { SmoothScroll } from './components/SmoothScroll';

export const App: React.FC = () => {
  const [project, setProject] = React.useState(getProjectFromHash);
  const transitionRef = React.useRef<CurvePageTransitionHandle>(null);
  const pending = React.useRef(false);
  const [busy, setBusy] = React.useState(false);

  const navigateProject = React.useCallback(
    async (nextProject: ProjectItem | undefined, updateHistory = true) => {
      if (pending.current || !transitionRef.current) return;
      pending.current = true;
      setBusy(true);
      try {
        await transitionRef.current.transition(
          async (signal) => {
            if (updateHistory) {
              window.history.pushState(
                null,
                "",
                nextProject
                  ? `#project/${encodeURIComponent(nextProject.id)}`
                  : "#projects",
              );
            }
            // Commit the destination while the SVG completely covers the viewport.
            flushSync(() => setProject(nextProject));
            if (nextProject) {
              window.scrollTo({ top: 0, behavior: "instant" });
            } else {
              // Let the projects' pinned scroll layout mount before positioning it.
              await new Promise<void>((resolve) =>
                requestAnimationFrame(() => resolve()),
              );

              if (signal.aborted) return;

              ScrollTrigger.refresh();

              document.getElementById("projects")?.scrollIntoView({
                behavior: "instant",
              });
              window.history.replaceState(null, "", window.location.pathname);
            }
          },
          { direction: nextProject ? "up" : "down" },
        );
        document
          .querySelector<HTMLElement>(nextProject ? "main h1" : "#projects")
          ?.focus({ preventScroll: true });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          console.error(error);
      } finally {
        pending.current = false;
        setBusy(false);
      }
    },
    [],
  );

  React.useEffect(() => {
    const syncProjectRoute = () => {
      const nextProject = getProjectFromHash();
      if (project && !nextProject && !pending.current) {
        void navigateProject(undefined, false);
        return;
      }
      transitionRef.current?.cancel();
      setProject(nextProject);
    };
    window.addEventListener("hashchange", syncProjectRoute);
    return () => window.removeEventListener("hashchange", syncProjectRoute);
  }, [project, navigateProject]);

  React.useEffect(() => {
    if (pending.current) return;
    if (project) {
      window.scrollTo(0, 0);
    } else if (window.location.hash === "#projects") {
      requestAnimationFrame(() => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [project]);

  return (
    //<SmoothScroll>
    <div className="min-h-screen  text-white" aria-busy={busy}>
      <CustomCursor />
      <CurvePageTransition ref={transitionRef} />
      {project ? (
        <ProjectDetail
          project={project}
          onBack={() => void navigateProject(undefined)}
          navigationBusy={busy}
        />
      ) : (
        <>
          <Hero />
          <About />
          <Projects
            onOpenProject={(nextProject) => void navigateProject(nextProject)}
            navigationBusy={busy}
          />
          <Footer />
        </>
      )}
    </div>
    //</SmoothScroll>
  );
};

export default App;
