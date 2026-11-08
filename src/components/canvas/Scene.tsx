import { Canvas } from '@react-three/fiber';
import { ParticleField } from './models/ParticleField';

export function Scene() {
  return (
    <div className="canvas-stage fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={140} />
      </Canvas>
    </div>
  );
}

export default Scene;
