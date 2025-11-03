// contexts/BookingContext.js
import React, { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const [selectedTour, setSelectedTour] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const openBookingModal = (tour) => {
    setSelectedTour(tour)
    setIsBookingModalOpen(true)
    setBookingSuccess(false)
  }

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
    setSelectedTour(null)
    setBookingSuccess(false)
  }

  const submitBooking = (bookingData) => {
    const newBooking = {
      id: Date.now().toString(),
      tour: selectedTour,
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    }

    setBookings(prev => [...prev, newBooking])
    setBookingSuccess(true)
    
    // In a real app, you would send this to your backend
    console.log('Booking submitted:', newBooking)
    
    // Close modal after 2 seconds on success
    setTimeout(() => {
      closeBookingModal()
    }, 2000)
  }

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
  }

  return (
    <BookingContext.Provider value={{
      bookings,
      selectedTour,
      isBookingModalOpen,
      bookingSuccess,
      openBookingModal,
      closeBookingModal,
      submitBooking,
      cancelBooking
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}