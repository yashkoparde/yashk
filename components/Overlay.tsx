"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import React from "react";

interface SectionProps {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "full";
  position?: "center" | "bottom";
}

function Section({ scrollYProgress, start, end, children, align = "center", position = "center" }: SectionProps) {
  const buffer = 0.01; 
  const in0 = Math.max(0, start - buffer);
  const in1 = Math.max(0.001, start);
  const in2 = Math.min(0.999, end - buffer);
  const in3 = Math.min(1, end);

  let inputMap = [in0, in1, in2, in3];
  let opacityOutput = [0, 1, 1, 0];
  let yOutput = [40, 0, 0, -40];

  if (end === 1.0) {
    inputMap = [in0, in1, 1];
    opacityOutput = [0, 1, 1];
    yOutput = [40, 0, 0];
  }

  const opacity = useTransform(scrollYProgress, inputMap, opacityOutput);
  // Safely toggles interaction without breaking Framer's strictly numerical interpolation engine
  const pointerEvents = useTransform(scrollYProgress, (v) => {
    return (v >= in1 && v <= in3) ? "auto" : "none";
  });
  const y = useTransform(scrollYProgress, inputMap, yOutput);

  let alignClasses = "";
  if (align === "left") alignClasses = "items-start text-left px-4 md:pl-10 lg:pl-[6vw] xl:pl-[10vw]";
  if (align === "right") alignClasses = "items-end text-right px-4 md:pr-10 lg:pr-[6vw] xl:pr-[10vw]";
  if (align === "center") alignClasses = "items-center text-center px-4";
  if (align === "full") alignClasses = "items-center text-left px-4 md:px-[5vw] w-full"; 

  let posClasses = "justify-center";
  if (position === "bottom") posClasses = "justify-end pb-[8vh]"; 

  let widthClass = `w-full ${align === 'center' ? 'max-w-4xl' : 'max-w-[95vw] md:max-w-[45vw] xl:max-w-[40vw]'}`;
  if (align === "full") widthClass = "w-full max-w-[95vw] xl:max-w-[90vw]";

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={`absolute inset-0 flex h-full w-full flex-col ${alignClasses} ${posClasses}`}
    >
      <div className={widthClass}>
        {children}
      </div>
    </motion.div>
  );
}

// Full-Span Bento Grid for Skills
function SkillBento() {
  const skills = [
     { title: "Frontend Engineering", desc: "Developing responsive and performant user interfaces with Next.js, React, and Tailwind CSS.", tag: "Frontend" },
     { title: "Backend Systems", desc: "Designing server-side applications, REST APIs, and WebSockets using Node.js, NestJS, and Flask.", tag: "Backend" },
     { title: "Mobile & AI/ML", desc: "Building cross-platform mobile apps with Flutter, and implementing AI prototypes with Python and PyTorch.", tag: "Mobile/AI" },
     { title: "DevOps & Cloud", desc: "Deploying applications with Docker, Nginx pipelines, and exploring cloud infrastructures like AWS.", tag: "DevOps" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pointer-events-auto">
      {skills.map((s, i) => (
        <div key={i} className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a]/50 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] text-left hover:-translate-y-3 h-full flex flex-col justify-between">
           <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/10 blur-[50px] rounded-full group-hover:bg-white/20 transition-colors duration-700 pointer-events-none" />
           <div>
             <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 block mb-6">{s.tag}</span>
             <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-4 relative z-10">{s.title}</h3>
           </div>
           <p className="font-sans text-sm md:text-base text-white/50 font-light leading-relaxed relative z-10 border-t border-white/10 pt-4 mt-4">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Full-Span Bento Grid for Leadership & Experience
function LeadershipBento() {
  const leadership = [
    { title: "GDGoC Campus Tech Lead", desc: "Serving as Tech Lead for Google Developer Groups on Campus VTU Belagavi, organizing technical workshops and developer events.", tag: "Tech Community" },
    { title: "Student Freelance Team", desc: "Freelanced while leading a team of 10 students, delivering production-grade web solutions and generating six-figure revenue.", tag: "Founder & Lead" },
    { title: "Campus Representation", desc: "IIT Bombay E-Cell Campus Representative and Open Source Connect (OSCG) Campus Lead, driving tech adoption and entrepreneurship.", tag: "Advocacy" },
    { title: "Community Admin & Coordinator", desc: "Class Representative (CR) managing student affairs, and Admin of a university-wide student WhatsApp community.", tag: "Leadership" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pointer-events-auto">
      {leadership.map((s, i) => (
        <div key={i} className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a]/50 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] text-left hover:-translate-y-3 h-full flex flex-col justify-between">
           <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/10 blur-[50px] rounded-full group-hover:bg-white/20 transition-colors duration-700 pointer-events-none" />
           <div>
             <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 block mb-6">{s.tag}</span>
             <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-4 relative z-10">{s.title}</h3>
           </div>
           <p className="font-sans text-sm md:text-base text-white/50 font-light leading-relaxed relative z-10 border-t border-white/10 pt-4 mt-4">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Full-Span Bento Grid for Achievements & Hackathons
function AchievementsBento() {
  const achievements = [
    { title: "Sleepless Saga 3.0 Hackathon", desc: "Secured 2nd Runner-Up Overall at the IIT Dharwad and GM Institute of Technology Hackathon.", tag: "2nd Runner-Up" },
    { title: "Sustainenergy Hackathon", desc: "Secured Runner-Up Overall at Sustainenergy-SMVT, Bengaluru, building sustainable engineering solutions.", tag: "Runner-Up" },
    { title: "Competitive Programming", desc: "Competed in ICPC-style programming contests, including participation at NIT Silchar.", tag: "CP Competitor" },
    { title: "12+ Hackathons", desc: "Participated in more than 12 university and national hackathons with a focus on real-world engineering.", tag: "Hackathons" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pointer-events-auto">
      {achievements.map((s, i) => (
        <div key={i} className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a]/50 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] text-left hover:-translate-y-3 h-full flex flex-col justify-between">
           <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/10 blur-[50px] rounded-full group-hover:bg-white/20 transition-colors duration-700 pointer-events-none" />
           <div>
             <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 block mb-6">{s.tag}</span>
             <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-4 relative z-10">{s.title}</h3>
           </div>
           <p className="font-sans text-sm md:text-base text-white/50 font-light leading-relaxed relative z-10 border-t border-white/10 pt-4 mt-4">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

// The Premium Awwwards Project Box
function ProjectBox({ subtitle, title, details, tech, link }: { subtitle: string; title: string; details: string; tech: string; link: string; }) {
  const isExternal = link !== "#" && !link.startsWith("#");
  
  return (
    <div className="relative flex flex-col justify-center min-h-[60vh] md:min-h-screen w-full pointer-events-auto group px-2 md:px-0">
      <div className="relative w-full p-8 md:p-14 rounded-[2.5rem] bg-[#050505]/60 backdrop-blur-3xl border border-white/10 overflow-hidden transition-all duration-700 hover:border-white/30 hover:bg-[#0a0a0a]/80 shadow-[0_30px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:-translate-y-3">
        
        {/* Abstract Box Glow */}
        <div className="absolute top-0 right-0 w-[50vw] md:w-[30vw] h-[50vh] bg-gradient-to-bl from-white/10 via-white/5 to-transparent blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="flex flex-col gap-6 md:gap-8 relative z-10 text-left">
          <div className="flex items-center justify-start gap-4">
            <div className="h-[1px] w-8 md:w-16 bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
            <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-colors duration-500">{subtitle}</span>
          </div>
          
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-[1.0] group-hover:from-white group-hover:to-white transition-all duration-700">
            {title}
          </h2>
          
          <p className="font-sans text-white/60 text-[clamp(0.9rem,1.3vw,1.1rem)] font-light leading-relaxed border-l border-white/10 pl-6 group-hover:border-white/40 transition-colors duration-700 group-hover:text-white/80">
            {details}
          </p>
          
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-6 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-1 items-start">
              <span className="font-sans text-[9px] tracking-widest uppercase text-white/40">TECH STACK</span>
              <span className="font-sans text-xs md:text-sm tracking-[0.2em] font-medium text-white/80">{tech}</span>
            </div>
            
            <a 
              href={link} 
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between px-6 py-3 w-fit md:ml-auto group/btn bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full transition-all duration-500 cursor-pointer pointer-events-auto"
            >
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/70 group-hover/btn:text-white transition-colors duration-500 mr-4">
                {isExternal ? "See Live Project" : "Explore Project"}
              </span>
              <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover/btn:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <span className="text-xl -rotate-45 group-hover/btn:rotate-0 transition-transform duration-500">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-[200] pointer-events-none">
      
      {/* 0.08 - 0.14: Identity / About */}
      <Section scrollYProgress={scrollYProgress} start={0.08} end={0.14} align="left">
        <div className="flex flex-col gap-6 pointer-events-auto p-10 bg-[#050505]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-[#0a0a0a]/80 hover:border-white/20 transition-all duration-700">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/50">Yash Koparde</span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-[1.0] drop-shadow-2xl">
            Building Scalable Platforms & Tech Communities.
          </h2>
          <p className="font-sans text-[clamp(0.95rem,1.4vw,1.05rem)] font-light text-white/70 leading-relaxed mt-2">
            I am a Computer Science undergraduate at VTU Belagavi, a student founder, and a tech lead. I focus on building scalable web ecosystems, organizing developer initiatives, and leading student engineering teams to deliver high-quality freelance solutions.
          </p>

          <div className="mt-4">
            <a href="https://linkedin.com/in/yashkoparde" target="_blank" rel="noopener noreferrer" className="w-fit flex items-center gap-4 border border-white/20 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/50 px-6 py-3 rounded-full transition-all duration-500 font-sans text-[10px] tracking-widest uppercase cursor-pointer">
              <span>Connect on LinkedIn</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </Section>

      {/* 0.16 - 0.23: The Core Stack */}
      <Section scrollYProgress={scrollYProgress} start={0.16} end={0.23} align="full" position="bottom">
        <div className="flex flex-col gap-8 w-full pointer-events-auto">
           <div className="flex items-center justify-start gap-4 mb-2">
             <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 pl-2">The Core Stack</span>
             <div className="h-[1px] w-[50vw] bg-white/10" />
           </div>
           <SkillBento />
        </div>
      </Section>

      {/* 0.25 - 0.34: Experience & Leadership */}
      <Section scrollYProgress={scrollYProgress} start={0.25} end={0.34} align="full" position="bottom">
        <div className="flex flex-col gap-8 w-full pointer-events-auto">
           <div className="flex items-center justify-start gap-4 mb-2">
             <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 pl-2">Leadership & Experience</span>
             <div className="h-[1px] w-[50vw] bg-white/10" />
           </div>
           <LeadershipBento />
        </div>
      </Section>

      {/* 0.37 - 0.44: Projects - Wheyo */}
      <Section scrollYProgress={scrollYProgress} start={0.37} end={0.44} align="left">
        <ProjectBox 
          subtitle="Deployment 001 / Founder Product" 
          title="Wheyo" 
          details="A managed cloud kitchen operating system and marketplace built to help food entrepreneurs launch and operate digital kitchens without traditional restaurant overhead. Rather than a SaaS model, it manages end-to-end onboarding, order processing, and operations." 
          tech="Next.js / React / Node.js / Vercel" 
          link="https://wheyo.vercel.app" 
        />
      </Section>

      {/* 0.46 - 0.53: Projects - Parakh */}
      {/* TODO: Replace link with specific repository link for Parakh when public */}
      <Section scrollYProgress={scrollYProgress} start={0.46} end={0.53} align="right">
        <ProjectBox 
          subtitle="Deployment 002 / EdTech AI" 
          title="Parakh" 
          details="An AI-powered academic integrity and evaluation platform that assists educators by automating assessment grading, answer-sheet evaluation via OCR, detecting plagiarism, and generating student performance insights." 
          tech="Next.js / OCR / AI APIs" 
          link="https://github.com/yashkoparde" 
        />
      </Section>

      {/* 0.55 - 0.62: Projects - Evidentia */}
      {/* TODO: Replace link with specific repository link for Evidentia when public */}
      <Section scrollYProgress={scrollYProgress} start={0.55} end={0.62} align="left">
        <ProjectBox 
          subtitle="Deployment 003 / AI Information Systems" 
          title="Evidentia" 
          details="A digital evidence collection and verification system. It automates information extraction from unstructured digital documents, tracks chains of custody securely, and streamlines compliance auditing workflows." 
          tech="Next.js / Secure Storage / AI" 
          link="https://github.com/yashkoparde" 
        />
      </Section>

      {/* 0.64 - 0.71: Projects - Pharmix */}
      <Section scrollYProgress={scrollYProgress} start={0.64} end={0.71} align="right">
        <ProjectBox 
          subtitle="Deployment 004 / HealthTech Marketplace" 
          title="Pharmix" 
          details="A B2B digital supply network connecting pharmacies with verified pharmaceutical distributors. It simplifies medicine procurement through real-time stock levels, supplier discovery, and price comparison." 
          tech="Next.js / Inventory / Supplier Network" 
          link="https://pharmix.app/" 
        />
      </Section>

      {/* 0.73 - 0.80: Projects - HeHo */}
      <Section scrollYProgress={scrollYProgress} start={0.73} end={0.80} align="left">
        <ProjectBox 
          subtitle="Deployment 005 / AI Infrastructure" 
          title="HeHo" 
          details="A no-code AI backend orchestrator connecting AI agents directly to databases. It automates data operations and CRUD workflows, auto-generates REST APIs, and implements granular permission controls." 
          tech="AI Agents / Supabase / REST APIs" 
          link="https://heho.vercel.app/" 
        />
      </Section>

      {/* 0.83 - 0.90: Achievements & Hackathons */}
      <Section scrollYProgress={scrollYProgress} start={0.83} end={0.90} align="full" position="bottom">
        <div className="flex flex-col gap-8 w-full pointer-events-auto">
           <div className="flex items-center justify-start gap-4 mb-2">
             <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 pl-2">Achievements & Hackathons</span>
             <div className="h-[1px] w-[50vw] bg-white/10" />
           </div>
           <AchievementsBento />
        </div>
      </Section>

      {/* 0.91 - 0.94: View All Dedicated Card */}
      <Section scrollYProgress={scrollYProgress} start={0.91} end={0.94} align="center">
        <div className="flex flex-col items-center justify-center pointer-events-auto group w-full max-w-2xl bg-[#050505]/70 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-[#0a0a0a] hover:border-white/30 transition-all duration-700 hover:-translate-y-4 mx-auto">
           <div className="h-[1px] w-16 bg-white/20 mb-8 group-hover:bg-white/50 transition-colors duration-500" />
           <h2 className="font-serif text-[clamp(3.5rem,6vw,6rem)] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-10 text-center leading-none group-hover:scale-105 transition-transform duration-700">
             All Projects
           </h2>
           <a href="https://yk-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-white px-8 py-4 rounded-full flex gap-4 items-center justify-center bg-white/5 backdrop-blur-md transition-all duration-500 hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
             <span className="font-sans uppercase text-xs md:text-sm tracking-[0.3em] font-bold text-white whitespace-nowrap">View All Projects</span>
             <span className="text-white text-xl">→</span>
           </a>
        </div>
      </Section>

      {/* 0.96 - 1.0: End sequence */}
      <Section scrollYProgress={scrollYProgress} start={0.96} end={1.0} align="center">
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full pointer-events-auto z-[300]">
          
          <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] md:text-[6rem] lg:text-[8rem] font-bold tracking-tighter text-[#111111] leading-none text-center">
            YASH KOPARDE
          </h1>
          <p className="font-sans text-[#222] text-sm md:text-xl uppercase tracking-[0.5em] mt-4 font-bold">
            Full-Stack Developer & Founder
          </p>

          <div className="absolute bottom-12 md:bottom-20 flex flex-wrap justify-center gap-10 md:gap-20">
            <a href="https://github.com/yashkoparde" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-lg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/yashkoparde" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-lg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="mailto:yashkoparde2022@gmail.com" className="group flex flex-col items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-lg"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
            </a>
          </div>

        </div>
      </Section>

    </div>
  );
}
