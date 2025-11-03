// src/contexts/PaymentContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getFunctions, 
  httpsCallable 
} from 'firebase/functions'
import { stripePromise } from '../stripe/config'

const PaymentContext = createContext()

export const usePayment = () => {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

export const PaymentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const functions = getFunctions()

  const createPaymentIntent = async (amount, metadata = {}) => {
    setLoading(true)
    setError(null)

    try {
      const createPaymentIntentFunction = httpsCallable(functions, 'createPaymentIntent')
      const result = await createPaymentIntentFunction({
        amount,
        currency: 'usd',
        metadata
      })

      return result.data
    } catch (error) {
      console.error('Error creating payment intent:', error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (tour, bookingData, totalAmount) => {
    try {
      const createBookingFunction = httpsCallable(functions, 'createBooking')
      const result = await createBookingFunction({
        tour,
        bookingData,
        totalAmount
      })

      return result.data
    } catch (error) {
      console.error('Error creating booking:', error)
      setError(error.message)
      throw error
    }
  }

  const processPayment = async (elements, stripe, clientSecret, bookingId) => {
    setLoading(true)
    setError(null)

    try {
      if (!stripe || !elements) {
        throw new Error('Stripe has not been initialized')
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/booking-confirmation?booking=${bookingId}`,
        },
        redirect: 'if_required'
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      return paymentIntent
    } catch (error) {
      console.error('Payment processing error:', error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    loading,
    error,
    createPaymentIntent,
    createBooking,
    processPayment,
    clearError: () => setError(null)
  }

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  )
}