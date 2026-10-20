import { siteName, siteOrigin } from "@/lib/site";

const DEFAULT_TITLE = `${siteName} — Find your forever | Trusted matrimony`;
const DEFAULT_DESC =
  "Rishtewale Sardarji — serious Indian matrimony: structured profiles, privacy-first browsing, and guided connections. Register free; premium unlocks full biodata.";

/** Matches index.html default social preview image. */
const DEFAULT_OG_IMAGE = "https://img1.wsimg.com/isteam/getty/2148405076";

function upsertMeta(name: "description", content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertOgProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertTwitterName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertRobots(content: string) {
  let el = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeCanonical() {
  document.querySelector('link[rel="canonical"]')?.remove();
}

function applySocialMeta(opts: {
  title: string;
  description: string;
  /** Full URL shown as og:url / for Twitter card context */
  pageUrl: string;
}) {
  upsertOgProperty("og:title", opts.title);
  upsertOgProperty("og:description", opts.description);
  upsertOgProperty("og:url", opts.pageUrl);
  upsertOgProperty("og:image", DEFAULT_OG_IMAGE);
  upsertTwitterName("twitter:title", opts.title);
  upsertTwitterName("twitter:description", opts.description);
  upsertTwitterName("twitter:image", DEFAULT_OG_IMAGE);
}

export type PageSeo = {
  title: string;
  description?: string;
  /** Path only, e.g. `/privacy` */
  canonicalPath?: string;
  /** Set true for auth, 404, etc. */
  noindex?: boolean;
  /** Avoid a canonical URL on error pages (prevents soft-duplicate signals). */
  omitCanonical?: boolean;
  /**
   * When set, used as og:url (e.g. 404 pages should not advertise a non-existent canonical share URL).
   * Defaults to the same URL as the canonical link.
   */
  openGraphPageUrl?: string;
};

export function applyPageSeo(opts: PageSeo) {
  const desc = opts.description ?? DEFAULT_DESC;
  document.title = opts.title;
  upsertMeta("description", desc);
  upsertRobots(opts.noindex ? "noindex, follow" : "index, follow");

  const origin = siteOrigin();
  const path = opts.canonicalPath ?? "/";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalHref = `${origin}${normalizedPath}`;

  if (opts.omitCanonical) {
    removeCanonical();
  } else {
    upsertCanonical(canonicalHref);
  }

  const pageUrl = opts.openGraphPageUrl ?? (opts.omitCanonical ? `${origin}/` : canonicalHref);
  applySocialMeta({ title: opts.title, description: desc, pageUrl });
}

export function resetSeoToDefaults() {
  applyPageSeo({ title: DEFAULT_TITLE, description: DEFAULT_DESC, canonicalPath: "/", noindex: false });
}
