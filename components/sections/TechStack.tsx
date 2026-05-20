"use client";

import RansomWord from "@/components/ransom/RansomWord";
import { techCategories } from "@/lib/data";

interface TechItem {
  name: string;
  color: string;
  label?: string;
}

export default function TechStack() {
  return (
    <section id="stack" className="px-6 md:px-[60px] py-[80px] relative z-10 w-full">
      <div className="flex items-center gap-4 mb-10 font-mono text-[10px] tracking-[0.3em] text-[#aaa] uppercase after:content-[''] after:flex-1 after:h-[1px] after:bg-current after:opacity-30">
        tech stack
      </div>

      <div className="mb-12 reveal">
        <RansomWord original="tools" variant={3} className="!text-[clamp(22px,3.5vw,38px)]" />
        <RansomWord original="I" variant={4} className="!text-[clamp(22px,3.5vw,38px)]" />
        <RansomWord original="actually" variant={10} className="!text-[clamp(22px,3.5vw,38px)]" />
        <RansomWord original="use" variant={12} className="!text-[clamp(22px,3.5vw,38px)]" />
      </div>

      <div className="mt-10">
        {techCategories.map((group, index) => (
          <div key={index} className="mb-8 reveal">
            <div>
              <span className={`inline-block px-2.5 py-0.5 mb-4 font-mono font-bold text-[11px] tracking-[0.15em] uppercase ${group.bgClass}`}>
                {group.category}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {group.items.map((item: TechItem, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3.5 border-[1.5px] border-[#c8b88a] bg-paper-dark relative transition-all duration-200 cursor-none hover:scale-105 hover:-rotate-1 hover:shadow-[4px_4px_0_rgba(26,21,8,0.1)] tech-chip"
                  data-hover="true"
                >
                  {/* Tape randomly on some chips */}
                  {i % 3 === 0 && (
                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 -rotate-1 w-11 h-3.5 bg-yellow-400/50 pointer-events-none" />
                  )}
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-semibold text-[13px] text-ink">{item.name}</div>
                    {item.label && (
                      <div className="text-[9px] text-[#888] tracking-[0.1em] uppercase mt-0.5">{item.label}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
