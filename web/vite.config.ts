import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(() => {
  const apiTarget = process.env.VITE_API_TARGET || "http://localhost:4177";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
