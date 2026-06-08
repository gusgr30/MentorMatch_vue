<template>
  <div class="card bg-base-100 border border-base-200 shadow-sm">
    <div class="card-body p-5 gap-4">
      <h3 class="card-title text-base">Próxima Disponibilidad</h3>

      <ul class="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
        <li
          v-for="slot in disponibilidad"
          :key="slot"
          @click="selected = slot"
          class="flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all"
          :class="
            selected === slot
              ? 'border-primary bg-primary/10 text-primary font-semibold'
              : 'border-base-200 text-base-content hover:border-primary/40 hover:bg-base-200'
          "
        >
          <span class="text-sm capitalize">{{ slot }}</span>
          <ChevronRight :size="16" class="opacity-40" />
        </li>
      </ul>

      <p class="text-xs text-base-content/50">Sesiones de 1 hora vía Zoom</p>

      <ButtonCommon class="w-full" @click="$emit('reservar', selected)" :disabled="!selected">
        Reservar Sesión
      </ButtonCommon>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronRight } from "@lucide/vue";
import ButtonCommon from "./ButtonCommon.vue";

defineProps({
  disponibilidad: {
    type: Array,
    required: true,
  },
});

defineEmits(["reservar"]);

const selected = ref(null);
</script>
