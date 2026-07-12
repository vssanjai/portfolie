"use client";

import { motion } from "framer-motion";
import { Terminal, Download, FileText, Shield, Database, Cpu, ShieldAlert, Code, Mail, Send, TerminalSquare, Phone, Award, CheckCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import React from "react";
import VictusMockup from "@/components/VictusMockup";
import TiltCard from "@/components/TiltCard";
import Typewriter from "@/components/Typewriter";
import TerminalExperience from "@/components/TerminalExperience";
import ServerRackMockup from "@/components/ServerRackMockup";
import OperationsLog from "@/components/OperationsLog";
import ThreatLogs from "@/components/ThreatLogs";
import { ThemeToggle } from '@/components/ThemeToggle';
import CyberAvatar from '@/components/CyberAvatar';
import DroneMockup from "@/components/DroneMockup";
import CyberRadarMockup from "@/components/CyberRadarMockup";
import CyberLockMockup from "@/components/CyberLockMockup";
import CRTMonitorMockup from "@/components/CRTMonitorMockup";

// Matrix Rain Effect Component
const MatrixRain = () => {
  const [columns, setColumns] = useState<number>(0);
  useEffect(() => {
    setColumns(Math.floor(window.innerWidth / 20));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-electric-blue font-mono text-[10px] whitespace-pre"
          style={{ left: `${i * 20}px` }}
          initial={{ y: -1000 }}
          animate={{ y: 2000 }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {Array.from({ length: 40 }).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join("\n")}
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  // Stagger variants for advanced text reveal
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative flex flex-col w-full bg-[#020202]">
      
      <MatrixRain />

      {/* 1. HERO SECTION (NORMAL FULL SCREEN LAYOUT) */}
      <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden pt-20 pb-10">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap tracking-tighter z-0">
          SECURITY
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-electric-blue/10 border border-electric-blue rounded-full w-fit text-electric-blue font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(0,122,255,0.4)]">
              <Terminal size={16} />
              <span>B.Tech CSE / Cybersecurity & Internet of Things</span>
            </motion.div>
            
            {/* Clean Hero Title */}
            <motion.div 
              variants={itemVariants} 
              className="relative select-none pointer-events-none z-10"
            >
              <h1 
                className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black italic text-white tracking-tighter leading-[1] whitespace-nowrap"
              >
                BREAKING SYSTEMS<br />
                BEFORE HACKERS DO —<br />
                I'M SANJAY V.S
              </h1>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-gray-400 max-w-lg text-lg sm:text-xl font-light border-l-2 border-electric-blue pl-4 select-none">
              <Typewriter delay={0.5} text="A highly motivated Fresher & Cybersecurity Enthusiast. Eager to secure systems, find vulnerabilities, and build robust web applications." />
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 mb-2">
              <CyberAvatar />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-6">
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#portfolio"
                className="px-8 py-4 bg-electric-blue text-black font-black uppercase tracking-widest rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,122,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] group relative overflow-hidden select-none"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out skew-x-12"></div>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#resume"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest rounded hover:bg-white hover:text-black transition-colors flex items-center gap-2 group select-none"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                View Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Laptop Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="w-full relative py-12 lg:py-0 flex flex-col items-center justify-center"
          >
            <VictusMockup />
          </motion.div>

        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="min-h-screen bg-black/50 py-24 relative z-10 overflow-hidden">
        
        {/* Decorative 3D Background Element */}
        <div className="absolute top-1/2 right-[-10%] md:right-[5%] -translate-y-1/2 opacity-20 pointer-events-none scale-75 md:scale-100 mix-blend-screen blur-[2px] transition-all duration-1000">
          <ServerRackMockup />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              ABOUT <span className="text-electric-blue">ME</span>
            </h2>
            <div className="h-1 w-20 bg-electric-blue box-glow-blue mb-16"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Terminal View */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/50 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm shadow-[0_0_30px_rgba(0,122,255,0.1)] group h-fit"
            >
              <div className="bg-[#1a1b26] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-sm bg-[#f7768e] group-hover:scale-125 transition-transform"></div>
                <div className="w-3 h-3 rounded-sm bg-[#e0af68] group-hover:scale-125 transition-transform delay-75"></div>
                <div className="w-3 h-3 rounded-sm bg-[#9ece6a] group-hover:scale-125 transition-transform delay-150"></div>
                <span className="ml-2 font-mono text-xs text-gray-400">root@kali:~</span>
              </div>
              <TerminalExperience />
            </motion.div>

            {/* Core Capabilities */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8 h-full"
            >
              <h3 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                <Cpu className="text-electric-blue" /> Core Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-4rem)]">
                {[
                  { name: "Cybersecurity & DevOps", icon: <Shield size={24} />, color: "text-[#f7768e]", tags: ["VAPT", "Acunetix", "Networking", "Azure DevOps", "CI/CD Pipelines"] },
                  { name: "Web Development", icon: <Terminal size={24} />, color: "text-[#7aa2f7]", tags: ["React.js", "JavaScript", "ASP.NET MVC", "Node.js", "SQL Server", "MongoDB"] },
                  { name: "IoT & Networking", icon: <Cpu size={24} />, color: "text-[#9ece6a]", tags: ["Arduino", "Raspberry Pi", "Sensors", "Telematics", "Hardware"] },
                  { name: "Data Analysis", icon: <Database size={24} />, color: "text-[#e0af68]", tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau"] },
                ].map((skill, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <TiltCard>
                      <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex flex-col gap-4 hover:border-electric-blue/50 hover:bg-electric-blue/10 transition-all h-full shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className={`${skill.color} group-hover:scale-110 transition-transform flex items-center justify-between`}>
                          {skill.icon}
                        </div>
                        <span className="font-bold text-sm uppercase tracking-wide text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {skill.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-black/50 border border-white/10 rounded text-gray-400 group-hover:text-electric-blue group-hover:border-electric-blue/50 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2.5 EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen py-24 relative z-10 overflow-hidden bg-black/80">
        
        {/* Decorative 3D Background Element */}
        <div className="absolute top-[20%] left-[-10%] md:left-[0%] opacity-20 pointer-events-none scale-75 md:scale-100 mix-blend-screen blur-[2px] transition-all duration-1000">
          <DroneMockup />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
              OPERATIONS <span className="text-electric-blue">LOG</span>
            </h2>
            <div className="h-1 w-20 bg-electric-blue box-glow-blue mb-8"></div>
            <p className="text-gray-400 max-w-2xl text-lg">
              Classified record of past deployments and active missions. Decoding internship history and operational experience.
            </p>
          </motion.div>

          <OperationsLog />

        </div>
      </section>

      {/* 2.75 CERTIFICATIONS SECTION */}
      <section id="certifications" className="min-h-screen py-24 relative z-10 overflow-hidden">
        
        {/* Decorative 3D Background Element */}
        <div className="absolute top-[30%] right-[-10%] md:right-[0%] opacity-20 pointer-events-none scale-75 md:scale-100 mix-blend-screen blur-[2px] transition-all duration-1000">
          <CyberRadarMockup />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
              CREDENTIALS <span className="text-electric-blue">& CERTS</span>
            </h2>
            <div className="h-1 w-20 bg-electric-blue box-glow-blue mb-8"></div>
            <p className="text-gray-400 max-w-2xl text-lg">
              Verified clearance levels and technical certifications obtained through intensive training and simulations.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "CICSA - Certified IT Infrastructure and Cyber SOC Analyst", issuer: "Cybersecurity" },
              { title: "SOC Program - Foundations Training", issuer: "Microsoft" },
              { title: "Forage Cybersecurity Job Simulation", issuer: "Mastercard, Deloitte & Tata" },
              { title: "Introduction to the Dark Web, Anonymity, and Cryptocurrency", issuer: "CodeRed" },
              { title: "Red Team Hacker - Ongoing", issuer: "Cybersecurity" },
              { title: "Certified in Data Visualization", issuer: "Tableau" }
            ].map((cert, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <TiltCard className="h-full">
                  <div className="bg-[#0f1115]/80 border border-gray-800 rounded-xl p-6 flex flex-col h-full hover:border-electric-blue/50 transition-colors group relative overflow-hidden backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="p-3 bg-black/50 border border-gray-700 rounded-lg text-electric-blue group-hover:scale-110 group-hover:border-electric-blue group-hover:bg-electric-blue/10 transition-all shadow-lg shrink-0">
                        <Award size={24} />
                      </div>
                      
                      <div>
                        <div className="text-xs font-black text-gray-500 mb-1 uppercase tracking-widest flex items-center gap-1 group-hover:text-electric-blue transition-colors">
                          <CheckCircle size={12} /> {cert.issuer}
                        </div>
                        <h3 className="text-base font-bold text-gray-300 group-hover:text-white transition-colors leading-snug">{cert.title}</h3>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PORTFOLIO SECTION */}
      <section id="portfolio" className="min-h-screen py-24 relative z-10 overflow-hidden">
        
        {/* Decorative 3D Background Element */}
        <div className="absolute top-[50%] left-[-15%] md:left-[-5%] opacity-15 pointer-events-none scale-75 md:scale-100 mix-blend-screen blur-[2px] transition-all duration-1000 z-0">
          <CRTMonitorMockup />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              THREAT <span className="text-electric-blue">LOGS</span>
            </h2>
            <div className="h-1 w-20 bg-electric-blue box-glow-blue mb-8"></div>
            <p className="text-gray-400 max-w-2xl text-lg">
              Scanning sector for potential vulnerabilities... Multiple projects detected. Analyzing payload data and deployment vectors.
            </p>
          </motion.div>

          <ThreatLogs />
        </div>
      </section>

      {/* 4. RESUME SECTION */}
      <section id="resume" className="min-h-screen bg-black/50 py-24 relative z-10 overflow-hidden">
        
        {/* Decorative 3D Background Element */}
        <div className="absolute top-[30%] right-[-10%] md:right-[-5%] opacity-15 pointer-events-none scale-75 md:scale-100 mix-blend-screen blur-[2px] transition-all duration-1000 z-0">
          <CyberLockMockup />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                MY <span className="text-electric-blue">RESUME</span>
              </h2>
              <div className="h-1 w-20 bg-electric-blue box-glow-blue"></div>
            </div>
            
            <a 
              href="/portfolie/resume.pdf" 
              download="Sanjay_VS_Resume.pdf"
              className="px-6 py-3 bg-electric-blue/10 text-electric-blue border border-electric-blue hover:bg-electric-blue hover:text-black font-bold uppercase tracking-widest transition-all flex justify-center items-center gap-2 rounded group shadow-[0_0_15px_rgba(0,122,255,0.2)]"
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              Download PDF
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full aspect-[1/1.4] md:aspect-[16/10] bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,122,255,0.15)] relative group"
          >
            {/* Cyberpunk Scanline overlay on resume */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,122,255,0.05)_51%,transparent_51%)] bg-[length:100%_4px] z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="w-full h-12 bg-[#1a1b26] border-b border-gray-800 flex items-center px-4 justify-between relative z-20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#f7768e] hover:bg-red-500 cursor-pointer"></div>
                <div className="w-3 h-3 rounded-sm bg-[#e0af68] hover:bg-yellow-500 cursor-pointer"></div>
                <div className="w-3 h-3 rounded-sm bg-[#9ece6a] hover:bg-green-500 cursor-pointer"></div>
              </div>
              <div className="font-mono text-sm text-gray-400 flex items-center gap-2 uppercase tracking-widest">
                <FileText size={16} className="text-electric-blue" /> Sanjay_VS_Resume.pdf
              </div>
              <div className="w-16"></div> 
            </div>
            
            <div className="w-full h-[calc(100%-3rem)] bg-white/5 relative z-0">
              <iframe 
                src="/portfolie/resume.pdf" 
                className="w-full h-full border-none"
                title="Resume PDF Viewer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
              ESTABLISH <span className="text-electric-blue">CONNECTION</span>
            </h2>
            <div className="h-1 w-20 bg-electric-blue box-glow-blue mx-auto mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0f1115] border border-gray-800 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] group h-full flex flex-col"
            >
              <div className="bg-[#1a1b26] px-4 py-3 flex items-center gap-2 border-b border-gray-800 group-hover:border-electric-blue/30 transition-colors">
                <TerminalSquare size={16} className="text-gray-400 group-hover:text-electric-blue transition-colors" />
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">send_payload.sh</span>
              </div>
              
              <form className="p-8 space-y-8 font-mono relative flex-grow flex flex-col justify-center" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-electric-blue text-sm mb-2 uppercase">&gt; Enter Name_</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border-b border-white/20 focus:border-electric-blue outline-none py-3 text-white transition-colors hover:border-white/50 focus:shadow-[0_10px_10px_-10px_rgba(0,122,255,0.5)]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-electric-blue text-sm mb-2 uppercase">&gt; Enter Email_</label>
                  <input 
                    type="email" 
                    className="w-full bg-black border-b border-white/20 focus:border-electric-blue outline-none py-3 text-white transition-colors hover:border-white/50 focus:shadow-[0_10px_10px_-10px_rgba(0,122,255,0.5)]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-electric-blue text-sm mb-2 uppercase">&gt; Enter Message_</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-black border border-white/20 focus:border-electric-blue outline-none p-4 text-white transition-colors mt-2 rounded hover:border-white/50 focus:shadow-[0_0_15px_rgba(0,122,255,0.2)]"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-electric-blue/10 text-electric-blue border border-electric-blue hover:bg-electric-blue hover:text-black font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2 rounded hover:shadow-[0_0_25px_rgba(0,122,255,0.5)] group/btn mt-auto">
                  <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  EXECUTE
                </button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col space-y-6 h-full"
            >
              {/* Google Maps Embed */}
              <div className="flex-1 min-h-[300px] w-full bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl relative group p-1">
                <div className="absolute inset-0 bg-electric-blue/10 animate-pulse pointer-events-none"></div>
                <iframe 
                  src="https://maps.google.com/maps?q=Varunika%20Residency,%20Chennai%20-%20600016&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full rounded-xl filter invert-[90%] hue-rotate-180 contrast-[90%] grayscale-[20%]"
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <TiltCard className="flex-1">
                  <div className="bg-[#0f1115] border border-gray-800 p-6 rounded-2xl h-full flex flex-col justify-center shadow-2xl hover:border-electric-blue/50 transition-colors relative overflow-hidden group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-electric-blue/0 via-electric-blue/10 to-electric-blue/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    <h3 className="text-xl font-black uppercase tracking-widest mb-6 text-white flex items-center gap-3 relative z-10">
                      <Mail className="text-electric-blue animate-pulse" /> Direct Protocol
                    </h3>
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400" />
                        <a href="mailto:Sanjayvs2019@outlook.com" className="text-sm sm:text-base font-bold text-electric-blue hover:text-white transition-colors border-b border-electric-blue/30 pb-0.5 break-all">
                          Sanjayvs2019@outlook.com
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400" />
                        <a href="mailto:sanjayvs20047@gmail.com" className="text-sm sm:text-base font-bold text-electric-blue hover:text-white transition-colors border-b border-electric-blue/30 pb-0.5 break-all">
                          sanjayvs20047@gmail.com
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-gray-400" />
                        <a href="tel:+919952934596" className="text-sm sm:text-base font-bold text-electric-blue hover:text-white transition-colors border-b border-electric-blue/30 pb-0.5 break-all">
                          +91 9952934596
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 text-gray-400 text-sm mt-6 relative z-10 pt-4 border-t border-gray-800">
                      <FaMapMarkerAlt className="text-electric-blue mt-1 shrink-0" />
                      <span>Varunika Residency 1st Floor 1c,<br />Chennai - 600016</span>
                    </div>
                  </div>
                </TiltCard>

                <div className="flex flex-col justify-center">
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-mono">Networks</h3>
                  <div className="flex flex-wrap gap-4">
                    <a href="https://github.com/vssanjai" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-electric-blue hover:text-black hover:border-electric-blue transition-all group shadow-lg hover:shadow-[0_0_20px_rgba(0,122,255,0.6)]">
                      <FaGithub size={24} className="group-hover:scale-125 transition-transform" />
                    </a>
                    <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-electric-blue hover:text-black hover:border-electric-blue transition-all group shadow-lg hover:shadow-[0_0_20px_rgba(0,122,255,0.6)]">
                      <FaLinkedin size={24} className="group-hover:scale-125 transition-transform" />
                    </a>
                    <a href="https://www.instagram.com/itsprasanna_vs/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-electric-blue hover:text-black hover:border-electric-blue transition-all group shadow-lg hover:shadow-[0_0_20px_rgba(0,122,255,0.6)]">
                      <FaInstagram size={24} className="group-hover:scale-125 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="w-full bg-[#050505] border-t border-white/10 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-black tracking-tighter text-white">
              SANJAY <span className="text-electric-blue">V.S</span>
            </span>
            <p className="text-gray-500 text-sm mt-2 font-mono">
              B.Tech Cybersecurity & IoT
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">Home</a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">About</a>
            <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">Contact</a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-600 text-sm font-mono">
              © {new Date().getFullYear()} Sanjay V.S.
            </p>
            <p className="text-gray-700 text-xs mt-1 uppercase tracking-widest">
              All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
