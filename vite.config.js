import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "cmuzq-161-18-62-70.free.pinggy.net",
      "hgjwz-161-18-62-70.run.pinggy-free.link"
    ]
  },
  build: {
    rollupOptions: {
      input: "index-react.html"
    }
  }
});
