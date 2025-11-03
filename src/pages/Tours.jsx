import React from 'react'
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Users, Star, Calendar } from 'lucide-react'

const Tours = () => {
    const tours = [
        {
            id: 1,
            name: "Coral Garden Explorer - Tobago",
            description: "Discover vibrant coral formations and tropical fish in our most popular shallow reef dive.",
            price: 89,
            duration: "3 hours",
            groupSize: "6 divers",
            difficulty: "Beginner",
            location: "Buccoo Reef",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Colorful Corals", "Tropical Fish", "Perfect for Beginners", "Photography Friendly"]
        },
        {
            id: 2,
            name: "Ship Wreck 100ft Dive. - Tobago",
            description: "Experience the thrill of drifting along dramatic underwater walls teeming with marine life.",
            price: 129,
            duration: "4 hours",
            groupSize: "4 divers",
            difficulty: "Advanced",
            location: "Maverick Wreck",
            rating: 4.95,
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Sunken ship", "One hundred feet dive", "Advanced Skills Required"]
        },
        {
            id: 3,
            name: "Night Dive Adventure - Tobago",
            description: "Witness the sea come alive at night with nocturnal creatures and bioluminescent displays.",
            price: 109,
            duration: "2.5 hours",
            groupSize: "5 divers",
            difficulty: "Beginner",
            location: "Buccoo Reef",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1587502536575-6dfba0c82b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Nocturnal Species", "Bioluminescence", "Unique Photography", "Thrilling Experience"]
        },
    ]

    return (
        <div style={{ padding: '2rem 0', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        background: 'linear-gradient(45deg, var(--deep-blue), var(--caribbean-blue))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Dive Tours & Experiences
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', color: '#555' }}>
                        Choose from our carefully curated dive experiences, each designed to showcase
                        the unique beauty of Caribbean marine ecosystems.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
                    borderRadius: '15px',
                    padding: '3rem',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Ready to Dive In?</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>
                        Contact us to book your adventure or ask about custom dive packages
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-secondary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TourCard = ({ tour }) => {
    const navigate = useNavigate();

    return (
        <div style={{
            background: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 168, 232, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 168, 232, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 168, 232, 0.1)';
        }}
        >
            <div style={{
                height: '200px',
                background: `url(${tour.image}) center/cover`,
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--chartreuse)',
                    color: '#333',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}>
                    ${tour.price}
                </div>
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    <Star size={14} fill="currentColor" />
                    {tour.rating}
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem',
                    color: 'var(--deep-blue)'
                }}>
                    {tour.name}
                </h3>
                <p style={{
                    color: '#666',
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                }}>
                    {tour.description}
                </p>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        color: '#555'
                    }}>
                        <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                        <span>{tour.location}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        color: '#555'
                    }}>
                        <Clock size={16} style={{ marginRight: '0.5rem' }} />
                        <span>{tour.duration}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        color: '#555'
                    }}>
                        <Users size={16} style={{ marginRight: '0.5rem' }} />
                        <span>{tour.groupSize} • {tour.difficulty}</span>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        color: 'var(--deep-blue)',
                        fontWeight: '600'
                    }}>
                        Highlights:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {tour.highlights.map((highlight, index) => (
                            <span
                                key={index}
                                style={{
                                    background: 'rgba(0, 168, 232, 0.1)',
                                    color: 'var(--caribbean-blue)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '15px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500'
                                }}
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => navigate(`/booking/${tour.id}`)} 
                    className="btn-primary" 
                    style={{ 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Calendar size={20} style={{ marginRight: '8px' }} />
                    Book This Tour
                </button>
            </div>
        </div>
    )
}

export default Tours