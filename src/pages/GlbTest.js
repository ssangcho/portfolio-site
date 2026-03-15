import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ScrollControls, useScroll, Environment } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';
import card02Glb from '../assets/airbnb/card02.glb';

function Card3D() {
  const { scene } = useGLTF(card02Glb);
  const ref = useRef();
  const scroll = useScroll();

  const mat = useControls('Material v2', {
    metalness: { value: 0.6, min: 0, max: 1, step: 0.05 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.05 },
    envMapIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const m = child.material;
        if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
          m.metalness = mat.metalness;
          m.roughness = mat.roughness;
          m.envMapIntensity = mat.envMapIntensity;
          m.needsUpdate = true;
        }
      }
    });
  }, [scene, mat.metalness, mat.roughness, mat.envMapIntensity]);

  const deg = Math.PI / 180;

  useFrame(() => {
    if (!ref.current) return;
    const t = scroll.offset; // 0 → 1
    ref.current.rotation.set(
      THREE.MathUtils.lerp(7, -14, t) * deg,
      THREE.MathUtils.lerp(2, -45, t) * deg,
      0
    );
  });

  return <primitive ref={ref} object={scene} scale={1} />;
}

function GlbTest() {
  const env = useControls('Env v2', {
    preset: { value: 'studio', options: ['studio', 'city', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'lobby', 'park'] },
  });

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset={env.preset} />
        <ScrollControls pages={3} damping={0.25}>
          <Card3D />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default GlbTest;
