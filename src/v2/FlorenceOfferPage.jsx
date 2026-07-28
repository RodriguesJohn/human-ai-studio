import React from "react";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import profilePicture from "../assets/Profile Picture.jpg";
import florenceWorkImage from "../assets/work/Florence.png";
import "./florence-offer.css";

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

function openBookingModal(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const calApi = window.Cal?.ns?.[bookingNamespace] || window.Cal;
  if (!calApi) return;

  event.preventDefault();
  calApi("modal", {
    calLink: bookingLink,
    config: bookingConfig
  });
}

const processSteps = [
  {
    title: "Audit",
    body: "Review your existing design system — tokens, components, documentation, and the places where AI and agents already invent UI instead of reusing what you ship."
  },
  {
    title: "Strategy",
    body: "Clear recommendations on what needs to change, what to keep, and the architecture for shared human and agent surfaces — prioritized for real product impact."
  },
  {
    title: "Alignment",
    body: "Working conversations with design, engineering, and product on patterns, states, handoffs, and the rules agents need so the system stays coherent as it grows."
  },
  {
    title: "Implementation",
    body: "Build the token-first foundation and component catalog into your stack so agents and product UI reuse the same building blocks — not parallel, invented UI."
  },
  {
    title: "Workshops & training",
    body: "Hands-on sessions so your team can operate, extend, and govern the system — with practical habits for designers, engineers, and anyone shipping agentic experiences."
  }
];

const helpPoints = [
  {
    title: "Stop parallel UI",
    body: "Agents stop inventing one-off interfaces. Product and AI reuse the same components, states, and patterns."
  },
  {
    title: "Make the system agent-queryable",
    body: "A catalog and token foundation agents can actually match against — with measured reuse, not guesswork."
  },
  {
    title: "Ship coherent surfaces",
    body: "Human and agent workflows stay in one system as Florence grows across product areas."
  }
];

const outcomes = [
  {
    stat: "95%",
    label: "Query accuracy",
    body: "Early eval on catalog matches — agents finding the right components instead of inventing new ones."
  },
  {
    stat: "$10M+",
    label: "Potential yearly savings",
    body: "At enterprise scale, when design and engineering stop rebuilding parallel UI for every agent surface."
  },
  {
    stat: "1 system",
    label: "Shared foundation",
    body: "Token-first foundation and component catalog that stays coherent as agent and product surfaces expand."
  }
];

/** Drop video files into src/assets/work and wire them here. */
const demoVideos = [
  {
    title: "System overview",
    caption: "How Florence structures agent-ready components and catalog reuse.",
    video: null,
    poster: florenceWorkImage
  },
  {
    title: "Agent matching",
    caption: "Querying the catalog so agents reuse real components.",
    video: null,
    poster: florenceWorkImage
  }
];

function BookingCta({ className = "", children = "Book 15 min call", showAvatar = false }) {
  return (
    <a
      className={className}
      href={bookingUrl}
      {...bookingAttributes}
      onClick={openBookingModal}
    >
      {showAvatar ? (
        <span className="flo-cta-avatar" aria-hidden="true">
          <img src={profilePicture} alt="" />
        </span>
      ) : null}
      <span>{children}</span>
    </a>
  );
}

function DemoMedia({ item }) {
  if (item.video) {
    return (
      <video
        className="flo-demo-media"
        src={item.video}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <div className="flo-demo-placeholder">
      <img className="flo-demo-media" src={item.poster} alt="" />
      <span className="flo-demo-soon">Video coming soon</span>
    </div>
  );
}

export default function FlorenceOfferPage() {
  React.useEffect(() => {
    document.title = "Florence · Agent-Ready Design System · Human AI Studio";
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.background;
    const prevBody = body.style.background;
    html.style.background = "#050506";
    body.style.background = "#050506";
    return () => {
      html.style.background = prevHtml;
      body.style.background = prevBody;
    };
  }, []);

  return (
    <div className="flo-page">
      <nav className="flo-nav" aria-label="Primary">
        <a className="flo-brand" href="/" aria-label="Human AI Studio home">
          <span className="flo-brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="flo-nav-actions">
          <NavMenu />
        </div>
      </nav>

      <main>
        <section className="flo-hero" aria-labelledby="flo-hero-title">
          <Entrance className="flo-hero-copy" animate="visible">
            <EntranceItem>
              <a className="flo-back" href="/case-studies">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M11 7H3M6.5 3.5 3 7l3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>All work</span>
              </a>
            </EntranceItem>
            <EntranceItem as="p" className="flo-eyebrow">
              Agent-ready design system
            </EntranceItem>
            <EntranceItem as="h1" id="flo-hero-title">
              Florence
            </EntranceItem>
            <EntranceItem as="p" className="flo-hero-sub">
              An agent-ready design system so AI reuses real components instead of inventing UI —
              built for product teams shipping agents without fragmenting the experience.
            </EntranceItem>
            <EntranceItem className="flo-hero-actions">
              <BookingCta className="flo-cta flo-cta--solid" showAvatar>
                Book a call
              </BookingCta>
              <a className="flo-cta flo-cta--ghost" href="#flo-process">
                See the process
              </a>
            </EntranceItem>
          </Entrance>

          <Entrance className="flo-hero-visual" animate="visible">
            <EntranceItem className="flo-hero-frame">
              <img src={florenceWorkImage} alt="Florence agent-ready design system gallery" />
            </EntranceItem>
          </Entrance>
        </section>

        <section className="flo-section" aria-labelledby="flo-what-title">
          <Entrance className="flo-section-inner">
            <EntranceItem as="p" className="flo-eyebrow">
              What it is
            </EntranceItem>
            <EntranceItem as="h2" id="flo-what-title">
              One system for humans and agents.
            </EntranceItem>
            <EntranceItem as="p" className="flo-lead">
              Florence is a token-first foundation and component catalog built so AI and product UI
              share the same building blocks. No parallel invented UI. No drifting patterns as agents
              enter the product. One coherent system that both people and agents can use.
            </EntranceItem>
          </Entrance>
        </section>

        <section className="flo-section flo-section--alt" aria-labelledby="flo-help-title">
          <Entrance className="flo-section-inner">
            <EntranceItem as="p" className="flo-eyebrow">
              How we can help
            </EntranceItem>
            <EntranceItem as="h2" id="flo-help-title">
              Bring your design system into the agent era.
            </EntranceItem>
            <div className="flo-help-grid">
              {helpPoints.map((point) => (
                <EntranceItem as="article" className="flo-help-item" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </EntranceItem>
              ))}
            </div>
          </Entrance>
        </section>

        <section className="flo-section" id="flo-process" aria-labelledby="flo-process-title">
          <Entrance className="flo-section-inner">
            <EntranceItem as="p" className="flo-eyebrow">
              Process
            </EntranceItem>
            <EntranceItem as="h2" id="flo-process-title">
              Audit. Strategy. Build. Enable.
            </EntranceItem>
            <EntranceItem as="p" className="flo-lead">
              A focused engagement modeled on how we ship AI systems — starting with what you already
              have, then implementing what agents need to reuse your real product UI.
            </EntranceItem>
            <ol className="flo-process-list">
              {processSteps.map((step, index) => (
                <EntranceItem as="li" className="flo-process-item" key={step.title}>
                  <span className="flo-process-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </EntranceItem>
              ))}
            </ol>
          </Entrance>
        </section>

        <section className="flo-section flo-section--alt" aria-labelledby="flo-outcomes-title">
          <Entrance className="flo-section-inner">
            <EntranceItem as="p" className="flo-eyebrow">
              Outcomes
            </EntranceItem>
            <EntranceItem as="h2" id="flo-outcomes-title">
              Measured reuse. Coherent surfaces.
            </EntranceItem>
            <div className="flo-outcomes-grid">
              {outcomes.map((item) => (
                <EntranceItem as="article" className="flo-outcome" key={item.label}>
                  <p className="flo-outcome-stat">{item.stat}</p>
                  <h3>{item.label}</h3>
                  <p>{item.body}</p>
                </EntranceItem>
              ))}
            </div>
          </Entrance>
        </section>

        <section className="flo-section" aria-labelledby="flo-demos-title">
          <Entrance className="flo-section-inner">
            <EntranceItem as="p" className="flo-eyebrow">
              In practice
            </EntranceItem>
            <EntranceItem as="h2" id="flo-demos-title">
              See Florence in motion.
            </EntranceItem>
            <EntranceItem as="p" className="flo-lead">
              Walkthroughs of the catalog, agent matching, and how the system keeps product and AI UI
              aligned. Drop in demo videos anytime — slots are ready.
            </EntranceItem>
            <div className="flo-demo-grid">
              {demoVideos.map((item) => (
                <EntranceItem as="article" className="flo-demo" key={item.title}>
                  <DemoMedia item={item} />
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </EntranceItem>
              ))}
            </div>
          </Entrance>
        </section>

        <section className="flo-closing" aria-labelledby="flo-closing-title">
          <Entrance className="flo-closing-inner">
            <EntranceItem as="h2" id="flo-closing-title">
              Ready to make your design system agent-ready?
            </EntranceItem>
            <EntranceItem as="p">
              Let’s audit what you have, map the strategy, and build the foundation your product and
              agents can share.
            </EntranceItem>
            <EntranceItem>
              <BookingCta className="flo-cta flo-cta--solid" showAvatar>
                Book 15 min call
              </BookingCta>
            </EntranceItem>
          </Entrance>
        </section>
      </main>

      <footer className="flo-footer">
        <a className="flo-brand" href="/">
          <span className="flo-brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="flo-footer-links">
          <a href="/">Studio</a>
          <a href="/case-studies">Work</a>
          <a href="/academy">Academy</a>
          <a href={bookingUrl} {...bookingAttributes} onClick={openBookingModal}>
            Book a call
          </a>
        </div>
      </footer>
    </div>
  );
}
