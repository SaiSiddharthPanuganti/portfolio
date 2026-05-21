"use client";

import React from "react";

export default function BurntEdges() {
  return (
    <>
      {/* SVG Displacement Filter to organicize and tear edges */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="burnt-edge-filter">
            {/* Generate high-frequency noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018"
              numOctaves="5"
              result="noise"
            />
            {/* Displace the boundary using the noise values */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="38"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Viewport-fixed charred parchment borders */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none">
        {/* Top Edge */}
        <div
          className="absolute left-[-30px] right-[-30px] top-[-25px] h-10 sm:h-14 bg-gradient-to-b from-[#090705] via-[#24150b] via-[#4d321c] to-transparent"
          style={{ filter: "url(#burnt-edge-filter)" }}
        />
        {/* Bottom Edge */}
        <div
          className="absolute left-[-30px] right-[-30px] bottom-[-25px] h-10 sm:h-14 bg-gradient-to-t from-[#090705] via-[#24150b] via-[#4d321c] to-transparent"
          style={{ filter: "url(#burnt-edge-filter)" }}
        />
        {/* Left Edge */}
        <div
          className="absolute top-[-30px] bottom-[-30px] left-[-25px] w-10 sm:w-14 bg-gradient-to-r from-[#090705] via-[#24150b] via-[#4d321c] to-transparent"
          style={{ filter: "url(#burnt-edge-filter)" }}
        />
        {/* Right Edge */}
        <div
          className="absolute top-[-30px] bottom-[-30px] right-[-25px] w-10 sm:w-14 bg-gradient-to-l from-[#090705] via-[#24150b] via-[#4d321c] to-transparent"
          style={{ filter: "url(#burnt-edge-filter)" }}
        />
      </div>

      {/* Background Scorched Patches and Singed Details */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Burn Hole / Scorched Spot 1 - Top Left area */}
        <div
          className="absolute top-[8%] left-[5%] w-32 h-32 opacity-25"
          style={{
            background: "radial-gradient(circle, #050403 0%, #1c1108 30%, #4a311b 60%, transparent 100%)",
            filter: "url(#burnt-edge-filter)",
          }}
        />

        {/* Burn Hole / Scorched Spot 2 - Center Right area */}
        <div
          className="absolute top-[45%] right-[2%] w-44 h-40 opacity-[0.18]"
          style={{
            background: "radial-gradient(circle, #050403 0%, #21130a 35%, #59391e 70%, transparent 100%)",
            filter: "url(#burnt-edge-filter)",
          }}
        />

        {/* Burn Hole / Scorched Spot 3 - Bottom Left area */}
        <div
          className="absolute bottom-[15%] left-[3%] w-36 h-36 opacity-[0.22]"
          style={{
            background: "radial-gradient(circle, #050403 0%, #1c1108 30%, #4a311b 60%, transparent 100%)",
            filter: "url(#burnt-edge-filter)",
          }}
        />
      </div>
    </>
  );
}
