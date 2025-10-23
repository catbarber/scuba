const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Admin SDK first (minimal initialization)
admin.initializeApp();

// Lazy load heavy dependencies
let stripe, express, cors;

const getStripe = () => {
    if (!stripe) {
        stripe = require('stripe')(functions.config().stripe?.secret_key || process.env.STRIPE_SECRET_KEY);
    }
    return stripe;
};

const getExpress = () => {
    if (!express) {
        express = require('express');
    }
    return express;
};

const getCors = () => {
    if (!cors) {
        cors = require('cors');
    }
    return cors;
};

// Simple health check endpoint
exports.health = functions.https.onRequest(async (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Create donation intent (minimal version)
exports.createDonationIntent = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    getCors()({ origin: true })(req, res, async () => {
        try {
            const { amount, currency, donorName, donorEmail } = req.body;

            // Validate required fields
            if (!amount || !donorEmail) {
                return res.status(400).json({ error: 'Missing required fields: amount and donorEmail' });
            }

            if (amount < 50) {
                return res.status(400).json({ error: 'Amount must be at least $0.50' });
            }

            const stripeInstance = getStripe();

            const paymentIntent = await stripeInstance.paymentIntents.create({
                amount: parseInt(amount),
                currency: currency || 'usd',
                metadata: {
                    donorName: donorName || 'Anonymous',
                    donorEmail,
                    type: 'donation'
                }
            });

            // Log to Firestore (non-blocking)
            try {
                await admin.firestore().collection('donation_attempts').add({
                    amount: amount / 100,
                    donorName: donorName || 'Anonymous',
                    donorEmail,
                    status: 'created',
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    stripePaymentIntentId: paymentIntent.id
                });
            } catch (firestoreError) {
                console.error('Firestore logging error:', firestoreError);
                // Don't fail the request if logging fails
            }

            res.json({
                clientSecret: paymentIntent.client_secret,
                amount: paymentIntent.amount
            });

        } catch (error) {
            console.error('Error creating donation intent:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Webhook handler
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const expressApp = getExpress();
    const app = expressApp();

    app.use('/webhook', expressApp.raw({ type: 'application/json' }));

    app.post('/webhook', async (request, response) => {
        const sig = request.headers['stripe-signature'];
        let event;

        try {
            const stripeInstance = getStripe();
            event = stripeInstance.webhooks.constructEvent(
                request.body,
                sig,
                functions.config().stripe?.webhook_secret || process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log(`Webhook signature verification failed.`, err.message);
            return response.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;

            try {
                await admin.firestore().collection('donations').add({
                    amount: paymentIntent.amount / 100,
                    donorName: paymentIntent.metadata.donorName,
                    donorEmail: paymentIntent.metadata.donorEmail,
                    stripePaymentIntentId: paymentIntent.id,
                    status: 'completed',
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
                console.log(`Donation recorded: ${paymentIntent.amount} from ${paymentIntent.metadata.donorEmail}`);
            } catch (error) {
                console.error('Error recording donation:', error);
            }
        }

        response.json({ received: true });
    });

    app(req, res);
});

// Optional: Keep your existing API structure but simplified
exports.api = functions.https.onRequest(async (req, res) => {
    const expressApp = getExpress();
    const cors = getCors();
    const app = expressApp();

    app.use(cors({ origin: true }));
    app.use(expressApp.json());

    app.post('/create-donation-intent', async (req, res) => {
        try {
            const { amount, currency, donorName, donorEmail } = req.body;

            if (!amount || !donorEmail) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const stripeInstance = getStripe();
            const paymentIntent = await stripeInstance.paymentIntents.create({
                amount: parseInt(amount),
                currency: currency || 'usd',
                metadata: { donorName: donorName || 'Anonymous', donorEmail, type: 'donation' }
            });

            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.get('/health', (req, res) => {
        res.json({ status: 'ok', service: 'scuba-diving-api' });
    });

    app(req, res);
});