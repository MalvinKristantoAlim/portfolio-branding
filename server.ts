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
    "Hello, I am Malvin Kristanto Alim. I am a young professional with experience in the digital workforce.",
    "Exploring Logic Through Code and Mathematics. | Student at SMAK Frateran Surabaya.",
    "A 12th-grade student passionate about Optimization Mathematics and Web Development. I enjoy solving complex problems with a logical approach.",
    "As a fast learner, I thrive in academic teamwork and challenging collaborative projects. My main focus is bridging mathematical theory with practical code implementation."
  );

  const skills = [
    ["function", "Mathematics", "Optimization & Linear Algebra focus."],
    ["code", "Web Dev", "Modern UI/UX with Tailwind & Frameworks."],
    ["groups", "Collaboration", "Academic teamwork & leadership."]
  ];
  const insertSkill = db.prepare("INSERT INTO skills (icon, title, description) VALUES (?, ?, ?)");
  skills.forEach(s => insertSkill.run(s[0], s[1], s[2]));

  db.prepare(`
    INSERT INTO projects (title, period, description, image_url, tags)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    "Lead of Mathematics Optimization Project 'ANOMANI'",
    "2023 - Present",
    "Leading a team to develop mathematical models for logistics route optimization. Focused on reducing operational inefficiencies through linear optimization algorithms.",
    "https://lh3.googleusercontent.com/aida/ADBb0uh4o9eZeF9z4i64CmUJAk4VEyhP55s-MeYKLtnodu9cKhDbh3Anmn6AcTp36PvBYdp-Dzhm_9TLlxJmEPsL39YremhKHmgC5nUCnl19uvvsYxt19mr6lqCIJ47OuwT7-3VI_F9kWbywcgjSQXfCL1gl9LhNpZU7_cxWWVk6WFFWwJI-jK-1P3gmRYsagOPgdLESa3dRm8vy8m-W8Lb9vLzaJieb1go4Iak6QyyJFGq7mPlMQjdiqPkkPQYfBECMoleIIC-Y07fVXg",
    "Optimization,Leadership,Logistics"
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
