// src/components/PaymentForm.jsx
import React, { useState, useEffect } from 'react'
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import { stripePromise } from '../stripe/config'
import { usePayment } from '../contexts/PaymentContext'
import { Loader2, CheckCircle, XCircle, CreditCard } from 'lucide-react'

const CheckoutForm = ({ amount, bookingId, onSuccess, onCancel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { processPayment, loading, error, clearError } = usePayment()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          onSuccess?.(paymentIntent)
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe, onSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    clearError()

    try {
      await processPayment(elements, stripe, null, bookingId)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: 'var(--deep-blue)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CreditCard size={24} />
            Payment Details
          </h3>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--caribbean-blue)'
          }}>
            ${amount}
          </div>
        </div>

        <LinkAuthenticationElement
          onChange={(e) => setEmail(e.value.email)}
        />
        
        <div style={{ margin: '1.5rem 0' }}>
          <PaymentElement 
            options={{
              layout: 'tabs',
              wallets: {
                applePay: 'never',
                googlePay: 'never'
              }
            }}
          />
        </div>

        {message && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            background: message.includes('succeeded') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: message.includes('succeeded') ? '#166534' : '#dc2626',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            {message.includes('succeeded') ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {message}
          </div>
        )}

        {error && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#dc2626',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between'
      }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing || loading}
          style={{
            padding: '1rem 2rem',
            background: 'transparent',
            color: '#6b7280',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#f9fafb'
            e.target.style.borderColor = '#d1d5db'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.borderColor = '#e5e7eb'
          }}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={!stripe || isProcessing || loading}
          style={{
            padding: '1rem 2rem',
            background: !stripe || isProcessing || loading 
              ? '#9ca3af' 
              : 'linear-gradient(135deg, var(--caribbean-blue) 0%, var(--deep-blue) 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: !stripe || isProcessing || loading ? 'not-allowed' : 'pointer',
            flex: 2,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            if (!isProcessing && !loading && stripe) {
              e.target.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseOut={(e) => {
            if (!isProcessing && !loading && stripe) {
              e.target.style.transform = 'translateY(0)'
            }
          }}
        >
          {isProcessing || loading ? (
            <>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
              Processing...
            </>
          ) : (
            `Pay $${amount}`
          )}
        </button>
      </div>

      <div style={{
        marginTop: '1.5rem',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4'
        }}>
          Your payment is secured with SSL encryption. We don't store your payment details.
        </p>
      </div>
    </form>
  )
}

const PaymentForm = ({ amount, bookingId, clientSecret, onSuccess, onCancel }) => {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#00a8e8',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px'
      }
    }
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm 
        amount={amount}
        bookingId={bookingId}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  )
}

export default PaymentForm