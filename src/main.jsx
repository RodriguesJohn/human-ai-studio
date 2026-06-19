import React from "react";
import { createRoot } from "react-dom/client";
import profilePicture from "./assets/Profile Picture.jpg";
import "./styles.css";

const offerings = [
  {
    title: "Build 0->1 AI-Native Products",
    description:
      "0->1 product design and design engineering, from an idea to a fully functional product."
  },
  {
    title: "AI Consulting",
    description:
      "Identify business needs, pain points, and bottlenecks where AI can augment your workflows."
  },
  {
    title: "Workshops for Teams",
    description:
      "Hands-on AI sessions for teams to prototype, apply, and improve real workflows."
  }
];

const principles = [
  "Human judgment first and design-centered approach",
  "Prototype before theory",
  "Systems that move business needles over demos"
];

const v2Stats = [
  ["01", "Product design"],
  ["02", "Design engineering"],
  ["03", "Agentic systems"]
];

function DotMatrixBackground() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let startedAt = performance.now();
    let dots = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const gap = window.innerWidth < 560 ? 22 : 26;
      dots = [];

      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          dots.push({
            x,
            y,
            seed: Math.random(),
            phase: Math.random() * Math.PI * 2
          });
        }
      }

      startedAt = performance.now();
    };

    const draw = (now) => {
      const { width, height } = canvas.getBoundingClientRect();
      const elapsed = (now - startedAt) / 1000;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.hypot(centerX, centerY);
      const delayedElapsed = Math.max(elapsed - 0.55, 0);
      const revealRadius = Math.min(delayedElapsed * 0.42, 1.2);
      const shimmerWidth = 0.045;

      context.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        const distance = Math.hypot(dot.x - centerX, dot.y - centerY);
        const normalizedDistance = distance / maxDistance;
        const reveal = Math.min(Math.max((revealRadius - normalizedDistance) / 0.34, 0), 1);
        const shimmerDistance = Math.abs(normalizedDistance - revealRadius);
        const shimmer = Math.max(1 - shimmerDistance / shimmerWidth, 0);
        const pulse = 0.45 + Math.sin(elapsed * 1.2 + dot.phase) * 0.25;
        const edgeFade = 1 - Math.min(distance / maxDistance, 1) * 0.72;
        const baseOpacity = 0.035 + dot.seed * 0.075 + pulse * 0.025;
        const opacity = edgeFade * (reveal * baseOpacity + shimmer * 0.09);

        if (opacity <= 0.01) return;

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.arc(dot.x, dot.y, shimmer > 0.18 ? 1.35 : dot.seed > 0.82 ? 1.1 : 0.85, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="dot-matrix-background" ref={canvasRef} aria-hidden="true" />;
}

function OriginalHome() {
  React.useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach((element) => element.classList.add("reveal-pending"));

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.remove("reveal-pending");
        element.classList.add("is-visible");
      });
      return undefined;
    }

    const revealElement = (element) => {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    const fallbackTimer = window.setTimeout(() => {
      revealElements.forEach(revealElement);
      observer.disconnect();
    }, 2200);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="page-shell">
      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <a className="nav-link" href="mailto:hello@humanai.studio">
          Book a call
        </a>
      </nav>

      <section className="hero" id="top" data-nav-theme="dark">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">AI product studio</p>
            <h1>
              <span>Human</span>
              <span>AI</span>
              <span>Studio</span>
            </h1>
            <p className="intro">
              Independent product studio based in the SF Bay Area by John Rodrigues, helping businesses build 0-&gt;1 AI-native products and agentic operating systems.
            </p>
            <div className="hero-actions">
              <a className="button" href="mailto:hello@humanai.studio">
                <span className="button-avatar" aria-hidden="true">
                  <img src={profilePicture} alt="" />
                </span>
                Book discovery call
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="offerings" aria-labelledby="offerings-title" data-nav-theme="light">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Offerings</p>
            <h2 id="offerings-title">Three ways to work together</h2>
          </div>
          <p className="section-note">
            Focused support for founders, teams, and organizations turning AI
            ideas into useful products and practices.
          </p>
        </div>

        <div className="offering-grid">
          {offerings.map((offering, index) => (
            <article
              className="offering-card reveal"
              key={offering.title}
              style={{ "--reveal-delay": `${120 + index * 140}ms` }}
            >
              <div className="offering-topline">
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="offering-copy">
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" aria-labelledby="approach-title" data-nav-theme="dark">
        <div className="approach-inner">
          <div>
            <p className="eyebrow">Approach</p>
            <h2 id="approach-title">
              Product thinking, craft, and design engineering for business impact.
            </h2>
          </div>
          <div className="principle-list">
            {principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bio" aria-labelledby="bio-title" data-nav-theme="light">
        <div className="bio-inner">
          <div className="bio-copy reveal">
            <p className="eyebrow">Work directly with John</p>
            <h2 id="bio-title">Direct, hands-on AI product work.</h2>
            <p>
              Human AI Studio is led by John Rodrigues. Every engagement is
              hands-on, practical, and close to the work: product thinking,
              system design, prototyping, implementation, and the human side of
              helping people make sense of AI.
            </p>
            <p>
              Add John&apos;s bio here: background, perspective, recent work,
              and the kind of collaborators, founders, teams, or organizations
              he works best with.
            </p>
            <div className="bio-actions">
              <a
                className="secondary-button"
                href="https://www.linkedin.com/in/john-rodrigues4?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="secondary-button"
                href="https://john-rodrigues.com/"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            </div>
          </div>
          <figure className="profile-card reveal" style={{ "--reveal-delay": "130ms" }}>
            <div className="profile-image">
              <img src={profilePicture} alt="John Rodrigues" />
            </div>
            <figcaption>
              <span>John Rodrigues</span>
              <span>Design Engineer | Founder of Human AI Studio</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="cta-title" data-nav-theme="dark">
        <DotMatrixBackground />
        <div className="final-cta-inner reveal">
          <p className="eyebrow">Start here</p>
          <h2 id="cta-title">
            <span>Have an AI product, workflow,</span>
            <span>or team question?</span>
          </h2>
          <a className="button" href="mailto:hello@humanai.studio">
            Book discovery call
          </a>
        </div>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>
              Human AI Studio by Human Inspire Studio. Independent AI product
              studio run by John Rodrigues in the SF Bay Area.
            </p>
          </div>

          <div className="footer-column">
            <p>Services</p>
            <a href="#top">AI-native products</a>
            <a href="#top">AI operating systems</a>
            <a href="#top">AI workshops</a>
          </div>

          <div className="footer-column">
            <p>Studio</p>
            <span>San Francisco Bay Area</span>
            <span>Design engineering</span>
            <span>Product systems</span>
          </div>

          <div className="footer-column">
            <p>Contact</p>
            <a href="mailto:hello@humanai.studio">hello@humanai.studio</a>
            <a href="mailto:hello@humanai.studio">Book discovery call</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function V2Home() {
  return (
    <main className="v2-page">
      <nav className="v2-nav" aria-label="V2 primary">
        <a className="brand v2-brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <a className="v2-nav-link" href="mailto:hello@humanai.studio">
          Book discovery call
        </a>
      </nav>

      <section className="v2-hero" id="top">
        <div className="v2-hero-copy">
          <p className="v2-kicker">Independent AI product studio</p>
          <h1>Human AI Studio</h1>
          <p className="v2-intro">
            Built by John Rodrigues in the SF Bay Area for founders and teams
            turning AI ideas into useful products, workflows, and agentic
            operating systems.
          </p>
          <div className="v2-actions">
            <a className="v2-primary" href="mailto:hello@humanai.studio">
              <span className="button-avatar" aria-hidden="true">
                <img src={profilePicture} alt="" />
              </span>
              Book a call
            </a>
            <a className="v2-secondary" href="#work">
              See offerings
            </a>
          </div>
        </div>

        <aside className="v2-portrait" aria-label="John Rodrigues">
          <img src={profilePicture} alt="John Rodrigues" />
          <div>
            <span>John Rodrigues</span>
            <span>Design Engineer | Founder</span>
          </div>
        </aside>
      </section>

      <section className="v2-offerings" id="work" aria-labelledby="v2-work-title">
        <div className="v2-section-label">Ways to work</div>
        <div className="v2-offerings-head">
          <h2 id="v2-work-title">From first signal to working system.</h2>
          <p>
            Direct product thinking, design craft, and implementation support
            for teams who need AI to move real business outcomes.
          </p>
        </div>

        <div className="v2-offering-list">
          {offerings.map((offering, index) => (
            <article className="v2-offering-row" key={offering.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{offering.title}</h3>
              <p>{offering.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-principles" aria-labelledby="v2-principles-title">
        <div>
          <p className="v2-section-label">Approach</p>
          <h2 id="v2-principles-title">
            Human judgment, product taste, and engineering discipline.
          </h2>
        </div>
        <div className="v2-principle-grid">
          {principles.map((principle) => (
            <p key={principle}>{principle}</p>
          ))}
        </div>
      </section>

      <section className="v2-about" aria-labelledby="v2-about-title">
        <div className="v2-about-copy">
          <p className="v2-section-label">Work directly with John</p>
          <h2 id="v2-about-title">Hands-on AI product work without the agency layer.</h2>
          <p>
            Human AI Studio is built around close collaboration: strategy,
            prototyping, design engineering, and practical implementation with
            the person doing the work in the room.
          </p>
          <div className="v2-about-links">
            <a href="https://www.linkedin.com/in/john-rodrigues4?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://john-rodrigues.com/" target="_blank" rel="noreferrer">
              Portfolio
            </a>
          </div>
        </div>
        <div className="v2-stats" aria-label="Studio focus">
          {v2Stats.map(([number, label]) => (
            <div key={label}>
              <span>{number}</span>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="v2-cta" aria-labelledby="v2-cta-title">
        <p className="v2-section-label">Start here</p>
        <h2 id="v2-cta-title">Have an AI product, workflow, or team question?</h2>
        <a className="v2-primary" href="mailto:hello@humanai.studio">
          Book discovery call
        </a>
      </section>
    </main>
  );
}

function App() {
  const isV2 = window.location.pathname.replace(/\/+$/, "") === "/v2";

  return isV2 ? <V2Home /> : <OriginalHome />;
}

createRoot(document.getElementById("root")).render(<App />);
