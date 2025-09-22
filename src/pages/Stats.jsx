import React, { useState, useEffect } from 'react'

function Stats() {
  const [transactions, setTransactions] = useState([])
  const [wallets, setWallets] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedWallet, setSelectedWallet] = useState('all')

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('fin_transactions') || '[]')
    const savedWallets = JSON.parse(localStorage.getItem('fin_wallets') || '[]')
    setTransactions(savedTransactions)
    setWallets(savedWallets)
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getFilteredTransactions = () => {
    let filtered = transactions

    // Filter by wallet
    if (selectedWallet !== 'all') {
      filtered = filtered.filter(tx => tx.wallet === selectedWallet)
    }

    // Filter by period
    const now = new Date()
    const monthsBack = selectedPeriod === '6months' ? 6 : 12
    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, now.getDate())

    filtered = filtered.filter(tx => {
      if (!tx.date) return false
      return new Date(tx.date) >= cutoffDate
    })

    return filtered
  }

  const getCategoryData = () => {
    const filtered = getFilteredTransactions()
    const categories = {}

    filtered.forEach(tx => {
      if (tx.type === 'expense' && tx.category) {
        categories[tx.category] = (categories[tx.category] || 0) + (tx.amount || 0)
      }
    })

    return Object.entries(categories)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8)
  }

  const getMonthlyData = () => {
    const filtered = getFilteredTransactions()
    const monthly = {}

    filtered.forEach(tx => {
      if (!tx.date) return

      const date = new Date(tx.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      if (!monthly[monthKey]) {
        monthly[monthKey] = { income: 0, expense: 0 }
      }

      if (tx.type === 'income') {
        monthly[monthKey].income += (tx.amount || 0)
      } else if (tx.type === 'expense') {
        monthly[monthKey].expense += (tx.amount || 0)
      }
    })

    return Object.entries(monthly)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6) // Last 6 months
  }

  const categoryData = getCategoryData()
  const monthlyData = getMonthlyData()
  const totalIncome = monthlyData.reduce((sum, [, data]) => sum + data.income, 0)
  const totalExpense = monthlyData.reduce((sum, [, data]) => sum + data.expense, 0)

  return (
    <div id="stats" className="screen is-active">
      <div className="home-stack">
        {/* Filters */}
        <div className="card pad">
          <div className="sect-title">
            <i className="fas fa-filter"></i>
            Filter
          </div>

          <div className="controls">
            <select
              className="select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="6months">6 Bulan Terakhir</option>
              <option value="12months">12 Bulan Terakhir</option>
            </select>

            <select
              className="select"
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
            >
              <option value="all">Semua Dompet</option>
              {wallets.map(wallet => (
                <option key={wallet.id} value={wallet.name}>
                  {wallet.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="card pad">
          <div className="sect-title">
            <i className="fas fa-chart-line"></i>
            Ringkasan
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="balance-card" style={{ padding: '12px' }}>
              <div className="tag" style={{ color: '#22c55e' }}>
                <i className="fas fa-arrow-up"></i>
                Pemasukan
              </div>
              <div className="balance-amount" style={{ fontSize: '18px', color: '#22c55e' }}>
                {formatCurrency(totalIncome)}
              </div>
            </div>

            <div className="balance-card" style={{ padding: '12px' }}>
              <div className="tag" style={{ color: '#ef4444' }}>
                <i className="fas fa-arrow-down"></i>
                Pengeluaran
              </div>
              <div className="balance-amount" style={{ fontSize: '18px', color: '#ef4444' }}>
                {formatCurrency(totalExpense)}
              </div>
            </div>
          </div>
        </div>

        {/* Category Chart */}
        {categoryData.length > 0 && (
          <div className="card pad">
            <div className="sect-title">
              <i className="fas fa-chart-pie"></i>
              Kategori Pengeluaran
            </div>

            <div className="chart-card">
              <div className="donut" style={{
                background: `conic-gradient(${categoryData.map((cat, i) => {
                  const hue = (i * 360) / categoryData.length
                  return `${categoryData.slice(0, i).reduce((sum, c) => sum + c.amount, 0) * 360 / totalExpense}deg ${hue}deg, hsl(${hue}, 70%, 50%)`
                }).join(', ')}, #2a2f3b 0deg 360deg)`
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'var(--card)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {categoryData.length} Kategori
                  </div>
                </div>
              </div>

              <div className="legend">
                {categoryData.map((cat, i) => (
                  <div key={cat.name} className="lg">
                    <div className="left">
                      <div
                        className="dot"
                        style={{
                          backgroundColor: `hsl(${(i * 360) / categoryData.length}, 70%, 50%)`
                        }}
                      ></div>
                      <span>{cat.name}</span>
                    </div>
                    <span className="muted">{formatCurrency(cat.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monthly Chart */}
        {monthlyData.length > 0 && (
          <div className="card pad">
            <div className="sect-title">
              <i className="fas fa-chart-bar"></i>
              Tren Bulanan
            </div>

            <div className="bars">
              {monthlyData.map(([month, data]) => (
                <div key={month} className="bar">
                  <div className="cols">
                    <div
                      className="col in"
                      style={{ height: `${Math.max((data.income / Math.max(...monthlyData.map(([, d]) => d.income))) * 180, 4)}px` }}
                    ></div>
                    <div
                      className="col out"
                      style={{ height: `${Math.max((data.expense / Math.max(...monthlyData.map(([, d]) => d.expense))) * 180, 4)}px` }}
                    ></div>
                  </div>
                  <label>{month.split('-')[1]}</label>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', background: '#34d399', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Pemasukan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Pengeluaran</span>
              </div>
            </div>
          </div>
        )}

        {transactions.length === 0 && (
          <div className="card pad">
            <div className="center">
              <div className="muted">Belum ada data untuk ditampilkan</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stats
