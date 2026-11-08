import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useCreativeStore } from '../../store/useCreativeStore';
import { ScrollTrigger } from '../../lib/gsap';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setCurrentSection = useCreativeStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection('hero'),
      onEnterBack: () => setCurrentSection('hero'),
    });

    return () => trigger.kill();
  }, [setCurrentSection]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-14 pointer-events-none z-10 pt-28"
    >
      {/* Top Tagline & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-mono text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span>SERIES 2026 // EDITION 01</span>
        </div>

        <div className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase hidden sm:block">
          STATUS: ROTATIONAL SIMULATION ACTIVE
        </div>
      </div>

      {/* Main Kinetic Typography */}
      <div className="my-auto max-w-4xl space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="font-mono text-xs sm:text-sm text-brand-accent tracking-widest uppercase font-semibold">
            [ BESPOKE AUDIO ARCHITECTURE ]
          </span>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white mt-2 leading-[0.95]">
            HAUTE TECH. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
              UNBOUND SOUND.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
        >
          Forged from single-block aerospace titanium and acoustic beryllium drivers. The KINETIC-01 bridges industrial sculpture with generative acoustic fidelity.
        </motion.p>
      </div>

      {/* Bottom Scroll Indicator & Drag Hint */}
      <div className="flex items-end justify-between pointer-events-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-accent" />
          <span className="tracking-widest uppercase">SCROLL TO DISSECT ANATOMY</span>
        </div>

        <div className="glass-pill px-3 py-1.5 rounded-full font-mono text-[11px] text-zinc-400 tracking-wider hidden md:block">
          [ 360° INTERACTIVE 3D STAGE ]
        </div>
      </div>
    </section>
  );
}
