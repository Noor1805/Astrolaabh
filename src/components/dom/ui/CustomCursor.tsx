import { useEffect, useRef } from 'react';
import { useCreativeStore } from '../../../store/useCreativeStore';

export function CustomCursor() {
  const cursorText = useCreativeStore((s) => s.cursorText);
  const cursorVariant = useCreativeStore((s) => s.cursorVariant);

  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    let animationFrameId: number;

    const render = () => {
      // Smooth lerp trailing follower
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isExpanded = cursorVariant !== 'default' || !!cursorText;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Central sharp point */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-brand-accent pointer-events-none transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />

      {/* Trailing magnetic ring & badge */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -ml-6 -mt-6 rounded-full border border-white/30 pointer-events-none flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'w-24 h-24 -ml-12 -mt-12 bg-white/10 backdrop-blur-md border-brand-accent/50 scale-100 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
            : 'w-12 h-12 scale-75 opacity-40'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] tracking-widest text-brand-accent uppercase font-bold px-2 text-center select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
