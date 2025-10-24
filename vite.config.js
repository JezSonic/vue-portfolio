import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        "process.env": import.meta.env,
    },
    plugins: [
        vue(),
        tailwindcss(),
        ViteImageOptimizer({
            png: {
                quality: 80,
            },
            jpeg: {
                quality: 80,
            },
            jpg: {
                quality: 80,
            },
            webp: {
                lossless: true,
                quality: 80,
            },
            avif: {
                lossless: false,
                quality: 50,
            },
        }),
        VitePWA({
            registerType: 'autoUpdate',
            disable: true,
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webm|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
                            },
                        },
                    },
                ],
            },
            devOptions: {
                enabled: true
            }
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
