import React from 'react'
import {
    Anchor, Phone, Mail, MapPin,
    Waves, TreePine, Facebook, Instagram,
    Youtube, Twitter, Globe, Award,
    Shield, Heart, ChevronRight
} from 'lucide-react'
import AdComponent from './AdComponent/AdComponent'
import { Link } from 'react-router-dom'

const Footer = () => {
    const quickLinks = [
        { name: 'Marine Adventures', path: '/tours?category=marine', icon: <Waves size={16} /> },
        { name: 'Land Tours', path: '/tours?category=land', icon: <TreePine size={16} /> },
        { name: 'About Us', path: '/about', icon: <Shield size={16} /> },
        { name: 'Contact Us', path: '/contact', icon: <Phone size={16} /> },
        { name: 'PADI Courses', path: '/tours', icon: <Award size={16} /> },
        { name: 'Group Bookings', path: '/contact', icon: <Globe size={16} /> }
    ]

    const socialLinks = [
        { platform: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com/aquadeeptobago' },
        { platform: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/aquadeeptobago' },
        { platform: 'YouTube', icon: <Youtube size={20} />, url: 'https://youtube.com/aquadeeptobago' },
        { platform: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com/aquadeeptobago' }
    ]

    const certifications = [
        'PADI Certified',
        'Eco-Tourism Certified',
        'First Aid Certified',
        'Marine Conservation',
        'Local Tourism Board',
        'Sustainable Tourism'
    ]

    return (
        <footer style={{
            background: 'linear-gradient(135deg, var(--deep-blue) 0%, #004466 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative elements */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'radial-gradient(circle at 20% 80%, rgba(0, 168, 232, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201, 247, 62, 0.1) 0%, transparent 50%)',
                opacity: 0.3
            }} />

            {/* Ad Component Section */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    margin: '0 auto',
                    padding: '1rem'
                }}>
                    <AdComponent />
                </div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Main Footer Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '3rem',
                    padding: '4rem 0 3rem'
                }}>
                    {/* Brand Column */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, var(--caribbean-blue), var(--light-blue))',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <Anchor size={28} />
                            </div>
                            <div>
                                <h2 style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    margin: 0,
                                    background: 'linear-gradient(135deg, white, #e0f7ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    AquaDeep Tobago
                                </h2>
                                <p style={{
                                    margin: '0.25rem 0 0 0',
                                    fontSize: '1rem',
                                    opacity: 0.9,
                                    fontWeight: '500'
                                }}>
                                    Premier Eco-Adventure Tours
                                </p>
                            </div>
                        </div>

                        <p style={{
                            lineHeight: '1.7',
                            opacity: 0.9,
                            marginBottom: '1.5rem',
                            fontSize: '1.05rem'
                        }}>
                            Tobago's premier integrated eco-adventure operator, offering seamless marine and land experiences that foster deep connections with the island's unique ecosystems and culture.
                        </p>

                        {/* Social Links */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{
                                marginBottom: '1rem',
                                color: 'var(--chartreuse)',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}>
                                Follow Our Adventures
                            </h4>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            border: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--caribbean-blue)'
                                            e.currentTarget.style.transform = 'translateY(-3px)'
                                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 168, 232, 0.3)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                            e.currentTarget.style.transform = 'translateY(0)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <h4 style={{
                                marginBottom: '1rem',
                                color: 'var(--chartreuse)',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}>
                                Certifications & Memberships
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {certifications.map((cert, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            backdropFilter: 'blur(5px)'
                                        }}
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 style={{
                            marginBottom: '1.5rem',
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <ChevronRight size={20} style={{ color: 'var(--chartreuse)' }} />
                            Explore Adventures
                        </h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                                        e.currentTarget.style.transform = 'translateX(8px)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                                        e.currentTarget.style.borderColor = 'transparent'
                                        e.currentTarget.style.transform = 'translateX(0)'
                                    }}
                                >
                                    <div style={{
                                        color: 'var(--chartreuse)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {link.icon}
                                    </div>
                                    <span style={{ flex: 1, fontSize: '1rem', fontWeight: '500' }}>
                                        {link.name}
                                    </span>
                                    <ChevronRight size={16} style={{ opacity: 0.6 }} />
                                </Link>
                            ))}
                        </div>

                        {/* Conservation Notice */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'rgba(201, 247, 62, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(201, 247, 62, 0.2)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                <Heart size={20} style={{ color: 'var(--chartreuse)' }} />
                                <h4 style={{ margin: 0, color: 'var(--chartreuse)', fontSize: '1.1rem', fontWeight: '600' }}>
                                    Conservation Commitment
                                </h4>
                            </div>
                            <p style={{
                                margin: 0,
                                fontSize: '0.95rem',
                                opacity: 0.9,
                                lineHeight: '1.6'
                            }}>
                                10% of all profits support coral restoration and marine protection initiatives in Tobago.
                            </p>
                        </div>
                    </div>

                    {/* Contact Info Column */}
                    <div>
                        <h3 style={{
                            marginBottom: '1.5rem',
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <Phone size={20} style={{ color: 'var(--chartreuse)' }} />
                            Get In Touch
                        </h3>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                padding: '1.25rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                    e.currentTarget.style.transform = 'translateY(-3px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--chartreuse)',
                                    flexShrink: 0
                                }}>
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        color: 'var(--chartreuse)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>
                                        Visit Us
                                    </h4>
                                    <p style={{ margin: 0, opacity: 0.9, lineHeight: '1.6' }}>
                                        Tobago, Trinidad & Tobago
                                    </p>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>
                                        Marine & Land Tour Headquarters
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                padding: '1.25rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                    e.currentTarget.style.transform = 'translateY(-3px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--chartreuse)',
                                    flexShrink: 0
                                }}>
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        color: 'var(--chartreuse)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>
                                        Call Us
                                    </h4>
                                    <a
                                        href="tel:+18686311234"
                                        style={{
                                            display: 'block',
                                            color: 'white',
                                            textDecoration: 'none',
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--chartreuse)'}
                                        onMouseLeave={(e) => e.target.style.color = 'white'}
                                    >
                                        +1 (868) 631-1234
                                    </a>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>
                                        Mon-Sun 7:00 AM - 6:00 PM AST
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                padding: '1.25rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                    e.currentTarget.style.transform = 'translateY(-3px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--chartreuse)',
                                    flexShrink: 0
                                }}>
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        color: 'var(--chartreuse)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>
                                        Email Us
                                    </h4>
                                    <a
                                        href="mailto:info@aquadeeptobago.com"
                                        style={{
                                            display: 'block',
                                            color: 'white',
                                            textDecoration: 'none',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--chartreuse)'}
                                        onMouseLeave={(e) => e.target.style.color = 'white'}
                                    >
                                        info@aquadeeptobago.com
                                    </a>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>
                                        We reply within 24 hours
                                    </p>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                border: '2px solid rgba(255, 100, 100, 0.3)',
                                textAlign: 'center',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '1rem'
                                }}>
                                    <Shield size={22} style={{ color: '#ff6b6b' }} />
                                    <span style={{
                                        color: '#ff6b6b',
                                        fontWeight: '700',
                                        fontSize: '1.1rem'
                                    }}>
                                        Emergency Contact
                                    </span>
                                </div>
                                <a
                                    href="tel:+18685553674"
                                    style={{
                                        display: 'block',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '1.3rem',
                                        fontWeight: '800',
                                        letterSpacing: '1px',
                                        marginBottom: '0.5rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#ff6b6b'}
                                    onMouseLeave={(e) => e.target.style.color = 'white'}
                                >
                                    +1 (868) 555-EMRG
                                </a>
                                <p style={{
                                    margin: 0,
                                    fontSize: '0.9rem',
                                    opacity: 0.9,
                                    lineHeight: '1.5'
                                }}>
                                    24/7 for diving emergencies and urgent matters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingTop: '2rem',
                    paddingBottom: '1.5rem',
                    textAlign: 'center',
                    display: 'grid',
                    gap: '1rem'
                }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '2rem',
                        opacity: 0.8,
                        fontSize: '0.9rem'
                    }}>
                        <a href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="/terms" style={{ color: 'white', textDecoration: 'none' }}>Terms & Conditions</a>
                        <a href="/cancellation" style={{ color: 'white', textDecoration: 'none' }}>Cancellation Policy</a>
                        <a href="/safety" style={{ color: 'white', textDecoration: 'none' }}>Safety Guidelines</a>
                        <a href="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a>
                        <a href="/sitemap" style={{ color: 'white', textDecoration: 'none' }}>Site Map</a>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        <p style={{ margin: 0, opacity: 0.7 }}>
                            &copy; {new Date().getFullYear()} AquaDeep Tobago Tours. All rights reserved.
                        </p>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <p style={{ margin: 0, opacity: 0.7 }}>
                            Part of the <strong style={{ opacity: 0.9 }}>AquaDeep Uncharted Group</strong>
                        </p>
                    </div>

                    <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                        <p style={{ margin: 0 }}>
                            Created by{' '}
                            <a
                                href="https://chris-feveck.web.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'var(--chartreuse)',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.opacity = '1'}
                                onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                            >
                                Chris Feveck
                            </a>
                            {' '}• Premium Web Solutions for Tourism
                        </p>
                    </div>

                    {/* Back to Top Button */}
                    <div style={{ marginTop: '1rem' }}>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backdropFilter: 'blur(5px)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'var(--caribbean-blue)'
                                e.target.style.transform = 'translateY(-3px)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                                e.target.style.transform = 'translateY(0)'
                            }}
                        >
                            <Waves size={16} />
                            Back to Top
                            <Waves size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer