import { useEffect, useMemo, useState } from 'react'
import { Transaction, api } from '../services/api'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#5b8cff','#00c49f','#ffbb28','#ff8042','#a277ff','#ff6b6b','#4dd0e1']

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [insights, setInsights] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<Transaction[]>('/transactions').then(r => setTransactions(r.data))
  }, [])

  const expensesByCategory = useMemo(() => {
    const map: Record<string, number> = {}
    for (const t of transactions) {
      if (t.type === 'EXPENSE') {
        const amt = typeof t.amount === 'number' ? t.amount : Number(t.amount)
        map[t.category] = (map[t.category] || 0) + (Number.isFinite(amt) ? amt : 0)
      }
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const totalExpense = useMemo(() => transactions.filter(t => t.type==='EXPENSE').reduce((a,b)=>{
    const amt = typeof b.amount === 'number' ? b.amount : Number(b.amount)
    return a + (Number.isFinite(amt) ? amt : 0)
  },0), [transactions])
  const totalIncome = useMemo(() => transactions.filter(t => t.type==='INCOME').reduce((a,b)=>{
    const amt = typeof b.amount === 'number' ? b.amount : Number(b.amount)
    return a + (Number.isFinite(amt) ? amt : 0)
  },0), [transactions])

  const generateInsights = async () => {
    setError('')
    setInsights('')
    if (!transactions.length) {
      setError('Add some transactions first.')
      return
    }
    const normalized = transactions.map(t => ({
      ...t,
      amount: typeof t.amount === 'number' ? t.amount : Number(t.amount)
    }))
    if (normalized.some(t => !Number.isFinite(t.amount))) {
      setError('One or more transactions have invalid amount values.')
      return
    }
    const res = await api.post<{content: string}>('/ai/insights', normalized)
    setInsights(res.data.content)
  }

  return (
    <div className="grid">
      <div className="panel">
        <h2>Overview</h2>
        <div className="row">
          <div style={{flex:1}}>
            <div className="muted">Total Income</div>
            <div style={{fontSize:24}}>{totalIncome.toFixed(2)}</div>
          </div>
          <div style={{flex:1}}>
            <div className="muted">Total Expense</div>
            <div style={{fontSize:24}} className="danger">{totalExpense.toFixed(2)}</div>
          </div>
        </div>
        <div style={{height:280, marginTop:12}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={expensesByCategory} dataKey="value" nameKey="name" outerRadius={100} label>
                {expensesByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="panel">
        <h2>AI Insights</h2>
        <button className="btn" onClick={generateInsights}>Generate</button>
        {error && <div className="muted" style={{color:'#ff6b6b', marginTop:8}}>{error}</div>}
        <div className="input" style={{marginTop:8, minHeight:250, whiteSpace:'pre-wrap'}}>{insights || 'Click Generate to get insights.'}</div>
      </div>
    </div>
  )
}


