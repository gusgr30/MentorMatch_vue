<template>
  <aside class="w-full lg:w-64 space-y-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Funnel :size="16" color="#4f39f6" :stroke-width="2.75" /> Filtros
      </h3>
      <div>
        <label class="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">
          Tecnología
        </label>
        <select v-model="selectedTech" class="select w-full">
          <option value="">Todas las tecnologías</option>
          <option v-for="tech in techs" :key="tech" :value="tech">{{ tech }}</option>
        </select>
      </div>
    </div>

    <div
      @click="$emit('goToMentorias')"
      class="bg-indigo-900 p-6 rounded-2xl shadow-lg text-white cursor-pointer hover:bg-indigo-800 transition transform active:scale-95"
    >
      <p class="text-indigo-300 text-xs uppercase font-bold mb-1 tracking-widest">Tu Actividad</p>
      <h4 class="text-xl font-bold">Reservas Activas: 1</h4>
      <p class="text-[10px] text-indigo-400 mt-4 underline font-medium">
        Ver detalles de mis turnos
      </p>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { Funnel } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  techs: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'goToMentorias'])

const selectedTech = computed({
  get: () => props.modelValue,
  set: (val) => {
    // console.log("val",val)
    emit('update:modelValue', val)},
})
</script>
