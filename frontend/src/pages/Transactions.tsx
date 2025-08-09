import { FormEvent, useEffect, useState } from 'react'
import { Transaction, api } from '../services/api'

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [form, setForm] = useState<Transaction>({
    date: new Date().toISOString().slice(0,10),
    description: '',
    category: 'General',
    amount: 0,
    type: 'EXPENSE'
  })

  const load = async () => {
    const res = await api.get<Transaction[]>('/transactions')
    setTransactions(res.data)
  }
  useEffect(() => { load() }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    await api.post('/transactions', form)
    setForm({ ...form, description: '', amount: 0 })
    load()
  }

  const remove = async (id?: string) => {
    if (!id) return
    await api.delete(`/transactions/${id}`)
    load()
  }

  return (
    <div className="panel">
      <h2>Transactions</h2>
      <form className="grid" onSubmit={submit}>
        <div>
          <label>Date</label>
          <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div>
          <label>Description</label>
          <input className="input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label>Category</label>
          <input className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </div>
        <div>
          <label>Amount</label>
          <input className="input" type="number" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })} />
        </div>
        <div>
          <label>Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Transaction['type'] })}>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>
        <div style={{alignSelf:'end'}}>
          <button className="btn" type="submit">Add</button>
        </div>
      </form>

      <table className="table" style={{marginTop:16}}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td className="muted">{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td><span className={`pill ${t.type === 'INCOME' ? 'income' : 'expense'}`}>{t.type}</span></td>
              <td>{t.amount.toFixed(2)}</td>
              <td><button className="btn secondary" onClick={() => remove(t.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


