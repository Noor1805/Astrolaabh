import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useCreativeStore } from '../../../store/useCreativeStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function AudioController() {
  const isAudioMuted = useCreativeStore((s) => s.isAudioMuted);
  const toggleAudio = useCreativeStore((s) => s.toggleAudio);
  const setCursorState = useCreativeStore((s) => s.setCursorState);
  const resetCursor = useCreativeStore((s) => s.resetCursor);
  const { playClick, playHover } = useSoundEffects();

  const handleToggle = () => {
    playClick();
    toggleAudio();
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => {
        playHover();
        setCursorState(isAudioMuted ? 'UNMUTE AUDIO' : 'MUTE AUDIO', 'pointer');
      }}
      onMouseLeave={resetCursor}
      className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
      title="Toggle Audio Experience"
    >
      {isAudioMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
      )}

      {/* Mini Sound Equalizer Bars */}
      <div className="flex items-center gap-0.5 h-3">
        {[0.8, 0.4, 1.0, 0.6].map((scale, i) => (
          <motion.span
            key={i}
            animate={{
              height: isAudioMuted ? '2px' : ['3px', `${scale * 12}px`, '4px'],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.5 + i * 0.15,
              ease: 'easeInOut',
            }}
            className={`w-[2px] rounded-full ${
              isAudioMuted ? 'bg-zinc-600' : 'bg-brand-accent shadow-[0_0_8px_#00f0ff]'
            }`}
          />
        ))}
      </div>

      <span className="text-[10px] tracking-wider uppercase hidden sm:inline">
        {isAudioMuted ? 'SOUND OFF' : 'SOUND ON'}
      </span>
    </button>
  );
}
