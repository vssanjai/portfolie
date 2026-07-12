"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Volume2, VolumeX } from 'lucide-react';

export default function CyberAvatar() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLang, setCurrentLang] = useState<'eng' | 'tam' | null>(null);
  const [autoQueue, setAutoQueue] = useState<'tam' | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  
  const avatarRef = useRef<HTMLButtonElement>(null);

  const texts = {
    eng: "Hello! I am Sanjay V S, a highly motivated fresher and cybersecurity enthusiast. I specialize in breaking systems before hackers do. To see more details about my skills and projects, please scroll down.",
    tam: "வணக்கம்! நான் சஞ்சய் V S. நான் ஒரு துடிப்பான மற்றும் இணையப் பாதுகாப்பு ஆர்வலர். ஊடுருவல்காரர்கள் கணினிகளைத் தாக்கும் முன்பே, அவற்றின் பாதுகாப்பைச் சோதிப்பதே எனது சிறப்பு. எனது திறன்கள் மற்றும் திட்டங்கள் பற்றிய மேலும் விவரங்களைக் காண, கீழே செல்லவும்."
  };

  // Calculate animation duration based on standard speaking rate
  const getDuration = (text: string, lang: 'eng' | 'tam') => {
    const wordCount = text.split(' ').length;
    const wpm = lang === 'eng' ? 140 : 85; 
    return (wordCount / wpm) * 60; // Duration in seconds
  };

  const speak = (lang: 'eng' | 'tam', queueNext?: 'tam') => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); 

      if (isSpeaking && currentLang === lang && !queueNext) {
        setIsSpeaking(false);
        setCurrentLang(null);
        setAutoQueue(null);
        setDisplayedText("");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(texts[lang]);
      
      const voices = window.speechSynthesis.getVoices();
      
      if (lang === 'eng') {
        const engVoice = voices.find(v => v.lang.includes('en-IN') && (v.name.includes('Ravi') || v.name.includes('Male'))) 
                      || voices.find(v => v.lang.includes('en-IN'))
                      || voices.find(v => v.lang.includes('en-US') && v.name.includes('Male'))
                      || voices.find(v => v.lang.includes('en'));
        if (engVoice) utterance.voice = engVoice;
      } else {
        const tamVoice = voices.find(v => v.lang.includes('ta-IN') && (v.name.includes('Valluvar') || v.name.includes('Male')))
                      || voices.find(v => v.lang.includes('ta-IN') || v.lang.includes('ta'));
        if (tamVoice) utterance.voice = tamVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentLang(lang);
        setDisplayedText("");
        if (queueNext) setAutoQueue(queueNext);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setDisplayedText(texts[lang]); // Ensure full text is shown
        if (lang === 'eng' && queueNext === 'tam') {
          setTimeout(() => speak('tam'), 1000); 
          setAutoQueue(null);
        }
      };

      utterance.onerror = (e) => {
        // Suppress expected autoplay interruption errors in console
        if (e.error !== 'interrupted') {
          console.warn("SpeechSynthesis requires user interaction first.");
        }
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const initSpeech = setTimeout(() => {
      if (window.speechSynthesis && !isSpeaking && !currentLang) {
        speak('eng', 'tam');
      }
    }, 1500);

    return () => {
      clearTimeout(initSpeech);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Hacker Typewriter Effect Sync
  useEffect(() => {
    if (isSpeaking && currentLang) {
      const fullText = texts[currentLang];
      const durationMs = getDuration(fullText, currentLang) * 1000;
      const intervalTime = durationMs / fullText.length;
      
      let i = 0;
      setDisplayedText("");
      const timer = setInterval(() => {
        i++;
        setDisplayedText(fullText.substring(0, i));
        if (i >= fullText.length) clearInterval(timer);
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [isSpeaking, currentLang]);

  // 3D Tilt Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 z-20 w-full mt-4" style={{ perspective: "1000px" }}>
      
      <motion.div 
        className="flex flex-col items-center gap-4 shrink-0"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.button 
          ref={avatarRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 cursor-pointer outline-none group transform-gpu transition-transform duration-200 ease-out"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d"
          }}
          onClick={() => {
            if (isSpeaking) {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
              setCurrentLang(null);
              setAutoQueue(null);
            } else {
              speak('eng', 'tam');
            }
          }}
          whileTap={{ scale: 0.95 }}
          animate={isSpeaking ? {
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
          <motion.div 
            className="absolute inset-0 rounded-full border border-cyan-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transform: "translateZ(20px)" }}
          />
          <motion.div 
            className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 border-cyan-400"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transform: "translateZ(10px)" }}
          />
          
          <div 
            className="relative w-full h-full rounded-full overflow-hidden bg-space-black flex items-center justify-center border-2 border-cyan-500/30"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Clear Profile Image with pure Cyan Hologram color (No dark shading/glitch) */}
            <div 
              className="absolute inset-0 bg-cover bg-[center_top_1rem] md:bg-top bg-no-repeat z-10 transition-all duration-300 scale-110" 
              style={{
                backgroundImage: "url('/avatar.jpg?t=3')",
                filter: isSpeaking 
                  ? "sepia(1) hue-rotate(180deg) saturate(2.5) brightness(1.2) contrast(1.1)" 
                  : "sepia(1) hue-rotate(180deg) saturate(1.5) brightness(1.0) contrast(1.0)"
              }}
            />
            
            {/* Sci-Fi Dot Grid Pattern */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(0,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "4px 4px"
              }}
            />

            {/* High-Tech Scanning Laser Animation */}
            <motion.div 
              className="absolute left-0 right-0 h-[2px] bg-cyan-300/80 shadow-[0_0_15px_rgba(0,255,255,1)] z-40"
              animate={{ top: ["-10%", "110%", "-10%"] }}
              transition={{ duration: isSpeaking ? 1.5 : 4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.button>

        <div className="flex gap-4">
          <button
            onClick={() => speak('eng')}
            className={`relative group flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all overflow-hidden ${
              currentLang === 'eng' && isSpeaking
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.6)] border border-cyan-400 scale-105' 
                : 'bg-space-black text-cyan-400 hover:bg-cyan-900/30 border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]'
            }`}
          >
            {/* 3D Cyber Button Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {currentLang === 'eng' && isSpeaking ? <Volume2 size={14} className="text-black" /> : <VolumeX size={14} />}
            <span className="relative z-10">ENG</span>
          </button>
          
          <button
            onClick={() => speak('tam')}
            className={`relative group flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all overflow-hidden ${
              currentLang === 'tam' && isSpeaking
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.6)] border border-cyan-400 scale-105' 
                : 'bg-space-black text-cyan-400 hover:bg-cyan-900/30 border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]'
            }`}
          >
            {/* 3D Cyber Button Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {currentLang === 'tam' && isSpeaking ? <Volume2 size={14} className="text-black" /> : <VolumeX size={14} />}
            <span className="relative z-10">தமிழ்</span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {currentLang && (
          <motion.div 
            key={currentLang} 
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col bg-space-black/90 border-2 border-cyan-500/50 p-5 rounded-lg backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.2)] relative overflow-hidden w-full max-w-sm mt-4 md:mt-0"
          >
            {/* Cyberpunk Terminal Corner Brackets */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            <div className="flex items-center justify-between mb-4 border-b border-cyan-500/30 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                <Terminal size={14} />
                <span>VOICE_TRANSLATOR_{currentLang.toUpperCase()}.sh</span>
              </div>
              <div className="flex gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-500/30'}`} />
                <span className="w-2 h-2 rounded-full bg-cyan-500/30" />
                <span className="w-2 h-2 rounded-full bg-cyan-500/30" />
              </div>
            </div>

            <div className="text-cyan-50 font-mono text-sm leading-relaxed min-h-[90px]">
              {displayedText}
              {isSpeaking && <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(0,255,255,0.8)]" />}
            </div>
            
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
              style={{
                background: "linear-gradient(to bottom, rgba(0,255,255,0), rgba(0,255,255,0) 50%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.8))",
                backgroundSize: "100% 4px"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
