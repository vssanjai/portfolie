"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Volume2, VolumeX } from 'lucide-react';

export default function CyberAvatar() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLang, setCurrentLang] = useState<'eng' | 'tam' | null>(null);
  const [autoQueue, setAutoQueue] = useState<'tam' | null>(null);
  
  const texts = {
    eng: "Hello! I am Sanjay V S, a highly motivated fresher and cybersecurity enthusiast. I specialize in breaking systems before hackers do. To see more details about my skills and projects, please scroll down.",
    tam: "வணக்கம்! நான் சஞ்சய் V S. நான் ஒரு துடிப்பான மற்றும் இணையப் பாதுகாப்பு ஆர்வலர். ஊடுருவல்காரர்கள் கணினிகளைத் தாக்கும் முன்பே, அவற்றின் பாதுகாப்பைச் சோதிப்பதே எனது சிறப்பு. எனது திறன்கள் மற்றும் திட்டங்கள் பற்றிய மேலும் விவரங்களைக் காண, கீழே செல்லவும்."
  };

  const speak = (lang: 'eng' | 'tam', queueNext?: 'tam') => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); 

      if (isSpeaking && currentLang === lang && !queueNext) {
        setIsSpeaking(false);
        setCurrentLang(null);
        setAutoQueue(null);
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
        if (queueNext) setAutoQueue(queueNext);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        if (lang === 'eng' && queueNext === 'tam') {
          setTimeout(() => speak('tam'), 1000); 
          setAutoQueue(null);
        }
      };

      utterance.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
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

  // Calculate animation duration based on standard speaking rate
  const getDuration = (text: string, lang: 'eng' | 'tam') => {
    const wordCount = text.split(' ').length;
    // Tamil words are longer and spoken slower than English
    const wpm = lang === 'eng' ? 140 : 85; 
    return (wordCount / wpm) * 60; // Duration in seconds
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 z-20 w-full mt-4">
      
      <motion.div 
        className="flex flex-col items-center gap-4 shrink-0"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.button 
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 cursor-pointer outline-none group"
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
          whileHover={{ scale: 1.05 }}
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
          />
          <motion.div 
            className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 border-cyan-400"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <svg className="hidden">
            <defs>
              <filter id="glitch-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.05 0.95" numOctaves="1" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1" in="noise" result="coloredNoise" />
                <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="10" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          <div className="relative w-full h-full rounded-full overflow-hidden bg-space-black flex items-center justify-center border-2 border-cyan-500/30">
            <div 
              className="absolute inset-0 bg-cover bg-[center_top_1rem] md:bg-top bg-no-repeat z-10 transition-all duration-300 scale-110" 
              style={{
                backgroundImage: "url('/avatar.jpg?t=3')",
                filter: isSpeaking 
                  ? "grayscale(0.3) sepia(0.8) hue-rotate(180deg) saturate(2) brightness(1.2) contrast(1.1) url(#glitch-filter)" 
                  : "grayscale(0.3) sepia(0.8) hue-rotate(180deg) saturate(2) brightness(1.2) contrast(1.1)"
              }}
            />
            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-20 pointer-events-none" />
            
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-30 group-hover:opacity-100 transition-opacity"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(0,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "4px 4px"
              }}
            />
          </div>
        </motion.button>

        <div className="flex gap-4">
          <button
            onClick={() => speak('eng')}
            className={`relative group flex items-center gap-1.5 px-4 py-2 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              currentLang === 'eng' && isSpeaking
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
                : 'bg-white/5 text-gray-400 hover:bg-cyan-500/5 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/50'
            }`}
          >
            {/* Sci-Fi Corner Brackets */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {currentLang === 'eng' && isSpeaking ? <Volume2 size={14} className="text-cyan-400" /> : <VolumeX size={14} />}
            Eng
          </button>
          
          <button
            onClick={() => speak('tam')}
            className={`relative group flex items-center gap-1.5 px-4 py-2 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              currentLang === 'tam' && isSpeaking
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
                : 'bg-white/5 text-gray-400 hover:bg-cyan-500/5 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/50'
            }`}
          >
            {/* Sci-Fi Corner Brackets */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {currentLang === 'tam' && isSpeaking ? <Volume2 size={14} className="text-cyan-400" /> : <VolumeX size={14} />}
            தமிழ்
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
            className="flex flex-col bg-space-black/80 border border-cyan-500/30 p-4 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.15)] relative overflow-hidden w-full max-w-sm mt-4 md:mt-0"
          >
            <div className="flex items-center justify-between mb-3 border-b border-cyan-500/30 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                <Terminal size={12} />
                <span>VOICE_TRANSLATOR_{currentLang.toUpperCase()}.sh</span>
              </div>
              <div className="flex gap-1">
                <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-cyan-500/80 animate-pulse' : 'bg-cyan-500/30'}`} />
                <span className="w-2 h-2 rounded-full bg-cyan-500/30" />
              </div>
            </div>

            <div className="text-cyan-50 font-mono text-xs sm:text-sm leading-relaxed min-h-[80px]">
              {texts[currentLang].split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.2, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 0.2, 
                    delay: (i / texts[currentLang].split(" ").length) * getDuration(texts[currentLang], currentLang) 
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
              {isSpeaking && <span className="inline-block w-2 h-3 bg-cyan-400 animate-pulse ml-1 align-middle" />}
            </div>
            
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
