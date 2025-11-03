// src/stripe/config.js
import { loadStripe } from '@stripe/stripe-js'

// Get Stripe publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  console.error('Stripe publishable key is missing. Please check your environment variables.')
}

export const stripePromise = loadStripe(stripePublishableKey)

// Helper to check if we're in test mode
export const isStripeTestMode = stripePublishableKey?.startsWith('pk_test')