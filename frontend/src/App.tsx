import { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Transactions } from './pages/Transactions'
import { Budgets } from './pages/Budgets'
import { AiCoach } from './pages/AiCoach'
import { Dashboard } from './pages/Dashboard'

type Tab = 'dashboard' | 'transactions' | 'budgets' | 'coach'

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard')

  return (
    <div className="app">
      <header className="header">
        <h1>AI Finance Tracker</h1>
        <nav>
          <button className={tab==='dashboard'? 'active':''} onClick={() => setTab('dashboard')}>Dashboard</button>
          <button className={tab==='transactions'? 'active':''} onClick={() => setTab('transactions')}>Transactions</button>
          <button className={tab==='budgets'? 'active':''} onClick={() => setTab('budgets')}>Budgets</button>
          <button className={tab==='coach'? 'active':''} onClick={() => setTab('coach')}>AI Coach</button>
        </nav>
      </header>
      <main className="content">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'transactions' && <Transactions />}
        {tab === 'budgets' && <Budgets />}
        {tab === 'coach' && <AiCoach />}
      </main>
    </div>
  )
}


