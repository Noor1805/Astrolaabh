# ASTRLABH // Creative E-Commerce Architecture

An award-winning caliber Creative Development template engineered for luxury 3D e-commerce brands. Built with **React Three Fiber (R3F)**, **Three.js**, **Lenis Smooth Scroll**, **GSAP ScrollTrigger**, **Framer Motion**, **Zustand**, and **Tailwind CSS**.

---

## 🏛️ Project Directory Structure

```text
├── public/
│   ├── audio/              # Sound design assets (ambient loops, UI clicks)
│   ├── fonts/              # Custom brand typography (WOFF2)
│   ├── models/             # 3D glTF/GLB models & Draco-compressed assets
│   └── textures/           # PBR environment HDR maps & roughness maps
│
├── src/
│   ├── App.tsx             # Master application composition & Lenis root
│   ├── main.tsx            # React 18 DOM mount
│   ├── index.css           # Tailwind base, film grain, Lenis styles, glassmorphism
│   ├── vite-env.d.ts       # TypeScript GLSL shader module declarations
│   │
│   ├── components/
│   │   ├── canvas/         # 🌟 WebGL & React Three Fiber World
│   │   │   ├── Scene.tsx               # Master Canvas with DPR, ACES tone mapping & shadows
│   │   │   ├── experience/
│   │   │   │   ├── CameraRig.tsx       # Smooth lerp camera synced to sections & pointer
│   │   │   │   ├── StudioLights.tsx    # Studio lighting rig with reactive cyber accent light
│   │   │   │   └── PostEffects.tsx     # Bloom, Vignette, Chromatic Aberration post-processing
│   │   │   └── models/
│   │   │       ├── HeroProduct.tsx     # Procedural 3D model with live material switcher & exploded view
│   │   │       └── ParticleField.tsx   # Atmospheric cosmic dust particles
│   │   │
│   │   ├── dom/            # 🌐 High-End DOM UI Overlay
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx          # Minimalist haute-tech bar & bag counter
│   │   │   │   └── Footer.tsx          # Kinetic typography marquee & newsletter
│   │   │   └── ui/
│   │   │       ├── AudioController.tsx # Sound equalizer pill with mute/unmute
│   │   │       ├── CartDrawer.tsx      # Slide-over cart drawer with quantity & checkout
│   │   │       ├── CustomCursor.tsx    # Trailing magnetic physics cursor with action badges
│   │   │       ├── MagneticButton.tsx  # Spring-based magnetic hover button
│   │   │       ├── Preloader.tsx       # 0-100% asset loader with curtain wipe
│   │   │       └── ProductConfigurator.tsx # Floating glass HUD (Colorway switcher & Exploded view)
│   │   │
│   │   └── sections/       # 📖 Narrative Storytelling Scroll Chapters
│   │       ├── HeroSection.tsx         # Flagship introduction & 360° interaction hint
│   │       ├── NarrativeSection.tsx    # Chapter 01: Spatial Acoustic Transduction
│   │       ├── CraftsmanshipSection.tsx# Chapter 02: Grade-5 Titanium Metallurgy
│   │       ├── TechSpecsSection.tsx    # Chapter 03: Laboratory Benchmarks & specs grid
│   │       └── CTASection.tsx          # Chapter 04: Allocation reservation & checkout
│   │
│   ├── hooks/
│   │   ├── useLenis.ts         # Lenis smooth scroll synced with GSAP ScrollTrigger
│   │   ├── useMousePosition.ts # Normalized pointer coordinates (-1 to 1) for 3D parallax
│   │   └── useSoundEffects.ts  # Zero-dependency procedural Web Audio synthesizer
│   │
│   ├── lib/
│   │   ├── constants.ts        # Flagship product metadata, camera waypoints & colorways
│   │   ├── gsap.ts             # GSAP core + ScrollTrigger plugin registration
│   │   ├── lenis.ts            # Lenis instance configuration & easing curves
│   │   └── utils.ts            # Class merging (cn), lerp, mapRange, price formatting
│   │
│   ├── shaders/                # ⚡ Custom GLSL Shaders
│   │   ├── hologram.vert       # Holographic vertex transform
│   │   └── hologram.frag       # Fresnel scanline shader
│   │
│   ├── store/                  # 🧠 Reactive State Architecture (Zustand)
│   │   ├── useCartStore.ts     # E-commerce cart items, quantities, subtotal
│   │   └── useCreativeStore.ts # 3D camera waypoints, active colorway, exploded view progress, audio state
│   │
│   └── types/
│       └── index.ts            # Strict TypeScript types for products, specs, and camera rigs
│
├── tailwind.config.js          # Cyber luxury theme palette (dark, neon, accent, gold)
├── vite.config.ts              # Vite + React + GLSL shader loader plugin
└── tsconfig.json               # Path aliases (@/*) and strict type checking
```

---

## 🚀 Key Architectural Pillars

### 1. React Three Fiber & Three.js 3D Engine
- **Persistent Global Canvas**: Single Canvas mounted at `Scene.tsx` running at full viewport behind DOM elements (`pointer-events: none` on text, `pointer-events: auto` on interactive cards and 3D canvas).
- **Interactive Exploded View**: Smoothly interpolates (`explodedProgress` 0 -> 1) the earcups, headband, and internal planar drivers outward to reveal the interior engineering.
- **Dynamic PBR Material Switcher**: Updates roughness, metalness, and emissive neon LED rings in real-time as users switch colorways.
- **Cinematic Post-Processing**: Multisampling bloom, vignette, and subtle chromatic aberration via `@react-three/postprocessing`.

### 2. Smooth Scroll & GSAP Sync
- Uses **Lenis** connected directly to `gsap.ticker` and `ScrollTrigger.update()`.
- Each section acts as a camera waypoint trigger: scrolling down changes the 3D camera angle, focal distance, and target smoothly via lerp.

### 3. Procedural Web Audio System
- Built-in Web Audio API synthesizer (`useSoundEffects.ts`) providing tactile mechanical click SFX, hovering pings, color switch sweeps, and cart addition chimes with **zero external MP3 file download overhead**.

### 4. E-Commerce Cart Engine
- Powered by **Zustand** (`useCartStore.ts`).
- Supports item addition, colorway tracking, dynamic quantity increments, animated slide-over drawer, and celebratory confetti particle bursts on checkout.

---

## 🛠️ Development & Production

```bash
# Start development server with HMR on port 3000
npm run dev

# Build production bundle with TypeScript check
npm run build

# Preview production build locally
npm run preview
```
