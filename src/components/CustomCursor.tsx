"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Tactical Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#f7768e] pointer-events-none z-[100] mix-blend-screen shadow-[0_0_8px_#f7768e]"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} // Diamond shape
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      
      {/* Tactical Sniper / Hacker Reticle */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[100] flex items-center justify-center mix-blend-screen"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          rotate: isHovering ? 90 : 0,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {/* Top-Left Bracket */}
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isHovering ? 'border-[#f7768e]' : 'border-electric-blue'} shadow-[0_0_5px_rgba(0,122,255,0.8)]`}></div>
        {/* Top-Right Bracket */}
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${isHovering ? 'border-[#f7768e]' : 'border-electric-blue'} shadow-[0_0_5px_rgba(0,122,255,0.8)]`}></div>
        {/* Bottom-Left Bracket */}
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${isHovering ? 'border-[#f7768e]' : 'border-electric-blue'} shadow-[0_0_5px_rgba(0,122,255,0.8)]`}></div>
        {/* Bottom-Right Bracket */}
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isHovering ? 'border-[#f7768e]' : 'border-electric-blue'} shadow-[0_0_5px_rgba(0,122,255,0.8)]`}></div>

        {/* Center Target Lines (Only visible on hover) */}
        <motion.div 
          className="absolute w-full h-[1px] bg-[#f7768e]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
        ></motion.div>
        <motion.div 
          className="absolute h-full w-[1px] bg-[#f7768e]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
        ></motion.div>
      </motion.div>
    </>
  );
}
