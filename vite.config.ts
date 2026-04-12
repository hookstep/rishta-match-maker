import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const appRoot = __dirname;
const rishtaRoot = path.resolve(appRoot, "../../rishta-matchmaker");

function hasRishtaEnvFiles(): boolean {
  if (!fs.existsSync(rishtaRoot)) return false;
  return (
    fs.existsSync(path.join(rishtaRoot, ".env.local")) ||
    fs.existsSync(path.join(rishtaRoot, ".env"))
  );
}

export default defineConfig(({ mode }) => {
  const local = loadEnv(mode, appRoot, "");
  const shared = hasRishtaEnvFiles() ? loadEnv(mode, rishtaRoot, "") : {};
  const merged = { ...shared, ...local };

  const define: Record<string, string> = {
    __RISHTA_ADMIN_EMAILS__: JSON.stringify(merged.ADMIN_EMAILS ?? ""),
  };

  for (const [k, v] of Object.entries(shared)) {
    if (!(k.startsWith("VITE_") || k.startsWith("NEXT_PUBLIC_"))) continue;
    if (String(local[k] ?? "").trim()) continue;
    define[`import.meta.env.${k}`] = JSON.stringify(v);
  }

  const apiProxy =
    merged.VITE_API_PROXY_TARGET?.trim() ||
    merged.NEXT_PUBLIC_APP_URL?.trim() ||
    "";

  return {
    root: appRoot,
    envDir: appRoot,
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    define,
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: false },
      ...(apiProxy
        ? {
            proxy: {
              "/api": { target: apiProxy, changeOrigin: true, secure: false },
            },
          }
        : {}),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(appRoot, "./src"),
      },
    },
  };
});
