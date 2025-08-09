import { useEffect, useState } from 'react'
import { Transaction, api } from '../services/api'

export function AiCoach() {
  const [question, setQuestion] = useState('How can I reduce my food delivery spending?')
  const [answer, setAnswer] = useState('')
  const [recent, setRecent] = useState<Transaction[]>([])

  useEffect(() => {
    api.get<Transaction[]>('/transactions').then(r => setRecent(r.data.slice(-10)))
  }, [])

  const ask = async () => {
    setAnswer('')
    const res = await api.post<{content: string}>('/ai/coach', { question, recent })
    setAnswer(res.data.content)
  }

  return (
    <div className="panel">
      <h2>AI Coach</h2>
      <div className="grid">
        <div>
          <label>Your Question</label>
          <textarea className="input" rows={4} value={question} onChange={e => setQuestion(e.target.value)} />
          <div style={{marginTop:8}}>
            <button className="btn" onClick={ask}>Ask</button>
          </div>
        </div>
        <div>
          <label>Answer</label>
          <div className="input" style={{minHeight:120, whiteSpace:'pre-wrap'}}>{answer || '—'}</div>
        </div>
      </div>
    </div>
  )
}


