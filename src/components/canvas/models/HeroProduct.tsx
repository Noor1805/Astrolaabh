import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCreativeStore } from '../../../store/useCreativeStore';

export function HeroProduct() {
  const activeColorway = useCreativeStore((s) => s.activeColorway);
  const explodedProgress = useCreativeStore((s) => s.explodedProgress);
  const isAutoRotating = useCreativeStore((s) => s.isAutoRotating);

  const groupRef = useRef<THREE.Group>(null);
  const leftEarcupRef = useRef<THREE.Group>(null);
  const rightEarcupRef = useRef<THREE.Group>(null);
  const headbandRef = useRef<THREE.Group>(null);
  const leftDriverRef = useRef<THREE.Group>(null);
  const rightDriverRef = useRef<THREE.Group>(null);

  // Materials
  const mainMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const accentMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const driverMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    // Smooth Colorway lerp
    if (mainMatRef.current) {
      mainMatRef.current.color.lerp(new THREE.Color(activeColorway.hex), delta * 5);
      mainMatRef.current.roughness = THREE.MathUtils.lerp(
        mainMatRef.current.roughness,
        activeColorway.roughness,
        delta * 5
      );
      mainMatRef.current.metalness = THREE.MathUtils.lerp(
        mainMatRef.current.metalness,
        activeColorway.metalness,
        delta * 5
      );
    }

    if (accentMatRef.current) {
      accentMatRef.current.emissive.lerp(new THREE.Color(activeColorway.emissiveColor), delta * 5);
      accentMatRef.current.color.lerp(new THREE.Color(activeColorway.emissiveColor), delta * 5);
    }

    // Whole product subtle hover tilt + rotation
    if (groupRef.current) {
      if (isAutoRotating) {
        groupRef.current.rotation.y += delta * 0.35;
      }

      // Mouse tilt
      const targetRotX = state.pointer.y * 0.25;
      const targetRotZ = -state.pointer.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 3);

      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }

    // Exploded View kinematics lerp
    const exp = explodedProgress;

    // Left earcup shifts left
    if (leftEarcupRef.current) {
      leftEarcupRef.current.position.x = THREE.MathUtils.lerp(
        leftEarcupRef.current.position.x,
        -1.35 - exp * 0.9,
        delta * 6
      );
    }

    // Right earcup shifts right
    if (rightEarcupRef.current) {
      rightEarcupRef.current.position.x = THREE.MathUtils.lerp(
        rightEarcupRef.current.position.x,
        1.35 + exp * 0.9,
        delta * 6
      );
    }

    // Headband shifts up
    if (headbandRef.current) {
      headbandRef.current.position.y = THREE.MathUtils.lerp(
        headbandRef.current.position.y,
        0.5 + exp * 0.65,
        delta * 6
      );
    }

    // Drivers slide out along Z
    if (leftDriverRef.current) {
      leftDriverRef.current.position.z = THREE.MathUtils.lerp(
        leftDriverRef.current.position.z,
        exp * 0.6,
        delta * 6
      );
    }
    if (rightDriverRef.current) {
      rightDriverRef.current.position.z = THREE.MathUtils.lerp(
        rightDriverRef.current.position.z,
        exp * 0.6,
        delta * 6
      );
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* ===================== HEADBAND ARCH ===================== */}
      <group ref={headbandRef} position={[0, 0.5, 0]}>
        {/* Main Titanium Band Arch */}
        <mesh position={[0, 0.65, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.35, 0.06, 32, 64, Math.PI]} />
          <meshStandardMaterial
            ref={mainMatRef}
            color={activeColorway.hex}
            roughness={activeColorway.roughness}
            metalness={activeColorway.metalness}
          />
        </mesh>

        {/* Inner Ergonomic Cushion Bar */}
        <mesh position={[0, 0.72, 0]}>
          <torusGeometry args={[1.28, 0.045, 24, 64, Math.PI * 0.75]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.7} metalness={0.1} />
        </mesh>

        {/* Headband Pivot Joints */}
        <mesh position={[-1.35, 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.18, 32]} />
          <meshStandardMaterial color="#333742" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[1.35, 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.18, 32]} />
          <meshStandardMaterial color="#333742" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* ===================== LEFT EARCUP ASSEMBLY ===================== */}
      <group ref={leftEarcupRef} position={[-1.35, 0, 0]}>
        {/* Outer Cup Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.72, 0.68, 0.38, 48]} />
          <meshStandardMaterial
            color={activeColorway.hex}
            roughness={activeColorway.roughness}
            metalness={activeColorway.metalness}
          />
        </mesh>

        {/* Cyber LED Accent Ring */}
        <mesh position={[-0.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.56, 0.025, 24, 48]} />
          <meshStandardMaterial
            ref={accentMatRef}
            color={activeColorway.emissiveColor}
            emissive={activeColorway.emissiveColor}
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Acoustic Cushion Ring (Facing Inward) */}
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.58, 0.14, 24, 48]} />
          <meshStandardMaterial color="#14151a" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Inner Planar Magnetic Driver Core */}
        <group ref={leftDriverRef} position={[0.1, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.48, 0.48, 0.04, 32]} />
            <meshStandardMaterial
              ref={driverMatRef}
              color="#e0b571"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Driver Grille Pattern */}
          <mesh position={[0.03, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[0.15, 0.42, 32]} />
            <meshBasicMaterial color="#08080a" wireframe />
          </mesh>
        </group>
      </group>

      {/* ===================== RIGHT EARCUP ASSEMBLY ===================== */}
      <group ref={rightEarcupRef} position={[1.35, 0, 0]}>
        {/* Outer Cup Shell */}
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.72, 0.68, 0.38, 48]} />
          <meshStandardMaterial
            color={activeColorway.hex}
            roughness={activeColorway.roughness}
            metalness={activeColorway.metalness}
          />
        </mesh>

        {/* Cyber LED Accent Ring */}
        <mesh position={[0.19, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.56, 0.025, 24, 48]} />
          <meshStandardMaterial
            color={activeColorway.emissiveColor}
            emissive={activeColorway.emissiveColor}
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Acoustic Cushion Ring (Facing Inward) */}
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.58, 0.14, 24, 48]} />
          <meshStandardMaterial color="#14151a" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Inner Planar Magnetic Driver Core */}
        <group ref={rightDriverRef} position={[-0.1, 0, 0]}>
          <mesh rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.48, 0.48, 0.04, 32]} />
            <meshStandardMaterial color="#e0b571" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Driver Grille Pattern */}
          <mesh position={[-0.03, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <ringGeometry args={[0.15, 0.42, 32]} />
            <meshBasicMaterial color="#08080a" wireframe />
          </mesh>
        </group>
      </group>

      {/* Shadow Catcher Plane under the product */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}
