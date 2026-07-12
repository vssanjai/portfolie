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
      window.speechSynthesis.cancel(); // Stop any ongoing speech

      if (isSpeaking && currentLang === lang) {
        setIsSpeaking(false);
        setCurrentLang(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(texts[lang]);
      
      // Try to find an appropriate voice
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
    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 z-20">
      {/* Holographic Avatar Container */}
      <motion.div 
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1"
        animate={isSpeaking ? {
          boxShadow: [
            "0 0 10px rgba(0, 122, 255, 0.5)",
            "0 0 40px rgba(0, 255, 255, 0.8)",
            "0 0 10px rgba(0, 122, 255, 0.5)"
          ],
        } : {
          boxShadow: "0 0 15px rgba(0, 122, 255, 0.2)"
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Animated Border Spin */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-electric-blue/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 border-cyan-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Profile Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-space-black flex items-center justify-center border-2 border-space-black">
          {/* Fallback avatar icon if no image provided */}
          <div className="absolute inset-0 bg-[url('/avatar.jpg')] bg-cover bg-center bg-no-repeat z-10" />
          <div className="absolute inset-0 bg-electric-blue/10 mix-blend-overlay z-20" />
          
          {/* Glitch Overlay while speaking */}
          {isSpeaking && (
            <motion.div 
              className="absolute inset-0 bg-cyan-400/20 mix-blend-color-burn z-30"
              animate={{ opacity: [0, 0.5, 0, 0.8, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            />
          )}
        </div>
      </motion.div>

      {/* Communications Interface */}
      <div className="flex flex-col items-center gap-3 bg-space-black/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs text-electric-blue font-mono mb-1">
          <Terminal size={12} />
          <span>INIT_COMMS_PROTOCOL</span>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => speak('eng')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm uppercase tracking-wider transition-all ${
              currentLang === 'eng' 
                ? 'bg-electric-blue text-black shadow-[0_0_15px_rgba(0,122,255,0.6)]' 
                : 'bg-white/5 text-gray-300 hover:bg-electric-blue/20 hover:text-white border border-white/10'
            }`}
          >
            {currentLang === 'eng' ? <Volume2 size={16} /> : <VolumeX size={16} />}
            English
          </button>
          
          <button
            onClick={() => speak('tam')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm uppercase tracking-wider transition-all ${
              currentLang === 'tam' 
                ? 'bg-electric-blue text-black shadow-[0_0_15px_rgba(0,122,255,0.6)]' 
                : 'bg-white/5 text-gray-300 hover:bg-electric-blue/20 hover:text-white border border-white/10'
            }`}
          >
            {currentLang === 'tam' ? <Volume2 size={16} /> : <VolumeX size={16} />}
            தமிழ்
          </button>
        </div>
      </div>
    </div>
  );
}
