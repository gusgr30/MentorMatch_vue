<template>
  <button
    @click="!disabled && $emit('click')"
    :disabled="disabled"
    class="py-2.5 px-4 font-bold rounded-xl text-sm transition duration-300"
    :class="variantClass"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'danger' | 'warning'
  },
})

defineEmits(['click'])

const variantClass = computed(() => {
  if (props.disabled) return 'bg-gray-100 text-gray-400 cursor-not-allowed'
  if (props.variant === 'danger') return 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer'
  else if(props.variant === 'warning') return 'bg-yellow-50 text-yellow-600 hover:bg-yellow-600 hover:text-white cursor-pointer'
  else if(props.variant === 'secundary') return 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-50 hover:text-indigo-700'
  return 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white cursor-pointer'
})
</script>
