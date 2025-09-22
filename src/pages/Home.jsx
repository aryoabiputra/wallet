import React, { useState, useEffect } from 'react'
import BalanceCard from '../components/BalanceCard'
import WalletList from '../components/WalletList'
import DebtSummary from '../components/DebtSummary'
import TransactionHistory from '../components/TransactionHistory'

function Home() {
  const [wallets, setWallets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [hideTotal, setHideTotal] = useState(false)
  const [hideWallets, setHideWallets] = useState(false)
  const [hideDebt, setHideDebt] = useState(false)

  useEffect(() => {
    // Load data from localStorage
    const savedWallets = JSON.parse(localStorage.getItem('fin_wallets') || '[]')
    const savedTransactions = JSON.parse(localStorage.getItem('fin_transactions') || '[]')
    const savedHideTotal = localStorage.getItem('fin_hide_total') === '1'
    const savedHideWallets = localStorage.getItem('fin_hide_wallets') === '1'
    const savedHideDebt = localStorage.getItem('fin_hide_debt') === '1'

    setWallets(savedWallets)
    setTransactions(savedTransactions)
    setHideTotal(savedHideTotal)
    setHideWallets(savedHideWallets)
    setHideDebt(savedHideDebt)
  }, [])

  const totalBalance = wallets.reduce((sum, wallet) => sum + (wallet.balance || 0), 0)

  return (
    <div id="home" className="screen is-active">
      <div className="home-stack">
        <BalanceCard
          total={totalBalance}
          hideTotal={hideTotal}
          walletCount={wallets.length}
          onToggleHide={() => {
            const newHideTotal = !hideTotal
            setHideTotal(newHideTotal)
            localStorage.setItem('fin_hide_total', newHideTotal ? '1' : '0')
          }}
        />

        <WalletList
          wallets={wallets}
          hideWallets={hideWallets}
          onToggleHide={() => {
            const newHideWallets = !hideWallets
            setHideWallets(newHideWallets)
            localStorage.setItem('fin_hide_wallets', newHideWallets ? '1' : '0')
          }}
        />

        <DebtSummary
          transactions={transactions}
          hideDebt={hideDebt}
          onToggleHide={() => {
            const newHideDebt = !hideDebt
            setHideDebt(newHideDebt)
            localStorage.setItem('fin_hide_debt', newHideDebt ? '1' : '0')
          }}
        />

        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  )
}

export default Home
