import { Profile, Skill, Project, BentoSkill } from "./types";

export const profileData: Profile = {
  id: 1,
  name: "Malvin Kristanto Alim",
  hero_title: "Digital Architect & Mathematical Strategist",
  hero_subtitle: "Bridging the gap between complex mathematical theory and high-performance code implementation. Student at SMAK Frateran Surabaya.",
  about_text_1: "I am a 12th-grade student with a deep-seated passion for Optimization Mathematics and Full-Stack Web Development. My journey is defined by a relentless pursuit of solving complex, real-world problems through logical precision and creative engineering.",
  about_text_2: "As a versatile developer and fast learner, I specialize in building scalable digital solutions. Whether it's optimizing logistics routes with linear algebra or crafting immersive user interfaces, I thrive in collaborative environments that challenge the status quo and push the boundaries of what's possible."
};

export const skillsData: Skill[] = [
  { id: 1, icon: "code", title: "TypeScript", description: "Building type-safe, scalable applications with modern JavaScript patterns." },
  { id: 2, icon: "terminal", title: "Python", description: "Data analysis, automation, and mathematical modeling for complex systems." },
  { id: 3, icon: "cpu", title: "C++ / Java", description: "Foundational knowledge in object-oriented programming and algorithmic efficiency." },
  { id: 4, icon: "function", title: "React & Vite", description: "Developing high-performance, interactive user interfaces with a focus on UX." },
  { id: 5, icon: "database", title: "SQL & SQLite", description: "Architecting efficient data storage and optimizing complex query performance." },
  { id: 6, icon: "groups", title: "Tailwind CSS", description: "Crafting responsive, utility-first designs with a focus on modern aesthetics." },
  { id: 7, icon: "terminal", title: "Node.js & Express", description: "Building robust backend services and RESTful APIs for full-stack apps." },
  { id: 8, icon: "code", title: "HTML5 & CSS3", description: "The building blocks of the web, mastered for semantic and accessible design." }
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: "ANOMANI: Logistics Optimization",
    period: "2023 - 2025",
    description: "Led a cross-functional team to develop a mathematical modeling engine for logistics route optimization. Reduced operational costs by 15% through advanced linear programming.",
    image_url: "/anomanfoto.jpeg",
    tags: ["Mathematics", "Optimization", "Logistics"]
  },
  {
    id: 2,
    title: "Finalist - Raise Accounting Competition",
    period: "2025",
    description: "Ranked among the top finalists in a national-level accounting competition, showcasing expertise in financial analysis, auditing, and strategic planning.",
    image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    tags: ["Finance", "Accounting", "Strategy"]
  },
  {
    id: 3,
    title: "Cyber-Physical System Prototype",
    period: "2024",
    description: "Engineered a prototype for a smart home system integrating IoT sensors with a real-time dashboard for energy monitoring and automated control.",
    image_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop",
    tags: ["IoT", "Dashboard", "Automation"]
  },
  {
    id: 4,
    title: "Algorithmic Trading Bot",
    period: "2024",
    description: "Developed a Python-based trading bot that utilizes technical analysis indicators to execute automated trades on simulated market data.",
    image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    tags: ["Python", "Finance", "Algorithms"]
  },
  {
    id: 5,
    title: "School Management Portal",
    period: "2023",
    description: "Built a comprehensive portal for student tracking, grade management, and teacher-student collaboration using React and Node.js.",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
    tags: ["FullStack", "Education", "React"]
  }
];

export const bentoSkillsData: BentoSkill[] = [
  { id: 1, title: "Algorithmic Thinking", description: "Solving complex problems through precise logical sequences and mathematical optimization.", icon: "terminal" },
  { id: 2, title: "UI/UX Engineering", description: "Crafting intuitive and aesthetically pleasing interfaces with a focus on user experience.", icon: "code" },
  { id: 3, title: "Cloud Infrastructure", description: "Deploying scalable and resilient systems using modern cloud-native technologies.", icon: "cpu" },
  { id: 4, title: "Database Systems", description: "Architecting high-performance data storage solutions for complex applications.", icon: "database" }
];
