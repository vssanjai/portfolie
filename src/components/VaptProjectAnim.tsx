"use client";
import { motion } from "framer-motion";

export default function VaptProjectAnim() {
  const codeLines = Array.from({ length: 8 }, () => 
    Array.from({ length: 15 }, () => Math.random() > 0.5 ? "1" : "0").join("")
  );

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center p-4 rounded-t-xl">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,red_0%,transparent_70%)]"></div>
      
      {/* Firewall Shield */}
      <motion.svg className="absolute w-24 h-24" viewBox="0 0 100 100"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <path d="M50 5 L90 20 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 20 Z" 
          fill="rgba(255,0,0,0.1)" stroke="#ff3333" strokeWidth="2" strokeDasharray="10 5" />
      </motion.svg>

      {/* Brute Force Text */}
      <div className="absolute left-4 top-4 font-mono text-[8px] text-red-500 opacity-50 flex flex-col gap-1">
        {codeLines.map((line, i) => (
          <motion.div key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-red-500 uppercase font-bold animate-pulse">
        [ BREACH IN PROGRESS ]
      </div>
    </div>
  );
}
