import { lazy, Suspense, type ReactNode } from "react";
import { OverlayProvider, useOverlay } from "./context/OverlayContext";
import { useTabAwayTitle } from "./hooks/useTabAwayTitle";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Services } from "./components/Services";
import { GrowthBanner } from "./components/GrowthBanner";
import { CaseStudies } from "./components/CaseStudies";
import { Team } from "./components/Team";
import { ContactFooter } from "./components/ContactFooter";

const ServicePage = lazy(() =>
  import("./components/ServiceModal").then((m) => ({ default: m.ServicePage })),
);
const ProjectPage = lazy(() =>
  import("./components/ProjectModal").then((m) => ({ default: m.ProjectPage })),
);
const FinanznomadeCasePage = lazy(() =>
  import("./components/FinanznomadeCaseModal").then((m) => ({
    default: m.FinanznomadeCasePage,
  })),
);
const LaurensModal = lazy(() =>
  import("./components/LaurensModal").then((m) => ({ default: m.LaurensModal })),
);

function HomePage() {
  const overlay = useOverlay();

  return (
    <>
      <main>
        <Hero />
        <Intro />
        <Services onOpenService={overlay.openService} />
        <GrowthBanner />
        <CaseStudies onOpenProject={overlay.openProject} />
        <GrowthBanner
          headline={
            <>
              Bereit für <span className="em">produktive</span>{" "}
              <span className="mark">AI-Systeme</span>?
            </>
          }
          ctaLocation="post_cases"
        />
        <Team onOpenLaurens={overlay.openLaurens} />
      </main>
      <ContactFooter
        onOpenService={overlay.openService}
        onOpenLaurens={overlay.openLaurens}
      />
    </>
  );
}

function AppContent() {
  const overlay = useOverlay();
  useTabAwayTitle();
  const { openServiceId, openProjectId, closeService, closeProject } = overlay;

  let detailPage: ReactNode = null;
  if (openServiceId) {
    detailPage = <ServicePage serviceId={openServiceId} onClose={closeService} />;
  } else if (openProjectId === "ai-sales-agent") {
    detailPage = <ProjectPage onClose={closeProject} />;
  } else if (openProjectId === "finanznomade-kv") {
    detailPage = <FinanznomadeCasePage onClose={closeProject} />;
  }

  return (
    <>
      <a href="#home" className="skip-link">
        Zum Inhalt springen
      </a>

      <Navigation />

      {detailPage ? (
        <Suspense fallback={null}>{detailPage}</Suspense>
      ) : (
        <HomePage />
      )}

      <Suspense fallback={null}>
        <LaurensModal isOpen={overlay.laurensOpen} onClose={overlay.closeLaurens} />
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
