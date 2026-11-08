import { Scene } from './components/canvas/Scene';
import { Navbar } from './components/dom/layout/Navbar';
import { Footer } from './components/dom/layout/Footer';
import { CustomCursor } from './components/dom/ui/CustomCursor';
import { Preloader } from './components/dom/ui/Preloader';
import { CartDrawer } from './components/dom/ui/CartDrawer';
import { ProductConfigurator } from './components/dom/ui/ProductConfigurator';
import { HeroSection } from './components/sections/HeroSection';
import { NarrativeSection } from './components/sections/NarrativeSection';
import { CraftsmanshipSection } from './components/sections/CraftsmanshipSection';
import { TechSpecsSection } from './components/sections/TechSpecsSection';
import { CTASection } from './components/sections/CTASection';
import { useLenis } from './hooks/useLenis';

export function App() {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="relative min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-black">
      {/* Subtle Analog Film Grain Texture */}
      <div className="grain-overlay" />

      {/* Bespoke Magnetic Physics Cursor */}
      <CustomCursor />

      {/* Cinematic Asset Preloader */}
      <Preloader />

      {/* Persistent 3D WebGL Canvas (React Three Fiber) */}
      <Scene />

      {/* Navigation Header */}
      <Navbar />

      {/* Floating 3D Material & Exploded View HUD */}
      <ProductConfigurator />

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* DOM Narrative Flow */}
      <main className="relative z-10">
        <HeroSection />
        <NarrativeSection />
        <CraftsmanshipSection />
        <TechSpecsSection />
        <CTASection />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
