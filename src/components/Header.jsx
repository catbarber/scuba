import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Menu, X, Anchor, Map, Waves, TreePine, 
  ChevronDown, Calendar, Phone, Sparkles, 
  Shield, Star, Compass
} from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredNav, setHoveredNav] = useState(null)
    const [showAdventuresDropdown, setShowAdventuresDropdown] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Track scroll position for header effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showAdventuresDropdown && !event.target.closest('.adventures-dropdown')) {
                setShowAdventuresDropdown(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showAdventuresDropdown])

    const navItems = [
        { 
            path: '/', 
            label: 'Home',
            icon: <Compass size={20} />
        },
        { 
            path: '/tours', 
            label: 'Adventures',
            icon: <Sparkles size={20} />,
            hasDropdown: true,
            dropdownItems: [
                { 
                    path: '/tours?category=marine', 
                    label: 'Marine Adventures',
                    icon: <Waves size={16} />,
                    description: 'Diving & snorkeling experiences'
                },
                { 
                    path: '/tours?category=land', 
                    label: 'Land Tours',
                    icon: <TreePine size={16} />,
                    description: 'Nature & cultural exploration'
                },
                { 
                    path: '/tours', 
                    label: 'All Tours',
                    icon: <Map size={16} />,
                    description: 'Complete adventure catalog'
                }
            ]
        },
        { 
            path: '/about', 
            label: 'About',
            icon: <Shield size={20} />
        },
        { 
            path: '/contact', 
            label: 'Contact',
            icon: <Phone size={20} />
        },
    ]

    const quickActions = [
        {
            label: 'Book Now',
            icon: <Calendar size={18} />,
            onClick: () => navigate('/tours'),
            variant: 'primary'
        },
        {
            label: 'Call Us',
            icon: <Phone size={18} />,
            onClick: () => window.open('tel:+18686311234', '_self'),
            variant: 'secondary'
        }
    ]

    const handleAdventuresClick = (e, item) => {
        if (item.hasDropdown) {
            e.preventDefault()
            setShowAdventuresDropdown(!showAdventuresDropdown)
        } else {
            navigate(item.path)
            setIsMenuOpen(false)
        }
    }

    const handleDropdownItemClick = (path) => {
        navigate(path)
        setShowAdventuresDropdown(false)
        setIsMenuOpen(false)
    }

    // Add CSS animation styles to head
    useEffect(() => {
        const style = document.createElement('style')
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .mobile-dropdown {
                animation: slideDown 0.3s ease;
            }
        `
        document.head.appendChild(style)
        
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <header style={{
            background: isScrolled 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: isScrolled 
                ? '0 10px 30px rgba(0, 119, 182, 0.12)' 
                : '0 2px 20px rgba(0, 168, 232, 0.08)',
            borderBottom: '1px solid rgba(0, 168, 232, 0.1)',
            transition: 'all 0.3s ease'
        }}>
            <div className="container">
                <nav style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    position: 'relative'
                }}>
                    {/* Logo */}
                    <Link 
                        to="/" 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            gap: '0.75rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{
                            width: '45px',
                            height: '45px',
                            background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 5px 15px rgba(0, 168, 232, 0.2)'
                        }}>
                            <Anchor size={24} />
                        </div>
                        <div>
                            <h1 style={{
                                margin: 0,
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, var(--deep-blue), var(--caribbean-blue))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px',
                                lineHeight: '1.2'
                            }}>
                                AquaDeep Tobago
                            </h1>
                            <p style={{
                                margin: '0.1rem 0 0 0',
                                fontSize: '0.75rem',
                                color: '#666',
                                fontWeight: '500',
                                letterSpacing: '0.5px'
                            }}>
                                Premier Eco-Adventures
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="desk-nav" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1.5rem',
                        position: 'relative'
                    }}>
                        {navItems.map((item) => (
                            <div 
                                key={item.path}
                                className={item.hasDropdown ? 'adventures-dropdown' : ''}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setHoveredNav(item.path)}
                                onMouseLeave={() => setHoveredNav(null)}
                            >
                                <div
                                    onClick={(e) => handleAdventuresClick(e, item)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        textDecoration: 'none',
                                        color: location.pathname === item.path ? 'var(--caribbean-blue)' : '#444',
                                        fontWeight: location.pathname === item.path ? '700' : '600',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s ease',
                                        background: hoveredNav === item.path 
                                            ? 'rgba(0, 168, 232, 0.08)' 
                                            : 'transparent',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ 
                                        opacity: location.pathname === item.path ? 1 : 0.8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <span>{item.label}</span>
                                    {item.hasDropdown && (
                                        <ChevronDown size={16} style={{ 
                                            marginLeft: '0.25rem',
                                            transform: showAdventuresDropdown ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.3s ease'
                                        }} />
                                    )}
                                    {location.pathname === item.path && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '1rem',
                                            right: '1rem',
                                            height: '3px',
                                            background: 'linear-gradient(to right, var(--caribbean-blue), var(--chartreuse))',
                                            borderRadius: '2px'
                                        }} />
                                    )}
                                </div>

                                {/* Adventures Dropdown */}
                                {item.hasDropdown && (showAdventuresDropdown || hoveredNav === item.path) && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '0',
                                        background: 'white',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        minWidth: '280px',
                                        boxShadow: '0 20px 60px rgba(0, 119, 182, 0.2)',
                                        border: '1px solid rgba(0, 119, 182, 0.1)',
                                        zIndex: 1001,
                                        marginTop: '0.5rem',
                                        animation: 'slideDown 0.3s ease'
                                    }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.75rem',
                                            marginBottom: '1rem',
                                            paddingBottom: '1rem',
                                            borderBottom: '2px solid #f0f9ff'
                                        }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'linear-gradient(135deg, var(--caribbean-blue), var(--light-blue))',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white'
                                            }}>
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <h4 style={{ 
                                                    margin: 0, 
                                                    color: 'var(--deep-blue)',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '700'
                                                }}>
                                                    Adventures
                                                </h4>
                                                <p style={{ 
                                                    margin: '0.25rem 0 0 0', 
                                                    fontSize: '0.85rem', 
                                                    color: '#666' 
                                                }}>
                                                    Choose your experience
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                                            {item.dropdownItems.map((dropdownItem) => (
                                                <div
                                                    key={dropdownItem.path}
                                                    onClick={() => handleDropdownItemClick(dropdownItem.path)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '1rem',
                                                        padding: '1rem',
                                                        borderRadius: '10px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        background: 'rgba(0, 168, 232, 0.03)',
                                                        border: '1px solid rgba(0, 168, 232, 0.1)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'rgba(0, 168, 232, 0.08)'
                                                        e.currentTarget.style.transform = 'translateX(5px)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'rgba(0, 168, 232, 0.03)'
                                                        e.currentTarget.style.transform = 'translateX(0)'
                                                    }}
                                                >
                                                    <div style={{
                                                        color: 'var(--caribbean-blue)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        paddingTop: '0.25rem'
                                                    }}>
                                                        {dropdownItem.icon}
                                                    </div>
                                                    <div>
                                                        <div style={{ 
                                                            fontWeight: '600', 
                                                            color: 'var(--deep-blue)',
                                                            fontSize: '0.95rem',
                                                            marginBottom: '0.25rem'
                                                        }}>
                                                            {dropdownItem.label}
                                                        </div>
                                                        <div style={{ 
                                                            fontSize: '0.85rem', 
                                                            color: '#666',
                                                            lineHeight: '1.4'
                                                        }}>
                                                            {dropdownItem.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Quick Actions */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem',
                            marginLeft: '1rem',
                            paddingLeft: '1rem',
                            borderLeft: '1px solid rgba(0, 168, 232, 0.1)'
                        }}>
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.onClick}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: action.variant === 'primary' 
                                            ? '0.75rem 1.5rem' 
                                            : '0.75rem 1.25rem',
                                        background: action.variant === 'primary'
                                            ? 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))'
                                            : 'rgba(0, 168, 232, 0.1)',
                                        color: action.variant === 'primary' ? 'white' : 'var(--caribbean-blue)',
                                        border: action.variant === 'primary' 
                                            ? 'none' 
                                            : '1px solid rgba(0, 168, 232, 0.3)',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (action.variant === 'primary') {
                                            e.target.style.transform = 'translateY(-3px)'
                                            e.target.style.boxShadow = '0 10px 25px rgba(0, 168, 232, 0.3)'
                                        } else {
                                            e.target.style.background = 'rgba(0, 168, 232, 0.15)'
                                            e.target.style.transform = 'translateY(-2px)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (action.variant === 'primary') {
                                            e.target.style.transform = 'translateY(0)'
                                            e.target.style.boxShadow = 'none'
                                        } else {
                                            e.target.style.background = 'rgba(0, 168, 232, 0.1)'
                                            e.target.style.transform = 'translateY(0)'
                                        }
                                    }}
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            background: 'rgba(0, 168, 232, 0.1)',
                            border: '1px solid rgba(0, 168, 232, 0.2)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'none',
                            padding: '0.75rem',
                            color: 'var(--caribbean-blue)',
                            transition: 'all 0.2s ease'
                        }}
                        className="mobile-menu-button"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 168, 232, 0.15)'
                            e.currentTarget.style.transform = 'rotate(90deg)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 168, 232, 0.1)'
                            e.currentTarget.style.transform = 'rotate(0deg)'
                        }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        margin: '1rem 0',
                        padding: '1.5rem',
                        boxShadow: '0 20px 40px rgba(0, 119, 182, 0.15)',
                        border: '1px solid rgba(0, 168, 232, 0.1)',
                        animation: 'slideDown 0.3s ease'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            paddingBottom: '1.5rem',
                            borderBottom: '2px solid #f0f9ff'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'linear-gradient(135deg, var(--caribbean-blue), var(--light-blue))',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <Anchor size={24} />
                            </div>
                            <div>
                                <h3 style={{ 
                                    margin: 0, 
                                    color: 'var(--deep-blue)',
                                    fontSize: '1.2rem',
                                    fontWeight: '700'
                                }}>
                                    Navigation
                                </h3>
                                <p style={{ 
                                    margin: '0.25rem 0 0 0', 
                                    fontSize: '0.9rem', 
                                    color: '#666' 
                                }}>
                                    Choose where to go
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {navItems.map((item) => (
                                <div key={item.path}>
                                    {item.hasDropdown ? (
                                        <>
                                            <div
                                                onClick={() => setShowAdventuresDropdown(!showAdventuresDropdown)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '1rem',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    background: location.pathname === item.path 
                                                        ? 'rgba(0, 168, 232, 0.1)' 
                                                        : 'rgba(0, 168, 232, 0.03)',
                                                    border: `1px solid ${location.pathname === item.path 
                                                        ? 'var(--caribbean-blue)' 
                                                        : 'rgba(0, 168, 232, 0.1)'}`,
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ 
                                                        color: location.pathname === item.path 
                                                            ? 'var(--caribbean-blue)' 
                                                            : '#666'
                                                    }}>
                                                        {item.icon}
                                                    </div>
                                                    <span style={{ 
                                                        fontWeight: location.pathname === item.path ? '700' : '600',
                                                        color: location.pathname === item.path 
                                                            ? 'var(--caribbean-blue)' 
                                                            : '#444'
                                                    }}>
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <ChevronDown size={20} style={{ 
                                                    transform: showAdventuresDropdown ? 'rotate(180deg)' : 'none',
                                                    transition: 'transform 0.3s ease'
                                                }} />
                                            </div>

                                            {showAdventuresDropdown && (
                                                <div style={{ 
                                                    padding: '0.5rem 0 0.5rem 2rem',
                                                    display: 'grid',
                                                    gap: '0.5rem'
                                                }}>
                                                    {item.dropdownItems.map((dropdownItem) => (
                                                        <Link
                                                            key={dropdownItem.path}
                                                            to={dropdownItem.path}
                                                            onClick={() => {
                                                                setIsMenuOpen(false)
                                                                setShowAdventuresDropdown(false)
                                                            }}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '1rem',
                                                                padding: '0.75rem 1rem',
                                                                textDecoration: 'none',
                                                                color: '#444',
                                                                borderRadius: '8px',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.background = 'rgba(0, 168, 232, 0.05)'
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.background = 'transparent'
                                                            }}
                                                        >
                                                            <div style={{ color: 'var(--caribbean-blue)' }}>
                                                                {dropdownItem.icon}
                                                            </div>
                                                            <div>
                                                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                                                                    {dropdownItem.label}
                                                                </div>
                                                                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                                                    {dropdownItem.description}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem',
                                                textDecoration: 'none',
                                                color: location.pathname === item.path 
                                                    ? 'var(--caribbean-blue)' 
                                                    : '#444',
                                                fontWeight: location.pathname === item.path ? '700' : '600',
                                                borderRadius: '10px',
                                                background: location.pathname === item.path 
                                                    ? 'rgba(0, 168, 232, 0.1)' 
                                                    : 'transparent',
                                                border: `1px solid ${location.pathname === item.path 
                                                    ? 'var(--caribbean-blue)' 
                                                    : 'rgba(0, 168, 232, 0.1)'}`,
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (location.pathname !== item.path) {
                                                    e.currentTarget.style.background = 'rgba(0, 168, 232, 0.05)'
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (location.pathname !== item.path) {
                                                    e.currentTarget.style.background = 'transparent'
                                                }
                                            }}
                                        >
                                            <div style={{ 
                                                opacity: location.pathname === item.path ? 1 : 0.8
                                            }}>
                                                {item.icon}
                                            </div>
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Quick Actions */}
                        <div style={{ 
                            display: 'grid', 
                            gap: '1rem', 
                            marginTop: '1.5rem',
                            paddingTop: '1.5rem',
                            borderTop: '2px solid #f0f9ff'
                        }}>
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        action.onClick()
                                        setIsMenuOpen(false)
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        padding: '1rem',
                                        background: action.variant === 'primary'
                                            ? 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))'
                                            : 'rgba(0, 168, 232, 0.1)',
                                        color: action.variant === 'primary' ? 'white' : 'var(--caribbean-blue)',
                                        border: action.variant === 'primary' 
                                            ? 'none' 
                                            : '1px solid rgba(0, 168, 232, 0.3)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                        if (action.variant === 'primary') {
                                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 168, 232, 0.3)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        if (action.variant === 'primary') {
                                            e.currentTarget.style.boxShadow = 'none'
                                        }
                                    }}
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header