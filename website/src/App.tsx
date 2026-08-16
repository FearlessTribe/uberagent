import { lazy, Suspense } from "react";
import { OverlayProvider, useOverlay } from "./context/OverlayContext";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { PainPoints } from "./components/PainPoints";
import { ChaosToStructure } from "./components/ChaosToStructure";
import { LighthouseOffer } from "./components/LighthouseOffer";
import { Services } from "./components/Services";
import { GrowthBanner } from "./components/GrowthBanner";
import { Process } from "./components/Process";
import { CaseStudies } from "./components/CaseStudies";
import { RoiCalculator } from "./components/RoiCalculator";
import { Faq } from "./components/Faq";
import { Team } from "./components/Team";
import { ContactFooter } from "./components/ContactFooter";

const ServiceModal = lazy(() =>
  import("./components/ServiceModal").then((m) => ({ default: m.ServiceModal })),
);
const ProjectModal = lazy(() =>
  import("./components/ProjectModal").then((m) => ({ default: m.ProjectModal })),
);
const FinanznomadeCaseModal = lazy(() =>
  import("./components/FinanznomadeCaseModal").then((m) => ({
    default: m.FinanznomadeCaseModal,
  })),
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
        <PainPoints />
        <ChaosToStructure />
        <LighthouseOffer />
        <Services onOpenService={overlay.openService} />
        <GrowthBanner />
        <Process />
        <CaseStudies onOpenProject={overlay.openProject} />
        <RoiCalculator />
        <Faq />
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
        <FinanznomadeCaseModal
          isOpen={overlay.openProjectId === "finanznomade-kv"}
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
