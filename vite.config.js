import {defineConfig} from "vite";
import {viteSingleFile} from "vite-plugin-singlefile";

export default defineConfig({
    assetsInclude: ["**/*.bmp"],
    plugins: [viteSingleFile()],
    build: {
        target: "esnext",
        assetsInlineLimit: 100_000_000,
        chunkSizeWarningLimit: 100_000_000,
        cssCodeSplit: false,
        brotliSize: false,
        rollupOptions: {
            inlineDynamicImports: true,
            output: {
                manualChunks() {
                    return "app.js";
                },
            },
        },
    },
});
