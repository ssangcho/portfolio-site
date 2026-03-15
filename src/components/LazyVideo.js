import { useRef, useState, useEffect } from 'react';

/*
  LazyVideo — Only loads video when it enters viewport.
  Drop-in replacement for <video autoPlay loop muted playsInline>.

  Usage:
    <LazyVideo src={myVideo} className="full-video" />
*/

function LazyVideo({ src, className = '', rootMargin = '200px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  /* Ensure muted attribute is set via DOM (React bug workaround)
     and call play() imperatively for mobile autoplay */
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    el.muted = true;
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      el.play().catch(() => {});
    };

    if (el.readyState >= 2) {
      tryPlay();
    } else {
      el.addEventListener('loadeddata', tryPlay, { once: true });
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      className={className}
      src={inView ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
    />
  );
}

export default LazyVideo;
