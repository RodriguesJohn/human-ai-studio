import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SaaSProductMockup from "./SaaSProductMockup.jsx";
import "./product.css";

const bookingUrl = "https://cal.com/john-rodrigues-rqt2lg/15min";

const systemLayers = [
  ["01", "Design context", "Make design intent legible", "Connect tokens, components, patterns, interaction rules, and product principles in a form both people and agents can understand."],
  ["02", "Engineering context", "Ground every output in the real product", "Bring code architecture, component APIs, repository conventions, and implementation constraints into the same shared context."],
  ["03", "Agent context", "Give AI the judgment it is missing", "Package instructions, examples, constraints, and quality criteria so agents can create work that belongs in your product."]
];

const outcomes = [
  "Connected design and engineering sources",
  "Agent-ready product rules and examples",
  "Shared Figma-to-code conventions",
  "Quality checks for AI-generated interfaces",
  "Context that stays current as the product evolves"
];

function ProductButton({ children, secondary = false, href }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      className={`product-button${secondary ? " product-button-secondary" : ""}`}
      href={href || (secondary ? "#context" : bookingUrl)}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      <span>{children}</span>
      <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" /></svg>
    </motion.a>
  );
}

function ProductPage() {
  const reduceMotion = useReducedMotion();
  const rise = reduceMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <main className="product-page">
      <nav className="product-nav" aria-label="Primary">
        <a className="product-brand" href="/" aria-label="Human AI Studio home"><span />Human AI Studio</a>
        <div className="product-nav-links">
          <a href="#context">The context</a>
          <a href="#outcomes">What you get</a>
          <a className="product-nav-cta" href={bookingUrl}>Book a call</a>
        </div>
      </nav>

      <section className="product-hero product-hero-context" id="top">
        <div className="product-grid" aria-hidden="true" />
        <div className="product-glow" aria-hidden="true" />
        <motion.div className="product-hero-copy" {...rise}>
          <p className="product-kicker"><span />Shared product context</p>
          <h1>Design and engineering context<span>for product teams and AI agents.</span></h1>
          <p className="product-hero-intro">Connect the intent in design with the truth in code, then give both to the people and AI agents building your product.</p>
          <div className="product-hero-actions">
            <ProductButton href="mailto:john@humanaistudio.ai?subject=Join%20the%20waitlist">Join the waitlist</ProductButton>
            <ProductButton secondary>See the context model</ProductButton>
          </div>
        </motion.div>
        <SaaSProductMockup embedded />
      </section>

      <section className="product-problem">
        <p className="product-section-label">The context gap</p>
        <div>
          <h2>AI can only build what your product can <em>explain.</em></h2>
          <p>Design intent lives in Figma. Engineering truth lives in code. Product decisions live across docs and people. When that context stays fragmented, teams repeat decisions and AI agents fill the gaps with guesses.</p>
        </div>
      </section>

      <section className="product-system" id="context">
        <div className="product-section-heading">
          <p className="product-section-label">The context model</p>
          <h2>Design intent. Engineering truth. Agent guidance.</h2>
        </div>
        <div className="product-layer-list">
          {systemLayers.map(([number, label, title, copy]) => (
            <article className="product-layer" key={number}>
              <span className="product-layer-number">{number}</span>
              <p className="product-layer-label">{label}</p>
              <h3>{title}</h3>
              <p className="product-layer-copy">{copy}</p>
              <span className="product-layer-icon" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="product-blueprint" id="outcomes">
        <div className="product-blueprint-card">
          <div className="product-blueprint-art" aria-hidden="true">
            <div className="blueprint-node center">Context</div>
            <div className="blueprint-node one">Design</div>
            <div className="blueprint-node two">Code</div>
            <div className="blueprint-node three">Product</div>
            <div className="blueprint-node four">Agents</div>
            <svg viewBox="0 0 600 600"><circle cx="300" cy="300" r="174" /><circle cx="300" cy="300" r="245" /><path d="M300 55v490M55 300h490M127 127l346 346M473 127 127 473" /></svg>
          </div>
          <div className="product-blueprint-copy">
            <p className="product-section-label">What you get</p>
            <h2>A living context layer,<br />not another deck.</h2>
            <p>Connected to your real design files, codebase, documentation, and workflows. Your team gets usable context infrastructure that evolves with the product.</p>
            <ul>{outcomes.map((outcome) => <li key={outcome}><span>✓</span>{outcome}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="product-cta-ring" aria-hidden="true" />
        <p className="product-section-label">Start here</p>
        <h2>Give every builder the context<br />to ship the right product.</h2>
        <p>For your product team and the AI agents working alongside them.</p>
        <ProductButton>Book a discovery call</ProductButton>
      </section>

      <footer className="product-footer">
        <a className="product-brand" href="/"><span />Human AI Studio</a>
        <p>Design and engineering context for product teams and AI agents.</p>
        <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
      </footer>
    </main>
  );
}

export default ProductPage;
