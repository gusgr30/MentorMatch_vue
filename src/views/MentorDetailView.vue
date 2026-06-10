<template>
  <div class="mb-4">
    <button @click="goToHome"
      class="flex items-center gap-2 text-[#4f39f6] font-semibold cursor-pointer transition-all duration-200 hover:opacity-80 hover:-translate-x-1">
      <MoveLeft :size="24" />
      <span>Volver</span>
    </button>
  </div>

  <div v-if="mentor">
    <MentorCardDetail :mentor="mentor" @reservar="abrirModal" />
    <ModalReserva ref="modalReservaRef" :mentor="mentor" :slot="reservaSlot" @confirmar="onConfirmar" />
  </div>

  <div v-else>Mentor no encontrado.</div>
</template>

<script setup>
import { ref, computed, useTemplateRef } from 'vue'
// La ventaja de useTemplateRef es que el nombre del ref en el template está explícito como string, dejando más claro que es una referencia al DOM/componente y no un simple estado reactivo.
import { useRouter, useRoute } from 'vue-router'
import { MoveLeft } from '@lucide/vue'
import { mentors } from '../mocks/mentors.js'
import MentorCardDetail from '../components/MentorCardDetail.vue'
import ModalReserva from '../components/ModalReserva.vue'

const router = useRouter()
const route = useRoute()

const mentor = computed(() => mentors.find((m) => m.id === route.params.id))
const modalReservaRef = useTemplateRef('modalReservaRef')
const reservaSlot = ref('')

const goToHome = () => {
  router.push({ name: 'home' })
}

const abrirModal = ({ slot }) => {
  reservaSlot.value = slot
  modalReservaRef.value?.open()
}

const onConfirmar = ({ mentor, slot }) => {
  console.log('Reserva confirmada:', { mentor, slot })
  // acá va el POST al backend
   modalReservaRef.value.close()
}
</script>
