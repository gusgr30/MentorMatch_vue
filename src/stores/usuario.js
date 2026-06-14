import { defineStore } from 'pinia'
import { ROLES } from '../constants/index.js'
import api from '../api/axios.js'


export const useUsuarioStore = defineStore('auth', {
  state: () => ({
    user: null
  }),

  actions: {
    async getUsuario(id){
      try{
        const { data } = await api.get(`/usuarios/${id}`)
        this.user = data
      }catch(error){
        console.log(error)
      }
    }
  }
})
