import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            svgo: false
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly'  
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/assets/scss/abstracts/abstracts.scss';`
            }
        }
    },
});
