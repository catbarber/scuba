import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Loader2, 
  CheckCircle,
  MessageCircle,
  Globe,
  Users,
  Calendar,
  Shield,
  Star,
  Award,
  Anchor,
  Map,
  Waves,
  ChevronRight,
  Headphones,
  Zap,
  Cloud,
  Sun
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    tourType: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (868) 631-1234',
      description: 'Mon-Sun from 7am to 6pm AST',
      link: 'tel:+18686311234',
      color: 'var(--caribbean-blue)',
      badge: 'Primary Contact'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@aquadeeptobago.com',
      description: 'We reply within 24 hours',
      link: 'mailto:info@aquadeeptobago.com',
      color: 'var(--chartreuse)',
      badge: 'Quick Response'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Tobago, Trinidad & Tobago',
      description: 'Marine & Land Tour Operator',
      link: 'https://maps.google.com/?q=Tobago',
      color: 'var(--deep-blue)',
      badge: 'Island Location'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+1 (868) 631-1234',
      description: 'Instant booking assistance',
      link: 'https://wa.me/18686311234',
      color: '#25D366',
      badge: 'Fast Replies'
    }
  ]

  const tourTypes = [
    'Scuba Diving & Snorkeling',
    'Heritage & Nature Tours',
    'Birdwatching Tours',
    'PADI Certification Courses',
    'Private Custom Tours',
    'Group & Corporate Events',
    'Rainforest & Reef Packages',
    'Family Adventure Packages'
  ]

  const responseTimes = [
    { type: 'General Inquiries', time: 'Within 24 hours' },
    { type: 'Tour Bookings', time: 'Within 4 hours' },
    { type: 'Emergency', time: 'Immediate response' },
    { type: 'Course Registration', time: 'Within 12 hours' }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        tourType: ''
      })
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{
            background: 'white',
            borderRadius: '25px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 168, 232, 0.15)',
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, var(--light-blue) 0%, transparent 70%)',
              opacity: 0.3,
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              left: '-50px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, var(--chartreuse) 0%, transparent 70%)',
              opacity: 0.2,
              borderRadius: '50%'
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <CheckCircle size={100} style={{ 
                color: 'var(--chartreuse)', 
                marginBottom: '2rem',
                filter: 'drop-shadow(0 5px 15px rgba(201, 247, 62, 0.3))'
              }} />
              <h2 style={{ 
                color: 'var(--deep-blue)', 
                marginBottom: '1rem',
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--deep-blue), var(--caribbean-blue))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Message Sent Successfully!
              </h2>
              <p style={{ 
                color: '#666', 
                lineHeight: '1.6',
                marginBottom: '2.5rem',
                fontSize: '1.2rem'
              }}>
                Thank you for contacting <strong>AquaDeep Tobago Tours</strong>! We've received your message and our adventure specialists will get back to you within 24 hours. We're excited to help you plan your Tobago adventure!
              </p>
              
              <div style={{ 
                background: 'rgba(0, 168, 232, 0.05)', 
                borderRadius: '15px', 
                padding: '1.5rem', 
                marginBottom: '2.5rem' 
              }}>
                <h3 style={{ color: 'var(--deep-blue)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  What's Next?
                </h3>
                <ul style={{ 
                  textAlign: 'left', 
                  color: '#555', 
                  listStyle: 'none', 
                  padding: 0,
                  margin: 0 
                }}>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={16} style={{ color: 'var(--chartreuse)' }} />
                    <span>We'll review your inquiry and match you with the perfect tour</span>
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} style={{ color: 'var(--caribbean-blue)' }} />
                    <span>You'll receive available dates and personalized options</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Headphones size={16} style={{ color: 'var(--deep-blue)' }} />
                    <span>Our team will be available for any questions you have</span>
                  </li>
                </ul>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    padding: '1rem 2.5rem',
                    background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    fontWeight: '600',
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
                  <Send size={20} />
                  Send Another Message
                </button>
                <button
                  onClick={() => window.location.href = '/tours'}
                  style={{
                    padding: '1rem 2.5rem',
                    background: 'transparent',
                    color: 'var(--caribbean-blue)',
                    border: '2px solid var(--caribbean-blue)',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--caribbean-blue)'
                    e.target.style.color = 'white'
                    e.target.style.transform = 'translateY(-3px)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent'
                    e.target.style.color = 'var(--caribbean-blue)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <Waves size={20} />
                  Browse Our Tours
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Enhanced Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.9) 0%, rgba(0, 168, 232, 0.9) 100%), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        padding: '7rem 1rem 5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated floating elements */}
        <div className="floating-elements">
          <div style={{ 
            position: 'absolute', 
            top: '20%', 
            left: '10%', 
            animation: 'float 6s ease-in-out infinite' 
          }}>
            <Cloud size={40} style={{ opacity: 0.1 }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            top: '40%', 
            right: '15%', 
            animation: 'float 8s ease-in-out infinite 2s' 
          }}>
            <Sun size={50} style={{ opacity: 0.1 }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '30%', 
            left: '15%', 
            animation: 'float 7s ease-in-out infinite 1s' 
          }}>
            <Waves size={35} style={{ opacity: 0.1 }} />
          </div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            borderRadius: '25px',
            padding: '2.5rem',
            display: 'inline-block',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              marginBottom: '0.5rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, white, #e0f7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Let's Plan Your Tobago Adventure
            </h1>
          </div>
          <p style={{ 
            fontSize: '1.6rem', 
            maxWidth: '700px', 
            margin: '0 auto 1.5rem',
            opacity: 0.95,
            lineHeight: '1.5',
            fontWeight: '300'
          }}>
            Ready to explore Tobago's wonders? Our expert team is here to help you create unforgettable marine and land adventures.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Star size={16} fill="currentColor" />
              <span>4.9/5 Customer Rating</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(5px)',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Award size={16} />
              <span>PADI Certified Guides</span>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z\' fill=\'%23f8fafc\'%3E%3C/path%3E%3C/svg%3E")',
          backgroundSize: '1200px 80px'
        }} />
      </div>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {/* Contact Methods - Enhanced */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.8rem',
            marginBottom: '3rem',
            color: 'var(--deep-blue)',
            fontWeight: '800',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <span style={{ position: 'relative' }}>
              Get In Touch
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(to right, var(--caribbean-blue), var(--chartreuse))',
                borderRadius: '2px'
              }} />
            </span>
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Choose your preferred way to connect with our adventure specialists. We're here to help you plan the perfect Tobago experience.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={method.link.includes('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  border: '1px solid rgba(0, 119, 182, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '5px',
                  background: `linear-gradient(to right, ${method.color}, ${method.color}99)`
                }} />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem'
                }}>
                  <span style={{
                    background: `${method.color}20`,
                    color: method.color,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {method.badge}
                  </span>
                </div>
                
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: `linear-gradient(135deg, ${method.color}, ${method.color}dd)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'white',
                  boxShadow: `0 10px 25px ${method.color}40`
                }}>
                  <method.icon size={36} />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: 'var(--deep-blue)',
                  fontWeight: '700'
                }}>
                  {method.title}
                </h3>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: method.color
                }}>
                  {method.details}
                </p>
                <p style={{
                  color: '#666',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}>
                  {method.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Main Content Grid - Enhanced */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Enhanced Contact Form */}
          <section>
            <div style={{
              background: 'white',
              borderRadius: '25px',
              padding: '3rem',
              boxShadow: '0 20px 50px rgba(0, 168, 232, 0.12)',
              border: '1px solid rgba(0, 119, 182, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '5px',
                background: 'linear-gradient(to right, var(--caribbean-blue), var(--chartreuse))'
              }} />
              
              <h2 style={{
                fontSize: '2.2rem',
                marginBottom: '2rem',
                color: 'var(--deep-blue)',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <MessageCircle size={32} />
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1.05rem'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.25rem',
                        border: `2px solid ${errors.name ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        background: '#f8fafc'
                      }}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        display: 'block',
                        fontWeight: '500'
                      }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1.05rem'
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
                        padding: '1.1rem 1.25rem',
                        border: `2px solid ${errors.email ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '12px',
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

                  {/* Phone */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1.05rem'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.25rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: '#f8fafc'
                      }}
                      placeholder="Your phone number (optional)"
                    />
                  </div>

                  {/* Tour Type */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1.05rem'
                    }}>
                      Interested In
                    </label>
                    <select
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.25rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: '#f8fafc',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Select tour type (optional)</option>
                      {tourTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1.05rem'
                    }}>
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.25rem',
                        border: `2px solid ${errors.subject ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: '#f8fafc',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">What can we help you with?</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tour Booking">Tour Booking</option>
                      <option value="Dive Courses">Dive Courses</option>
                      <option value="Equipment Rental">Equipment Rental</option>
                      <option value="Group Booking">Group Booking</option>
                      <option value="Custom Package">Custom Package</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        display: 'block',
                        fontWeight: '500'
                      }}>
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1.05rem'
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.25rem',
                        border: `2px solid ${errors.message ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        resize: 'vertical',
                        background: '#f8fafc',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Tell us about your adventure plans, questions, or how we can help create your perfect Tobago experience..."
                    />
                    {errors.message && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        display: 'block',
                        fontWeight: '500'
                      }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      background: isSubmitting 
                        ? '#ccc' 
                        : 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      marginTop: '0.5rem',
                      letterSpacing: '0.5px'
                    }}
                    onMouseOver={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => !isSubmitting && (e.target.style.transform = 'translateY(0)')}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        <Send size={22} />
                        Send Message
                        <ChevronRight size={22} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Enhanced Sidebar Information */}
          <section style={{ display: 'grid', gap: '2.5rem' }}>
            {/* Response Times */}
            <div style={{
              background: 'white',
              borderRadius: '25px',
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(0, 168, 232, 0.12)',
              border: '1px solid rgba(0, 119, 182, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '5px',
                background: 'linear-gradient(to right, var(--chartreuse), #c9f73e)'
              }} />
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '2rem',
                color: 'var(--deep-blue)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <Zap size={28} />
                Our Response Times
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {responseTimes.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.25rem 1.5rem',
                      background: index % 2 === 0 ? 'rgba(0, 168, 232, 0.05)' : 'transparent',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 168, 232, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 232, 0.1)'
                      e.currentTarget.style.transform = 'translateX(5px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(0, 168, 232, 0.05)' : 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <span style={{ fontWeight: '600', color: '#555', fontSize: '1.05rem' }}>
                      {item.type}
                    </span>
                    <span style={{ 
                      color: 'var(--chartreuse)', 
                      fontWeight: '700',
                      fontSize: '1.05rem',
                      background: 'rgba(201, 247, 62, 0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px'
                    }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours - Enhanced */}
            <div style={{
              background: 'white',
              borderRadius: '25px',
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(0, 168, 232, 0.12)',
              border: '1px solid rgba(0, 119, 182, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '5px',
                background: 'linear-gradient(to right, var(--caribbean-blue), #00a8e8)'
              }} />
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '2rem',
                color: 'var(--deep-blue)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <Clock size={28} />
                Operating Hours
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM', icon: <Calendar size={16} /> },
                  { day: 'Saturday', hours: '7:00 AM - 5:00 PM', icon: <Sun size={16} /> },
                  { day: 'Sunday', hours: '7:00 AM - 4:00 PM', icon: <Waves size={16} /> },
                  { day: 'Holidays', hours: 'By appointment only', icon: <Star size={16} /> }
                ].map((schedule, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.25rem 1.5rem',
                      background: index % 2 === 0 ? 'rgba(0, 168, 232, 0.05)' : 'transparent',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 168, 232, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 232, 0.1)'
                      e.currentTarget.style.transform = 'translateX(5px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? 'rgba(0, 168, 232, 0.05)' : 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ color: 'var(--caribbean-blue)' }}>
                        {schedule.icon}
                      </div>
                      <span style={{ fontWeight: '600', color: '#555', fontSize: '1.05rem' }}>
                        {schedule.day}
                      </span>
                    </div>
                    <span style={{ 
                      color: 'var(--caribbean-blue)', 
                      fontWeight: '700',
                      fontSize: '1.05rem',
                      background: 'rgba(0, 168, 232, 0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px'
                    }}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact - Enhanced */}
            <div style={{
              background: 'linear-gradient(135deg, var(--deep-blue), #0077b6)',
              borderRadius: '25px',
              padding: '2.5rem',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0, 119, 182, 0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }} />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Shield size={60} style={{ 
                  marginBottom: '1.5rem', 
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))' 
                }} />
                <h3 style={{
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  Emergency Contact
                </h3>
                <a
                  href="tel:+18685553674"
                  style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    color: 'white',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.2s ease',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--chartreuse)'
                    e.target.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'white'
                    e.target.style.transform = 'scale(1)'
                  }}
                >
                  +1 (868) 555-EMRG
                </a>
                <p style={{
                  fontSize: '1.1rem',
                  opacity: 0.9,
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  24/7 emergency response for diving incidents and urgent matters
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(5px)'
                  }}>
                    Diving Emergencies
                  </span>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(5px)'
                  }}>
                    Medical Assistance
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add CSS animation for floating elements */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}

export default Contact