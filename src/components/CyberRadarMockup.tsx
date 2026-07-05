"use client";

import { motion } from "framer-motion";

export default function CyberRadarMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[400px] flex items-center justify-center" style={{ perspective: "1200px" }}>
      
      {/* 3D Radar Screen Container */}
      <motion.div
        animate={{ rotateY: [15, -15, 15], rotateX: [45, 50, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-64 h-64"
      >
        {/* Radar Base / Stand */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-32 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 z-0"
          style={{ transform: "translateZ(-20px) rotateX(-45deg)", transformOrigin: "bottom" }}
        ></div>

        {/* Radar Screen Base */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a] border-4 border-gray-800 rounded-full shadow-[0_0_50px_rgba(247,118,142,0.2)] z-10 overflow-hidden flex items-center justify-center"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Radar Grid Lines */}
          <div className="absolute inset-0 border border-[#f7768e]/30 rounded-full m-4"></div>
          <div className="absolute inset-0 border border-[#f7768e]/20 rounded-full m-12"></div>
          <div className="absolute inset-0 border border-[#f7768e]/10 rounded-full m-20"></div>
          <div className="w-full h-[1px] bg-[#f7768e]/30 absolute top-1/2 -translate-y-1/2"></div>
          <div className="h-full w-[1px] bg-[#f7768e]/30 absolute left-1/2 -translate-x-1/2"></div>

          {/* Radar Sweeping Beam */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute w-1/2 h-1/2 top-1/2 left-1/2 origin-top-left z-20"
            style={{ 
              background: "conic-gradient(from 180deg at 0% 0%, transparent 0deg, rgba(247,118,142,0.5) 90deg, #f7768e 90deg, transparent 91deg)"
            }}
          ></motion.div>

          {/* Radar Blips (Threats) */}
          <motion.div 
            animate={{ opacity: [0, 1, 0, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
            className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] z-30"
          ></motion.div>
          <motion.div 
            animate={{ opacity: [0, 1, 0, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
            className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_#f00] z-30"
          ></motion.div>

          {/* Center Point */}
          <div className="w-2 h-2 bg-[#f7768e] rounded-full z-40 shadow-[0_0_10px_#f7768e]"></div>
        </div>

        {/* 3D Depth Edges */}
        <div 
          className="absolute inset-0 rounded-full border-[10px] border-gray-900 z-0"
          style={{ transform: "translateZ(10px)" }}
        ></div>
        
      </motion.div>
      
      {/* Floor reflection/shadow */}
      <div className="absolute bottom-0 w-64 h-12 bg-[#f7768e]/10 blur-2xl rounded-full transform -translate-y-4"></div>
    </div>
  );
}
