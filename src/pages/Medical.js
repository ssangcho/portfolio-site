import Nav from '../components/Nav';
import Footer from '../components/Footer';
import RoleBlock from '../components/RoleBlock';
import LazyVideo from '../components/LazyVideo';
import { motion } from 'framer-motion';
import { TypeReveal, ScrollReveal } from '../components/TextReveal';
import { medical } from '../data/siteContent';
import './Medical.css';

/* ─── Video Assets ─── */
import videoLanding from '../assets/medical/Landing.mp4';
import videoDash from '../assets/medical/Dash.mp4';
import videoDoctor from '../assets/medical/Doctor.mp4';
import videoAI from '../assets/medical/AI.mp4';
import videoDnD from '../assets/medical/dnd.mp4';

/* ─── Portal Icons ─── */
const portalIcons = {
  Hospital: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="portal-card__icon"><path d="M420-280h120v-100h100v-120H540v-100H420v100H320v120h100v100ZM160-120v-480l320-240 320 240v480H160Zm80-80h480v-360L480-740 240-560v360Zm240-270Z"/></svg>,
  Coordinator: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="portal-card__icon"><path d="M480-107q75-71 117.5-136.5T640-354q0-69-46.5-117.5T480-520q-67 0-113.5 48.5T320-354q0 45 42.5 110.5T480-107Zm0 107Q359-103 299.5-191T240-354q0-102 69.5-174T480-600q101 0 170.5 72T720-354q0 75-59.5 163T480 0Zm42.5-317.5Q540-335 540-360t-17.5-42.5Q505-420 480-420t-42.5 17.5Q420-385 420-360t17.5 42.5Q455-300 480-300t42.5-17.5ZM338-662l-56-56q40-40 91-61t107-21q56 0 107 21t91 61l-56 56q-29-29-65.5-43.5T480-720q-40 0-76.5 14.5T338-662ZM226-775l-57-56q63-63 143-96t168-33q88 0 168 33t143 96l-56 57q-51-51-117-78.5T480-880q-72 0-137.5 27T226-775Zm254 415Z"/></svg>,
  Doctor: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="portal-card__icon"><path d="M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q20 0 40 1.5t40 4.5v81q-20-4-40-5.5t-40-1.5q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h320v80H160Zm80-80h320-320Zm127-287q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640ZM720 0v-200h-80v-240h240l-80 160h80L720 0Z"/></svg>,
};

/* ─── Reusable Section Block ─── */
function SectionBlock({ num, data, reverse, mediaLabel, video }) {
  return (
    <ScrollReveal>
      <section className="section--full">
        <div className="challenge-header">
          <span className="challenge-letter">{num}</span>
          <h4 className="challenge-name">{data.label}</h4>
        </div>
        <div className={`cs-row${reverse ? ' cs-row--reverse' : ''}`}>
          <div className="cs-row__text">
            <div className="block-challenge">
              <h3 className="section-label">Challenge</h3>
              <p className="section-desc">{data.challenge}</p>
            </div>
            <div className="block-solution">
              <h3 className="section-label">Solution</h3>
              <p className="section-desc">{data.solution}</p>
            </div>
          </div>
          <div className="cs-row__media">
            {video ? (
              <LazyVideo src={video} className="cs-row__video" />
            ) : (
              <div className="placeholder-screen">{mediaLabel}</div>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

/* ─── Main Page ─── */
function Medical() {
  const d = medical;

  return (
    <div className="app">
      <Nav />

      <header className="hero medical-hero">
        <h1>
          <TypeReveal text={d.hero.title[0]} delay={0.2} />
          <br />
          <TypeReveal text={d.hero.title[1]} delay={0.6} />
        </h1>
        <motion.p
          className="medical-hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {d.hero.subtitle}
        </motion.p>
        <motion.a
          href="https://oncall.ssangcho.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="medical-hero-demo-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Try it live
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </header>

      <main className="case-study medical-case">

        <RoleBlock data={d.role} />

        {/* ── Research & Discovery ── */}
        <ScrollReveal>
          <h2 className="section-label">{d.research.label}</h2>
        </ScrollReveal>
        <ScrollReveal>
          <section className="research-split">
            <div className="research-split__before">
              <span className="research-split__tag">Before</span>
              <h3 className="research-split__headline">{d.research.before.headline[0]}</h3>
              <h3 className="research-split__headline research-split__headline--accent">{d.research.before.headline[1]}</h3>
              <hr className="research-split__divider" />
              {d.research.before.parties.map((p) => (
                <p key={p.name} className="research-split__party">
                  <span className="research-split__party-name">{p.name}:</span> {p.pain}
                </p>
              ))}
            </div>
            <div className="research-split__after">
              <span className="research-split__tag research-split__tag--teal">After</span>
              <h3 className="research-split__headline research-split__headline--teal">{d.research.after.headline[0]}</h3>
              <h3 className="research-split__headline research-split__headline--teal">{d.research.after.headline[1]}</h3>
              <hr className="research-split__divider research-split__divider--light" />
              <p className="research-split__subtitle">{d.research.after.subtitle}</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="medical-research">
            <h3 className="research-heading">Three Portals</h3>
            <div className="portal-cards">
              {d.research.portals.map((portal) => (
                <div key={portal.name} className={`portal-card portal-card--${portal.name.toLowerCase()}`}>
                  <div className="portal-card__header">
                    <span className="portal-card__dot" />
                    <h4 className="portal-card__name">{portal.name}</h4>
                  </div>
                  <div className="portal-card__body">
                    <blockquote className="portal-card__quote">"{portal.quote}"</blockquote>
                    <p className="portal-card__desc">{portal.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="section-desc research-role">{d.research.myRole}</p>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── 01. First Impression ── */}
        <ScrollReveal>
          <h2 className="case-title">{d.section01.title}</h2>
          <p className="case-subtitle">{d.section01.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">01</span>
              <h4 className="challenge-name">{d.challenge01.label}</h4>
            </div>
            <div className="medical-split-cards">
              <div className="block-challenge">
                <h3 className="section-label">Challenge</h3>
                <p className="section-desc">{d.challenge01.challenge}</p>
              </div>
              <div className="block-solution">
                <h3 className="section-label">Solution</h3>
                <p className="section-desc">{d.challenge01.solution}</p>
              </div>
            </div>
            <div className="medical-full-video">
              <LazyVideo src={videoLanding} className="full-video" />
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── 02. At a Glance ── */}
        <ScrollReveal>
          <h2 className="case-title">{d.section02.title}</h2>
          <p className="case-subtitle">{d.section02.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">02</span>
              <h4 className="challenge-name">{d.challenge02.label}</h4>
            </div>
            <div className="medical-split-cards">
              <div className="block-challenge">
                <h3 className="section-label">Challenge</h3>
                <p className="section-desc">{d.challenge02.challenge}</p>
              </div>
              <div className="block-solution">
                <h3 className="section-label">Solution</h3>
                <p className="section-desc">{d.challenge02.solution}</p>
              </div>
            </div>
            <div className="medical-full-video">
              <LazyVideo src={videoDash} className="full-video" />
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── 03. AI-Assisted Workflow ── */}
        <ScrollReveal>
          <h2 className="case-title">{d.section03.title}</h2>
          <p className="case-subtitle">{d.section03.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">03</span>
              <h4 className="challenge-name">{d.challenge03.label}</h4>
            </div>
            <div className="medical-split-cards">
              <div className="block-challenge">
                <h3 className="section-label">Challenge</h3>
                <p className="section-desc">{d.challenge03.challenge}</p>
              </div>
              <div className="block-solution">
                <h3 className="section-label">Solution</h3>
                <p className="section-desc">{d.challenge03.solution}</p>
              </div>
            </div>
            <div className="medical-full-video">
              <LazyVideo src={videoAI} className="full-video" />
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── 04. Direct Manipulation ── */}
        <ScrollReveal>
          <h2 className="case-title">{d.section04.title}</h2>
          <p className="case-subtitle">{d.section04.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">04</span>
              <h4 className="challenge-name">{d.challenge04.label}</h4>
            </div>
            <div className="medical-split-cards">
              <div className="block-challenge">
                <h3 className="section-label">Challenge</h3>
                <p className="section-desc">{d.challenge04.challenge}</p>
              </div>
              <div className="block-solution">
                <h3 className="section-label">Solution</h3>
                <p className="section-desc">{d.challenge04.solution}</p>
              </div>
            </div>
            <div className="medical-full-video">
              <LazyVideo src={videoDnD} className="full-video" />
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── 05. The Doctor's View ── */}
        <ScrollReveal>
          <h2 className="case-title">{d.section05.title}</h2>
          <p className="case-subtitle">{d.section05.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">05</span>
              <h4 className="challenge-name">{d.challenge05.label}</h4>
            </div>
            <div className="medical-split-cards">
              <div className="block-challenge">
                <h3 className="section-label">Challenge</h3>
                <p className="section-desc">{d.challenge05.challenge}</p>
              </div>
              <div className="block-solution">
                <h3 className="section-label">Solution</h3>
                <p className="section-desc">{d.challenge05.solution}</p>
              </div>
            </div>
            <div className="medical-full-video">
              <LazyVideo src={videoDoctor} className="full-video" />
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider" />

        {/* ── Motion Token System ── */}
        <ScrollReveal>
          <section className="section--full">
            <h3 className="section-label">{d.tokenSystem.label}</h3>
            <p className="section-desc">{d.tokenSystem.desc}</p>

            {/* Highlight Cards */}
            <div className="token-highlights">
              {d.tokenSystem.highlights.map((h) => (
                <div key={h.name} className="token-highlight">
                  <div className="token-highlight__header">
                    <span className="token-highlight__title">{h.title}</span>
                    <code className="token-highlight__value">{h.value}</code>
                  </div>
                  <p className="token-highlight__why">{h.why}</p>
                </div>
              ))}
            </div>

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
                  {d.tokenSystem.tokens.map((t) => (
                    <tr key={t.name}>
                      <td className="token-name">{t.name}</td>
                      <td className="token-value">{t.value}</td>
                      <td className="token-usage">{t.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Demo CTA ── */}
        <ScrollReveal>
          <section className="medical-demo-cta">
            <p className="medical-demo-cta__label">No referral needed.</p>
            <a
              href="https://oncall.ssangcho.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="medical-demo-cta__btn"
            >
              Try OnCall
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </section>
        </ScrollReveal>

      </main>
      <Footer />
    </div>
  );
}

export default Medical;
