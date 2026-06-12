import { defineStore } from 'pinia'
import api from '../api/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isStudent: (state) => state.user?.rol === 'student',
    isMentor: (state) => state.user?.rol === 'mentor',
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('/auth/login', { email, password })
        this.user = data.user
        localStorage.setItem('token', data.token)
        api.defaults.headers['Authorization'] = `Bearer ${data.token}`
      } catch (err) {
        this.error = err.response?.data?.error ?? err.message
        throw err
      } finally {
        this.loading = false
      }
    },

//TODO:agregar register

    logout() {
      this.user = null
      localStorage.removeItem('token')
      delete api.defaults.headers['Authorization']
    },

    async init() {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        const { data } = await api.get('/auth/me')
        this.user = data
      } catch {
        localStorage.removeItem('token')
        delete api.defaults.headers['Authorization']
      }
    }
  }
})
