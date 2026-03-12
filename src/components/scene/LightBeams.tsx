"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalControllerState } from "@/lib/ControllerStateContext";

interface LightBeamsProps {
  beamCount?: number;
}

interface BeamConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  speed: number;
}

const BEAM_CONFIGS: BeamConfig[] = [
  { position: [-4, 6, -3], rotation: [0.3, 0, 0.2], color: "#00FFFF", speed: 0.15 },
  { position: [4, 7, -2], rotation: [-0.2, 0, -0.3], color: "#FF00FF", speed: 0.12 },
  { position: [0, 8, -4], rotation: [0.15, 0.1, 0], color: "#00FFFF", speed: 0.1 },
  { position: [-2, 5, 2], rotation: [-0.1, -0.2, 0.15], color: "#FF00FF", speed: 0.18 },
];

function Beam({ config }: { config: BeamConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  // Local state for smoothing the pulse intensity
  const smoothedPulse = useRef(globalControllerState.knobValues[6]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = state.clock.elapsedTime;
    const dt = state.scene.userData.delta || 0.016;

    // Smooth the pulse value
    smoothedPulse.current = THREE.MathUtils.damp(
      smoothedPulse.current,
      globalControllerState.knobValues[6],
      5,
      dt
    );
    // Slow oscillating rotation
    meshRef.current.rotation.z =
      config.rotation[2] + Math.sin(t * config.speed) * 0.15;
    meshRef.current.rotation.x =
      config.rotation[0] + Math.cos(t * config.speed * 0.8) * 0.1;

    // Apply pulse to opacity (base 0.02 + up to 0.12 based on pulse)
    const baseOpacity = 0.02;
    const pulseOffset = Math.sin(t * 8) * 0.5 + 0.5; // 0 to 1 fast oscillation
    materialRef.current.opacity = baseOpacity + (pulseOffset * 0.1 * smoothedPulse.current);
  });

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
    >
      <coneGeometry args={[1.5, 12, 16, 1, true]} />
      <meshBasicMaterial
        ref={materialRef}
        color={config.color}
        transparent
        opacity={0.04}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LightBeams({ beamCount = 4 }: LightBeamsProps) {
  const configs = BEAM_CONFIGS.slice(0, beamCount);

  return (
    <group>
      {configs.map((config, i) => (
        <Beam key={i} config={config} />
      ))}
    </group>
  );
}
