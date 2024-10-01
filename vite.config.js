import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            "/api": {
                target: "https://api.d-id.com/talks",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/getapi": {
                target: `https://api.d-id.com/talks`,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/getapi/, ""),
            },
        },
    },
    plugins: [react()],
});
