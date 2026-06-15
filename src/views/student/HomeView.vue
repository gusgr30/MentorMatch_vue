<template>
  <div>
    <PageHeader 
      title="Encuentra a tu mentor"
      subtitle="Buscá un experto, seleccioná un horario y reservá clases personalizadas."
    />

    <div class="flex flex-col lg:flex-row gap-8">
      <FilterPanel v-model="filterTech" :techs="allTechs" @goToMentorias="goToMisMentorias" :reservas-activas="reservasActivas" />

      <div class="flex-1">
        <div v-if="filteredMentors.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <MentorCard v-for="mentor in filteredMentors" :key="mentor._id" :mentor="mentor" @clickCard="goToDetail" />
        </div>
        <div v-else class="text-center text-base-content/40 mt-20">
          <p class="text-lg font-semibold">
            No se encontraron mentores para <span class="text-primary">{{ filterTech }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/axios.js";
import MentorCard from "../../components/MentorCard.vue";
import FilterPanel from "../../components/FilterPanel.vue";
import PageHeader from "../../components/PageHeader.vue";

import { useAuthStore } from "../../stores/auth.js";
import { useReservaStore } from "../../stores/reserva.js";
import { useSkillsStore } from "../../stores/skills.js";
const authStore = useAuthStore();
const reservaStore = useReservaStore();
const skillsStore = useSkillsStore();

const router = useRouter();
const filterTech = ref("");
const mentors = ref([]);

const allTechs = computed(() => skillsStore.skills);

const filteredMentors = computed(() => {
  if (!filterTech.value) return mentors.value;
  return mentors.value.filter((m) =>
    m.mentorProfile?.skills.includes(filterTech.value),
  );
});

onMounted(async () => {
  const [{ data }] = await Promise.all([
    api.get("/usuarios", { params: { rol: "mentor" } }),
    skillsStore.cargarSkills(),
  ])
  mentors.value = data;
});

const goToDetail = (id) => {
  router.push({ name: "mentorDetail", params: { id } });
};

const goToMisMentorias = () => {
  router.push({ name: "misMentorias" });
};

const reservasActivas = computed(() => {
  reservaStore.getReservas(authStore.user._id);
  return reservaStore.reservas.length
})
</script>
