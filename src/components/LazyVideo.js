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

  return (
    <video
      ref={ref}
      className={className}
      src={inView ? src : undefined}
      autoPlay={inView}
      loop
      muted
      playsInline
      preload="none"
    />
  );
}

export default LazyVideo;
