import { Product, CameraWaypoint, SceneSection } from '../types';

export const FLAGSHIP_PRODUCT: Product = {
  id: 'astral-01',
  name: 'ASTRLABH KINETIC-01',
  edition: 'LIMITED AEROSPACE EDITION [01/500]',
  tagline: 'Sound Architecture Reimagined in Three Dimensions',
  description:
    'Forged from aerospace-grade titanium alloy and acoustic sapphire crystal, the KINETIC-01 merges planar-magnetic audio fidelity with generative haptic resonance.',
  price: 1250,
  currency: 'USD',
  rating: 4.98,
  reviewsCount: 142,
  colorways: [
    {
      id: 'obsidian',
      name: 'Obsidian Void',
      hex: '#0d0f14',
      finish: 'metallic',
      roughness: 0.15,
      metalness: 0.95,
      emissiveColor: '#00f0ff',
    },
    {
      id: 'mercury',
      name: 'Liquid Mercury',
      hex: '#cdd3de',
      finish: 'gloss',
      roughness: 0.05,
      metalness: 1.0,
      emissiveColor: '#80d0ff',
    },
    {
      id: 'solaris',
      name: 'Solaris Gold',
      hex: '#d4af37',
      finish: 'metallic',
      roughness: 0.22,
      metalness: 0.9,
      emissiveColor: '#ffaa00',
    },
    {
      id: 'cyber',
      name: 'Hyperion Neon',
      hex: '#ff0055',
      finish: 'iridescent',
      roughness: 0.1,
      metalness: 0.85,
      emissiveColor: '#ff0077',
    },
  ],
  specs: [
    {
      label: 'TRANSDUCER',
      value: '50mm Beryllium Planar',
      detail: 'Ultra-thin 1.2μm diaphragm with zero acoustic phase distortion',
    },
    {
      label: 'FREQUENCY RESPONSE',
      value: '4Hz – 52,000Hz',
      detail: 'Beyond human perception for tactile sub-harmonic resonance',
    },
    {
      label: 'CHASSIS MATERIAL',
      value: 'Grade-5 Ti-6Al-4V',
      detail: 'Precision CNC sculpted single-block aerospace titanium',
    },
    {
      label: 'POWER ARCHITECTURE',
      value: '72hr Fast-Resonance Battery',
      detail: 'Gallium Nitride ultra-fast inductive magnetic dock',
    },
  ],
  features: [
    'Zero-latency lossless wireless link (<1.2ms)',
    'Dual neuro-spatial binaural microphones',
    'Custom DSP parametric room calibration',
    'Sapphire crystal capacitive touch dials',
  ],
};

export const CAMERA_WAYPOINTS: Record<SceneSection, CameraWaypoint> = {
  hero: {
    position: [0, 0.2, 4.2],
    target: [0, 0, 0],
    fov: 42,
  },
  narrative: {
    position: [-2.2, 0.4, 3.4],
    target: [0.5, 0, 0],
    fov: 45,
  },
  craftsmanship: {
    position: [1.8, -0.2, 2.8],
    target: [-0.2, 0.1, 0],
    fov: 38,
  },
  specs: {
    position: [0, 0.1, 3.2],
    target: [0, 0, 0],
    fov: 40,
  },
  cta: {
    position: [0, -0.3, 3.8],
    target: [0, 0.2, 0],
    fov: 44,
  },
};
