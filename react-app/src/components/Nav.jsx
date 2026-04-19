import { useEffect, useState } from 'react';

export default function Nav() {
  const [time, setTime] = useState('—:—');

  useEffect(() => {
    const tick = () => {
      try {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit', minute: '2-digit', hour12: false,
        }).formatToParts(new Date());
        const hh = parts.find(p => p.type === 'hour')?.value ?? '--';
        const mm = parts.find(p => p.type === 'minute')?.value ?? '--';
        setTime(`${hh}:${mm} PT`);
      } catch {
        setTime('--:-- PT');
      }
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="top">
      <div className="wrap">
        <a className="mark" href="#top" aria-label="Human AI Studio — home">
          <svg className="glyph" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="10" stroke="#f2f1ee" strokeWidth="1" />
            <g className="spin">
              <path d="M11 3 V19" stroke="#f2f1ee" strokeWidth="1" />
              <path d="M3 11 H19" stroke="#7e7d79" strokeWidth="1" />
            </g>
          </svg>
          <span>Human&nbsp;AI&nbsp;Studio</span>
          <span className="sub">/ by <b>John&nbsp;Rodrigues</b></span>
        </a>
        <div className="nav-right">
          <div className="nav-clock" aria-hidden="true">
            <span className="blip"></span>
            <span className="city">SF</span>
            <span className="sep">·</span>
            <span>{time}</span>
          </div>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#bio">About</a></li>
            <li><a href="#contact" className="cta">Work with me →</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
