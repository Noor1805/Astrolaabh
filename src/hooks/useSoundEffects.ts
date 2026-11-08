import { useEffect, useRef, useCallback } from 'react';
import { useCreativeStore } from '../store/useCreativeStore';

/**
 * Procedural Web Audio API sound generator for creative e-commerce micro-interactions.
 * Zero external audio file download required, works out of the box with zero latency.
 */
export function useSoundEffects() {
  const isAudioMuted = useCreativeStore((s) => s.isAudioMuted);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // UI Hover sound: high-frequency subtle sine ping
  const playHover = useCallback(() => {
    if (isAudioMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [isAudioMuted, getAudioContext]);

  // UI Click sound: crisp tactile mechanical transient
  const playClick = useCallback(() => {
    if (isAudioMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignored
    }
  }, [isAudioMuted, getAudioContext]);

  // 3D Color switch: futuristic synth filter sweep
  const playColorSwitch = useCallback(() => {
    if (isAudioMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignored
    }
  }, [isAudioMuted, getAudioContext]);

  // Add to cart chime: luxury major triad chord
  const playCartAdd = useCallback(() => {
    if (isAudioMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Ignored
    }
  }, [isAudioMuted, getAudioContext]);

  // Ambient generative drone
  useEffect(() => {
    if (isAudioMuted) {
      if (ambientGainRef.current && audioCtxRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    if (!ambientOscRef.current) {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Deep A1 drone (55Hz)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.setTargetAtTime(0.015, ctx.currentTime, 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        ambientOscRef.current = osc;
        ambientGainRef.current = gain;
      } catch {
        // Ignored
      }
    } else if (ambientGainRef.current) {
      ambientGainRef.current.gain.setTargetAtTime(0.015, ctx.currentTime, 0.8);
    }
  }, [isAudioMuted, getAudioContext]);

  return {
    playHover,
    playClick,
    playColorSwitch,
    playCartAdd,
  };
}
