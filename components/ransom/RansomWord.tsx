"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RansomWordProps {
  original: string;
  className?: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  animateDelay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

export default function RansomWord({ original, className, variant = 1, animateDelay = 0 }: RansomWordProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(original);
  const [isScrambling, setIsScrambling] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Styling based on prototype
  const variantStyles: Record<number, string> = {
    1: "font-abril text-[clamp(40px,7vw,80px)] bg-ink text-paper -rotate-1",
    2: "font-cormorant text-[clamp(30px,5vw,60px)] italic font-light bg-red text-paper-light rotate-1",
    3: "font-marker text-[clamp(28px,4.5vw,52px)] bg-paper text-navy border-4 border-navy -rotate-2",
    4: "font-shoulders font-black text-[clamp(36px,6vw,72px)] bg-green text-[#d8f0d8] rotate-1 tracking-tighter",
    5: "font-unifraktur text-[clamp(32px,5.5vw,64px)] bg-[#f5f0e0] text-purple border-b-4 border-purple -rotate-1",
    6: "font-readex font-extrabold text-[clamp(26px,4vw,48px)] bg-orange text-paper-light rotate-2 tracking-widest",
    7: "font-teko font-bold text-[clamp(38px,6.5vw,78px)] bg-paper text-gold border-2 border-gold -rotate-1 tracking-widest",
    8: "font-baskerville text-[clamp(22px,3.5vw,42px)] italic bg-navy text-[#a8c4e0] rotate-1",
    9: "font-josefin font-thin text-[clamp(30px,5vw,60px)] bg-paper text-ink border-y-4 border-ink tracking-[8px] -rotate-1",
    10: "font-unbounded font-black text-[clamp(24px,4vw,48px)] bg-red text-[#f9e8e8] rotate-2 tracking-tighter",
    11: "font-syne font-extrabold text-[clamp(20px,3.2vw,38px)] bg-purple text-[#dcc8f0] -rotate-1 tracking-wide",
    12: "font-playfair font-black text-[clamp(34px,5.5vw,66px)] bg-paper text-green underline decoration-green underline-offset-8 decoration-4 rotate-1",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = wordRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setX((e.clientX - cx) * 0.25);
    setY((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    setX(0);
    setY(0);
  };

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iter = 0;
    const interval = setInterval(() => {
      setText(() => {
        return original
          .split("")
          .map((c, i) => {
            if (i < iter) return original[i];
            if (c === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      iter += 0.4;
      if (iter >= original.length) {
        clearInterval(interval);
        setText(original);
        setIsScrambling(false);
      }
    }, 40);
  };

  return (
    <motion.span
      ref={wordRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: y, x: x }}
      transition={{
        opacity: { duration: 0.5, delay: animateDelay, ease: "easeOut" },
        y: x === 0 && y === 0 
          ? { duration: 0.5, delay: animateDelay, ease: "easeOut" } 
          : { type: "spring", stiffness: 150, damping: 15 },
        x: { type: "spring", stiffness: 150, damping: 15 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={triggerScramble}
      className={cn(
        "word inline-block px-3 py-1 mx-1 my-1 origin-bottom select-none transition-shadow duration-150 relative",
        variantStyles[variant],
        isScrambling && "scrambling",
        className
      )}
      data-hover="true"
      style={{ display: "inline-block" }}
    >
      {text}
    </motion.span>
  );
}
