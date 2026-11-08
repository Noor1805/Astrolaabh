import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCreativeStore } from '../../../store/useCreativeStore';
import { CAMERA_WAYPOINTS } from '../../../lib/constants';

export function CameraRig() {
  const currentSection = useCreativeStore((s) => s.currentSection);
  const targetVec = useRef(new THREE.Vector3());
  const lookAtVec = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const waypoint = CAMERA_WAYPOINTS[currentSection] || CAMERA_WAYPOINTS.hero;

    // Mouse parallax offset (subtle floating feel)
    const mouseX = state.pointer.x * 0.25;
    const mouseY = state.pointer.y * 0.2;

    targetVec.current.set(
      waypoint.position[0] + mouseX,
      waypoint.position[1] + mouseY,
      waypoint.position[2]
    );

    lookAtVec.current.set(
      waypoint.target[0] + mouseX * 0.2,
      waypoint.target[1] + mouseY * 0.2,
      waypoint.target[2]
    );

    // Smooth lerp camera movement
    state.camera.position.lerp(targetVec.current, delta * 3.5);
    state.camera.lookAt(lookAtVec.current);
  });

  return null;
}
