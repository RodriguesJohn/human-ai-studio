import { useEffect, useRef } from 'react';

const beats = [
  { human: 'Designs', ai: 'Iterates', output: 'Shipped' },
  { human: 'Directs', ai: 'Proposes', output: 'Aligned' },
  { human: 'Decides', ai: 'Drafts', output: 'Reviewed' },
  { human: 'Ships', ai: 'Builds', output: 'Live' },
];

export default function Hero() {
  const humanRef = useRef(null);
  const aiRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789·';
    const timers = new Set();

    const scramble = (el, target, duration = 500) => {
      if (!el) return;
      const steps = Math.max(6, Math.floor(duration / 40));
      let step = 0;
      const pad = target.length;
      const id = setInterval(() => {
        step++;
        if (step >= steps) {
          clearInterval(id);
          timers.delete(id);
          el.textContent = target;
          return;
        }
        let out = '';
        for (let i = 0; i < pad; i++) {
          if (i < (step / steps) * pad) out += target[i];
          else out += chars[Math.floor(Math.random() * chars.length)];
        }
        el.textContent = out;
      }, 40);
      timers.add(id);
    };

    let i = 0;
    const seed = setTimeout(() => {
      const cycle = setInterval(() => {
        i = (i + 1) % beats.length;
        scramble(humanRef.current, beats[i].human, 900);
        const t1 = setTimeout(() => scramble(aiRef.current, beats[i].ai, 900), 450);
        const t2 = setTimeout(() => scramble(outputRef.current, beats[i].output, 1100), 900);
        timers.add(t1); timers.add(t2);
      }, 9500);
      timers.add(cycle);
    }, 3500);
    timers.add(seed);

    return () => {
      timers.forEach(t => { clearTimeout(t); clearInterval(t); });
    };
  }, []);

  return (
    <header className="hero" id="top">
      <svg className="grid-wave-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="gridWave" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.011" numOctaves="1" seed="4" result="noise">
              <animate attributeName="baseFrequency"
                dur="12s"
                values="0.006 0.011; 0.010 0.016; 0.006 0.011"
                repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="ambient" aria-hidden="true">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="hero-grid-bg" aria-hidden="true"></div>

      <div className="wrap hero-inner">
        <div className="hero-left">
          <h1 className="display">
            <span className="clip-line l1"><span>Human&nbsp;AI&nbsp;Studio.</span></span>
          </h1>

          <p className="hero-sub">
            Design Engineering Studio independently run by <strong>John Rodrigues</strong> to help AI-native teams.
          </p>

          <div className="hero-cta">
            <a className="btn primary" href="#contact">
              Work with me
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn" href="#services">
              Services
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside className="precision" aria-hidden="true">
          <div className="p-grid">
            <span className="p-label-corner tl">Human</span>
            <span className="p-label-corner tr">AI</span>
            <span className="p-label-corner bl">Intent</span>
            <span className="p-label-corner br">Outcome</span>

            <svg className="p-ring" viewBox="-70 -70 140 140" aria-hidden="true">
              <circle className="ring ring-dim" cx="0" cy="0" r="54" />

              <g className="rot-outer">
                <circle className="ring" cx="0" cy="0" r="46" />
                <g>
                  <line className="tick-major" x1="0" y1="-46" x2="0" y2="-52" />
                  <line className="tick-major" x1="0" y1="-46" x2="0" y2="-52" transform="rotate(90)" />
                  <line className="tick-major" x1="0" y1="-46" x2="0" y2="-52" transform="rotate(180)" />
                  <line className="tick-major" x1="0" y1="-46" x2="0" y2="-52" transform="rotate(270)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(30)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(60)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(120)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(150)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(210)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(240)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(300)" />
                  <line className="tick" x1="0" y1="-46" x2="0" y2="-50" transform="rotate(330)" />
                </g>
              </g>

              <g className="rot-inner">
                <circle className="ring ring-dim" cx="0" cy="0" r="30" strokeDasharray="2 3" />
              </g>

              <g className="orbit-pair">
                <line className="bond" x1="0" y1="-46" x2="0" y2="46" />
                <circle className="orbit-dot-human" cx="0" cy="-46" r="2.6" />
                <circle className="orbit-dot-ai" cx="0" cy="46" r="2.6" />
              </g>

              <g className="crosshair">
                <line x1="-54" y1="0" x2="-40" y2="0" />
                <line x1="40" y1="0" x2="54" y2="0" />
                <line x1="0" y1="-54" x2="0" y2="-40" />
                <line x1="0" y1="40" x2="0" y2="54" />
              </g>

              <circle className="halo" cx="0" cy="0" r="4" />
              <circle className="pulse" cx="0" cy="0" r="3" />
            </svg>
          </div>

          <div className="p-data">
            <div className="row"><span>Human</span><b ref={humanRef}>Designs</b></div>
            <div className="row"><span>AI</span><b ref={aiRef}>Iterates</b></div>
            <div className="row"><span>Outcome</span><b ref={outputRef}>Shipped</b></div>
          </div>
        </aside>
      </div>
    </header>
  );
}
