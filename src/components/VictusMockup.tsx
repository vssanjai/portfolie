"use client";

import { motion, MotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const fakeLogs = [
  "[+] Starting Nmap 7.93 ( https://nmap.org )",
  "[*] Scanning target IP: 192.168.1.105...",
  "[+] Discovered open port 22/tcp on 192.168.1.105",
  "[+] Discovered open port 80/tcp on 192.168.1.105",
  "[!] Vulnerability found on port 80: CVE-2021-XXXX",
  "[*] Initializing Metasploit Framework...",
  "[+] Exploit payload loaded successfully.",
  "[*] Sending payload to target...",
  "[+] Meterpreter session 1 opened (10.0.0.5 -> 192.168.1.105)",
  "[*] Capturing network packets on eth0...",
  "[!] ALERT: Unusual traffic detected from 10.0.0.22",
  "[*] Extracting hashes from SAM database...",
  "[+] Hash dump complete. 15 hashes extracted.",
  "[*] Running dictionary attack on hashes...",
  "[+] Password found for user 'admin': admin123!",
  "[*] Establishing persistence mechanism...",
  "[+] Registry key added. Persistence active.",
  "[*] Clearing event logs...",
  "[+] Event logs cleared. Tracks covered."
];

interface VictusMockupProps {
  // lidRotation prop removed as it now animates automatically
}

export default function VictusMockup({}: VictusMockupProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [time, setTime] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    let currentIndex = 0;
    setLogs(fakeLogs.slice(0, 5));
    currentIndex = 5;

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, fakeLogs[currentIndex % fakeLogs.length]];
        return newLogs.slice(-20);
      });
      currentIndex++;
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center transform scale-90 sm:scale-100" style={{ perspective: "1500px" }}>
      
      {/* 3D Hinge Container for the Lid - Animates Automatically on Load */}
      <motion.div
        initial={{ rotateX: -60 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        style={{ 
          transformOrigin: "bottom",
          transformStyle: "preserve-3d"
        }}
        className="relative w-full aspect-[16/10] z-20"
      >
        {/* === FRONT OF LID (The Screen) === */}
        <div 
          className="absolute inset-0 bg-black border-[12px] border-[#0a0a0a] shadow-[0_0_50px_rgba(0,122,255,0.2)] overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(0deg)" }}
        >
          {/* Webcam */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#111] border border-black z-20 shadow-[0_0_2px_#00F0FF]"></div>

          {/* Screen Content - Kali Linux Dashboard */}
          <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col font-mono text-xs">
            <div className="w-full h-6 bg-[#1a1b26] flex items-center px-2 z-30 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#f7768e]"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-[#e0af68]"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-[#9ece6a]"></div>
              </div>
              <div className="mx-auto text-[10px] text-gray-400 font-mono tracking-widest uppercase">root@victus:~</div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left Panel: Auto Scrolling Terminal */}
              <div className="w-2/3 h-full border-r border-gray-800 p-2 flex flex-col relative bg-black/90">
                <div className="text-electric-blue mb-2 text-[10px]">
                  Kali GNU/Linux Rolling kali tty1<br/>
                  Last login: {time} on tty1
                </div>
                <div ref={scrollRef} className="flex-1 overflow-y-hidden scroll-smooth flex flex-col justify-end pb-2">
                  {logs.map((log, i) => (
                    <div key={i} className={`mb-1 ${log.includes("[!]") ? "text-[#f7768e] font-bold" : log.includes("[+]") ? "text-[#9ece6a]" : "text-gray-400"}`}>
                      <span className="text-gray-600 mr-2">{new Date().toLocaleTimeString().split(' ')[0]}</span>
                      {log}
                    </div>
                  ))}
                  <div className="mt-1 flex items-center">
                    <span className="text-[#f7768e] font-bold mr-2">root@kali</span>
                    <span className="text-[#e0af68]">~#</span>
                    <span className="w-2 h-3 bg-white ml-2 animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Dashboards */}
              <div className="w-1/3 h-full p-2 bg-[#080808] flex flex-col gap-4">
                <div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">Target Status</div>
                  <div className="text-[#9ece6a] font-bold text-sm">ONLINE</div>
                  <div className="text-gray-400 mt-1">IP: 192.168.1.105</div>
                </div>
                <div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">Attack CPU</div>
                  <div className="flex items-end gap-1 h-10">
                    {Array.from({length: 12}).map((_, i) => (
                      <motion.div key={i} animate={{ height: ['20%', '80%', '40%', '90%', '30%'] }} transition={{ repeat: Infinity, duration: 1.5 + Math.random() * 2, ease: "linear" }} className="flex-1 bg-electric-blue w-full"></motion.div>
                    ))}
                  </div>
                </div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="mt-auto border border-[#f7768e] text-[#f7768e] bg-[#f7768e]/10 text-center p-1 rounded font-bold text-[10px]">
                  BREACH IN PROGRESS
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* === BACK OF LID (Victus Logo) === */}
        <div 
          className="absolute inset-0 bg-[#0f1115] border border-gray-800 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg) translateZ(1px)" }}
        >
          {/* Angular styling for gaming vibe */}
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.02)_49%,rgba(255,255,255,0.02)_51%,transparent_51%)] bg-[length:20px_20px]"></div>
          
          {/* Victus V Logo (Flipped so it's upright when laptop is closed/half-closed) */}
          <div className="relative flex flex-col items-center rotate-180">
            {/* The V shape */}
            <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
              <path d="M 20 10 L 50 80 L 80 10 L 65 10 L 50 45 L 35 10 Z" fill="#E2E8F0" />
            </svg>
            <div className="text-[#E2E8F0] font-sans font-black tracking-[0.5em] text-xl mt-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              VICTUS
            </div>
          </div>
        </div>
      </motion.div>

      {/* Base / Keyboard Area (Angular Gaming Design) */}
      <div className="relative w-[110%] h-6 bg-[#15171c] rounded-t-sm z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t border-gray-700 flex justify-center">
        {/* Trackpad indent */}
        <div className="absolute top-0 w-32 h-2 bg-[#0a0b0e] rounded-b-md border-b border-gray-800"></div>
        {/* Front glowing lip */}
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#007AFF] to-transparent opacity-50 blur-[1px]"></div>
      </div>
      <div className="relative w-[112%] h-3 bg-[#0a0b0e] rounded-b-xl z-0 border-b border-gray-900"></div>
      
    </div>
  );
}
