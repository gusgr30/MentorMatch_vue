import api from '../api/axios.js'

export const generarDescripcion = ({ titulo, skills, experiencia }) =>
  api.post('/ia/generar-descripcion', { titulo, skills, experiencia })
