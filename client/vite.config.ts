import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 3050, // Default: 3050, Change to 5173 for local dev
    },
  },
});
