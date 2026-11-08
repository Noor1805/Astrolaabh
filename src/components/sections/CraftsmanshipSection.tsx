import { useEffect, useRef } from 'react';
import { Shield, Cpu } from 'lucide-react';
import { useCreativeStore } from '../../store/useCreativeStore';
import { ScrollTrigger } from '../../lib/gsap';

export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setCurrentSection = useCreativeStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection('craftsmanship'),
      onEnterBack: () => setCurrentSection('craftsmanship'),
    });

    return () => trigger.kill();
  }, [setCurrentSection]);

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-end p-6 sm:p-14 pointer-events-none z-10"
    >
      <div className="max-w-xl pointer-events-auto glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-gold tracking-widest uppercase">
          <Shield className="w-3.5 h-3.5" />
          <span>CHAPTER 02 // METALLURGICAL ARTISTRY</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          AEROSPACE GRADE-5 TITANIUM ARCHITECTURE.
        </h2>

        <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
          Milled from a solid billet of Ti-6Al-4V through 14 hours of continuous 5-axis CNC machining. Hand-finished by master artisans in Geneva, the surface exhibits anisotropic reflections with atomic-level tolerances.
        </p>

        <ul className="space-y-3 font-mono text-xs text-zinc-300 pt-2 border-t border-white/10">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <span>SAPPHIRE CRYSTAL CAPACITIVE TOUCH SLIDERS</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <span>BREATHABLE ALCANTARA & VISCOELASTIC MEMORY FOAM</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <span>HERMETICALLY SEALED ACOUSTIC RESONANCE CHAMBERS</span>
          </li>
        </ul>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Cpu className="w-3.5 h-3.5 text-brand-gold" />
          <span>100% MODULAR ARCHITECTURE DESIGNED FOR LIFETIME UPGRADEABILITY</span>
        </div>
      </div>
    </section>
  );
}
