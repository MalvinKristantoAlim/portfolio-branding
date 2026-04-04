import { useEffect, useState, useRef } from "react";
import { Profile, Skill, Project, BentoSkill } from "./types";
import { profileData as staticProfile, skillsData as staticSkills, projectsData as staticProjects, bentoSkillsData as staticBento } from "./data";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Github, 
  Code2, 
  SquareFunction, 
  Users, 
  Terminal, 
  Database, 
  Cpu, 
  ChevronRight,
  MapPin,
  Clock,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
  Layers,
  Globe,
  Zap,
  ExternalLink,
  Sparkles,
  Activity,
  Command,
  Binary,
  Monitor,
  Download,
  Menu,
  X,
  MoreVertical
} from "lucide-react";

const IconMap: Record<string, any> = {
  'function': SquareFunction,
  'code': Code2,
  'groups': Users,
  'terminal': Terminal,
  'database': Database,
  'cpu': Cpu,
  'whatsapp': MessageCircle,
  'layout': SquareFunction,
  'layers': Layers,
  'globe': Globe,
  'zap': Zap
};

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [bentoSkills, setBentoSkills] = useState<BentoSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sound effect for mechanical keyboard "thock"
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const playHoverSound = () => {
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_78390a3221.mp3");
    audio.volume = 0.2;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay restrictions
    });
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, bentoRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/skills"),
          fetch("/api/projects"),
          fetch("/api/bento-skills")
        ]);

        if (!profileRes.ok || !skillsRes.ok || !projectsRes.ok || !bentoRes.ok) {
          throw new Error("API failed");
        }

        const profileData = await profileRes.json();
        const skillsData = await skillsRes.json();
        const projectsData = await projectsRes.json();
        const bentoData = await bentoRes.json();

        setProfile(profileData);
        setSkills(skillsData);
        setProjects(projectsData);
        setBentoSkills(bentoData);
      } catch (error) {
        console.error("Error fetching data, using fallback:", error);
        // Fallback to static data for Vercel/Static deployments
        setProfile(staticProfile);
        setSkills(staticSkills);
        setProjects(staticProjects);
        setBentoSkills(staticBento);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-emerald-primary animate-pulse font-headline text-2xl tracking-tighter uppercase">Loading Experience...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-body selection:bg-emerald-primary selection:text-black relative overflow-hidden min-h-screen">
      {/* Aesthetic Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] background-aurora"></div>

      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-primary z-[100] origin-left shadow-[0_0_15px_#00ff88]"
        style={{ scaleX }}
      />

      {/* Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }}
      />

      {/* Background Elements */}
      <div className="background-lines">
        <div className="background-grid"></div>
        <div className="background-noise"></div>
        
        {/* Abstract Blobs */}
        <div className="abstract-blob w-[600px] h-[600px] bg-emerald-primary/10 -top-40 -left-40"></div>
        <div className="abstract-blob w-[500px] h-[500px] bg-emerald-primary/5 top-1/2 -right-20 delay-700"></div>
        <div className="abstract-blob w-[700px] h-[700px] bg-emerald-primary/10 -bottom-40 left-1/4 delay-1000"></div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/6288226664102"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={playHoverSound}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#25D366]/30 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <MessageCircle size={32} className="text-white relative z-10" />
        <div className="absolute right-full mr-4 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none">
          Let's talk on WhatsApp
        </div>
      </motion.a>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 hidden md:block">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center gap-10 shadow-2xl">
          <button 
            onClick={() => setActiveView('home')}
            onMouseEnter={playHoverSound}
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeView === 'home' ? 'text-emerald-primary' : 'text-white/30 hover:text-emerald-primary'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveView('works')}
            onMouseEnter={playHoverSound}
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeView === 'works' ? 'text-emerald-primary' : 'text-white/30 hover:text-emerald-primary'}`}
          >
            Works
          </button>
          <button 
            onClick={() => setActiveView('skills')}
            onMouseEnter={playHoverSound}
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeView === 'skills' ? 'text-emerald-primary' : 'text-white/30 hover:text-emerald-primary'}`}
          >
            Skills
          </button>
          <button 
            onClick={() => setActiveView('about')}
            onMouseEnter={playHoverSound}
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeView === 'about' ? 'text-emerald-primary' : 'text-white/30 hover:text-emerald-primary'}`}
          >
            About
          </button>
          <div className="w-px h-4 bg-white/10"></div>
          <button 
            onClick={() => setActiveView('contact')}
            onMouseEnter={playHoverSound}
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeView === 'contact' ? 'text-emerald-primary' : 'text-white/30 hover:text-emerald-primary'}`}
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="fixed top-6 right-6 z-[60] md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={playHoverSound}
          className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-emerald-primary/10 transition-all"
        >
          {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-10"
          >
            <div className="flex flex-col items-center gap-8">
              {['home', 'works', 'skills', 'about', 'contact'].map((view) => (
                <button
                  key={view}
                  onClick={() => {
                    setActiveView(view);
                    setIsMenuOpen(false);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`text-4xl font-black uppercase tracking-[0.2em] transition-all ${activeView === view ? 'text-emerald-primary' : 'text-white/30'}`}
                >
                  {view}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-32"
            >
              {/* Home Section */}
              <section id="home" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="space-y-6"
                >
                  {/* Hero & Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Intro Card */}
                    <div 
                      onMouseEnter={playHoverSound}
                      className="md:col-span-3 bento-card p-10 md:p-20 flex flex-col justify-center space-y-10 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-all duration-700 group-hover:rotate-12">
                        <Sparkles size={160} className="text-emerald-primary animate-pulse-glow" />
                      </div>
                      <div className="status-badge w-fit">
                        <span className="w-2 h-2 bg-emerald-primary rounded-full animate-pulse shadow-[0_0_15px_#00ff88]"></span>
                        Open for high-end collaborations
                      </div>
                      <div className="space-y-6 relative z-10">
                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] emerald-text-gradient relative">
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          >
                            {profile?.name.split(' ')[0] || "Malvin"}
                          </motion.span>
                          <br />
                          <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-white/10"
                          >
                            {profile?.name.split(' ')[1] || "Kristanto"}
                          </motion.span>
                        </h1>
                        <p className="text-3xl md:text-4xl text-white font-light tracking-tight max-w-3xl leading-tight">
                          {profile?.hero_title || "Digital Architect & Mathematical Strategist"}
                        </p>
                      </div>
                      <div className="pt-8 flex flex-wrap gap-6 relative z-10">
                        <button 
                          onClick={() => setActiveView('contact')}
                          onMouseEnter={playHoverSound}
                          className="btn-emerald flex items-center gap-4"
                        >
                          Start a Project
                          <MessageCircle size={24} />
                        </button>
                        <a 
                          href="/resume.pdf"
                          download
                          onMouseEnter={playHoverSound}
                          className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center gap-3"
                        >
                          Resume <Download size={18} />
                        </a>
                      </div>
                    </div>

                    {/* Profile Card */}
                    <div 
                      onMouseEnter={playHoverSound}
                      className="bento-card group overflow-hidden relative"
                    >
                      <img 
                        src={profile?.profile_image_url || "/profile.jpeg"} 
                        alt="Profile"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-6 left-6">
                        <p className="text-[10px] font-bold text-emerald-primary uppercase tracking-[0.3em]">Location</p>
                        <p className="text-sm font-black uppercase tracking-tight">Surabaya, ID</p>
                      </div>
                    </div>

                    {/* Current Focus Card */}
                    <div 
                      onMouseEnter={playHoverSound}
                      className="md:col-span-2 bento-card p-12 flex flex-col justify-between group bg-gradient-to-br from-emerald-primary/5 to-transparent"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-primary/10 flex items-center justify-center">
                          <Activity size={28} className="text-emerald-primary animate-pulse" />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Status</p>
                          <p className="text-sm font-black text-emerald-primary uppercase">Active</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Current Focus</p>
                        <p className="text-3xl font-black tracking-tight leading-tight">Optimizing Logistics Algorithms & High-Performance Web Architecture</p>
                      </div>
                    </div>

                    {/* Featured Project Card */}
                    {projects[0] && (
                      <div 
                        onClick={() => setActiveView('works')}
                        onMouseEnter={playHoverSound}
                        className="md:col-span-2 bento-card group cursor-pointer overflow-hidden relative min-h-[300px]"
                      >
                        <img 
                          src={projects[0].image_url} 
                          alt={projects[0].title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-10 space-y-3">
                          <span className="text-[10px] font-bold text-emerald-primary uppercase tracking-widest">{projects[0].period}</span>
                          <h4 className="text-3xl font-bold tracking-tight">{projects[0].title}</h4>
                          <p className="text-base text-white/60 line-clamp-2 max-w-md italic font-light">"{projects[0].description}"</p>
                        </div>
                        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight size={24} />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </section>
        </motion.div>
      )}

          {activeView === 'works' && (
            <motion.div
              key="works"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Works Section */}
              <section id="works" className="space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-16"
              >
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                  Selected <span className="text-primary-cyan">Works</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/40 max-w-2xl leading-relaxed">
                  A curated collection of digital products, mathematical models, and engineering experiments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projects.map((project, index) => (
                  <motion.div 
                    key={project.id} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={playHoverSound}
                    className="bento-card group flex flex-col overflow-hidden border-white/5 hover:border-primary-cyan/30 transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {project.image_url ? (
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <Code2 size={64} className="text-white/10 group-hover:text-primary-cyan transition-colors" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-bold text-white/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                        {project.period}
                      </div>
                    </div>
                    <div className="p-10 space-y-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-white/[0.02]">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-3xl font-bold tracking-tight leading-tight group-hover:text-primary-cyan transition-colors">
                            {project.title}
                          </h3>
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary-cyan/20 transition-all">
                            <ArrowUpRight className="text-white/20 group-hover:text-primary-cyan" size={24} />
                          </div>
                        </div>
                        <p className="text-lg text-white/50 leading-relaxed font-light">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 group-hover:text-primary-cyan/60 group-hover:border-primary-cyan/20 transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </motion.div>
      )}

          {activeView === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Skills Section */}
              <section id="skills" className="space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-20"
            >
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none emerald-text-gradient">
                  Technical <span className="text-white">Stack</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/30 max-w-2xl leading-relaxed font-light italic">
                  A professional overview of the languages, frameworks, and tools I use to engineer digital excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skills.map((skill, index) => {
                  const Icon = IconMap[skill.icon] || Code2;
                  return (
                    <motion.div 
                      key={skill.id} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onMouseEnter={playHoverSound}
                      className="bento-card p-12 space-y-10 group hover:bg-white/[0.03] hover:border-emerald-primary/30 transition-all duration-700 flex flex-col justify-between"
                    >
                      <div className="space-y-8">
                        <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center group-hover:bg-emerald-primary/10 transition-all duration-700 group-hover:rotate-12">
                          <Icon className="text-white/10 group-hover:text-emerald-primary transition-colors" size={44} />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-3xl font-black tracking-tighter">{skill.title}</h3>
                          <p className="text-base text-white/30 leading-relaxed font-light">{skill.description}</p>
                        </div>
                      </div>
                      <div className="pt-8 space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Proficiency</span>
                          <span className="text-xs font-black text-emerald-primary uppercase tracking-widest">Advanced</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "90%" }}
                            transition={{ duration: 2, delay: 0.5 + (index * 0.1), ease: "circOut" }}
                            className="h-full bg-emerald-primary shadow-[0_0_20px_#00ff88]"
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Learning Roadmap / Interest Section */}
              <div className="bento-card p-12 md:p-24 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 p-12 opacity-5 group-hover:opacity-20 transition-all duration-1000 group-hover:rotate-45">
                  <Terminal size={400} />
                </div>
                <div className="max-w-3xl space-y-10 relative z-10">
                  <h3 className="text-5xl font-black tracking-tighter">Currently Exploring</h3>
                  <p className="text-2xl text-white/30 leading-relaxed font-light italic">
                    Beyond my core stack, I'm currently diving deep into <span className="text-white">Artificial Intelligence</span>, <span className="text-white">Quantum Computing fundamentals</span>, and <span className="text-white">Advanced Distributed Systems</span>.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {['Machine Learning', 'Rust', 'Web3', 'Cybersecurity'].map(item => (
                      <div key={item} className="px-8 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] text-sm font-black uppercase tracking-widest text-white/40 hover:text-emerald-primary hover:border-emerald-primary/30 transition-all duration-500">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </motion.div>
      )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* About Section */}
              <section id="about" className="space-y-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="max-w-6xl mx-auto space-y-32"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] emerald-text-gradient">
                          The <span className="text-white">Story</span>
                        </h2>
                        <p className="text-3xl text-emerald-primary font-light italic tracking-tight">
                          Architecting logic, one line at a time.
                        </p>
                      </div>
                      <div className="space-y-10 text-2xl text-white/30 leading-relaxed font-light italic">
                        <p>{profile?.about_text_1}</p>
                        <p>{profile?.about_text_2}</p>
                      </div>
                      <div className="flex gap-16 pt-8">
                        <div>
                          <p className="text-6xl font-black text-white tracking-tighter">12th</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">Grade Student</p>
                        </div>
                        <div>
                          <p className="text-6xl font-black text-white tracking-tighter">15+</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">Projects</p>
                        </div>
                        <div>
                          <p className="text-6xl font-black text-white tracking-tighter">5+</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">Languages</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 relative z-10 group shadow-2xl shadow-emerald-primary/10">
                        <img 
                          src={profile?.profile_image_url || "/profile.jpeg"} 
                          alt="About"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </div>
                      <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-primary/10 rounded-full blur-[120px] animate-pulse-glow"></div>
                      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-primary/5 rounded-full blur-[150px] animate-blob"></div>
                    </div>
                  </div>

              {/* Values Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { icon: Zap, title: "Performance First", desc: "Optimizing every byte for maximum speed and efficiency." },
                  { icon: Globe, title: "Global Vision", desc: "Building solutions that resonate on a worldwide scale." },
                  { icon: Layers, title: "Clean Architecture", desc: "Writing maintainable, scalable, and elegant codebases." }
                ].map((value, i) => (
                  <div key={i} className="bento-card p-12 space-y-8 group hover:bg-white/[0.03] transition-all duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-primary/10 transition-all duration-500 group-hover:rotate-12">
                      <value.icon className="text-white/10 group-hover:text-emerald-primary transition-colors" size={32} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black tracking-tighter">{value.title}</h4>
                      <p className="text-lg text-white/30 leading-relaxed font-light italic">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        </motion.div>
      )}

          {activeView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Contact Section */}
              <section id="contact" className="space-y-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="max-w-4xl mx-auto space-y-24"
                >
              <div className="space-y-8 text-center">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none emerald-text-gradient">
                  Get in <span className="text-white">Touch</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/30 max-w-2xl mx-auto leading-relaxed font-light italic">
                  I'm always open to new opportunities, collaborations, or just a friendly chat about technology and design.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Mail, label: "Email Me", value: "malvinkristantoalim1@gmail.com", href: "mailto:malvinkristantoalim1@gmail.com" },
                  { icon: Linkedin, label: "LinkedIn", value: "Malvin Kristanto Alim", href: "https://www.linkedin.com/in/malvin-k-a-ba3031383/" },
                  { icon: Github, label: "GitHub", value: "@MalvinKristantoAlim", href: "https://github.com/MalvinKristantoAlim" },
                  { icon: Instagram, label: "Instagram", value: "@heymalvin_", href: "https://www.instagram.com/heymalvin_/" },
                  { icon: MessageCircle, label: "WhatsApp", value: "+62 882 2666 4102", href: "https://wa.me/6288226664102" }
                ].map((contact, i) => (
                  <a 
                    key={i}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? "_blank" : undefined}
                    rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    onMouseEnter={playHoverSound}
                    className="bento-card p-10 flex flex-col justify-between group hover:bg-emerald-primary/5 transition-all duration-700"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-primary/10 transition-all duration-500">
                      <contact.icon className="text-white/20 group-hover:text-emerald-primary" size={32} />
                    </div>
                    <div className="space-y-2 pt-12">
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{contact.label}</p>
                      <p className="text-xl font-black group-hover:text-emerald-primary transition-colors tracking-tight">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bento-card p-16 text-center space-y-8 bg-gradient-to-b from-emerald-primary/5 to-transparent relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <h3 className="text-4xl font-black tracking-tighter relative z-10">Based in Indonesia</h3>
                <p className="text-xl text-white/30 font-light italic relative z-10">Working remotely for clients worldwide.</p>
                <div className="flex justify-center gap-4 relative z-10">
                  <div className="status-badge bg-emerald-primary/10 border-emerald-primary/20 text-emerald-primary">
                    <span className="w-2 h-2 bg-emerald-primary rounded-full animate-pulse"></span>
                    GMT +7
                  </div>
                </div>
              </div>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-primary rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-2xl shadow-emerald-primary/20 rotate-3 hover:rotate-0 transition-transform duration-500">M</div>
          <div className="text-left">
            <p className="font-black text-lg tracking-tighter">{profile?.name}</p>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Software Engineer & Digital Craftsman</p>
          </div>
        </div>
        <div className="flex gap-10 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
          <a href="https://www.linkedin.com/in/malvin-k-a-ba3031383/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="hover:text-emerald-primary transition-colors">LinkedIn</a>
          <a href="https://github.com/MalvinKristantoAlim" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="hover:text-emerald-primary transition-colors">GitHub</a>
          <a href="https://wa.me/6288226664102" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="hover:text-emerald-primary transition-colors">WhatsApp</a>
        </div>
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">© 2026 Malvin Kristanto Alim</p>
      </footer>
    </div>
  );
}
