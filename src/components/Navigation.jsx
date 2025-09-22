import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation({ activeTab, setActiveTab }) {
  const location = useLocation()

  const tabs = [
    { id: 'home', label: 'Home', icon: 'fa-home' },
    { id: 'wallet', label: 'Wallet', icon: 'fa-wallet' },
    { id: 'stats', label: 'Stats', icon: 'fa-chart-bar' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ]

  return (
    <nav className="bottomnav">
      {tabs.map(tab => (
        <Link
          key={tab.id}
          to={`/${tab.id}`}
          className={`navbtn ${location.pathname === `/${tab.id}` ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <i className={`fas ${tab.icon}`}></i>
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
