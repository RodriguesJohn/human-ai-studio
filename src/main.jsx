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

const v2HowItWorks = [
  {
    title: "Workshop strategy",
    description:
      "Understand your business model, customer journey, revenue motion, tools, data, and team workflows before building."
  },
  {
    title: "Agent development",
    description:
      "Design and develop AI agents around the decisions, handoffs, and operating needs that matter most to the business."
  },
  {
    title: "Workflow integration",
    description:
      "Connect agents into your systems, knowledge bases, team processes, and client-facing workflows so they fit real operations."
  },
  {
    title: "Support and monitoring",
    description:
      "Refine the system after launch with monitoring, iteration, workflow tuning, and support as your operations scale."
  }
];

const v2Principles = [
  "Scope the business problem and customer workflow",
  "Design the agent workflow around real team handoffs",
  "Build, integrate, and improve the system inside the business"
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

function useRevealAnimation() {
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
}

function OriginalHome() {
  useRevealAnimation();

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
  useRevealAnimation();

  return (
    <main className="page-shell">
      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/v2#top" aria-label="Human AI Studio V2 home">
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
            <p className="eyebrow hero-eyebrow">Agentic operating systems</p>
            <h1>
              <span>Human</span>
              <span>AI</span>
              <span>Studio</span>
            </h1>
            <p className="intro v2-hero-intro">
              <span>AI agent and agentic operating system development to help businesses</span>
              <span>scale operations and grow revenue.</span>
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

      <section className="offerings" aria-labelledby="v2-how-title" data-nav-theme="light">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="v2-how-title">From workflow pain to AI system</h2>
          </div>
          <p className="section-note">
            A forward-deployed process for understanding the business problem,
            designing the workflow, and shipping AI agents into real operations.
          </p>
        </div>

        <div className="offering-grid v2-flow-grid">
          {v2HowItWorks.map((step, index) => (
            <article
              className="offering-card v2-offering-card reveal"
              key={step.title}
              style={{ "--reveal-delay": `${120 + index * 140}ms` }}
            >
              <div className="offering-topline">
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="offering-copy">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" aria-labelledby="v2-approach-title" data-nav-theme="dark">
        <div className="approach-inner">
          <div>
            <p className="eyebrow">Approach</p>
            <h2 id="v2-approach-title">
              Forward-deployed engineering for business workflows.
            </h2>
          </div>
          <div className="principle-list">
            {v2Principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bio v2-bio" aria-labelledby="v2-bio-title" data-nav-theme="light">
        <div className="bio-inner">
          <div className="bio-copy reveal">
            <p className="eyebrow">Work directly with John</p>
            <h2 id="v2-bio-title">Work 1:1 with John from strategy to launch.</h2>
            <p>
              Work directly with John Rodrigues across strategy, product design,
              design engineering, AI agent development, and implementation. You
              get the personal touch of a close 1:1 collaboration instead of a
              handoff-heavy agency process.
            </p>
            <p>
              John brings AI credibility through hands-on product work: turning
              ambiguous business workflows into prototypes, agentic systems,
              internal tools, and AI-native products that teams can understand,
              trust, and operate.
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

      <section className="final-cta" aria-labelledby="v2-cta-title" data-nav-theme="dark">
        <DotMatrixBackground />
        <div className="final-cta-inner reveal">
          <p className="eyebrow">Start here</p>
          <h2 id="v2-cta-title">
            <span>Need an AI operating system</span>
            <span>for your business?</span>
          </h2>
          <a className="button" href="mailto:hello@humanai.studio">
            Book discovery call
          </a>
        </div>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <a className="brand" href="/v2#top" aria-label="Human AI Studio V2 home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>
              Human AI Studio by Human Inspire Studio. AI agent operating system
              design and development studio run by John Rodrigues.
            </p>
          </div>

          <div className="footer-column">
            <p>Services</p>
            <a href="/v2#top">Agentic operating systems</a>
            <a href="/v2#top">AI agent development</a>
            <a href="/v2#top">Operations integration</a>
          </div>

          <div className="footer-column">
            <p>Studio</p>
            <span>San Francisco Bay Area</span>
            <span>Design engineering</span>
            <span>Direct 1:1 collaboration</span>
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

function App() {
  const isV2 = window.location.pathname.replace(/\/+$/, "") === "/v2";

  return isV2 ? <V2Home /> : <OriginalHome />;
}

createRoot(document.getElementById("root")).render(<App />);
