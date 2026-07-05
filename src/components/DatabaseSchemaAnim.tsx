"use client";
import { motion } from "framer-motion";

export default function DatabaseSchemaAnim() {
  return (
    <div className="w-full h-48 relative mt-4 border border-electric-blue/20 rounded bg-black/40 backdrop-blur-sm overflow-hidden shadow-[inset_0_0_20px_rgba(0,122,255,0.1)] flex items-center justify-between px-12">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
      
      {/* App Server Block */}
      <div className="w-20 h-24 border border-electric-blue/50 bg-electric-blue/10 rounded-md flex flex-col items-center justify-center relative z-10 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
        <div className="text-xl mb-1">💻</div>
        <span className="text-[10px] text-white font-mono font-bold">ASP.NET</span>
        <span className="text-[8px] text-gray-400 font-mono">MVC Server</span>
      </div>

      {/* Database Block */}
      <div className="w-20 h-24 border border-[#e0af68]/50 bg-[#e0af68]/10 rounded-md flex flex-col items-center justify-center relative z-10 shadow-[0_0_15px_rgba(224,175,104,0.2)]">
        <div className="text-xl mb-1">🗄️</div>
        <span className="text-[10px] text-white font-mono font-bold">SQL</span>
        <span className="text-[8px] text-gray-400 font-mono">Database</span>
      </div>

      {/* Data Flow Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Top line */}
        <line x1="30%" y1="40%" x2="70%" y2="40%" stroke="rgba(0,122,255,0.3)" strokeWidth="2" />
        <motion.circle r="3" fill="#007aff" className="drop-shadow-[0_0_5px_#007aff]"
          initial={{ cx: "30%", cy: "40%" }} animate={{ cx: "70%", cy: "40%" }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {/* Bottom line */}
        <line x1="70%" y1="60%" x2="30%" y2="60%" stroke="rgba(224,175,104,0.3)" strokeWidth="2" />
        <motion.circle r="3" fill="#e0af68" className="drop-shadow-[0_0_5px_#e0af68]"
          initial={{ cx: "70%", cy: "60%" }} animate={{ cx: "30%", cy: "60%" }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-sm bg-[#9ece6a] animate-pulse shadow-[0_0_10px_#9ece6a]"></div>
        <span className="text-[10px] text-electric-blue font-mono tracking-widest uppercase font-bold">
          API Data Exchange
        </span>
      </div>
    </div>
  );
}
