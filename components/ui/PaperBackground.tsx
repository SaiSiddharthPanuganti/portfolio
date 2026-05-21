"use client";

import React from "react";

export default function PaperBackground() {
  return (
    <>
      {/* SVG 3D-Creases/Wrinkles Diffuse Lighting Filter */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="paper-wrinkles">
            {/* Generate fractal noise representing crease folds */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011"
              numOctaves="4"
              result="noise"
            />
            {/* Calculate lighting and shadows of the paper creases based on noise heightmap */}
            <feDiffuseLighting
              in="noise"
              lighting-color="#fdfbf7"
              surfaceScale="2.8"
              diffuseConstant="1.0"
              result="light"
            >
              {/* Directional light from top-left */}
              <feDistantLight azimuth="55" elevation="50" />
            </feDiffuseLighting>
            {/* Blend lighting with the colored paper backdrop */}
            <feBlend mode="multiply" in="SourceGraphic" in2="light" />
          </filter>
        </defs>
      </svg>

      {/* Screen-size background overlay with 3D crumpled filter applied */}
      <div
        className="fixed inset-0 pointer-events-none select-none"
        style={{ filter: "url(#paper-wrinkles)", zIndex: -10 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundColor: "#f5eedc",
            backgroundImage: `
              /* Vertical red margin line */
              linear-gradient(90deg, transparent 0 76px, rgba(200, 39, 30, 0.35) 76px 78px, transparent 78px 100%),
              
              /* Thin vertical grid grain lines */
              repeating-linear-gradient(90deg, rgba(40, 32, 16, 0.07) 0px, rgba(40, 32, 16, 0.07) 1px, transparent 1px, transparent 56px),
              
              /* Organic pulp noise texture overlay */
              url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.055'/%3E%3C/svg%3E"),
              
              /* Aged radial vignette color gradient matching user's reference image */
              radial-gradient(circle, #f3ead5 15%, #e9dabe 45%, #cca572 75%, #a68453 100%)
            `,
            backgroundBlendMode: "normal, normal, normal, normal",
          }}
        />
      </div>
    </>
  );
}
