import { Navbar } from './components/dom/layout/Navbar';
import { Footer } from './components/dom/layout/Footer';
import { CartDrawer } from './components/dom/ui/CartDrawer';
import { HeroSection } from './components/sections/HeroSection';
import { NarrativeSection } from './components/sections/NarrativeSection';
import { GallerySection } from './components/sections/GallerySection';
import { WearGemstoneSection } from './components/sections/WearGemstoneSection';
import { HeroMarquee } from './components/sections/HeroMarquee';
import { AppointmentSection } from './components/sections/AppointmentSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { useLenis } from './hooks/useLenis';

export function App() {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="relative min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-black">
      {/* Navigation Header */}
      <Navbar />

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Main Luxury Storytelling & Gemstone Flow */}
      <main className="relative z-10">
        <HeroSection />
        <HeroMarquee />
        <NarrativeSection />
        <GallerySection />
        <WearGemstoneSection />
        <AppointmentSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
