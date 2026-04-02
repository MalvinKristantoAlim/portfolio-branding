import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    about_text_1 TEXT,
    about_text_2 TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT,
    title TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    period TEXT,
    description TEXT,
    image_url TEXT,
    tags TEXT -- Stored as comma-separated values
  );

  CREATE TABLE IF NOT EXISTS bento_skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    icon TEXT
  );
`);

// Seed Data if empty
const profileCount = db.prepare("SELECT COUNT(*) as count FROM profile").get() as { count: number };
if (profileCount.count === 0) {
  db.prepare(`
    INSERT INTO profile (name, hero_title, hero_subtitle, about_text_1, about_text_2)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    "Malvin Kristanto Alim",
    "Digital Architect & Mathematical Strategist",
    "Bridging the gap between complex mathematical theory and high-performance code implementation. Student at SMAK Frateran Surabaya.",
    "I am a 12th-grade student with a deep-seated passion for Optimization Mathematics and Full-Stack Web Development. My journey is defined by a relentless pursuit of solving complex, real-world problems through logical precision and creative engineering.",
    "As a versatile developer and fast learner, I specialize in building scalable digital solutions. Whether it's optimizing logistics routes with linear algebra or crafting immersive user interfaces, I thrive in collaborative environments that challenge the status quo and push the boundaries of what's possible."
  );

  const skills = [
    ["code", "TypeScript", "Building type-safe, scalable applications with modern JavaScript patterns."],
    ["terminal", "Python", "Data analysis, automation, and mathematical modeling for complex systems."],
    ["cpu", "C++ / Java", "Foundational knowledge in object-oriented programming and algorithmic efficiency."],
    ["function", "React & Vite", "Developing high-performance, interactive user interfaces with a focus on UX."],
    ["database", "SQL & SQLite", "Architecting efficient data storage and optimizing complex query performance."],
    ["groups", "Tailwind CSS", "Crafting responsive, utility-first designs with a focus on modern aesthetics."],
    ["terminal", "Node.js & Express", "Building robust backend services and RESTful APIs for full-stack apps."],
    ["code", "HTML5 & CSS3", "The building blocks of the web, mastered for semantic and accessible design."]
  ];
  const insertSkill = db.prepare("INSERT INTO skills (icon, title, description) VALUES (?, ?, ?)");
  skills.forEach(s => insertSkill.run(s[0], s[1], s[2]));

  const insertProject = db.prepare(`
    INSERT INTO projects (title, period, description, image_url, tags)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertProject.run(
    "ANOMANI: Logistics Optimization",
    "2023 - 2025",
    "Led a cross-functional team to develop a mathematical modeling engine for logistics route optimization. Reduced operational costs by 15% through advanced linear programming.",
    "/anomanfoto.jpeg",
    "Mathematics,Optimization,Logistics"
  );

  insertProject.run(
    "Finalist - Raise Accounting Competition",
    "2025",
    "Ranked among the top finalists in a national-level accounting competition, showcasing expertise in financial analysis, auditing, and strategic planning.",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    "Finance,Accounting,Strategy"
  );

  insertProject.run(
    "Cyber-Physical System Prototype",
    "2024",
    "Engineered a prototype for a smart home system integrating IoT sensors with a real-time dashboard for energy monitoring and automated control.",
    "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop",
    "IoT,Dashboard,Automation"
  );

  insertProject.run(
    "Algorithmic Trading Bot",
    "2024",
    "Developed a Python-based trading bot that utilizes technical analysis indicators to execute automated trades on simulated market data.",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    "Python,Finance,Algorithms"
  );

  insertProject.run(
    "School Management Portal",
    "2023",
    "Built a comprehensive portal for student tracking, grade management, and teacher-student collaboration using React and Node.js.",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
    "FullStack,Education,React"
  );

  const bento = [
    ["Algorithmic Thinking", "Solving complex problems through precise logical sequences and mathematical optimization.", "terminal"],
    ["UI/UX Engineering", "Crafting intuitive and aesthetically pleasing interfaces with a focus on user experience.", "code"],
    ["Cloud Infrastructure", "Deploying scalable and resilient systems using modern cloud-native technologies.", "cpu"],
    ["Database Systems", "Architecting high-performance data storage solutions for complex applications.", "database"]
  ];
  const insertBento = db.prepare("INSERT INTO bento_skills (title, description, icon) VALUES (?, ?, ?)");
  bento.forEach(b => insertBento.run(b[0], b[1], b[2]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/profile", (req, res) => {
    const profile = db.prepare("SELECT * FROM profile LIMIT 1").get();
    res.json(profile);
  });

  app.get("/api/skills", (req, res) => {
    const skills = db.prepare("SELECT * FROM skills").all();
    res.json(skills);
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects").all();
    // Convert tags string back to array
    const formattedProjects = projects.map((p: any) => ({
      ...p,
      tags: p.tags ? p.tags.split(",") : []
    }));
    res.json(formattedProjects);
  });

  app.get("/api/bento-skills", (req, res) => {
    const bento = db.prepare("SELECT * FROM bento_skills").all();
    res.json(bento);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
