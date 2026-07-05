"use client";
import { motion } from "framer-motion";

export default function IoTDataAnim() {
  // Generate random bar heights
  const bars = Array.from({ length: 15 }, () => Math.random() * 60 + 20);

  return (
    <div className="w-full h-48 relative mt-4 border border-electric-blue/20 rounded bg-black/40 backdrop-blur-sm overflow-hidden shadow-[inset_0_0_20px_rgba(0,122,255,0.1)]">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
      
      <div className="absolute bottom-4 left-6 right-6 h-24 flex items-end justify-between gap-1">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-full bg-gradient-to-t from-electric-blue/80 to-electric-blue/20 rounded-t-sm"
            initial={{ height: `${height}%` }}
            animate={{ height: [`${height}%`, `${Math.random() * 80 + 10}%`, `${height}%`] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Floating Sensor Data Numbers */}
      <motion.div className="absolute top-[40%] left-[20%] text-xs font-mono text-[#9ece6a] drop-shadow-[0_0_3px_#9ece6a]"
        animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
        TMP: 42.5°C
      </motion.div>
      <motion.div className="absolute top-[30%] right-[25%] text-xs font-mono text-[#e0af68] drop-shadow-[0_0_3px_#e0af68]"
        animate={{ y: [5, -5, 5], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}>
        VOLT: 12.4V
      </motion.div>
      
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_yellow]"></div>
        <span className="text-[10px] text-electric-blue font-mono tracking-widest uppercase font-bold">
          IoT Telemetry Stream
        </span>
      </div>
    </div>
  );
}
