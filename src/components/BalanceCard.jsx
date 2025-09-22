import React from 'react'

function BalanceCard({ total, hideTotal, onToggleHide, walletCount = 0 }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="card balance-card">
      <div className="balance-row">
        <div>
          <div className="tag">
            <i className="fas fa-chart-line"></i>
            Total Saldo
          </div>
          <div className="balance-amount">
            {hideTotal ? '•••••' : formatCurrency(total)}
          </div>
          <div className="subtext">
            Ringkasan dari {walletCount} dompet aktif
          </div>
        </div>
        <button
          className="eye-btn eye-btn-lg"
          onClick={onToggleHide}
          title={hideTotal ? 'Tampilkan saldo' : 'Sembunyikan saldo'}
        >
          <i className={`fas ${hideTotal ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
      </div>
    </div>
  )
}

export default BalanceCard
