import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreativeStore } from '../../../store/useCreativeStore';
import { LoadingPage } from '../../LoadingPage';

export function Preloader() {
  const isLoading = useCreativeStore((s) => s.isLoading);
  const finishLoading = useCreativeStore((s) => s.finishLoading);

  useEffect(() => {
    // Automatically dissolve smoothly into the landing page after 4.5 seconds
    const timer = setTimeout(() => {
      finishLoading();
    }, 4500);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="astrolaabh-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[10000] bg-white pointer-events-auto"
        >
          <LoadingPage onEnter={finishLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
