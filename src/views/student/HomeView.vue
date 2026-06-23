<template>
  <div>
    <PageHeader 
      title="Encuentra a tu mentor"
      subtitle="Buscá un experto, seleccioná un horario y reservá clases personalizadas."
    />

    <div class="flex flex-col lg:flex-row gap-8">
      <FilterPanel v-model="filterTech" :techs="allTechs" @goToMentorias="goToMisMentorias" :reservas-activas="reservasActivas" />

      <div class="flex-1">
        <div v-if="loading" class="flex justify-center mt-20">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <template v-else>
          <div v-if="filteredMentors.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MentorCard v-for="mentor in filteredMentors" :key="mentor._id" :mentor="mentor" @clickCard="goToDetail" />
          </div>
          <div v-else class="text-center text-base-content/40 mt-20">
            <p class="text-lg font-semibold">
              No se encontraron mentores para <span class="text-primary">{{ filterTech }}</span>
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMentores } from "../../services/usuarioService.js";
import MentorCard from "../../components/MentorCard.vue";
import FilterPanel from "../../components/FilterPanel.vue";
import PageHeader from "../../components/PageHeader.vue";

import { useAuthStore } from "../../stores/auth.js";
import { useReservaStore } from "../../stores/reserva.js";
import { useSkillsStore } from "../../stores/skills.js";
import { ESTADOS_RESERVA } from "../../constants/index.js";
const authStore = useAuthStore();
const reservaStore = useReservaStore();
const skillsStore = useSkillsStore();

const router = useRouter();
const filterTech = ref("");
const mentors = ref([]);
const loading = ref(true);

const allTechs = computed(() => skillsStore.skills);

const filteredMentors = computed(() => {
  if (!filterTech.value) return mentors.value;
  return mentors.value.filter((m) =>
    m.mentorProfile?.skills.includes(filterTech.value),
  );
});

onMounted(async () => {
  try {
    const [{ data }] = await Promise.all([
      getMentores(),
      skillsStore.cargarSkills(),
      reservaStore.getReservas(authStore.user._id),
    ])
    mentors.value = data;
  } finally {
    loading.value = false;
  }
});

const goToDetail = (id) => {
  router.push({ name: "mentorDetail", params: { id } });
};

const goToMisMentorias = () => {
  router.push({ name: "misMentorias" });
};

const reservasActivas = computed(() => {
  const activas = reservaStore.reservas?.filter(r => r.estado !== ESTADOS_RESERVA.CANCELADA)
  return activas.length ?? 0;
});
</script>
