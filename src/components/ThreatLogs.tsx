"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Code, Cpu } from "lucide-react";
import TiltCard from "./TiltCard";
import VaptProjectAnim from "./VaptProjectAnim";
import WebDevProjectAnim from "./WebDevProjectAnim";
import IoTProjectAnim from "./IoTProjectAnim";

export default function ThreatLogs() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const projects = [
    {
      title: "VAPT on Deliberately Vulnerable App",
      category: "Security",
      desc: "Conducted automated vulnerability assessment on a deliberately vulnerable website using Acunetix, generated detailed reports, and recommended security improvements.",
      icon: <ShieldAlert size={24} className="text-[#f7768e]" />,
      animation: <VaptProjectAnim />
    },
    {
      title: "Online Gift Store & Invoice System",
      category: "Web Dev",
      desc: "Developed a full-stack e-commerce application with a seamless checkout process and automated invoice generation.",
      icon: <Code size={24} className="text-[#7aa2f7]" />,
      animation: <WebDevProjectAnim />
    },
    {
      title: "Smart Gas Leakage Detector",
      category: "IoT",
      desc: "Built an IoT-based smart detection system using Arduino to alert users of hazardous gas leakages in real-time.",
      icon: <Cpu size={24} className="text-[#e0af68]" />,
      animation: <IoTProjectAnim />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project, idx) => {
        const isHovered = hoveredIdx === idx;
        
        return (
          <motion.div 
            key={idx} 
            variants={itemVariants} 
            className="h-full min-h-[450px]"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <TiltCard className="h-full">
              <div className={`bg-black/80 border rounded-xl flex flex-col h-full transition-all duration-300 relative overflow-hidden backdrop-blur-md ${isHovered ? 'border-electric-blue/50 shadow-[0_0_30px_rgba(0,122,255,0.2)]' : 'border-white/10'}`}>
                
                {/* Custom Hover Animation Block */}
                <div 
                  className={`w-full transition-all duration-500 ease-in-out overflow-hidden origin-top flex-shrink-0 ${isHovered ? 'h-[200px] opacity-100' : 'h-0 opacity-0'}`}
                >
                  {project.animation}
                </div>

                {/* Card Content */}
                <div 
                  className="p-8 flex flex-col flex-grow transition-all duration-500 ease-in-out"
                >
                  <div className={`p-4 bg-white/5 rounded-lg border border-white/5 w-fit mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 ${isHovered ? 'scale-110 shadow-[0_0_20px_rgba(0,122,255,0.4)] bg-electric-blue/10 border-electric-blue/30' : ''}`}>
                    {project.icon}
                  </div>
                  
                  <div className="text-xs font-black text-electric-blue mb-3 uppercase tracking-widest">{project.category}</div>
                  <h3 className={`text-2xl font-bold mb-4 transition-colors ${isHovered ? 'text-white' : 'text-gray-100'}`}>{project.title}</h3>
                  
                  <p className={`text-gray-400 text-sm leading-relaxed flex-grow transition-all duration-500 ${isHovered ? 'opacity-50' : 'opacity-100'}`}>
                    {project.desc}
                  </p>
                </div>

                {/* Cyber Frame on hover */}
                <div className={`absolute inset-0 border-2 mix-blend-screen rounded-xl pointer-events-none transition-all duration-500 ${isHovered ? 'border-electric-blue/50 opacity-100' : 'border-transparent opacity-0'}`}></div>
              </div>
            </TiltCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
