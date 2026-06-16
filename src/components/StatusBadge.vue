<template>
  <span class="badge badge-outline rounded-full font-bold uppercase text-xs min-w-30 justify-center" :class="badgeClass">
    {{ estado }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { ESTADOS_RESERVA } from '../constants/index.js'

const props = defineProps({
  estado: {
    type: String,
    required: true,
  },
})

const badgeClass = computed(() => ({
  [ESTADOS_RESERVA.PENDIENTE]:  'text-warning border-warning',
  [ESTADOS_RESERVA.CONFIRMADA]: 'text-success border-success',
  [ESTADOS_RESERVA.CANCELADA]:  'text-red-700 border-red-700',
}[props.estado]))
</script>
