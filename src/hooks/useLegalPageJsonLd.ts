import { useLayoutEffect } from "react";
import { siteName, siteOrigin } from "@/lib/site";

const SCRIPT_ID = "jsonld-legal-subpage";

/**
 * Injects WebPage + BreadcrumbList JSON-LD for policy pages (GEO / rich results).
 * Removes the script on unmount to avoid stale graph data when navigating.
 */
export function useLegalPageJsonLd(path: string, pageName: string) {
  useLayoutEffect(() => {
    const base = siteOrigin();
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const url = `${base}${normalized}`;

    document.getElementById(SCRIPT_ID)?.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: pageName,
          isPartOf: { "@id": `${base}/#website` },
          about: { "@id": `${base}/#organization` },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: siteName,
              item: `${base}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: pageName,
              item: url,
            },
          ],
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [path, pageName]);
}
