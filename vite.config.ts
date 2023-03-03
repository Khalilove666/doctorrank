import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
    ],
    // define: {'process.env': {}},
    resolve: {
        alias: {
            "@": path.resolve("src/"),
        },
        // extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
});
