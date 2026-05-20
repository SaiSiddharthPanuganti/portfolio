"use client";

import { Canvas } from "@react-three/fiber";
import NoiseBackground from "./NoiseBackground";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <NoiseBackground />
      </Canvas>
    </div>
  );
}
