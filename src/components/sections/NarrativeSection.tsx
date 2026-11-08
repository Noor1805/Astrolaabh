import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gemstoneEditorial from '../../assets/stone.png';
import { useCreativeStore } from '../../store/useCreativeStore';
import { ScrollTrigger } from '../../lib/gsap';

export function NarrativeSection() {
  const sectionRef = useRef<HTMLElement>(null);
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
    <section id="narrative" ref={sectionRef} className="editorial-section relative z-10 grid w-full overflow-hidden">
      <motion.div className="editorial-copy" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <p className="editorial-eyebrow">CURATED GEMSTONES FOR<br />MEANINGFUL CONNECTIONS</p>
        <h2>MORE THAN<br />JUST A STONE</h2>
        <p className="editorial-description">Explore rare, certified<br />gemstones chosen for their<br />beauty, energy, and lasting<br />value.</p>
        <span className="editorial-rule" />
      </motion.div>
      <motion.div className="editorial-image" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <img src={gemstoneEditorial} alt="Blue gemstone in a curated editorial setting" />
      </motion.div>
    </section>
  );
}
