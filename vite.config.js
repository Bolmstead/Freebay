import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
  esbuild: {
    loader: "jsx",
    include: ["src/**/*.js", "src/**/*.jsx"],
  },
  optimizeDeps: {
    esbuild: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
