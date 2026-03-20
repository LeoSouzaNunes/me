import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";

const isSPA = process.env.BUILD_SPA === "true";

export default defineConfig({
  server: { port: 3000 },
  base: isSPA ? "/me/" : "/",
  plugins: [
    tanstackStart({
      ...(isSPA && {
        spa: {
          enabled: true,
          prerender: { enabled: true },
        },
      }),
    }),
    react(),
  ],
});
