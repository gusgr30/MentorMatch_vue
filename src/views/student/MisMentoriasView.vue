<template>
    <div>
        <header class="mb-10 text-center md:text-left">
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
                Mis mentorías reservadas
            </h1>
            <h4>Seguimiento de tus solicitudes y estado de confirmación.</h4>
        </header>

        <div v-if="loading" class="flex justify-center mt-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <template v-else>
            <div v-if="reservas.length" class="flex flex-col gap-3">
                <ReservaCard v-for="reserva in reservas" :key="reserva._id" :reserva="reserva" :nombre="reserva.mentor?.nombre" :foto-url="reserva.mentor?.fotoUrl"
                    @cancelar="abrirModalCancel" />
            </div>

            <div v-else class="text-center text-base-content/40 mt-20">
                <p class="text-lg font-semibold">No tenés mentorías reservadas aún.</p>
            </div>
        </template>

        <ModalCancel ref="modalCancelRef" :reserva="reservaSeleccionada" @confirmar="onConfirmarCancel" />
    </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import ReservaCard from '../../components/ReservaCard.vue'
import ModalCancel from '../../components/ModalCancel.vue'
import api from '../../api/axios.js'
import { useAuthStore } from '../../stores/auth.js'
import { useToast } from '../../composables/useToast.js'

const authStore = useAuthStore()
const { showToast } = useToast()
const reservas = ref([])
const loading = ref(true)
const reservaSeleccionada = ref(null)
const modalCancelRef = useTemplateRef('modalCancelRef')

//REVISAR SI NO CONVIENE USAR EL STORE DE RESERVA, LLAMANDO A LA FUNCION getReservas(id)

const cargarReservas = async () => {
  const { data } = await api.get(`/reservas/usuario/${authStore.user._id}`)
  reservas.value = data.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
}

onMounted(async () => {
  try {
    await cargarReservas()
  } finally {
    loading.value = false
  }
})

const abrirModalCancel = (reserva) => {
    reservaSeleccionada.value = reserva
    modalCancelRef.value?.open()
}

const onConfirmarCancel = async (reserva) => {
  try {
    modalCancelRef.value.setLoading(true)
    await api.put(`/reservas/${reserva._id}/cancelar`)
    modalCancelRef.value.close()
    showToast('Reserva cancelada correctamente', 'success')
    await cargarReservas()
  } catch (err) {
    showToast(err.response?.data?.error ?? 'Error al cancelar la reserva', 'error')
  } finally {
    modalCancelRef.value.setLoading(false)
  }
}
</script>
