<template>
  <ModalCommon
    ref="modalRef"
    title="¿Desea cancelar esta reserva?"
    confirm-label="Aceptar"
    cancel-label="Cancelar"
    @confirmar="confirmar"
  >
    <div class="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
      <div>
        <p class="font-bold text-base-content">{{ rol === 'mentor' ? reserva.student?.nombre : reserva?.mentor?.nombre }}</p>
        <p class="text-primary text-sm font-semibold flex items-center gap-1">
          <CalendarClock :size="14" />
          {{ fechaFormateada }}
        </p>
      </div>
    </div>

    <p class="text-sm text-base-content/60">Esta acción no se puede deshacer.</p>
  </ModalCommon>
</template>

<script setup>
import { computed, ref } from 'vue'
import { CalendarClock } from '@lucide/vue'
import ModalCommon from './ModalCommon.vue'
import { formatearFecha } from '../utils/fecha.js'

const props = defineProps({
  reserva: {
    type: Object,
    default: null,
  },
  rol: {
    type: String,
    default: 'student',
    validator: (val) => ['student', 'mentor'].includes(val),
  },
})

const emit = defineEmits(['confirmar'])
const modalRef = ref(null)

const confirmar = () => {
  emit('confirmar', props.reserva)
}

const fechaFormateada = computed(() => formatearFecha(props.reserva?.fechaHora))

defineExpose({
  open: () => modalRef.value?.open(),
  close: () => modalRef.value?.close(),
  setLoading: (val) => modalRef.value?.setLoading(val),
})
</script>
