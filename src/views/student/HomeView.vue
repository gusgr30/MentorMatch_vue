<template>
  <div>
    <header class="mb-10 text-center md:text-left">
      <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
        Encuentra a tu mentor
      </h1>
      <h4>Buscá un experto, seleccioná un horario y reservá clases personalizadas.</h4>
    </header>

    <div class="flex flex-col lg:flex-row gap-8">
      <FilterPanel v-model="filterTech" :techs="allTechs" @goToMentorias="goToMisMentorias" />

      <div class="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MentorCard v-for="mentor in filteredMentors" :key="mentor.id" :mentor="mentor" @clickCard="goToDetail" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { mentors } from "../../mocks/mentors.js";
import MentorCard from "../../components/MentorCard.vue";
import FilterPanel from "../../components/FilterPanel.vue";

const router = useRouter();
const filterTech = ref("");
const allTechs = ["React", "Vue", "Node.js", "Python", "AWS", "TypeScript"];

const filteredMentors = computed(() => {
  if (!filterTech.value) return mentors;
  return mentors.filter((m) =>
    m.mentorProfile.skills.includes(filterTech.value),
  );
});

const goToDetail = (id) => {
  router.push({ name: "mentorDetail", params: { id } });
};

const goToMisMentorias = () => {
  router.push({ name: "misMentorias" });
};

</script>
