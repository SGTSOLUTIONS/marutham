import { useEffect } from 'react';

export function useFadeAnimation() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll(
      '.hero-aef, .zig-box, .about-aef, .footer-aef, .section-head-aef'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    fadeEls.forEach((el) => {
      el.classList.add('fade-up');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}