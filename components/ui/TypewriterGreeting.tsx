"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const GREETING_TEXT = "Hello visitor! I am Sai Siddharth Panuganti.";

// Play mechanical key click using synthesized Web Audio API nodes
const playClick = (isSpace: boolean, isMuted: boolean, audioCtxRef: React.MutableRefObject<AudioContext | null>) => {
  if (isMuted) return;
  try {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Noise generator for physical mechanical click clack
    const bufferSize = ctx.sampleRate * 0.04; // 40ms noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(isSpace ? 700 : 1300 + Math.random() * 200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(isSpace ? 0.04 : 0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.035 : 0.025));

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Key pitch body resonance (sine or triangle oscillator)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = isSpace ? "triangle" : "sine";
    osc.frequency.setValueAtTime(isSpace ? 140 : 320 + Math.random() * 80, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.03);

    oscGain.gain.setValueAtTime(isSpace ? 0.07 : 0.1, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.045 : 0.035));

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(now);
    osc.start(now);

    noise.stop(now + 0.05);
    osc.stop(now + 0.05);
  } catch {
    // Fail silently if Audio API is blocked
  }
};

// Play metallic carriage return bell (ting!) using twin-sine waves
const playBell = (isMuted: boolean, audioCtxRef: React.MutableRefObject<AudioContext | null>) => {
  if (isMuted) return;
  try {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Dual sine oscillators to synthesize metallic tone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1380, now);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1830, now);

    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    gain2.gain.setValueAtTime(0.06, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch {
    // Fail silently if Audio API is blocked
  }
};

export default function TypewriterGreeting() {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Typing logic
  useEffect(() => {
    if (displayedCount >= GREETING_TEXT.length) return;

    // Simulate mechanical typewriter rhythm (variable delays)
    const nextChar = GREETING_TEXT[displayedCount];
    const isSpace = nextChar === " ";
    const minDelay = isSpace ? 150 : 40;
    const maxDelay = isSpace ? 250 : 130;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;

    const timer = setTimeout(() => {
      setDisplayedCount((prev) => {
        const next = prev + 1;
        playClick(isSpace, isMuted, audioCtxRef);
        if (next === GREETING_TEXT.length) {
          setTimeout(() => playBell(isMuted, audioCtxRef), 200);
        }
        return next;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedCount, isMuted]);

  const handleToggleSound = () => {
    // Resume audio context inside click gesture to unlock browser block
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.resume();
      }
    } catch {
      // Ignore audio resume errors
    }

    setIsMuted((prev) => !prev);
    setShowTooltip(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center font-mono my-6 relative select-none">
      {/* Typewriter metadata tape / letterhead header decoration */}
      <div className="flex gap-4 items-center justify-center text-[9px] text-ink/40 tracking-[0.2em] uppercase mb-2">
        <span>MODEL: REMINGTON NOISELESS</span>
        <span className="w-1 h-1 bg-ink/30 rounded-full" />
        <span>INK: CHARCOAL DRY</span>
      </div>

      <div className="flex items-center justify-center gap-4 relative py-1 px-4 max-w-full">
        {/* Typewriter content text */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-ink tracking-wide leading-relaxed min-h-[36px] max-w-full flex flex-wrap justify-center">
          {GREETING_TEXT.split("").map((char, index) => {
            if (index >= displayedCount) return null;
            const sinRotate = Math.sin(index * 32.8) * 2.2;
            const sinY = Math.cos(index * 47.3) * 1.3;
            const targetOpacity = 0.85 + Math.sin(index * 19.4) * 0.15;

            return (
              <motion.span
                key={index}
                initial={{ filter: "blur(2.5px)", opacity: 0, scale: 1.3, y: sinY - 2, rotate: sinRotate }}
                animate={{ filter: "blur(0px)", opacity: targetOpacity, scale: 1, y: sinY, rotate: sinRotate }}
                transition={{ duration: 0.28, ease: [0.18, 0.89, 0.32, 1.28] }}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  transformOrigin: "center bottom",
                }}
              >
                {char}
              </motion.span>
            );
          })}

          {/* Typewriter phosphor/ink-spot cursor */}
          {displayedCount < GREETING_TEXT.length && (
            <span className="typewriter-cursor text-red ml-0.5 select-none animate-pulse font-extrabold">
              █
            </span>
          )}
        </h1>

        {/* Vintage Toggle Knob for Typewriter Click Audio */}
        <div className="relative">
          <button
            onClick={handleToggleSound}
            className={`w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center bg-paper-dark hover:bg-paper-light shadow-sm active:scale-95 transition-all text-xs z-10 ${
              !isMuted ? "border-green text-green" : "text-ink/40"
            }`}
            title={isMuted ? "Enable mechanical typing sounds" : "Mute sounds"}
            data-hover="true"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          {/* Micro animation tooltip to invite visitor interaction */}
          {showTooltip && (
            <div className="absolute left-9 top-1/2 -translate-y-1/2 bg-ink text-paper text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm whitespace-nowrap animate-bounce pointer-events-none">
              🔈 Turn on sound
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
