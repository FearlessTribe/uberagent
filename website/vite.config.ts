import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const PRODUCTION_WORKER = "https://uberagent.laurens-kd-lang.workers.dev";
const apiProxyTarget =
  process.env.VITE_API_PROXY ??
  (process.env.VITE_USE_LOCAL_WORKER === "1"
    ? "http://127.0.0.1:8787"
    : PRODUCTION_WORKER);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
});
