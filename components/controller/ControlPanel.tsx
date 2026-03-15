'use client';

import { useVisualizerStore } from '@/lib/store';
import Knob from './Knob';
import Fader from './Fader';
import Button from './Button';

export default function ControlPanel() {
  const {
    glitch,
    flash,
    randomize,
    reset,
    hue,
    distortion,
    noise,
    speed,
    intensity,
    zoom,
    density,
    fxMix,
    setGlitch,
    setFlash,
    setRandomize,
    setReset,
    setHue,
    setDistortion,
    setNoise,
    setSpeed,
    setIntensity,
    setZoom,
    setDensity,
    setFxMix,
  } = useVisualizerStore();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="
          bg-background/90 backdrop-blur-xl 
          border border-surface-elevated 
          rounded-xl md:rounded-2xl p-3 md:p-6 lg:p-8
          shadow-2xl
          max-h-[55vh] md:max-h-none overflow-y-auto
        ">
          {/* BUTTONS - Mobile: 2x2 grid, Desktop: 4 in row */}
          <div className="mb-3 md:mb-6">
            <div className="flex justify-center md:justify-start lg:justify-center gap-2 md:gap-8 lg:gap-12 mb-2 md:mb-4">
              <span className="font-mono text-[10px] md:text-xs text-foreground-muted uppercase tracking-widest hidden md:block">
                [ BUTTONS ]
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:justify-center md:gap-3 lg:gap-8">
              <Button 
                label="Glitch" 
                variant="glitch"
                active={glitch}
                onClick={() => setGlitch(!glitch)}
              />
              <Button 
                label="Flash" 
                variant="flash"
                active={flash}
                onClick={() => setFlash(!flash)}
              />
              <Button 
                label="Randomize" 
                variant="randomize"
                active={randomize}
                onClick={setRandomize}
              />
              <Button 
                label="Reset" 
                variant="reset"
                active={reset}
                onClick={setReset}
              />
            </div>
          </div>
            
          {/* KNOBS - Mobile: 2x2 grid, Desktop: 4 in row */}
          <div className="mb-3 md:mb-6">
            <div className="flex justify-center md:justify-start lg:justify-center gap-2 md:gap-8 lg:gap-12 mb-2 md:mb-4">
              <span className="font-mono text-[10px] md:text-xs text-foreground-muted uppercase tracking-widest hidden md:block">
                [ KNOBS ]
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:justify-center md:gap-3 lg:gap-12">
              <Knob label="Hue" value={hue} onChange={setHue} color="primary" />
              <Knob label="Distortion" value={distortion} onChange={setDistortion} color="secondary" />
              <Knob label="Noise" value={noise} onChange={setNoise} color="secondary" />
              <Knob label="Speed" value={speed} onChange={setSpeed} color="primary" />
            </div>
          </div>
            
          {/* FADERS - Mobile: 2x2 grid, Desktop: 4 in row */}
          <div className="mb-2 md:mb-0">
            <div className="flex justify-center md:justify-start lg:justify-center gap-2 md:gap-8 lg:gap-12 mb-2 md:mb-4">
              <span className="font-mono text-[10px] md:text-xs text-foreground-muted uppercase tracking-widest hidden md:block">
                [ FADERS ]
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:flex md:justify-center md:gap-3 lg:gap-12">
              <Fader label="Intensity" value={intensity} onChange={setIntensity} />
              <Fader label="Zoom" value={zoom} onChange={setZoom} />
              <Fader label="Density" value={density} onChange={setDensity} />
              <Fader label="FX Mix" value={fxMix} onChange={setFxMix} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
