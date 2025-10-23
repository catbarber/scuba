import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Heart, Shield, Trees } from 'lucide-react'
import axios from 'axios'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Donate = () => {
    const [amount, setAmount] = useState('')
    const [customAmount, setCustomAmount] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [donorInfo, setDonorInfo] = useState({
        name: '',
        email: ''
    })

    const presetAmounts = ['25', '50', '100', '250']

    const handleDonation = async (selectedAmount) => {
        setIsLoading(true)
        try {
            const donationAmount = selectedAmount === 'custom' ? customAmount : selectedAmount

            if (!donorInfo.name || !donorInfo.email) {
                alert('Please provide your name and email')
                return
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-donation-intent`, {
                amount: Math.round(parseFloat(donationAmount) * 100), // Convert to cents
                currency: 'usd',
                donorName: donorInfo.name,
                donorEmail: donorInfo.email
            })

            const { clientSecret } = response.data

            const stripe = await stripePromise
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: donorInfo.name,
                        email: donorInfo.email,
                    },
                }
            })

            if (error) {
                alert('Payment failed: ' + error.message)
            } else {
                alert('Thank you for your donation! You will receive a confirmation email shortly.')
                setAmount('')
                setCustomAmount('')
                setDonorInfo({ name: '', email: '' })
            }
        } catch (error) {
            console.error('Donation error:', error)
            alert('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Heart size={48} style={{ color: 'var(--coral)', marginBottom: '1rem' }} />
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        background: 'linear-gradient(45deg, var(--deep-blue), var(--caribbean-blue))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Support Ocean Conservation
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        Your donation helps protect Caribbean marine ecosystems, support coral restoration,
                        and promote sustainable diving practices.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Donation Form */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0, 168, 232, 0.1)'
                    }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--deep-blue)' }}>Make a Donation</h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={donorInfo.name}
                                onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={donorInfo.email}
                                onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '500' }}>
                                Donation Amount (USD)
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                                {presetAmounts.map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setAmount(preset)}
                                        style={{
                                            padding: '12px',
                                            border: `2px solid ${amount === preset ? 'var(--caribbean-blue)' : '#e1e5e9'}`,
                                            borderRadius: '8px',
                                            background: amount === preset ? 'var(--caribbean-blue)' : 'white',
                                            color: amount === preset ? 'white' : '#333',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        ${preset}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                placeholder="Custom amount"
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value)
                                    setAmount('custom')
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `2px solid ${amount === 'custom' ? 'var(--caribbean-blue)' : '#e1e5e9'}`,
                                    borderRadius: '8px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>

                        <button
                            onClick={() => handleDonation(amount)}
                            disabled={isLoading || !amount || (amount === 'custom' && !customAmount)}
                            className="btn-primary"
                            style={{ width: '100%' }}
                        >
                            {isLoading ? 'Processing...' : `Donate $${amount === 'custom' ? customAmount : amount}`}
                        </button>
                    </div>

                    {/* Impact Info */}
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--deep-blue)' }}>Your Impact</h3>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(144, 224, 239, 0.2)',
                            borderRadius: '10px'
                        }}>
                            <Trees size={24} style={{ color: 'var(--chartreuse)', marginRight: '1rem' }} />
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Coral Restoration</h4>
                                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                                    $25 plants 5 new coral fragments
                                </p>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(144, 224, 239, 0.2)',
                            borderRadius: '10px'
                        }}>
                            <Shield size={24} style={{ color: 'var(--caribbean-blue)', marginRight: '1rem' }} />
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Marine Protection</h4>
                                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                                    $100 protects 100 square meters of reef
                                </p>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1rem',
                            background: 'rgba(144, 224, 239, 0.2)',
                            borderRadius: '10px'
                        }}>
                            <Heart size={24} style={{ color: 'var(--coral)', marginRight: '1rem' }} />
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Education</h4>
                                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                                    $250 funds educational programs for 50 students
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donate