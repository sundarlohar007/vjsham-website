"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Noise,
  HueSaturation,
  ChromaticAberration,
  BrightnessContrast,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { globalControllerState } from "@/lib/ControllerStateContext";

// Need to import types since postprocessing Effects expose properties we want to animate
import type { NoiseEffect, HueSaturationEffect, ChromaticAberrationEffect, BrightnessContrastEffect, GlitchEffect } from "postprocessing";

interface EffectsProps {
  isMobile: boolean;
}

function DesktopEffects() {
  const hueRef = useRef<HueSaturationEffect>(null);
  const glitchRef = useRef<GlitchEffect>(null);
  const distortionRef = useRef<ChromaticAberrationEffect>(null);
  const brightRef = useRef<BrightnessContrastEffect>(null);
  const noiseRef = useRef<NoiseEffect>(null);

  const smoothedKnobs = useRef([...globalControllerState.knobValues]);

  useFrame((state, delta) => {
    try {
      const dt = delta || 0.016;
      const targetKnobs = globalControllerState.knobValues;

      // Smooth all knob values
      for (let i = 0; i < 8; i++) {
        smoothedKnobs.current[i] = THREE.MathUtils.damp(
          smoothedKnobs.current[i],
          targetKnobs[i],
          5,
          dt
        );
      }

    const [kHue, kGlitch, kDistort, kBright, , , , kNoise] = smoothedKnobs.current;

    // 1. Hue Shift (Knob 1: 0-1 mapped to 0-Math.PI*2)
    if (hueRef.current) {
      hueRef.current.hue = kHue * Math.PI * 2;
    }

    // 2. Glitch (Knob 2: 0-1 controls opacity of the glitch effect)
    if (glitchRef.current) {
      glitchRef.current.blendMode.opacity.value = kGlitch;
    }

    // 3. Distortion / Chromatic Aberration (Knob 3: 0-1)
    if (distortionRef.current) {
      const offset = kDistort * 0.02;
      distortionRef.current.offset.set(offset, offset);
    }

      // 4. Brightness
      if (brightRef.current) {
        brightRef.current.brightness = (kBright - 0.5) * 1.5;
      }

      // 8. Noise
      if (noiseRef.current) {
        noiseRef.current.blendMode.opacity.value = kNoise * 0.5;
      }
    } catch (err) {
      console.error("Effect Error", err);
    }
  });

  return (
    <EffectComposer multisampling={4}>
      <HueSaturation ref={hueRef} hue={0} saturation={0} />
      
      <BrightnessContrast ref={brightRef} brightness={0} contrast={0} />
      
      <ChromaticAberration
        ref={distortionRef}
        offset={new THREE.Vector2(0, 0)}
        radialModulation={false}
        modulationOffset={0}
      />
      
      <Glitch
        ref={glitchRef}
        delay={new THREE.Vector2(0.1, 0.3)}
        duration={new THREE.Vector2(0.1, 0.3)}
        strength={new THREE.Vector2(0.1, 0.5)}
        mode={GlitchMode.SPORADIC}
        active
      />
      
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      
      <Noise
        ref={noiseRef}
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0}
      />
    </EffectComposer>
  );
}

function MobileEffects() {
  const hueRef = useRef<HueSaturationEffect>(null);
  const brightRef = useRef<BrightnessContrastEffect>(null);

  const smoothedKnobs = useRef([...globalControllerState.knobValues]);

  useFrame((state, delta) => {
    try {
      const dt = delta || 0.016;
      const targetKnobs = globalControllerState.knobValues;

      // Smooth knobs
      smoothedKnobs.current[0] = THREE.MathUtils.damp(smoothedKnobs.current[0], targetKnobs[0], 5, dt);
      smoothedKnobs.current[3] = THREE.MathUtils.damp(smoothedKnobs.current[3], targetKnobs[3], 5, dt);

      if (hueRef.current) {
        hueRef.current.hue = smoothedKnobs.current[0] * Math.PI * 2;
      }

      if (brightRef.current) {
        brightRef.current.brightness = (smoothedKnobs.current[3] - 0.5) * 1.5;
      }
    } catch (err) {
      console.error("Mobile Effect Error", err);
    }
  });

  return (
    <EffectComposer multisampling={0}>
      <HueSaturation ref={hueRef} hue={0} saturation={0} />
      <BrightnessContrast ref={brightRef} brightness={0} contrast={0} />
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur={false} // Disabled for mobile performance instead of conditionally unmounting
        resolutionScale={0.5} // Downsample Bloom on mobile for speed
      />
    </EffectComposer>
  );
}

export default function Effects({ isMobile }: EffectsProps) {
  return isMobile ? <MobileEffects /> : <DesktopEffects />;
}
