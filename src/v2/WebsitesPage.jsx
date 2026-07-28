import React from "react";
import { Entrance, EntranceItem } from "./entrance.jsx";
import { NavMenu } from "./NavMenu.jsx";
import { WebsitesHero } from "./WebsitesHero.jsx";
import { websiteProjects } from "./caseStudiesData.js";
import "./websites.css";

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

const processSteps = [
  { title: "Strategy", body: "Audience, offer, and page flow mapped to business goals." },
  { title: "Design", body: "Visual direction, sections, and responsive layouts." },
  { title: "Build", body: "Production-ready implementation with polish and performance." },
  { title: "Launch", body: "Ship, measure, and iterate on what moves growth." }
];

const websiteTestimonials = [
  {
    quote:
      "Working with John has been a real pleasure. He brought a clear process from beginning to end, responded quickly, and delivered high-quality work. The new design makes No Scroll feel like a brand new app.",
    name: "Andrew",
    role: "Founder, No Scroll App"
  },
  {
    quote:
      "Collaborating with John was both easy and productive. John provided valuable insights into product development and user experience that truly enhanced our project and moved it to the next level.",
    name: "Edward Petkovicz",
    role: "faxion.ai"
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
  calApi("modal", {
    calLink: bookingLink,
    config: bookingConfig
  });
}

function getMediaShellClass(study, base) {
  return [
    base,
    study.fit === "contain" ? `${base}--contain` : "",
    study.containTone === "light" ? `${base}--contain-light` : ""
  ]
    .filter(Boolean)
    .join(" ");
}

function ProjectMedia({ study, className = "", preferPoster = false }) {
  const containerRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(!study.video);

  React.useEffect(() => {
    if (!study.video || preferPoster) return undefined;

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [preferPoster, study.video]);

  React.useEffect(() => {
    if (!shouldLoad || preferPoster) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => {
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => video.removeEventListener("loadeddata", play);
  }, [preferPoster, shouldLoad, study.video]);

  const mediaStyle =
    study.position && study.fit !== "contain"
      ? { objectPosition: study.position }
      : undefined;

  if (study.video && !preferPoster) {
    return (
      <div ref={containerRef} className="web-work-media-inner">
        {shouldLoad ? (
          <video
            ref={videoRef}
            className={className}
            src={study.video}
            poster={study.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={mediaStyle}
          />
        ) : (
          <img className={className} src={study.image} alt="" style={mediaStyle} />
        )}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={study.image}
      alt=""
      style={mediaStyle}
    />
  );
}

function WebsiteProjectCard({ study, featured = false }) {
  return (
    <article className={`web-work-card${featured ? " web-work-card--featured" : ""}`}>
      <div className={getMediaShellClass(study, "web-work-media")}>
        <ProjectMedia study={study} />
      </div>
      <div className="web-work-body">
        <div className="web-work-copy">
          <h3>{study.title}</h3>
          <p>{study.overview}</p>
        </div>
        {study.appUrl ? (
          <a
            className="web-work-link"
            href={study.appUrl}
            target="_blank"
            rel="noreferrer"
          >
            View live site
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <a className="web-work-link" href={`/case-studies#${study.slug}`}>
            View project
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function WebsitesPage() {
  const heroFeaturedProject =
    websiteProjects.find((study) => study.slug === "olo") ?? websiteProjects[0];

  // Dark is the default treatment — preview light with ?theme=light.
  const [isDark] = React.useState(() => {
    if (typeof window === "undefined") return true;
    return new URLSearchParams(window.location.search).get("theme") !== "light";
  });

  React.useEffect(() => {
    document.title = "Websites · Human AI Studio";
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.background;
    const prevBody = body.style.background;
    const pageBg = isDark ? "#0b0b0c" : "#f8f8f6";
    html.style.background = pageBg;
    body.style.background = pageBg;

    return () => {
      html.style.background = prevHtml;
      body.style.background = prevBody;
    };
  }, [isDark]);

  return (
    <div className={`web-page${isDark ? " web-page--dark" : ""}`}>
      <header className="web-nav">
        <a className="web-brand" href="/">
          <span className="web-brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <NavMenu />
      </header>

      <main className="web-main">
        <WebsitesHero
          featuredProject={heroFeaturedProject}
          bookingUrl={bookingUrl}
          bookingAttributes={bookingAttributes}
          onBookCall={openBookingModal}
        />

        <section className="web-section web-section--work" id="websites-work" aria-labelledby="websites-work-title">
          <Entrance className="web-section-heading web-section-heading--single-line">
            <EntranceItem as="h2" id="websites-work-title">
              Selected website work
            </EntranceItem>
            <EntranceItem as="p">
              Live marketing sites and product storytelling built for clarity, conversion, and brand presence.
            </EntranceItem>
          </Entrance>
          {websiteProjects.length ? (
            <Entrance className="web-work-grid">
              {websiteProjects.map((study) => (
                <EntranceItem key={study.slug}>
                  <WebsiteProjectCard study={study} featured />
                </EntranceItem>
              ))}
            </Entrance>
          ) : (
            <div className="web-empty">More website projects coming soon.</div>
          )}
        </section>

        <section className="web-section" aria-labelledby="websites-process-title">
          <Entrance className="web-section-heading">
            <EntranceItem as="h2" id="websites-process-title">
              How we work
            </EntranceItem>
          </Entrance>
          <Entrance className="web-process">
            {processSteps.map((step) => (
              <EntranceItem as="div" className="web-process-step" key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.body}</span>
              </EntranceItem>
            ))}
          </Entrance>
        </section>

        <section className="web-testimonials" aria-labelledby="websites-testimonials-title">
          <Entrance className="web-testimonials-heading">
            <EntranceItem as="h2" id="websites-testimonials-title">
              What clients say
            </EntranceItem>
          </Entrance>
          <Entrance className="web-testimonials-grid">
            {websiteTestimonials.map((testimonial) => (
              <EntranceItem as="blockquote" className="web-testimonial" key={testimonial.name}>
                <p>“{testimonial.quote}”</p>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </footer>
              </EntranceItem>
            ))}
          </Entrance>
        </section>
      </main>

      <footer className="web-footer" aria-label="Human AI Studio footer">
        <div className="web-footer-inner">
          <div className="web-footer-brand">
            <a className="web-brand" href="/" aria-label="Human AI Studio home">
              <span className="web-brand-mark" aria-hidden="true" />
              Human AI Studio
            </a>
            <p>Strategy, design, and development for ambitious digital products.</p>
          </div>
          <div className="web-footer-contact">
            <span>Contact</span>
            <a href="mailto:john@humanaistudio.ai">john@humanaistudio.ai</a>
            <a
              href={bookingUrl}
              {...bookingAttributes}
              onClick={openBookingModal}
            >
              Book a call
            </a>
          </div>
        </div>
        <div className="web-footer-wordmark" aria-hidden="true">Human AI Studio</div>
      </footer>
    </div>
  );
}
