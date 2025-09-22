import React from 'react'

function WalletList({ wallets, hideWallets, onToggleHide }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (hideWallets) {
    return (
      <div className="card pad">
        <div className="sect-title">
          <i className="fas fa-wallet"></i>
          Dompet
          <button
            className="eye-btn"
            onClick={onToggleHide}
            title="Tampilkan dompet"
          >
            <i className="fas fa-eye-slash"></i>
          </button>
        </div>
        <div className="center">
          <div className="muted">Dompet disembunyikan</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card pad">
      <div className="sect-title">
        <i className="fas fa-wallet"></i>
        Dompet
        <button
          className="eye-btn"
          onClick={onToggleHide}
          title="Sembunyikan dompet"
        >
          <i className="fas fa-eye"></i>
        </button>
      </div>

      <div id="walletList">
        {wallets.length === 0 ? (
          <div className="center">
            <div className="muted">Belum ada dompet</div>
          </div>
        ) : (
          wallets.map(wallet => (
            <div key={wallet.id} className="wallet-item">
              <div className="wallet-left">
                <div className="wallet-icon">
                  <i className={`fas ${wallet.icon || 'fa-wallet'}`}></i>
                </div>
                <div className="wallet-meta">
                  <b>{wallet.name}</b>
                  <small>{wallet.type || 'Dompet'}</small>
                </div>
              </div>
              <div className="wallet-actions">
                <div className="pill">
                  {formatCurrency(wallet.balance || 0)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default WalletList
