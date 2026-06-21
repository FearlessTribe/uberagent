import { useState, useCallback } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Team } from "./components/Team";
import { ContactFooter } from "./components/ContactFooter";
import { ServiceModal } from "./components/ServiceModal";
import { useServiceRoute } from "./hooks/useServiceRoute";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { openServiceId, setOpenServiceId } = useServiceRoute();

  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <a href="#home" className="skip-link">
        Zum Inhalt springen
      </a>

      <Navigation />
      <main>
        <Hero />
        <Intro />
        <Services onOpenService={setOpenServiceId} />
        <Process />
        <Projects />
        <Team />
      </main>
      <ContactFooter onOpenService={setOpenServiceId} />

      <ServiceModal
        serviceId={openServiceId}
        onClose={() => setOpenServiceId(null)}
      />
    </>
  );
}
