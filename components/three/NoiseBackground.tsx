"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 300;
const ORB_COUNT = 4;

const vert = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  attribute float aRandom;
  varying float vOpacity;
  varying float vRandom;

  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    f=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }

  void main(){
    vRandom = aRandom;
    vec3 pos = position;
    float n  = noise(pos.xy*0.34 + uTime*0.08);
    pos.x += sin(uTime*0.32 + pos.y*0.65 + n) * 0.3;
    pos.y += cos(uTime*0.28 + pos.x*0.58 + n) * 0.28;
    pos.y -= uScroll * 0.0023;
    vec2 toMouse = uMouse - pos.xy;
    float dist = length(toMouse);
    float pull = smoothstep(2.6, 0.0, dist) * 0.75;
    pos.xy += normalize(toMouse + 0.001) * pull;
    vOpacity = 0.18 + aRandom * 0.42;
    vec4 mv = modelViewMatrix * vec4(pos,1.0);
    gl_PointSize = (1.8 + aRandom * 3.8) * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = `
  varying float vOpacity;
  varying float vRandom;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    if(length(c) > 0.5) discard;
    vec3 cols[5];
    cols[0]=vec3(0.78,0.15,0.12);
    cols[1]=vec3(0.10,0.08,0.03);
    cols[2]=vec3(0.72,0.53,0.04);
    cols[3]=vec3(0.29,0.10,0.37);
    cols[4]=vec3(0.16,0.35,0.18);
    int idx = int(vRandom * 5.0);
    vec3 col = idx==0?cols[0]:idx==1?cols[1]:idx==2?cols[2]:idx==3?cols[3]:cols[4];
    float alpha = vOpacity * smoothstep(0.5,0.08,length(c));
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function NoiseBackground() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const orbGroup = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scroll = useRef(0);

  const speedRef = useRef(1.0);
  const timeAccumulated = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const handleCaffeine = (e: Event) => {
      const customEvent = e as CustomEvent<{ level: number }>;
      const lvl = customEvent.detail.level;
      if (lvl >= 5) {
        speedRef.current = 1.0 + (lvl - 4) * 0.55;
      } else {
        speedRef.current = 1.0;
      }
    };
    window.addEventListener("caffeine-change", handleCaffeine);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("caffeine-change", handleCaffeine);
    };
  }, []);

  const { positions, randoms } = useMemo(() => {
    const w = viewport.width;
    const h = viewport.height;
    const pos = new Float32Array(COUNT * 3);
    const rnd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * w * 2.3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * h * 2.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      rnd[i] = Math.random();
    }
    return { positions: pos, randoms: rnd };
  }, [viewport.height, viewport.width]);

  const orbPositions = useMemo(
    () =>
      Array.from({ length: ORB_COUNT }, (_, i) => ({
        x: (Math.random() - 0.5) * viewport.width * 1.8,
        y: (Math.random() - 0.5) * viewport.height * 1.8,
        z: -1.5 - Math.random() * 6,
        s: 0.08 + Math.random() * 0.2,
        offset: Math.random() * Math.PI * 2 + i * 0.1,
      })),
    [viewport.height, viewport.width]
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    []
  );

  const frameCount = useRef(0);
  useFrame((state, delta) => {
    if (!mat.current) return;
    frameCount.current++;

    timeAccumulated.current += delta * speedRef.current;
    mat.current.uniforms.uTime.value = timeAccumulated.current;
    mat.current.uniforms.uScroll.value = scroll.current;

    // Only update mouse uniform every 2nd frame
    if (frameCount.current % 2 === 0) {
      const tx = (state.pointer.x * viewport.width) / 2;
      const ty = (state.pointer.y * viewport.height) / 2;
      const u = mat.current.uniforms.uMouse.value;
      u.x += (tx - u.x) * 0.08;
      u.y += (ty - u.y) * 0.08;
    }

    if (orbGroup.current) {
      orbGroup.current.position.y = -scroll.current * 0.0016;
      orbGroup.current.rotation.y = timeAccumulated.current * 0.05;
      orbGroup.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        mesh.rotation.x += (0.0008 + index * 0.00001) * speedRef.current;
        mesh.rotation.y += (0.001  + index * 0.00002) * speedRef.current;
      });
    }
  });

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aRandom" count={COUNT} array={randoms} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={orbGroup}>
        {orbPositions.map((orb, index) => (
          <mesh
            key={index}
            position={[orb.x, orb.y, orb.z]}
            scale={orb.s}
            rotation={[orb.offset, orb.offset * 0.7, orb.offset * 1.2]}
          >
            {index % 2 === 0 ? <icosahedronGeometry args={[1.2, 0]} /> : <torusKnotGeometry args={[0.9, 0.24, 16, 4]} />}
            <meshStandardMaterial
              color={index % 2 === 0 ? "#b8860b" : "#c8271e"}
              emissive={index % 2 === 0 ? "#4a1a5e" : "#12284a"}
              emissiveIntensity={0.25}
              transparent
              opacity={0.2}
              wireframe={index % 3 === 0}
            />
          </mesh>
        ))}
        <ambientLight intensity={0.45} />
        <pointLight color="#c8271e" intensity={0.55} position={[2, 2, 2]} />
        <pointLight color="#12284a" intensity={0.45} position={[-3, -2, 0]} />
      </group>
    </>
  );
}
