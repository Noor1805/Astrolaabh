import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCreativeStore } from '../../../store/useCreativeStore';

export function StudioLights() {
  const activeColorway = useCreativeStore((s) => s.activeColorway);
  const accentLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (accentLightRef.current) {
      // Lerp accent light color to match active colorway emissive
      accentLightRef.current.color.lerp(new THREE.Color(activeColorway.emissiveColor), delta * 4);
    }
  });

  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.65} />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Soft Top/Rim Light */}
      <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#cdd3de" />

      {/* Dynamic Cyber Accent Light */}
      <pointLight
        ref={accentLightRef}
        position={[0, -1.5, 2.5]}
        intensity={3.5}
        distance={8}
        decay={2}
      />

      {/* Under-glow Fill */}
      <pointLight position={[0, -3, 0]} intensity={1.0} color="#101018" />
    </>
  );
}
