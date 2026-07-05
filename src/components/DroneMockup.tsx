"use client";

import { motion } from "framer-motion";

export default function DroneMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[400px] flex items-center justify-center" style={{ perspective: "1500px" }}>
      
      {/* 3D Drone Container (Hovers up and down) */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotateY: [-20, 20, -20], rotateX: [10, 20, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-48 h-32"
      >
        {/* Main Body (Payload Box) */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a] border border-electric-blue/30 rounded-lg shadow-[0_0_30px_rgba(0,122,255,0.2)] flex items-center justify-center z-20"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Glowing Mail Icon / Data Core */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full bg-electric-blue blur-[2px] shadow-[0_0_20px_#007AFF]"
          ></motion.div>
          <div className="absolute font-mono text-[8px] text-electric-blue uppercase tracking-widest bottom-2">Payload_Ready</div>
        </div>

        {/* Back Body */}
        <div 
          className="absolute inset-0 bg-[#050505] border border-gray-800 rounded-lg shadow-inner z-0"
          style={{ transform: "translateZ(-30px)" }}
        ></div>

        {/* --- ROTORS --- */}
        {/* Top Left Rotor */}
        <div className="absolute -top-8 -left-8 w-16 h-16 z-30" style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}>
          <div className="w-2 h-8 bg-gray-700 absolute bottom-0 right-0 origin-bottom-right rotate-45"></div>
          <div className="w-16 h-16 border-2 border-gray-800 rounded-full absolute top-0 left-0" style={{ transform: "rotateX(75deg)" }}>
            <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }} className="w-full h-full relative">
              <div className="w-full h-[2px] bg-electric-blue/80 absolute top-1/2 -translate-y-1/2 blur-[1px]"></div>
              <div className="h-full w-[2px] bg-electric-blue/80 absolute left-1/2 -translate-x-1/2 blur-[1px]"></div>
            </motion.div>
          </div>
        </div>

        {/* Top Right Rotor */}
        <div className="absolute -top-8 -right-8 w-16 h-16 z-30" style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}>
          <div className="w-2 h-8 bg-gray-700 absolute bottom-0 left-0 origin-bottom-left -rotate-45"></div>
          <div className="w-16 h-16 border-2 border-gray-800 rounded-full absolute top-0 right-0" style={{ transform: "rotateX(75deg)" }}>
            <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }} className="w-full h-full relative">
              <div className="w-full h-[2px] bg-electric-blue/80 absolute top-1/2 -translate-y-1/2 blur-[1px]"></div>
              <div className="h-full w-[2px] bg-electric-blue/80 absolute left-1/2 -translate-x-1/2 blur-[1px]"></div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Left Rotor */}
        <div className="absolute -bottom-4 -left-8 w-16 h-16 z-10" style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}>
          <div className="w-2 h-6 bg-gray-700 absolute top-0 right-0 origin-top-right -rotate-45"></div>
          <div className="w-16 h-16 border-2 border-gray-800 rounded-full absolute bottom-0 left-0" style={{ transform: "rotateX(75deg)" }}>
            <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }} className="w-full h-full relative">
              <div className="w-full h-[2px] bg-electric-blue/80 absolute top-1/2 -translate-y-1/2 blur-[1px]"></div>
              <div className="h-full w-[2px] bg-electric-blue/80 absolute left-1/2 -translate-x-1/2 blur-[1px]"></div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Right Rotor */}
        <div className="absolute -bottom-4 -right-8 w-16 h-16 z-10" style={{ transformStyle: "preserve-3d", transform: "translateZ(15px)" }}>
          <div className="w-2 h-6 bg-gray-700 absolute top-0 left-0 origin-top-left rotate-45"></div>
          <div className="w-16 h-16 border-2 border-gray-800 rounded-full absolute bottom-0 right-0" style={{ transform: "rotateX(75deg)" }}>
            <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }} className="w-full h-full relative">
              <div className="w-full h-[2px] bg-electric-blue/80 absolute top-1/2 -translate-y-1/2 blur-[1px]"></div>
              <div className="h-full w-[2px] bg-electric-blue/80 absolute left-1/2 -translate-x-1/2 blur-[1px]"></div>
            </motion.div>
          </div>
        </div>
        
      </motion.div>
      
      {/* Floor reflection/shadow */}
      <motion.div 
        animate={{ scale: [1, 0.8, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 w-32 h-8 bg-electric-blue/20 blur-xl rounded-full transform -translate-y-4"
      ></motion.div>
    </div>
  );
}
