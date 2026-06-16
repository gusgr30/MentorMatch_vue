import api from '../api/axios.js'

export const getMentores = () =>
  api.get('/usuarios', { params: { rol: 'mentor' } })

export const getUsuarioById = (id) =>
  api.get(`/usuarios/${id}`)

export const crearUsuario = (payload) =>
  api.post('/usuarios/', payload)

export const actualizarUsuario = (id, payload) =>
  api.put(`/usuarios/${id}`, payload)
