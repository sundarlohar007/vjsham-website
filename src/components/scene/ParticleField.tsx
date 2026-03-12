"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalControllerState } from "@/lib/ControllerStateContext";
import { useIsMobile } from "@/hooks/useIsMobile"; // Assuming this import path

interface ParticleFieldProps {
  count?: number;
  mobileCount?: number;
}

export default function ParticleField({
  count = 500,
  mobileCount = 150,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const isMobile = useIsMobile();
  const actualCount = isMobile ? mobileCount : count;

  // Generate maximum possible positions and sizes exactly once per component lifecycle
  const [{ positions, sizes }] = useState(() => {
    const maxParticles = Math.max(count, mobileCount);
    const pos = new Float32Array(maxParticles * 3);
    const sz = new Float32Array(maxParticles);
    for (let i = 0; i < maxParticles; i++) {
      // Spread in a wide volume
      pos[i * 3] = (Math.random() - 0.5) * 30;      // x: -15 to +15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;  // y: -10 to +10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;  // z: -15 to +15
      sz[i] = Math.random() * 2 + 0.5;
    }
    return { positions: pos, sizes: sz };
  });

  // We use a ref to track the smoothed density to avoid re-renders
  const smoothedDensity = useRef(globalControllerState.knobValues[4]);

  // Animate: slow upward drift + gentle oscillation
  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const sizeAttr = geo.attributes.size as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;

    // Smooth density transition
    smoothedDensity.current = THREE.MathUtils.damp(
      smoothedDensity.current,
      globalControllerState.knobValues[4],
      4,
      state.scene.userData.delta || 0.016
    );

    const maxActive = Math.max(1, Math.floor(actualCount * smoothedDensity.current));

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      // Drift up slowly
      posAttr.array[i3 + 1] += 0.003;
      // Gentle horizontal oscillation
      posAttr.array[i3] += Math.sin(time * 0.3 + i * 0.1) * 0.001;
      posAttr.array[i3 + 2] += Math.cos(time * 0.2 + i * 0.15) * 0.001;

      // Reset particles that drift too high
      if (posAttr.array[i3 + 1] > 10) {
        posAttr.array[i3 + 1] = -10;
        posAttr.array[i3] = (Math.random() - 0.5) * 30;
        posAttr.array[i3 + 2] = (Math.random() - 0.5) * 30;
      }

      // Hide particles outside the active density threshold
      if (i > maxActive) {
        sizeAttr.array[i] = THREE.MathUtils.damp(sizeAttr.array[i], 0, 4, 0.016);
      } else {
        // Recover original size (sizes array holds the base size)
        sizeAttr.array[i] = THREE.MathUtils.damp(sizeAttr.array[i], sizes[i], 4, 0.016);
      }
    }
    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    // Slow global rotation
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={actualCount}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={actualCount}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FFFF"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
