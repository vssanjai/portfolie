"use client";
import { motion } from "framer-motion";

export default function CloudPipelineAnim() {
  return (
    <div className="w-full h-48 relative mt-4 border border-electric-blue/20 rounded bg-black/40 backdrop-blur-sm overflow-hidden shadow-[inset_0_0_20px_rgba(0,122,255,0.1)]">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <svg className="w-full h-full absolute inset-0">
        {/* Connection Line */}
        <motion.path 
          d="M 10 50 Q 30 20 50 50 T 90 50" 
          fill="transparent" 
          stroke="#007aff" 
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Nodes */}
        {[10, 50, 90].map((x, i) => (
          <g key={i}>
            <motion.circle
              cx={`${x}%`} cy="50%" r="15"
              fill="rgba(0,122,255,0.1)" stroke="#007aff" strokeWidth="2"
              initial={{ scale: 0.8 }} animate={{ scale: 1.2 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.3 }}
            />
            <motion.circle
              cx={`${x}%`} cy="50%" r="5" fill="#f7768e"
            />
          </g>
        ))}

        {/* Moving Data Packet */}
        <motion.circle
          r="4" fill="#fff" className="drop-shadow-[0_0_5px_#fff]"
          initial={{ cx: "10%", cy: "50%" }}
          animate={{ cx: ["10%", "50%", "90%"], cy: ["50%", "50%", "50%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Labels */}
      <div className="absolute top-[30%] left-[6%] text-[10px] text-gray-400 font-mono">BUILD</div>
      <div className="absolute top-[30%] left-[46%] text-[10px] text-gray-400 font-mono">TEST</div>
      <div className="absolute top-[30%] left-[85%] text-[10px] text-gray-400 font-mono">DEPLOY</div>

      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse shadow-[0_0_10px_#007aff]"></div>
        <span className="text-[10px] text-electric-blue font-mono tracking-widest uppercase font-bold">
          CI/CD Pipeline Status
        </span>
      </div>
    </div>
  );
}
