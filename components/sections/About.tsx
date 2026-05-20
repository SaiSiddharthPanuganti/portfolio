"use client";

import { aboutContent } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="px-6 md:px-[60px] py-[80px] relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 items-start">
      <div className="reveal">
        <div className="font-[var(--font-cormorant)] text-[clamp(50px,8vw,100px)] font-light italic text-ink leading-[0.9]">
          About
          <span className="block font-[var(--font-josefin)] font-thin not-italic text-[0.38em] tracking-[10px] text-[#888] mt-4 uppercase">
            the<br />person
          </span>
        </div>
      </div>
      
      <div className="font-[var(--font-baskerville)] text-base leading-[1.9] text-[#3a3020] reveal" style={{ transitionDelay: '0.15s' }}>
        <p className="mb-5">
          {aboutContent.body1.replace(aboutContent.highlight, '')}
          <span className="inline bg-[#f5f0c0] px-1">{aboutContent.highlight}</span>
        </p>
        <p className="mb-5">
          {aboutContent.body2.replace(aboutContent.highlight2, '')}
          <span className="inline bg-[#f5f0c0] px-1">{aboutContent.highlight2}</span>
        </p>
        <p>
          {aboutContent.body3.replace(aboutContent.highlight3, '')}
          <span className="inline bg-[#f5f0c0] px-1">{aboutContent.highlight3}</span>
        </p>
      </div>
    </section>
  );
}
