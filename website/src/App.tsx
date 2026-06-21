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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const handleLoadingComplete = useCallback(() => setLoading(false), []);
  const handleOpenService = useCallback((id: string | null) => setOpenServiceId(id), []);

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
        <Process />
        <Services onOpenService={(id) => handleOpenService(id)} />
        <Projects />
        <Team />
      </main>
      <ContactFooter onOpenService={(id) => handleOpenService(id)} />

      <ServiceModal
        serviceId={openServiceId}
        onClose={() => handleOpenService(null)}
      />
    </>
  );
}
