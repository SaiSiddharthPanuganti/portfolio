"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

interface IslandProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export default function Island({ children, className = "", style, label }: IslandProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(Draggable);
    const [d] = Draggable.create(ref.current, {
      type: "x,y",
      cursor: "grab",
      activeCursor: "grabbing",
      zIndexBoost: true,
      onPress() {
        gsap.to(this.target, { scale: 1.025, duration: 0.15, ease: "power2.out" });
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, duration: 0.35, ease: "elastic.out(1,0.4)" });
      },
    });
    return () => { d.kill(); };
  }, []);

  return (
    <div
      ref={ref}
      className={`island absolute select-none ${className}`}
      style={style}
    >
      {/* Drag handle bar */}
      <div
        className="island-handle flex items-center gap-1.5 px-3 py-1.5 bg-ink/5 border-b border-ink/10 cursor-grab active:cursor-grabbing"
        data-hover="true"
      >
        {[0,1,2,3,4,5].map(i => (
          <div key={i} className="w-[3px] h-[3px] rounded-full bg-ink/30" />
        ))}
        {label && <span className="ml-1 font-mono text-[9px] tracking-[0.2em] text-ink/30 uppercase">{label}</span>}
      </div>
      {children}
    </div>
  );
}
