import { lazy, Suspense } from "react";
import { OverlayProvider, useOverlay } from "./context/OverlayContext";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Team } from "./components/Team";
import { ContactFooter } from "./components/ContactFooter";

const ServiceModal = lazy(() =>
  import("./components/ServiceModal").then((m) => ({ default: m.ServiceModal })),
);
const ProjectModal = lazy(() =>
  import("./components/ProjectModal").then((m) => ({ default: m.ProjectModal })),
);
const LaurensModal = lazy(() =>
  import("./components/LaurensModal").then((m) => ({ default: m.LaurensModal })),
);

function AppContent() {
  const overlay = useOverlay();

  return (
    <>
      <a href="#home" className="skip-link">
        Zum Inhalt springen
      </a>

      <Navigation />
      <main>
        <Hero />
        <Intro />
        <Services onOpenService={overlay.openService} />
        <Process />
        <Projects onOpenProject={overlay.openProject} />
        <Team onOpenLaurens={overlay.openLaurens} />
      </main>
      <ContactFooter
        onOpenService={overlay.openService}
        onOpenLaurens={overlay.openLaurens}
      />

      <Suspense fallback={null}>
        <LaurensModal isOpen={overlay.laurensOpen} onClose={overlay.closeLaurens} />
        <ServiceModal
          serviceId={overlay.openServiceId}
          onClose={overlay.closeService}
        />
        <ProjectModal
          isOpen={overlay.openProjectId === "ai-sales-agent"}
          onClose={overlay.closeProject}
        />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <OverlayProvider>
      <AppContent />
    </OverlayProvider>
  );
}
