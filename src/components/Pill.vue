<template>
  <span  class="px-2 py-1 rounded-full bg-white text-indigo-700 text-xs font-semibold">
    $ {{ props.tarifa }}/hora
  </span>
</template>

<script setup>
const props = defineProps({
  tarifa: Number,
});
</script>
