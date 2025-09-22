import React from 'react'

function DebtSummary({ transactions, hideDebt, onToggleHide }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const debtTransactions = transactions.filter(tx => tx.type === 'debt')

  if (hideDebt) {
    return (
      <div className="card pad">
        <div className="sect-title">
          <i className="fas fa-handshake"></i>
          Hutang
          <button
            className="eye-btn"
            onClick={onToggleHide}
            title="Tampilkan hutang"
          >
            <i className="fas fa-eye-slash"></i>
          </button>
        </div>
        <div className="center">
          <div className="muted">Hutang disembunyikan</div>
        </div>
      </div>
    )
  }

  const totalDebt = debtTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0)

  return (
    <div className="card pad">
      <div className="sect-title">
        <i className="fas fa-handshake"></i>
        Hutang
        <button
          className="eye-btn"
          onClick={onToggleHide}
          title="Sembunyikan hutang"
        >
          <i className="fas fa-eye"></i>
        </button>
      </div>

      <div className="debt-summary">
        <div>
          <div className="tag">
            <i className="fas fa-exclamation-triangle"></i>
            Total Hutang
          </div>
          <div className="debt-amount">
            {formatCurrency(totalDebt)}
          </div>
          <div className="subtext">
            {debtTransactions.length} hutang aktif
          </div>
        </div>
      </div>

      {debtTransactions.length > 0 && (
        <div id="debtList" style={{ marginTop: '12px' }}>
          {debtTransactions.slice(0, 3).map(tx => (
            <div key={tx.id} className="tx">
              <div className="tx-info">
                <div className="ico">
                  <i className="fas fa-handshake"></i>
                </div>
                <div>
                  <div className="tx-title">{tx.description || 'Hutang'}</div>
                  <div className="tx-meta">{tx.date || 'Tidak ada tanggal'}</div>
                </div>
              </div>
              <div className="tx-amount minus">
                {formatCurrency(tx.amount || 0)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DebtSummary
