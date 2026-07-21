import React from "react";
import OfferingShader from "./OfferingShader.jsx";
import "./academy.css";

const COHORT_URL = "https://maven.com/humanaistudio/aimasterycohort";
const ACADEMY_URL = "https://www.skool.com/ai-design-academy-6114/about";

const AppleLogo = "/academy/Apple.png";
const GoogleLogo = "/academy/Google.svg.png";
const MetaLogo = "/academy/meta.png";
const ChaseLogo = "/academy/Chase.png";
const HubspotLogo = "/academy/Hubspot.svg.png";
const IntercomLogo = "/academy/intercom-1-logo-png-transparent.png";
const CursorBlogImage = "/academy/CursorBlog.png";
const ClaudeCodeBlog = "/academy/ClaudeCodeBlog.png";
const NativeMobileImage = "/academy/NativeMobile.jpg";
const DanaImage = "/academy/Dana.jpeg";
const IniImage = "/academy/Indi.jpeg";
const BrettImage = "/academy/Brett.jpeg";
const SonaliImage = "/academy/Sonali.jpeg";
const SnehImage = "/academy/Sneh.webp";
const KennyImage = "/academy/Kenny.jpeg";
const LindaImage = "/academy/Linda.jpeg";
const AviadImage = "/academy/Avaid.jpeg";
const DanImage = "/academy/Dan.jpeg";

const ACADEMY_HERO_VIDEO = "/academy/hero.mp4";
const ACADEMY_HERO_VIDEO_MOBILE = "/academy/hero-mobile.mp4";
const ACADEMY_HERO_POSTER = "/academy/ai-builder-academy-hero.jpg";

function AcademyHeroVideo() {
  const videoRef = React.useRef(null);

  const setVideoRef = React.useCallback((node) => {
    videoRef.current = node;
    if (!node) return;

    // iOS Safari / Chrome Android only autoplay when muted + inline are set as DOM attrs.
    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.autoplay = true;
    node.controls = false;
    node.setAttribute("autoplay", "");
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "true");
    node.setAttribute("x5-playsinline", "true");
    node.setAttribute("x5-video-player-type", "h5");
    node.removeAttribute("controls");
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      video.removeAttribute("data-ready");
      return undefined;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const markReady = () => {
      video.setAttribute("data-ready", "true");
    };

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.controls = false;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(markReady).catch(() => {});
      }
    };

    // Load the selected <source> then attempt playback.
    video.load();
    tryPlay();

    const playEvents = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "playing"
    ];
    playEvents.forEach((eventName) => video.addEventListener(eventName, tryPlay));
    video.addEventListener("playing", markReady);

    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };
    const onFirstGesture = () => tryPlay();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onVisible);
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirstGesture, { once: true });

    return () => {
      playEvents.forEach((eventName) => video.removeEventListener(eventName, tryPlay));
      video.removeEventListener("playing", markReady);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onVisible);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("pointerdown", onFirstGesture);
    };
  }, []);

  return (
    <div className="academy-hero-media" aria-hidden="true">
      <video
        ref={setVideoRef}
        className="academy-hero-video"
        poster={ACADEMY_HERO_POSTER}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.defaultMuted = true;
          event.currentTarget.play().catch(() => {});
        }}
        onCanPlay={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget
            .play()
            .then(() => event.currentTarget.setAttribute("data-ready", "true"))
            .catch(() => {});
        }}
      >
        <source src={ACADEMY_HERO_VIDEO_MOBILE} media="(max-width: 768px)" type="video/mp4" />
        <source src={ACADEMY_HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="academy-hero-video-gradient" />
      <div className="academy-hero-video-vignette" />
    </div>
  );
}

const logos = [
  { src: AppleLogo, alt: "Apple" },
  { src: GoogleLogo, alt: "Google" },
  { src: MetaLogo, alt: "Meta" },
  { src: ChaseLogo, alt: "JPMorgan Chase" },
  { src: HubspotLogo, alt: "HubSpot" },
  { src: IntercomLogo, alt: "Intercom" }
];

const cohortPackageBenefits = [
  "4 live workshops",
  "Certificate of completion",
  "Live sessions with John",
  "Ship a real AI product workflow",
  "Recordings of every session",
  "Private cohorts for teams also available on request"
];

const pricingBenefits = [
  "Structured courses and tracks for Claude Code, Cursor, Codex, and more",
  "Stay updated with the latest AI research, news, and trends",
  "Recordings, resources, prompts, and templates"
];

const cohortModules = [
  {
    title: "AI\nfluency",
    description:
      "Build AI habits that show up in real product work. Prototype faster, ship clearer systems, and keep a workflow you can run after the course ends.",
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "Tools that\nship",
    description:
      "Get structured with Claude Code, Cursor, Codex, and more. Follow tracks built around the tools teams actually ship with, and keep growing as the library expands.",
    color1: "#8b5cf6",
    color2: "#ddd6fe"
  },
  {
    title: "Agents &\nsystems",
    description:
      "Go beyond prompts. Build agents that handle real tasks, make your design system agent-ready, and ship work you can show and keep iterating on.",
    color1: "#10b981",
    color2: "#a7f3d0"
  }
];

const courses = [
  {
    id: 6,
    title: "Claude Code",
    excerpt: "Ship products and tighten your workflow with Claude Code.",
    category: "Track",
    image: ClaudeCodeBlog
  },
  {
    id: 7,
    title: "Cursor",
    excerpt: "Composer, Agent Mode, and parallel workflows that move faster.",
    category: "Track",
    image: CursorBlogImage
  },
  {
    id: 8,
    title: "Codex",
    excerpt: "Plan, build, and ship native iOS apps with Codex.",
    category: "Track",
    image: NativeMobileImage
  }
];

const bonusResources = [
  { title: "AI Strategy Track" },
  { title: "AI Agents Track" },
  { title: "Project Demos" },
  { title: "Design Engineering Track" },
  { title: "Complete Figma Course" },
  { title: "Tools & Credits" },
  { title: "Productivity Workflows" },
  { title: "AI Foundation Track" }
];

const testimonials = [
  {
    quote:
      "I'm leaving this course feeling truly confident in my AI fluency. I'm now ready to build a new portfolio quickly and effectively.",
    name: "Dana",
    role: "Lead Product Designer, ex Rite Aid",
    img: DanaImage
  },
  {
    quote:
      "I've gone from not knowing how to code to building my own AI agent. Every session has been engaging, interactive, and deeply impactful.",
    name: "IniOluwa",
    role: "Senior Product Designer, Intercom",
    img: IniImage
  },
  {
    quote:
      "John equipped me with understanding the AI possibility space to take my initial ideas and turn them into working POCs.",
    name: "Brett",
    role: "Product Designer",
    img: BrettImage
  },
  {
    quote:
      "John emphasizes practical application over lectures, which made the material immediately useful.",
    name: "Sonali",
    role: "Sr. Product Designer, JPMorgan Chase",
    img: SonaliImage
  },
  {
    quote:
      "His strategic frameworks and live sessions helped me think like both a strategist and a solutionist.",
    name: "Sneh",
    role: "UX Designer",
    img: SnehImage
  },
  {
    quote:
      "This cohort gave me the foundation to understand AI at a high level, and how to design human-centered AI experiences.",
    name: "Kenneth Hargrove",
    role: "Product Designer, CoStar",
    img: KennyImage
  },
  {
    quote:
      "John's course is practical, with demos and real encouragement to explore AI tools specifically for designers.",
    name: "Linda",
    role: "Principal PD, JPMorgan Chase",
    img: LindaImage
  },
  {
    quote:
      "Always accessible. He creates additional tutorials on demand and is ready to help with patience and care.",
    name: "Aviad",
    role: "Product Designer",
    img: AviadImage
  },
  {
    quote:
      "Crash course in AI tools: Relume, Lovable, Figma Make, n8n, and more. John was extremely knowledgeable.",
    name: "Dan",
    role: "UX Designer, RTI International",
    img: DanImage
  }
];

function TestimonialScroller() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <div className="academy-marquee">
      <div className="academy-marquee-fade academy-marquee-fade--left" />
      <div className="academy-marquee-fade academy-marquee-fade--right" />
      <div className="academy-marquee-track academy-marquee-track--testimonials">
        {marqueeItems.map((testimonial, index) => (
          <figure
            className="academy-testimonial"
            key={`${testimonial.name}-${index}`}
          >
            <figcaption>
              <img src={testimonial.img} alt="" />
              <span>
                <strong>{testimonial.name}</strong>
                <small>{testimonial.role}</small>
              </span>
            </figcaption>
            <blockquote>“{testimonial.quote}”</blockquote>
          </figure>
        ))}
      </div>
    </div>
  );
}

function AcademyPage() {
  React.useEffect(() => {
    document.title = "AI Academy · Human AI Studio";
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
    <div className="academy-page">
      <header className="academy-nav">
        <a className="academy-brand" href="/">
          <span className="academy-brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="academy-nav-actions">
          <a className="academy-nav-cta" href={ACADEMY_URL} target="_blank" rel="noreferrer">
            Join Academy
          </a>
        </div>
      </header>

      <main>
        <section className="academy-hero-wrap academy-hero-wrap--cinematic">
          <AcademyHeroVideo />
          <div className="academy-hero">
            <div className="academy-hero-copy">
              <h1 className="academy-fade-rise">
                <span className="academy-hero-line">Level up your AI workflows.</span>
                <span className="academy-hero-line">Ship real AI products.</span>
              </h1>
              <p className="academy-hero-sub academy-fade-rise-delay">
                Build AI fluency that shows up in your work.
                <br />
                Live cohort with certification, or self-paced learning at AI Academy.
              </p>
              <div className="academy-hero-actions academy-fade-rise-delay-2">
                <a
                  className="academy-btn academy-btn--primary"
                  href={COHORT_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join the live cohort
                </a>
                <a
                  className="academy-btn academy-btn--secondary"
                  href={ACADEMY_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join the Academy
                </a>
              </div>
            </div>
          </div>

          <div className="academy-logo-row" aria-label="Professionals from leading companies">
            {logos.map((logo) => (
              <img key={logo.alt} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-section-heading academy-section-heading--center">
            <h2>Two ways to get started.</h2>
            <p className="academy-section-sub academy-section-sub--center">
              Live for a finish line and certificate. Self-paced for structure on your schedule.
            </p>
          </div>
          <div className="academy-path-grid">
            <article className="academy-path-card">
              <h3>Live cohort with certification</h3>
              <p>
                A live cohort with workshops, vibe coding, agent building, and agentic design systems built to take you from curious to shipping.
              </p>
              <ul>
                <li>4.6/5 rating across cohorts</li>
                <li>Live sessions with John</li>
                <li>Ship a real AI product workflow</li>
              </ul>
              <a
                className="academy-btn academy-btn--primary"
                href={COHORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the live cohort
              </a>
            </article>
            <article className="academy-path-card academy-path-card--muted">
              <h3>Self-paced learning at AI Academy</h3>
              <p>
                A self-paced track for industry professionals with structured courses, recordings, and an ever-growing library for Claude Code, Cursor, and Codex.
              </p>
              <ul>
                <li>Structured courses and tracks for Claude Code, Cursor, Codex, and more</li>
                <li>Stay updated with the latest AI research, news, and trends</li>
              </ul>
              <a
                className="academy-btn academy-btn--secondary-dark"
                href={ACADEMY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the Academy
              </a>
            </article>
          </div>
        </section>

        <section className="academy-section" id="cohort">
          <div className="academy-section-heading">
            <h2>What you get</h2>
            <p className="academy-section-sub">
              Join the Academy and leave with skills, systems, and tools you can use on real work, not just notes from a workshop.
            </p>
          </div>
          <div className="academy-modules">
            {cohortModules.map((module, index) => (
              <article
                className="academy-module-card"
                key={module.title}
                style={{
                  "--card-color-1": module.color1,
                  "--card-color-2": module.color2
                }}
              >
                <div className="academy-module-thumb">
                  <OfferingShader
                    color1={module.color1}
                    color2={module.color2}
                    seed={index * 3.7 + 1.3}
                    className="academy-module-shader"
                  />
                  <span className="academy-module-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="academy-module-thumb-title">{module.title}</h3>
                </div>
                <div className="academy-module-copy">
                  <p>{module.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-section-heading">
            <h2>Tools you’ll actually use.</h2>
          </div>
          <div className="academy-course-grid">
            {courses.map((course) => (
              <article className="academy-course" key={course.id}>
                <div className="academy-course-media">
                  <img src={course.image} alt="" />
                </div>
                <div className="academy-course-body">
                  <h3>{course.title}</h3>
                  <p>{course.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-section-heading">
            <h2>More resources and courses for you to level up your skills.</h2>
          </div>
          <div className="academy-marquee">
            <div className="academy-marquee-fade academy-marquee-fade--left" />
            <div className="academy-marquee-fade academy-marquee-fade--right" />
            <div className="academy-marquee-track academy-marquee-track--bonus">
              {[...bonusResources, ...bonusResources].map((resource, index) => (
                <article
                  className="academy-bonus-card"
                  key={`${resource.title}-${index}`}
                >
                  <div className="academy-bonus-face">
                    <h3>{resource.title}</h3>
                  </div>
                  <div className="academy-bonus-foot">
                    <p>{resource.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-section-heading academy-section-heading--center">
            <h2>Professionals are already putting these workflows to work.</h2>
          </div>
          <TestimonialScroller />
        </section>

        <section className="academy-section" id="membership">
          <div className="academy-section-heading academy-section-heading--center">
            <h2>Choose how you want to learn.</h2>
            <p className="academy-section-sub">
              Join the live cohort for a focused month of workshops, or learn self-paced in the Academy.
            </p>
          </div>
          <div className="academy-packages">
            <article className="academy-package">
              <h3>Live Cohort</h3>
              <div className="academy-price">
                <span>$1,499</span>
              </div>
              <p>
                Four live workshops built to take you from curious to shipping, with a certificate of completion when you finish.
              </p>
              <ul className="academy-check-list">
                {cohortPackageBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <a
                className="academy-btn academy-btn--primary academy-btn--full"
                href={COHORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the live cohort
              </a>
            </article>
            <article className="academy-package">
              <h3>Self-paced</h3>
              <div className="academy-price">
                <span>$149</span>
                <small>/ month</small>
              </div>
              <p>
                Structured tracks, recordings, and an ever-growing library for Claude Code, Cursor, Codex, and more. Plus ongoing AI research, news, and trends at your own pace.
              </p>
              <ul className="academy-check-list">
                {pricingBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <a
                className="academy-btn academy-btn--secondary academy-btn--full"
                href={ACADEMY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the Academy
              </a>
            </article>
          </div>
          <p className="academy-disclaimer">
            Courses and materials shown on this page may differ from what’s included in each package. Review the individual package details before purchasing.
          </p>
        </section>
      </main>

      <footer className="academy-footer">
        <div className="academy-footer-inner">
          <div>
            <p>
              AI Academy for industry professionals shipping with AI through live cohorts and self-paced tracks.
            </p>
          </div>
          <div className="academy-footer-links">
            <a href="/">Studio</a>
            <a href={COHORT_URL} target="_blank" rel="noreferrer">
              Live cohort
            </a>
            <a href={ACADEMY_URL} target="_blank" rel="noreferrer">
              Academy
            </a>
            <a href="mailto:john@humanaistudio.ai">Contact</a>
          </div>
        </div>
        <div className="academy-footer-bottom">
          <p>© 2026 Human AI Studio. All rights reserved.</p>
          <p>Built for designers, founders, and industry professionals.</p>
        </div>
      </footer>
    </div>
  );
}

export default AcademyPage;
