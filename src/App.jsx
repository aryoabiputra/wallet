import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Wallet from './pages/Wallet'
import Stats from './pages/Stats'
import Settings from './pages/Settings'
import Navigation from './components/Navigation'
import Header from './components/Header'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Router>
  )
}

export default App
