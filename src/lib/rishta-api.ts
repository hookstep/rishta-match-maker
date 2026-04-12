/** Relative `/api/*` calls go through Vite proxy when `VITE_API_PROXY_TARGET` is set (see vite.config). */
export async function rishtaApi(
  path: string,
  getToken: () => Promise<string | null | undefined>,
  init: RequestInit = {},
) {
  const token = await getToken().catch(() => null);
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(path, { ...init, headers, credentials: "include" });
}
