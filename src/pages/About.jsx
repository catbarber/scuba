import React from 'react'
import { Award, Shield, Heart, Target, Users, Globe } from 'lucide-react'

const About = () => {
    const team = [
        {
            name: "Sarah Martinez",
            role: "Head Dive Instructor",
            certification: "PADI Master Instructor",
            experience: "12 years",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            bio: "Specializes in reef ecology and underwater photography"
        },
        {
            name: "Marcus Johnson",
            role: "Safety Officer & Guide",
            certification: "PADI Divemaster",
            experience: "8 years",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            bio: "Former marine biologist with expertise in Caribbean marine life"
        },
        {
            name: "Elena Rodriguez",
            role: "Conservation Director",
            certification: "Marine Biologist",
            experience: "10 years",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            bio: "Leads our coral restoration and conservation programs"
        }
    ]

    const certifications = [
        "PADI 5-Star Dive Center",
        "Green Fins Certified",
        "Project AWARE Partner",
        "Coral Restoration Foundation",
        "Emergency First Response"
    ]

    return (
        <div style={{ padding: '2rem 0', minHeight: '100vh' }}>
            <div className="container">
                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        background: 'linear-gradient(45deg, var(--deep-blue), var(--caribbean-blue))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        About Caribbean Dive Masters
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        maxWidth: '800px',
                        margin: '0 auto 2rem',
                        lineHeight: '1.6',
                        color: '#555'
                    }}>
                        For over a decade, we've been sharing our passion for the Caribbean's underwater world
                        while championing marine conservation and sustainable diving practices.
                    </p>
                </div>

                {/* Mission & Values */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <ValueCard
                            icon={<Target size={40} />}
                            title="Our Mission"
                            description="To provide unforgettable diving experiences while actively contributing to marine conservation and education."
                            color="var(--caribbean-blue)"
                        />
                        <ValueCard
                            icon={<Heart size={40} />}
                            title="Our Passion"
                            description="We live and breathe the ocean. Our team is dedicated to sharing the wonders of marine life with every diver."
                            color="var(--coral)"
                        />
                        <ValueCard
                            icon={<Shield size={40} />}
                            title="Our Commitment"
                            description="Safety, sustainability, and education are at the core of everything we do. We protect what we love."
                            color="var(--deep-blue)"
                        />
                    </div>
                </section>

                {/* Team Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        marginBottom: '2rem',
                        color: 'var(--deep-blue)'
                    }}>
                        Meet Our Team
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {team.map((member, index) => (
                            <TeamMember key={index} member={member} />
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        marginBottom: '2rem',
                        color: 'var(--deep-blue)'
                    }}>
                        Certifications & Partnerships
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                    border: '2px solid var(--light-blue)'
                                }}
                            >
                                <Award size={32} style={{
                                    color: 'var(--caribbean-blue)',
                                    marginBottom: '1rem',
                                    margin: '0 auto 1rem'
                                }} />
                                <h4 style={{
                                    color: 'var(--deep-blue)',
                                    fontSize: '1rem'
                                }}>
                                    {cert}
                                </h4>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Conservation Impact */}
                <section style={{
                    background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
                    borderRadius: '15px',
                    padding: '3rem',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <Globe size={48} style={{ margin: '0 auto 1rem' }} />
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '1rem'
                    }}>
                        Making a Difference
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        opacity: 0.9
                    }}>
                        Through our conservation efforts and sustainable practices, we're committed to
                        preserving the Caribbean's marine ecosystems for future generations.
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <ImpactStat number="2,500+" label="Coral Fragments Planted" />
                        <ImpactStat number="15+" label="Local Species Protected" />
                        <ImpactStat number="5,000+" label="Beach Cleanup Participants" />
                    </div>
                </section>
            </div>
        </div>
    )
}

const ValueCard = ({ icon, title, description, color }) => (
    <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 168, 232, 0.1)',
        borderTop: `4px solid ${color}`
    }}>
        <div style={{ color, marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{
            marginBottom: '1rem',
            color: 'var(--deep-blue)'
        }}>
            {title}
        </h3>
        <p style={{
            color: '#666',
            lineHeight: '1.6'
        }}>
            {description}
        </p>
    </div>
)

const TeamMember = ({ member }) => (
    <div style={{
        background: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 168, 232, 0.1)',
        textAlign: 'center'
    }}>
        <div style={{
            height: '200px',
            background: `url(${member.image}) center/cover`
        }} />
        <div style={{ padding: '1.5rem' }}>
            <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
                color: 'var(--deep-blue)'
            }}>
                {member.name}
            </h3>
            <p style={{
                color: 'var(--caribbean-blue)',
                fontWeight: '600',
                marginBottom: '0.5rem'
            }}>
                {member.role}
            </p>
            <p style={{
                fontSize: '0.9rem',
                color: '#666',
                marginBottom: '0.5rem'
            }}>
                {member.certification} • {member.experience}
            </p>
            <p style={{
                fontSize: '0.9rem',
                color: '#555',
                lineHeight: '1.5'
            }}>
                {member.bio}
            </p>
        </div>
    </div>
)

const ImpactStat = ({ number, label }) => (
    <div>
        <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        }}>
            {number}
        </div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{label}</div>
    </div>
)

export default About