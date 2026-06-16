import { defineStore } from 'pinia'
import api from '../api/axios.js'

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [],
    loading: false,
  }),

  actions: {
    async cargarSkills() {
      if (this.skills.length) return
      this.loading = true
      try {
        const { data } = await api.get('/config/skills')
        this.skills = data
      } finally {
        this.loading = false
      }
    },
  },
})
