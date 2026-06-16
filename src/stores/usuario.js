import { defineStore } from 'pinia'
import { getUsuarioById, actualizarUsuario as actualizarUsuarioService } from '../services/usuarioService.js'


export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    user: null
  }),

  actions: {
    async getUsuario(id){
      try{
        const { data } = await getUsuarioById(id)
        this.user = data
      }catch(error){
        console.log(error)
      }
    },

    async actualizarUsuario(id, payload){
      try{
        const { data } = await actualizarUsuarioService(id, payload)
        this.user = data
      }catch(error){
        console.log(error)
      }
    }
  }
})
