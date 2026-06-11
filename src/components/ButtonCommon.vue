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
    default: 'primary', // 'primary' | 'danger'
  },
})

defineEmits(['click'])

const variantClass = computed(() => {
  if (props.disabled) return 'bg-gray-100 text-gray-400 cursor-not-allowed'
  if (props.variant === 'danger') return 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer'
  return 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white cursor-pointer'
})
</script>
