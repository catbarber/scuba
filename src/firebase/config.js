// src/firebase/config.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const db = getFirestore(app)
const functions = getFunctions(app)

export { app, db, functions }