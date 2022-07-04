import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from '@svgr/rollup'

import dotenv from 'dotenv'
dotenv.config()

console.log('🏘 DOTENV BASE_URL:', process.env.BASE_URL)

console.log('Base Path:', [...process.env.BASE_URL?.split('') || []])

export default defineConfig({
  plugins: [
    reactRefresh(),
    svgr(),
    viteStaticCopy({
      targets: [
        {
          // src: '../../../node_modules/@djitsu/themes/dist/themes',
          src: '../../packages/themes/dist/themes',
          // dest: 'packages/renderer/public'
          // dest: "themes",
          dest: './themes',
          rename: ''
        }
      ],
      watch: {
        reloadPageOnChange: true
      }
    })
  ],
  base: process.env.BASE_URL || '/',
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 39911
    }
  }
})
