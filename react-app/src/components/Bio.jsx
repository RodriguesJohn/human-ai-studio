export default function Bio() {
  return (
    <section id="bio">
      <div className="wrap">
        <div className="sec-hdr reveal">
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 12 }}>About</span>
            <h2 className="h-section">The studio is one&nbsp;person. <em>By design.</em></h2>
          </div>
          <div>
            <p className="body" style={{ maxWidth: '44ch' }}>
              Every engagement starts and ends with me. No subcontractors, no junior handoff, no account layer between you and the work.
            </p>
          </div>
        </div>

        <div className="bio-wrap">
          <div className="portrait reveal">
            <div className="frame">
              <div className="inscribe">
                <span>JR · 01</span>
                <span>SF · 37.77°N</span>
              </div>
              <div className="monogram" aria-hidden="true">JR</div>
              <div className="cross" aria-hidden="true"></div>
              <div className="inscribe bot">
                <span>EST · 2025</span>
                <span>SOLO STUDIO</span>
              </div>
            </div>
            <div className="caption">
              <span className="name">John Rodrigues</span>
              <span>Design Engineer</span>
            </div>
          </div>

          <div className="story reveal" style={{ '--d': '120ms' }}>
            <h3>I&rsquo;m John Rodrigues, a designer who ships&nbsp;code.</h3>

            <p>
              I spent a decade as a senior designer at <strong>JPMorgan Chase</strong> and <strong>Citibank</strong>, working on financial products used by millions. For the last three years I&rsquo;ve been focused on the skillset most designers are still catching up to: shipping production code alongside AI.
            </p>
            <p>
              Today I run <strong>Human AI Studio</strong> out of the San Francisco Bay Area. I embed with AI-native companies as a design engineer, writing React, owning design systems, and shipping real product. I write <strong>AI Playbook</strong>, read by 3,000+ designers, engineers, and founders, and I teach the craft through <strong>AI Design Academy</strong>.
            </p>
            <p>
              I&rsquo;ve built and shipped my own products too, including <strong>Ollie</strong>, a Figma plugin acquired by the Claude Code community, and <strong>Eva</strong>, a voice-first AI tool.
            </p>

            <div className="credential-grid">
              <div className="cell">
                <div className="lbl">Currently</div>
                <div className="v">AI&nbsp;Design&nbsp;Academy<br /><span className="muted">AI&nbsp;Playbook · 3,000+ readers</span></div>
              </div>
              <div className="cell">
                <div className="lbl">Shipped</div>
                <div className="v">Ollie · Eva<br /><span className="muted">+ client work under NDA</span></div>
              </div>
              <div className="cell">
                <div className="lbl">Based in</div>
                <div className="v">San&nbsp;Francisco<br /><span className="muted">Working globally</span></div>
              </div>
            </div>

            <div className="bio-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="https://aiplaybook.substack.com" target="_blank" rel="noopener noreferrer">AI Playbook ↗</a>
              <a href="https://www.theaidesignacademy.com/" target="_blank" rel="noopener noreferrer">AI Design Academy ↗</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
