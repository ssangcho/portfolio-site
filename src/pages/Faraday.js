import { useState, useRef, useCallback } from 'react';
import Nav from '../components/Nav';
import { faraday } from '../data/siteContent';
import cidInterior from '../assets/faraday/CID_screenshot.jpg';
import cidDoors from '../assets/faraday/door.png';
import './Faraday.css';

/* ─── Context Image with Parallax ─── */
function ContextImage() {
  const imgRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (imgRef.current) {
      imgRef.current.style.transform = `scale(2.45) translate(${x * -12}px, ${y * -12}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(2.4)';
    }
  }, []);

  return (
    <div
      className="faraday-context-screen"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={cidInterior}
        alt="FF 91 Interior — CID center display"
        className="context-img"
      />
    </div>
  );
}

/* ─── Video Card with Popup ─── */
function VideoCard({ label }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="video-card" onClick={() => setOpen(true)}>
        <div className="video-card__inner">
          <span>{label}</span>
        </div>
        <span className="video-card__hint">Click to expand</span>
      </div>

      {open && (
        <div className="video-popup-overlay" onClick={() => setOpen(false)}>
          <div className="video-popup" onClick={(e) => e.stopPropagation()}>
            <button className="video-popup__close" onClick={() => setOpen(false)}>
              &times;
            </button>
            <div className="video-popup__content">
              <span>{label}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Image Card with Popup ─── */
function ImageCard({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="image-card" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} className="cs-row__img" />
      </div>

      {open && (
        <div className="video-popup-overlay" onClick={() => setOpen(false)}>
          <div className="video-popup video-popup--img" onClick={(e) => e.stopPropagation()}>
            <button className="video-popup__close" onClick={() => setOpen(false)}>
              &times;
            </button>
            <img src={src} alt={alt} className="video-popup__img" />
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Motion Token Table ─── */
function TokenTable() {
  return (
    <div className="token-table-wrap">
      <table className="token-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {faraday.tokenSystem.tokens.map((t) => (
            <tr key={t.name}>
              <td className="token-name">{t.name}</td>
              <td className="token-value">{t.value}</td>
              <td className="token-usage">{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Timing Calculation Diagram ─── */
function TimingCalc() {
  return (
    <div className="timing-calc">
      <div className="calc-flow">
        <div className="calc-step">
          <span className="calc-token">duration.normal</span>
          <span className="calc-label">Tab indicator slides</span>
          <div className="calc-bar calc-bar--300" />
        </div>
        <div className="calc-step">
          <span className="calc-token">duration.fast</span>
          <span className="calc-label">Previous content fades out</span>
          <div className="calc-bar calc-bar--150" />
        </div>
        <div className="calc-step">
          <span className="calc-token">duration.normal + stagger.step x N</span>
          <span className="calc-label">New content staggers in</span>
          <div className="calc-bar calc-bar--300-stagger" />
        </div>
      </div>
      <div className="calc-total">
        <span className="calc-total-label">Total transition</span>
        <span className="calc-total-value">&#8804; 400ms (duration.slow)</span>
      </div>
      <p className="calc-rationale">{faraday.timingCalc.rationale}</p>
    </div>
  );
}

/* ─── Sync Timing Spec ─── */
function SyncSpec() {
  return (
    <div className="sync-spec">
      {faraday.mobileSync.steps.map((s) => (
        <div className="sync-row" key={s.label}>
          <div className="sync-tag">
            <span className="sync-label">{s.label}</span>
            <span className="sync-divider">|</span>
            <span className="sync-ms">{s.ms}</span>
          </div>
          <p className="sync-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
function Faraday() {
  return (
    <div className="app">
      <Nav />

      <header className="hero faraday-hero">
        <h1>{faraday.hero.title.map((line, i) => (
          <span key={i}>{line}{i < faraday.hero.title.length - 1 && <br />}</span>
        ))}</h1>
        <p className="faraday-hero-sub">{faraday.hero.subtitle}</p>
      </header>

      <main className="case-study faraday-case">

        {/* ── Section 00: Context ── */}
        <section className="faraday-context">
          <h2 className="section-label">{faraday.context.label}</h2>
          <p className="section-desc">{faraday.context.desc}</p>
          <ContextImage />
        </section>

        <hr className="case-divider-thick" />

        {/* ── Section 01: Tab Navigation ── */}
        <h2 className="case-title">{faraday.tabNav.title}</h2>
        <p className="case-subtitle">{faraday.tabNav.subtitle}</p>
        <hr className="case-divider" />

        <section className="section--full cs-row">
          <div className="cs-row__text">
            <div className="block-challenge">
              <h3 className="section-label">Challenge</h3>
              <p className="section-desc">{faraday.tabNav.challenge}</p>
            </div>
            <div className="block-solution">
              <h3 className="section-label">Solution</h3>
              <p className="section-desc">{faraday.tabNav.solution}</p>
            </div>
          </div>
          <div className="cs-row__media">
            <ImageCard src={cidDoors} alt="CID Doors screen" />
          </div>
        </section>

        {/* ── Motion Token System ── */}
        <section className="section--full faraday-tokens">
          <h3 className="section-label">{faraday.tokenSystem.label}</h3>
          <p className="section-desc">{faraday.tokenSystem.desc}</p>
          <TokenTable />
        </section>

        {/* ── Timing Calculation ── */}
        <section className="section--full faraday-calc">
          <h3 className="section-label">{faraday.timingCalc.label}</h3>
          <p className="section-desc">{faraday.timingCalc.desc}</p>
          <TimingCalc />
        </section>

        <hr className="case-divider-thick" />

        {/* ── Section 02: Mobile Sync ── */}
        <h2 className="case-title">{faraday.mobileSync.title}</h2>
        <p className="case-subtitle">{faraday.mobileSync.subtitle}</p>
        <hr className="case-divider" />

        <section className="section--full cs-row">
          <div className="cs-row__text">
            <div className="block-challenge">
              <h3 className="section-label">Challenge</h3>
              <p className="section-desc">{faraday.mobileSync.challenge}</p>
            </div>
            <div className="block-solution">
              <h3 className="section-label">Solution</h3>
              <p className="section-desc">{faraday.mobileSync.solution}</p>
            </div>
          </div>
          <div className="cs-row__media">
            <VideoCard
              label="AE Video — Mobile ↔ CID Sync (placeholder)"
            />
          </div>
        </section>

        <section className="section--full">
          <h3 className="section-label">{faraday.mobileSync.specLabel}</h3>
          <p className="section-desc">{faraday.mobileSync.specDesc}</p>
          <SyncSpec />
        </section>

        <hr className="case-divider-thick" />

        {/* ── Section 03: Configurator (TBD) ── */}
        <h2 className="case-title">{faraday.configurator.title}</h2>
        <p className="case-subtitle">{faraday.configurator.subtitle}</p>
        <hr className="case-divider" />

        <section className="section--full">
          <div className="placeholder-video placeholder-video--tall">
            <span>Three.js embed or AE capture — TBD</span>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Faraday;
