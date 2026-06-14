import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ESTADOS_RESERVA, ROLES } from '../constants/index.js'
import api from '../api/axios.js'


export const useReservaStore = defineStore('reserva', {
    state:() =>({
        reservas: []
    }),

    getters: {
        cantidadPendientes: (state) =>{
            return state.reservas.filter(r => r.estado === ESTADOS_RESERVA.PENDIENTE).length
        },
        cantidadConfirmadas: (state) => {
            return state.reservas.filter(r => r.estado === ESTADOS_RESERVA.CONFIRMADA).length
        }
    },
    actions: {
        async getReservas(id) {
            try{
                const {data} = await api.get(`/reservas/usuario/${id}`)
                console.log(data)
                this.reservas = data
            }catch(error){
                console.log(error)
            }
        },

        async confirmarReserva(id, urlZoom){
            try{
                const {data} = await api.put(`/reservas/${id}/confirmar`, {urlZoom})

                const index = this.reservas.findIndex(r => r._id === id)
                
                if(index !== -1){
                    this.reservas[index].estado = ESTADOS_RESERVA.CONFIRMADA
                    this.reservas[index].urlZoom = urlZoom
                    
                    this.reservas = [...this.reservas]
                }
            }catch(error){
                console.log(error)
            }
        },
        
        async cancelarReserva(id){
            try{
                const {data} = await api.put(`/reservas/${id}/cancelar`)
                const index = this.reservas.findIndex(r => r._id === id)
                if(index !== -1){
                    this.reservas[index].estado = ESTADOS_RESERVA.CANCELADA
                    this.reservas = [...this.reservas]
                }
            }catch(error){
                console.log(error)
            }
        },
        async actualizarReserva(id, urlZoom){
            try{
                const {data} = await api.put(`/reservas/${id}/`, {urlZoom})
                const index = this.reservas.findIndex(r => r._id === id)
                if(index !== -1){
                    this.reservas[index].urlZoom = urlZoom
                    this.reservas = [...this.reservas]
                }
            }catch(error){
                console.log(error)
            }
        }
    }

})