"use client";

import { selectedWork } from "@/lib/data";

export default function WorkSection() {
  const rotations = ["-rotate-1", "rotate-1", "-rotate-0.5"];

  return (
    <section id="work" className="px-6 md:px-[60px] py-[80px] relative z-10 w-full">
      <div className="flex items-center gap-4 mb-10 font-mono text-[10px] tracking-[0.3em] text-[#aaa] uppercase after:content-[''] after:flex-1 after:h-[1px] after:bg-current after:opacity-30">
        selected work
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedWork.map((work, index) => {
          const rot = rotations[index % rotations.length];
          return (
            <div 
              key={index}
              className={`bg-paper-dark border-[1.5px] border-[#c8b88a] p-7 relative transition-all duration-250 cursor-none hover:rotate-0 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[8px_8px_0_rgba(26,21,8,0.12)] reveal ${rot}`}
              data-hover="true"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="font-[var(--font-abril)] text-5xl text-ink/5 absolute top-3 right-4 leading-none">
                {work.num}
              </div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-[#888] uppercase mb-3">
                {work.tag}
              </div>
              <h3 className="font-[var(--font-playfair)] text-2xl font-black text-ink mb-2.5 leading-[1.2]">
                {work.title}
              </h3>
              <p className="font-mono text-[11px] text-[#666] leading-[1.8]">
                {work.description}
              </p>
              <div className="mt-5 font-[var(--font-teko)] text-sm tracking-widest text-red uppercase">
                View case →
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
