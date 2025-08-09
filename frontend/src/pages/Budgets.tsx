import { FormEvent, useEffect, useState } from 'react'
import { Budget, api } from '../services/api'

export function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [form, setForm] = useState<Budget>({
    category: 'General',
    month: new Date().toISOString().slice(0,7),
    monthlyLimit: 500
  })

  const load = async () => {
    const res = await api.get<Budget[]>('/budgets')
    setBudgets(res.data)
  }
  useEffect(() => { load() }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    await api.post('/budgets', form)
    load()
  }

  return (
    <div className="panel">
      <h2>Budgets</h2>
      <form className="grid" onSubmit={submit}>
        <div>
          <label>Category</label>
          <input className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </div>
        <div>
          <label>Month</label>
          <input className="input" type="month" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} />
        </div>
        <div>
          <label>Monthly Limit</label>
          <input className="input" type="number" step="0.01" value={form.monthlyLimit} onChange={e => setForm({ ...form, monthlyLimit: parseFloat(e.target.value) })} />
        </div>
        <div style={{alignSelf:'end'}}>
          <button className="btn" type="submit">Save</button>
        </div>
      </form>

      <table className="table" style={{marginTop:16}}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Month</th>
            <th>Monthly Limit</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(b => (
            <tr key={b.id}>
              <td>{b.category}</td>
              <td className="muted">{b.month}</td>
              <td>{b.monthlyLimit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


