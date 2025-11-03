import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tours from './pages/Tours'
import Donate from './pages/Donate'
import About from './pages/About'
import { BookingProvider } from './contexts/BookingContext'
import './index.css'
import BookingTour from './pages/BookingTour'
import Contact from './pages/Contact'

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/booking/:id" element={<BookingTour />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  )
}

export default App