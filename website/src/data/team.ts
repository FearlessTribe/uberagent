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
    role: "CEO",
    image: "/laurens.jpg",
  },
];

export const laurensProfile = {
  bio: [
    "Ich helfe Unternehmen, AI Automation Workflows dort einzusetzen, wo sie echten operativen Hebel erzeugen: weniger manuelle Arbeit, klarere Prozesse, schnellere Entscheidungen und mehr Raum für Wachstum.",
    "Dabei verbinde ich technisches Verständnis, Geschäftsprozess Management und starken Fokus auf relevante KPIs mit einem Master in Informatik, einem Master in Business Administration und fünf Jahren Erfahrung im High-Tech-Produktmanagement.",
  ],
  education: [
    {
      period: "2017–2020",
      institution: "TU Wien, Austria",
      degree: "Master of Science: Computer Science",
    },
    {
      period: "2023–2025",
      institution: "Quantic School of Business & Technology",
      degree: "Master of Business Administration",
    },
    {
      period: "2010–2014",
      institution: "Ulm University, Germany",
      degree: "Bachelor of Science: Computer Science",
    },
  ],
  experience: [
    {
      period: "2025 – 2026",
      company: "Cistec AG, Switzerland",
      role: "Product Owner SaMD",
    },
    {
      period: "2023 – 2025",
      company: "Derisky.ai, Switzerland",
      role: "Founder",
    },
    {
      period: "2021 – 2023",
      company: "Gerresheimer Advanced Technologies",
      role: "Product Owner Digital Health & Manufacturing",
    },
    {
      period: "2020 – 2021",
      company: "Adesso Schweiz AG",
      role: "Requirements Software Engineer Consultant",
    },
    {
      period: "2019 – 2020",
      company: "Christian-Doppler-Institut, Austria",
      role: "Researcher & Usability Engineer",
    },
  ],
  responsibilities: [
    "Onboarding & Workshops",
    "Concepts & Development",
  ],
};
