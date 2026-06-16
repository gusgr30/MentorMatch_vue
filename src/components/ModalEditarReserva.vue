<template>
  <ModalCommon
    ref="modalRef"
    title="Editar reserva"
    confirm-label="Guardar"
    cancel-label="Cancelar"
    @confirmar="confirmar"
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
        <div>
          <p class="font-bold text-base-content">{{ reserva?.student?.nombre }}</p>
          <p class="text-primary text-sm font-semibold flex items-center gap-1">
            <CalendarClock :size="14" />
            {{ fechaFormateada }}
          </p>
        </div>
      </div>

      <label class="font-bold text-sm">LINK DE ZOOM</label>
      <input
        v-model="linkZoom"
        type="text"
        placeholder="Pegá el link de la reunión"
        class="input w-full"
      />
    </div>

    <p class="text-sm text-base-content/60">El link será enviado al alumno por email.</p>
  </ModalCommon>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarClock } from '@lucide/vue'
import ModalCommon from './ModalCommon.vue'
import { formatearFecha } from '../utils/fecha.js'

const props = defineProps({
  reserva: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['confirmar'])
const modalRef = ref(null)
const linkZoom = ref('')

const fechaFormateada = computed(() => formatearFecha(props.reserva?.fechaHora))

const confirmar = () => {
  if (!linkZoom.value.trim()) return
  emit('confirmar', { reserva: props.reserva, linkZoom: linkZoom.value })
}

defineExpose({
  open: () => {
    linkZoom.value = props.reserva?.urlZoom ?? ''
    modalRef.value?.open()
  },
  close: () => modalRef.value?.close(),
  setLoading: (val) => modalRef.value?.setLoading(val),
})
</script>
