"use client";

import { motion } from "framer-motion";

export default function Typewriter({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      display: "inline",
    },
    hidden: {
      opacity: 0,
      display: "none",
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1 }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span variants={child} key={index}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
