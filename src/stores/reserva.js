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
        }
    }

})