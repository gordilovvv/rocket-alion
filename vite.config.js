import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
// import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
// import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'

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
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
            web3: 'web3/dist/web3.min.js',
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
    // optimizeDeps: {
    //     esbuildOptions: {
    //         plugins: [
    //             NodeModulesPolyfills(),
    //             GlobalsPolyfills({
    //                 process: true,
    //                 buffer: true,
    //             }),
    //         ],
    //         define: {
    //             global: 'globalThis',
    //         },
    //     },
    // }
})
