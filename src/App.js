import { useState, useRef, useEffect } from 'react';
import heartMp4 from './assets/videos/Airbnb_heartORIGINAL.mp4';
import motionLogicMp4 from './assets/videos/MotionLogic_02_delivery.mp4';
import heartLottieData from './assets/lottie/Heart_opt1_400.json';
import toggleLottieData from './assets/lottie/Arbnb_Toggle3_400.json';
import { ReactComponent as Logo } from './SanPavicon.svg';
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


function ToggleComponent() {
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
    return () => { animRef.current?.destroy(); };
  }, []);

  const handleClick = () => {
    if (isPlaying || !animRef.current) return;
    setIsPlaying(true);

    if (!isOn) {
      animRef.current.playSegments([0, 30], true);
    } else {
      animRef.current.playSegments([30, 61], true);
    }

    animRef.current.addEventListener('complete', () => {
      setIsOn(!isOn);
      setIsPlaying(false);
    }, { once: true });
  };

  return (
    <div className="lottie-toggle" onClick={handleClick}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
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
        <Logo className="logo" />
        <div className="nav-links">
          <a href="#works">Works</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Airbnb UI Motion Studies</h1>
      </header>

      <main className="case-study">

        <h2 className="case-title">01_LANGUAGE TOGGLE</h2>
        <p className="case-subtitle">Confirmation through motion</p>
        <hr className="case-divider" />

        <section className="section">
          <div className="text">
            <h3>Challenge</h3>
            <p>
              The toggle animates. But the modal closes immediately after — the motion never lands.
              The confirmation disappears before the user can read it.
            </p>
          </div>
          <div className="card">
            <div style={{ width: 200, height: 200, background: '#f5f5f5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 80, height: 40, background: '#8c8c8c', borderRadius: 20 }} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="text">
            <h3>Solution</h3>
            <p>The same toggle — but the checkmark stays visible. The motion completes before anything closes.</p>
          </div>
          <div className="card-wrap">
            <div className="card">
              <ToggleComponent />
            </div>
            <p className="try-it"><span className="arrow">↑</span> Try it <span className="arrow">↑</span></p>
          </div>
        </section>

        <section className="section--full">
          <h3 className="section-label">Motion Logic</h3>
          <p className="section-desc">The checkmark doesn't just confirm — it arrives with the toggle, making the two feel like one action. 500ms total: long enough to read, short enough to feel instant.</p>
          <div className="timing-notes">
            <TimingNote label="MOVE"    ms={500} desc="Circle travels ease-out. Decelerates into position — feels like it lands, not stops." />
            <TimingNote label="ROTATE"  ms={300} desc="180° spin starts 100ms in. Overlaps with movement — single fluid gesture." sub />
            <TimingNote label="CHECK"   ms={517} desc="Draw-on starts with rotation, completes last. Confirmation arrives at the end, where attention lands." sub />
          </div>
        </section>

        <hr className="case-divider" style={{ margin: '80px 0 48px' }} />

        <h2 className="case-title">02_WISHLIST HEART</h2>
        <p className="case-subtitle">Redesigning the save moment</p>
        <hr className="case-divider" />

        <section className="section">
          <div className="text">
            <h3>Challenge</h3>
            <p>
              The heart fills. It works. But saving a listing is the moment a user thinks: "I want to go here."
              <br />
              That deserves more than a color swap.
            </p>
          </div>
          <div className="card">
            <video autoPlay loop muted playsInline className="media">
              <source src={heartMp4} type="video/mp4" />
            </video>
          </div>
        </section>

        <section className="section">
          <div className="text">
            <h3>Solution</h3>
            <p>A motion that confirms the moment.</p>
          </div>
          <div className="card-wrap">
            <div className="card">
              <HeartToggle />
            </div>
            <p className="try-it"><span className="arrow">↑</span> Try it <span className="arrow">↑</span></p>
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

      </main>
    </div>
  );
}

export default App;
