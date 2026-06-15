<template>
  <div class="mb-4">
    <button @click="goToHome"
      class="flex items-center gap-2 text-[#4f39f6] font-semibold cursor-pointer transition-all duration-200 hover:opacity-80 hover:-translate-x-1">
      <MoveLeft :size="24" />
      <span>Volver</span>
    </button>
  </div>

  <div v-if="loading" class="flex justify-center mt-20">
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>

  <template v-else>
    <div v-if="mentor">
      <MentorCardDetail :mentor="mentor" @reservar="abrirModal" />
      <ModalReserva ref="modalReservaRef" :mentor="mentor" :slot="reservaSlot" @confirmar="onConfirmar" />
    </div>
    <div v-else class="text-center text-base-content/40 mt-20">
      <p class="text-lg font-semibold">No se encontró el mentor.</p>
    </div>
  </template>

</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MoveLeft } from '@lucide/vue'
import api from '../../api/axios.js'
import { useAuthStore } from '../../stores/auth.js'
import { slotAFechaISO } from '../../utils/fecha.js'
import { useToast } from '../../composables/useToast.js'
import MentorCardDetail from '../../components/MentorCardDetail.vue'
import ModalReserva from "../../components/ModalReserva.vue"

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { showToast } = useToast()

const modalReservaRef = useTemplateRef('modalReservaRef')
const reservaSlot = ref('')
const mentor = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get(`/usuarios/${route.params.id}`)
    mentor.value = data
  } catch {
    mentor.value = null
  } finally {
    loading.value = false
  }
})

const goToHome = () => {
  router.push({ name: 'home' })
}

const abrirModal = ({ slot }) => {
  reservaSlot.value = slot
  modalReservaRef.value?.open()
}

const onConfirmar = async ({ mentor: mentorData, slot }) => {
  try {
    modalReservaRef.value.setLoading(true)
    await api.post('/reservas', {
      studentId: authStore.user._id,
      mentorId: mentorData._id,
      fechaHora: slotAFechaISO(slot),
    })
    modalReservaRef.value.close()
    showToast('¡Reserva confirmada!', 'success')
    setTimeout(() => router.push({ name: 'misMentorias' }), 2500)
  } catch (err) {
    showToast(err.response?.data?.error ?? 'Error al crear la reserva', 'error')
  } finally {
    modalReservaRef.value.setLoading(false)
  }
}
</script>

