// src/utils/env.js
export const env = {
  // Firebase
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },
  
  // Stripe
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    isTestMode: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test')
  },
  
  // App
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Scuba Dive Tobago',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  },
  
  // Feature flags
  features: {
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    analytics: import.meta.env.VITE_GOOGLE_ANALYTICS_ID !== undefined
  },
  
  // URLs
  urls: {
    api: import.meta.env.VITE_API_URL || 'http://localhost:5001'
  }
}

// Validation
export const validateEnvironment = () => {
  const required = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_STRIPE_PUBLISHABLE_KEY'
  ]

  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing)
    return false
  }
  
  return true
}

// Development helpers
export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD
export const isPreview = import.meta.env.VITE_IS_PREVIEW === 'true'