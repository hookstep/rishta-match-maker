import { useEffect } from "react";
import { adsenseClientParam } from "@/lib/site";

const SCRIPT_MARKER = "data-rishtewale-adsense-loader";

/**
 * Loads the AdSense script once when `VITE_ADSENSE_CLIENT` is set (e.g. `ca-pub-…`).
 * Mount only on pages where you intend to show ads and have consent/policy coverage.
 */
export function OptionalAdSenseLoader() {
  useEffect(() => {
    const client = adsenseClientParam();
    if (!client) return;
    if (document.head.querySelector(`script[${SCRIPT_MARKER}]`)) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    s.crossOrigin = "anonymous";
    s.setAttribute(SCRIPT_MARKER, "1");
    document.head.appendChild(s);
  }, []);
  return null;
}
