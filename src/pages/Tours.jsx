import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MapPin, Clock, Users, Star, Calendar, 
  Anchor, Map, Filter, ChevronDown, 
  Waves, TreePine, ChevronRight, Sparkles
} from 'lucide-react'

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const tours = [
    // AquaDeep Marine Tours
    {
      id: 1,
      category: 'marine',
      name: "Coral Garden Explorer Dive",
      subTitle: "AquaDeep Marine Experience",
      description: "Discover vibrant coral formations and tropical fish in Tobago's most popular shallow reef dive. Perfect for beginners and certified divers alike.",
      price: 120,
      duration: "3 hours",
      groupSize: "6 divers",
      difficulty: "Beginner",
      location: "Buccoo Reef, Tobago",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["Snorkeling Option", "Colorful Corals", "Tropical Fish", "Perfect for Beginners", "Photography Friendly"],
      bestFor: ["First-time divers", "Photographers", "Family groups"]
    },
    {
      id: 2,
      category: 'marine',
      name: "Ship Wreck 100ft Adventure",
      subTitle: "AquaDeep Advanced Dive",
      description: "Advanced diving experience exploring the historic Maverick Wreck. Certified divers only with deep dive certification required.",
      price: 150,
      duration: "4 hours",
      groupSize: "4 divers",
      difficulty: "Advanced",
      location: "Maverick Wreck, Tobago",
      rating: 4.95,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1587502536575-6dfba0c82b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["Sunken Ship Exploration", "Advanced Skills Required", "Marine Life Sanctuary"],
      bestFor: ["Experienced divers", "Adventure seekers", "Photography enthusiasts"]
    },
    {
      id: 5,
      category: 'marine',
      name: "Discover Scuba Diving",
      subTitle: "AquaDeep Beginner Course",
      description: "Perfect introduction to scuba diving. No experience needed! Learn basic skills in confined water before your first ocean dive.",
      price: 95,
      duration: "3.5 hours",
      groupSize: "4 beginners",
      difficulty: "Beginner",
      location: "Pigeon Point, Tobago",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["No Experience Needed", "Professional Instruction", "Safe Learning Environment"],
      bestFor: ["First-timers", "Bucket list experiences", "Couples"]
    },
    
    // Uncharted Land Tours
    {
      id: 3,
      category: 'land',
      name: "Heritage & Nature Tour",
      subTitle: "Uncharted Land Adventure",
      description: "Comprehensive tour exploring Tobago's rich cultural heritage and stunning natural landscapes. Perfect for eco-tourists and families.",
      price: 90,
      duration: "5 hours",
      groupSize: "12 persons",
      difficulty: "Easy",
      location: "Various Locations across Tobago",
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      highlights: ["Historical Sites", "Nature Trails", "Local Culture", "Photography Stops"],
      bestFor: ["History buffs", "Nature lovers", "Families"]
    },
    {
      id: 4,
      category: 'land',
      name: "Birdwatcher's Paradise Tour",
      subTitle: "Uncharted Wildlife Experience",
      description: "Expert-guided tour through Tobago's premier birdwatching locations. Spot rare and endemic species in their natural habitat.",
      price: 85,
      duration: "4 hours",
      groupSize: "8 persons",
      difficulty: "Easy",
      location: "Tobago Rainforest & Reserves",
      rating: 4.7,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1551085254-e96b210db58a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
      highlights: ["Expert Bird Guide", "Endemic Species", "Rainforest Trails", "Binoculars Provided"],
      bestFor: ["Bird enthusiasts", "Photographers", "Nature lovers"]
    },
    {
      id: 6,
      category: 'land',
      name: "Rainforest & Waterfall Hike",
      subTitle: "Uncharted Nature Expedition",
      description: "Moderate hike through lush rainforest leading to breathtaking waterfalls. Includes natural pool swimming and picnic lunch.",
      price: 75,
      duration: "4.5 hours",
      groupSize: "10 persons",
      difficulty: "Moderate",
      location: "Main Ridge Forest Reserve",
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      highlights: ["Waterfall Swim", "Rainforest Exploration", "Picnic Lunch", "Photography Spots"],
      bestFor: ["Adventure seekers", "Hikers", "Nature photographers"]
    }
  ]

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)', padding: '2rem 0' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.9) 0%, rgba(0, 168, 232, 0.9) 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
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
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, white, #e0f7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>
            Explore Tobago's Adventures
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            maxWidth: '700px', 
            margin: '0 auto 2rem',
            opacity: 0.95,
            lineHeight: '1.5',
            fontWeight: '300'
          }}>
            Choose from our integrated selection of marine and land adventures. 
            Experience Tobago above and below the water with expert guides.
          </p>
          
          {/* Category Filter Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '0.75rem 1.5rem',
                background: selectedCategory === 'all' ? 'white' : 'rgba(255, 255, 255, 0.2)',
                color: selectedCategory === 'all' ? 'var(--deep-blue)' : 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)'
              }}
              onMouseEnter={(e) => selectedCategory !== 'all' && (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => selectedCategory !== 'all' && (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              <Sparkles size={18} />
              All Adventures
            </button>
            <button
              onClick={() => setSelectedCategory('marine')}
              style={{
                padding: '0.75rem 1.5rem',
                background: selectedCategory === 'marine' ? 'white' : 'rgba(255, 255, 255, 0.2)',
                color: selectedCategory === 'marine' ? 'var(--deep-blue)' : 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)'
              }}
              onMouseEnter={(e) => selectedCategory !== 'marine' && (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => selectedCategory !== 'marine' && (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              <Anchor size={18} />
              Marine Adventures
            </button>
            <button
              onClick={() => setSelectedCategory('land')}
              style={{
                padding: '0.75rem 1.5rem',
                background: selectedCategory === 'land' ? 'white' : 'rgba(255, 255, 255, 0.2)',
                color: selectedCategory === 'land' ? 'var(--deep-blue)' : 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)'
              }}
              onMouseEnter={(e) => selectedCategory !== 'land' && (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => selectedCategory !== 'land' && (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              <Map size={18} />
              Land Adventures
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.95rem'
          }}>
            <Star size={16} fill="currentColor" />
            <span>4.8+ average rating across all tours</span>
            <span style={{ margin: '0 0.5rem' }}>•</span>
            <span>100% safety record</span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Results Counter */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ 
              color: 'var(--deep-blue)', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              {filteredTours.length} {filteredTours.length === 1 ? 'Adventure' : 'Adventures'} Available
            </h2>
            <p style={{ color: '#666', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
              Showing {selectedCategory === 'all' ? 'all adventures' : selectedCategory === 'marine' ? 'marine adventures' : 'land adventures'}
            </p>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: 'var(--deep-blue)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <Filter size={18} />
            More Filters
            <ChevronDown size={18} style={{ transform: showFilters ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>

        {/* Tours Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2.5rem'
        }}>
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0, 119, 182, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                border: '1px solid rgba(0, 119, 182, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 119, 182, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 119, 182, 0.1)'
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: tour.category === 'marine' 
                  ? 'rgba(0, 168, 232, 0.9)' 
                  : 'rgba(201, 247, 62, 0.9)',
                color: tour.category === 'marine' ? 'white' : '#333',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: '700',
                backdropFilter: 'blur(5px)'
              }}>
                {tour.category === 'marine' ? <Anchor size={16} /> : <Map size={16} />}
                {tour.category === 'marine' ? 'AquaDeep' : 'Uncharted'}
              </div>

              {/* Tour Image */}
              <div style={{
                height: '250px',
                background: `url(${tour.image}) center/cover`,
                position: 'relative'
              }}>
                {/* Price Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, var(--chartreuse), #c9f73e)',
                  color: '#333',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '50px',
                  fontWeight: '800',
                  fontSize: '1.2rem',
                  boxShadow: '0 5px 15px rgba(201, 247, 62, 0.3)'
                }}>
                  ${tour.price}
                </div>
                
                {/* Rating Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backdropFilter: 'blur(5px)'
                }}>
                  <Star size={16} fill="currentColor" />
                  <span style={{ fontWeight: '700' }}>{tour.rating}</span>
                  <span style={{ opacity: 0.8, fontSize: '0.85rem' }}>({tour.reviews} reviews)</span>
                </div>
              </div>

              {/* Tour Content */}
              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ 
                    marginBottom: '0.25rem', 
                    color: 'var(--deep-blue)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    lineHeight: '1.3'
                  }}>
                    {tour.name}
                  </h3>
                  <p style={{
                    color: 'var(--caribbean-blue)',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 0'
                  }}>
                    {tour.subTitle}
                  </p>
                </div>
                
                <p style={{ 
                  color: '#666', 
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontSize: '1rem'
                }}>
                  {tour.description}
                </p>

                {/* Tour Details */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#555', fontSize: '0.95rem' }}>
                    <MapPin size={18} style={{ marginRight: '0.75rem', color: 'var(--caribbean-blue)' }} />
                    <span>{tour.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#555', fontSize: '0.95rem' }}>
                    <Clock size={18} style={{ marginRight: '0.75rem', color: 'var(--caribbean-blue)' }} />
                    <span>{tour.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#555', fontSize: '0.95rem' }}>
                    <Users size={18} style={{ marginRight: '0.75rem', color: 'var(--caribbean-blue)' }} />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#555', fontSize: '0.95rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: tour.difficulty === 'Beginner' ? 'var(--chartreuse)' : 
                                 tour.difficulty === 'Easy' ? 'var(--caribbean-blue)' : 
                                 tour.difficulty === 'Moderate' ? 'var(--coral)' : 'var(--deep-blue)',
                      borderRadius: '4px',
                      marginRight: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tour.difficulty === 'Beginner' || tour.difficulty === 'Easy' ? '#333' : 'white',
                      fontSize: '0.7rem',
                      fontWeight: '700'
                    }}>
                      {tour.difficulty.charAt(0)}
                    </div>
                    <span>{tour.difficulty}</span>
                  </div>
                </div>

                {/* Best For Tags */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: '#666', 
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Best for:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {tour.bestFor.map((item, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'rgba(0, 168, 232, 0.08)',
                          color: 'var(--caribbean-blue)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/booking/${tour.id}`}
                  state={{ tour: tour }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, var(--caribbean-blue), var(--deep-blue))',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)'
                    e.target.style.boxShadow = '0 10px 25px rgba(0, 168, 232, 0.3)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <Calendar size={20} />
                  Book This Adventure
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(0, 168, 232, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--caribbean-blue)'
            }}>
              {selectedCategory === 'marine' ? <Waves size={40} /> : <TreePine size={40} />}
            </div>
            <h3 style={{ color: 'var(--deep-blue)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
              No {selectedCategory === 'marine' ? 'marine' : 'land'} adventures available
            </h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Check back soon or try selecting a different category.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '0.75rem 2rem',
                background: 'var(--caribbean-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'var(--deep-blue)'}
              onMouseOut={(e) => e.target.style.background = 'var(--caribbean-blue)'}
            >
              View All Adventures
            </button>
          </div>
        )}

        {/* Packages Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--caribbean-blue) 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          color: 'white',
          textAlign: 'center',
          marginTop: '4rem',
          boxShadow: '0 20px 40px rgba(0, 168, 232, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700' }}>
            Looking for the Ultimate Tobago Experience?
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Combine marine and land adventures for a complete Tobago immersion package.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'white',
              color: 'var(--deep-blue)',
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            Request Custom Package
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Tours