import React from "react";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import OfferingShader from "./OfferingShader.jsx";
import profilePicture from "../assets/Profile Picture.jpg";
import florenceWorkImage from "../assets/work/Florence.png";
import "./styles.css";
import "./design-systems.css";

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;
const newsletterUrl = "https://substack.com/@johnrodrigues";
const footerVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

const whatYouGet = [
  {
    title: "The Full Audit",
    body: "I go through your design system end to end. Components, tokens, documentation, and adoption across your product. I look at the gap between what’s documented and what’s actually shipped."
  },
  {
    title: "Evals and Tests",
    body: "I run structured evals against your design system. Not eyeballing it. Actual tests show where it holds up and where it breaks under real use."
  },
  {
    title: "Evidence-Based Report",
    body: "A detailed report laying out what’s working, what’s not, and why. No sugarcoating. No vague feedback. Just what I found."
  },
  {
    title: "The Recommendations",
    body: "A clear, prioritized list of what to fix first, what to rebuild, and what to leave alone. Ordered by impact, not by what’s easiest to say."
  }
];

const problemSignals = [
  {
    title: "AI-generated UI slows your path to market.",
    body: "Every generated surface needs correction, review, and rework. That slows releases instead of accelerating them.",
    color1: "#8b5cf6",
    color2: "#2563eb"
  },
  {
    title: "Inconsistent product UI breaks user trust.",
    body: "Components and interactions drift from screen to screen, making the product feel unreliable.",
    color1: "#ec4899",
    color2: "#7c3aed"
  },
  {
    title: "Rework creates friction across the team.",
    body: "Design corrects drift, engineering rewrites code, and product renegotiates scope.",
    color1: "#06b6d4",
    color2: "#4f46e5"
  }
];

const sprintSteps = [
  {
    timing: "Week 1",
    title: "Audit + Evals + Team Interviews",
    body: "I review your codebase, Figma files, and docs, interview your team, and test where the system holds up under real use."
  },
  {
    timing: "Week 2",
    title: "Report + Walkthrough",
    body: "I write up everything I found and walk you through it live. You leave with a report and a plan, not just a deck."
  }
];

const videos = [
  {
    part: "Part 01",
    title: "Agentic Design Systems",
    videoId: "OqrxSgWpRvs",
    href: "https://youtu.be/OqrxSgWpRvs"
  },
  {
    part: "Part 02",
    title: "Agentic Design Systems",
    videoId: "O-F7nxE2IEo",
    href: "https://youtu.be/O-F7nxE2IEo"
  }
];

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
  calApi("modal", { calLink: bookingLink, config: bookingConfig });
}

function BookingButton({ children = "Book a discovery call", showAvatar = false }) {
  return (
    <a
      className="ds-audit-cta liquid-glass"
      href={bookingUrl}
      {...bookingAttributes}
      onClick={openBookingModal}
    >
      {showAvatar ? (
        <span className="ds-audit-avatar" aria-hidden="true">
          <img src={profilePicture} alt="" />
        </span>
      ) : null}
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function DesignSystemsPage() {
  const [activeVideoId, setActiveVideoId] = React.useState(videos[0].videoId);
  const activeVideo = videos.find((video) => video.videoId === activeVideoId) || videos[0];
  const presenterVideoRef = React.useRef(null);
  const youtubeFrameRef = React.useRef(null);

  React.useEffect(() => {
    function handleYoutubeState(event) {
      if (event.source !== youtubeFrameRef.current?.contentWindow) return;

      let message = event.data;
      if (typeof message === "string") {
        try {
          message = JSON.parse(message);
        } catch {
          return;
        }
      }

      const playerState =
        message?.event === "onStateChange"
          ? message.info
          : message?.event === "infoDelivery"
            ? message.info?.playerState
            : undefined;

      if (playerState === 1) {
        presenterVideoRef.current?.pause();
      } else if (playerState === 0 || playerState === 2) {
        presenterVideoRef.current?.play().catch(() => {});
      }
    }

    window.addEventListener("message", handleYoutubeState);
    const playerStatePoll = window.setInterval(() => {
      youtubeFrameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "getPlayerState", args: [] }),
        "https://www.youtube-nocookie.com"
      );
    }, 500);

    return () => {
      window.removeEventListener("message", handleYoutubeState);
      window.clearInterval(playerStatePoll);
    };
  }, []);

  function connectYoutubePlayer() {
    const playerWindow = youtubeFrameRef.current?.contentWindow;
    if (!playerWindow) return;

    playerWindow.postMessage(
      JSON.stringify({ event: "listening", id: "ds-audit-player" }),
      "https://www.youtube-nocookie.com"
    );
    playerWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "addEventListener",
        args: ["onStateChange"]
      }),
      "https://www.youtube-nocookie.com"
    );
  }

  React.useEffect(() => {
    document.title = "Agent-Ready Design System Two-Week Audit Sprint · Human AI Studio";
    const description =
      "An agent-ready design system two-week audit sprint with an AI-readiness checklist, prioritized recommendations, and a practical roadmap.";
    let meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    return () => {
      if (previous != null) meta.setAttribute("content", previous);
    };
  }, []);

  return (
    <main className="page-shell current-home ds-audit-page">
      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>

      <section className="ds-audit-hero" aria-labelledby="ds-audit-title">
        <Entrance className="ds-audit-hero-inner" animate="visible">
          <div className="ds-audit-hero-copy">
            <EntranceItem as="h1" id="ds-audit-title">
              <span className="ds-audit-title-line">Agent-ready design system</span>
              <span className="ds-audit-title-line">Two-week audit sprint.</span>
            </EntranceItem>
            <EntranceItem as="p" className="ds-audit-intro">
              <span>Find the gaps in your design system.</span>
              <span>Get a clear path to agent readiness.</span>
            </EntranceItem>
            <EntranceItem className="ds-audit-actions">
              <BookingButton showAvatar />
              <a href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            </EntranceItem>
          </div>
          <EntranceItem className="ds-audit-hero-media">
            <img
              src={florenceWorkImage}
              alt="Florence agent-ready design system component library"
            />
            <div>
              <span>Florence · Agent-ready design system</span>
              <a href="/offerings/agent-ready-design-system">
                View the work <span aria-hidden="true">↗</span>
              </a>
            </div>
          </EntranceItem>
        </Entrance>
      </section>

      <section className="ds-audit-problem dark-offerings" aria-labelledby="ds-audit-problem-title">
        <Entrance className="ds-audit-rail">
          <EntranceItem className="ds-audit-problem-intro">
            <h2 id="ds-audit-problem-title">
              Coding agents are shipping off-brand UI.
            </h2>
          </EntranceItem>
          <div className="offering-grid v2-flow-grid v2-offer-grid ds-audit-problem-grid">
            {problemSignals.map((problem, index) => (
              <Entrance
                as="article"
                className="offering-card v2-offering-card"
                key={problem.title}
                style={{
                  "--card-color-1": problem.color1,
                  "--card-color-2": problem.color2
                }}
              >
                <div className="offering-thumb">
                  <OfferingShader
                    color1={problem.color1}
                    color2={problem.color2}
                    seed={index * 3.7 + 1.3}
                  />
                  <span className="offering-thumb-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="offering-thumb-title">{problem.title}</h3>
                </div>
                <div className="offering-copy">
                  <p>{problem.body}</p>
                </div>
              </Entrance>
            ))}
          </div>
        </Entrance>
      </section>

      <section className="ds-audit-series" aria-labelledby="ds-audit-series-title">
        <Entrance className="ds-audit-series-heading">
          <EntranceItem as="h2" id="ds-audit-series-title">
            <span>Work 1:1 with John to make</span>
            <span>your design system agent-ready.</span>
          </EntranceItem>
        </Entrance>
        <Entrance className="ds-audit-series-module">
          <EntranceItem className="ds-audit-series-presenter">
            <video
              ref={presenterVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="John Rodrigues presenting"
            >
              <source src="/academy/hero-mobile.mp4?v=hero-cd598d71" media="(max-width: 768px)" type="video/mp4" />
              <source src="/academy/hero.mp4?v=hero-cd598d71" type="video/mp4" />
            </video>
            <div className="ds-audit-presenter-gradient" aria-hidden="true" />
            <div className="ds-audit-presenter-copy">
              <strong>John Rodrigues</strong>
              <p>Design Engineer · Founder of Human AI Studio</p>
            </div>
          </EntranceItem>
          <div className="ds-audit-series-content">
            <EntranceItem className="ds-audit-active-video">
              <iframe
                ref={youtubeFrameRef}
                key={activeVideo.videoId}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?rel=0&enablejsapi=1`}
                title={`${activeVideo.title} — ${activeVideo.part}`}
                loading="lazy"
                onLoad={connectYoutubePlayer}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </EntranceItem>
            <div className="ds-audit-episode-list" aria-label="Series episodes">
              {videos.map((video) => (
                <EntranceItem
                  as="button"
                  type="button"
                  className={video.videoId === activeVideo.videoId ? "is-active" : ""}
                  key={video.videoId}
                  onClick={() => setActiveVideoId(video.videoId)}
                  aria-pressed={video.videoId === activeVideo.videoId}
                >
                  <span>{video.part}</span>
                  <strong>{video.title}</strong>
                  <i className="ds-audit-episode-play" aria-hidden="true" />
                </EntranceItem>
              ))}
            </div>
            <EntranceItem
              as="a"
              className="ds-audit-youtube-link"
              href={activeVideo.href}
              target="_blank"
              rel="noreferrer"
            >
              Open current episode on YouTube <span aria-hidden="true">↗</span>
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-audit-checklist" aria-labelledby="ds-audit-checklist-title">
        <Entrance className="ds-audit-section-head">
          <EntranceItem>
            <h2 id="ds-audit-checklist-title">
              <span>What’s included in the</span>
              <span>two-week sprint?</span>
            </h2>
          </EntranceItem>
        </Entrance>
        <div className="ds-audit-area-grid">
          {whatYouGet.map((area, index) => (
            <Entrance as="article" className="ds-audit-area" key={area.title}>
              <EntranceItem as="span">{String(index + 1).padStart(2, "0")}</EntranceItem>
              <EntranceItem as="h3">{area.title}</EntranceItem>
              <EntranceItem as="p">{area.body}</EntranceItem>
            </Entrance>
          ))}
        </div>
      </section>

      <section className="ds-audit-process" id="how-it-works" aria-labelledby="ds-audit-process-title">
        <Entrance className="ds-audit-section-head">
          <EntranceItem>
            <h2 id="ds-audit-process-title">Two focused weeks from audit to action.</h2>
          </EntranceItem>
        </Entrance>
        <ol className="ds-audit-timeline">
          {sprintSteps.map((step, index) => (
            <Entrance as="li" key={step.timing}>
              <EntranceItem className="ds-audit-week">
                <span className="ds-audit-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{step.timing}</strong>
              </EntranceItem>
              <EntranceItem>
                <h3>{step.title}</h3>
              </EntranceItem>
              <EntranceItem as="p">{step.body}</EntranceItem>
            </Entrance>
          ))}
        </ol>
      </section>

      <section className="ds-audit-final" aria-labelledby="ds-audit-final-title">
        <Entrance className="ds-audit-final-inner">
          <EntranceItem as="p" className="eyebrow">Start here</EntranceItem>
          <EntranceItem as="h2" id="ds-audit-final-title">
            Know exactly what your design system needs for the agent era.
          </EntranceItem>
          <EntranceItem as="p">
            Two weeks. One focused audit. A practical path your team can use immediately.
          </EntranceItem>
          <EntranceItem>
            <BookingButton showAvatar>Book a 15 min call</BookingButton>
          </EntranceItem>
        </Entrance>
      </section>

      <footer className="site-footer" aria-label="Human AI Studio footer" data-nav-theme="dark">
        <video
          className="footer-growth-video"
          src={footerVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="footer-growth-scrim" aria-hidden="true" />
        <div className="site-footer-inner">
          <Entrance className="footer-brand">
            <EntranceItem as="a" className="brand" href="/#top" aria-label="Human AI Studio home">
              <span className="brand-mark" aria-hidden="true" />
              Human AI Studio
            </EntranceItem>
            <EntranceItem as="p">
              Human AI Studio is a company of Human Inspire Studio LLC.
            </EntranceItem>
          </Entrance>

          <Entrance className="footer-column">
            <EntranceItem as="p">Contact</EntranceItem>
            <EntranceItem as="a" href={newsletterUrl} target="_blank" rel="noreferrer">
              Publication
            </EntranceItem>
            <EntranceItem as="a" href="mailto:john@humanaistudio.ai">
              john@humanaistudio.ai
            </EntranceItem>
            <EntranceItem
              as="a"
              href={bookingUrl}
              {...bookingAttributes}
              onClick={openBookingModal}
            >
              Book a call
            </EntranceItem>
          </Entrance>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          Human AI Studio
        </div>
      </footer>
    </main>
  );
}
