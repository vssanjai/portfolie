"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Terminal } from 'lucide-react';

export default function CyberAvatar() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLang, setCurrentLang] = useState<string | null>(null);

  const texts = {
    eng: "Hello! I am Sanjay V S, a highly motivated fresher and cybersecurity enthusiast. I specialize in breaking systems before hackers do. To see more details about my skills and projects, please scroll down.",
    tam: "வணக்கம்! நான் சஞ்சய் V S, ஒரு சைபர் செக்யூரிட்டி என்டூசியாஸ்ட். ஹேக்கர்களுக்கு முன்னால் சிஸ்டம்ஸை பிரேக் செய்வதுதான் என் ஸ்பெஷாலிட்டி. என் ஸ்கில்ஸ் மற்றும் ப்ராஜெக்ட்ஸ் பற்றி தெரிந்துகொள்ள, கீழே ஸ்க்ரோல் பண்ணுங்கள்."
  };

  const speak = (lang: 'eng' | 'tam') => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); 

      if (isSpeaking && currentLang === lang) {
        setIsSpeaking(false);
        setCurrentLang(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(texts[lang]);
      
      const voices = window.speechSynthesis.getVoices();
      if (lang === 'eng') {
        const engVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB') || v.lang.includes('en-IN'));
        if (engVoice) utterance.voice = engVoice;
      } else {
        const tamVoice = voices.find(v => v.lang.includes('ta-IN') || v.lang.includes('ta'));
        if (tamVoice) utterance.voice = tamVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentLang(lang);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentLang(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentLang(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 z-20 max-w-sm mt-4">
      {/* Hologram Avatar Container */}
      <motion.div 
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1"
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
        
        {/* Hologram SVG Filter Definition for Glitch */}
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
            className="absolute inset-0 bg-[url('/avatar.jpg')] bg-cover bg-center bg-no-repeat z-10" 
            style={{
              filter: isSpeaking 
                ? "grayscale(0.5) sepia(1) hue-rotate(180deg) saturate(3) brightness(0.8) contrast(1.2) url(#glitch-filter)" 
                : "grayscale(0.5) sepia(1) hue-rotate(180deg) saturate(3) brightness(0.8) contrast(1.2)",
              mixBlendMode: "screen"
            }}
          />
          <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-20" />
          
          {/* Dot Matrix Pattern Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-30"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "4px 4px"
            }}
          />
        </div>
      </motion.div>

      {/* Communications Interface */}
      <div className="flex flex-col gap-2 bg-space-black/50 p-3 rounded-lg border border-cyan-500/20 backdrop-blur-sm w-fit">
        <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-mono mb-1">
          <Terminal size={10} />
          <span>INIT_COMMS_PROTOCOL</span>
          <span className="animate-pulse">{isSpeaking ? '>> TRANSMITTING' : ''}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => speak('eng')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              currentLang === 'eng' 
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' 
                : 'bg-white/5 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10'
            }`}
          >
            {currentLang === 'eng' ? <Volume2 size={12} /> : <VolumeX size={12} />}
            Eng
          </button>
          
          <button
            onClick={() => speak('tam')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              currentLang === 'tam' 
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' 
                : 'bg-white/5 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10'
            }`}
          >
            {currentLang === 'tam' ? <Volume2 size={12} /> : <VolumeX size={12} />}
            தமிழ்
          </button>
        </div>
      </div>
    </div>
  );
}
