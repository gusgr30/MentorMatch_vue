import api from '../api/axios.js'

export const getMentores = () =>
  api.get('/usuarios', { params: { rol: 'mentor' } })

export const getUsuarioById = (id) =>
  api.get(`/usuarios/${id}`)

export const crearUsuario = (formData) =>
  api.post('/usuarios/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const actualizarUsuario = (id, formData) =>
  api.put(`/usuarios/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
