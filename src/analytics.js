const GA_ID = 'G-6EF17VMZ6L';

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

// Page view (called on every route change)
export function trackPageView(path, title) {
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
}

// Custom event helper
export function trackEvent(eventName, params = {}) {
  gtag('event', eventName, params);
}

// Case study view
export function trackCaseStudyView(caseName) {
  trackEvent('case_study_view', {
    case_name: caseName,
  });
}

// Outbound link click
export function trackOutboundClick(url, label) {
  trackEvent('outbound_click', {
    link_url: url,
    link_label: label || url,
  });
}

// Scroll depth tracking
export function initScrollTracking() {
  const thresholds = [25, 50, 75, 90];
  const fired = new Set();

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((scrollTop / docHeight) * 100);

    for (const t of thresholds) {
      if (percent >= t && !fired.has(t)) {
        fired.add(t);
        trackEvent('scroll_depth', {
          depth_percent: t,
          page_path: window.location.pathname,
        });
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
    fired.clear();
  };
}

// Track time on page
export function initEngagementTimer() {
  const start = Date.now();
  const path = window.location.pathname;

  return () => {
    const seconds = Math.round((Date.now() - start) / 1000);
    if (seconds >= 5) {
      trackEvent('page_engagement', {
        page_path: path,
        engagement_seconds: seconds,
      });
    }
  };
}
