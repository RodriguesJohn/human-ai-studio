import React from "react";
import { Entrance, EntranceItem } from "./entrance.jsx";
import framerLogo from "../assets/logos/framer.svg";
import reactLogo from "../assets/logos/react-mark.svg";
import tailwindLogo from "../assets/logos/tailwind.svg";
import nextLogo from "../assets/logos/nextjs-mark.svg";

export const buildTools = [
  { name: "Framer", icon: framerLogo, slug: "framer" },
  { name: "React", icon: reactLogo, slug: "react" },
  { name: "Tailwind", icon: tailwindLogo, slug: "tailwind" },
  { name: "Next.js", icon: nextLogo, slug: "next" }
];

function HeroBackdropMedia({ study, className = "" }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [study.video]);

  if (study.video) {
    return (
      <video
        ref={videoRef}
        className={className}
        src={study.video}
        poster={study.image}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    );
  }

  return <img className={className} src={study.image} alt="" />;
}

export function WebsitesHero({
  featuredProject,
  bookingUrl,
  bookingAttributes,
  onBookCall
}) {
  return (
    <section className="web-hero web-hero--cinematic" aria-labelledby="websites-hero-title">
      <div className="web-hero-shell">
        {featuredProject ? (
          <div className="web-hero-backdrop" aria-hidden="true">
            <HeroBackdropMedia
              study={featuredProject}
              className="web-hero-backdrop-media"
            />
            <div className="web-hero-backdrop-scrim" />
          </div>
        ) : (
          <div className="web-hero-backdrop web-hero-backdrop--empty" aria-hidden="true" />
        )}

        <div className="web-hero-rail">
          <Entrance className="web-hero-content" animate="visible">
            <EntranceItem as="h1" id="websites-hero-title" className="web-hero-title">
              High-converting websites that drive business growth.
            </EntranceItem>
            <EntranceItem as="p" className="web-hero-sub">
              Websites built to convert visitors, grow revenue, and earn retention.
              <br />
              Clear positioning and premium design that earns trust from the first scroll.
            </EntranceItem>
            <EntranceItem className="web-hero-actions">
              <a
                className="web-btn web-btn--solid"
                href={bookingUrl}
                {...bookingAttributes}
                onClick={onBookCall}
              >
                Book a call
                <span className="web-btn-chevron" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="web-btn web-btn--ghost" href="#websites-work">
                See the work
              </a>
            </EntranceItem>
            <EntranceItem className="web-hero-tools">
              <span className="web-hero-tools-label">Built with</span>
              <div className="web-hero-tools-row">
                {buildTools.map((tool) => (
                  <span
                    className={`web-tool web-tool--${tool.slug}`}
                    key={tool.name}
                  >
                    <img src={tool.icon} alt={tool.name} loading="lazy" />
                  </span>
                ))}
              </div>
            </EntranceItem>
          </Entrance>
        </div>
      </div>
    </section>
  );
}
