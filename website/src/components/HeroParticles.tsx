import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useMemo } from "react";
import styles from "./HeroParticles.module.css";

const particleOptions: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: { value: 36, density: { enable: true, width: 1200, height: 800 } },
    color: { value: ["#CC8066", "#475569", "#E8A892"] },
    opacity: { value: { min: 0.06, max: 0.28 } },
    size: { value: { min: 0.8, max: 1.8 } },
    move: {
      enable: true,
      speed: 0.25,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    links: {
      enable: true,
      distance: 130,
      color: "#334155",
      opacity: 0.1,
      width: 0.8,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 120, links: { opacity: 0.18 } },
    },
  },
};

export function HeroParticles() {
  const options = useMemo(() => particleOptions, []);

  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="hero-particles"
        className={styles.particles}
        options={options}
      />
    </ParticlesProvider>
  );
}
