import React from 'react'

function TransactionHistory({ transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    })
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, tx) => {
    const date = tx.date ? formatDate(tx.date) : 'Tidak ada tanggal'
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(tx)
    return groups
  }, {})

  // Sort dates (most recent first)
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    if (a === 'Tidak ada tanggal') return 1
    if (b === 'Tidak ada tanggal') return -1
    return new Date(b) - new Date(a)
  })

  return (
    <div className="card pad">
      <div className="sect-title">
        <i className="fas fa-history"></i>
        Riwayat Transaksi
      </div>

      <div id="recentTx">
        {transactions.length === 0 ? (
          <div className="center">
            <div className="muted">Belum ada transaksi</div>
          </div>
        ) : (
          sortedDates.map(date => (
            <div key={date} className="tx-day">
              <div className="tx-date">{date}</div>
              {groupedTransactions[date].map(tx => (
                <div key={tx.id} className="tx">
                  <div className="tx-info">
                    <div className="ico">
                      <i className={`fas ${tx.type === 'income' ? 'fa-arrow-up' : tx.type === 'expense' ? 'fa-arrow-down' : 'fa-handshake'}`}></i>
                    </div>
                    <div>
                      <div className="tx-title">{tx.description || 'Transaksi'}</div>
                      <div className="tx-meta">
                        {tx.category || 'Tanpa kategori'} • {tx.wallet || 'Dompet'}
                      </div>
                    </div>
                  </div>
                  <div className={`tx-amount ${tx.type === 'income' ? 'plus' : tx.type === 'expense' ? 'minus' : 'minus'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount || 0)}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TransactionHistory
