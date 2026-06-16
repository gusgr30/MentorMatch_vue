import api from '../api/axios.js'

export const getSkills = () =>
  api.get('/config/skills')
