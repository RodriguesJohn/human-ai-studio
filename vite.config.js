import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ["index.html", "academy.html"]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        academy: resolve(import.meta.dirname, "academy.html")
      }
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ["**/MyPortfolio/**", "**/versions/**", "**/src/assets/academy-refs/**"]
    }
  }
});
