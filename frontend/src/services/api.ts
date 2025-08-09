import axios from 'axios'

export const api = axios.create({
  baseURL: '/api'
})

export type Transaction = {
  id?: string
  date: string
  description: string
  category: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
}

export type Budget = {
  id?: string
  category: string
  month: string // YYYY-MM
  monthlyLimit: number
}


