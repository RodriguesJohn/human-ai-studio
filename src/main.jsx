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
    title: "Strategy workshop",
    description:
      "Understand your business model, customer journey, revenue motion, tools, data, and team workflows before building."
  },
  {
    title: "AI agent and systems development",
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

function DotMatrixBackground({ className = "", intensity = 1, dotScale = 1, connections = false }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let startedAt = performance.now();
    let dots = [];
    let meshNodes = [];
    let meshLinks = [];

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const gap = window.innerWidth < 560 ? 22 : 26;
      dots = [];
      meshNodes = [];
      meshLinks = [];

      for (let y = gap / 2, row = 0; y < height; y += gap, row += 1) {
        for (let x = gap / 2, column = 0; x < width; x += gap, column += 1) {
          dots.push({
            column,
            row,
            x,
            y,
            seed: Math.random(),
            phase: Math.random() * Math.PI * 2
          });
        }
      }

      if (connections) {
        const nodeCount = window.innerWidth < 560 ? 86 : 170;
        const radiusX = width * 0.42;
        const radiusY = height * 0.26;

        for (let index = 0; index < nodeCount; index += 1) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.pow(Math.random(), 0.55);
          const clusterBias = Math.sin(index * 1.7) * 0.18;

          meshNodes.push({
            x: width / 2 + Math.cos(angle) * radiusX * (radius + clusterBias) + (Math.random() - 0.5) * 90,
            y: height / 2 + Math.sin(angle) * radiusY * radius + (Math.random() - 0.5) * 70,
            phase: Math.random() * Math.PI * 2,
            seed: Math.random(),
            size: 0.75 + Math.random() * 1.8
          });
        }

        meshNodes.forEach((node, index) => {
          const nearest = meshNodes
            .map((candidate, candidateIndex) => ({
              candidateIndex,
              distance: candidateIndex === index ? Infinity : Math.hypot(candidate.x - node.x, candidate.y - node.y)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);

          nearest.forEach(({ candidateIndex, distance }, neighborIndex) => {
            if (candidateIndex <= index || distance > Math.min(width, height) * 0.34) return;

            meshLinks.push({
              from: index,
              to: candidateIndex,
              strength: 1 - neighborIndex * 0.2,
              phase: Math.random() * Math.PI * 2
            });
          });
        });
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

      if (connections) {
        const meshReveal = Math.min(Math.max((elapsed - 0.55) / 1.6, 0), 1);
        const drawnMeshNodes = meshNodes.map((node) => {
          const driftX = Math.sin(elapsed * 0.18 + node.phase) * 7 + Math.sin(elapsed * 0.42 + node.y * 0.012) * 2.5;
          const driftY = Math.cos(elapsed * 0.2 + node.phase * 0.8) * 5 + Math.sin(elapsed * 0.36 + node.x * 0.01) * 2;
          const distance = Math.hypot(node.x - centerX, node.y - centerY);
          const edgeFade = 1 - Math.min(distance / maxDistance, 1) * 0.62;
          const pulse = 0.68 + Math.sin(elapsed * 0.75 + node.phase) * 0.32;

          return {
            ...node,
            drawX: node.x + driftX,
            drawY: node.y + driftY,
            opacity: Math.min(edgeFade * pulse * meshReveal * 0.34, 0.34)
          };
        });

        context.lineCap = "round";
        context.lineJoin = "round";

        meshLinks.forEach((link) => {
          const from = drawnMeshNodes[link.from];
          const to = drawnMeshNodes[link.to];
          if (!from || !to) return;

          const flow = 0.58 + Math.sin(elapsed * 0.75 + link.phase) * 0.42;
          const lineOpacity = Math.min(Math.min(from.opacity, to.opacity) * link.strength * flow * 0.78, 0.13);
          if (lineOpacity <= 0.01) return;

          context.beginPath();
          context.strokeStyle = `rgba(210, 236, 255, ${lineOpacity})`;
          context.lineWidth = 0.55 + link.strength * 0.35;
          context.moveTo(from.drawX, from.drawY);
          context.lineTo(to.drawX, to.drawY);
          context.stroke();
        });

        drawnMeshNodes.forEach((node) => {
          if (node.opacity <= 0.01) return;

          context.beginPath();
          context.fillStyle = `rgba(255, 255, 255, ${Math.min(node.opacity * 1.15, 0.42)})`;
          context.arc(node.drawX, node.drawY, node.size * dotScale, 0, Math.PI * 2);
          context.fill();
        });
      }

      const drawnDots = dots.map((dot) => {
        const distance = Math.hypot(dot.x - centerX, dot.y - centerY);
        const normalizedDistance = distance / maxDistance;
        const angleFromCenter = Math.atan2(dot.y - centerY, dot.x - centerX);
        const radialWave = Math.sin(elapsed * 0.9 - normalizedDistance * 18 + dot.phase) * 1.6;
        const diagonalWave = Math.sin(elapsed * 0.55 + (dot.x + dot.y) * 0.018 + dot.phase) * 0.75;
        const drawX = dot.x + Math.cos(angleFromCenter) * radialWave + diagonalWave;
        const drawY = dot.y + Math.sin(angleFromCenter) * radialWave - diagonalWave * 0.45;
        const reveal = Math.min(Math.max((revealRadius - normalizedDistance) / 0.34, 0), 1);
        const shimmerDistance = Math.abs(normalizedDistance - revealRadius);
        const shimmer = Math.max(1 - shimmerDistance / shimmerWidth, 0);
        const pulse = 0.45 + Math.sin(elapsed * 1.2 + dot.phase) * 0.25;
        const ambientPulse = 0.72 + Math.sin(elapsed * 0.75 + dot.phase + dot.seed * 6) * 0.28;
        const edgeFade = 1 - Math.min(distance / maxDistance, 1) * 0.72;
        const baseOpacity = 0.035 + dot.seed * 0.075 + pulse * 0.025;
        const opacity = Math.min(edgeFade * (reveal * baseOpacity * ambientPulse + shimmer * 0.09) * intensity, 0.42);

        return {
          ...dot,
          drawX,
          drawY,
          opacity,
          shimmer
        };
      });

      drawnDots.forEach((dot) => {
        if (dot.opacity <= 0.01) return;

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        context.arc(dot.drawX, dot.drawY, (dot.shimmer > 0.18 ? 1.35 : dot.seed > 0.82 ? 1.1 : 0.85) * dotScale, 0, Math.PI * 2);
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
  }, [connections, dotScale, intensity]);

  return <canvas className={`dot-matrix-background ${className}`} ref={canvasRef} aria-hidden="true" />;
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
                href="https://johnrodrigues.substack.com/"
                target="_blank"
                rel="noreferrer"
              >
                Substack
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
        <a className="brand" href="/#top" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <a className="nav-link" href="mailto:hello@humanai.studio">
          Book a call
        </a>
      </nav>

      <section className="hero v2-hero-section" id="top" data-nav-theme="dark">
        <DotMatrixBackground className="v2-hero-entrance-dots" intensity={3.2} dotScale={1.15} />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Agentic operating systems</p>
            <h1>
              <span>Human</span>
              <span>AI</span>
              <span>Studio</span>
            </h1>
            <p className="intro v2-hero-intro">
              <span>AI agent and agentic operating system development to help businesses</span>{" "}
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
            <h2 className="v2-how-heading" id="v2-how-title">From workflow pain to AI system</h2>
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
        <div className="approach-inner reveal">
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
            <h2 id="v2-bio-title">
              <span>Work 1:1 with John</span>
              <span>from strategy to launch.</span>
            </h2>
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
                href="https://johnrodrigues.substack.com/"
                target="_blank"
                rel="noreferrer"
              >
              Substack
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

      <section className="final-cta v2-final-cta" aria-labelledby="v2-cta-title" data-nav-theme="dark">
        <DotMatrixBackground />
        <div className="final-cta-inner reveal">
          <p className="eyebrow">Start here</p>
          <h2 id="v2-cta-title">
            <span>Need an AI operating</span>
            <span>system for your business?</span>
          </h2>
          <a className="button" href="mailto:hello@humanai.studio">
            Book discovery call
          </a>
        </div>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <a className="brand" href="/#top" aria-label="Human AI Studio home">
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
            <a href="/#top">Agentic operating systems</a>
            <a href="/#top">AI agent development</a>
            <a href="/#top">Operations integration</a>
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
  const route = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHistory = route === "/history";

  return isHistory ? <OriginalHome /> : <V2Home />;
}

createRoot(document.getElementById("root")).render(<App />);
