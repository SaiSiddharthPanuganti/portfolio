"use client";

import RansomWord from "@/components/ransom/RansomWord";
import { heroWords } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-[60px] py-[80px] relative z-10 w-full overflow-hidden">
      {/* Eyebrow */}
      <div className="font-mono text-[11px] tracking-[0.25em] text-[#888] mb-12 uppercase">
        portfolio · 2026 · open to work
      </div>

      {/* Ransom Headline */}
      <div className="leading-[1.2] mb-10 max-w-5xl">
        {heroWords.map((item, index) => {
          // Parse variant number from className (e.g., w1 -> 1)
          const variantNum = Number(item.className.replace("w", "")) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
          return (
            <span key={index}>
              <RansomWord
                original={item.original}
                variant={variantNum}
                animateDelay={index * 0.05}
              />
              {item.lineBreak && <br />}
            </span>
          );
        })}
      </div>

      {/* Tapes */}
      <div 
        className="absolute bg-yellow-400/45 z-10 pointer-events-none hidden md:block" 
        style={{ width: 52, height: 18, top: 72, left: 420, transform: 'rotate(-8deg)' }} 
      />
      <div 
        className="absolute bg-yellow-400/45 z-10 pointer-events-none hidden md:block" 
        style={{ width: 38, height: 14, top: 160, right: 180, transform: 'rotate(12deg)' }} 
      />

      {/* Sub headline */}
      <p className="mt-6 font-mono text-xs text-[#888] tracking-[0.1em] max-w-[500px] leading-loose">
        Creative director · UX strategist · Frontend developer<br />
        Mumbai → Berlin → wherever the brief takes me
      </p>

      {/* CTAs */}
      <div className="mt-12 flex gap-4 flex-wrap items-center">
        <a 
          href="#work" 
          className="font-teko text-xl font-bold tracking-widest px-7 py-2.5 bg-ink text-paper border-none -rotate-1 relative overflow-hidden group hover:rotate-0 hover:scale-105 transition-all duration-200"
          data-hover="true"
        >
          <span className="relative z-10">SEE THE WORK</span>
          <div className="absolute inset-0 bg-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-0" />
        </a>
        <a 
          href="#contact" 
          className="font-mono text-xs tracking-[0.15em] px-7 py-2.5 bg-transparent text-ink border-[1.5px] border-ink rotate-1 hover:rotate-0 hover:scale-105 hover:bg-[#e8dcc8] transition-all duration-200"
          data-hover="true"
        >
          get in touch
        </a>
      </div>
    </section>
  );
}
