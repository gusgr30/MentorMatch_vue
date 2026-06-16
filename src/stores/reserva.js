import { defineStore } from 'pinia'
import { ESTADOS_RESERVA } from '../constants/index.js'
import {
  getReservasByUsuario,
  confirmarReserva as confirmarReservaService,
  cancelarReserva as cancelarReservaService,
  actualizarReserva as actualizarReservaService,
} from '../services/reservaService.js'


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
                const {data} = await getReservasByUsuario(id)
                console.log(data)
                this.reservas = data
            }catch(error){
                console.log(error)
            }
        },

        async confirmarReserva(id, urlZoom){
            try{
                const {data} = await confirmarReservaService(id, urlZoom)

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
                const {data} = await cancelarReservaService(id)
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
                const {data} = await actualizarReservaService(id, urlZoom)
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