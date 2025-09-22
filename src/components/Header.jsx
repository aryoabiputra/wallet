import React, { useState, useEffect } from 'react'

function Header() {
  const [displayName, setDisplayName] = useState('User')

  useEffect(() => {
    const name = localStorage.getItem('fin_display_name') || 'User'
    setDisplayName(name)
  }, [])

  const initial = (displayName || 'U').trim().charAt(0).toUpperCase()

  return (
    <header className="appbar">
      <div className="appbar__inner">
        <div className="avatar">{initial}</div>
        <div className="hello">
          <small>Halo,</small>
          <b>{displayName}</b>
        </div>
      </div>
    </header>
  )
}

export default Header
