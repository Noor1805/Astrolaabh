import { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { useCreativeStore } from '../../store/useCreativeStore';
import { ScrollTrigger } from '../../lib/gsap';
import { FLAGSHIP_PRODUCT } from '../../lib/constants';

export function TechSpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setCurrentSection = useCreativeStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection('specs'),
      onEnterBack: () => setCurrentSection('specs'),
    });

    return () => trigger.kill();
  }, [setCurrentSection]);

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center p-6 sm:p-14 pointer-events-none z-10"
    >
      <div className="max-w-4xl mx-auto w-full pointer-events-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-accent tracking-widest uppercase glass-pill px-3 py-1 rounded-full">
            <Activity className="w-3.5 h-3.5" />
            <span>CHAPTER 03 // LABORATORY BENCHMARKS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            ENGINEERED WITHOUT COMPROMISE.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FLAGSHIP_PRODUCT.specs.map((spec) => (
            <div
              key={spec.label}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-accent/40 transition-all duration-300 group"
            >
              <div className="font-mono text-xs text-zinc-500 tracking-wider">
                {spec.label}
              </div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white mt-1 group-hover:text-brand-accent transition-colors">
                {spec.value}
              </div>
              <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-wrap items-center justify-around gap-4 text-center font-mono text-xs text-zinc-400">
          <div>
            <span className="text-white font-bold block text-sm">4Hz – 52kHz</span>
            <span className="text-[10px] text-zinc-500">DYNAMIC RANGE</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <span className="text-white font-bold block text-sm">385 GRAMS</span>
            <span className="text-[10px] text-zinc-500">OPTIMIZED CHASSIS</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <span className="text-white font-bold block text-sm">72 HOURS</span>
            <span className="text-[10px] text-zinc-500">PLAYTIME PER CHARGE</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <span className="text-white font-bold block text-sm">BLE 5.4 LOSSLESS</span>
            <span className="text-[10px] text-zinc-500">WIRELESS PROTOCOL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
