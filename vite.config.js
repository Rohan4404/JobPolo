import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 2233,
    open: true,
  },

  preview: {
    port: 4173,
  },

  resolve: {
    dedupe: ["react", "react-dom"], // ✅ prevent duplicate React
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: false,
    chunkSizeWarningLimit: 1000,

    // ❌ NO manualChunks
    // ❌ NO splitVendorChunkPlugin
  },
});
