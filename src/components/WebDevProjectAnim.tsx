"use client";
import { motion } from "framer-motion";

export default function WebDevProjectAnim() {
  const blocks = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center p-4 rounded-t-xl">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,blue_0%,transparent_70%)]"></div>
      
      {/* Secure Transaction Grid */}
      <div className="grid grid-cols-4 gap-2 relative z-10 w-full px-6">
        {blocks.map((b, i) => (
          <motion.div 
            key={i}
            className="h-6 rounded bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
          >
            <motion.div 
              className="w-full h-0.5 bg-electric-blue/50"
              animate={{ y: [-10, 10] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Cart Hash */}
      <motion.div 
        className="absolute w-12 h-12 border-2 border-electric-blue/50 rounded-full flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xl">🛒</span>
      </motion.div>

      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-electric-blue uppercase font-bold">
        SECURE_CHECKOUT_HASH_VALID
      </div>
    </div>
  );
}
