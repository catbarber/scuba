import React from 'react'
import { MapPin, Clock, Users, Star, Calendar } from 'lucide-react'

const Tours = () => {
    const tours = [
        {
            id: 1,
            name: "Coral Garden Explorer",
            description: "Discover vibrant coral formations and tropical fish in our most popular shallow reef dive.",
            price: 89,
            duration: "3 hours",
            groupSize: "6 divers",
            difficulty: "Beginner",
            location: "North Wall",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Colorful Corals", "Tropical Fish", "Perfect for Beginners", "Photography Friendly"]
        },
        {
            id: 2,
            name: "Advanced Wall Dive",
            description: "Experience the thrill of drifting along dramatic underwater walls teeming with marine life.",
            price: 129,
            duration: "4 hours",
            groupSize: "4 divers",
            difficulty: "Advanced",
            location: "East Drop-off",
            rating: 4.95,
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Dramatic Walls", "Large Pelagics", "Strong Currents", "Advanced Skills Required"]
        },
        {
            id: 3,
            name: "Night Dive Adventure",
            description: "Witness the reef come alive at night with nocturnal creatures and bioluminescent displays.",
            price: 109,
            duration: "2.5 hours",
            groupSize: "5 divers",
            difficulty: "Intermediate",
            location: "West Bay Reef",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1587502536575-6dfba0c82b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Nocturnal Species", "Bioluminescence", "Unique Photography", "Thrilling Experience"]
        },
        {
            id: 4,
            name: "Wreck Discovery Tour",
            description: "Explore historic shipwrecks and artificial reefs that host diverse marine ecosystems.",
            price: 149,
            duration: "5 hours",
            groupSize: "6 divers",
            difficulty: "Intermediate",
            location: "Shipwreck Alley",
            rating: 4.85,
            image: "https://images.unsplash.com/photo-1544551763-2c30cb0aa0b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            highlights: ["Historic Wrecks", "Artificial Reefs", "Large Schools", "Penetration Dives"]
        }
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
                            <Calendar size={20} style={{ marginRight: '8px' }} />
                            Book Now
                        </button>
                        <button className="btn-primary" style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: '2px solid white',
                            fontSize: '1.1rem',
                            padding: '12px 30px'
                        }}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TourCard = ({ tour }) => (
    <div style={{
        background: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 168, 232, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
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

            <button className="btn-primary" style={{ width: '100%' }}>
                Book This Tour
            </button>
        </div>
    </div>
)

export default Tours