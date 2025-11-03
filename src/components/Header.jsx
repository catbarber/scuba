import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Anchor, Fish } from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/tours', label: 'Dive Tours' },
        { path: '/donate', label: 'Support Conservation' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact Us' },
    ]

    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 20px rgba(0, 168, 232, 0.1)'
        }}>
            <div className="container">
                <nav style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0'
                }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'var(--deep-blue)',
                        fontWeight: 'bold',
                        fontSize: '1.5rem'
                    }}>
                        <Anchor size={32} style={{ marginRight: '10px' }} />
                        Caribbean Scuba Diving
                    </Link>

                    {/* Desktop Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    textDecoration: 'none',
                                    color: location.pathname === item.path ? 'var(--caribbean-blue)' : '#333',
                                    fontWeight: location.pathname === item.path ? '600' : '400',
                                    transition: 'color 0.3s ease',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--caribbean-blue)'}
                                onMouseLeave={(e) => e.target.style.color = location.pathname === item.path ? 'var(--caribbean-blue)' : '#333'}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'none'
                        }}
                        className="mobile-menu-button"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div style={{
                        display: 'block',
                        padding: '1rem 0',
                        borderTop: '1px solid #eee'
                    }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '0.75rem 0',
                                    textDecoration: 'none',
                                    color: location.pathname === item.path ? 'var(--caribbean-blue)' : '#333',
                                    fontWeight: location.pathname === item.path ? '600' : '400'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header