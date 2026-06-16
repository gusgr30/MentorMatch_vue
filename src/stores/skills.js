import { defineStore } from 'pinia'
import { getSkills } from '../services/configService.js'

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
        const { data } = await getSkills()
        this.skills = data
      } finally {
        this.loading = false
      }
    },
  },
})
