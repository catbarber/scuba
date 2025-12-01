import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Play, Award, Users, Shield, 
  Anchor, Map, Compass, Globe, 
  Heart, ChevronRight, Star, 
  TreePine, Fish, Waves 
} from 'lucide-react'

const Home = () => {
    return (
        <div>
            {/* Enhanced Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.85) 0%, rgba(0, 168, 232, 0.85) 100%), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: 'white',
                padding: '8rem 0 6rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated background elements */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'url("data:image/svg+xml,%3Csvg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%" height="100%" fill="url(%23smallGrid)"/%3E%3C/svg%3E")',
                    opacity: 0.3
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '30px',
                        padding: '2rem',
                        display: 'inline-block',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <h1 style={{
                            fontSize: '4rem',
                            marginBottom: '0.5rem',
                            fontWeight: '800',
                            background: 'linear-gradient(to right, white, #e0f7ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            letterSpacing: '-0.5px'
                        }}>
                            AquaDeep Tobago Tours
                        </h1>
                    </div>
                    
                    <p style={{
                        fontSize: '1.8rem',
                        marginBottom: '2rem',
                        maxWidth: '800px',
                        margin: '0 auto 2rem',
                        fontWeight: '300',
                        lineHeight: '1.4',
                        opacity: 0.95
                    }}>
                        Premier Integrated Eco-Adventures • <span style={{ fontWeight: '600' }}>Above & Below the Water</span>
                    </p>
                    
                    <div style={{ 
                        display: 'flex', 
                        gap: '1.5rem', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap',
                        marginBottom: '3rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(5px)',
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <Anchor size={20} />
                            <span style={{ fontWeight: '500' }}>PADI Certified</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(5px)',
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <Map size={20} />
                            <span style={{ fontWeight: '500' }}>Local Experts</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(5px)',
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <TreePine size={20} />
                            <span style={{ fontWeight: '500' }}>Eco-Certified</span>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '1.5rem', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap' 
                    }}>
                        <Link 
                            to="/tours" 
                            style={{ 
                                fontSize: '1.2rem', 
                                padding: '18px 40px',
                                background: 'linear-gradient(135deg, var(--chartreuse), #c9f73e)',
                                color: '#333',
                                border: 'none',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 30px rgba(201, 247, 62, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-5px)'
                                e.target.style.boxShadow = '0 15px 40px rgba(201, 247, 62, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = '0 10px 30px rgba(201, 247, 62, 0.3)'
                            }}
                        >
                            <Compass size={20} />
                            Explore Adventures
                            <ChevronRight size={20} />
                        </Link>
                        <Link 
                            to="/contact" 
                            style={{ 
                                fontSize: '1.2rem', 
                                padding: '18px 40px',
                                background: 'transparent',
                                color: 'white',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                                e.target.style.borderColor = 'white'
                                e.target.style.transform = 'translateY(-5px)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent'
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                                e.target.style.transform = 'translateY(0)'
                            }}
                        >
                            <Calendar size={20} />
                            Book Your Tour
                        </Link>
                    </div>

                    {/* Hero stats */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3rem',
                        marginTop: '4rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '800',
                                marginBottom: '0.5rem',
                                background: 'linear-gradient(to right, white, #a8e6ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                4.9★
                            </div>
                            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Guest Rating</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '800',
                                marginBottom: '0.5rem',
                                background: 'linear-gradient(to right, white, #a8e6ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                15+
                            </div>
                            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Years Experience</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '800',
                                marginBottom: '0.5rem',
                                background: 'linear-gradient(to right, white, #a8e6ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                100%
                            </div>
                            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Safety Record</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: '800',
                                marginBottom: '0.5rem',
                                background: 'linear-gradient(to right, white, #a8e6ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                2000+
                            </div>
                            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Happy Guests</div>
                        </div>
                    </div>
                </div>

                {/* Wave decoration */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '80px',
                    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z\' fill=\'%23ffffff\'%3E%3C/path%3E%3C/svg%3E")',
                    backgroundSize: '1200px 80px'
                }} />
            </section>

            {/* Features Section - Updated for Integrated Model */}
            <section style={{ padding: '6rem 0', background: 'var(--sand)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: 'var(--deep-blue)',
                            fontWeight: '800',
                            letterSpacing: '-0.5px'
                        }}>
                            Why Choose AquaDeep Tobago?
                        </h2>
                        <p style={{ 
                            fontSize: '1.3rem', 
                            color: '#666', 
                            maxWidth: '700px', 
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Experience Tobago's most spectacular adventures with our integrated approach - 
                            combining marine and land experiences for the ultimate eco-adventure
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        <FeatureCard
                            icon={<Anchor size={48} />}
                            title="Marine Experts"
                            description="PADI certified dive masters and marine biologists guiding you through Tobago's vibrant underwater world"
                            color="var(--caribbean-blue)"
                        />
                        <FeatureCard
                            icon={<Map size={48} />}
                            title="Land Specialists"
                            description="Local experts leading immersive cultural, heritage, and wildlife tours across Tobago's stunning landscapes"
                            color="var(--chartreuse)"
                        />
                        <FeatureCard
                            icon={<Shield size={48} />}
                            title="Safety First"
                            description="100% safety record with modern equipment, certified guides, and comprehensive emergency protocols"
                            color="var(--deep-blue)"
                        />
                        <FeatureCard
                            icon={<Globe size={48} />}
                            title="Sustainable Tourism"
                            description="Eco-certified operations actively contributing to marine conservation and community development"
                            color="var(--coral)"
                        />
                        <FeatureCard
                            icon={<Users size={48} />}
                            title="Small Groups"
                            description="Intimate groups (max 6 divers, 12 land tour guests) for personalized attention and minimal environmental impact"
                            color="var(--caribbean-blue)"
                        />
                        <FeatureCard
                            icon={<Play size={48} />}
                            title="All Levels Welcome"
                            description="From beginner Discover dives to advanced wreck explorations; easy nature walks to challenging hikes"
                            color="var(--chartreuse)"
                        />
                    </div>
                </div>
            </section>

            {/* Conservation & Impact Section - Enhanced */}
            <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '5rem',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '3rem',
                                marginBottom: '1.5rem',
                                color: 'var(--deep-blue)',
                                fontWeight: '800',
                                lineHeight: '1.2'
                            }}>
                                Protecting Tobago's Unique Ecosystems
                            </h2>
                            <p style={{ 
                                fontSize: '1.2rem', 
                                lineHeight: '1.7', 
                                marginBottom: '1.5rem', 
                                color: '#555' 
                            }}>
                                We're not just tour operators - we're active stewards of Tobago's environment. 
                                Every adventure includes education about local ecosystems and conservation efforts.
                            </p>
                            <p style={{ 
                                fontSize: '1.2rem', 
                                lineHeight: '1.7', 
                                marginBottom: '2rem', 
                                color: '#555' 
                            }}>
                                10% of all profits directly support coral restoration, marine protection, 
                                and rainforest conservation initiatives in Tobago.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/about" style={{
                                    padding: '1rem 2rem',
                                    background: 'var(--caribbean-blue)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-3px)'
                                    e.target.style.boxShadow = '0 10px 25px rgba(0, 168, 232, 0.3)'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)'
                                    e.target.style.boxShadow = 'none'
                                }}
                                >
                                    <Heart size={20} />
                                    Learn About Our Mission
                                </Link>
                            </div>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                            borderRadius: '25px',
                            padding: '3rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0, 168, 232, 0.2)',
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
                                <h3 style={{ 
                                    marginBottom: '2rem', 
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem'
                                }}>
                                    <Waves size={32} />
                                    Our Impact
                                    <Fish size={32} />
                                </h3>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(2, 1fr)', 
                                    gap: '2rem'
                                }}>
                                    <Stat number="500+" label="Coral Fragments Planted" />
                                    <Stat number="2,000+" label="Guests Educated" />
                                    <Stat number="75+" label="Local Species Protected" />
                                    <Stat number="$50K+" label="Conservation Funding" />
                                    <Stat number="50+" label="Local Jobs Created" />
                                    <Stat number="100%" label="Plastic-Free Operations" />
                                </div>
                                <p style={{
                                    marginTop: '2.5rem',
                                    fontSize: '1rem',
                                    opacity: 0.9,
                                    lineHeight: '1.6',
                                    fontStyle: 'italic'
                                }}>
                                    Every tour contributes directly to Tobago's environmental and community wellbeing
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section style={{ 
                padding: '6rem 0',
                background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ 
                        fontSize: '3rem', 
                        marginBottom: '1.5rem',
                        fontWeight: '800'
                    }}>
                        Ready for Your Tobago Adventure?
                    </h2>
                    <p style={{ 
                        fontSize: '1.4rem', 
                        maxWidth: '700px', 
                        margin: '0 auto 3rem',
                        opacity: 0.95,
                        lineHeight: '1.6'
                    }}>
                        Dive into crystal clear waters, explore lush rainforests, and create unforgettable memories 
                        with Tobago's premier eco-adventure operator.
                    </p>
                    <div style={{ 
                        display: 'flex', 
                        gap: '1.5rem', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap' 
                    }}>
                        <Link 
                            to="/tours" 
                            style={{ 
                                fontSize: '1.2rem', 
                                padding: '18px 40px',
                                background: 'white',
                                color: 'var(--deep-blue)',
                                border: 'none',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-5px)'
                                e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Compass size={20} />
                            View All Tours
                            <ChevronRight size={20} />
                        </Link>
                        <Link 
                            to="/contact" 
                            style={{ 
                                fontSize: '1.2rem', 
                                padding: '18px 40px',
                                background: 'transparent',
                                color: 'white',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                                e.target.style.borderColor = 'white'
                                e.target.style.transform = 'translateY(-5px)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent'
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                                e.target.style.transform = 'translateY(0)'
                            }}
                        >
                            <Calendar size={20} />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

const FeatureCard = ({ icon, title, description, color }) => (
    <div style={{
        textAlign: 'center',
        padding: '2.5rem 2rem',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0, 119, 182, 0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)'
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 119, 182, 0.15)'
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)'
    }}
    >
        <div style={{ 
            color, 
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                background: `${color}15`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
        </div>
        <h3 style={{ 
            marginBottom: '1rem', 
            color: 'var(--deep-blue)',
            fontSize: '1.4rem',
            fontWeight: '700'
        }}>
            {title}
        </h3>
        <p style={{ 
            color: '#666', 
            lineHeight: '1.6',
            fontSize: '1.05rem'
        }}>
            {description}
        </p>
    </div>
)

const Stat = ({ number, label }) => (
    <div>
        <div style={{ 
            fontSize: '2rem', 
            fontWeight: '800', 
            marginBottom: '0.5rem',
            letterSpacing: '-0.5px'
        }}>
            {number}
        </div>
        <div style={{ 
            fontSize: '0.95rem', 
            opacity: 0.9,
            lineHeight: '1.4'
        }}>
            {label}
        </div>
    </div>
)

// Add missing Calendar icon component
const Calendar = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
)

export default Home