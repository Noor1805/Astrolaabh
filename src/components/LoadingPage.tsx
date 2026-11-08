import { WaterMovingCanvas } from './dom/ui/WaterMovingCanvas';

interface LoadingPageProps {
  onEnter?: () => void;
}

export function LoadingPage({ onEnter }: LoadingPageProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white flex items-center justify-center select-none">
      {/* 
        1. Pure White Background with Serene Golden Water Ripple Canvas:
        - Calm, ultra-thin golden water ripples
        - Pure, meditative, luxurious
      */}
      <WaterMovingCanvas />

      {/* 
        2. Center Composition: Perfectly Centered, Completely Flat Facing
        - Astro Chakra: 3D Embossed Metallic Gold Look, revolving 360° continuously
        - No outer golden line
        - Astrolaabh 3D Metallic Gold Logo in the exact center with generous breathing clearance
      */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none">
        {/* 
          Astro Chakra: 3D embossed metallic gold look, revolving smoothly 360°
          - Completely flat circular dial (no perspective tilt, no hover tilt)
          - Elegant luxury drop shadow giving it raised presence off the white water canvas
        */}
        <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
          <div className="relative w-full h-full rounded-full animate-spin-slow flex items-center justify-center filter drop-shadow-[0_8px_24px_rgba(217,163,60,0.22)]">
            <img
              src="/astro-chakra-3d-gold.png"
              alt="Astro Chakra Zodiac Wheel"
              className="w-full h-full object-contain rounded-full select-none pointer-events-none"
            />
          </div>
        </div>

        {/* 
          ASTROLAABH 3D Metallic Gold Logo: In the exact center
          - Perfectly centered with generous open breathing clearance
          - Crisp drop shadow
        */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
          <div className="relative w-[110px] sm:w-[130px] md:w-[150px] lg:w-[165px] flex items-center justify-center">
            <img
              src="/astrolaabh-logo.png"
              alt="ASTROLAABH"
              className="w-full h-auto object-contain mix-blend-multiply filter drop-shadow-[0_4px_14px_rgba(217,163,60,0.35)] select-none pointer-events-none"
            />

            {/* Subtle Liquid Water Reflection Underneath */}
            <div className="absolute top-full -mt-1 w-full h-4 overflow-hidden pointer-events-none opacity-15 filter blur-[1px] transform scale-y-[-0.5] select-none">
              <img
                src="/astrolaabh-logo.png"
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Skip / Enter Button if onEnter is provided */}
      {onEnter && (
        <div className="absolute top-6 right-6 z-30 pointer-events-auto">
          <button
            onClick={onEnter}
            className="px-4 py-1.5 rounded-full border border-amber-300/80 bg-white/80 hover:bg-white text-amber-900 text-xs font-semibold tracking-widest shadow-sm hover:shadow transition-all flex items-center gap-1.5 font-sans"
          >
            <span>ENTER</span>
            <span className="text-amber-600">➔</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default LoadingPage;
