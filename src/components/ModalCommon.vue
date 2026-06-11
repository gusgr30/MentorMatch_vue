<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box relative flex flex-col gap-4">

      <Transition name="fade">
        <div v-if="loading" class="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center z-10">
          <span class="loading loading-dots loading-md text-primary"></span>
        </div>
      </Transition>


      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="text-lg font-bold text-base-content">{{ title }}</h3>

      <slot></slot>

      <div class="flex justify-center gap-3 mt-2">
        <form method="dialog">
          <ButtonCommon variant="danger">{{ cancelLabel }}</ButtonCommon>
        </form>
        <ButtonCommon @click="$emit('confirmar')">{{ confirmLabel }}</ButtonCommon>
      </div>

    </div>
    <form method="dialog" class="modal-backdrop">
      <button>cerrar</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import ButtonCommon from './ButtonCommon.vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: 'Aceptar',
  },
  cancelLabel: {
    type: String,
    default: 'Cancelar',
  },
})

defineEmits(['confirmar'])

const dialogRef = ref(null)
const loading = ref(false)

defineExpose({
  open: () => dialogRef.value?.showModal(),
  close: () => dialogRef.value?.close(),
  setLoading: (val) => loading.value = val,
})
</script>

