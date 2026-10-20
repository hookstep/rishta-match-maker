/** Production canonical origin (SEO, sitemap, JSON-LD). Override when staging on another host, e.g. Cloud Run URL. */
const DEFAULT_SITE_ORIGIN = "https://rishtewalesardarji.in";

export function siteOrigin(): string {
  const fromEnv = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_SITE_ORIGIN;
}

export const siteName = "Rishtewale Sardarji";

/** Official Rishte Wale Sardarji desk email (support, sign-in default, footer). Override with `VITE_DEFAULT_APP_EMAIL`. */
export function defaultAppEmail(): string {
  const fromEnv = (import.meta.env.VITE_DEFAULT_APP_EMAIL as string | undefined)?.trim();
  return fromEnv || "rishtewalesardarji@gmail.com";
}

/** Google AdSense `data-ad-client` / script `client` param, e.g. `ca-pub-1234567890123456`. */
export function adsenseClientParam(): string | undefined {
  const raw = (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined)?.trim();
  return raw || undefined;
}
