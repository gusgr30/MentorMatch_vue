import api from '../api/axios.js'

export const getReservasByUsuario = (userId) =>
  api.get(`/reservas/usuario/${userId}`)

export const crearReserva = (payload) =>
  api.post('/reservas', payload)

export const confirmarReserva = (id, urlZoom) =>
  api.put(`/reservas/${id}/confirmar`, { urlZoom })

export const cancelarReserva = (id) =>
  api.put(`/reservas/${id}/cancelar`)

export const actualizarReserva = (id, urlZoom) =>
  api.put(`/reservas/${id}/`, { urlZoom })
