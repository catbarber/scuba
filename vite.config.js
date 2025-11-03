// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_ENV__: JSON.stringify(mode)
    },
    
    // Server configuration for development
    server: {
      port: 5173,
      host: true
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            firebase: ['firebase/app', 'firebase/firestore', 'firebase/functions', 'firebase/auth'],
            stripe: ['@stripe/stripe-js', '@stripe/react-stripe-js']
          }
        }
      }
    },
    
    // Environment-specific configurations
    ...(mode === 'development' && {
      // Development-specific settings
    }),
    
    ...(mode === 'production' && {
      // Production-specific settings
    })
  }
})