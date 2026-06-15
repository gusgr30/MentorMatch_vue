<template>
  <ModalCommon
    ref="modalRef"
    title="Confirmar reserva"
    confirm-label="Confirmar"
    cancel-label="Cancelar"
    @confirmar="confirmar"
  >
    <div class="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
      <img
        :src="mentor?.fotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor?.nombre}`"
        class="w-12 h-12 rounded-xl border-2 border-white shadow"
        alt="Foto Perfil"
      />
      <div>
        <p class="font-bold text-base-content">{{ mentor?.nombre }}</p>
        <p class="text-sm text-primary font-semibold">{{ mentor?.mentorProfile?.titulo }}</p>
      </div>
    </div>

    <div class="p-4 border border-primary/30 bg-primary/5 rounded-xl flex flex-col">
      <div class="flex items-center gap-3">
        <CalendarClock :size="20" class="text-primary shrink-0" />
        <div>
          <p class="text-xs text-base-content/50 uppercase font-bold tracking-wider">Horario seleccionado</p>
          <p class="text-base font-semibold text-base-content capitalize">{{ formatearSlot(slot) }}</p>
        </div>
      </div>

      <div class="divider my-0"></div>

      <div class="flex items-center gap-3">
        <BadgeDollarSign :size="20" class="text-success shrink-0" />
        <div>
          <p class="text-xs text-base-content/50 uppercase font-bold tracking-wider">Tarifa</p>
          <p class="text-base font-semibold text-base-content">${{ mentor?.mentorProfile?.tarifa?.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <p class="text-sm text-base-content/40">Sesión de 1 hora vía Zoom.</p>
  </ModalCommon>
</template>

<script setup>
import { ref } from 'vue'
import { CalendarClock, BadgeDollarSign } from '@lucide/vue'
import ModalCommon from './ModalCommon.vue'
import { formatearSlot } from '../utils/fecha.js'

const props = defineProps({
  mentor: {
    type: Object,
    default: null,
  },
  slot: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['confirmar'])
const modalRef = ref(null)

const confirmar = () => {
  emit('confirmar', { mentor: props.mentor, slot: props.slot })
}

defineExpose({
  open: () => modalRef.value?.open(),
  close: () => modalRef.value?.close(),
  setLoading: (val) => modalRef.value?.setLoading(val),
})
</script>
