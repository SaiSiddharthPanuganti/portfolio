"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function ScratchReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLSpanElement>(null);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !container || !overlay) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let painting = false;
    let revealed = 0;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill base
      ctx.fillStyle = "#f2ede0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw text
      ctx.fillStyle = "#1a1508";
      ctx.font = "12px 'DM Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("HOVER & DRAG TO REVEAL", canvas.width / 2, canvas.height / 2 + 4);
      
      // Vital for scratching
      ctx.globalCompositeOperation = "destination-out";
    };

    resize();
    window.addEventListener("resize", resize);

    const scratch = (x: number, y: number) => {
      if (cleared) return;
      
      // Fade out the scratch instruction text as soon as scratch begins
      if (promptRef.current) {
        promptRef.current.style.opacity = "0";
      }

      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fill();
      
      revealed++;
      if (revealed > 15) {
        setCleared(true);
        if (promptRef.current) {
          promptRef.current.style.display = "none";
        }
        gsap.to([canvas, overlay], {
          opacity: 0,
          duration: 0.8,
          onComplete: () => {
            canvas.style.display = "none";
            overlay.style.display = "none";
          }
        });
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      painting = true;
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!painting) return;
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    };

    const onMouseLeave = () => {
      painting = false;
    };

    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cleared]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10"
    >
      <div 
        ref={containerRef}
        className="relative overflow-hidden border-2 border-ink p-10 bg-ink rounded-3xl"
      >
        <div className="font-playfair text-[clamp(20px,3vw,32px)] text-paper leading-[1.6] relative z-10 select-none">
          &ldquo;The best design is the one that makes you feel something<br />before you understand it.&rdquo;
          <br /><br />
          <span 
            ref={promptRef} 
            className="font-mono text-sm text-[#aaa] not-italic transition-opacity duration-700 ease-out select-none pointer-events-none"
          >
            — scratch here to reveal the process
          </span>
        </div>
        
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-paper z-20 pointer-events-none transition-opacity duration-500 flex items-center justify-center font-mono text-xs tracking-widest text-[#aaa] uppercase"
        >
          {/* Fallback overlay */}
        </div>
        
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-30 cursor-none"
        />
      </div>
    </motion.section>
  );
}

