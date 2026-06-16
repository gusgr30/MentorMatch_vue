export const resolverFoto = (fotoUrl, seed) => {
  if (!fotoUrl) return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
  if (fotoUrl.startsWith('http')) return fotoUrl
  return `${import.meta.env.VITE_API_URL_BACK?.replace('/api', '')}${fotoUrl}`
}

export const obtenerIniciales = (nombre) =>{
    if (!nombre) return '?'

    return nombre
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const setFecha = (fecha) =>{
    const date = new Date(fecha)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: 'UTC'
    }

    return date.toLocaleDateString('es-AR', options)
}