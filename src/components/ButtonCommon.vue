<template>
  <button
    @click="!disabled && $emit('click')"
    :disabled="disabled"
    class="py-2.5 px-4 font-bold rounded-xl text-sm transition duration-300"
    :class="
      disabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white cursor-pointer'
    "
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>
