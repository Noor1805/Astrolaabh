import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { useCreativeStore } from '../../../store/useCreativeStore';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  cursorLabel?: string;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  className = '',
  cursorLabel = 'SELECT',
  magneticStrength = 0.35,
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playHover, playClick } = useSoundEffects();
  const setCursorState = useCreativeStore((s) => s.setCursorState);
  const resetCursor = useCreativeStore((s) => s.resetCursor);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = btnRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    resetCursor();
  };

  const handleMouseEnter = () => {
    playHover();
    setCursorState(cursorLabel, 'pointer');
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      ref={btnRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center font-mono select-none ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
