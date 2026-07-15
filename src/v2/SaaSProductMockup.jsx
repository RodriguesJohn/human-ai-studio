import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./saas-mockup.css";

function Icon({ name }) {
  const paths = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    library: <><path d="M4 5.5 12 2l8 3.5-8 3.5-8-3.5Z" /><path d="m4 10 8 3.5 8-3.5M4 14.5l8 3.5 8-3.5" /></>,
    agents: <><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
    activity: <path d="M3 12h4l2.2-6 4.2 12 2.3-6H21" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const navigation = [
  ["overview", "Overview"],
  ["library", "Context library"],
  ["agents", "Agent context"],
  ["activity", "Activity"]
];

const systemCards = [
  { label: "Foundations", count: "18", color: "blue", progress: "92%" },
  { label: "Components", count: "64", color: "violet", progress: "84%" },
  { label: "Patterns", count: "12", color: "green", progress: "78%" }
];

function SaaSProductMockup({ embedded = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`saas-preview${embedded ? " saas-preview-embedded" : ""}`} aria-labelledby={embedded ? undefined : "saas-preview-title"} data-nav-theme="dark">
      {!embedded && <div className="saas-preview-heading reveal">
        <div>
          <p className="eyebrow">Product Preview</p>
          <h2 id="saas-preview-title">Your system, ready for every creator.</h2>
        </div>
        <div className="saas-preview-intro">
          <p>A shared workspace where teams structure product context, monitor system health, and give AI agents the guidance to build on-brand.</p>
          <a href="/product">Explore the product <span aria-hidden="true">↗</span></a>
        </div>
      </div>}

      <motion.div
        className="saas-device reveal"
        initial={reduceMotion ? undefined : { opacity: 0, y: 28, scale: 0.985 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="saas-window-bar">
          <div className="saas-window-dots" aria-hidden="true"><span /><span /><span /></div>
          <div className="saas-window-address"><span className="saas-lock" />system.humanaistudio.ai</div>
          <div className="saas-window-actions" aria-hidden="true"><span /><span /></div>
        </div>

        <div className="saas-app">
          <aside className="saas-sidebar">
            <div className="saas-app-brand"><span className="saas-app-mark"><i /><i /></span><strong>Human AI</strong></div>
            <div className="saas-workspace-switcher">
              <span className="saas-workspace-logo">A</span>
              <div><strong>Atlas Context</strong><small>Production</small></div>
              <span className="saas-chevron">⌄</span>
            </div>
            <nav aria-label="Product mockup">
              {navigation.map(([icon, label], index) => (
                <span className={index === 0 ? "active" : ""} key={label}><Icon name={icon} />{label}</span>
              ))}
            </nav>
            <div className="saas-sidebar-spacer" />
            <div className="saas-context-meter">
              <div><span>Context usage</span><strong>68%</strong></div>
              <i><b /></i>
              <small>34.2k of 50k tokens</small>
            </div>
            <span className="saas-settings"><Icon name="settings" />Settings</span>
            <div className="saas-user"><span>JR</span><div><strong>John Rodrigues</strong><small>Workspace admin</small></div><i /></div>
          </aside>

          <div className="saas-main">
            <header className="saas-topbar">
              <div className="saas-breadcrumb"><span>Atlas Context</span><i>/</i><strong>Overview</strong></div>
              <div className="saas-top-actions"><button className="saas-icon-button" aria-label="Search">⌕</button><button className="saas-share">Share</button><span className="saas-avatar">JR</span></div>
            </header>

            <div className="saas-content">
              <div className="saas-content-title">
                <div><p>Context overview</p><h3>Good afternoon, John.</h3></div>
                <button><span>+</span>Add context</button>
              </div>

              <div className="saas-summary-grid">
                <article className="saas-health-card">
                  <div className="saas-card-head"><div><p>Agent readiness</p><span>Updated 4 min ago</span></div><button>•••</button></div>
                  <div className="saas-health-body">
                    <div className="saas-score"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" /><circle className="score-progress" cx="60" cy="60" r="48" /></svg><div><strong>86</strong><span>/ 100</span></div></div>
                    <div className="saas-health-meta"><span className="ready"><i />Ready for agents</span><p>Design and engineering context is clear across the product.</p><a href="/product">View report <span>→</span></a></div>
                  </div>
                </article>

                <article className="saas-activity-card">
                  <div className="saas-card-head"><div><p>Agent activity</p><span>Last 24 hours</span></div><button>•••</button></div>
                  <div className="saas-agent-event"><span className="agent-orb violet">AI</span><div><strong>Onboarding flow created</strong><p>Using 8 approved patterns</p></div><time>2m</time></div>
                  <div className="saas-agent-event"><span className="agent-orb blue">QA</span><div><strong>Interface audit complete</strong><p>14 screens · 2 flags</p></div><time>18m</time></div>
                  <div className="saas-agent-event"><span className="agent-orb green">DS</span><div><strong>Context synced</strong><p>Figma library · main</p></div><time>1h</time></div>
                </article>
              </div>

              <div className="saas-library-head"><div><p>Context sources</p><span>Coverage across agent-readable product context</span></div><button>View sources <span>→</span></button></div>
              <div className="saas-system-grid">
                {systemCards.map((card) => (
                  <article className={`saas-system-card ${card.color}`} key={card.label}>
                    <div className="saas-system-visual"><span /><span /><span /></div>
                    <div className="saas-system-meta"><div><p>{card.label}</p><span>{card.count} sources</span></div><strong>{card.progress}</strong></div>
                    <i><b style={{ width: card.progress }} /></i>
                  </article>
                ))}
              </div>

              <div className="saas-promptbar"><span className="agent-orb violet">AI</span><p>Ask your product context anything…</p><kbd>⌘ K</kbd><button aria-label="Send prompt">↑</button></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default SaaSProductMockup;
