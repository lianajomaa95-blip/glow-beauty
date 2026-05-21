// src/components/Analytics.js
//
// Loads Google Analytics 4 for tracking page views and custom events.
// Only activates in production (skips localhost).

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 👉 YOUR REAL MEASUREMENT ID
const GA_MEASUREMENT_ID = "G-DS4XJJGZZ9";

// Optional pixels (leave empty if not using)
const FB_PIXEL_ID = "";
const LINKEDIN_PARTNER_ID = "";

const IS_PROD = process.env.NODE_ENV === "production";

export default function Analytics() {
  const location = useLocation();

  // === ONE-TIME LOAD ===
  useEffect(() => {
    if (!IS_PROD) return;

    /* ============ GOOGLE ANALYTICS 4 ============ */
    if (GA_MEASUREMENT_ID) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      const gaInit = document.createElement("script");
      gaInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          send_page_view: true,
        });
      `;
      document.head.appendChild(gaInit);
    }

    /* ============ FACEBOOK PIXEL (optional) ============ */
    if (FB_PIXEL_ID) {
      const fbScript = document.createElement("script");
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }

    /* ============ LINKEDIN INSIGHT TAG (optional) ============ */
    if (LINKEDIN_PARTNER_ID) {
      const liScript = document.createElement("script");
      liScript.innerHTML = `
        _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);
        })(window.lintrk);
      `;
      document.head.appendChild(liScript);
    }
  }, []);

  // === TRACK PAGE VIEW ON ROUTE CHANGE ===
  useEffect(() => {
    if (!IS_PROD) return;

    if (typeof window.gtag === "function") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return null;
}