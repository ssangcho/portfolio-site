import { useState, useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionValue, useSpring, motion } from 'framer-motion';
import card01Img from './assets/images/Card01.png';
import card02Img from './assets/images/Card02.png';
import heartMp4 from './assets/videos/Airbnb_heartORIGINAL.mp4';
import motionLogicMp4 from './assets/videos/MotionLogic_02_delivery.mp4';
import toggleCurrentMp4 from './assets/videos/MotionLogic_01_Toggle02_A_delivery.mp4';
import toggleSolutionMp4 from './assets/videos/MotionLogic_01_Toggle02_B_delivery.mp4';
import heartLottieData from './assets/lottie/Heart_opt1_400.json';
import toggleLottieData from './assets/lottie/Arbnb_Toggle3_400.json';
import { ReactComponent as Logo } from './assets/images/SanPavicon.svg';
import './App.css';

function HeartToggle() {
  const [isFaved, setIsFaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef(null);
  const containerRef = useRef(null);

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
      animRef.current?.destroy();
    };
  }, []);

  const handleMouseDown = () => {
    if (isPlaying || !animRef.current) return;
    setIsPlaying(true);

    if (!isFaved) {
      animRef.current.playSegments([1, 9], true);
      animRef.current.addEventListener('complete', () => {
        animRef.current.pause();
      }, { once: true });
    } else {
      animRef.current.playSegments([34, 42], true);
      animRef.current.addEventListener('complete', () => {
        animRef.current.pause();
      }, { once: true });
    }
  };

  const handleMouseUp = () => {
    if (!animRef.current) return;

    if (!isFaved) {
      animRef.current.playSegments([9, 34], true);
    } else {
      animRef.current.playSegments([42, 52], true);
    }

    animRef.current.addEventListener('complete', () => {
      setIsFaved(!isFaved);
      setIsPlaying(false);
    }, { once: true });
  };

  return (
    <div
      className="lottie-heart"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}



function ToggleInteractive() {
  const [isOn, setIsOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef(null);
  const containerRef = useRef(null);

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
      animRef.current?.destroy();
    };
  }, []);

  const handleClick = () => {
    if (isPlaying || !animRef.current) return;
    setIsPlaying(true);

    if (!isOn) {
      animRef.current.playSegments([0, 30], true);
    } else {
      animRef.current.playSegments([30, 60], true);
    }

    animRef.current.addEventListener('complete', () => {
      setIsOn(!isOn);
      setIsPlaying(false);
    }, { once: true });
  };

  return (
    <div className="toggle-interactive" onClick={handleClick}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function GiftCards() {
  const sectionRef  = useRef(null);
  const wrapRef     = useRef(null);

  // ── 스크롤 progress (전체 섹션 기준) ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Card 1 — 느리게: 0.2~1.0 구간, Y 60px
  const card1RotateY = useTransform(scrollYProgress, [0.2, 0.55, 1.0], [-40, 6, 25]);
  const card1RotateX = useTransform(scrollYProgress, [0.2, 0.55, 1.0], [18, -5, 8]);
  const card1Y       = useTransform(scrollYProgress, [0.2, 1.0], [60, -160]);

  // Card 2 — 빠르게: 0.0~0.6 구간, Y 120px (카드1 완료 전에 다 올라감)
  const card2RotateY = useTransform(scrollYProgress, [0.0, 0.35, 0.6], [38, -8, -30]);
  const card2RotateX = useTransform(scrollYProgress, [0.0, 0.35, 0.6], [-14, 7, -6]);
  const card2Y       = useTransform(scrollYProgress, [0.0, 0.6], [60, -120]);

  // CTA
  const ctaScale   = useTransform(scrollYProgress, [0.03, 0.2], [0.6, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.03, 0.2], [0, 1]);

  // ── 마우스 tilt ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // spring — 부드럽게 따라옴
  const tiltX = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const tiltY = useSpring(mouseX, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    // 중심에서의 거리를 -12 ~ 12도로 매핑
    mouseX.set(((e.clientX - cx) / (rect.width  / 2)) * 10);
    mouseY.set(((e.clientY - cy) / (rect.height / 2)) * -8);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="gc-scroll-section" ref={sectionRef}>
      <div className="gc-sticky">
        <div className="gc-text-top">
          <h2 className="gc-title">Airbnb<br />gift cards</h2>
          <p className="gc-tagline">Homes. Experiences. Services.<br />There's even more Airbnb to give.</p>
          <motion.button
            className="gc-cta"
            style={{ scale: ctaScale, opacity: ctaOpacity }}
          >
            Buy now
          </motion.button>
        </div>

        <div
          className="gc-cards-wrap"
          ref={wrapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card 1 — 왼쪽 위, 느리게 */}
          <motion.img
            src={card01Img}
            alt="Airbnb gift card illustrated"
            className="gc-img gc-img--back"
            style={{
              rotateY: card1RotateY,
              rotateX: card1RotateX,
              y: card1Y,
              x: tiltX,
            }}
          />
          {/* Card 2 — 오른쪽 아래, 빠르게 + 마우스 tilt 추가 */}
          <motion.img
            src={card02Img}
            alt="Airbnb gift card solid"
            className="gc-img gc-img--front"
            style={{
              rotateY: card2RotateY,
              rotateX: card2RotateX,
              y: card2Y,
              x: tiltY,
            }}
          />
        </div>
      </div>

      <div className="gc-after">
        <div className="gc-text-right">
          <h3 className="section-label">Challenge</h3>
          <p className="section-desc">
            The original Gift Cards page presents a premium product with a static layout — two cards sit flat, no depth, no life.
            A moment that should feel like a gift doesn't feel like one.
          </p>
        </div>

        <div className="gc-text-left">
          <h3 className="section-label">Solution</h3>
          <p className="section-desc">
            Cards respond to scroll, rotating in 3D space as the user moves through the page.
            Motion makes the product feel tactile. The CTA rises into focus at the right moment.
          </p>
        </div>
      </div>
    </section>
  );
}

function TimingNote({ label, ms, desc, sub }) {
  return (
    <div className="tn-row">
      <div className={`tn-tag${sub ? ' tn-tag--sub' : ''}`}>
        <span className="tn-label">{label}</span>
        <span className="tn-divider">|</span>
        <span className="tn-ms">{ms}ms</span>
      </div>
      <p className="tn-desc">{desc}</p>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <a href="https://ssangcho.com/" className="nav-brand">
          <Logo className="logo" />
          <div className="nav-brand-text">
            <span className="nav-brand-name">Sangcho</span>
            <span className="nav-brand-sub">Visual & Motion</span>
          </div>
        </a>
        <div className="nav-links">
          <a href="https://ssangcho.com/">Works</a>
          <a href="https://ssangcho.com/about/">About</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Airbnb UI Motion Studies</h1>
      </header>

      <main className="case-study">

        <h2 className="case-title">01_WISHLIST HEART</h2>
        <p className="case-subtitle">Redesigning the save moment</p>
        <hr className="case-divider" />

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
                <video autoPlay loop muted playsInline className="media media--challenge">
                  <source src={heartMp4} type="video/mp4" />
                </video>
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
          <video autoPlay loop muted playsInline className="full-video">
            <source src={motionLogicMp4} type="video/mp4" />
          </video>
          <div className="timing-notes">
            <TimingNote label="PRESS"   ms={150} desc="Fast enough to feel responsive, not accidental." />
            <TimingNote label="RELEASE" ms={400} desc="Overshoots on purpose. The rebound is how the brain reads completion." />
            <TimingNote label="BURST"   ms={300} desc="Airbnb's own mark, filling up and releasing. Maximum satisfaction at the moment it counts." sub />
          </div>
        </section>

        <hr className="case-divider-thick" />

        <h2 className="case-title">02_TRANSLATION TOGGLE</h2>
        <p className="case-subtitle">Confirmation through motion</p>
        <hr className="case-divider" />

        <section className="section--full">
          <div className="block-challenge">
            <h3 className="section-label">Challenge</h3>
            <p className="section-desc">
              The toggle animates. But the card disappears immediately after. The motion never lands.
              The confirmation is gone before the user can register it.
            </p>
            <div className="toggle-compare">
              <div className="compare-block">
                <video autoPlay loop muted playsInline className="full-video">
                  <source src={toggleCurrentMp4} type="video/mp4" />
                </video>
                <p className="compare-desc"><span className="compare-label-inline">Current: </span>Toggle on, card dismisses in 250ms (cut). User has no time to register the confirmation.</p>
              </div>
            </div>
          </div>

          <div className="block-solution">
            <h3 className="section-label">Solution</h3>
            <p className="section-desc">The same toggle, but the card stays visible. The motion completes before anything closes.</p>

            <div className="toggle-compare">
              <div className="compare-block">
                <video autoPlay loop muted playsInline className="full-video">
                  <source src={toggleSolutionMp4} type="video/mp4" />
                </video>
                <p className="compare-desc"><span className="compare-label-inline">Solution: </span>Toggle on, hold 500ms, fade out 200ms. Action feels acknowledged before disappearing.</p>
              </div>
            </div>
          </div>

          <div className="section-inner">
            <div className="text">
              <h3 className="section-label">Motion Logic</h3>
              <p className="section-desc">The checkmark doesn't just confirm — it arrives with the toggle, making the two feel like one action. 500ms total: long enough to read, short enough to feel instant.</p>
            </div>
            <div className="card-wrap">
              <div className="card">
                <ToggleInteractive />
              </div>
              <p className="try-it"><span className="arrow">↑</span> Try it <span className="arrow">↑</span></p>
            </div>
          </div>
          <div className="timing-notes">
            <TimingNote label="MOVE"    ms={500} desc="Circle travels ease-out. Decelerates into position — feels like it lands, not stops." />
            <TimingNote label="ROTATE"  ms={300} desc="180° spin starts 100ms in. Overlaps with movement — single fluid gesture." sub />
            <TimingNote label="CHECK"   ms={517} desc="Draw-on starts with rotation, completes last. Confirmation arrives at the end, where attention lands." sub />
            <TimingNote label="HOLD"    ms={500} desc="Stays visible long enough to read. Confirmation lands before the modal disappears." />
            <TimingNote label="FADE"    ms={200} desc="ease-out. Closes quietly — the action already registered." sub />
          </div>
        </section>

        <hr className="case-divider-thick" />

        <h2 className="case-title">03_GIFT CARDS</h2>
        <p className="case-subtitle">Making a premium product feel premium</p>
        <hr className="case-divider" />
        <GiftCards />

      </main>
    </div>
  );
}

export default App;
