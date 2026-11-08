import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreativeStore } from '../../../store/useCreativeStore';

export function Preloader() {
  const isLoading = useCreativeStore((s) => s.isLoading);
  const finishLoading = useCreativeStore((s) => s.finishLoading);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SHADER ENGINE');

  useEffect(() => {
    const statuses = [
      'INITIALIZING SHADER PIPELINE',
      'COMPILING PBR MATERIALS',
      'LOADING SPATIAL AUDIO RESONATOR',
      'CALIBRATING 3D CAMERA RIG',
      'EXPERIENCE READY',
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const statusIdx = Math.min(Math.floor((next / 100) * statuses.length), statuses.length - 1);
        setStatusText(statuses[statusIdx]);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            finishLoading();
          }, 450);
          return 100;
        }
        return next;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] bg-brand-dark flex flex-col justify-between p-8 md:p-14 select-none"
        >
          {/* Top Brand Header */}
          <div className="flex justify-between items-center text-xs font-mono text-zinc-500 tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              ASTRLABH // CREATIVE LAB
            </span>
            <span>SYSTEM 2026.01</span>
          </div>

          {/* Center Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="overflow-hidden">
              <motion.div
                key={progress}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display font-bold text-7xl md:text-9xl tracking-tighter text-white"
              >
                {String(progress).padStart(3, '0')}
                <span className="text-brand-accent text-3xl md:text-5xl">%</span>
              </motion.div>
            </div>

            <p className="font-mono text-xs text-brand-accent tracking-widest mt-4 uppercase">
              {statusText}
            </p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full">
            <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-brand-accent shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-zinc-500 mt-3 tracking-widest">
              <span>PLANAR MAGNETIC AUDIO ARCHITECTURE</span>
              <span>STANDBY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
