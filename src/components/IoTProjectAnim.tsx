"use client";
import { motion } from "framer-motion";

export default function IoTProjectAnim() {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center p-4 rounded-t-xl">
      {/* Sensor Core */}
      <motion.div 
        className="w-16 h-16 rounded-full border-4 border-yellow-500/30 flex items-center justify-center relative z-10"
        animate={{ borderColor: ["rgba(234,179,8,0.3)", "rgba(234,179,8,1)", "rgba(234,179,8,0.3)"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-8 h-8 rounded-full bg-yellow-500/20 shadow-[0_0_15px_#eab308]"></div>
      </motion.div>

      {/* Gas Particles */}
      {particles.map((p, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-400/50 blur-[1px]"
            initial={{ x: `${randomX}%`, y: "110%", opacity: 0 }}
            animate={{ 
              x: `${randomX + (Math.random() * 20 - 10)}%`, 
              y: "-10%", 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        );
      })}

      {/* Warning Overlay */}
      <motion.div 
        className="absolute inset-0 bg-yellow-500/5 mix-blend-screen pointer-events-none"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      <div className="absolute top-2 right-2 text-[8px] font-mono text-yellow-500 uppercase font-bold">
        GAS_PPM: HIGH
      </div>
    </div>
  );
}
