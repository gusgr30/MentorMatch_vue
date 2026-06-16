import { defineStore } from 'pinia'
import { ROLES } from '../constants/index.js'
import api from '../api/axios.js'
import { login as loginService, me } from '../services/authService.js'
import { crearUsuario } from '../services/usuarioService.js'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isStudent: (state) => state.user?.rol === ROLES.ESTUDIANTE,
    isMentor: (state) => state.user?.rol === ROLES.MENTOR,
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await loginService(email, password)
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

    async register(payload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await crearUsuario(payload)
        this.user = data.user
      }catch(err){
        this.error = err.response?.data?.error ?? err.message
        throw err
      }finally{
        this.loading = false
      }

    },

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
        const { data } = await me()
        this.user = data
      } catch {
        localStorage.removeItem('token')
        delete api.defaults.headers['Authorization']
      }
    }
  }
})
