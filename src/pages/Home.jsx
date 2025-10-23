import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Award, Users, Shield } from 'lucide-react'

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, rgba(0, 168, 232, 0.9) 0%, rgba(0, 119, 182, 0.9) 100%), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '6rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{
                        fontSize: '3.5rem',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        Dive Into The Caribbean
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        opacity: 0.95
                    }}>
                        Discover breathtaking coral reefs and marine life with certified professionals
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/tours" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
                            Explore Tours
                        </Link>
                        <Link to="/donate" className="btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
                            Support Conservation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '5rem 0', background: 'var(--sand)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            marginBottom: '1rem',
                            color: 'var(--deep-blue)'
                        }}>
                            Why Dive With Us?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Experience the Caribbean's most spectacular dive sites with safety and expertise
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        <FeatureCard
                            icon={<Award size={48} />}
                            title="Certified Experts"
                            description="PADI certified instructors with 10+ years of Caribbean diving experience"
                            color="var(--caribbean-blue)"
                        />
                        <FeatureCard
                            icon={<Shield size={48} />}
                            title="Safety First"
                            description="Top-rated safety record with modern equipment and emergency protocols"
                            color="var(--deep-blue)"
                        />
                        <FeatureCard
                            icon={<Users size={48} />}
                            title="Small Groups"
                            description="Intimate groups of 6 divers max for personalized attention"
                            color="var(--chartreuse)"
                        />
                        <FeatureCard
                            icon={<Play size={48} />}
                            title="All Levels Welcome"
                            description="From beginner discover dives to advanced technical diving"
                            color="var(--coral)"
                        />
                    </div>
                </div>
            </section>

            {/* Conservation Section */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '2.5rem',
                                marginBottom: '1.5rem',
                                color: 'var(--deep-blue)'
                            }}>
                                Protecting Our Oceans
                            </h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#555' }}>
                                We're committed to sustainable diving practices and marine conservation.
                                Every tour includes education about local ecosystems and conservation efforts.
                            </p>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', color: '#555' }}>
                                10% of all profits support coral restoration and marine protection initiatives
                                in the Caribbean.
                            </p>
                            <Link to="/donate" className="btn-primary">
                                Support Our Mission
                            </Link>
                        </div>
                        <div style={{
                            background: 'linear-gradient(45deg, var(--light-blue), var(--caribbean-blue))',
                            borderRadius: '15px',
                            padding: '2rem',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Our Impact</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                <Stat number="500+" label="Coral Fragments Planted" />
                                <Stat number="1,000+" label="Divers Educated" />
                                <Stat number="50+" label="Marine Species Protected" />
                                <Stat number="$25K+" label="Conservation Funding" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const FeatureCard = ({ icon, title, description, color }) => (
    <div style={{
        textAlign: 'center',
        padding: '2rem 1.5rem',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease'
    }}>
        <div style={{ color, marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--deep-blue)' }}>{title}</h3>
        <p style={{ color: '#666', lineHeight: '1.6' }}>{description}</p>
    </div>
)

const Stat = ({ number, label }) => (
    <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{number}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{label}</div>
    </div>
)

export default Home