import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { CameraRig } from './experience/CameraRig';
import { StudioLights } from './experience/StudioLights';
import { PostEffects } from './experience/PostEffects';
import { HeroProduct } from './models/HeroProduct';
import { ParticleField } from './models/ParticleField';
import { useCreativeStore } from '../../store/useCreativeStore';

export function Scene() {
  const setCursorState = useCreativeStore((s) => s.setCursorState);
  const resetCursor = useCreativeStore((s) => s.resetCursor);
  const setIsAutoRotating = useCreativeStore((s) => s.setIsAutoRotating);

  return (
    <div
      className="canvas-stage fixed inset-0 w-full h-full pointer-events-auto z-0"
      onPointerEnter={() => setCursorState('EXPLORE 3D', 'view')}
      onPointerLeave={resetCursor}
      onPointerDown={() => setIsAutoRotating(false)}
      onPointerUp={() => setIsAutoRotating(true)}
    >
      <Canvas
        camera={{ position: [0, 0.2, 4.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <StudioLights />
          <CameraRig />
          <ParticleField count={220} />
          <HeroProduct />

          {/* Contact shadows grounded underneath the headphone */}
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.65}
            scale={8}
            blur={2.4}
            far={4}
            resolution={1024}
            color="#000000"
          />

          {/* Studio HDR reflections */}
          <Environment preset="studio" />

          {/* Post Processing */}
          <PostEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}
