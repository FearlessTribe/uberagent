import laurensPhoto from "../assets/laurens.jpg";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "laurens",
    name: "Laurens Lang, M.Sc. MBA",
    role: "Founder",
    image: laurensPhoto,
  },
];

export interface LaurensEducation {
  period: string;
  institution: string;
  degree: string;
  logoSrc: string;
}

export interface LaurensExperience {
  period: string;
  company: string;
  role: string;
  location: string;
  highlight: string;
  logoSrc: string;
}

export const laurensProfile = {
  headline: "AI-Agenten, die im Betrieb spürbar entlasten.",
  bio: "Ich baue AI-Agenten und Automation dort, wo manueller Aufwand, unklare Prozesse und langsame Entscheidungen Wachstum bremsen. Fokus: KPIs, Ownership und messbare Wirkung.",
  proofPoints: ["M.Sc. Informatik", "MBA", "5+ Jahre Product"],
  education: [
    {
      period: "2017–2020",
      institution: "TU Wien",
      degree: "Master of Science · Informatik",
      logoSrc: "/logos/profile/tu-wien.svg",
    },
    {
      period: "2023–2025",
      institution: "Quantic School of Business & Technology",
      degree: "Master of Business Administration",
      logoSrc: "/logos/profile/quantic.svg",
    },
    {
      period: "2010–2014",
      institution: "Universität Ulm",
      degree: "Bachelor of Science · Informatik",
      logoSrc: "/logos/profile/uni-ulm.png",
    },
  ] satisfies LaurensEducation[],
  experience: [
    {
      period: "2025–2026",
      company: "Cistec AG",
      role: "Product Owner SaMD",
      location: "Zürich, Schweiz",
      highlight: "Medizinprodukt-Software mit klarer Delivery und regulatorischem Fokus.",
      logoSrc: "/logos/profile/cistec.png",
    },
    {
      period: "2023–2025",
      company: "Derisky.ai",
      role: "Founder",
      location: "Zürich, Schweiz",
      highlight: "Produkt und GTM für AI-gestütztes Derisking von Geschäftsmodellen.",
      logoSrc: "/logos/profile/derisky.png",
    },
    {
      period: "2021–2023",
      company: "Gerresheimer Advanced Technologies",
      role: "Product Owner Digital Health & Manufacturing",
      location: "Schweiz",
      highlight: "Digitale Health- und Fertigungsprodukte von Konzept bis Release.",
      logoSrc: "/logos/profile/gerresheimer.png",
    },
    {
      period: "2020–2021",
      company: "Adesso Schweiz AG",
      role: "Requirements Software Engineer Consultant",
      location: "Zürich, Schweiz",
      highlight: "Anforderungen und Umsetzung in Enterprise-Softwareprojekten.",
      logoSrc: "/logos/profile/adesso.png",
    },
    {
      period: "2019–2020",
      company: "Christian-Doppler-Institut",
      role: "Researcher & Usability Engineer",
      location: "Wien, Österreich",
      highlight: "Forschung und Usability für datengetriebene Systeme.",
      logoSrc: "/logos/profile/cdi.png",
    },
  ] satisfies LaurensExperience[],
  principles: [
    {
      title: "Zuerst Prozess und KPI",
      text: "Erst der operative Hebel, dann der Agent. Nicht andersherum.",
    },
    {
      title: "Kalibrierung vor Go-live",
      text: "Mit echten Fällen prüfen, justieren, dann erst skalieren.",
    },
    {
      title: "Ownership bis Wirkung",
      text: "Nicht nur liefern, sondern bis zur messbaren Entlastung begleiten.",
    },
  ],
  caseProof: {
    client: "Finanznomade",
    quote:
      "Aus einem Prototypen wurde ein voll funktionsfähiger Versicherungskonfigurator: unkompliziert, schnell, lösungsorientiert.",
    projectId: "finanznomade-kv",
  },
} as const;
