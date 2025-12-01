import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  MapPin, Clock, Users, Star, Calendar, ArrowLeft,
  CheckCircle, Loader2, ChevronLeft, ChevronRight,
  PhoneCall, AlertCircle, Shield, Anchor, Map,
  Package, Tag, ChevronDown, CreditCard, Sparkles,
  Coffee, Camera, Car, Utensils, FileText
} from 'lucide-react'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { app, db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const BookingTour = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const functions = getFunctions(app)

  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    participants: 1,
    specialRequests: '',
    addOns: [],
    hearAboutUs: '',
    experienceLevel: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showAddOns, setShowAddOns] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookingId, setBookingId] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const addOnOptions = [
    { id: 1, name: 'Underwater Photography', description: 'Professional photos of your dive', price: 45, icon: <Camera size={20} /> },
    { id: 2, name: 'Full Gear Rental', description: 'Complete dive equipment set', price: 30, icon: <Package size={20} /> },
    { id: 3, name: 'Gourmet Lunch Package', description: 'Local cuisine picnic lunch', price: 25, icon: <Utensils size={20} /> },
    { id: 4, name: 'Private Transportation', description: 'Hotel pickup & dropoff service', price: 40, icon: <Car size={20} /> },
    { id: 5, name: 'Video Recording', description: 'HD video of your adventure', price: 60, icon: <Camera size={20} /> }
  ]

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner - First Time' },
    { value: 'novice', label: 'Novice - Few experiences' },
    { value: 'intermediate', label: 'Intermediate - Regular diver' },
    { value: 'advanced', label: 'Advanced - Certified diver' },
    { value: 'expert', label: 'Expert - Professional level' }
  ]

  const referralSources = [
    'Google Search',
    'Social Media',
    'Friend/Family Recommendation',
    'Travel Agency',
    'Hotel/Resort',
    'Previous Customer',
    'Other'
  ]

  // Get tour data from location state
  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true)
      try {
        if (location.state?.tour) {
          console.log('Tour from location state:', location.state.tour)
          setTour(location.state.tour)
        } else {
          console.error('No tour data provided')
          setSubmitError('Tour information not found. Please select a tour first.')
        }
      } catch (error) {
        console.error('Error fetching tour:', error)
        setSubmitError('Failed to load tour information. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTour()
  }, [id, location.state])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.date) newErrors.date = 'Please select a preferred date'
    if (formData.participants < 1) newErrors.participants = 'At least 1 participant is required'
    if (tour && formData.participants > parseInt(tour.groupSize)) {
      newErrors.participants = `Maximum ${tour.groupSize} participants allowed for this tour`
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Replace the handleBookingSubmit function with this:
  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) return

    setSubmitting(true)
    try {
      // Prepare booking data
      const bookingData = {
        tour: {
          id: tour.id,
          name: tour.name,
          price: tour.price,
          duration: tour.duration,
          groupSize: tour.groupSize,
          difficulty: tour.difficulty,
          location: tour.location,
          category: tour.category,
          image: tour.image
        },
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
          hearAboutUs: formData.hearAboutUs || '',
          experienceLevel: formData.experienceLevel || ''
        },
        bookingDetails: {
          date: formData.date,
          participants: formData.participants,
          addOns: formData.addOns || [],
          status: 'pending',
          totalAmount: calculateTotal(),
          addOnsTotal: calculateAddOnsTotal(),
          totalWithAddOns: getTotalWithAddOns(),
          bookingDate: new Date().toISOString(),
          source: 'web'
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ip: await getClientIP(),
          userAgent: navigator.userAgent
        }
      }

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'bookings'), bookingData)

      // Generate a readable booking ID
      const bookingId = `AQUA-${docRef.id.substring(0, 8).toUpperCase()}-${Date.now().toString().slice(-6)}`

      // Optionally update the document with the booking ID
      // await updateDoc(docRef, { 'bookingDetails.bookingId': bookingId })

      setBookingId(bookingId)
      setBookingSuccess(true)

    } catch (error) {
      console.error('Booking error:', error)

      let errorMessage = 'Booking failed. Please try again.'
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check your Firebase rules.'
      } else if (error.message) {
        errorMessage = error.message
      }
      setSubmitError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }


// Function to check booking status
const checkBookingStatus = async (bookingId, email) => {
  try {
    const response = await fetch(
      `https://your-region-your-project.cloudfunctions.net/checkBookingStatus?bookingId=${bookingId}&email=${email}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error checking booking status:', error);
    return { success: false, error: error.message };
  }
};

// Function to resend emails (admin only)
const resendBookingEmails = async (bookingId, apiKey) => {
  try {
    const response = await fetch(
      'https://your-region-your-project.cloudfunctions.net/resendBookingEmails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ bookingId })
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error resending emails:', error);
    return { success: false, error: error.message };
  }
};

// Health check function
const checkServiceHealth = async () => {
  try {
    const response = await fetch(
      'https://your-region-your-project.cloudfunctions.net/healthCheck'
    );
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return { success: false, error: error.message };
  }
};

// Update the success state in your component to show booking status check
{
  bookingSuccess && (
    <div>
      {/* ... existing success UI ... */}
      
      <div style={{
        background: 'rgba(0, 168, 232, 0.05)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '2rem'
      }}>
        <h4 style={{ color: 'var(--deep-blue)', marginBottom: '1rem' }}>
          📧 Email Confirmation
        </h4>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          A confirmation email has been sent to <strong>{formData.email}</strong>.
          If you don't see it, check your spam folder.
        </p>
        
        <button
          onClick={async () => {
            const result = await checkBookingStatus(bookingId, formData.email);
            if (result.success) {
              alert(`Booking status: ${result.bookings[0].status}`);
            }
          }}
          style={{
            padding: '0.5rem 1rem',
            background: 'none',
            border: '1px solid var(--caribbean-blue)',
            color: 'var(--caribbean-blue)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Check Booking Status
        </button>
      </div>
    </div>
  )
}
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) || 1 : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (submitError) setSubmitError('')
  }

  const handleAddOnChange = (addOnId) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }))
  }

  const calculateTotal = () => {
    if (!tour) return 0
    return tour.price * formData.participants
  }

  const calculateAddOnsTotal = () => {
    return addOnOptions
      .filter(addOn => formData.addOns.includes(addOn.id))
      .reduce((sum, addOn) => sum + addOn.price, 0)
  }

  const getTotalWithAddOns = () => {
    return calculateTotal() + calculateAddOnsTotal()
  }

  // Date picker functions
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const isDateAvailable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }
  const formatDate = (date) => date.toISOString().split('T')[0]
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
      setFormData(prev => ({ ...prev, date: formatDate(date) }))
      setShowDatePicker(false)
      if (errors.date) setErrors(prev => ({ ...prev, date: '' }))
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
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      days.push(date)
    }
    return days
  }

  const DatePicker = () => (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: '16px',
      padding: '1.5rem',
      marginTop: '0.5rem',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => navigateMonth(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(0, 168, 232, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'none'}
        >
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontWeight: '700', color: 'var(--deep-blue)', fontSize: '1.2rem' }}>
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
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(0, 168, 232, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'none'}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} style={{ textAlign: 'center', padding: '0.5rem', color: '#666', fontSize: '0.9rem', fontWeight: '600' }}>
            {day}
          </div>
        ))}
        {generateCalendarDays().map((date, index) => {
          if (!date) return <div key={`empty-${index}`} style={{ padding: '0.5rem' }} />
          const isAvailable = isDateAvailable(date)
          const isSelected = formData.date === formatDate(date)
          const isToday = formatDate(date) === formatDate(new Date())
          return (
            <button
              key={formatDate(date)}
              type="button"
              onClick={() => handleDateSelect(date)}
              disabled={!isAvailable}
              style={{
                background: isSelected ? 'var(--caribbean-blue)' : isToday ? 'rgba(0, 168, 232, 0.1)' : 'transparent',
                color: isSelected ? 'white' : !isAvailable ? '#ccc' : 'var(--deep-blue)',
                border: isToday ? '2px solid var(--caribbean-blue)' : '1px solid transparent',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: isSelected ? '700' : '500',
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                minHeight: '3rem'
              }}
              onMouseOver={(e) => isAvailable && !isSelected && (e.target.style.background = 'rgba(0, 168, 232, 0.1)')}
              onMouseOut={(e) => isAvailable && !isSelected && (e.target.style.background = 'transparent')}
            >
              {date.getDate()}
            </button>
          )
        })}
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
        background: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} style={{
            animation: 'spin 1s linear infinite',
            color: 'var(--caribbean-blue)',
            marginBottom: '1rem'
          }} />
          <p style={{ color: 'var(--deep-blue)', fontSize: '1.1rem', fontWeight: '600' }}>
            Loading your adventure details...
          </p>
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
        flexDirection: 'column',
        gap: '1.5rem',
        background: '#f8fafc'
      }}>
        <AlertCircle size={48} style={{ color: 'var(--coral)' }} />
        <p style={{ fontSize: '1.2rem', color: 'var(--deep-blue)', fontWeight: '600' }}>
          Tour information not available
        </p>
        <button
          onClick={() => navigate('/tours')}
          style={{
            padding: '0.75rem 2rem',
            background: 'var(--caribbean-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'var(--deep-blue)'}
          onMouseOut={(e) => e.target.style.background = 'var(--caribbean-blue)'}
        >
          Browse Available Tours
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)' }}>
      {/* Enhanced Header */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
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
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--deep-blue)',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              padding: '0.5rem',
              borderRadius: '6px'
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'var(--caribbean-blue)'
              e.target.style.background = 'rgba(0, 168, 232, 0.1)'
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'var(--deep-blue)'
              e.target.style.background = 'none'
            }}
          >
            <ArrowLeft size={20} />
            Back to Tours
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{
              margin: 0,
              color: 'var(--deep-blue)',
              fontSize: '1.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, var(--deep-blue), var(--caribbean-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Book Your Adventure
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Secure your spot for an unforgettable experience
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0, 168, 232, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--caribbean-blue)'
          }}>
            <Shield size={16} />
            Secure Booking
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Left Column - Tour Summary */}
          <div>
            {/* Enhanced Tour Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 119, 182, 0.12)',
              border: '1px solid rgba(0, 119, 182, 0.08)',
              position: 'sticky',
              top: '6rem'
            }}>
              {/* Image Section */}
              <div style={{
                height: '250px',
                background: `url(${tour.image}) center/cover`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, var(--chartreuse), #c9f73e)',
                  color: '#333',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: '800',
                  fontSize: '1.4rem',
                  boxShadow: '0 5px 20px rgba(201, 247, 62, 0.3)'
                }}>
                  ${tour.price}
                  <span style={{ fontSize: '0.9rem', marginLeft: '0.25rem', opacity: 0.9 }}>per person</span>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backdropFilter: 'blur(5px)'
                }}>
                  <Star size={16} fill="currentColor" />
                  <span style={{ fontWeight: '700' }}>{tour.rating || 4.8}</span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: tour.category === 'marine'
                    ? 'rgba(0, 168, 232, 0.9)'
                    : 'rgba(201, 247, 62, 0.9)',
                  color: tour.category === 'marine' ? 'white' : '#333',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {tour.category === 'marine' ? <Anchor size={16} /> : <Map size={16} />}
                  {tour.category === 'marine' ? 'AquaDeep Marine' : 'Uncharted Land'}
                </div>
              </div>

              {/* Content Section */}
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  color: 'var(--deep-blue)',
                  fontWeight: '800',
                  lineHeight: '1.2'
                }}>
                  {tour.name}
                </h2>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontSize: '1.05rem'
                }}>
                  {tour.description}
                </p>

                {/* Key Details */}
                <div style={{
                  background: 'rgba(0, 168, 232, 0.05)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{
                    margin: '0 0 1rem 0',
                    color: 'var(--deep-blue)',
                    fontSize: '1.1rem',
                    fontWeight: '700'
                  }}>
                    Tour Details
                  </h4>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <MapPin size={18} style={{ color: 'var(--caribbean-blue)' }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Location</div>
                        <div style={{ fontWeight: '600', color: 'var(--deep-blue)' }}>{tour.location}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Clock size={18} style={{ color: 'var(--caribbean-blue)' }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Duration</div>
                        <div style={{ fontWeight: '600', color: 'var(--deep-blue)' }}>{tour.duration}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Users size={18} style={{ color: 'var(--caribbean-blue)' }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Group Size</div>
                        <div style={{ fontWeight: '600', color: 'var(--deep-blue)' }}>
                          {tour.groupSize} • {tour.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Highlights */}
                {tour.highlights && (
                  <div>
                    <h4 style={{
                      margin: '0 0 1rem 0',
                      color: 'var(--deep-blue)',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}>
                      Experience Highlights
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {tour.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(0, 168, 232, 0.1)',
                            color: 'var(--caribbean-blue)',
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safety Note */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(0, 168, 232, 0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <Shield size={20} style={{ color: 'var(--caribbean-blue)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--deep-blue)', marginBottom: '0.25rem' }}>
                      Safety First
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      All guides are certified professionals with emergency training and first aid certification.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            {bookingSuccess ? (
              /* Enhanced Success State */
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0, 168, 232, 0.15)',
                border: '1px solid rgba(0, 119, 182, 0.08)'
              }}>
                <CheckCircle size={80} style={{
                  color: 'var(--chartreuse)',
                  marginBottom: '2rem',
                  filter: 'drop-shadow(0 5px 15px rgba(201, 247, 62, 0.3))'
                }} />
                <h3 style={{
                  color: 'var(--deep-blue)',
                  marginBottom: '1rem',
                  fontSize: '2rem',
                  fontWeight: '800'
                }}>
                  Booking Confirmed!
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontSize: '1.1rem',
                  maxWidth: '500px',
                  margin: '0 auto'
                }}>
                  Thank you for booking <strong>{tour.name}</strong>! We've received your request and will contact you at <strong>{formData.phone}</strong> within 24 hours to confirm details.
                </p>

                <div style={{
                  background: 'rgba(0, 168, 232, 0.05)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginBottom: '2.5rem',
                  textAlign: 'left'
                }}>
                  <h4 style={{ color: 'var(--deep-blue)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    Booking Reference: <span style={{ color: 'var(--caribbean-blue)', fontWeight: '700' }}>{bookingId}</span>
                  </h4>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#666' }}>Tour:</span>
                      <span style={{ fontWeight: '600' }}>{tour.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#666' }}>Date:</span>
                      <span style={{ fontWeight: '600' }}>{formatDisplayDate(formData.date)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#666' }}>Participants:</span>
                      <span style={{ fontWeight: '600' }}>{formData.participants}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0, 168, 232, 0.2)', paddingTop: '0.5rem' }}>
                      <span style={{ color: '#666' }}>Total Amount:</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--caribbean-blue)' }}>
                        ${getTotalWithAddOns()}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/tours')}
                    style={{
                      padding: '1rem 2.5rem',
                      background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-3px)'
                      e.target.style.boxShadow = '0 15px 30px rgba(0, 168, 232, 0.3)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    Browse More Adventures
                  </button>
                </div>
              </div>
            ) : (
              /* Enhanced Booking Form */
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 20px 50px rgba(0, 119, 182, 0.12)',
                border: '1px solid rgba(0, 119, 182, 0.08)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '2px solid #f0f9ff'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 style={{
                      margin: 0,
                      color: 'var(--deep-blue)',
                      fontSize: '1.8rem',
                      fontWeight: '800'
                    }}>
                      Complete Your Booking
                    </h3>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '1rem' }}>
                      Fill in your details to secure your adventure
                    </p>
                  </div>
                </div>

                {submitError && (
                  <div style={{
                    background: '#fee',
                    border: '1px solid #fcc',
                    color: '#c33',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <AlertCircle size={22} />
                    <span style={{ fontWeight: '500' }}>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit}>
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Personal Information */}
                    <section>
                      <h4 style={{
                        marginBottom: '1.5rem',
                        color: 'var(--deep-blue)',
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <Sparkles size={22} />
                        Personal Information
                      </h4>
                      <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                          <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--deep-blue)',
                            fontSize: '1rem'
                          }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            style={{
                              width: '100%',
                              padding: '1rem 1.25rem',
                              border: `2px solid ${errors.fullName ? '#ff4444' : '#e2e8f0'}`,
                              borderRadius: '10px',
                              fontSize: '1rem',
                              transition: 'all 0.2s ease',
                              background: '#f8fafc'
                            }}
                            placeholder="Enter your full name"
                          />
                          {errors.fullName && (
                            <span style={{
                              color: '#ff4444',
                              fontSize: '0.9rem',
                              marginTop: '0.5rem',
                              display: 'block',
                              fontWeight: '500'
                            }}>
                              {errors.fullName}
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.75rem',
                              fontWeight: '600',
                              color: 'var(--deep-blue)',
                              fontSize: '1rem'
                            }}>
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: `2px solid ${errors.email ? '#ff4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '1rem',
                                background: '#f8fafc'
                              }}
                              placeholder="your.email@example.com"
                            />
                            {errors.email && (
                              <span style={{
                                color: '#ff4444',
                                fontSize: '0.9rem',
                                marginTop: '0.5rem',
                                display: 'block',
                                fontWeight: '500'
                              }}>
                                {errors.email}
                              </span>
                            )}
                          </div>

                          <div>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.75rem',
                              fontWeight: '600',
                              color: 'var(--deep-blue)',
                              fontSize: '1rem'
                            }}>
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: `2px solid ${errors.phone ? '#ff4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '1rem',
                                background: '#f8fafc'
                              }}
                              placeholder="Your phone number"
                            />
                            {errors.phone && (
                              <span style={{
                                color: '#ff4444',
                                fontSize: '0.9rem',
                                marginTop: '0.5rem',
                                display: 'block',
                                fontWeight: '500'
                              }}>
                                {errors.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Booking Details */}
                    <section>
                      <h4 style={{
                        marginBottom: '1.5rem',
                        color: 'var(--deep-blue)',
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <Calendar size={22} />
                        Booking Details
                      </h4>
                      <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div style={{ position: 'relative' }}>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.75rem',
                              fontWeight: '600',
                              color: 'var(--deep-blue)',
                              fontSize: '1rem'
                            }}>
                              Preferred Date *
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowDatePicker(!showDatePicker)}
                              style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: `2px solid ${errors.date ? '#ff4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '1rem',
                                background: '#f8fafc',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <span>{formData.date ? formatDisplayDate(formData.date) : 'Select a date'}</span>
                              <ChevronDown size={20} style={{ transform: showDatePicker ? 'rotate(180deg)' : 'none' }} />
                            </button>
                            {errors.date && (
                              <span style={{
                                color: '#ff4444',
                                fontSize: '0.9rem',
                                marginTop: '0.5rem',
                                display: 'block',
                                fontWeight: '500'
                              }}>
                                {errors.date}
                              </span>
                            )}
                            {showDatePicker && <DatePicker />}
                          </div>

                          <div>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.75rem',
                              fontWeight: '600',
                              color: 'var(--deep-blue)',
                              fontSize: '1rem'
                            }}>
                              Participants *
                            </label>
                            <input
                              type="number"
                              name="participants"
                              value={formData.participants}
                              onChange={handleChange}
                              min="1"
                              max={tour ? parseInt(tour.groupSize) : 10}
                              style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: `2px solid ${errors.participants ? '#ff4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '1rem',
                                background: '#f8fafc'
                              }}
                            />
                            {errors.participants && (
                              <span style={{
                                color: '#ff4444',
                                fontSize: '0.9rem',
                                marginTop: '0.5rem',
                                display: 'block',
                                fontWeight: '500'
                              }}>
                                {errors.participants}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Experience Level for Marine Tours */}
                        {tour.category === 'marine' && (
                          <div>
                            <label style={{
                              display: 'block',
                              marginBottom: '0.75rem',
                              fontWeight: '600',
                              color: 'var(--deep-blue)',
                              fontSize: '1rem'
                            }}>
                              Diving Experience Level
                            </label>
                            <select
                              name="experienceLevel"
                              value={formData.experienceLevel}
                              onChange={handleChange}
                              style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                background: '#f8fafc',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="">Select your experience level</option>
                              {experienceLevels.map(level => (
                                <option key={level.value} value={level.value}>
                                  {level.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Referral Source */}
                        <div>
                          <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--deep-blue)',
                            fontSize: '1rem'
                          }}>
                            How did you hear about us?
                          </label>
                          <select
                            name="hearAboutUs"
                            value={formData.hearAboutUs}
                            onChange={handleChange}
                            style={{
                              width: '100%',
                              padding: '1rem 1.25rem',
                              border: '2px solid #e2e8f0',
                              borderRadius: '10px',
                              fontSize: '1rem',
                              background: '#f8fafc',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="">Select an option</option>
                            {referralSources.map(source => (
                              <option key={source} value={source}>{source}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </section>

                    {/* Add-Ons Section */}
                    <section>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.5rem',
                        cursor: 'pointer'
                      }}
                        onClick={() => setShowAddOns(!showAddOns)}
                      >
                        <h4 style={{
                          color: 'var(--deep-blue)',
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          <Package size={22} />
                          Enhance Your Experience
                        </h4>
                        <ChevronDown size={20} style={{
                          transform: showAddOns ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.3s ease'
                        }} />
                      </div>

                      {showAddOns && (
                        <div style={{
                          background: 'rgba(0, 168, 232, 0.03)',
                          borderRadius: '12px',
                          padding: '1.5rem',
                          border: '1px solid rgba(0, 168, 232, 0.1)',
                          marginBottom: '1.5rem'
                        }}>
                          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem' }}>
                            Make your adventure even more memorable with these optional extras:
                          </p>
                          <div style={{ display: 'grid', gap: '1rem' }}>
                            {addOnOptions.map(addOn => (
                              <label
                                key={addOn.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '1rem',
                                  padding: '1rem',
                                  background: formData.addOns.includes(addOn.id)
                                    ? 'rgba(0, 168, 232, 0.1)'
                                    : 'white',
                                  borderRadius: '10px',
                                  border: `2px solid ${formData.addOns.includes(addOn.id)
                                    ? 'var(--caribbean-blue)'
                                    : '#e2e8f0'}`,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.addOns.includes(addOn.id)}
                                  onChange={() => handleAddOnChange(addOn.id)}
                                  style={{ display: 'none' }}
                                />
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  border: `2px solid ${formData.addOns.includes(addOn.id)
                                    ? 'var(--caribbean-blue)'
                                    : '#ccc'}`,
                                  borderRadius: '6px',
                                  background: formData.addOns.includes(addOn.id)
                                    ? 'var(--caribbean-blue)'
                                    : 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  flexShrink: 0
                                }}>
                                  {formData.addOns.includes(addOn.id) && '✓'}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '0.25rem'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                      <div style={{ color: 'var(--caribbean-blue)' }}>
                                        {addOn.icon}
                                      </div>
                                      <span style={{ fontWeight: '600', color: 'var(--deep-blue)' }}>
                                        {addOn.name}
                                      </span>
                                    </div>
                                    <span style={{
                                      color: 'var(--caribbean-blue)',
                                      fontWeight: '700',
                                      fontSize: '1.1rem'
                                    }}>
                                      +${addOn.price}
                                    </span>
                                  </div>
                                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {addOn.description}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>

                    {/* Special Requests */}
                    <section>
                      <h4 style={{
                        marginBottom: '1.5rem',
                        color: 'var(--deep-blue)',
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <Tag size={22} />
                        Special Requests & Requirements
                      </h4>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="4"
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          border: '2px solid #e2e8f0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          resize: 'vertical',
                          background: '#f8fafc',
                          fontFamily: 'inherit'
                        }}
                        placeholder="Any dietary restrictions, medical conditions, special requirements, or additional requests..."
                      />
                    </section>

                    {/* Price Summary */}
                    <section>
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(0, 168, 232, 0.08), rgba(0, 119, 182, 0.08))',
                        borderRadius: '15px',
                        padding: '2rem',
                        border: '1px solid rgba(0, 168, 232, 0.2)'
                      }}>
                        <h4 style={{
                          margin: '0 0 1.5rem 0',
                          color: 'var(--deep-blue)',
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          textAlign: 'center'
                        }}>
                          Price Summary
                        </h4>
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid rgba(0, 168, 232, 0.2)'
                          }}>
                            <div>
                              <div style={{ fontWeight: '600', color: 'var(--deep-blue)' }}>{tour.name}</div>
                              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                {formData.participants} × ${tour.price} per person
                              </div>
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>
                              ${calculateTotal()}
                            </span>
                          </div>

                          {formData.addOns.length > 0 && (
                            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(0, 168, 232, 0.2)' }}>
                              <div style={{ marginBottom: '0.75rem', color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>
                                Add-Ons:
                              </div>
                              {addOnOptions
                                .filter(addOn => formData.addOns.includes(addOn.id))
                                .map(addOn => (
                                  <div key={addOn.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '0.5rem',
                                    paddingLeft: '1rem'
                                  }}>
                                    <span style={{ fontSize: '0.95rem', color: '#555' }}>{addOn.name}</span>
                                    <span style={{ fontWeight: '600', color: 'var(--caribbean-blue)' }}>
                                      +${addOn.price}
                                    </span>
                                  </div>
                                ))}
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '0.5rem',
                                paddingTop: '0.5rem',
                                borderTop: '1px dashed rgba(0, 168, 232, 0.3)'
                              }}>
                                <span style={{ fontSize: '0.95rem', color: '#666' }}>Add-Ons Total:</span>
                                <span style={{ fontWeight: '700', color: 'var(--caribbean-blue)' }}>
                                  ${calculateAddOnsTotal()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '1.5rem',
                          borderTop: '2px solid rgba(0, 168, 232, 0.3)'
                        }}>
                          <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--deep-blue)' }}>
                            Total Amount
                          </span>
                          <span style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'var(--caribbean-blue)',
                            background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            ${getTotalWithAddOns()}
                          </span>
                        </div>
                        <p style={{
                          marginTop: '1rem',
                          textAlign: 'center',
                          color: '#666',
                          fontSize: '0.9rem',
                          fontStyle: 'italic'
                        }}>
                          *No payment required now. We'll contact you for payment details.
                        </p>
                      </div>
                    </section>

                    {/* Submit Button */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                        color: '#666',
                        fontSize: '0.95rem'
                      }}>
                        <Shield size={18} style={{ color: 'var(--caribbean-blue)' }} />
                        <span>Your information is secure. 24-hour cancellation policy applies.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          width: '100%',
                          padding: '1.25rem',
                          background: submitting
                            ? '#ccc'
                            : 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1.2rem',
                          fontWeight: '800',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '1rem',
                          letterSpacing: '0.5px',
                          boxShadow: '0 10px 25px rgba(0, 168, 232, 0.2)'
                        }}
                        onMouseOver={(e) => !submitting && (e.target.style.transform = 'translateY(-3px)')}
                        onMouseOut={(e) => !submitting && (e.target.style.transform = 'translateY(0)')}
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
                            Processing Your Request...
                          </>
                        ) : (
                          <>
                            <PhoneCall size={24} />
                            Secure Your Adventure Now
                          </>
                        )}
                      </button>

                      <p style={{
                        marginTop: '1rem',
                        color: '#666',
                        fontSize: '0.9rem',
                        maxWidth: '500px',
                        margin: '1rem auto 0'
                      }}>
                        By booking, you agree to our terms and conditions. You'll receive a confirmation email shortly.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingTour