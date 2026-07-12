"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import Typewriter from './Typewriter';

export default function CyberAvatar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCC, setShowCC] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/intro.ogg');
    
    audioRef.current.onplay = () => {
      setIsPlaying(true);
      setShowCC(true);
    };
    
    audioRef.current.onended = () => {
      setIsPlaying(false);
      // Optional: hide CC after finish, or keep it visible
      // setShowCC(false); 
    };

    audioRef.current.onerror = () => {
      setIsPlaying(false);
    };

    // Attempt autoplay
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
          console.log("Autoplay blocked. User needs to click.");
        });
      }
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleInteract = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error(e));
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 z-20 w-full mt-4">
      
      {/* Hologram Avatar Container */}
      <motion.button 
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 cursor-pointer outline-none group shrink-0"
        onClick={handleInteract}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isPlaying ? {
          boxShadow: [
            "0 0 10px rgba(0, 255, 255, 0.5)",
            "0 0 30px rgba(0, 255, 255, 0.8)",
            "0 0 10px rgba(0, 255, 255, 0.5)"
          ],
        } : {
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)"
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Animated Border Spin */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-cyan-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 border-cyan-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Hologram SVG Filter */}
        <svg className="hidden">
          <defs>
            <filter id="glitch-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.95" numOctaves="1" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1" in="noise" result="coloredNoise" />
              <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Profile Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-space-black flex items-center justify-center border-2 border-cyan-500/30">
          <div 
            className="absolute inset-0 bg-cover bg-[center_top_1rem] md:bg-top bg-no-repeat z-10 transition-all duration-300 scale-110" 
            style={{
              backgroundImage: "url('/avatar.jpg?t=2')",
              filter: isPlaying 
                ? "grayscale(0.3) sepia(0.8) hue-rotate(180deg) saturate(2) brightness(1.2) contrast(1.1) url(#glitch-filter)" 
                : "grayscale(0.3) sepia(0.8) hue-rotate(180deg) saturate(2) brightness(1.2) contrast(1.1)"
            }}
          />
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-20 pointer-events-none" />
          
          {/* Dot Matrix Pattern Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-30 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "4px 4px"
            }}
          />
        </div>
      </motion.button>

      {/* Cyberpunk Closed Captions (CC) Terminal */}
      <AnimatePresence>
        {showCC && (
          <motion.div 
            initial={{ opacity: 0, x: -20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col bg-space-black/80 border border-cyan-500/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.15)] relative overflow-hidden max-w-sm"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between mb-3 border-b border-cyan-500/30 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                <Terminal size={12} />
                <span>AUDIO_TRANSMISSION.sh</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500/50 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-cyan-500/30" />
              </div>
            </div>

            {/* Terminal Body with Typewriter */}
            <div className="text-cyan-50 font-mono text-xs sm:text-sm leading-relaxed">
              <Typewriter 
                delay={0.1} 
                text="Hello! I am Sanjay V S, a highly motivated fresher and cybersecurity enthusiast. I specialize in breaking systems before hackers do. To see more details about my skills and projects, please scroll down." 
              />
            </div>
            
            {/* Scanlines over CC */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.8))",
                backgroundSize: "100% 4px"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
