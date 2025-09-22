import React, { useState, useEffect } from 'react'

function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [categories, setCategories] = useState({ income: [], expense: [] })
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    type: 'expense',
    icon: 'fa-tag'
  })
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    const name = localStorage.getItem('fin_display_name') || 'User'
    setDisplayName(name)

    const savedCategories = JSON.parse(localStorage.getItem('fin_categories') || '{"income": [], "expense": []}')
    setCategories(savedCategories)
  }, [])

  const handleNameChange = (e) => {
    e.preventDefault()
    localStorage.setItem('fin_display_name', displayName)
    alert('Nama berhasil diubah!')
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()

    const newCategories = { ...categories }

    if (editingCategory) {
      const index = newCategories[categoryForm.type].findIndex(cat => cat.id === editingCategory.id)
      if (index !== -1) {
        newCategories[categoryForm.type][index] = {
          ...editingCategory,
          ...categoryForm
        }
      }
      setEditingCategory(null)
    } else {
      const newCategory = {
        ...categoryForm,
        id: Date.now().toString()
      }
      newCategories[categoryForm.type].push(newCategory)
    }

    setCategories(newCategories)
    localStorage.setItem('fin_categories', JSON.stringify(newCategories))
    setCategoryForm({ name: '', type: 'expense', icon: 'fa-tag' })
    setShowCategoryModal(false)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setCategoryForm({
      name: category.name,
      type: category.type,
      icon: category.icon
    })
    setShowCategoryModal(true)
  }

  const handleDeleteCategory = (categoryId, type) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      const newCategories = { ...categories }
      newCategories[type] = newCategories[type].filter(cat => cat.id !== categoryId)
      setCategories(newCategories)
      localStorage.setItem('fin_categories', JSON.stringify(newCategories))
    }
  }

  const exportData = () => {
    const data = {
      wallets: JSON.parse(localStorage.getItem('fin_wallets') || '[]'),
      transactions: JSON.parse(localStorage.getItem('fin_transactions') || '[]'),
      categories: categories,
      settings: {
        displayName: displayName,
        exportDate: new Date().toISOString()
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `finnote-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert('Data berhasil diekspor!')
  }

  const importData = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)

        if (data.wallets) localStorage.setItem('fin_wallets', JSON.stringify(data.wallets))
        if (data.transactions) localStorage.setItem('fin_transactions', JSON.stringify(data.transactions))
        if (data.categories) localStorage.setItem('fin_categories', JSON.stringify(data.categories))

        alert('Data berhasil diimpor!')
        window.location.reload()
      } catch (error) {
        alert('Gagal mengimpor data. Pastikan file valid.')
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.removeItem('fin_wallets')
      localStorage.removeItem('fin_transactions')
      localStorage.removeItem('fin_categories')
      localStorage.removeItem('fin_display_name')
      localStorage.removeItem('fin_hide_total')
      localStorage.removeItem('fin_hide_wallets')
      localStorage.removeItem('fin_hide_debt')

      alert('Semua data telah dihapus!')
      window.location.reload()
    }
  }

  return (
    <div id="settings" className="screen is-active">
      <div className="home-stack">
        {/* Profile Settings */}
        <div className="card pad">
          <div className="sect-title">
            <i className="fas fa-user"></i>
            Profil
          </div>

          <form onSubmit={handleNameChange}>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Nama tampilan"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-row end-row">
              <button type="submit" className="btn-primary">
                <i className="fas fa-save"></i>
                Simpan
              </button>
            </div>
          </form>
        </div>

        {/* Category Management */}
        <div className="card pad">
          <div className="sect-title">
            <i className="fas fa-tags"></i>
            Kategori Transaksi
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <h4 style={{ margin: '0 0 8px', color: '#22c55e' }}>Pemasukan</h4>
              {categories.income.map(cat => (
                <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span>{cat.name}</span>
                  <div>
                    <button
                      className="btn-mini"
                      onClick={() => handleEditCategory(cat)}
                      style={{ marginRight: '4px' }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-del"
                      onClick={() => handleDeleteCategory(cat.id, 'income')}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ margin: '0 0 8px', color: '#ef4444' }}>Pengeluaran</h4>
              {categories.expense.map(cat => (
                <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span>{cat.name}</span>
                  <div>
                    <button
                      className="btn-mini"
                      onClick={() => handleEditCategory(cat)}
                      style={{ marginRight: '4px' }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn-del"
                      onClick={() => handleDeleteCategory(cat.id, 'expense')}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="center">
            <button
              className="btn-primary"
              onClick={() => setShowCategoryModal(true)}
            >
              <i className="fas fa-plus"></i>
              Tambah Kategori
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="card pad">
          <div className="sect-title">
            <i className="fas fa-database"></i>
            Kelola Data
          </div>

          <div className="settings-actions">
            <button className="btn-ghost btn-success" onClick={exportData}>
              <i className="fas fa-download"></i>
              Export Data
            </button>

            <label className="btn-ghost">
              <i className="fas fa-upload"></i>
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{ display: 'none' }}
              />
            </label>

            <button className="btn-ghost btn-danger" onClick={clearAllData}>
              <i className="fas fa-trash"></i>
              Hapus Semua Data
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="card pad">
          <div className="center">
            <div className="app-version">
              FinNote v1.0.0
              <br />
              Aplikasi Pencatat Keuangan Pribadi
            </div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="modal show">
          <div className="modal-card">
            <div className="sect-title">
              <i className="fas fa-tags"></i>
              {editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}
            </div>

            <form onSubmit={handleCategorySubmit}>
              <div className="form-row">
                <input
                  type="text"
                  className="input"
                  placeholder="Nama kategori"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <select
                  className="select"
                  value={categoryForm.type}
                  onChange={(e) => setCategoryForm({...categoryForm, type: e.target.value})}
                >
                  <option value="income">Pemasukan</option>
                  <option value="expense">Pengeluaran</option>
                </select>
              </div>

              <div className="form-row">
                <select
                  className="select"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                >
                  <option value="fa-tag">Tag</option>
                  <option value="fa-shopping-cart">Shopping</option>
                  <option value="fa-utensils">Food</option>
                  <option value="fa-car">Transport</option>
                  <option value="fa-home">Home</option>
                  <option value="fa-heart">Health</option>
                  <option value="fa-graduation-cap">Education</option>
                  <option value="fa-briefcase">Work</option>
                </select>
              </div>

              <div className="form-row end-row">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowCategoryModal(false)
                    setEditingCategory(null)
                    setCategoryForm({ name: '', type: 'expense', icon: 'fa-tag' })
                  }}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
