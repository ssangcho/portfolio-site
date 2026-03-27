import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useControls, Leva } from 'leva';
import card01Glb from '../assets/airbnb/card01.glb';
import card02Glb from '../assets/airbnb/card02.glb';

function SceneLights() {
  const light = useControls('Lighting', {
    ambientIntensity: { value: 3.0, min: 0, max: 3, step: 0.1 },
    dirIntensity: { value: 0.5, min: 0, max: 3, step: 0.1 },
    dirX: { value: 1.5, min: -10, max: 10, step: 0.5 },
    dirY: { value: 2.5, min: -10, max: 10, step: 0.5 },
    dirZ: { value: 5.5, min: -10, max: 10, step: 0.5 },
    envPreset: { value: 'city', options: ['city', 'studio', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'lobby', 'park'] },
    shadowRadius: { value: 14.5, min: 0, max: 20, step: 0.5 },
  });

  return (
    <>
      <ambientLight intensity={light.ambientIntensity} />
      <directionalLight
        position={[light.dirX, light.dirY, light.dirZ]}
        intensity={light.dirIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-radius={light.shadowRadius}
      />
      <Environment preset={light.envPreset} />
    </>
  );
}

function WallShadow() {
  const shadow = useControls('Shadow', {
    posZ: { value: -3.0, min: -8, max: 0, step: 0.1 },
    opacity: { value: 0.10, min: 0, max: 1, step: 0.05 },
    width: { value: 22, min: 1, max: 30, step: 1 },
    height: { value: 12, min: 1, max: 20, step: 1 },
  });

  return (
    <mesh position={[0, 0, shadow.posZ]} receiveShadow>
      <planeGeometry args={[shadow.width, shadow.height]} />
      <shadowMaterial transparent opacity={shadow.opacity} />
    </mesh>
  );
}

function Card3D({ glb, folder, scrollRef, scrollRotY, scrollPosY }) {
  const { scene } = useGLTF(glb);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const meshRef = useRef();
  const deg = Math.PI / 180;

  const pos = useControls(folder, {
    x: { value: folder === 'Card01' ? -0.9 : 1.0, min: -5, max: 5, step: 0.1 },
    z: { value: folder === 'Card01' ? -0.7 : 0.5, min: -3, max: 3, step: 0.1 },
    scale: { value: folder === 'Card01' ? 0.29 : 0.32, min: 0.1, max: 3, step: 0.05 },
    rotX: { value: folder === 'Card01' ? -8 : -21, min: -90, max: 90, step: 1 },
  });

  const mat = useControls(folder + ' Mat', {
    metalness: { value: folder === 'Card01' ? 0.65 : 0.35, min: 0, max: 1, step: 0.05 },
    roughness: { value: folder === 'Card01' ? 0.10 : 0.05, min: 0, max: 1, step: 0.05 },
    envMapIntensity: { value: folder === 'Card01' ? 1.8 : 5.0, min: 0, max: 5, step: 0.1 },
  });

  useEffect(() => {
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        const m = child.material;
        if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
          m.metalness = mat.metalness;
          m.roughness = mat.roughness;
          m.envMapIntensity = mat.envMapIntensity;
          m.needsUpdate = true;
        }
      }
    });
  }, [cloned, mat.metalness, mat.roughness, mat.envMapIntensity]);

  useFrame(() => {
    if (!meshRef.current || !scrollRef) return;
    const t = scrollRef.current;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(scrollRotY[0], scrollRotY[1], t) * deg;
    meshRef.current.position.y = THREE.MathUtils.lerp(scrollPosY[0], scrollPosY[1], t);
  });

  return (
    <primitive
      ref={meshRef}
      object={cloned}
      scale={pos.scale}
      position={[pos.x, scrollPosY[0], pos.z]}
      rotation={[pos.rotX * deg, scrollRotY[0] * deg, 0]}
    />
  );
}

export default function GiftCardsSection() {
  const sectionRef = useRef(null);
  const scrollProgress = useRef(0);
  const [nearView, setNearView] = useState(false);
  const canvasRef = useRef(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNearView(true); io.disconnect(); } },
      { rootMargin: '100% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = (vh - rect.top) / (rect.height + vh);
        scrollProgress.current = Math.max(0, Math.min(1, raw));
        if (canvasRef.current) canvasRef.current.invalidate();
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <Leva hidden />
      <section className="gc-scroll-section" ref={sectionRef}>
        <div className="section-inner">
          <div className="cs-row-inline">
            <div className="block-challenge">
              <h3 className="section-label">Challenge</h3>
              <p className="section-desc">
                The original Gift Cards page presents a premium product with a static layout — two cards sit flat, no depth, no life.
                A moment that should feel like a gift doesn't feel like one.
              </p>
            </div>
            <div className="block-solution">
              <h3 className="section-label">Solution</h3>
              <p className="section-desc">
                Cards respond to scroll, rotating in 3D space as the user moves through the page.
                Motion makes the product feel tactile. The CTA rises into focus at the right moment.
              </p>
            </div>
          </div>
        </div>

        <div className="gc-sticky" style={{ minHeight: '100vh' }}>
          <div className="gc-text-top">
            <h2 className="gc-title">Airbnb<br />gift cards</h2>
            <p className="gc-tagline">Homes. Experiences. Services.<br />There's even more Airbnb to give.</p>
            <button className="gc-cta">Buy now</button>
          </div>

          <div style={{
            position: 'absolute',
            top: 0,
            left: 'calc(-50vw + 50%)',
            width: '100vw',
            height: '100%',
            zIndex: 1,
          }}>
            {nearView && (
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                shadows
                frameloop="demand"
                onCreated={(state) => { canvasRef.current = state; }}
              >
                <color attach="background" args={['#ffffff']} />
                <Suspense fallback={null}>
                  <SceneLights />
                  <WallShadow />
                  <Card3D
                    glb={card01Glb}
                    folder="Card01"
                    scrollRef={scrollProgress}
                    scrollRotY={[43, 10]}
                    scrollPosY={[-0.3, 0.0]}
                  />
                  <Card3D
                    glb={card02Glb}
                    folder="Card02"
                    scrollRef={scrollProgress}
                    scrollRotY={[11, -28]}
                    scrollPosY={[-2.5, -0.3]}
                  />
                </Suspense>
              </Canvas>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
