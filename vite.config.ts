import { defineConfig, type Plugin } from 'vite'
import preact from '@preact/preset-vite'
import { manifest } from './manifest.config'

function emitManifest(): Plugin {
  return {
    name: 'emit-manifest',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'manifest.json', source: JSON.stringify(manifest, null, 2) })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [preact(), emitManifest()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode === 'development',
    rollupOptions: {
      input: {
        sidepanel: 'sidepanel.html',
        background: 'src/background/index.ts',
        content: 'src/content/index.ts',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
  test: { environment: 'node' },
}))
