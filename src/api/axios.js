import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BACK,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
  },
})

export default api
