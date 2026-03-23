import { useRef, useEffect, useMemo, Suspense } from 'react';
import card01Glb from '../assets/airbnb/card01.glb';
import card02Glb from '../assets/airbnb/card02.glb';
import heartMp4 from '../assets/videos/Airbnb_heartORIGINAL.mp4';
import motionLogicMp4 from '../assets/videos/MotionLogic_02_delivery.mp4';
import toggleCurrentMp4 from '../assets/videos/MotionLogic_01_Toggle02_A_delivery.mp4';
import toggleSolutionMp4 from '../assets/videos/MotionLogic_01_Toggle02_B_delivery.mp4';
import heartLottieData from '../assets/lottie/Heart_opt1_400.json';
import toggleLottieData from '../assets/lottie/Arbnb_Toggle3_400.json';
import TimingNote from '../components/TimingNote';
import RoleBlock from '../components/RoleBlock';
import { TypeReveal, ScrollReveal } from '../components/TextReveal';
import LazyVideo from '../components/LazyVideo';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { airbnb } from '../data/siteContent';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useControls, Leva } from 'leva';
import '../App.css';

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
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
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

function HeartToggle() {
  const animRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({ isFaved: false, phase: 'idle' }); // idle | pressing | releasing

  useEffect(() => {
    import('lottie-web').then((lottie) => {
      animRef.current = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: heartLottieData,
      });
      animRef.current.goToAndStop(1, true);
    });

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, []);

  const playRelease = () => {
    if (!animRef.current) return;
    const s = stateRef.current;
    s.phase = 'releasing';
    const segment = s.isFaved ? [42, 52] : [9, 34];
    animRef.current.playSegments(segment, true);

    const onDone = () => {
      animRef.current.removeEventListener('complete', onDone);
      s.isFaved = !s.isFaved;
      s.phase = 'idle';
    };
    animRef.current.addEventListener('complete', onDone);
  };

  const handleMouseDown = () => {
    const s = stateRef.current;
    if (s.phase !== 'idle' || !animRef.current) return;
    s.phase = 'pressing';

    const segment = s.isFaved ? [34, 42] : [1, 9];
    animRef.current.playSegments(segment, true);

    const onPressComplete = () => {
      animRef.current.removeEventListener('complete', onPressComplete);
      animRef.current.pause();
      if (s.phase === 'releasing') {
        // mouseUp already fired while pressing
        playRelease();
      } else {
        s.phase = 'pressed';
      }
    };
    animRef.current.addEventListener('complete', onPressComplete);
  };

  const handleMouseUp = () => {
    const s = stateRef.current;
    if (!animRef.current) return;
    if (s.phase === 'idle') return;
    if (s.phase === 'pressed') {
      playRelease();
    } else {
      // still pressing — mark so onPressComplete triggers release
      s.phase = 'releasing';
    }
  };

  return (
    <div
      className="lottie-heart"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function ToggleInteractive() {
  const animRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({ isOn: false, playing: false });

  useEffect(() => {
    import('lottie-web').then((lottie) => {
      animRef.current = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: toggleLottieData,
      });
      animRef.current.goToAndStop(0, true);
    });

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, []);

  const handleClick = () => {
    const s = stateRef.current;
    if (s.playing || !animRef.current) return;
    s.playing = true;

    const segment = s.isOn ? [30, 60] : [0, 30];
    animRef.current.playSegments(segment, true);

    const onDone = () => {
      animRef.current.removeEventListener('complete', onDone);
      s.isOn = !s.isOn;
      s.playing = false;
    };
    animRef.current.addEventListener('complete', onDone);
  };

  return (
    <div className="toggle-interactive" onClick={handleClick}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function GiftCards() {
  const sectionRef  = useRef(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = section top hits viewport bottom, 1 = section bottom hits viewport top
      const raw = (vh - rect.top) / (rect.height + vh);
      scrollProgress.current = Math.max(0, Math.min(1, raw));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }} shadows>
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
        </div>
      </div>
    </section>
  );
}

function Airbnb() {
  return (
    <div className="app">
      <Leva hidden />
      <Nav />

      <header className="hero">
        <h1><TypeReveal text="Airbnb UI Motion Studies" delay={0.2} /></h1>
      </header>

      <main className="case-study">

        <RoleBlock data={airbnb.role} />

        <ScrollReveal>
          <h2 className="case-title">01_WISHLIST HEART</h2>
          <p className="case-subtitle">Redesigning the save moment</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <section className="section--full">
          <div className="block-challenge">
            <div className="section-inner">
              <div className="text">
                <h3 className="section-label">Challenge</h3>
                <p className="section-desc">
                  The heart fills. It works. But saving a listing is the moment a user thinks: "I want to go here."
                  That deserves more than a color swap.
                </p>
              </div>
              <div className="card">
                <LazyVideo src={heartMp4} className="media media--challenge" />
              </div>
            </div>
          </div>

          <div className="block-solution">
            <div className="section-inner">
              <div className="text">
                <h3 className="section-label">Solution</h3>
                <p className="section-desc">A motion that confirms the moment.</p>
              </div>
              <div className="card-wrap">
                <div className="card">
                  <HeartToggle />
                </div>
                <p className="try-it"><span className="arrow">↑</span> Try it <span className="arrow">↑</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--full">
          <h3 className="section-label">Motion Logic</h3>
          <p className="section-desc">Saving a place is a small emotional peak. The extra 200ms isn't decoration. It's the moment of delight that makes the action feel real.</p>
          <LazyVideo src={motionLogicMp4} className="full-video" />
          <div className="timing-notes">
            <TimingNote label="PRESS"   ms={150} desc="Fast enough to feel responsive, not accidental." />
            <TimingNote label="RELEASE" ms={400} desc="Overshoots on purpose. The rebound is how the brain reads completion." />
            <TimingNote label="BURST"   ms={300} desc="Airbnb's own mark, filling up and releasing. Maximum satisfaction at the moment it counts." sub />
          </div>
        </section>

        <hr className="case-divider-thick" />

        <ScrollReveal>
          <h2 className="case-title">02_TRANSLATION TOGGLE</h2>
          <p className="case-subtitle">Confirmation through motion</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <section className="section--full">
          <div className="block-challenge">
            <h3 className="section-label">Challenge</h3>
            <p className="section-desc">
              The toggle animates. But the card disappears immediately after. The motion never lands.
              The confirmation is gone before the user can register it.
            </p>
            <div className="toggle-compare">
              <div className="compare-block">
                <LazyVideo src={toggleCurrentMp4} className="full-video" />
                <p className="compare-desc"><span className="compare-label-inline">Current: </span>Toggle on, card dismisses in 250ms (cut). User has no time to register the confirmation.</p>
              </div>
            </div>
          </div>

          <div className="block-solution">
            <h3 className="section-label">Solution</h3>
            <p className="section-desc">The same toggle, but the card stays visible. The motion completes before anything closes.</p>

            <div className="toggle-compare">
              <div className="compare-block">
                <LazyVideo src={toggleSolutionMp4} className="full-video" />
                <p className="compare-desc"><span className="compare-label-inline">Solution: </span>Toggle on, hold 500ms, fade out 200ms. Action feels acknowledged before disappearing.</p>
              </div>
            </div>
          </div>

          <div className="section-inner">
            <div className="text">
              <h3 className="section-label">Motion Logic</h3>
              <p className="section-desc">The checkmark doesn't just confirm. It arrives with the toggle, making the two feel like one action. 500ms total: long enough to read, short enough to feel instant.</p>
            </div>
            <div className="card-wrap">
              <div className="card">
                <ToggleInteractive />
              </div>
              <p className="try-it"><span className="arrow">↑</span> Try it <span className="arrow">↑</span></p>
            </div>
          </div>
          <div className="timing-notes">
            <TimingNote label="MOVE"    ms={500} desc="Circle travels ease-out. Decelerates into position. Feels like it lands, not stops." />
            <TimingNote label="ROTATE"  ms={300} desc="180 spin starts 100ms in. Overlaps with movement. Single fluid gesture." sub />
            <TimingNote label="CHECK"   ms={517} desc="Draw-on starts with rotation, completes last. Confirmation arrives at the end, where attention lands." sub />
            <TimingNote label="HOLD"    ms={500} desc="Stays visible long enough to read. Confirmation lands before the modal disappears." />
            <TimingNote label="FADE"    ms={200} desc="ease-out. Closes quietly. The action already registered." sub />
          </div>
        </section>

        <hr className="case-divider-thick" />

        <ScrollReveal>
          <h2 className="case-title">03_GIFT CARDS</h2>
          <p className="case-subtitle">Making a premium product feel premium</p>
          <hr className="case-divider" />
        </ScrollReveal>
        <GiftCards />

      </main>
      <Footer />
    </div>
  );
}

export default Airbnb;
