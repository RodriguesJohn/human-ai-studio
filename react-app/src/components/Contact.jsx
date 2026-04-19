export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-hdr reveal">
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 12 }}>Contact</span>
            <h2 className="h-section">Tell me what you&rsquo;re shipping.</h2>
          </div>
          <div>
            <p className="body" style={{ maxWidth: '44ch' }}>
              The form goes straight to my inbox. I reply personally, usually the same day.
            </p>
          </div>
        </div>

        <div className="contact-wrap reveal direct">
          <div className="direct-top">
            <span className="mono" style={{ color: 'var(--fg-2)' }}>Currently</span>
            <p className="direct-status">
              Accepting <strong>two Team Embed</strong> engagements for Q3 2026. Consulting &amp; Academy cohorts open now.
            </p>
          </div>

          <div className="direct-cta">
            <a className="direct-email" href="mailto:john@humanaistudio.com">
              <span className="direct-label">Email</span>
              <span className="direct-value">john@humanaistudio.com <span className="arrow">→</span></span>
            </a>
            <a className="btn primary direct-book" href="https://cal.com/johnrodrigues" target="_blank" rel="noopener noreferrer">
              Book a call
              <span className="arrow">→</span>
            </a>
          </div>

          <div className="direct-foot">
            <span className="mono">SF Bay Area · Pacific Time</span>
            <span className="mono dim" style={{ color: 'var(--dim)' }}>Replies personally within 2 business days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
