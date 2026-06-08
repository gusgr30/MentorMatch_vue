<template>
  <div class="mb-4">
    <button
      @click="goToHome"
      class="flex items-center gap-2 text-[#4f39f6] font-semibold cursor-pointer transition-all duration-200 hover:opacity-80 hover:-translate-x-1"
    >
      <MoveLeft :size="24" />
      <span>Volver</span>
    </button>
  </div>
  <div v-if="mentor">
    <MentorCardDetail :mentor="mentor" />
  </div>
  <div v-else>Mentor no encontrado.</div>
</template>

<script setup>
import MentorCardDetail from "../components/MentorCardDetail.vue";
import { computed } from "vue";
import { mentors } from "../mocks/mentors.js";
import { MoveLeft } from "@lucide/vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const mentor = computed(() => mentors.find((m) => m.id === route.params.id));

const goToHome = () => {
  console.log("le dic lcik");
  router.push({ name: "home" });
};
</script>
