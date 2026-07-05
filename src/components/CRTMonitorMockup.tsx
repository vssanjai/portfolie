"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CRTMonitorMockup() {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const interval = setInterval(() => {
      let newCode = "";
      for (let i = 0; i < 150; i++) {
        newCode += characters.charAt(Math.floor(Math.random() * characters.length));
        if (i % 20 === 0) newCode += "\n";
      }
      setCode(newCode);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto h-[350px] flex items-center justify-center" style={{ perspective: "1500px" }}>
      
      <motion.div
        animate={{ rotateY: [-15, 15, -15], rotateX: [5, 15, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-64 h-56"
      >
        {/* Monitor Body (Front) */}
        <div 
          className="absolute inset-0 bg-[#e0e0e0] border-4 border-gray-300 rounded-2xl shadow-xl flex items-center justify-center p-4 z-20"
          style={{ transform: "translateZ(60px)" }}
        >
          {/* CRT Screen Tube */}
          <div className="w-full h-full bg-[#051505] border-[8px] border-[#111] rounded-xl overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            
            {/* Hacker Code */}
            <div className="text-[#0f0] font-mono text-[8px] leading-tight whitespace-pre-wrap opacity-80 mix-blend-screen">
              {code}
            </div>

            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%,transparent_51%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
            
            {/* Screen Glare */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent skew-y-12 z-20 pointer-events-none"></div>
          </div>
          
          {/* Monitor Details (Buttons) */}
          <div className="absolute bottom-2 right-4 flex gap-2">
            <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-1 bg-green-500 rounded-full shadow-[0_0_5px_#0f0]"></div>
          </div>
        </div>

        {/* Monitor Back (The Tube) */}
        <div 
          className="absolute top-4 left-4 w-56 h-48 bg-[#d0d0d0] border border-gray-400 rounded-3xl z-10"
          style={{ transform: "translateZ(0px)" }}
        ></div>
        
        {/* Monitor Base */}
        <div 
          className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-32 h-10 bg-[#c0c0c0] border border-gray-400 rounded-lg z-0"
          style={{ transform: "translateZ(30px) rotateX(-20deg)", transformOrigin: "bottom" }}
        ></div>
        
      </motion.div>
      
      {/* Floor reflection */}
      <div className="absolute bottom-0 w-48 h-8 bg-[#0f0]/10 blur-2xl rounded-full transform translate-y-8"></div>
    </div>
  );
}
