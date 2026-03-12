"use client";

import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/useIsMobile";
import { globalControllerState } from "@/lib/ControllerStateContext";
import ParticleField from "./ParticleField";
import LightBeams from "./LightBeams";
import StageEnvironment from "./StageEnvironment";
import Effects from "./Effects";

function CameraController() {
  useFrame((state) => {
    // Map knob (0–1) to Z position (15 to 4)
    const zoomValue = globalControllerState.knobValues[5]; // Knob 6: Zoom
    const targetZ = 15 - zoomValue * 11;
    
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      4,
      state.scene.userData.delta || 0.016
    );
  });

  return null;
}

export default function SceneCanvas() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ fov: 60, position: [0, 2, 8], near: 0.1, far: 50 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      frameloop="always"
    >
      <CameraController />
      <Suspense fallback={null}>
        <StageEnvironment />
        <ParticleField count={isMobile ? 300 : 800} />
        <LightBeams beamCount={isMobile ? 2 : 4} />
        <Effects isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
