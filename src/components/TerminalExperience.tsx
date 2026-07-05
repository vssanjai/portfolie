"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TerminalExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  
  const [step, setStep] = useState(0); 
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setTypedText("");
    }
  }, [isInView]);

  const commands = [
    {
      cmd: "cat whoami.txt",
      out: (
        <p className="text-gray-400 leading-relaxed">
          I am a recent computer engineering graduate (Fresher) recognized for strong organizational skills and a sense of responsibility. Eager to apply my academic foundation and technical expertise in cybersecurity, DevOps, and web development to make a meaningful contribution in the industry.
        </p>
      )
    },
    {
      cmd: "./show_education.sh",
      out: (
        <div className="pl-4 border-l-2 border-electric-blue/50 group-hover:border-electric-blue transition-colors mt-2 space-y-3">
          <div>
            <p className="text-white font-bold group-hover:text-electric-blue transition-colors">B.Tech in Computer Science (Cybersecurity & IoT)</p>
            <p className="text-gray-500 text-xs mt-1">Sri Ramachandra Institute of Higher Education and Research (Oct 2022 - Jul 2026)</p>
          </div>
          <div>
            <p className="text-white font-bold group-hover:text-electric-blue transition-colors">Higher Secondary Education</p>
            <p className="text-gray-500 text-xs mt-1">St Britto's Academy, Velachery Chennai (Aug 2020 - May 2022)</p>
          </div>
        </div>
      )
    },
    {
      cmd: "cat languages.json",
      out: (
        <div className="pl-4 text-gray-400">
          {"{ "} "Saurashtra": "Native", "English": "Fluent", "Tamil": "Fluent" {" }"}
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isInView) return;
    if (step >= commands.length * 2) return;

    const cmdIndex = Math.floor(step / 2);
    const isTyping = step % 2 === 0;

    if (isTyping) {
      const fullCmd = commands[cmdIndex].cmd;
      if (typedText.length < fullCmd.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullCmd.slice(0, typedText.length + 1));
        }, Math.random() * 30 + 30); // Random typing speed (30-60ms) for realism
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setStep(step + 1);
          setTypedText(""); // reset for next cmd
        }, 300); // pause before showing output
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, 700); // pause before typing next command
      return () => clearTimeout(timeout);
    }
  }, [step, typedText, isInView, commands]);

  return (
    <div ref={ref} className="p-6 font-mono text-sm text-gray-300 space-y-4 min-h-[300px]">
      {commands.map((command, idx) => {
        const stepThreshold = idx * 2;
        if (step < stepThreshold) return null; // Not reached yet

        const isCurrentlyTyping = step === stepThreshold;
        const displayCmd = isCurrentlyTyping ? typedText : command.cmd;
        const showOutput = step > stepThreshold;

        return (
          <div key={idx} className="space-y-4">
            <p>
              <span className="text-[#f7768e] font-bold">root@kali</span>
              <span className="text-[#e0af68]">:~</span># {displayCmd}
              {isCurrentlyTyping && <span className="animate-pulse bg-white text-white w-2 h-4 inline-block align-middle ml-1">_</span>}
            </p>
            {showOutput && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {command.out}
              </motion.div>
            )}
          </div>
        );
      })}

      {step >= commands.length * 2 && (
        <p>
          <span className="text-[#f7768e] font-bold">root@kali</span>
          <span className="text-[#e0af68]">:~</span># <span className="animate-pulse bg-white text-white w-2 h-4 inline-block align-middle ml-1">_</span>
        </p>
      )}
    </div>
  );
}
