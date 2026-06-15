<template>
  <div class="toast toast-end z-50">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="flex justify-between gap-4 px-4 py-3 rounded-xl shadow-lg text-white font-semibold min-w-64" :class="{
        'bg-green-600': toast.type === 'success',
        'bg-red-600':   toast.type === 'error',
        'bg-blue-500':  toast.type === 'info',
        'bg-yellow-500': toast.type === 'warning',
      }">
        <span>{{ toast.message }}</span>
        <button @click="dismissToast(toast.id)" class="btn btn-ghost btn-xs">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast.js'
const { toasts, dismissToast } = useToast()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(1rem); }
</style>
