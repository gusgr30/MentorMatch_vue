import { DateTime } from 'luxon'

export function formatearFecha(fechaISO) {
  if (!fechaISO) return '-'
  return DateTime.fromISO(fechaISO)
    .setZone('America/Argentina/Buenos_Aires')
    .toFormat("cccc d 'de' LLLL, HH:mm 'hs'", { locale: 'es' })
}

const DIAS = { lunes: 1, martes: 2, miercoles: 3, miércoles: 3, jueves: 4, viernes: 5, sabado: 6, sábado: 6, domingo: 7 }

export function slotAFechaISO(slot) {
  const partes = slot.split(' ')
  if (partes.length < 2) return null
  const [dia, hora] = partes
  const [hh, mm] = hora.split(':').map(Number)
  const hoy = DateTime.now()
  const diaObjetivo = DIAS[dia.toLowerCase()]
  let fecha = hoy.set({ weekday: diaObjetivo, hour: hh, minute: mm, second: 0, millisecond: 0 })
  if (fecha <= hoy) fecha = fecha.plus({ weeks: 1 })
  return fecha.toISO()
}

export function ordenarSlots(slots) {
  return [...slots].sort((a, b) => {
    const isoA = slotAFechaISO(a)
    const isoB = slotAFechaISO(b)
    if (!isoA) return 1
    if (!isoB) return -1
    return isoA < isoB ? -1 : 1
  })
}

export function formatearSlot(slot) {
  if (!slot) return '-'
  const iso = slotAFechaISO(slot)
  return iso ? formatearFecha(iso) : slot
}
