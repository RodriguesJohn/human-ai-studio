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

const problemSignals = [
  {
    title: "The playbook for AI-ready design systems.",
    body: "You leave knowing exactly what an AI-ready design system is, and holding the playbook that defines it.",
    color1: "#8b5cf6",
    color2: "#2563eb"
  },
  {
    title: "AI workflow templates for Figma and code.",
    body: "Templates that work with the design system you already have, across both Figma and your codebase.",
    color1: "#ec4899",
    color2: "#7c3aed"
  },
  {
    title: "A roadmap to make your system agent-ready.",
    body: "You will know what makes a design system agent-ready, and get the roadmap to take yours there.",
    color1: "#06b6d4",
    color2: "#4f46e5"
  },
  {
    title: "A step-by-step checklist you can run.",
    body: "Walk away with a checklist your team can work through to make your design systems hold up.",
    color1: "#f59e0b",
    color2: "#db2777"
  }
];

const sprintSteps = [
  {
    timing: "Block 1",
    title: "Where your system stands",
    body: "We walk your design system together and find the exact places coding agents go off the rails. Your team sees the failure modes live, in their own product."
  },
  {
    timing: "Block 2",
    title: "Rebuild the foundations",
    body: "Working session. We restructure tokens, components, and naming so the system holds up under generation, and your team does the work with me."
  },
  {
    timing: "Block 3",
    title: "Playbook and next steps",
    body: "We write the rules down and agree what happens next. You end the session with a playbook and a prioritised list your team can act on."
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

function BookingButton({ children = "Join the workshop", showAvatar = false }) {
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
    document.title = "Agent-Ready Design System Live Workshop · Human AI Studio";
    const description =
      "A live, hands-on workshop that gets your team building an agent-ready design system, working in your own tokens, components, and docs.";
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
              <span className="ds-audit-title-line">Live team workshop.</span>
            </EntranceItem>
            <EntranceItem as="p" className="ds-audit-intro">
              <span>Hands-on with your team, in your own files.</span>
              <span>Leave with a design system agents can build from.</span>
            </EntranceItem>
            <EntranceItem className="ds-audit-actions">
              <BookingButton showAvatar />
              <a href="#free-masterclass">Join the free masterclass <span aria-hidden="true">↓</span></a>
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
              What you’ll walk away with.
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

      <section
        className="ds-audit-series"
        id="free-masterclass"
        aria-labelledby="ds-audit-series-title"
      >
        <Entrance className="ds-audit-series-heading">
          <EntranceItem as="h2" id="ds-audit-series-title">
            <span>Look into what agent-ready</span>
            <span>design systems are.</span>
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
              <span>Why now</span>
            </h2>
          </EntranceItem>
        </Entrance>
        <Entrance className="ds-why-now">
          <EntranceItem as="p">
            AI has improved efficiency, but building products without your design system is
            of no use. Most designers are now struggling with how to work with existing
            systems, and how to make design systems agent-ready as workflows change.
          </EntranceItem>
          <EntranceItem as="p">
            Design systems are becoming the infrastructure coding agents build on, but many
            are confused on the how. This is the next big opportunity for designers. We
            don’t just need to clean up the AI slop, we need to own the architecture of the
            systems. In this workshop we teach you the how, and give you the step-by-step
            checklist you need.
          </EntranceItem>
          <EntranceItem as="p">
            This workshop is based on the R&amp;D at Human AI Studio and building Florence
            DS, an agent-ready design system.
          </EntranceItem>
        </Entrance>
      </section>

      <section className="ds-audit-process" id="how-it-works" aria-labelledby="ds-audit-process-title">
        <Entrance className="ds-audit-section-head">
          <EntranceItem>
            <h2 id="ds-audit-process-title">Three working blocks, one live session.</h2>
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
            Get your team building a design system agents can use.
          </EntranceItem>
          <EntranceItem as="p">
            Two ways in, depending on how deep you want to go.
          </EntranceItem>
        </Entrance>
      </section>

      <section className="ds-upsell" aria-label="Ways to work together">
        <div className="ds-upsell-grid">
          <Entrance as="article" className="ds-upsell-card is-primary">
            <EntranceItem as="p" className="ds-upsell-eyebrow">
              Live workshop
            </EntranceItem>
            <EntranceItem as="h3">Join the workshop.</EntranceItem>
            <EntranceItem as="p" className="ds-upsell-body">
              A live, hands-on session with your team, working in your own tokens,
              components, and docs. Everyone leaves with a playbook they helped write and
              know how to use.
            </EntranceItem>
            <EntranceItem>
              <BookingButton showAvatar>Join the workshop</BookingButton>
            </EntranceItem>
          </Entrance>

          <Entrance as="article" className="ds-upsell-card">
            <EntranceItem as="p" className="ds-upsell-eyebrow">
              Going deeper
            </EntranceItem>
            <EntranceItem as="h3">Book an audit for your company.</EntranceItem>
            <EntranceItem as="p" className="ds-upsell-body">
              The workshop gets your team moving. The audit tells you exactly where the
              system is failing today. I review components, tokens, docs, and adoption end
              to end, run structured evals, and hand back a prioritised list of what to fix
              first.
            </EntranceItem>
            <EntranceItem>
              <BookingButton>Book an audit</BookingButton>
            </EntranceItem>
          </Entrance>
        </div>
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
