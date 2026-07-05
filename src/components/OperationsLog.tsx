"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Code, Database } from "lucide-react";
import CloudPipelineAnim from "./CloudPipelineAnim";
import VulnerabilityScannerAnim from "./VulnerabilityScannerAnim";
import DatabaseSchemaAnim from "./DatabaseSchemaAnim";
import IoTDataAnim from "./IoTDataAnim";

export default function OperationsLog() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const jobs = [
    {
      role: "DevOps & Cloud Intern",
      company: "M/s. Montra Electric, Chennai",
      date: "17 FEB 2026 - Present",
      points: [
        "Working on Azure DevOps pipelines for CI/CD automation across multiple environments.",
        "Collaborating on DevOps practices integration with cybersecurity workflows.",
        "Monitoring, debugging, and improving deployment efficiency."
      ],
      icon: <Terminal size={20} className="text-white" />,
      animation: <CloudPipelineAnim />
    },
    {
      role: "VAPT Security Intern",
      company: "M/s. Hinduja Tech, Chennai",
      date: "26 AUG 2024 - 28 SEPT 2024",
      points: [
        "Conducted automated vulnerability assessment and penetration testing on web applications using Acunetix.",
        "Identified security vulnerabilities and produced detailed reports with remediation recommendations."
      ],
      icon: <ShieldAlert size={20} className="text-white" />,
      animation: <VulnerabilityScannerAnim />
    },
    {
      role: "Software Developer Intern",
      company: "M/s. BHEL, Bengaluru",
      date: "19 FEB 2024 - 30 MARCH 2024",
      points: [
        "Developed a Visitor Manager System using ASP.NET MVC and Entity Framework.",
        "Designed backend database schema with SQL Server for efficient data management."
      ],
      icon: <Code size={20} className="text-white" />,
      animation: <DatabaseSchemaAnim />
    },
    {
      role: "IoT Data Analyst Intern",
      company: "M/s. Ashok Leyland Ltd., Chennai",
      date: "05 MAY 2023 - 28 JUNE 2023",
      points: [
        "Automated data quality analysis for IoT telematics devices, reducing manual inspection effort.",
        "Developed Python scripts using Pandas and NumPy for data validation and anomaly detection."
      ],
      icon: <Database size={20} className="text-white" />,
      animation: <IoTDataAnim />
    }
  ];

  return (
    <div className="relative">
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-electric-blue/50 before:to-transparent">
        {jobs.map((job, idx) => {
          const isHovered = hoveredIdx === idx;
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-none"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Timeline Icon */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border bg-[#1a1b26] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all z-10 duration-300 ${isHovered ? 'bg-electric-blue border-electric-blue text-electric-blue shadow-[0_0_20px_rgba(0,122,255,0.8)]' : 'border-white/20 text-electric-blue'}`}>
                {job.icon}
              </div>
              
              {/* Card */}
              <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 relative overflow-hidden ${isHovered ? 'border-electric-blue/50 bg-electric-blue/10 scale-105 z-20' : 'border-white/10 bg-black/50'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <h3 className={`font-bold text-xl transition-colors ${isHovered ? 'text-electric-blue' : 'text-white'}`}>{job.role}</h3>
                  <time className="font-mono text-xs text-electric-blue bg-electric-blue/10 px-2 py-1 rounded w-fit">{job.date}</time>
                </div>
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">{job.company}</h4>
                
                {/* Expanded Details on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 mt-2 border-t border-white/10">
                        <ul className="space-y-2">
                          {job.points.map((point, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                              <span className="text-electric-blue mt-1 shrink-0">▹</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Show Unique Animation for this specific internship! */}
                      <div className="mt-4">
                        {job.animation}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hint to hover if not hovered */}
                {!isHovered && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-electric-blue/60 font-mono tracking-widest uppercase">
                    <span className="animate-pulse">▶</span> Hover to decrypt details
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
