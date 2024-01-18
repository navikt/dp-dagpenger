import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "vitestSetup.ts",
    testTimeout: 10000,
    exclude: ["**/node_modules/**", "**/playwright/**"],
  },
});
