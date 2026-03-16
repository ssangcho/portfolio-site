import Nav from '../components/Nav';
import Footer from '../components/Footer';
import RoleBlock from '../components/RoleBlock';
import { motion } from 'framer-motion';
import { TypeReveal, ScrollReveal } from '../components/TextReveal';
import { medical } from '../data/siteContent';
import './Medical.css';

/* ─── Portal Color Bar ─── */
function PortalBar() {
  return (
    <div className="medical-portal-bar">
      <div className="portal-chip portal-chip--hospital">Hospital</div>
      <div className="portal-chip portal-chip--admin">Admin</div>
      <div className="portal-chip portal-chip--doctor">Doctor</div>
    </div>
  );
}

/* ─── Main Page ─── */
function Medical() {
  return (
    <div className="app">
      <Nav />

      <header className="hero medical-hero">
        <h1>
          <TypeReveal text={medical.hero.title[0]} delay={0.2} />
          <br />
          <TypeReveal text={medical.hero.title[1]} delay={0.6} />
        </h1>
        <motion.p
          className="medical-hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {medical.hero.subtitle}
        </motion.p>
      </header>

      <main className="case-study medical-case">

        <RoleBlock data={medical.role} />

        {/* ── Context ── */}
        <ScrollReveal>
          <section className="medical-context">
            <h2 className="section-label">{medical.context.label}</h2>
            <p className="section-desc">{medical.context.desc}</p>
            <PortalBar />
            <div className="placeholder-video medical-flow-placeholder">
              3-Portal Flow Video (coming soon)
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── Section 01: Assignment Flow ── */}
        <ScrollReveal>
          <h2 className="case-title">{medical.section01.title}</h2>
          <p className="case-subtitle">{medical.section01.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        {/* Challenge A */}
        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">a</span>
              <h4 className="challenge-name">{medical.challengeA.label}</h4>
            </div>
            <div className="cs-row">
              <div className="cs-row__text">
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{medical.challengeA.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{medical.challengeA.solution}</p>
                </div>
              </div>
              <div className="cs-row__media">
                <div className="placeholder-screen">Drag & Drop Assignment</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Challenge B */}
        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">b</span>
              <h4 className="challenge-name">{medical.challengeB.label}</h4>
            </div>
            <div className="cs-row cs-row--reverse">
              <div className="cs-row__text">
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{medical.challengeB.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{medical.challengeB.solution}</p>
                </div>
              </div>
              <div className="cs-row__media">
                <div className="placeholder-screen">Status Pulse Animation</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Challenge C */}
        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">c</span>
              <h4 className="challenge-name">{medical.challengeC.label}</h4>
            </div>
            <div className="cs-row">
              <div className="cs-row__text">
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{medical.challengeC.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{medical.challengeC.solution}</p>
                </div>
              </div>
              <div className="cs-row__media">
                <div className="placeholder-screen">Drop Target Highlight</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── Section 02: Data Choreography ── */}
        <ScrollReveal>
          <h2 className="case-title">{medical.section02.title}</h2>
          <p className="case-subtitle">{medical.section02.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        {/* Challenge D */}
        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">d</span>
              <h4 className="challenge-name">{medical.challengeD.label}</h4>
            </div>
            <div className="cs-row cs-row--reverse">
              <div className="cs-row__text">
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{medical.challengeD.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{medical.challengeD.solution}</p>
                </div>
              </div>
              <div className="cs-row__media">
                <div className="placeholder-screen">Dashboard Stagger Load</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Challenge E */}
        <ScrollReveal>
          <section className="section--full">
            <div className="challenge-header">
              <span className="challenge-letter">e</span>
              <h4 className="challenge-name">{medical.challengeE.label}</h4>
            </div>
            <div className="cs-row">
              <div className="cs-row__text">
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{medical.challengeE.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{medical.challengeE.solution}</p>
                </div>
              </div>
              <div className="cs-row__media">
                <div className="placeholder-screen">Table Sort Transition</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider" />

        {/* ── Motion Token Table ── */}
        <ScrollReveal>
          <section className="section--full">
            <h3 className="section-label">{medical.tokenSystem.label}</h3>
            <p className="section-desc">{medical.tokenSystem.desc}</p>
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
                  {medical.tokenSystem.tokens.map((t) => (
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

      </main>
      <Footer />
    </div>
  );
}

export default Medical;
