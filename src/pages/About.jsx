import React from 'react'
import { Award, Shield, Heart, Target, Users, Globe, Anchor, Map, Star, CheckCircle, Compass, TreePine } from 'lucide-react'

const About = () => {
    const coreValues = [
        {
            icon: <Shield size={36} />,
            title: 'Expertise & Safety',
            description: 'PADI certified guides with safety as our non-negotiable priority. All equipment meets international safety standards.',
            color: 'var(--caribbean-blue)'
        },
        {
            icon: <Heart size={36} />,
            title: 'Sustainable Stewardship',
            description: 'Active participants in conserving Tobago\'s environment. 10% of profits go to marine conservation and reef restoration.',
            color: 'var(--chartreuse)'
        },
        {
            icon: <Users size={36} />,
            title: 'Community Partnership',
            description: 'Our success is linked to local prosperity. We work with local suppliers, guides, and conservation groups.',
            color: 'var(--deep-blue)'
        },
        {
            icon: <Target size={36} />,
            title: 'Authentic Connection',
            description: 'We create meaningful, not transactional experiences that foster deep connections with Tobago\'s ecosystems and culture.',
            color: 'var(--coral)'
        }
    ]

    const teamMembers = [
        {
            name: 'Captain Mark Roberts',
            role: 'Marine Operations Director',
            certification: 'PADI Master Instructor',
            experience: '15+ years experience',
            bio: 'Specializes in deep wreck dives and marine conservation. Certified rescue diver with extensive knowledge of Tobago\'s coral reefs.',
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'Sarah Johnson',
            role: 'Eco-Tourism Specialist',
            certification: 'Wildlife Biologist',
            experience: '12+ years guiding',
            bio: 'Expert in Tobago\'s terrestrial ecosystems and cultural heritage. Leads our Uncharted land tours with passion for conservation.',
            image: 'https://images.unsplash.com/photo-1551836026-d5c2c0b4d5a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'David Chen',
            role: 'Safety & Training Manager',
            certification: 'Emergency First Response',
            experience: '20+ years in water safety',
            bio: 'Oversees all safety protocols and guide training. Former coast guard officer with extensive emergency response experience.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
    ]

    const impactStats = [
        { number: '500+', label: 'Coral Fragments Planted' },
        { number: '2,000+', label: 'Guests Served' },
        { number: '50+', label: 'Local Jobs Created' },
        { number: '100%', label: 'Safety Record' }
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.9) 0%, rgba(0, 168, 232, 0.9) 100%), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                color: 'white',
                padding: '6rem 1rem 5rem',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        display: 'inline-block',
                        marginBottom: '1.5rem'
                    }}>
                        <h1 style={{ 
                            fontSize: '3.5rem', 
                            marginBottom: '1rem', 
                            fontWeight: '700',
                            background: 'linear-gradient(to right, white, #e0f7ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            AquaDeep Tobago Tours
                        </h1>
                    </div>
                    <p style={{ 
                        fontSize: '1.5rem', 
                        maxWidth: '800px', 
                        margin: '0 auto 2rem',
                        opacity: 0.95,
                        fontWeight: '300',
                        lineHeight: '1.6'
                    }}>
                        Tobago's Premier Integrated Eco-Adventure Operator
                    </p>
                    <div style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap',
                        marginTop: '2rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '50px',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <Anchor size={20} />
                            <span>PADI Certified</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '50px',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <Map size={20} />
                            <span>Local Experts</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '50px',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <TreePine size={20} />
                            <span>Eco-Certified</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 1rem' }}>
                {/* Mission Section */}
                <section style={{ marginBottom: '5rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                        borderRadius: '20px',
                        padding: '3.5rem',
                        boxShadow: '0 20px 60px rgba(0, 119, 182, 0.15)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'var(--light-blue)',
                            borderRadius: '50%',
                            opacity: 0.1
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-50px',
                            left: '-50px',
                            width: '150px',
                            height: '150px',
                            background: 'var(--chartreuse)',
                            borderRadius: '50%',
                            opacity: 0.1
                        }} />
                        
                        <Compass size={48} style={{ 
                            color: 'var(--caribbean-blue)', 
                            marginBottom: '1.5rem' 
                        }} />
                        <h2 style={{ 
                            fontSize: '2.5rem', 
                            marginBottom: '1.5rem', 
                            color: 'var(--deep-blue)',
                            fontWeight: '700'
                        }}>
                            Our Mission
                        </h2>
                        <div style={{ 
                            fontSize: '1.4rem', 
                            lineHeight: '1.8', 
                            color: '#555',
                            fontStyle: 'italic',
                            marginBottom: '2rem',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            "To be the premier provider of integrated eco-adventures in Tobago, offering seamless, authentic, and sustainable experiences above and below the water that foster a deep connection with the island's unique ecosystems and culture."
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            gap: '2rem', 
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginTop: '2rem'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--caribbean-blue)' }}>15+</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Years Experience</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--caribbean-blue)' }}>100%</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Safety Record</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--caribbean-blue)' }}>4.9★</div>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>Guest Rating</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Business Model Section */}
                <section style={{ marginBottom: '5rem' }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        fontSize: '2.8rem', 
                        marginBottom: '3.5rem', 
                        color: 'var(--deep-blue)',
                        fontWeight: '700',
                        position: 'relative'
                    }}>
                        <span style={{
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            Our Integrated Approach
                            <div style={{
                                position: 'absolute',
                                bottom: '-10px',
                                left: '0',
                                right: '0',
                                height: '4px',
                                background: 'linear-gradient(to right, var(--caribbean-blue), var(--chartreuse))',
                                borderRadius: '2px'
                            }} />
                        </span>
                    </h2>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            boxShadow: '0 15px 40px rgba(0, 119, 182, 0.1)',
                            textAlign: 'center',
                            borderTop: '5px solid var(--caribbean-blue)',
                            transition: 'transform 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                right: '0',
                                height: '5px',
                                background: 'linear-gradient(to right, var(--caribbean-blue), #00a8e8)'
                            }} />
                            <div style={{
                                width: '70px',
                                height: '70px',
                                background: 'var(--caribbean-blue)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white'
                            }}>
                                <Anchor size={32} />
                            </div>
                            <h3 style={{ 
                                color: 'var(--caribbean-blue)', 
                                marginBottom: '1rem', 
                                fontSize: '1.6rem',
                                fontWeight: '700'
                            }}>
                                AquaDeep Marine Experiences
                            </h3>
                            <p style={{ 
                                color: '#666', 
                                lineHeight: '1.7',
                                marginBottom: '1.5rem',
                                fontSize: '1.05rem'
                            }}>
                                Professional scuba diving and snorkeling adventures exploring Tobago's vibrant marine ecosystems. From beginner Discover dives to advanced wreck explorations with PADI certified instructors.
                            </p>
                            <ul style={{ 
                                textAlign: 'left', 
                                color: '#555',
                                listStyle: 'none',
                                padding: '0',
                                margin: '0'
                            }}>
                                {['Guided Reef & Wreck Dives', 'PADI Courses (Beginner to Pro)', 'Discover Scuba Diving', 'Snorkeling Safaris', 'Night Diving Adventures'].map((item, i) => (
                                    <li key={i} style={{ 
                                        marginBottom: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <CheckCircle size={18} style={{ color: 'var(--caribbean-blue)', flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            boxShadow: '0 15px 40px rgba(0, 119, 182, 0.1)',
                            textAlign: 'center',
                            borderTop: '5px solid var(--chartreuse)',
                            transition: 'transform 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                right: '0',
                                height: '5px',
                                background: 'linear-gradient(to right, var(--chartreuse), #c9f73e)'
                            }} />
                            <div style={{
                                width: '70px',
                                height: '70px',
                                background: 'var(--chartreuse)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#333'
                            }}>
                                <Map size={32} />
                            </div>
                            <h3 style={{ 
                                color: 'var(--chartreuse)', 
                                marginBottom: '1rem', 
                                fontSize: '1.6rem',
                                fontWeight: '700'
                            }}>
                                Uncharted Land Adventures
                            </h3>
                            <p style={{ 
                                color: '#666', 
                                lineHeight: '1.7',
                                marginBottom: '1.5rem',
                                fontSize: '1.05rem'
                            }}>
                                Immersive land tours showcasing Tobago's rich heritage, diverse wildlife, and stunning landscapes. Expert guides provide authentic cultural and nature experiences.
                            </p>
                            <ul style={{ 
                                textAlign: 'left', 
                                color: '#555',
                                listStyle: 'none',
                                padding: '0',
                                margin: '0'
                            }}>
                                {['Heritage & Nature Tour', 'Birdwatcher\'s Paradise Tour', 'Rainforest & Waterfall Hikes', 'Cultural Heritage Walks', 'Private Custom Charters'].map((item, i) => (
                                    <li key={i} style={{ 
                                        marginBottom: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <CheckCircle size={18} style={{ color: 'var(--chartreuse)', flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            boxShadow: '0 15px 40px rgba(0, 119, 182, 0.1)',
                            textAlign: 'center',
                            borderTop: '5px solid var(--deep-blue)',
                            transition: 'transform 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                right: '0',
                                height: '5px',
                                background: 'linear-gradient(to right, var(--deep-blue), #0077b6)'
                            }} />
                            <div style={{
                                width: '70px',
                                height: '70px',
                                background: 'var(--deep-blue)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'white'
                            }}>
                                <Star size={32} />
                            </div>
                            <h3 style={{ 
                                color: 'var(--deep-blue)', 
                                marginBottom: '1rem', 
                                fontSize: '1.6rem',
                                fontWeight: '700'
                            }}>
                                Synergistic Cross-Tours
                            </h3>
                            <p style={{ 
                                color: '#666', 
                                lineHeight: '1.7',
                                marginBottom: '1.5rem',
                                fontSize: '1.05rem'
                            }}>
                                Combined packages offering the complete Tobago experience - from rainforest canopies to coral reefs. Perfect for guests wanting comprehensive adventure.
                            </p>
                            <ul style={{ 
                                textAlign: 'left', 
                                color: '#555',
                                listStyle: 'none',
                                padding: '0',
                                margin: '0'
                            }}>
                                {['Rainforest & Reef Package', 'Multi-Day Immersion Tours', 'Family Adventure Packages', 'Photography Expeditions', 'Conservation & Adventure Combos'].map((item, i) => (
                                    <li key={i} style={{ 
                                        marginBottom: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <CheckCircle size={18} style={{ color: 'var(--deep-blue)', flexShrink: 0 }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section style={{ marginBottom: '5rem' }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        fontSize: '2.8rem', 
                        marginBottom: '3.5rem', 
                        color: 'var(--deep-blue)',
                        fontWeight: '700'
                    }}>
                        Our Core Values
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {coreValues.map((value, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '2.5rem 2rem',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0, 119, 182, 0.08)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(0, 119, 182, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)'
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 119, 182, 0.15)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 119, 182, 0.08)'
                            }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: `linear-gradient(135deg, ${value.color}, ${value.color}99)`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: 'white'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{ 
                                    color: 'var(--deep-blue)', 
                                    marginBottom: '1rem',
                                    fontSize: '1.4rem',
                                    fontWeight: '600'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{ 
                                    color: '#666', 
                                    lineHeight: '1.6',
                                    fontSize: '1rem'
                                }}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section style={{ marginBottom: '5rem' }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        fontSize: '2.8rem', 
                        marginBottom: '3.5rem', 
                        color: 'var(--deep-blue)',
                        fontWeight: '700'
                    }}>
                        Meet Our Expert Team
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {teamMembers.map((member, index) => (
                            <div key={index} style={{
                                background: 'white',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 40px rgba(0, 119, 182, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                            >
                                <div style={{
                                    height: '250px',
                                    background: `url(${member.image}) center/cover`,
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '0',
                                        right: '0',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                        padding: '1.5rem',
                                        color: 'white'
                                    }}>
                                        <h3 style={{ 
                                            fontSize: '1.5rem', 
                                            marginBottom: '0.25rem',
                                            fontWeight: '600'
                                        }}>
                                            {member.name}
                                        </h3>
                                        <p style={{ 
                                            fontSize: '1rem',
                                            opacity: 0.9,
                                            fontWeight: '500'
                                        }}>
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '1rem',
                                        paddingBottom: '1rem',
                                        borderBottom: '2px solid #f0f9ff'
                                    }}>
                                        <span style={{
                                            background: 'var(--light-blue)',
                                            color: 'var(--deep-blue)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {member.certification}
                                        </span>
                                        <span style={{
                                            background: 'var(--chartreuse)',
                                            color: '#333',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {member.experience}
                                        </span>
                                    </div>
                                    <p style={{ 
                                        color: '#666', 
                                        lineHeight: '1.7',
                                        fontSize: '0.95rem'
                                    }}>
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact Section */}
                <section style={{
                    background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
                    borderRadius: '25px',
                    padding: '4rem',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0, 119, 182, 0.2)'
                }}>
                    <h2 style={{ 
                        marginBottom: '3rem', 
                        fontSize: '2.5rem',
                        fontWeight: '700'
                    }}>
                        Our Impact in Tobago
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '2rem',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        {impactStats.map((stat, index) => (
                            <div key={index} style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '15px',
                                padding: '2rem 1.5rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                            }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '800',
                                    marginBottom: '0.75rem',
                                    background: 'linear-gradient(to right, white, #e0f7ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{ 
                                    fontSize: '1rem', 
                                    opacity: 0.95,
                                    fontWeight: '500'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p style={{
                        marginTop: '3rem',
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        lineHeight: '1.6',
                        maxWidth: '800px',
                        margin: '3rem auto 0'
                    }}>
                        Through our sustainable tourism model, we're not just creating unforgettable experiences - we're actively contributing to Tobago's environmental conservation, economic growth, and community development.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default About