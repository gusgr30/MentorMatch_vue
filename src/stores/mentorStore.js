import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mentors as mentorsImp } from '../mocks/mentors.js'
import { reservas as reservasImp } from '../mocks/reservas.js'
import { ESTADOS_RESERVA } from '../constants/index.js'

export const useMentorStore = defineStore('mentorStore', () => {
    const reservas = ref(reservasImp)
    const mentors = ref(mentorsImp)
    const currentRole = ref('student')
    const activeMentorId = ref('m1')
    const activeStudentId = ref('u1')

    const activeMentor = computed(() => mentors.value.find((m) => m.id === activeMentorId.value))

    function agregarReserva(nueva) {
        reservas.value.push(nueva)
    }

    return {
        reservas,
        mentors,
        activeMentor,
        currentRole,
        activeMentorId,
        activeStudentId,
        agregarReserva
    }
})
