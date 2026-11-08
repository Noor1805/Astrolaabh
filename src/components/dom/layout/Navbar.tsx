import { ShoppingBag } from 'lucide-react';
import { AudioController } from '../ui/AudioController';
import { useCreativeStore } from '../../../store/useCreativeStore';
import { useCartStore } from '../../../store/useCartStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function Navbar() {
  const toggleCart = useCreativeStore((s) => s.toggleCart);
  const setCursorState = useCreativeStore((s) => s.setCursorState);
  const resetCursor = useCreativeStore((s) => s.resetCursor);
  const items = useCartStore((s) => s.items);
  const { playHover, playClick } = useSoundEffects();

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const scrollToSection = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <a
          href="#"
          onMouseEnter={() => {
            playHover();
            setCursorState('HOME', 'pointer');
          }}
          onMouseLeave={resetCursor}
          className="font-display font-black text-xl tracking-tighter text-white hover:text-brand-accent transition-colors flex items-center gap-1.5"
        >
          <span>ASTRLABH</span>
          <span className="text-brand-accent">//</span>
        </a>
        <span className="hidden md:inline font-mono text-[10px] tracking-widest text-zinc-500 uppercase px-2 py-0.5 border border-zinc-800 rounded">
          CONCEPT LAB 01
        </span>
      </div>

      {/* Center Nav Anchors */}
      <nav className="hidden lg:flex items-center gap-8 glass-pill px-6 py-2 rounded-full pointer-events-auto">
        {[
          { label: 'OVERVIEW', id: 'hero' },
          { label: 'ACOUSTICS', id: 'narrative' },
          { label: 'CRAFTSMANSHIP', id: 'craftsmanship' },
          { label: 'SPECIFICATIONS', id: 'specs' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            onMouseEnter={() => {
              playHover();
              setCursorState('JUMP', 'pointer');
            }}
            onMouseLeave={resetCursor}
            className="font-mono text-xs text-zinc-400 hover:text-white transition-colors tracking-widest uppercase"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <AudioController />

        {/* Cart Bag Button */}
        <button
          onClick={() => {
            playClick();
            toggleCart();
          }}
          onMouseEnter={() => {
            playHover();
            setCursorState('VIEW BAG', 'pointer');
          }}
          onMouseLeave={resetCursor}
          className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 font-mono text-xs text-zinc-300 hover:text-white transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">BAG</span>
          <span className="w-4 h-4 rounded-full bg-brand-accent text-black font-bold text-[10px] flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}
