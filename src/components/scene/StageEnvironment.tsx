"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { globalControllerState } from "@/lib/ControllerStateContext";

export default function StageEnvironment() {
  const cyanLightRef = useRef<THREE.PointLight>(null);
  const magentaLightRef = useRef<THREE.PointLight>(null);
  const smoothedPulse = useRef(globalControllerState.knobValues[6]);

  useFrame((state) => {
    if (!cyanLightRef.current || !magentaLightRef.current) return;
    const t = state.clock.elapsedTime;
    const dt = state.scene.userData.delta || 0.016;

    smoothedPulse.current = THREE.MathUtils.damp(
      smoothedPulse.current,
      globalControllerState.knobValues[6],
      5,
      dt
    );

    // Base intensity 2, max intensity up to 10 based on pulse and sine wave
    const pulseOffset = Math.sin(t * 8) * 0.5 + 0.5;
    const intensity = 2 + pulseOffset * 8 * smoothedPulse.current;

    cyanLightRef.current.intensity = intensity;
    magentaLightRef.current.intensity = intensity;
  });

  return (
    <group>
      {/* Fog for depth */}
      <fog attach="fog" args={["#0A0A0F", 8, 30]} />

      {/* Ambient light — very low */}
      <ambientLight intensity={0.08} color="#ffffff" />

      {/* Cyan point light — left side */}
      <pointLight
        ref={cyanLightRef}
        position={[-6, 3, -2]}
        color="#00FFFF"
        intensity={2}
        distance={20}
        decay={2}
      />

      {/* Magenta point light — right side */}
      <pointLight
        ref={magentaLightRef}
        position={[6, 3, -2]}
        color="#FF00FF"
        intensity={2}
        distance={20}
        decay={2}
      />

      {/* Subtle top light for fill */}
      <pointLight
        position={[0, 8, 0]}
        color="#1a1a2e"
        intensity={1}
        distance={15}
        decay={2}
      />

      {/* Reflective floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#080810"
          metalness={0.8}
          roughness={0.4}
          envMapIntensity={0.3}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
