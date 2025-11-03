// pages/Contact.jsx
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
  Shield
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (868) 123-4567',
      description: 'Mon-Fri from 8am to 6pm',
      link: 'tel:+18681234567',
      color: 'var(--caribbean-blue)'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@scubadivetobago.com',
      description: 'We reply within 24 hours',
      link: 'mailto:info@scubadivetobago.com',
      color: 'var(--chartreuse)'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Buccoo Reef, Tobago',
      description: 'Come by our dive center',
      link: 'https://maps.google.com/?q=Buccoo+Reef,Tobago',
      color: 'var(--deep-blue)'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+1 (868) 123-4567',
      description: 'Quick responses',
      link: 'https://wa.me/18681234567',
      color: '#25D366'
    }
  ]

  const divingServices = [
    'Beginner Dive Courses',
    'Advanced Certifications',
    'Guided Reef Tours',
    'Night Diving Adventures',
    'Equipment Rental',
    'Group Bookings',
    'Private Charters',
    'Underwater Photography'
  ]

  const whyChooseUs = [
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'PADI certified instructors with 10+ years experience'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Full safety equipment and emergency protocols'
    },
    {
      icon: Globe,
      title: 'Eco-Friendly',
      description: 'Committed to marine conservation and sustainable tourism'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Tours available 7 days a week, year-round'
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
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
        message: ''
      })
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem 0' }}>
        <div className="container">
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <CheckCircle size={80} style={{ 
              color: 'var(--chartreuse)', 
              marginBottom: '2rem' 
            }} />
            <h2 style={{ 
              color: 'var(--deep-blue)', 
              marginBottom: '1rem',
              fontSize: '2rem',
              fontWeight: '700'
            }}>
              Message Sent!
            </h2>
            <p style={{ 
              color: '#666', 
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              fontSize: '1.1rem'
            }}>
              Thank you for reaching out! We've received your message and will get back to you within 24 hours. Our team is excited to help you plan your underwater adventure.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsSubmitted(false)}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'var(--caribbean-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Send Another Message
              </button>
              <button
                onClick={() => window.location.href = '/tours'}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'transparent',
                  color: 'var(--caribbean-blue)',
                  border: '2px solid var(--caribbean-blue)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--caribbean-blue)'
                  e.target.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = 'var(--caribbean-blue)'
                }}
              >
                Browse Tours
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
        color: 'white',
        padding: '5rem 1rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            opacity: 0.95,
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Ready to dive into your next adventure? We're here to answer all your questions and help you plan the perfect underwater experience in Tobago.
          </p>
        </div>
        
        {/* Wave decoration */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z\' fill=\'%23f8fafc\'%3E%3C/path%3E%3C/svg%3E")',
          backgroundSize: '1200px 50px'
        }} />
      </div>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {/* Contact Methods */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: 'var(--deep-blue)',
            fontWeight: '600'
          }}>
            Get in Touch
          </h2>
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
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: method.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'white'
                }}>
                  <method.icon size={32} />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: 'var(--deep-blue)',
                  fontWeight: '600'
                }}>
                  {method.title}
                </h3>
                <p style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
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

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <section>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'var(--deep-blue)',
                fontWeight: '600'
              }}>
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '1.75rem' }}>
                  {/* Name */}
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
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: `2px solid ${errors.name ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        display: 'block'
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
                        padding: '1rem',
                        border: `2px solid ${errors.email ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        fontSize: '1rem'
                      }}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
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
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1rem'
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
                        padding: '1rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '1rem'
                      }}
                      placeholder="Your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--deep-blue)',
                      fontSize: '1rem'
                    }}>
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: `2px solid ${errors.subject ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        fontSize: '1rem',
                        background: 'white'
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tour Booking">Tour Booking</option>
                      <option value="Dive Courses">Dive Courses</option>
                      <option value="Equipment Rental">Equipment Rental</option>
                      <option value="Group Booking">Group Booking</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        display: 'block'
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
                      fontSize: '1rem'
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
                        padding: '1rem',
                        border: `2px solid ${errors.message ? '#ff4444' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                      placeholder="Tell us about your diving needs, questions, or how we can help you plan your perfect underwater adventure..."
                    />
                    {errors.message && (
                      <span style={{ 
                        color: '#ff4444', 
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        display: 'block'
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
                        : 'linear-gradient(135deg, var(--caribbean-blue) 0%, var(--deep-blue) 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      marginTop: '1rem'
                    }}
                    onMouseOver={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => !isSubmitting && (e.target.style.transform = 'translateY(0)')}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Sidebar Information */}
          <section style={{
            display: 'grid',
            gap: '2.5rem'
          }}>
            {/* Why Choose Us */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                marginBottom: '2rem',
                color: 'var(--deep-blue)',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Why Choose Us
              </h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 232, 0.05)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 232, 0.1)'
                      e.currentTarget.style.transform = 'translateX(5px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 168, 232, 0.05)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--caribbean-blue)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        marginBottom: '0.5rem',
                        color: 'var(--deep-blue)',
                        fontWeight: '600'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        color: '#666',
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                marginBottom: '2rem',
                color: 'var(--deep-blue)',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}>
                <Clock size={28} />
                Business Hours
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
                  { day: 'Saturday', hours: '7:00 AM - 5:00 PM' },
                  { day: 'Sunday', hours: '7:00 AM - 4:00 PM' },
                  { day: 'Holidays', hours: 'By appointment only' }
                ].map((schedule, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem 1.5rem',
                      background: index % 2 === 0 ? 'rgba(0, 168, 232, 0.05)' : 'transparent',
                      borderRadius: '10px',
                      border: index % 2 === 0 ? 'none' : '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <span style={{ fontWeight: '600', color: '#555', fontSize: '1rem' }}>
                      {schedule.day}
                    </span>
                    <span style={{ 
                      color: 'var(--caribbean-blue)', 
                      fontWeight: '700',
                      fontSize: '1rem'
                    }}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div style={{
              background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(0, 168, 232, 0.3)'
            }}>
              <Shield size={48} style={{ marginBottom: '1.5rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Emergency Contact
              </h3>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '1rem',
                letterSpacing: '0.5px'
              }}>
                +1 (868) 555-EMRG
              </p>
              <p style={{
                fontSize: '1rem',
                opacity: 0.9,
                lineHeight: '1.5'
              }}>
                24/7 for diving emergencies and urgent matters. Your safety is our top priority.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact