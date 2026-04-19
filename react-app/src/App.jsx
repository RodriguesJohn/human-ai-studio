import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Bio from './components/Bio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.scrollY - 44;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      io.disconnect();
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Bio />
      <Contact />
      <Footer />
    </>
  );
}
