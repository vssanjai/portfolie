"use client";

import { motion } from "framer-motion";

export default function CyberLockMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[300px] flex items-center justify-center" style={{ perspective: "1000px" }}>
      
      <motion.div
        animate={{ rotateY: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-32 h-40"
      >
        {/* The Shackle (Top part of lock) */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotateX: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-24 border-[12px] border-gray-400 rounded-t-full border-b-0 z-0"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: "translateZ(-5px)",
            boxShadow: "inset 0 10px 20px rgba(0,0,0,0.5)"
          }}
        ></motion.div>

        {/* Lock Body */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black border-2 border-electric-blue/50 rounded-xl shadow-[0_0_30px_rgba(0,122,255,0.4)] flex items-center justify-center z-10 overflow-hidden"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Keyhole / Core */}
          <div className="w-12 h-12 bg-black rounded-full border-2 border-electric-blue flex flex-col items-center justify-center relative shadow-[inset_0_0_15px_rgba(0,122,255,0.8)]">
            <motion.div 
              animate={{ rotateZ: [0, 90, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-2 h-4 bg-electric-blue rounded-t-md"
            ></motion.div>
            <motion.div 
              animate={{ rotateZ: [0, 90, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-4 h-4 bg-electric-blue rounded-full -mt-1"
            ></motion.div>
          </div>

          {/* Glitch Overlay */}
          <motion.div 
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 5 }}
            className="absolute inset-0 bg-electric-blue/20 mix-blend-screen"
          ></motion.div>
        </div>

        {/* 3D Depth (Side walls) */}
        <div 
          className="absolute inset-0 bg-gray-900 rounded-xl border border-gray-800 z-0"
          style={{ transform: "translateZ(-10px)" }}
        ></div>
        
      </motion.div>
      
      {/* Floor reflection */}
      <div className="absolute bottom-4 w-24 h-4 bg-electric-blue/30 blur-xl rounded-full"></div>
    </div>
  );
}
