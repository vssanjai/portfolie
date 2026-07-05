"use client";
import { motion } from "framer-motion";

export default function NetworkTopology() {
  const nodes = [
    { x: 15, y: 30 }, { x: 50, y: 15 }, { x: 85, y: 35 },
    { x: 25, y: 75 }, { x: 75, y: 80 }, { x: 50, y: 55 }
  ];
  
  const connections = [
    [0, 1], [1, 2], [0, 5], [1, 5], [2, 5], [0, 3], [3, 5], [3, 4], [4, 5], [2, 4]
  ];

  return (
    <div className="w-full h-48 relative mt-4 border border-electric-blue/20 rounded bg-black/40 backdrop-blur-sm overflow-hidden shadow-[inset_0_0_20px_rgba(0,122,255,0.1)]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <svg className="w-full h-full absolute inset-0">
        {connections.map(([a, b], idx) => (
          <motion.line
            key={`line-${idx}`}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke="#007aff"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: idx * 0.15, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          />
        ))}
        {nodes.map((n, idx) => (
          <motion.circle
            key={`node-${idx}`}
            cx={`${n.x}%`} cy={`${n.y}%`}
            r="4"
            fill="#f7768e"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, delay: idx * 0.2, repeat: Infinity }}
            className="drop-shadow-[0_0_8px_#f7768e]"
          />
        ))}
        {/* Pulsing rings around nodes */}
        {nodes.map((n, idx) => (
          <motion.circle
            key={`ring-${idx}`}
            cx={`${n.x}%`} cy={`${n.y}%`}
            r="12"
            stroke="#f7768e"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></div>
        <span className="text-[10px] text-electric-blue font-mono tracking-widest uppercase font-bold">
          Live Topology Tracker
        </span>
      </div>
      <div className="absolute bottom-2 right-3">
        <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
          Sys.Status: ONLINE
        </span>
      </div>
    </div>
  );
}
