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
    tam: "வணக்கம்! நான் சஞ்சய் V S, ஒரு சைபர் செக்யூரிட்டி என்டூசியாஸ்ட். ஹேக்கர்களுக்கு முன்னால் சிஸ்டம்ஸை பிரேக் செய்வதுதான் என் ஸ்பெஷாலிட்டி. என் ஸ்கில்ஸ் மற்றும் ப்ராஜெக்ட்ஸ் பற்றி தெரிந்துகொள்ள, கீழே ஸ்க்ரோல் பண்ணுங்கள்."
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
        // Try to find Indian English Male (Ravi, or any en-IN that is not explicitly female)
        const engVoice = voices.find(v => v.lang.includes('en-IN') && (v.name.includes('Ravi') || v.name.includes('Male'))) 
                      || voices.find(v => v.lang.includes('en-IN'))
                      || voices.find(v => v.lang.includes('en-US') && v.name.includes('Male'))
                      || voices.find(v => v.lang.includes('en'));
        if (engVoice) utterance.voice = engVoice;
      } else {
        // Try to find Tamil India Male (Valluvar)
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
        // Automatically play Tamil after English finishes if queued
        if (lang === 'eng' && queueNext === 'tam') {
          setTimeout(() => speak('tam'), 1000); // Small 1 sec pause between languages
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
    // Attempt Auto-Play on Load (English -> Tamil sequence)
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
  const getDuration = (text: string) => {
    const wordCount = text.split(' ').length;
    return (wordCount / 130) * 60; // Duration in seconds
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 z-20 w-full mt-4">
      
      <div className="flex flex-col items-center gap-4 shrink-0">
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

        <div className="flex gap-2">
          <button
            onClick={() => speak('eng')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              currentLang === 'eng' && isSpeaking
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' 
                : 'bg-white/5 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10'
            }`}
          >
            {currentLang === 'eng' && isSpeaking ? <Volume2 size={12} /> : <VolumeX size={12} />}
            Eng
          </button>
          
          <button
            onClick={() => speak('tam')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              currentLang === 'tam' && isSpeaking
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' 
                : 'bg-white/5 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10'
            }`}
          >
            {currentLang === 'tam' && isSpeaking ? <Volume2 size={12} /> : <VolumeX size={12} />}
            தமிழ்
          </button>
        </div>
      </div>

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
                    delay: (i / texts[currentLang].split(" ").length) * getDuration(texts[currentLang]) 
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
