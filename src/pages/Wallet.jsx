import React, { useState, useEffect } from 'react'

function Wallet() {
  const [wallets, setWallets] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingWallet, setEditingWallet] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Bank',
    balance: 0,
    icon: 'fa-wallet'
  })

  useEffect(() => {
    const savedWallets = JSON.parse(localStorage.getItem('fin_wallets') || '[]')
    setWallets(savedWallets)
  }, [])

  const saveWallets = (newWallets) => {
    setWallets(newWallets)
    localStorage.setItem('fin_wallets', JSON.stringify(newWallets))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingWallet) {
      const updatedWallets = wallets.map(wallet =>
        wallet.id === editingWallet.id
          ? { ...wallet, ...formData }
          : wallet
      )
      saveWallets(updatedWallets)
      setEditingWallet(null)
    } else {
      const newWallet = {
        ...formData,
        id: Date.now().toString(),
        balance: parseFloat(formData.balance) || 0
      }
      saveWallets([...wallets, newWallet])
    }

    setFormData({ name: '', type: 'Bank', balance: 0, icon: 'fa-wallet' })
    setShowAddModal(false)
  }

  const handleEdit = (wallet) => {
    setEditingWallet(wallet)
    setFormData({
      name: wallet.name,
      type: wallet.type,
      balance: wallet.balance,
      icon: wallet.icon
    })
    setShowAddModal(true)
  }

  const handleDelete = (walletId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dompet ini?')) {
      const updatedWallets = wallets.filter(wallet => wallet.id !== walletId)
      saveWallets(updatedWallets)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div id="wallet" className="screen is-active">
      <div className="home-stack">
        <div className="card pad">
          <div className="sect-title">
            <i className="fas fa-wallet"></i>
            Kelola Dompet
          </div>

          <div id="walletList">
            {wallets.length === 0 ? (
              <div className="center">
                <div className="muted">Belum ada dompet</div>
                <button
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                  style={{ marginTop: '12px' }}
                >
                  <i className="fas fa-plus"></i>
                  Tambah Dompet
                </button>
              </div>
            ) : (
              <>
                {wallets.map(wallet => (
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
                      <button
                        className="btn-mini"
                        onClick={() => handleEdit(wallet)}
                        title="Edit dompet"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-del"
                        onClick={() => handleDelete(wallet.id)}
                        title="Hapus dompet"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="center" style={{ marginTop: '16px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => setShowAddModal(true)}
                  >
                    <i className="fas fa-plus"></i>
                    Tambah Dompet
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Wallet Modal */}
      {showAddModal && (
        <div className="modal show" id="modalWallet">
          <div className="modal-card">
            <div className="sect-title">
              <i className="fas fa-wallet"></i>
              {editingWallet ? 'Edit Dompet' : 'Tambah Dompet'}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  className="input"
                  placeholder="Nama dompet"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <select
                  className="select"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Bank">Bank</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="Cash">Cash</option>
                  <option value="Tabungan">Tabungan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="form-row">
                <input
                  type="number"
                  className="input"
                  placeholder="Saldo awal"
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-row">
                <select
                  className="select"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                >
                  <option value="fa-wallet">Wallet</option>
                  <option value="fa-credit-card">Credit Card</option>
                  <option value="fa-money-bill">Money</option>
                  <option value="fa-piggy-bank">Piggy Bank</option>
                  <option value="fa-university">Bank</option>
                </select>
              </div>

              <div className="form-row end-row">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingWallet(null)
                    setFormData({ name: '', type: 'Bank', balance: 0, icon: 'fa-wallet' })
                  }}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  {editingWallet ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wallet
