import React from 'react'
import { Anchor, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--deep-blue)',
            color: 'white',
            padding: '3rem 0 1rem'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <Anchor size={28} style={{ marginRight: '10px' }} />
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Caribbean Dive Masters</span>
                        </div>
                        <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                            Explore the breathtaking underwater world of the Caribbean with certified professionals.
                            Sustainable diving experiences since 2010.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--chartreuse)' }}>Contact Info</h4>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <MapPin size={16} style={{ marginRight: '10px' }} />
                            <span>123 Coral Reef Drive, Grand Cayman</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <Phone size={16} style={{ marginRight: '10px' }} />
                            <span>+1 (345) 555-DIVE</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Mail size={16} style={{ marginRight: '10px' }} />
                            <span>info@caribbeandivemasters.com</span>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--chartreuse)' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <a href="/tours" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Dive Tours</a>
                            <a href="/donate" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Conservation</a>
                            <a href="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>About Us</a>
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '1rem',
                    textAlign: 'center',
                    opacity: 0.7
                }}>
                    <p>&copy; 2024 Caribbean Dive Masters. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer