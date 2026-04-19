export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-hdr reveal">
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 12 }}>Services</span>
            <h2 className="h-section">Three ways to work with me.</h2>
          </div>
          <div>
            <p className="body" style={{ maxWidth: '44ch' }}>
              You work with me directly. No account managers, no subcontractors.
            </p>
          </div>
        </div>

        <div className="cards">
          <article className="s-card reveal">
            <div className="topline">
              <span className="audience">AI companies</span>
            </div>
            <h3 className="title">Design Engineering Contracts.</h3>
            <p className="desc">Team embed — I join your team, your repo, your Slack, your standups. Shipping real product alongside you.</p>
            <ul className="sub-services">
              <li>AI MVP development</li>
              <li>AI agents development</li>
              <li>Product design</li>
              <li>Design engineering</li>
              <li>Agentic design system guidance</li>
              <li>Direction &amp; strategy</li>
            </ul>
            <div className="s-foot">
              <a className="card-cta" href="#contact">Start <span className="arrow">→</span></a>
            </div>
          </article>

          <article className="s-card reveal" style={{ '--d': '100ms' }}>
            <div className="topline">
              <span className="audience">Founders</span>
            </div>
            <h3 className="title">AI Consulting &amp; Advisory.</h3>
            <p className="desc">A trusted second brain for founders and teams navigating AI. Strategic direction where it matters most.</p>
            <ul className="sub-services">
              <li>AI strategy &amp; roadmap</li>
              <li>Product &amp; AI integration direction</li>
              <li>Agentic workflow design</li>
              <li>Strategic guidance for business growth</li>
            </ul>
            <div className="s-foot">
              <a className="card-cta" href="#contact">Book a call <span className="arrow">→</span></a>
            </div>
          </article>

          <article className="s-card reveal" style={{ '--d': '200ms' }}>
            <div className="topline">
              <span className="audience">Teams</span>
            </div>
            <h3 className="title">AI Design Academy.</h3>
            <p className="desc">AI education for designers and teams to learn the latest AI tools.</p>
            <ul className="sub-services">
              <li>Courses</li>
              <li>Training</li>
              <li>Workshops</li>
            </ul>
            <div className="s-foot">
              <a className="card-cta" href="https://www.theaidesignacademy.com/" target="_blank" rel="noopener noreferrer">Visit Academy <span className="arrow">→</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
