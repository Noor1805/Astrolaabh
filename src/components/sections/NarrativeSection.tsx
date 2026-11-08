import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Radio, Zap } from 'lucide-react';
import { useCreativeStore } from '../../store/useCreativeStore';
import { ScrollTrigger } from '../../lib/gsap';

export function NarrativeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setCurrentSection = useCreativeStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection('narrative'),
      onEnterBack: () => setCurrentSection('narrative'),
    });

    return () => trigger.kill();
  }, [setCurrentSection]);

  return (
    <section
      id="narrative"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center p-6 sm:p-14 pointer-events-none z-10"
    >
      <div className="max-w-xl pointer-events-auto glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-accent tracking-widest uppercase">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>CHAPTER 01 // ACOUSTIC ENGINE</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          PLANAR TRANSDUCTION AT 1.2 MICRONS.
        </h2>

        <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
          Traditional dynamic cones produce harmonic distortion at high pressure. The KINETIC-01 employs a proprietary vapor-deposited Beryllium membrane suspended within an array of N52 Neodymium magnets.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 font-mono">
          <div>
            <div className="text-2xl font-bold text-brand-accent">0.002%</div>
            <div className="text-[11px] text-zinc-500 tracking-wider">TOTAL HARMONIC DISTORTION</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">&lt; 1.2ms</div>
            <div className="text-[11px] text-zinc-500 tracking-wider">LOSSLESS LATENCY</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Zap className="w-3.5 h-3.5 text-brand-accent" />
          <span>DSP ROOM-TUNING WITH BIO-SPATIAL HRTF PROFILES</span>
        </div>
      </div>
    </section>
  );
}
