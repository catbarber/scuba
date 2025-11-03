// functions/index.js
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Stripe = require('stripe')
const cors = require('cors')({ origin: true })

admin.initializeApp()
const stripe = Stripe(functions.config().stripe.secret_key)

// Create Payment Intent
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = data

    // Validate authentication
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
    }

    // Validate amount
    if (!amount || amount < 50) { // Minimum $0.50
      throw new functions.https.HttpsError('invalid-argument', 'Invalid amount')
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        ...metadata,
        userId: context.auth.uid,
        createdAt: new Date().toISOString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Log payment intent creation
    await admin.firestore().collection('paymentLogs').add({
      userId: context.auth.uid,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      status: 'created',
      createdAt: new Date().toISOString()
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw new functions.https.HttpsError('internal', error.message)
  }
})

// Webhook handler for Stripe events
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      functions.config().stripe.webhook_secret
    )
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object)
        break
      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).send('Webhook handler failed')
  }
})

async function handlePaymentIntentSucceeded(paymentIntent) {
  const { id, amount, metadata } = paymentIntent
  
  // Update booking status in Firestore
  if (metadata.bookingId) {
    await admin.firestore().collection('bookings').doc(metadata.bookingId).update({
      paymentStatus: 'completed',
      paymentIntentId: id,
      amountPaid: amount / 100,
      paidAt: new Date().toISOString()
    })
  }

  // Log successful payment
  await admin.firestore().collection('paymentLogs').add({
    paymentIntentId: id,
    userId: metadata.userId,
    amount: amount / 100,
    status: 'succeeded',
    bookingId: metadata.bookingId,
    completedAt: new Date().toISOString()
  })

  // Send confirmation email (you can integrate with SendGrid or similar here)
  console.log(`Payment succeeded for booking: ${metadata.bookingId}`)
}

async function handlePaymentIntentFailed(paymentIntent) {
  const { id, last_payment_error, metadata } = paymentIntent

  await admin.firestore().collection('paymentLogs').add({
    paymentIntentId: id,
    userId: metadata.userId,
    amount: paymentIntent.amount / 100,
    status: 'failed',
    error: last_payment_error?.message,
    failedAt: new Date().toISOString()
  })

  // Update booking status
  if (metadata.bookingId) {
    await admin.firestore().collection('bookings').doc(metadata.bookingId).update({
      paymentStatus: 'failed',
      paymentError: last_payment_error?.message
    })
  }
}

async function handlePaymentIntentCanceled(paymentIntent) {
  const { id, metadata } = paymentIntent

  await admin.firestore().collection('paymentLogs').add({
    paymentIntentId: id,
    userId: metadata.userId,
    amount: paymentIntent.amount / 100,
    status: 'canceled',
    canceledAt: new Date().toISOString()
  })

  if (metadata.bookingId) {
    await admin.firestore().collection('bookings').doc(metadata.bookingId).update({
      paymentStatus: 'canceled'
    })
  }
}

// Function to create a booking
exports.createBooking = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  const { tour, bookingData, totalAmount } = data

  try {
    const bookingRef = await admin.firestore().collection('bookings').add({
      userId: context.auth.uid,
      tour: tour,
      bookingData: bookingData,
      totalAmount: totalAmount,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return { bookingId: bookingRef.id }
  } catch (error) {
    console.error('Error creating booking:', error)
    throw new functions.https.HttpsError('internal', 'Failed to create booking')
  }
})