import { create } from 'zustand';

export interface VisualizerState {
  // Button states
  glitch: boolean;
  flash: boolean;
  randomize: boolean;
  reset: boolean;
  
  // Knob values (0-1)
  hue: number;
  distortion: number;
  noise: number;
  speed: number;
  
  // Fader values (0-1)
  intensity: number;
  zoom: number;
  density: number;
  fxMix: number;
  
  // Audio state
  audioEnabled: boolean;
  audioStarted: boolean;
  
  // Actions
  setGlitch: (value: boolean) => void;
  setFlash: (value: boolean) => void;
  setRandomize: () => void;
  setReset: () => void;
  setHue: (value: number) => void;
  setDistortion: (value: number) => void;
  setNoise: (value: number) => void;
  setSpeed: (value: number) => void;
  setIntensity: (value: number) => void;
  setZoom: (value: number) => void;
  setDensity: (value: number) => void;
  setFxMix: (value: number) => void;
  toggleAudio: () => void;
  startAudio: () => void;
}

const defaultState = {
  glitch: false,
  flash: false,
  randomize: false,
  reset: false,
  hue: 0.5,
  distortion: 0.2,
  noise: 0.3,
  speed: 0.5,
  intensity: 0.7,
  zoom: 0.5,
  density: 0.5,
  fxMix: 0.5,
  audioEnabled: true,
  audioStarted: false,
};

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  ...defaultState,
  
  setGlitch: (value) => set({ glitch: value }),
  setFlash: (value) => set({ flash: value }),
  setRandomize: () => {
    const state = get();
    set({
      hue: Math.random(),
      distortion: Math.random(),
      noise: Math.random(),
      speed: Math.random(),
      intensity: 0.5 + Math.random() * 0.5,
      zoom: Math.random(),
      density: Math.random(),
      fxMix: Math.random(),
      randomize: true,
    });
    setTimeout(() => set({ randomize: false }), 100);
  },
  setReset: () => set({ ...defaultState, audioEnabled: get().audioEnabled, audioStarted: get().audioStarted }),
  setHue: (value) => set({ hue: value }),
  setDistortion: (value) => set({ distortion: value }),
  setNoise: (value) => set({ noise: value }),
  setSpeed: (value) => set({ speed: value }),
  setIntensity: (value) => set({ intensity: value }),
  setZoom: (value) => set({ zoom: value }),
  setDensity: (value) => set({ density: value }),
  setFxMix: (value) => set({ fxMix: value }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  startAudio: () => set({ audioStarted: true }),
}));
