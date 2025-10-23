import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import sitemap from 'vite-plugin-sitemap'; // <--- 1. YEH LINE ADD KAREIN

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    sitemap({ // <--- 2. YEH POORA BLOCK ADD KAREIN
      hostname: 'https://kartiksharma.site',
      dynamicRoutes: [
        '/',
        '/about',
        '/projects',
        '/services',
        '/achievements',
        '/blog',
        '/contact',
        '/social-links'
      ]
    }),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});