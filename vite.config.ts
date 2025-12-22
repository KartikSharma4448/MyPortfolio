import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from 'vite-plugin-sitemap';

// __dirname fix for ES modules (Professional approach)
const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react(),
    sitemap({
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
      ],
      // Output directory configuration
      outDir: path.resolve(__dirname, "dist/public")
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu'],
          utils: ['framer-motion', 'clsx', 'zod'],
        },
      },
    },
    sourcemap: false,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
