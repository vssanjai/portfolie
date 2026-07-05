"use client";

import { motion } from "framer-motion";

export default function ServerRackMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[400px] flex items-center justify-center" style={{ perspective: "1000px" }}>
      
      {/* 3D Container */}
      <motion.div
        animate={{ rotateY: [-5, 5, -5], rotateX: [5, 10, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-64 h-80"
      >
        {/* Front Face (The Rack) */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a] border-2 border-gray-800 rounded-lg flex flex-col p-4 shadow-[0_0_50px_rgba(0,122,255,0.1)] z-20"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Server Units */}
          {[1, 2, 3, 4].map((unit, i) => (
            <div key={i} className="w-full h-14 bg-[#111] mb-4 rounded border border-gray-700 flex items-center px-3 relative overflow-hidden group">
              {/* Unit Grill */}
              <div className="flex gap-1 h-full py-2">
                {Array.from({ length: 12 }).map((_, j) => (
                  <div key={j} className="w-1 h-full bg-[#050505] rounded-full"></div>
                ))}
              </div>
              
              {/* LED Lights */}
              <div className="ml-auto flex gap-2">
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }} 
                  transition={{ duration: Math.random() * 0.5 + 0.1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"
                ></motion.div>
                <motion.div 
                  animate={{ opacity: [0.1, 1, 0.1] }} 
                  transition={{ duration: Math.random() * 0.8 + 0.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"
                ></motion.div>
                <div className="w-2 h-2 rounded-full bg-red-500 opacity-20"></div>
              </div>
            </div>
          ))}

          {/* Cooling Fan */}
          <div className="w-full h-16 mt-auto border border-gray-800 bg-[#050505] rounded flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border border-gray-700 relative flex items-center justify-center"
            >
              <div className="w-1 h-full bg-gray-600 absolute"></div>
              <div className="w-full h-1 bg-gray-600 absolute"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full z-10"></div>
            </motion.div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-[#050505] border-2 border-gray-900 rounded-lg shadow-inner z-0"
          style={{ transform: "translateZ(-40px) rotateY(180deg)" }}
        ></div>

        {/* Left Face */}
        <div 
          className="absolute top-0 left-0 w-[80px] h-full bg-[#0d0d0d] border-y-2 border-l-2 border-gray-800 rounded-l-lg z-10"
          style={{ transform: "rotateY(-90deg) translateZ(40px)", transformOrigin: "left" }}
        ></div>

        {/* Right Face */}
        <div 
          className="absolute top-0 right-0 w-[80px] h-full bg-[#111] border-y-2 border-r-2 border-gray-800 rounded-r-lg z-10"
          style={{ transform: "rotateY(90deg) translateZ(40px)", transformOrigin: "right" }}
        ></div>

        {/* Top Face */}
        <div 
          className="absolute top-0 left-0 w-full h-[80px] bg-[#151515] border-x-2 border-t-2 border-gray-700 rounded-t-lg z-10"
          style={{ transform: "rotateX(90deg) translateZ(40px)", transformOrigin: "top" }}
        ></div>
        
      </motion.div>
      
      {/* Floor reflection/shadow */}
      <div className="absolute bottom-0 w-48 h-8 bg-blue-500/20 blur-xl rounded-full transform -translate-y-4"></div>
    </div>
  );
}
