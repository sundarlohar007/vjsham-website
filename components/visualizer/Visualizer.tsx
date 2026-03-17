'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useVisualizerStore } from '@/lib/store';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uHue;
  uniform float uDistortion;
  uniform float uNoise;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uZoom;
  uniform float uDensity;
  uniform float uFxMix;
  uniform bool uGlitch;
  uniform bool uFlash;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
  }
  
  void main() {
    vec2 uv = vUv;
    float time = uTime * uSpeed;
    
    if (uGlitch) {
      float glitchStrength = sin(time * 50.0) * 0.1;
      uv.x += glitchStrength * step(0.95, sin(time * 10.0));
    }
    
    vec2 center = vec2(0.5);
    float zoomFactor = 0.5 + uZoom * 1.5;
    uv = center + (uv - center) / zoomFactor;
    
    float flash = uFlash ? sin(time * 30.0) * 0.5 + 0.5 : 0.0;
    
    vec3 baseColor = hsl2rgb(vec3(uHue, 0.7, 0.5));
    
    float noise1 = snoise(vec3(uv * (2.0 + uDensity * 8.0), time * 0.5));
    float noise2 = snoise(vec3(uv * (4.0 + uDensity * 8.0), time * 0.3 + 100.0));
    float noise3 = snoise(vec3(uv * (1.0 + uDensity * 4.0), time * 0.7 + 200.0));
    
    vec2 distortedUv = uv;
    if (uDistortion > 0.0) {
      distortedUv.x += sin(uv.y * 10.0 + time) * uDistortion * 0.2;
      distortedUv.y += cos(uv.x * 10.0 + time) * uDistortion * 0.2;
    }
    
    float mixedNoise = mix(
      mix(noise1, noise2, uFxMix),
      noise3,
      0.5
    );
    
    vec3 color1 = baseColor;
    vec3 color2 = hsl2rgb(vec3(mod(uHue + 0.33, 1.0), 0.6, 0.4));
    vec3 color3 = hsl2rgb(vec3(mod(uHue + 0.66, 1.0), 0.5, 0.6));
    
    vec3 finalColor = mix(color1, color2, mixedNoise * 0.5 + 0.5);
    finalColor = mix(finalColor, color3, noise2 * 0.3);
    
    finalColor += (noise1 * uNoise - uNoise * 0.5);
    
    finalColor = pow(finalColor, vec3(1.0 - uIntensity * 0.3));
    finalColor *= uIntensity * 1.5;
    
    finalColor += flash * vec3(1.0);
    
    float vignette = 1.0 - length(vUv - 0.5) * 0.8;
    finalColor *= vignette;
    
    finalColor = clamp(finalColor, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const { hue, density, zoom, speed, intensity } = useVisualizerStore();
  
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1 + Math.random() * zoom * 3;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const hueColor = new THREE.Color();
      hueColor.setHSL(hue + (Math.random() - 0.5) * 0.2, 0.7, 0.5);
      col[i * 3] = hueColor.r;
      col[i * 3 + 1] = hueColor.g;
      col[i * 3 + 2] = hueColor.b;
      
      siz[i] = Math.random() * 0.05 + 0.01;
    }
    
    return [pos, col, siz];
  }, [count, hue, zoom]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        const angle = state.clock.elapsedTime * speed * 0.2;
        positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
        positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
        positions[i3 + 1] = y + Math.sin(state.clock.elapsedTime * speed + i) * 0.01;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { hue, distortion, speed, intensity, noise, fxMix } = useVisualizerStore();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHue: { value: 0.5 },
    uDistortion: { value: 0.2 },
    uNoise: { value: 0.3 },
    uSpeed: { value: 0.5 },
    uIntensity: { value: 0.7 },
    uZoom: { value: 0.5 },
    uDensity: { value: 0.5 },
    uFxMix: { value: 0.5 },
    uGlitch: { value: false },
    uFlash: { value: false },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uHue.value = hue;
      material.uniforms.uDistortion.value = distortion;
      material.uniforms.uNoise.value = noise;
      material.uniforms.uSpeed.value = speed;
      material.uniforms.uIntensity.value = intensity;
      material.uniforms.uZoom.value = 0.5;
      material.uniforms.uDensity.value = 0.5;
      material.uniforms.uFxMix.value = fxMix;
      material.uniforms.uGlitch.value = false;
      material.uniforms.uFlash.value = false;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={5}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  const { intensity } = useVisualizerStore();
  
  return (
    <>
      <color attach="background" args={['#0D0D0D']} />
      <ambientLight intensity={0.5} />
      <FluidPlane />
      <Particles count={isMobile ? 500 : 2000} />
      
      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={intensity * 0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <Noise opacity={0.1} blendFunction={BlendFunction.OVERLAY} />
          <ChromaticAberration
            offset={new THREE.Vector2(0.002 * intensity, 0.002 * intensity)}
          />
        </EffectComposer>
      )}
    </>
  );
}

export default function Visualizer() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ antialias: !isMobile, alpha: false }}
        dpr={isMobile ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
