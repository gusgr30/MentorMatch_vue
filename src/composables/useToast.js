import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
  const dismissToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => dismissToast(id), duration)
    }
  }

  return { toasts, showToast, dismissToast }
}
