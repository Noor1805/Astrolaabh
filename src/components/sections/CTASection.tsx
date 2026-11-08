import { useEffect, useRef } from 'react';
import { ShoppingBag, CheckCircle2, Award } from 'lucide-react';
import { useCreativeStore } from '../../store/useCreativeStore';
import { useCartStore } from '../../store/useCartStore';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { ScrollTrigger } from '../../lib/gsap';
import { FLAGSHIP_PRODUCT } from '../../lib/constants';
import { formatPrice } from '../../lib/utils';
import confetti from 'canvas-confetti';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const setCurrentSection = useCreativeStore((s) => s.setCurrentSection);
  const activeColorway = useCreativeStore((s) => s.activeColorway);
  const toggleCart = useCreativeStore((s) => s.toggleCart);

  const addItem = useCartStore((s) => s.addItem);
  const { playHover, playClick, playCartAdd } = useSoundEffects();

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection('cta'),
      onEnterBack: () => setCurrentSection('cta'),
    });

    return () => trigger.kill();
  }, [setCurrentSection]);

  const handleAcquire = () => {
    playCartAdd();
    addItem(FLAGSHIP_PRODUCT, activeColorway, 1);
    toggleCart();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: [activeColorway.hex, activeColorway.emissiveColor, '#ffffff'],
      });
    } catch {
      // Ignored
    }
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center p-6 sm:p-14 pointer-events-none z-10 text-center"
    >
      <div className="max-w-2xl mx-auto pointer-events-auto glass-panel p-8 sm:p-12 rounded-3xl space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-accent tracking-widest uppercase glass-pill px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" />
          <span>ALLOCATION IN PROGRESS</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          SECURE YOUR KINETIC-01
        </h2>

        <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
          Each unit is engraved with a unique serial number and registered onto our immutable authenticity ledger. Shipped in a custom precision-milled aluminum presentation vault.
        </p>

        {/* Selected configuration summary */}
        <div className="flex items-center justify-center gap-4 py-3 px-6 glass-pill rounded-xl max-w-md mx-auto font-mono text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: activeColorway.hex }}
            />
            <span className="text-white font-semibold">{activeColorway.name}</span>
          </div>
          <span className="text-zinc-600">//</span>
          <span className="text-brand-accent font-bold">
            {formatPrice(FLAGSHIP_PRODUCT.price)}
          </span>
        </div>

        {/* Big Action Button */}
        <div className="pt-2">
          <button
            onClick={handleAcquire}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-10 py-4 bg-brand-accent hover:bg-white text-black font-mono font-bold text-sm tracking-widest rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3 mx-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>RESERVE SERIALIZED EDITION</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
            <span>30-DAY IN-HOME TRIAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
            <span>3-YEAR CONCIERGE WARRANTY</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
            <span>WORLDWIDE COURIER EXPRESS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
