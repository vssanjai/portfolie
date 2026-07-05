"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSequence({ children }: { children: React.ReactNode }) {
  const [isZooming, setIsZooming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Start opening animation after a short delay
    const openTimer = setTimeout(() => {
      setIsOpening(false);
    }, 1200);

    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0 && !isZooming && !isOpening) {
        setIsZooming(true);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      clearTimeout(openTimer);
    };
  }, [isZooming, isOpening]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  if (isComplete) {
    return <>{children}</>;
  }

  // Premium exact-width keyboard layout to guarantee perfectly flush edges
  const keyboardLayout = [
    Array(14).fill(50), // F-row
    Array(14).fill(50), // Number row
    [75, ...Array(11).fill(50), 79], // Tab row
    [90, ...Array(11).fill(50), 64], // Caps row
    [115, ...Array(10).fill(50), 93], // Shift row
    [60, 60, 60, 368, 60, 60, 60] // Spacebar row
  ];
  
  const rowHeights = 38;
  const gap = 4;
  let currentY = gap;
  const keys: any[] = [];
  
  keyboardLayout.forEach((rowWidths, rowIndex) => {
    let currentX = 14; // Start at 14 to perfectly center a 752px wide keyboard in a 780px container
    rowWidths.forEach((width, i) => {
      keys.push(
        <g key={`${rowIndex}-${i}`} transform={`translate(${currentX}, ${currentY})`}>
          {/* Base key */}
          <rect width={width} height={rowHeights} rx="4" fill="#222" stroke="#333" strokeWidth="1" />
          {/* Zero-cost simulated glow */}
          <rect x="0.5" y="0.5" width={width-1} height={rowHeights-1} rx="3.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>
      );
      currentX += width + gap;
    });
    currentY += rowHeights + gap;
  });

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#030814] flex flex-col items-center justify-center overflow-hidden cursor-none" 
      style={{ perspective: "2000px" }}
      onClick={() => { if (!isOpening) setIsZooming(true); }}
    >
      
      {/* Animated Glowing Blue Background (Optimized for 60fps) */}
      <AnimatePresence>
        {!isZooming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Cybersecurity Theme: Falling Binary Rain */}
            <div className="absolute inset-0 overflow-hidden flex justify-between px-10">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="text-blue-500/30 font-mono text-sm leading-4 whitespace-pre select-none flex flex-col"
                  style={{ 
                    marginTop: `${Math.random() * -500}px`,
                    opacity: Math.random() * 0.5 + 0.1 
                  }}
                  animate={{ y: [0, 2000] }}
                  transition={{
                    duration: Math.random() * 15 + 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * -20,
                  }}
                >
                  {Array.from({ length: 60 }).map(() => (Math.random() > 0.5 ? "1" : "0")).map((char, j) => (
                    <span key={j} className={Math.random() > 0.9 ? "text-blue-400 font-bold" : ""}>{char}</span>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Subtle moving 3D cyber grid */}
            <motion.div 
              className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(56,189,248,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(75deg)_translateY(-100px)] origin-bottom pointer-events-none"
              animate={{ backgroundPosition: ["0px 0px", "0px 40px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center soft blue aura to frame the laptop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_60%)] pointer-events-none"></div>

            {/* Edge vignette for a stealthy hacker vibe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#01040a_100%)] pointer-events-none"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The 3D True Victus Laptop Container */}
      <motion.div
        className="relative z-10 w-[960px] h-[540px]"
        style={{ transformStyle: "preserve-3d" }}
        
        // Intro closed: Look from top-front isometric
        initial={{ rotateX: -60, rotateY: 0, rotateZ: -25, scale: 0.65, y: -250 }}
        
        animate={
          isZooming 
            // -15deg perfectly cancels the screen's +15deg tilt to face the camera flat
            ? { rotateX: -15, rotateY: 0, rotateZ: 0, scale: 3.5, y: 0, x: 0, opacity: [1, 1, 0] } 
            : isOpening
            ? { rotateX: -60, rotateY: 0, rotateZ: -25, scale: 0.65, y: -250, x: 0 } // Hold closed
            : { 
                // Default floating open view
                rotateX: [-20, -22, -20], 
                rotateY: [-2, 2, -2], 
                rotateZ: 0,
                y: [-60, -70, -60],
                x: 0,
                scale: 0.75 
              }
        }
        transition={
          isZooming 
            ? { duration: 1.5, ease: "easeInOut", times: [0, 0.8, 1] } 
            : isOpening
            ? { duration: 0 } 
            : { 
                rotateX: { duration: 6, ease: "easeInOut", repeat: Infinity },
                rotateY: { duration: 8, ease: "easeInOut", repeat: Infinity },
                y: { duration: 6, ease: "easeInOut", repeat: Infinity },
                default: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } // Smooth swoop to center
              }
        }
        onAnimationComplete={() => {
          if (isZooming) setIsComplete(true);
        }}
      >
        
        {/* ======================= */}
        {/* 1. LAPTOP SCREEN (Lid)  */}
        {/* ======================= */}
        <motion.div 
          className="absolute top-0 left-0 w-[960px] h-[540px] origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: -90 }} // Closed completely over base
          animate={{ rotateX: isZooming ? 15 : isOpening ? -90 : 15 }} // Open to 105 degrees
          transition={{ duration: 2, ease: [0.25, 1, 0.3, 1], delay: isOpening ? 0 : 0.2 }}
        >
          {/* Main Lid Box (Removed heavy box-shadow, using thin border instead) */}
          <div className="absolute inset-0 bg-[#0f172a] rounded-t-xl rounded-b-sm border border-[#222]" style={{ transformStyle: "preserve-3d" }}>
            
            {/* --- BACK COVER (Top of laptop when closed) --- */}
            {/* Added rotateZ(180deg) so it faces the user right-side up when closed! */}
            <div 
              className="absolute inset-0 bg-[#1e293b] rounded-t-xl rounded-b-sm overflow-hidden"
              style={{ transform: "translateZ(-4px) rotateY(180deg) rotateZ(180deg)", backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[size:4px_4px]"></div>
              
              {/* Removed conflicting 'relative' class from this absolute container */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Zero-cost radial glow behind logo */}
                <div className="absolute w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path d="M4 4L12 20L20 4" stroke="url(#back-v-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="back-v-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 font-black tracking-[0.5em] text-sm opacity-80">VICTUS</div>
            </div>

            {/* --- FRONT FACE (Bezel and Screen) --- */}
            <div 
              className="absolute inset-0 bg-[#0a0a0a] rounded-t-xl rounded-b-sm flex flex-col items-center"
              style={{ transform: "translateZ(4px)", backfaceVisibility: "hidden" }}
            >
              <div className="absolute top-2 w-full flex items-center justify-center z-50">
                {/* Removed box-shadow, using radial gradient */}
                <div className="w-1 h-1 rounded-full bg-blue-500/80 relative">
                  <div className="absolute inset-[-4px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.6)_0%,transparent_70%)]"></div>
                </div>
              </div>
              
              <div className="w-[930px] h-[480px] mt-[15px] bg-black relative overflow-hidden rounded-sm border border-[#1a1a1a]">
                <div 
                  className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
                  style={{ width: "1920px", height: "1080px", transform: "scale(0.484375)" }}
                >
                  {children}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-20"></div>
              </div>

              <div className="w-full h-[45px] flex items-center justify-between px-8 relative">
                <div className="text-[12px] font-bold text-gray-400 tracking-widest italic opacity-70">hp</div>
                
                {/* Removed conflicting 'relative' class from this absolute container */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                   {/* Zero-cost radial glow behind logo */}
                  <div className="absolute w-[40px] h-[40px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
                    <path d="M4 4L12 20L20 4" stroke="url(#front-v)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="front-v" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#9ca3af" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="text-[10px] font-bold text-gray-500 tracking-[0.3em] opacity-60">VICTUS</div>
              </div>
            </div>

            {/* --- EDGES --- */}
            <div className="absolute top-0 left-0 w-full h-[8px] bg-[#050505] origin-top" style={{ transform: "rotateX(-90deg)" }}></div>
            <div className="absolute top-0 left-0 w-[8px] h-full bg-[#050505] origin-left" style={{ transform: "rotateY(-90deg)" }}></div>
            <div className="absolute top-0 right-0 w-[8px] h-full bg-[#050505] origin-right" style={{ transform: "rotateY(90deg)" }}></div>
          </div>
        </motion.div>

        {/* ======================= */}
        {/* HINGE CYLINDER          */}
        {/* ======================= */}
        <div 
          className="absolute top-[536px] left-[130px] w-[700px] h-[8px] bg-[#0a0a0a] rounded-full z-0"
          style={{ transform: "translateZ(-2px)", boxShadow: "inset 0 2px 4px rgba(0,0,0,1)" }}
        ></div>

        {/* ======================= */}
        {/* 2. LAPTOP BASE (Deck)   */}
        {/* ======================= */}
        <div 
          className="absolute top-[540px] left-0 w-[960px] h-[580px] bg-[#1a1a1a] rounded-b-3xl border-x-[2px] border-b-[6px] border-[#0a0a0a] shadow-[0_50px_100px_rgba(0,0,0,0.9)] origin-top flex flex-col items-center"
          style={{ transform: "rotateX(90deg)", transformStyle: "preserve-3d" }}
        >
          {/* Base Thickness Lips */}
          <div className="absolute top-[580px] left-0 w-full h-[15px] bg-[#050505] origin-top" style={{ transform: "rotateX(-90deg)" }}></div>
          <div className="absolute top-0 left-0 w-[15px] h-full bg-[#050505] origin-left" style={{ transform: "rotateY(-90deg)" }}></div>
          <div className="absolute top-0 right-0 w-[15px] h-full bg-[#050505] origin-right" style={{ transform: "rotateY(90deg)" }}></div>

          {/* Keyboard Area (Sunken) */}
          <div className="w-[780px] h-[280px] bg-[#111] rounded-md mt-10 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] flex flex-col justify-between relative border-t border-[#050505] overflow-hidden">
            <svg width="100%" height="100%" className="opacity-90">
              {keys}
            </svg>
          </div>

          {/* Trackpad */}
          <div className="w-[300px] h-[160px] bg-[#18181b] rounded-xl mt-6 shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)] border border-[#27272a] relative">
             <div className="absolute bottom-0 w-full h-[40%] border-t border-black/30 flex">
                <div className="w-1/2 h-full border-r border-black/30"></div>
             </div>
          </div>

          {/* Stickers Section (Palm Rest) */}
          <div className="absolute bottom-[50px] right-[70px] flex gap-4" style={{ transform: "translateZ(1px)" }}>
            <div className="w-14 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-sm flex flex-col items-center justify-center p-[2px] border border-gray-400 shadow-md">
              <div className="w-full h-full border border-[#ea580c] flex flex-col items-center justify-center gap-[2px] bg-[#111] text-center shadow-[inset_0_0_8px_rgba(234,88,12,0.2)]">
                <div className="text-[#ea580c] text-[6px] font-black leading-none tracking-widest mt-1">RYZEN</div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ea580c] to-[#9a3412] flex items-center justify-center text-white font-black text-sm shadow-[0_0_4px_rgba(234,88,12,0.8)] border border-[#fdba74]">5</div>
                <div className="text-white text-[5px] font-bold uppercase leading-none tracking-widest mb-1">AMD</div>
              </div>
            </div>
            <div className="w-14 h-16 bg-gradient-to-br from-[#76b900] to-[#1a4200] rounded-sm flex flex-col items-center justify-between p-[2px] border border-[#76b900]/50 shadow-md">
              <div className="w-full h-full border border-[#76b900]/30 flex flex-col items-center justify-center bg-[#0a1a05]">
                <div className="text-white text-[6px] font-black uppercase tracking-tighter text-center leading-[1.1]">NVIDIA<br/>GEFORCE</div>
                <div className="text-white text-[12px] font-black tracking-widest italic mt-1 drop-shadow-[0_0_4px_#fff]">RTX</div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
