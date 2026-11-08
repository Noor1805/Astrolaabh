import React from 'react';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import * as THREE from 'three';

const Composer = EffectComposer as unknown as React.ComponentType<any>;
const BloomComp = Bloom as unknown as React.ComponentType<any>;
const VignetteComp = Vignette as unknown as React.ComponentType<any>;
const ChromaticAberrationComp = ChromaticAberration as unknown as React.ComponentType<any>;

export function PostEffects() {
  return (
    <Composer disableNormalPass multisampling={4}>
      <BloomComp
        luminanceThreshold={0.7}
        luminanceSmoothing={0.3}
        intensity={1.2}
        radius={0.8}
        mipmapBlur
      />
      <VignetteComp eskil={false} offset={0.15} darkness={0.8} />
      <ChromaticAberrationComp
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={true}
        modulationOffset={0.3}
      />
    </Composer>
  );
}
