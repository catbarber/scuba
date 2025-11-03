// components/BookingTour.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Calendar, 
  ArrowLeft,
  User,
  Mail,
  Phone,
  CheckCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from 'lucide-react'
import { usePayment } from '../contexts/PaymentContext'
import PaymentForm from '../components/PaymentForm'

const BookingTour = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createPaymentIntent, createBooking } = usePayment()
  
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    participants: 1,
    specialRequests: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Payment state
  const [paymentStep, setPaymentStep] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const [bookingId, setBookingId] = useState(null)

  // Mock tour data
  const tours = [
    {
      id: 1,
      name: "Coral Garden Explorer - Tobago",
      description: "Discover vibrant coral formations and tropical fish in our most popular shallow reef dive. Perfect for beginners and experienced divers alike, this tour offers a safe and mesmerizing introduction to the underwater world.",
      price: 89,
      duration: "3 hours",
      groupSize: "6 divers",
      difficulty: "Beginner",
      location: "Buccoo Reef",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["Colorful Corals", "Tropical Fish", "Perfect for Beginners", "Photography Friendly"],
      includes: ["Professional Guide", "All Equipment", "Safety Briefing", "Refreshments"],
      requirements: ["Basic Swimming Skills", "Minimum Age: 12", "Medical Clearance"]
    },
    {
      id: 2,
      name: "Ship Wreck 100ft Dive - Tobago",
      description: "Experience the thrill of exploring a sunken ship at 100 feet depth. This advanced dive offers incredible visibility and abundant marine life surrounding the historic wreck.",
      price: 129,
      duration: "4 hours",
      groupSize: "4 divers",
      difficulty: "Advanced",
      location: "Maverick Wreck",
      rating: 4.95,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["Sunken ship", "One hundred feet dive", "Advanced Skills Required", "Marine Life"],
      includes: ["Advanced Guide", "Full Equipment", "Deep Dive Briefing", "Safety Equipment"],
      requirements: ["Advanced Certification", "Minimum 20 Logged Dives", "Medical Clearance"]
    },
    {
      id: 3,
      name: "Night Dive Adventure - Tobago",
      description: "Witness the sea come alive at night with nocturnal creatures and bioluminescent displays. A truly magical experience for adventurous divers.",
      price: 109,
      duration: "2.5 hours",
      groupSize: "5 divers",
      difficulty: "Beginner",
      location: "Buccoo Reef",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1587502536575-6dfba0c82b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["Nocturnal Species", "Bioluminescence", "Unique Photography", "Thrilling Experience"],
      includes: ["Night Guide", "Underwater Lights", "Safety Equipment", "Hot Drinks"],
      requirements: ["Open Water Certification", "Night Dive Experience", "Medical Clearance"]
    },
  ]

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const foundTour = tours.find(t => t.id === parseInt(id))
        setTour(foundTour)
        
        if (!foundTour) {
          navigate('/tours')
        }
      } catch (error) {
        console.error('Error fetching tour:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTour()
  }, [id, navigate])

  // Date Picker Functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateAvailable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const formatDisplayDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setFormData(prev => ({
        ...prev,
        date: formatDate(date)
      }))
      setShowDatePicker(false)
      
      if (errors.date) {
        setErrors(prev => ({
          ...prev,
          date: ''
        }))
      }
    }
  }

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      days.push(date)
    }

    return days
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (formData.participants < 1) newErrors.participants = 'At least 1 participant is required'
    if (tour && formData.participants > parseInt(tour.groupSize)) {
      newErrors.participants = `Maximum ${tour.groupSize} participants allowed`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setSubmitting(true)
    try {
      // 1. Create booking in Firestore
      const booking = await createBooking(tour, formData, calculateTotal())
      setBookingId(booking.bookingId)

      // 2. Create payment intent
      const paymentIntent = await createPaymentIntent(calculateTotal(), {
        bookingId: booking.bookingId,
        tourId: tour.id,
        tourName: tour.name,
        customerName: formData.fullName,
        customerEmail: formData.email
      })

      setClientSecret(paymentIntent.clientSecret)
      setPaymentStep(true)
      
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Payment successful:', paymentIntent)
    setBookingSuccess(true)
    setPaymentStep(false)
  }

  const handlePaymentCancel = () => {
    setPaymentStep(false)
    setClientSecret(null)
    setBookingId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) || 1 : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const calculateTotal = () => {
    return tour ? tour.price * formData.participants : 0
  }

  // Date Picker Component
  const DatePicker = () => (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1rem',
      marginTop: '0.5rem',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      zIndex: 20
    }}>
      {/* Month Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <button
          type="button"
          onClick={() => navigateMonth(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        
        <span style={{
          fontWeight: '600',
          color: 'var(--deep-blue)',
          fontSize: '1rem'
        }}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        
        <button
          type="button"
          onClick={() => navigateMonth(1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week Days Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.25rem',
        marginBottom: '0.5rem'
      }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '0.75rem',
            color: '#666',
            padding: '0.5rem 0'
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.25rem'
      }}>
        {generateCalendarDays().map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} style={{ padding: '0.5rem' }} />
          }

          const isAvailable = isDateAvailable(date)
          const isSelected = formData.date === formatDate(date)
          const isWeekendDay = isWeekend(date)
          const isToday = formatDate(date) === formatDate(new Date())

          return (
            <button
              key={formatDate(date)}
              type="button"
              onClick={() => handleDateSelect(date)}
              disabled={!isAvailable}
              style={{
                background: isSelected 
                  ? 'var(--caribbean-blue)' 
                  : isToday
                  ? 'rgba(0, 168, 232, 0.1)'
                  : 'transparent',
                color: isSelected 
                  ? 'white' 
                  : !isAvailable
                  ? '#ccc'
                  : isWeekendDay
                  ? '#ff4444'
                  : 'var(--deep-blue)',
                border: isToday && !isSelected ? '2px solid var(--caribbean-blue)' : '1px solid transparent',
                borderRadius: '6px',
                padding: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: isSelected ? '600' : '400',
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                if (isAvailable && !isSelected) {
                  e.target.style.background = 'rgba(0, 168, 232, 0.1)'
                }
              }}
              onMouseOut={(e) => {
                if (isAvailable && !isSelected) {
                  e.target.style.background = isToday ? 'rgba(0, 168, 232, 0.1)' : 'transparent'
                }
              }}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.75rem',
        color: '#666'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'var(--caribbean-blue)',
            borderRadius: '2px'
          }} />
          <span>Selected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'rgba(0, 168, 232, 0.1)',
            border: '1px solid var(--caribbean-blue)',
            borderRadius: '2px'
          }} />
          <span>Today</span>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
          <p style={{ fontSize: '1.1rem', color: 'var(--deep-blue)' }}>Loading tour details...</p>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--deep-blue)' }}>
            Tour not found
          </p>
          <button
            onClick={() => navigate('/tours')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--caribbean-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Back to Tours
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '1rem',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => navigate('/tours')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600',
            color: 'var(--deep-blue)',
            margin: 0
          }}>
            {paymentStep ? 'Complete Payment' : 'Book Your Dive'}
          </h1>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '1rem'
      }}>
        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {/* Tour Summary Card - Always visible */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              <div style={{
                height: '200px',
                background: `url(${tour.image}) center/cover`,
                borderRadius: '8px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--chartreuse)',
                  color: '#333',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  ${tour.price}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Star size={16} fill="currentColor" />
                  {tour.rating}
                </div>
              </div>

              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                  color: 'var(--deep-blue)'
                }}>
                  {tour.name}
                </h2>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {tour.description}
                </p>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    color: '#555'
                  }}>
                    <MapPin size={18} style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                    <span>{tour.location}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    color: '#555'
                  }}>
                    <Clock size={18} style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                    <span>{tour.duration}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.95rem',
                    color: '#555'
                  }}>
                    <Users size={18} style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                    <span>{tour.groupSize} • {tour.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Step */}
          {paymentStep && clientSecret ? (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <CreditCard size={32} style={{ color: 'var(--caribbean-blue)' }} />
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    margin: 0,
                    color: 'var(--deep-blue)'
                  }}>
                    Complete Your Payment
                  </h2>
                  <p style={{
                    color: '#666',
                    margin: '0.25rem 0 0 0'
                  }}>
                    Secure payment processed by Stripe
                  </p>
                </div>
              </div>

              <PaymentForm
                amount={calculateTotal()}
                bookingId={bookingId}
                clientSecret={clientSecret}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            </div>
          ) : bookingSuccess ? (
            /* Success State */
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={64} style={{ 
                  color: 'var(--chartreuse)', 
                  marginBottom: '1.5rem' 
                }} />
                <h3 style={{ 
                  color: 'var(--deep-blue)', 
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  Booking Confirmed!
                </h3>
                <p style={{ 
                  color: '#666', 
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  Thank you for booking {tour.name}. Your payment has been processed successfully. 
                  We've sent a confirmation email with all the details. Our team will contact you 
                  within 24 hours to finalize your adventure.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/tours')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'var(--caribbean-blue)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Browse More Tours
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      color: 'var(--caribbean-blue)',
                      border: '2px solid var(--caribbean-blue)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '1.5rem',
                color: 'var(--deep-blue)'
              }}>
                Your Information
              </h3>

              <form onSubmit={handleBookingSubmit}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '0.95rem'
                    }}>
                      <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `2px solid ${errors.fullName ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'border-color 0.2s ease'
                      }}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.875rem',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '0.95rem'
                    }}>
                      <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `2px solid ${errors.email ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.875rem',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '0.95rem'
                    }}>
                      <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `2px solid ${errors.phone ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.875rem',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Date Picker */}
                  <div style={{ position: 'relative' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '0.95rem'
                    }}>
                      <Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Preferred Date
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `2px solid ${errors.date ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        background: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: formData.date ? 'var(--deep-blue)' : '#999' }}>
                        {formData.date ? formatDisplayDate(formData.date) : 'Select a date'}
                      </span>
                      <Calendar size={18} style={{ color: '#666' }} />
                    </button>
                    {errors.date && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.875rem',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>
                        {errors.date}
                      </span>
                    )}
                    
                    {showDatePicker && <DatePicker />}
                  </div>

                  {/* Participants */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '0.95rem'
                    }}>
                      <Users size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Number of Participants
                    </label>
                    <input
                      type="number"
                      name="participants"
                      value={formData.participants}
                      onChange={handleChange}
                      min="1"
                      max={parseInt(tour.groupSize)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `2px solid ${errors.participants ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                    {errors.participants && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.875rem',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>
                        {errors.participants}
                      </span>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '0.95rem'
                    }}>
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="4"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                      placeholder="Any special requirements, dietary restrictions, or questions..."
                    />
                  </div>

                  {/* Price Summary */}
                  <div style={{
                    background: 'rgba(0, 168, 232, 0.1)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: 'var(--deep-blue)',
                      fontSize: '1.1rem'
                    }}>
                      Total: ${calculateTotal()}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.9rem', 
                      color: '#666' 
                    }}>
                      {formData.participants} participant(s) × ${tour.price}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: submitting 
                        ? '#ccc' 
                        : 'linear-gradient(135deg, var(--caribbean-blue) 0%, var(--deep-blue) 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        Continue to Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for date picker */}
      {showDatePicker && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
            zIndex: 15
          }}
          onClick={() => setShowDatePicker(false)}
        />
      )}
    </div>
  )
}

export default BookingTour