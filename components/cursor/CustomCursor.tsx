"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot   = dotRef.current!;
    const ring  = ringRef.current!;
    const canvas = canvasRef.current!;
    const ctx   = canvas.getContext("2d")!;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resize canvas to viewport
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;
    const LERP = 0.32;

    let caffeineLevel = 3;
    const handleCaffeine = (e: Event) => {
      const customEvent = e as CustomEvent<{ level: number }>;
      caffeineLevel = customEvent.detail.level;
    };
    window.addEventListener("caffeine-change", handleCaffeine);

    // Trail particles stored in a fixed-size ring buffer — no DOM nodes
    const MAX_TRAIL = 18;
    type Particle = { x: number; y: number; size: number; col: string; life: number; maxLife: number };
    const trail: Particle[] = [];
    const COLORS = ["#c8271e", "#1a1508", "#b8860b", "#4a1a5e", "#2a5a2e"];
    let lastParticleTime = 0;

    const loop = (ts: number) => {
      // Lerp ring
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;

      // Draw canvas trail
      if (!prefersReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];
          p.life -= 16;
          if (p.life <= 0) { trail.splice(i, 1); continue; }
          const alpha = (p.life / p.maxLife) * 0.55;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        const isHighCaffeine = caffeineLevel >= 5;
        const spawnInterval = isHighCaffeine ? 25 : 80;
        const trailLimit = isHighCaffeine ? 50 : MAX_TRAIL;

        if (ts - lastParticleTime > spawnInterval && trail.length < trailLimit) {
          lastParticleTime = ts;
          const colorList = isHighCaffeine 
            ? ["#c8271e", "#d45a00", "#b8860b"] 
            : COLORS;
          const randomCol = colorList[Math.floor(Math.random() * colorList.length)];
          
          // Add minor jitter on high caffeine
          const jitterX = isHighCaffeine ? (Math.random() - 0.5) * (caffeineLevel - 4) * 2.5 : 0;
          const jitterY = isHighCaffeine ? (Math.random() - 0.5) * (caffeineLevel - 4) * 2.5 : 0;

          trail.push({
            x: mx + jitterX + (Math.random() - 0.5) * 8,
            y: my + jitterY + (Math.random() - 0.5) * 8,
            size: isHighCaffeine ? Math.random() * 5 + 2.5 : Math.random() * 3 + 1.5,
            col: randomCol,
            life: isHighCaffeine ? 550 : 420,
            maxLife: isHighCaffeine ? 550 : 420,
          });
        }
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 7}px,${my - 7}px)`;
    };

    const setHover = (on: boolean) => {
      if (on) {
        dot.style.width = "34px";
        dot.style.height = "34px";
        dot.style.background = "#c8271e";
        dot.style.borderRadius = "0";
        dot.style.transform = `translate(${mx - 17}px,${my - 17}px) rotate(45deg)`;
        ring.style.opacity = "0";
      } else {
        dot.style.width = "14px";
        dot.style.height = "14px";
        dot.style.background = "#1a1508";
        dot.style.borderRadius = "50%";
        dot.style.transform = `translate(${mx - 7}px,${my - 7}px) rotate(0deg)`;
        ring.style.opacity = "0.4";
      }
    };

    const onDown = () => { dot.style.transform = `translate(${mx - 4}px,${my - 4}px) scale(0.5)`; };
    const onUp   = () => { dot.style.transform = `translate(${mx - 7}px,${my - 7}px) scale(1)`; };

    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      // Ripple — single element, auto-removed
      const r = document.createElement("div");
      r.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:60px;height:60px;border:1.5px solid #1a1508;border-radius:50%;transform:translate(-50%,-50%) scale(0);pointer-events:none;z-index:9995;opacity:0.6;transition:transform 0.55s ease-out,opacity 0.55s ease-out;`;
      document.body.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = "translate(-50%,-50%) scale(4)"; r.style.opacity = "0"; });
      setTimeout(() => r.remove(), 600);
    };

    const hoverSel = "a,button,[data-hover],.island-handle";
    const onOver = (e: MouseEvent) => { if (e.target instanceof Element && e.target.closest(hoverSel)) setHover(true); };
    const onOut  = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const target = e.target.closest(hoverSel);
      if (!target) return;
      if (e.relatedTarget instanceof Node && target.contains(e.relatedTarget)) return;
      setHover(false);
    };

    document.addEventListener("mousemove", onMove,  { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    document.addEventListener("click",     onClick);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("caffeine-change", handleCaffeine);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.removeEventListener("click",     onClick);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9996 }}
      />
      <div ref={dotRef}  style={{ position:"fixed",left:0,top:0,width:14,height:14,background:"#1a1508",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"multiply",willChange:"transform",transition:"width .08s,height .08s,background .08s,border-radius .08s",transform:"translate(-200px,-200px)" }} />
      <div ref={ringRef} style={{ position:"fixed",left:0,top:0,width:36,height:36,border:"1.5px solid #1a1508",borderRadius:"50%",pointerEvents:"none",zIndex:9998,opacity:0.4,willChange:"transform",transform:"translate(-200px,-200px)" }} />
    </>
  );
}
