"use client";

import RansomWord from "@/components/ransom/RansomWord";
import { personalInfo, footerMessage } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-[60px] pt-[80px] pb-[120px] relative z-10 w-full border-t border-ink/10">
      <div className="leading-[1.2] mb-12 reveal">
        <RansomWord original="Let's" variant={2} className="!text-[clamp(28px,5vw,56px)]" />
        <RansomWord original="make" variant={7} className="!text-[clamp(28px,5vw,56px)]" />
        <RansomWord original="something" variant={4} className="!text-[clamp(28px,5vw,56px)]" />
        <br className="mb-2" />
        <RansomWord original="worth" variant={10} className="!text-[clamp(28px,5vw,56px)]" />
        <RansomWord original="remembering" variant={5} className="!text-[clamp(28px,5vw,56px)]" />
      </div>

      <div className="flex gap-5 flex-wrap items-center mt-10 reveal">
        <a href={`mailto:${personalInfo.email}`} className="font-mono text-xs text-ink no-underline border-b border-ink pb-0.5 tracking-[0.08em] transition-colors duration-200 cursor-none hover:text-red hover:border-red" data-hover="true">
          {personalInfo.email}
        </a>
        <a href={personalInfo.linkedin} className="font-mono text-xs text-ink no-underline border-b border-ink pb-0.5 tracking-[0.08em] transition-colors duration-200 cursor-none hover:text-red hover:border-red" data-hover="true">
          LinkedIn
        </a>
        <a href={personalInfo.dribbble} className="font-mono text-xs text-ink no-underline border-b border-ink pb-0.5 tracking-[0.08em] transition-colors duration-200 cursor-none hover:text-red hover:border-red" data-hover="true">
          Dribbble
        </a>
        <a href={personalInfo.github} className="font-mono text-xs text-ink no-underline border-b border-ink pb-0.5 tracking-[0.08em] transition-colors duration-200 cursor-none hover:text-red hover:border-red" data-hover="true">
          GitHub
        </a>
      </div>

      <div className="mt-20 font-mono text-[10px] text-[#bbb] tracking-[0.1em] flex justify-between flex-wrap gap-2">
        {footerMessage.map((msg, index) => (
          <span key={index}>{msg}</span>
        ))}
      </div>
    </section>
  );
}
