import { useEffect, useState } from "react";
import { Profile, Skill, Project, BentoSkill } from "./types";
import { motion, AnimatePresence } from "motion/react";
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
  Instagram
} from "lucide-react";

type View = 'home' | 'works' | 'about' | 'contact';

const IconMap: Record<string, any> = {
  'function': SquareFunction,
  'code': Code2,
  'groups': Users,
  'terminal': Terminal,
  'database': Database,
  'cpu': Cpu
};

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [bentoSkills, setBentoSkills] = useState<BentoSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<View>('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sound effect for mechanical keyboard "thock"
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

        const profileData = await profileRes.json();
        const skillsData = await skillsRes.json();
        const projectsData = await projectsRes.json();
        const bentoData = await bentoRes.json();

        setProfile(profileData);
        setSkills(skillsData);
        setProjects(projectsData);
        setBentoSkills(bentoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-primary-cyan animate-pulse font-headline text-2xl tracking-tighter">Loading Experience...</div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-white font-body selection:bg-primary-cyan/30 relative overflow-hidden min-h-screen">
      {/* Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }}
      />

      {/* Moving Background Lines */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="background-lines">
          <div className="background-grid animate-grid"></div>
          <div className="background-diagonal animate-diagonal"></div>
          <div className="background-scanline animate-scanline"></div>
          <div className="background-scanline animate-scanline" style={{ animationDelay: '4s' }}></div>
          <div className="background-scanline-v animate-scanline-v"></div>
          <div className="background-scanline-v animate-scanline-v" style={{ animationDelay: '5s' }}></div>
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-cyan/10 rounded-full blur-[120px] animate-blob"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 flex items-center gap-8 shadow-2xl">
          <button 
            onClick={() => setActiveView('home')}
            onMouseEnter={playHoverSound}
            className={`text-sm font-medium transition-colors ${activeView === 'home' ? 'text-primary-cyan' : 'text-white/50 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveView('works')}
            onMouseEnter={playHoverSound}
            className={`text-sm font-medium transition-colors ${activeView === 'works' ? 'text-primary-cyan' : 'text-white/50 hover:text-white'}`}
          >
            Works
          </button>
          <button 
            onClick={() => setActiveView('about')}
            onMouseEnter={playHoverSound}
            className={`text-sm font-medium transition-colors ${activeView === 'about' ? 'text-primary-cyan' : 'text-white/50 hover:text-white'}`}
          >
            About
          </button>
          <div className="w-px h-4 bg-white/10"></div>
          <button 
            onClick={() => setActiveView('contact')}
            onMouseEnter={playHoverSound}
            className={`text-sm font-medium transition-colors ${activeView === 'contact' ? 'text-primary-cyan' : 'text-white/50 hover:text-white'}`}
          >
            Contact
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-6"
            >
              {/* Hero & Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Intro Card */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="md:col-span-3 bento-card p-10 md:p-14 flex flex-col justify-center space-y-6"
                >
                  <div className="status-badge w-fit">
                    <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full animate-pulse"></span>
                    Available for projects
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
                      Hello, I'm <span className="text-primary-cyan">{profile?.name || "Malvin"}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 font-medium leading-tight">
                      {profile?.hero_subtitle || "Crafting digital excellence through mathematical precision."}
                    </p>
                  </div>
                </div>

                {/* Profile Card */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="bento-card group"
                >
                  <img 
                    src="https://lh3.googleusercontent.com/aida/ADBb0uiMggPnN9uuSmRMw__1uov0mQp9SJKx76Y_L3vSH3v6ce4r9XTd-SvmhrvcWs_uuZ4IFcaQnRXLJ98DfAa700LFvaCpS5uOB3CofrZU5JHUC6MeYMbHwKZ1zP6_rd0Sp-fR3qXDsdzH73mAZHC7USyL5yYr8EoVB1RGvvp6AxeF8U-YsSV2sKH_u4iuBVX5TSNU1AtFGj6QMMmSBzbuCtWY4oYxb6gvfCICghtrpd_6n_-21YJYvw8DvgYA-SApnWm2C37UVwtxCY4" 
                    alt="Profile"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* About Card */}
                <div 
                  onClick={() => setActiveView('about')}
                  onMouseEnter={playHoverSound}
                  className="md:col-span-2 bento-card p-8 flex flex-col justify-between group cursor-pointer hover:bg-white/5 transition-all"
                >
                  <div className="space-y-4">
                    <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest">About Me</h3>
                    <p className="text-lg text-white/80 leading-relaxed line-clamp-4">
                      {profile?.about_text_1}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary-cyan font-bold text-sm group-hover:gap-3 transition-all">
                    Read more <ChevronRight size={16} />
                  </div>
                </div>

                {/* Location Card */}
                <div 
                  onClick={() => setActiveView('contact')}
                  onMouseEnter={playHoverSound}
                  className="bento-card p-8 flex flex-col justify-between bg-gradient-to-br from-primary-cyan/10 to-transparent cursor-pointer hover:from-primary-cyan/20 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary-cyan/20 flex items-center justify-center group-hover:bg-primary-cyan/30 transition-colors">
                      <MapPin className="text-primary-cyan" size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold">Indonesia</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-white/40">Current Time</p>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-primary-cyan" />
                      <p className="text-xl font-mono font-bold">
                        {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Card */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="bento-card p-8 flex flex-col justify-between"
                >
                  <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest">Tech Stack</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {skills.slice(0, 6).map((skill) => {
                      const Icon = IconMap[skill.icon] || Code2;
                      return (
                        <div 
                          key={skill.id} 
                          onMouseEnter={(e) => { e.stopPropagation(); playHoverSound(); }}
                          className="w-full aspect-square rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group"
                        >
                          <Icon size={20} className="text-white/40 group-hover:text-primary-cyan transition-colors" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Project Card */}
                {projects[0] && (
                  <div 
                    onClick={() => setActiveView('works')}
                    onMouseEnter={playHoverSound}
                    className="md:col-span-2 md:row-span-2 bento-card group cursor-pointer overflow-hidden"
                  >
                    <img 
                      src={projects[0].image_url} 
                      alt={projects[0].title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-8 space-y-2">
                      <span className="text-[10px] font-bold text-primary-cyan uppercase tracking-widest">{projects[0].period}</span>
                      <h4 className="text-2xl font-bold tracking-tight">{projects[0].title}</h4>
                      <p className="text-sm text-white/60 line-clamp-2 max-w-xs">{projects[0].description}</p>
                    </div>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                )}

                {/* Capabilities Card */}
                <div 
                  onMouseEnter={playHoverSound}
                  className="md:col-span-2 bento-card p-8 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest">Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => (
                        <span key={s.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60">
                          {s.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10 flex items-center justify-center overflow-hidden">
                          <img src={`https://picsum.photos/seed/${i}/100/100`} alt="user" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-white/40 font-medium">Trusted by global clients</p>
                  </div>
                </div>

                {/* Social Connect Card */}
                <div 
                  onClick={() => setActiveView('contact')}
                  onMouseEnter={playHoverSound}
                  className="md:col-span-2 bento-card p-8 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all"
                >
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary-cyan transition-colors">Let's connect</h3>
                    <p className="text-sm text-white/40">Find me on social media</p>
                  </div>
                  <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <a 
                      href="https://github.com/MalvinKristantoAlim" 
                      target="_blank" 
                      onMouseEnter={playHoverSound}
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary-cyan/20 transition-colors group/icon"
                    >
                      <Github size={20} className="text-white/40 group-hover/icon:text-primary-cyan transition-colors" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/malvin-k-a-ba3031383/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onMouseEnter={playHoverSound}
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary-cyan/20 transition-colors group/icon"
                    >
                      <Linkedin size={20} className="text-white/40 group-hover/icon:text-primary-cyan transition-colors" />
                    </a>
                    <a 
                      href="https://www.instagram.com/heymalvin_/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onMouseEnter={playHoverSound}
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary-cyan/20 transition-colors group/icon"
                    >
                      <Instagram size={20} className="text-white/40 group-hover/icon:text-primary-cyan transition-colors" />
                    </a>
                    <a 
                      href="mailto:malvinkristantoalim1@gmail.com" 
                      onMouseEnter={playHoverSound}
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary-cyan/20 transition-colors group/icon"
                    >
                      <Mail size={20} className="text-white/40 group-hover/icon:text-primary-cyan transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'works' && (
            <motion.div
              key="works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-5xl font-bold tracking-tighter">Selected <span className="text-primary-cyan">Works</span></h2>
                <p className="text-xl text-white/40 max-w-2xl">A collection of digital products and experiments focused on performance and user experience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    onMouseEnter={playHoverSound}
                    className="bento-card group flex flex-col"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                          <ArrowUpRight className="text-white/20 group-hover:text-primary-cyan transition-colors" />
                        </div>
                        <p className="text-white/50 leading-relaxed">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-3xl mx-auto space-y-16"
            >
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tighter">About <span className="text-primary-cyan">Me</span></h2>
                <div className="aspect-[3/2] rounded-[2rem] overflow-hidden border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="About"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6 text-xl text-white/60 leading-relaxed font-light">
                  <p>{profile?.about_text_1}</p>
                  <p>{profile?.about_text_2}</p>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold tracking-tight">Experience</h3>
                <div className="space-y-4">
                  {bentoSkills.map((skill) => (
                    <div 
                      key={skill.id} 
                      onMouseEnter={playHoverSound}
                      className="bento-card p-8 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-primary-cyan/10 flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors">
                          {(() => {
                            const Icon = IconMap[skill.icon] || Code2;
                            return <Icon className="text-primary-cyan" size={24} />;
                          })()}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{skill.title}</h4>
                          <p className="text-sm text-white/40">{skill.description}</p>
                        </div>
                      </div>
                      <div className="text-right hidden md:block">
                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Expertise</p>
                        <p className="text-sm font-bold text-primary-cyan">Advanced</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-3xl mx-auto space-y-16"
            >
              <div className="space-y-8 text-center">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Get in <span className="text-primary-cyan">Touch</span></h2>
                <p className="text-xl text-white/40 max-w-xl mx-auto">
                  I'm always open to new opportunities, collaborations, or just a friendly chat about technology and design.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="mailto:malvinkristantoalim1@gmail.com"
                  onMouseEnter={playHoverSound}
                  className="bento-card p-8 flex flex-col justify-between group hover:bg-primary-cyan/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-cyan/10 flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors">
                    <Mail className="text-primary-cyan" size={24} />
                  </div>
                  <div className="space-y-1 pt-12">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Email Me</p>
                    <p className="text-lg font-bold group-hover:text-primary-cyan transition-colors">malvinkristantoalim1@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/malvin-k-a-ba3031383/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="bento-card p-8 flex flex-col justify-between group hover:bg-primary-cyan/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-cyan/10 flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors">
                    <Linkedin className="text-primary-cyan" size={24} />
                  </div>
                  <div className="space-y-1 pt-12">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">LinkedIn</p>
                    <p className="text-lg font-bold group-hover:text-primary-cyan transition-colors">Malvin Kristanto Alim</p>
                  </div>
                </a>

                <a 
                  href="https://github.com/MalvinKristantoAlim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="bento-card p-8 flex flex-col justify-between group hover:bg-primary-cyan/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-cyan/10 flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors">
                    <Github className="text-primary-cyan" size={24} />
                  </div>
                  <div className="space-y-1 pt-12">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">GitHub</p>
                    <p className="text-lg font-bold group-hover:text-primary-cyan transition-colors">@MalvinKristantoAlim</p>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/heymalvin_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="bento-card p-8 flex flex-col justify-between group hover:bg-primary-cyan/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-cyan/10 flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors">
                    <Instagram className="text-primary-cyan" size={24} />
                  </div>
                  <div className="space-y-1 pt-12">
                    <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Instagram</p>
                    <p className="text-lg font-bold group-hover:text-primary-cyan transition-colors">@heymalvin_</p>
                  </div>
                </a>
              </div>

              <div className="bento-card p-12 text-center space-y-6 bg-gradient-to-b from-primary-cyan/5 to-transparent">
                <h3 className="text-2xl font-bold tracking-tight">Based in Indonesia</h3>
                <p className="text-white/40">Working remotely for clients worldwide.</p>
                <div className="flex justify-center gap-4">
                  <div className="status-badge">
                    <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full animate-pulse"></span>
                    GMT +7
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary-cyan rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-cyan/20">M</div>
          <div className="text-left">
            <p className="font-bold text-sm">{profile?.name}</p>
            <p className="text-xs text-white/40 tracking-tight">Software Engineer & Digital Craftsman</p>
          </div>
        </div>
        <div className="flex gap-8 text-xs font-bold text-white/40 uppercase tracking-widest">
          <a href="https://www.linkedin.com/in/malvin-k-a-ba3031383/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/MalvinKristantoAlim" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.instagram.com/heymalvin_/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="hover:text-white transition-colors">Instagram</a>
          <a href="mailto:malvinkristantoalim1@gmail.com" onMouseEnter={playHoverSound} className="hover:text-white transition-colors">Email</a>
        </div>
        <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">
          © 2024 Malvin Kristanto Alim
        </p>
      </footer>
    </div>
  );
}
