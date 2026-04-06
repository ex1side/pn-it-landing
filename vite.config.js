import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/pn-it-landing/',

    build: {
        outDir: 'docs',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                services: resolve(__dirname, 'services.html'),
                schedule: resolve(__dirname, 'schedule-a-consult.html')
            }
        }
    }
})