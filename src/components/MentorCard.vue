<template>
  <div
    @click="$emit('clickCard', mentor._id)"
    class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
  >
    <div
      class="relative h-28 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-end px-6 pb-2"
    >
    <!-- @click.stop para que llame a la funcion y frene el evento, para que no continue hacia el contenedor padre con el evento clickCard-->
      <button
        @click.stop="favoritesStore.toggleFavorite(mentor)" 
        class="absolute top-3 left-3 text-white hover:scale-110 transition-transform z-10"
      >
        <Heart
          :class="favoritesStore.isFavorite(mentor._id) ? 'fill-white text-white' : 'text-white'"
          :size="24"
        />
      </button>

      <Pill
        class="absolute top-3 right-3"
        :tarifa="mentor.mentorProfile.tarifa"
      />

      <img
        :src="resolverFoto(mentor.fotoUrl, mentor.nombre)"
        @error="(e) => e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.nombre}`"
        class="w-16 h-16 rounded-xl bg-white border-4 border-white shadow-md -mb-4 transition-transform group-hover:scale-105 duration-300"
        alt="Foto Perfil"
      />
    </div>

    <div class="p-6 pt-8 flex-1 flex flex-col">
      <h3
        class="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition"
      >
        {{ mentor.nombre }}
      </h3>
      <p class="text-indigo-600 text-sm font-semibold mb-3">
        {{ mentor.mentorProfile.titulo }}
      </p>
      <p class="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">
        {{ mentor.mentorProfile.descripcion }}
      </p>

      <div class="flex flex-wrap gap-1 mb-5">
        <span
          v-for="skill in mentor.mentorProfile.skills"
          :key="skill"
          class="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase tracking-wider"
        >
          {{ skill }}
        </span>
      </div>

      <ButtonCommon class="w-full" @click="$emit('clickCard', mentor._id)">
        Ver perfil
      </ButtonCommon>
    </div>
  </div>
</template>

<script setup>
import Pill from "./Pill.vue";
import ButtonCommon from "./ButtonCommon.vue";
import { resolverFoto } from "../utils/utils.js";
import { Heart } from "@lucide/vue";
import { useFavoritesStore } from "../stores/favoritesStore.js";

const favoritesStore = useFavoritesStore();

const props = defineProps({
  mentor: {
    type: Object,
    required: true,
  },
});
defineEmits(["clickCard"]);
</script>
