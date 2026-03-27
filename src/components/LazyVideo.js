import { useRef, useState, useEffect } from 'react';

/*
  LazyVideo — Only loads video when it enters viewport.
  Pauses when scrolled out of view to save CPU.
  Drop-in replacement for <video autoPlay loop muted playsInline>.

  Usage:
    <LazyVideo src={myVideo} className="full-video" />
*/

function LazyVideo({ src, className = '', rootMargin = '200px' }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* Load video when near viewport (one-time) */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  /* Play/pause based on visibility — prevents multiple offscreen videos decoding */
  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;

    el.muted = true;
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <video
      ref={ref}
      className={className}
      src={loaded ? src : undefined}
      loop
      muted
      playsInline
      preload="none"
    />
  );
}

export default LazyVideo;
