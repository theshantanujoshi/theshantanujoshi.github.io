import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { ScrollVelocity } from './components/ScrollVelocity';
import { TIMELINE_DATA, PROJECTS_DATA, JOURNAL_DATA, LINKS_DATA } from './data';
import { FileText, Calendar, Linkedin, Github, Mail, Phone, Twitter, BookOpen, Instagram, Menu, X } from 'lucide-react';
import { ProjectItem } from './types';
import SignatureAnimation from './components/SignatureAnimation';
import LineWaves from './LineWaves';
import MagnetLines from './components/MagnetLines';
import FloatingLines from './components/FloatingLines';
import DarkVeil from './components/DarkVeil';
import PlasmaWave from './components/PlasmaWave';
import EasterEgg from './components/EasterEgg';
import { ReactLenis } from 'lenis/react';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 127.14 96.36" 
    width="24" 
    height="24" 
    fill="currentColor" 
    stroke="none" 
    {...props}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.09,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const topRow = "product strategist • creative technologist • systems thinker • ui architect • problem solver • experience designer • clean code advocate • design system builder • workflow optimizer • visual storyteller • technical translator • interaction designer • community builder • web performance optimizer • documentation architect • strategic executor • detail oriented builder • interface designer • logic driven builder • cross functional collaborator • operational streamliner • digital craftsman • pattern finder • information architect • growth enabler";

const bottomRow = "product stylist • analytical thinker • framework agnostic developer • resource orchestrator • project catalyst • spatial ui thinker • automation enthusiast • technical catalyst • complexity reducer • collaborative facilitator • delivery strategist • pixel precise pragmatist • kinetic ui builder • aesthetic minimalist • code artisan • tech stack navigator • infrastructure synthesizer • knowledge synthesizer • perpetual learner • pragmatic idealist • vision executor • content architect • clarifying voice • conceptual thinker • chaos coordinator";

const IconMap: Record<string, React.FC<any>> = {
  FileText, Calendar, Linkedin, Github, Mail, Phone, Twitter, BookOpen, Instagram, Discord: DiscordIcon
};

type PageType = 'INDEX' | 'EXPERIENCE' | 'PROJECTS' | 'GALLERY' | 'NETWORK';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('INDEX');
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activePage === 'INDEX' && e.deltaY > 30) {
        setActivePage('EXPERIENCE');
      }
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (activePage === 'INDEX') {
        const touchEndY = e.touches[0].clientY;
        if (touchStartY - touchEndY > 30) {
          setActivePage('EXPERIENCE');
        }
      }
    };

    if (activePage === 'INDEX') {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activePage]);

  const navigateTo = (page: PageType) => {
    setActivePage(page);
  };

  const handleNavClick = (navItem: string) => {
    if (navItem === 'HOME') navigateTo('INDEX');
    else if (navItem === 'EXPERIENCE') navigateTo('EXPERIENCE');
    else if (navItem === 'PROJECTS') navigateTo('PROJECTS');
    else if (navItem === 'CONTACT') navigateTo('NETWORK');
    else if (navItem === 'GALLERY') navigateTo('GALLERY');
    setIsNavOpen(false);
  };

  return (
    <div className="w-full bg-[#131313] text-[#FFFFFF] select-none antialiased relative h-screen overflow-hidden">
      <EasterEgg />
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex absolute top-8 right-10 z-50 gap-6 text-xs font-mono tracking-widest uppercase mix-blend-difference">
         {['HOME', 'EXPERIENCE', 'PROJECTS', 'GALLERY', 'CONTACT'].map((item) => {
           let isActive = false;
           if (item === 'HOME' && activePage === 'INDEX') isActive = true;
           if (item === 'EXPERIENCE' && activePage === 'EXPERIENCE') isActive = true;
           if (item === 'PROJECTS' && activePage === 'PROJECTS') isActive = true;
           if (item === 'GALLERY' && activePage === 'GALLERY') isActive = true;
           if (item === 'CONTACT' && activePage === 'NETWORK') isActive = true;

           return (
             <button 
               key={item} 
               onClick={() => handleNavClick(item)}
               className={`transition-colors hover:text-white ${isActive ? 'text-white font-bold' : 'text-zinc-400'}`}
             >
               {item}
             </button>
           );
         })}
      </nav>

      {/* Mobile Navigation Toggle */}
      <button 
        className="md:hidden absolute top-6 right-6 z-[60] mix-blend-difference text-white"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col gap-8 text-lg font-mono tracking-widest uppercase items-center">
              {['HOME', 'EXPERIENCE', 'PROJECTS', 'GALLERY', 'CONTACT'].map((item) => {
                let isActive = false;
                if (item === 'HOME' && activePage === 'INDEX') isActive = true;
                if (item === 'EXPERIENCE' && activePage === 'EXPERIENCE') isActive = true;
                if (item === 'PROJECTS' && activePage === 'PROJECTS') isActive = true;
                if (item === 'GALLERY' && activePage === 'GALLERY') isActive = true;
                if (item === 'CONTACT' && activePage === 'NETWORK') isActive = true;

                return (
                  <button 
                    key={item} 
                    onClick={() => handleNavClick(item)}
                    className={`transition-colors hover:text-white ${isActive ? 'text-white font-bold' : 'text-zinc-400'}`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {activePage === 'INDEX' && (
          <motion.div
            key="index-page"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between items-center"
          >
            <div className="absolute inset-0 w-full h-full z-0 opacity-10 pointer-events-none">
              <LineWaves
                speed={0.5}
                innerLineCount={20}
                outerLineCount={24}
                warpIntensity={0.8}
                rotation={-45}
                edgeFadeWidth={0.2}
                colorCycleSpeed={0.5}
                brightness={0.3}
                enableMouseInteraction={false}
                mouseInfluence={0.0}
              />
            </div>
            <div className="flex-1 flex flex-col justify-end w-full pb-12 pointer-events-none relative z-10 px-6">
              <div className="flex flex-col items-center justify-center w-full z-10">
                <h1 
                  className="font-sans text-5xl sm:text-6xl md:text-[6.5vw] font-extrabold tracking-tight md:tracking-[-0.04em] uppercase leading-none select-none text-center m-0 pointer-events-auto group relative w-fit mx-auto"
                >
                  Shantanu <span className="italic font-light">Joshi</span>
                  <div className="absolute left-1/2 -top-16 -translate-x-1/2 px-4 py-2.5 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 text-zinc-300 text-xs sm:text-sm font-sans font-semibold tracking-wide rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap z-50 shadow-2xl normal-case">
                    Do you know the code?
                  </div>
                </h1>
                <p className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest md:tracking-[0.25em] mt-6 md:mt-8 text-zinc-400 m-0 text-center px-4">
                  Frontend Architect / Technical Writer / Operations Manager
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end w-full pb-24 md:pb-32">
              <ScrollVelocity
                texts={[topRow, bottomRow]}
                velocity={50}
                numCopies={4}
              />
            </div>
            
          </motion.div>
        )}

        {activePage === 'EXPERIENCE' && (
          <ExperiencePage 
            onBack={() => navigateTo('INDEX')} 
            onNext={() => navigateTo('PROJECTS')}
          />
        )}

        {activePage === 'PROJECTS' && (
          <ProjectsPage onBack={() => navigateTo('EXPERIENCE')} onNext={() => navigateTo('GALLERY')} />
        )}

        {activePage === 'GALLERY' && (
          <GalleryPage onBack={() => navigateTo('PROJECTS')} onNext={() => navigateTo('NETWORK')} />
        )}

        {activePage === 'NETWORK' && (
          <NetworkPage onBack={() => navigateTo('GALLERY')} />
        )}

      </AnimatePresence>
    </div>
  );
}

function ExperiencePage({ onBack, onNext }: { onBack: () => void, onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const workItems = TIMELINE_DATA.filter(item => item.category === 'work');
  const educationItems = TIMELINE_DATA.filter(item => item.category === 'education');
  const certificationItems = TIMELINE_DATA.filter(item => item.category === 'certification');
  const volunteeringItems = TIMELINE_DATA.filter(item => item.category === 'volunteering');

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current) {
        if (containerRef.current.scrollTop <= 0 && e.deltaY < -30) {
          onBack();
        }
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && e.deltaY > 30) {
          onNext();
        }
      }
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current) {
        const touchEndY = e.touches[0].clientY;
        if (containerRef.current.scrollTop <= 0 && touchEndY - touchStartY > 30) { 
          onBack();
        }
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && touchStartY - touchEndY > 30) {
          onNext();
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onBack, onNext]);

  const workRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: workScroll } = useScroll({
    target: workRef,
    container: containerRef,
    offset: ["start center", "end end"]
  });
  const { scrollYProgress: eduScroll } = useScroll({
    target: eduRef,
    container: containerRef,
    offset: ["start center", "end end"]
  });
  const { scrollYProgress: certScroll } = useScroll({
    target: certRef,
    container: containerRef,
    offset: ["start center", "end end"]
  });
  const { scrollYProgress: volScroll } = useScroll({
    target: volRef,
    container: containerRef,
    offset: ["start center", "end end"]
  });

  const smoothWork = useSpring(workScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothEdu = useSpring(eduScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothCert = useSpring(certScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothVol = useSpring(volScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      key="experience-page"
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full overflow-y-auto"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <DarkVeil 
          hueShift={0}
          noiseIntensity={0.08}
          scanlineIntensity={0.3}
          speed={0.3}
          scanlineFrequency={800}
          warpAmount={1.2}
          resolutionScale={1}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 md:px-20 py-32 flex flex-col justify-start min-h-[101vh] relative z-20">

        <header className="mb-24 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-[6vw] md:text-[5vw] font-extrabold uppercase tracking-tighter leading-none select-none">
              TIMELINE
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 pb-1 md:pb-3">
            <p className="text-sm md:text-base leading-relaxed text-zinc-400">
              A timeline of my work in frontend engineering, event operations, and community building.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-24">
          {/* WORK EXPERIENCE */}
          {workItems.length > 0 && (
            <div>
              <div className="pl-16 md:pl-28 pb-6">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-100 border-b border-zinc-800/80 pb-3 mb-6">
                  Work Experience
                </h3>
              </div>
              
              <div className="relative" ref={workRef}>
                <div className="absolute top-[54px] bottom-[150px] left-[22.5px] md:left-[38.5px] w-[2px] bg-zinc-800 rounded-full" />
                <motion.div 
                  className="absolute top-[54px] bottom-[150px] left-[22px] md:left-[38px] w-[3px] bg-white rounded-full origin-top z-10"
                  style={{ 
                    scaleY: smoothWork,
                    boxShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 40px rgba(255, 255, 255, 0.5)"
                  }}
                />

                <div className="flex flex-col">
                  {workItems.map((item, index) => (
                    <TimelineItemNode 
                      key={item.id} 
                      item={item} 
                      progress={smoothWork} 
                      index={index} 
                      total={workItems.length} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {educationItems.length > 0 && (
            <div>
              <div className="pl-16 md:pl-28 pb-6">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-100 border-b border-zinc-800/80 pb-3 mb-6">
                  Education
                </h3>
              </div>
              
              <div className="relative" ref={eduRef}>
                <div className="absolute top-[54px] bottom-[150px] left-[22.5px] md:left-[38.5px] w-[2px] bg-zinc-800 rounded-full" />
                <motion.div 
                  className="absolute top-[54px] bottom-[150px] left-[22px] md:left-[38px] w-[3px] bg-white rounded-full origin-top z-10"
                  style={{ 
                    scaleY: smoothEdu,
                    boxShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 40px rgba(255, 255, 255, 0.5)"
                  }}
                />

                <div className="flex flex-col">
                  {educationItems.map((item, index) => (
                    <TimelineItemNode 
                      key={item.id} 
                      item={item} 
                      progress={smoothEdu} 
                      index={index} 
                      total={educationItems.length} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LICENSES & CERTIFICATIONS */}
          {certificationItems.length > 0 && (
            <div>
              <div className="pl-16 md:pl-28 pb-6">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-100 border-b border-zinc-800/80 pb-3 mb-6">
                  Licenses & Certifications
                </h3>
              </div>
              
              <div className="relative" ref={certRef}>
                <div className="absolute top-[54px] bottom-[150px] left-[22.5px] md:left-[38.5px] w-[2px] bg-zinc-800 rounded-full" />
                <motion.div 
                  className="absolute top-[54px] bottom-[150px] left-[22px] md:left-[38px] w-[3px] bg-white rounded-full origin-top z-10"
                  style={{ 
                    scaleY: smoothCert,
                    boxShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 40px rgba(255, 255, 255, 0.5)"
                  }}
                />

                <div className="flex flex-col">
                  {certificationItems.map((item, index) => (
                    <TimelineItemNode 
                      key={item.id} 
                      item={item} 
                      progress={smoothCert} 
                      index={index} 
                      total={certificationItems.length} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VOLUNTEERING */}
          {volunteeringItems.length > 0 && (
            <div>
              <div className="pl-16 md:pl-28 pb-6">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-100 border-b border-zinc-800/80 pb-3 mb-6">
                  Volunteering at Organizations
                </h3>
              </div>
              
              <div className="relative" ref={volRef}>
                <div className="absolute top-[54px] bottom-[150px] left-[22.5px] md:left-[38.5px] w-[2px] bg-zinc-800 rounded-full" />
                <motion.div 
                  className="absolute top-[54px] bottom-[150px] left-[22px] md:left-[38px] w-[3px] bg-white rounded-full origin-top z-10"
                  style={{ 
                    scaleY: smoothVol,
                    boxShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 40px rgba(255, 255, 255, 0.5)"
                  }}
                />

                <div className="flex flex-col">
                  {volunteeringItems.map((item, index) => (
                    <TimelineItemNode 
                      key={item.id} 
                      item={item} 
                      progress={smoothVol} 
                      index={index} 
                      total={volunteeringItems.length} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItemNode({ item, progress, index, total }: any) {
  const activationThreshold = (index + 0.2) / Math.max(1, total);
  const isActive = useTransform(progress, (v: number) => v >= activationThreshold);
  const [lit, setLit] = useState(isActive.get());

  useEffect(() => {
    const unsubscribe = isActive.on("change", (latest) => setLit(latest));
    return () => unsubscribe();
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pl-16 md:pl-28 py-12 group transition-colors duration-300"
    >
      <div 
        className={`absolute left-[16px] md:left-[32px] top-[54px] w-[15px] h-[15px] rounded-full z-20 transition-all duration-300 ${
          lit 
            ? 'bg-white shadow-[0_0_10px_#fff,0_0_20px_#fff] scale-125' 
            : 'bg-[#131313] border-2 border-zinc-800'
        }`} 
      />

      <div className="grid grid-cols-12 gap-4 border-b border-zinc-800/50 pb-12 group-hover:border-zinc-600 transition-colors">
        <div className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-wider flex items-start pt-1 transition-colors duration-300" style={{ color: lit ? '#fff' : '#71717a' }}>
          <span>{item.period}</span>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h3 className={`font-bold tracking-tight text-xl md:text-3xl font-sans transition-colors duration-500 ${lit ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-zinc-400'}`}>
              {item.company}
            </h3>
            <span className={`font-sans text-xs tracking-widest uppercase font-bold mt-2 md:mt-0 transition-colors duration-300 ${lit ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {item.role}
            </span>
          </div>
          
          <p className={`leading-relaxed max-w-4xl font-mono text-sm transition-colors duration-500 mb-8 ${lit ? 'text-zinc-300' : 'text-zinc-500'}`}>
            {item.details}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {item.stack.map((tech: string) => (
              <span 
                key={tech} 
                className={`border font-sans text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 transition-colors duration-300 ${
                  lit 
                    ? 'border-zinc-500 text-zinc-300 bg-zinc-900 shadow-[0_0_10px_rgba(255,255,255,0.05)]' 
                    : 'border-zinc-800 text-zinc-600 bg-transparent'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsPage({ onBack, onNext }: { onBack: () => void, onNext: () => void }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (pageRef.current) {
        if (pageRef.current.scrollTop <= 0 && e.deltaY < -30) {
          onBack();
        }
        const { scrollTop, scrollHeight, clientHeight } = pageRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && e.deltaY > 30) {
          onNext();
        }
      }
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (pageRef.current) {
        const touchEndY = e.touches[0].clientY;
        if (pageRef.current.scrollTop <= 0 && touchEndY - touchStartY > 30) { 
          onBack();
        }
        const { scrollTop, scrollHeight, clientHeight } = pageRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && touchStartY - touchEndY > 30) {
          onNext();
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onBack, onNext]);

  return (
    <motion.div
      key="projects-page"
      ref={pageRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#131313] scroll-smooth"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <PlasmaWave
          colors={['#27272a', '#18181b']}
          speed1={0.03}
          speed2={0.03}
          focalLength={2.5}
          bend1={1}
          bend2={0.5}
          dir2={1.0}
          rotationDeg={0}
        />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-32 pb-16 flex flex-col snap-start shrink-0 relative z-10">
        <header className="mb-8 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-[6vw] md:text-[5vw] font-extrabold uppercase tracking-tighter leading-none select-none text-white">
              SELECTED WORKS
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 pb-1 md:pb-3">
            <p className="text-sm md:text-base leading-relaxed text-zinc-400">
              A few frontend projects and web apps I've designed and built.
            </p>
          </div>
        </header>
        <div className="w-full h-[1px] bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_rgba(255,255,255,0.5)] opacity-20" />
      </div>

      <div className="w-full flex flex-col">
        {PROJECTS_DATA.map((proj, idx) => (
          <ProjectCard 
            key={proj.id} 
            project={proj} 
            isFirstProject={idx === 0}
            scrollContainer={pageRef}
          />
        ))}

      </div>
    </motion.div>
  );
}

function GalleryPage({ onBack, onNext }: { onBack: () => void, onNext: () => void }) {
  const pageRef = useRef<any>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const wrapper = pageRef.current?.wrapper;
      if (wrapper) {
        if (wrapper.scrollTop <= 0 && e.deltaY < -30) {
          onBack();
        }
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        if (scrollTop + clientHeight >= scrollHeight - 5 && e.deltaY > 30) {
          onNext();
        }
      }
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const wrapper = pageRef.current?.wrapper;
      if (wrapper) {
        const touchEndY = e.touches[0].clientY;
        if (wrapper.scrollTop <= 0 && touchEndY - touchStartY > 30) { 
          onBack();
        }
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        if (scrollTop + clientHeight >= scrollHeight - 5 && touchStartY - touchEndY > 30) {
          onNext();
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onBack, onNext]);

  return (
    <motion.div
      key="gallery-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full"
    >
      <ReactLenis ref={pageRef} className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#131313]" options={{ smoothTouch: true }}>
      <div className="w-full bg-[#131313] min-h-[100vh] snap-start flex flex-col relative z-20 overflow-hidden">
        
        <div className="fixed inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
          <MagnetLines 
            rows={15} 
            columns={typeof window !== 'undefined' && window.innerWidth > 768 ? 25 : 10} 
            containerSize="120%" 
            lineColor="rgba(255,255,255,0.4)" 
            lineWidth="2px"
            lineHeight="4vh"
            baseAngle={-20}
          />
        </div>

        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 pt-32 pb-16 flex flex-col gap-12 md:gap-16 relative z-10">
          
          <header className="flex flex-col">
            <h2 className="text-[6vw] md:text-[5vw] font-extrabold uppercase tracking-tighter leading-none select-none text-white">
              GALLERY
            </h2>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6 w-full">
            {JOURNAL_DATA.map((post, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.6, delay: (idx % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{ contentVisibility: 'auto', containIntrinsicSize: '400px' }}
                className="w-full aspect-square rounded-xl overflow-hidden group cursor-pointer relative border border-zinc-900 bg-[#1a1a1a] snap-start scroll-mt-32"
              >
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 z-0"
                  />
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      </ReactLenis>
    </motion.div>
  );
}

function ProjectCard({ project, scrollContainer, isFirstProject }: { project: ProjectItem, scrollContainer: React.RefObject<HTMLDivElement>, isFirstProject: boolean, key?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const total = project.screenshots.length;
  const baseSteps = Math.max(1, total - 1);
  const effectiveSteps = isFirstProject ? baseSteps + 1 : baseSteps;
  
  // Restore scroll distance to 100vh because snap-mandatory handles the lock
  const stepHeight = 100; // 100vh per slide
  const containerHeightSvh = (effectiveSteps * stepHeight) + 100;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  const logicalSegmentMV = useTransform(smoothProgress, (p) => {
    const rawSteps = p * effectiveSteps;
    return isFirstProject ? Math.max(0, rawSteps - 1) : rawSteps;
  });

  const x = useTransform(logicalSegmentMV, (segment) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    if (isMobile) {
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
      const paddingPixels = 48; // 3rem (px-6 on both sides)
      const imageWidthPixels = screenWidth - paddingPixels;
      const gapPixels = screenWidth * 0.04; // 4vw gap
      const stepPixels = imageWidthPixels + gapPixels;
      
      const prevIndex = Math.floor(segment);
      const progress = segment - prevIndex;
      const startX = -prevIndex * stepPixels;
      const targetX = -(prevIndex + 1) * stepPixels;
      
      return `${startX + (targetX - startX) * progress}px`;
    } else {
      const itemWidth = 45;
      const gap = 4; // 4vw
      const centerOffset = 8; 
      
      const prevIndex = Math.floor(segment);
      const progress = segment - prevIndex;
      const startX = centerOffset - prevIndex * (itemWidth + gap);
      const targetX = centerOffset - (prevIndex + 1) * (itemWidth + gap);
      
      return `${startX + (targetX - startX) * progress}vw`;
    }
  });

  const snapAnchors = Array.from({ length: effectiveSteps + 1 });

  return (
    <div ref={containerRef} className="w-full relative border-b border-zinc-900" style={{ height: `${containerHeightSvh}svh` }}>
      
      {/* Snap anchors to guide the scroll physics overlaying the sticky space */}
      <div className="absolute inset-0 w-full flex flex-col pointer-events-none z-0">
        {snapAnchors.map((_, i) => (
          <div key={i} className="w-full snap-start" style={{ height: `${stepHeight}svh` }} />
        ))}
      </div>

      {/* Sticky visual container in normal flow */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col lg:flex-row gap-6 lg:gap-12 px-6 md:px-20 pt-20 lg:pt-32 pb-12 lg:pb-32 bg-transparent z-10 pointer-events-auto">
        
        {/* Left Column: Info & Links (Static) */}
        <div className="w-full lg:w-1/4 flex flex-col shrink-0 relative z-20 lg:pr-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter text-white">
            {project.title}
          </h2>
          <p className="text-zinc-400 mt-4 text-xs md:text-sm leading-relaxed font-mono max-w-[250px]">
            {project.description}
          </p>

          {project.repoUrl && (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 w-fit px-6 py-2.5 rounded-full hover:bg-zinc-900"
            >
              <span>Repository</span>
              <span className="text-base leading-none">↗</span>
            </a>
          )}
        </div>

        {/* Right Column: Scroll-Hijacked Horizontal Carousel */}
        <div className="w-full lg:w-3/4 h-full flex items-center lg:items-end pt-8 lg:pt-0">
          <motion.div 
            className="flex w-max items-center"
            style={{ x, gap: '4vw' }}
          >
            {project.screenshots.map((src, i) => (
              <ScreenshotItem 
                key={i} 
                src={src} 
                index={i} 
                logicalSegmentMV={logicalSegmentMV} 
                projectTitle={project.title} 
              />
            ))}
            </motion.div>
          </div>
          
        </div>

    </div>
  );
}

function ScreenshotItem({ src, index, logicalSegmentMV, projectTitle }: { src: string, index: number, logicalSegmentMV: any, projectTitle: string, key?: any }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const range = [index - 1, index, index + 1];
  
  const scale = useTransform(logicalSegmentMV, range, isMobile ? [0.95, 1.0, 0.95] : [0.85, 1.45, 0.85]);
  const opacity = useTransform(logicalSegmentMV, range, isMobile ? [0.5, 1, 0.5] : [0.2, 1, 0.2]);
  const filter = useTransform(logicalSegmentMV, range, isMobile ? ["none", "none", "none"] : ["blur(8px)", "blur(0px)", "blur(8px)"]);
  const zIndex = useTransform(logicalSegmentMV, range, [10, 100, 10]);

  return (
    <motion.div 
      style={{ scale, opacity, filter, zIndex }}
      className="w-[calc(100vw-3rem)] lg:w-[45vw] aspect-video shrink-0 rounded-xl overflow-hidden border border-zinc-800 shadow-xl md:shadow-[0_0_40px_rgba(0,0,0,0.5)] relative origin-center"
    >
      <img 
        src={src} 
        alt={`${projectTitle} screenshot ${index+1}`} 
        className="w-full h-full object-cover" 
      />
    </motion.div>
  );
}

function NetworkPage({ onBack }: { onBack: () => void }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const wrapper = lenisRef.current?.wrapper;
      if (wrapper) {
        if (wrapper.scrollTop <= 0 && e.deltaY < -30) {
          onBack();
        }
      }
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const wrapper = lenisRef.current?.wrapper;
      if (wrapper) {
        const touchEndY = e.touches[0].clientY;
        if (wrapper.scrollTop <= 0 && touchEndY - touchStartY > 30) { 
          onBack();
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onBack]);

  return (
    <motion.div
      key="network-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full"
    >
      <ReactLenis ref={lenisRef} className="absolute inset-0 w-full h-full overflow-y-auto" options={{ smoothTouch: true }}>
      <div className="fixed inset-0 z-0 opacity-40">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[5, 8, 10]}
          lineDistance={[8, 6, 4]}
          linesGradient={['#a1a1aa', '#52525b', '#27272a']}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={false}
          parallax={false}
          mixBlendMode="normal"
        />
      </div>

      <div className="w-full flex flex-col relative z-20 min-h-screen pointer-events-none">
        
        {/* Links Section */}
        <div 
          className="w-full flex-1 flex flex-col justify-center py-24 md:py-32"
        >
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16 justify-center h-full">
          <header className="flex flex-col">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white pointer-events-auto w-fit">
              NETWORK
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full pointer-events-auto">
            {LINKS_DATA.map((link) => {
              const IconComponent = IconMap[link.icon as keyof typeof IconMap];
              return (
                <LinkItem key={link.id} link={link} IconComponent={IconComponent} />
              );
            })}
          </div>
        </div>
      </div>

      {/* The Footer Section */}
      <div className="w-full min-h-[100px] bg-[#000000] border-t border-zinc-800 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 py-6 md:py-0 gap-4 md:gap-0 z-10 relative pointer-events-auto">
        <div className="w-full md:flex-1 flex justify-center md:justify-start">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-none flex items-center md:h-full md:pt-4" style={{ fontFamily: '"Marck Script", cursive' }}>
            <SignatureAnimation duration={1} delay={0.2}>Shantanu Joshi</SignatureAnimation>
          </h2>
        </div>
        
        <div className="w-full md:flex-1 flex justify-center text-zinc-500 font-mono text-[10px] md:text-xs tracking-widest uppercase items-center">
          <div className="relative group flex items-center">
            <span className="opacity-0 hover:opacity-20 transition-opacity duration-500 cursor-default select-none">THE KONAMI CODE</span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2.5 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-sans font-semibold tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap z-50 shadow-2xl">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
          </div>
        </div>

        <div className="w-full md:flex-1 flex justify-center md:justify-end text-zinc-500 font-mono text-[10px] md:text-xs tracking-widest uppercase items-center">
          <span>© 2026 ALL RIGHTS RESERVED</span>
        </div>
      </div>
      
      </div>
      </ReactLenis>
    </motion.div>
  );
}

function LinkItem({ link, IconComponent }: { link: any, IconComponent: any, key?: any }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (link.copyText) {
      if (link.id === 'phone') {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
          e.preventDefault();
          navigator.clipboard.writeText(link.copyText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } else {
        e.preventDefault();
        navigator.clipboard.writeText(link.copyText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <a 
      href={link.url}
      onClick={handleClick}
      target={link.url.startsWith('http') ? '_blank' : undefined}
      rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
      className="group relative w-full border border-zinc-900/50 bg-[#1a1a1a]/80 hover:bg-zinc-900/90 transition-colors duration-300 rounded-xl overflow-hidden p-6 md:p-8 flex items-center justify-between"
    >
      <div className="flex items-center gap-6">
        {IconComponent && (
          <IconComponent className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors duration-300" />
        )}
        <span className="text-lg md:text-xl font-extrabold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors duration-300">
          {copied ? 'COPIED!' : link.label}
        </span>
      </div>
      
      <span className="text-zinc-700 group-hover:text-zinc-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 font-mono text-xl">
        {copied ? '✓' : '↗'}
      </span>
    </a>
  );
}
