"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RansomWord from "@/components/ransom/RansomWord";
import ScratchReveal from "@/components/sections/ScratchReveal";
import TypewriterGreeting from "@/components/ui/TypewriterGreeting";
import {
  achievements,
  heroWords,
  personalInfo,
  selectedWork,
  techCategories,
  education,
  leadership,
  aboutContent,
  footerMessage,
  ciscoCertifications,
  googleCertifications,
} from "@/lib/data";

export default function Home() {
  const barRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [timeStr, setTimeStr] = useState("");
  const [statusText, setStatusText] = useState("cooking");
  const [coffeeCount, setCoffeeCount] = useState(3);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFlying, setIsFlying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [hasFlightCompleted, setHasFlightCompleted] = useState(false);

  useEffect(() => {
    // Native scroll progress bar
    let rafPending = false;
    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const doc = document.documentElement;
        const progress = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Live clock and status checker for Hyderabad (IST)
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      } as const;
      const formatter = new Intl.DateTimeFormat([], options);
      setTimeStr(formatter.format(new Date()));

      const istHour = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getHours();
      if (istHour >= 9 && istHour < 23) {
        setStatusText("active 🟢");
      } else {
        setStatusText("resting 🌙");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Sync caffeine changes with external listeners (CustomCursor, NoiseBackground)
    window.dispatchEvent(new CustomEvent("caffeine-change", { detail: { level: coffeeCount } }));
  }, [coffeeCount]);

  useEffect(() => {
    // Show success screen only when flight finishes and API call resolves
    if (hasFlightCompleted && !isSending) {
      setIsFlying(false);
      setShowSuccess(true);
    }
  }, [hasFlightCompleted, isSending]);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-paper text-ink"
      style={{ cursor: "none" }}
    >
      <div ref={barRef} className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-red" style={{ transform: "scaleX(0)" }} />

      {/* Interactive Draggable Notebook Stickers */}
      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.05, rotate: 3, zIndex: 100 }}
        className="fixed right-10 top-40 z-30 hidden xl:flex flex-col bg-[#f9f0e0] border border-[#c8b88a] p-3 shadow-md w-40 rotate-2 cursor-grab active:cursor-grabbing font-mono text-[9px] text-ink select-none"
      >
        <div className="w-full border-b border-ink/10 pb-1 mb-2 font-bold flex justify-between items-center">
          <span>STICKY_NOTE.TXT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
        </div>
        <p className="leading-tight text-ink/80">ML builder & full stack dev. drag me anywhere on the canvas!</p>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.1, zIndex: 100 }}
        className="fixed left-6 top-80 z-30 hidden xl:block bg-red text-paper border-2 border-dashed border-paper px-3 py-2 -rotate-12 shadow-lg cursor-grab active:cursor-grabbing font-mono text-[10px] font-bold uppercase tracking-widest select-none"
      >
        📬 OPEN FOR COLLABS
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.1, zIndex: 100 }}
        className="fixed right-16 bottom-44 z-30 hidden xl:flex items-center justify-center bg-green text-[#d8f0d8] border border-ink/10 rounded-full w-20 h-20 -rotate-6 shadow-md cursor-grab active:cursor-grabbing font-mono text-[9px] font-bold text-center uppercase tracking-wider select-none"
      >
        ☕ coffee powered
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-16 md:px-10">
        <TypewriterGreeting />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-ink/20 bg-paper-dark/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em]"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green" />
          open to internships
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <div className={`leading-[1.15] ${coffeeCount >= 5 ? "caffeinated-shake" : ""}`}>
              {heroWords.map((item, index) => {
                const variantNum = Number(item.className.replace("w", "")) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
                return (
                  <span key={item.word + index}>
                    <RansomWord original={item.original} variant={variantNum} animateDelay={index * 0.04} />
                    {item.lineBreak && <br />}
                  </span>
                );
              })}
            </div>
            <p className="mt-6 max-w-xl font-mono text-xs leading-7 text-ink/70">
              {personalInfo.subHeadline} · {personalInfo.location}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="relative rounded-3xl border border-ink/15 bg-paper-dark/70 p-5 shadow-[0_14px_30px_rgba(18,40,74,0.12)] backdrop-blur overflow-hidden"
          >
            {/* Ticket header badge */}
            <div className="absolute top-0 left-0 bg-ink text-paper px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] rounded-br-xl font-bold">
              SYS_TICKET
            </div>

            {/* Tape decoration */}
            <div className="absolute -top-3 right-1/4 w-20 h-5 bg-[#d4c5a0]/50 border-l border-r border-ink/15 backdrop-blur-[1px] rotate-[-3deg] pointer-events-none shadow-sm flex items-center justify-center font-mono text-[10px] text-ink/60 font-bold tracking-wider">
              FAST_ITER
            </div>

            <div className="mt-6 mb-4 flex items-center justify-between border-b border-ink/10 pb-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70 font-semibold">local time (ist)</div>
                <div className="font-mono text-xs font-bold text-red tabular-nums">{timeStr || "12:00:00 AM"}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70 font-semibold">current status</div>
                <div className="font-mono text-xs font-bold text-ink uppercase tracking-wider">{statusText}</div>
              </div>
            </div>

            {/* Quick stats snippet style */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                whileHover={{ scale: 1.03, rotate: -2 }}
                className="rounded-xl border border-ink/15 bg-paper p-3 rotate-[-1deg] shadow-sm hover:shadow-md transition-all"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink/70 font-semibold">Hackathons</div>
                <div className="mt-0.5 font-teko text-2xl leading-none text-red font-bold">4x Winner</div>
                <div className="inline-block mt-1 bg-red/10 text-red px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded-md font-bold">
                  NATIONAL LEVEL
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, rotate: 2 }}
                className="rounded-xl border border-[#c8b88a] bg-paper-light p-3 rotate-[1.5deg] shadow-sm hover:shadow-md transition-all"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink/70 font-semibold">NPTEL Java</div>
                <div className="mt-0.5 font-teko text-2xl leading-none text-ink font-bold">Top 1%</div>
                <div className="inline-block mt-1 bg-green/10 text-green px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded-md font-bold">
                  ELITE + GOLD
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, rotate: -1 }}
                className="rounded-xl border border-ink/15 bg-paper p-3 rotate-[-0.5deg] shadow-sm hover:shadow-md transition-all"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink/70 font-semibold">AI Models</div>
                <div className="mt-0.5 font-teko text-2xl leading-none text-ink font-bold">96.0% Acc</div>
                <div className="inline-block mt-1 bg-ink/10 text-ink/75 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded-md font-bold">
                  DEEPHYPERX
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="rounded-xl border border-[#c8b88a] bg-paper-light p-3 rotate-[0.8deg] shadow-sm hover:shadow-md transition-all"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink/70 font-semibold">Mentorship</div>
                <div className="mt-0.5 font-teko text-2xl leading-none text-red font-bold">100+ Led</div>
                <div className="inline-block mt-1 bg-red/10 text-red px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded-md font-bold">
                  WEB DSAC
                </div>
              </motion.div>
            </div>

            {/* Ticket Tear Separator */}
            <div className="border-t-2 border-dashed border-ink/15 my-4 pt-4" />

            {/* Brewing Console widget */}
            <div className="rounded-2xl border border-ink/15 bg-paper/40 p-4">
              <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
                
                {/* Visual Cup Console */}
                <div className="relative w-16 h-16 flex items-center justify-center bg-paper border border-ink/10 rounded-xl shadow-inner">
                  {/* Rising steam lines */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                    <motion.div 
                      animate={{ y: [0, -10, 0], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: 0.1 }}
                      className="w-[2px] h-4 bg-red/40 rounded-full blur-[0.5px]" 
                    />
                    <motion.div 
                      animate={{ y: [-1, -12, -1], opacity: [0, 0.7, 0], scale: [0.8, 1.3, 0.8] }}
                      transition={{ duration: 2.0, repeat: Infinity, delay: 0.4 }}
                      className="w-[2px] h-6 bg-red/40 rounded-full blur-[0.5px]" 
                    />
                    <motion.div 
                      animate={{ y: [0, -8, 0], opacity: [0, 0.8, 0], scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 1.3, repeat: Infinity, delay: 0.7 }}
                      className="w-[2px] h-3 bg-red/40 rounded-full blur-[0.5px]" 
                    />
                  </div>

                  {/* Cup SVG */}
                  <svg width="44" height="34" viewBox="0 0 44 34" fill="none" className="text-ink mt-3">
                    <path d="M4 1 C4 1, 6 24, 32 24 C32 24, 34 1, 34 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M34 5 C40 5, 42 14, 34 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 29.5 L38 29.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <motion.path 
                      d="M6 8 C6 8, 7.5 22, 30.5 22 C30.5 22, 32 8, 32 8 Z" 
                      fill="#7a431d"
                      initial={{ scaleY: 0.3 }}
                      animate={{ scaleY: Math.min(1.0, coffeeCount / 8) }}
                      className="origin-bottom"
                      transition={{ duration: 0.4 }}
                    />
                  </svg>
                </div>

                {/* Level indicators and status */}
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/80">DEVELOPER_FUEL.CFG</div>
                  
                  {/* Segments */}
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2.5 w-3.5 rounded-sm border border-ink/20 transition-all ${
                          i < coffeeCount 
                            ? (coffeeCount >= 5 ? "bg-red" : "bg-[#7a431d]") 
                            : "bg-paper-dark/30"
                        }`} 
                      />
                    ))}
                  </div>

                  <div className="font-mono text-[10px] text-ink mt-1.5 leading-none font-bold">
                    {coffeeCount >= 5 ? (
                      <span className="text-red font-bold animate-pulse">⚡ OVER-CAFFEINE: {coffeeCount}/8 SHOTS</span>
                    ) : (
                      <span>Caffeine charge: {coffeeCount * 12.5}% ({coffeeCount} shots)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Large Brew Button */}
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => setCoffeeCount(prev => (prev < 8 ? prev + 1 : 1))}
                className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-ink text-paper py-2.5 font-mono text-[11px] uppercase tracking-wider font-bold shadow-[2px_2px_0px_0px_#2a5a2e] transition-all hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_#2a5a2e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-green"
              >
                <span>+ Brew Single Espresso Shot</span>
                <span className="text-xs">☕</span>
              </motion.button>
            </div>

            {/* Resume action button */}
            <div className="mt-4">
              <a 
                href={personalInfo.resumeHref} 
                target="_blank"
                rel="noreferrer"
                data-hover="true"
                className="w-full flex justify-center items-center rounded-xl border border-ink bg-paper py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] font-bold shadow-[2px_2px_0px_0px_#1a1508] transition-all hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1a1508] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Profile / About Section */}
      <section id="about" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-8 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">profile</div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-ink/15 bg-paper-dark/60 p-6 md:p-8 backdrop-blur"
        >
          <div className="max-w-4xl">
            <h2 className="font-playfair text-2xl md:text-3xl font-black italic leading-tight text-ink">
              &ldquo;{aboutContent.body1}&rdquo;
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 border-t border-ink/10 pt-6">
              <div>
                <div className="font-mono text-xs md:text-sm font-bold text-red uppercase tracking-wider mb-2">⭐ Academic Recognition</div>
                <p className="font-sans text-[13px] md:text-sm leading-relaxed text-ink/85 font-semibold">{aboutContent.highlight}</p>
                <p className="font-sans text-[13px] md:text-sm leading-relaxed text-ink/75 mt-2">{aboutContent.body2}</p>
              </div>
              <div>
                <div className="font-mono text-xs md:text-sm font-bold text-green uppercase tracking-wider mb-2">👥 Community Leadership</div>
                <p className="font-sans text-[13px] md:text-sm leading-relaxed text-ink/85 font-semibold">{aboutContent.highlight3}</p>
                <p className="font-sans text-[13px] md:text-sm leading-relaxed text-ink/75 mt-2">{aboutContent.body3}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Work Section (Click to expand) */}
      <section id="work" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">featured work</div>
        <div className="grid gap-6 md:grid-cols-3">
          {selectedWork.map((work, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.article
                key={work.num}
                layout="position"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#c8b88a] bg-paper-dark p-5 shadow-[0_12px_25px_rgba(26,21,8,0.08)] hover:shadow-[0_20px_40px_rgba(26,21,8,0.14)] hover:border-red/40 transition-all duration-300 cursor-pointer select-none"
                style={{ rotate: `${[-0.8, 0.7, -0.4][index % 3]}deg` }}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70 font-bold">{work.tag}</span>
                    <span className="rounded-full bg-red/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-red font-bold">{work.metric}</span>
                  </div>
                  <h3 className="mt-4 font-playfair text-xl font-black leading-tight text-ink group-hover:text-red transition-colors">{work.title}</h3>
                  <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink/75">{work.description}</p>
                  
                  {/* Click to view details prompt */}
                  <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red font-bold group-hover:text-red transition-colors">
                    <span>{isExpanded ? "↓ click to hide details" : "→ click to view details"}</span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="expanded-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 border-t border-ink/5 pt-4">
                          {work.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2 font-sans text-xs leading-relaxed text-ink/80 font-medium">
                              <span className="text-red font-bold">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 pt-4 border-t border-ink/5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {work.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink/70">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <a
                            href={work.link}
                            target="_blank"
                            rel="noreferrer"
                            data-hover="true"
                            className="inline-flex w-full items-center justify-center rounded-xl bg-ink/5 hover:bg-ink/10 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink transition"
                          >
                            view source code ↗
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">stack</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
              className="rounded-2xl border border-ink/15 hover:border-ink/30 bg-paper-dark/80 p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-block rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.15em] ${group.bgClass}`}>
                {group.category}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span
                    key={item.name}
                    data-hover="true"
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2, 
                      rotate: (item.name.length % 2 === 0 ? 1 : -1) * 2,
                      borderColor: item.color || "#ff3333",
                      color: "#1a1508",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                    }}
                    className="rounded-full border border-ink/20 bg-paper px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink/85 cursor-pointer transition-colors duration-200"
                  >
                    {item.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Scratch To Reveal Section */}
      <ScratchReveal />

      {/* Education Timeline Section */}
      <section id="education" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">education</div>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              className="rounded-2xl border border-ink/15 hover:border-red/35 bg-paper-dark/70 p-6 shadow-sm hover:shadow-md relative overflow-hidden backdrop-blur transition-all duration-300"
              style={{ rotate: `${[0.6, -0.6][index % 2]}deg` }}
            >
              <div className="absolute top-0 right-0 bg-red/10 text-red px-3 py-1 font-mono text-[10px] font-bold rounded-bl-xl border-l border-b border-ink/10">
                {edu.metric}
              </div>
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink/65 mb-2">{edu.period}</div>
              <h3 className="font-playfair text-lg font-black leading-tight text-ink">{edu.degree}</h3>
              <div className="font-mono text-xs font-bold text-red mt-1 uppercase tracking-wider">{edu.institution}</div>
              <p className="font-sans text-[13px] md:text-sm leading-relaxed text-ink/80 mt-4 border-t border-ink/10 pt-3">
                {edu.details}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">leadership</div>
        <div className="grid gap-6 md:grid-cols-2">
          {leadership.map((lead, index) => (
            <motion.div
              key={lead.role}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              className="rounded-2xl border border-[#c8b88a] hover:border-green/35 bg-paper-dark p-6 shadow-[0_8px_20px_rgba(26,21,8,0.04)] hover:shadow-[0_15px_30px_rgba(26,21,8,0.08)] transition-all duration-300"
              style={{ rotate: `${[-0.5, 0.5][index % 2]}deg` }}
            >
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.15em] text-ink/65 mb-1">{lead.organization}</div>
              <h3 className="font-playfair text-lg font-black text-ink">{lead.role}</h3>
              <p className="font-sans text-[13px] md:text-sm leading-relaxed text-ink/80 mt-3 border-t border-ink/10 pt-3">
                {lead.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wins / Achievements Section */}
      <section id="achievements" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">wins</div>
        <div className="grid gap-3 md:grid-cols-2">
          {achievements.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              whileHover={{ scale: 1.025, x: index % 2 === 0 ? 6 : -6, y: -2 }}
              className="rounded-xl border border-ink/15 hover:border-red/35 bg-paper-dark/80 p-4 font-sans text-[13px] md:text-sm font-semibold leading-relaxed text-ink/95 hover:shadow-md transition-all duration-300"
            >
              🏆 {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-4 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-red border-b border-dashed border-ink/15 pb-2">certifications</div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Cisco Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-ink/65 mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1BA0D7]" />
              Cisco Networking
            </h3>
            <div className="flex flex-col gap-3.5">
              {ciscoCertifications.map((cert, index) => (
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4, rotate: (index % 2 === 0 ? 0.5 : -0.5), scale: 1.01 }}
                  className="group block rounded-2xl border border-ink/15 hover:border-red/35 bg-paper-dark/70 p-4 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    {/* Inline Cisco Badge Icon */}
                    <div className="flex-shrink-0 flex items-center justify-center bg-paper border border-ink/10 rounded-xl w-12 h-12 shadow-sm text-[#1BA0D7]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="3" y1="16" x2="3" y2="18" />
                        <line x1="6" y1="12" x2="6" y2="18" />
                        <line x1="9" y1="8" x2="9" y2="18" />
                        <line x1="12" y1="6" x2="12" y2="18" />
                        <line x1="15" y1="8" x2="15" y2="18" />
                        <line x1="18" y1="12" x2="18" y2="18" />
                        <line x1="21" y1="16" x2="21" y2="18" />
                      </svg>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink/55 bg-ink/5 px-2 py-0.5 rounded">
                          {cert.issuer}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-ink/65">{cert.issued}</span>
                      </div>
                      <h4 className="mt-1.5 font-playfair text-base font-black leading-tight text-ink group-hover:text-red transition-colors">
                        {cert.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-red font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>verify credential</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Google Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-ink/65 mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              Google Cloud & GenAI
            </h3>
            <div className="flex flex-col gap-3.5">
              {googleCertifications.map((cert, index) => (
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4, rotate: (index % 2 === 0 ? -0.5 : 0.5), scale: 1.01 }}
                  className="group block rounded-2xl border border-ink/15 hover:border-green/35 bg-paper-dark/70 p-4 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    {/* Inline Google G-Badge Icon */}
                    <div className="flex-shrink-0 flex items-center justify-center bg-paper border border-ink/10 rounded-xl w-12 h-12 shadow-sm">
                      <svg width="22" height="22" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.4-.63-.72-1.34-.84-2.06z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink/55 bg-ink/5 px-2 py-0.5 rounded">
                          {cert.issuer}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-ink/65">{cert.issued}</span>
                      </div>
                      <h4 className="mt-1.5 font-playfair text-base font-black leading-tight text-ink group-hover:text-green transition-colors">
                        {cert.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-green font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>verify credential</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section id="contact" className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-10 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-ink/20 bg-ink p-8 text-paper shadow-[0_15px_35px_rgba(18,40,74,0.18)]"
        >
          <div className="font-playfair text-3xl italic leading-tight md:text-4xl">&ldquo;Let&apos;s build something useful.&rdquo;</div>
          
          <div className="grid gap-8 md:grid-cols-2 mt-8 items-start">
            {!showSuccess ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isFlying || isSending) return;
                  setIsFlying(true);
                  setIsSending(true);
                  setSendSuccess(false);
                  setSendError(null);
                  setHasFlightCompleted(false);

                  fetch("/api/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                        setSendSuccess(true);
                      } else {
                        setSendError(data.error || "Failed to send message automatically.");
                      }
                    })
                    .catch((err) => {
                      setSendError(err.message || "A network error occurred.");
                    })
                    .finally(() => {
                      setIsSending(false);
                    });
                }}
                className="grid gap-4 w-full"
              >
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[9px] uppercase tracking-[0.15em] text-paper/60 mb-1.5 font-bold">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-paper/10 border border-paper/20 rounded-xl px-4 py-2.5 font-mono text-xs text-paper placeholder-paper/30 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[9px] uppercase tracking-[0.15em] text-paper/60 mb-1.5 font-bold">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-paper/10 border border-paper/20 rounded-xl px-4 py-2.5 font-mono text-xs text-paper placeholder-paper/30 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-mono text-[9px] uppercase tracking-[0.15em] text-paper/60 mb-1.5 font-bold">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full bg-paper/10 border border-paper/20 rounded-xl px-4 py-2.5 font-mono text-xs text-paper placeholder-paper/30 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all resize-none"
                  />
                </div>

                {/* Pigeon Send Button */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden w-full mt-2 flex items-center justify-center gap-2.5 rounded-xl bg-paper text-ink py-3 font-mono text-[11px] uppercase tracking-[0.15em] font-bold shadow-[2px_2px_0px_0px_#2a5a2e] transition-all hover:bg-paper-light active:shadow-none"
                >
                  <span>Send via Carrier Pigeon</span>
                  {/* Pigeon Icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
                  </svg>
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid gap-5 w-full bg-paper/5 border border-paper/10 rounded-2xl p-5 text-paper"
              >
                {sendSuccess ? (
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🕊️</span>
                    <div>
                      <h4 className="font-playfair text-lg font-black text-paper">Message Sent Directly!</h4>
                      <p className="font-sans text-[13px] text-paper/70 mt-1 leading-relaxed">
                        Your carrier pigeon successfully delivered the message directly to my inbox via the Resend API. I&apos;ll get back to you soon!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🌩️</span>
                    <div>
                      <h4 className="font-playfair text-lg font-black text-red">Pigeon Encountered a Storm!</h4>
                      <p className="font-sans text-[13px] text-paper/70 mt-1 leading-relaxed">
                        Automatic delivery failed ({sendError || "Connection error"}). No worries—your message is safe! Please use the fallbacks below to send it:
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 mt-1">

                  <button
                    type="button"
                    onClick={() => {
                      const fullText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                      navigator.clipboard.writeText(fullText);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-paper bg-ink py-3 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-paper shadow-[2px_2px_0px_0px_#1a1508] transition-all hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1a1508] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <span>{copied ? "Copied! ✓" : "Copy to Clipboard 📋"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowSuccess(false);
                      setSendSuccess(false);
                      setSendError(null);
                      setHasFlightCompleted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-paper/40 hover:text-paper/80 transition-colors font-semibold"
                  >
                    ↺ Send Another Message
                  </button>
                </div>
              </motion.div>
            )}

            {/* Side Callout & Links */}
            <div className="flex flex-col justify-between h-full py-2">
              <div>
                <p className="font-sans text-sm text-paper/70 leading-relaxed">
                  Have an internship opening, a project idea, or just want to say hi? Fill out the form and a carrier pigeon will prepare a draft message to my inbox instantly.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/40 mb-1">Direct Mail</div>
                    <a href={`mailto:${personalInfo.email}`} data-hover="true" className="font-mono text-xs text-paper underline decoration-paper/30 hover:decoration-paper transition-all">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/40 mb-1">Phone Number</div>
                    <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} data-hover="true" className="font-mono text-xs text-paper underline decoration-paper/30 hover:decoration-paper transition-all">
                      {personalInfo.phone}
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/40 mb-1">Professional network</div>
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" data-hover="true" className="font-mono text-xs text-paper underline decoration-paper/30 hover:decoration-paper transition-all">
                      linkedin.com/in/sai-siddharth
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/40 mb-1">Source Code</div>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" data-hover="true" className="font-mono text-xs text-paper underline decoration-paper/30 hover:decoration-paper transition-all">
                      github.com/SaiSiddharthPanuganti
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-12 border-t border-paper/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-paper/45 font-mono text-[9px] uppercase tracking-wider">
            <div>{footerMessage[0]}</div>
            <div>{footerMessage[1]}</div>
            <div>{footerMessage[2]}</div>
          </footer>
        </motion.div>
      </section>

      {/* Full-screen Carrier Pigeon Animation Overlay */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none bg-paper/20 backdrop-blur-[1px] overflow-hidden"
          >
            <motion.div
              initial={{ x: "-20vw", y: "85vh", rotate: -15, scale: 0.8 }}
              animate={{ 
                x: "120vw", 
                y: "15vh", 
                rotate: [0, -10, 5, -15, 0],
                scale: [0.8, 1.2, 1.2, 0.9, 0.7]
              }}
              transition={{ 
                duration: 6.0, 
                ease: [0.4, 0.05, 0.2, 0.95] 
              }}
              onAnimationComplete={() => {
                setHasFlightCompleted(true);
              }}
              className="absolute w-24 h-24 text-ink flex flex-col items-center justify-center"
            >
              {/* Flying Bird SVG */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M16 36C22 36 28 32 34 26C37 23 44 23 46 25L52 26C54 26.5 56 25 56 23C56 22 55 21 54 21L45 20C41 20 37 22 34 25C28 30 22 33 16 33C12 33 8 31 6 29C6 31 10 36 16 36Z" 
                  fill="currentColor" 
                />
                <line x1="33" y1="28" x2="35" y2="33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="36" y1="28" x2="38" y2="33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                
                <g transform="translate(28, 32) rotate(8)">
                  <rect width="16" height="10" rx="1.5" fill="#f9f0e0" stroke="currentColor" strokeWidth="2" />
                  <path d="M0 0 L8 5 L16 0" stroke="currentColor" strokeWidth="2" fill="none" />
                </g>
                
                <motion.path
                  d="M28 25C24 12 16 6 12 6C9 6 8 10 11 16C14 22 21 26 28 25Z"
                  fill="currentColor"
                  style={{ originX: "28px", originY: "25px" }}
                  animate={{ rotate: [-30, 40, -30] }}
                  transition={{ repeat: Infinity, duration: 0.22, ease: "easeInOut" }}
                />
              </svg>
              <span className="font-mono text-[9px] uppercase tracking-wider text-red font-bold mt-1 bg-paper px-2 py-0.5 rounded-full shadow-sm border border-ink/10">
                sending...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
