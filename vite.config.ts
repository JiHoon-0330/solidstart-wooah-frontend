// @ts-ignore
import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ adapter: vercel() })],
  server: {
    proxy: {
      "/instagram": {
        target: "https://scontent.cdninstagram.com",
        changeOrigin: true,
        rewrite(path) {
          return path?.replace("/instagram", "");
        },
      },
    },
  },
});
