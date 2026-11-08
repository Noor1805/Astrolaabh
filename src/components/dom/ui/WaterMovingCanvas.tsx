import { useEffect, useRef } from 'react';

interface CircularWave {
  x: number;
  y: number;
  startTime: number;
  amplitude: number;
  speed: number;
}

export function WaterMovingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const clickWavesRef = useRef<CircularWave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // User click / touch creates pure golden circular ripple waves
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      clickWavesRef.current.push({
        x: px,
        y: py,
        startTime: performance.now(),
        amplitude: 1.0,
        speed: 0.28,
      });

      if (clickWavesRef.current.length > 6) {
        clickWavesRef.current.shift();
      }
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('touchstart', handlePointerDown);

    let lastFrame = performance.now();

    const render = (now: number) => {
      lastFrame = now;
      const t = now * 0.001;

      const centerX = width / 2;
      const centerY = height / 2;
      const maxDim = Math.max(width, height) * 0.85;

      // 1. Pristine White Foundation
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // 2. Pure Golden Circular Water Waves (Concentric Hairline Rings Expanding from Center)
      const ringCount = 8;
      const ringSpacing = 76; // Calm spacing between expanding rings
      const speed = 34; // Serene expansion speed
      const baseDistance = (t * speed) % ringSpacing;

      ctx.save();
      for (let r = 0; r < ringCount; r++) {
        const radius = baseDistance + r * ringSpacing;
        if (radius < 25 || radius > maxDim) continue;

        // Smooth fade curve: subtle at center, bright in middle, soft at edges
        const fade = Math.sin((radius / maxDim) * Math.PI);
        const waveAlpha = Math.max(0, fade * 0.85);

        // Wave Trough: Ultra-thin delicate shadow
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 0.8, 0, Math.PI * 2);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = `rgba(215, 205, 190, ${waveAlpha * 0.18})`;
        ctx.stroke();

        // Wave Crest: Ultra-thin, crisp golden hairline ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.lineWidth = 0.55;
        ctx.strokeStyle = `rgba(217, 163, 60, ${waveAlpha * 0.65})`;
        ctx.shadowColor = 'rgba(234, 179, 8, 0.2)';
        ctx.shadowBlur = 1;
        ctx.stroke();

        // Inner Sharp Specular Glint (Hairline)
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.max(0.5, radius - 0.6), 0, Math.PI * 2);
        ctx.lineWidth = 0.35;
        ctx.strokeStyle = `rgba(255, 255, 255, ${waveAlpha * 0.85})`;
        ctx.stroke();
      }
      ctx.restore();

      // 3. User Click/Touch Pure Golden Circular Waves (Ultra-Thin Hairline Rings)
      const activeClickWaves: CircularWave[] = [];
      for (let i = 0; i < clickWavesRef.current.length; i++) {
        const wave = clickWavesRef.current[i];
        const elapsed = now - wave.startTime;
        const currentRadius = elapsed * wave.speed;
        const maxRadius = Math.max(width, height) * 0.75;
        const life = currentRadius / maxRadius;

        if (life < 1.0) {
          activeClickWaves.push(wave);

          const fade = Math.pow(1 - life, 1.3) * wave.amplitude;
          const subRings = 4;

          for (let s = 0; s < subRings; s++) {
            const r = currentRadius - s * 36;
            if (r <= 2) continue;

            const alpha = Math.max(0, fade * (1 - s / subRings));

            ctx.save();
            // Trough shadow (Ultra-thin)
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, r + 0.8, 0, Math.PI * 2);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(215, 205, 190, ${alpha * 0.18})`;
            ctx.stroke();

            // Golden Crest (Ultra-Thin Hairline)
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, r, 0, Math.PI * 2);
            ctx.lineWidth = 0.55;
            ctx.strokeStyle = `rgba(217, 163, 60, ${alpha * 0.65})`;
            ctx.shadowColor = 'rgba(234, 179, 8, 0.2)';
            ctx.shadowBlur = 1;
            ctx.stroke();

            // Specular Glint (Hairline)
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, Math.max(0.5, r - 0.6), 0, Math.PI * 2);
            ctx.lineWidth = 0.35;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      clickWavesRef.current = activeClickWaves;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto">
      {/* 60FPS Pure Golden Water Ripple Canvas (No Bubbles, Pure Ripples) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-pointer" />
    </div>
  );
}

export default WaterMovingCanvas;
