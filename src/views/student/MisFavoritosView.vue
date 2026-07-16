<template>
  <div>
    <PageHeader 
      title="Mis Mentores Favoritos"
      subtitle="Aquí encontrarás los mentores que guardaste para contactar más tarde."
    />

    <div class="flex-1 mt-8">
      <div v-if="favoritesStore.favorites.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MentorCard 
          v-for="mentor in favoritesStore.favorites" 
          :key="mentor._id" 
          :mentor="mentor" 
          @clickCard="goToDetail" 
        />
      </div>
      <div v-else class="text-center text-base-content/40 mt-20">
        <p class="text-lg font-semibold">
          Aún no tienes mentores guardados en favoritos.
        </p>
        <button class="btn btn-primary mt-4" @click="goToHome">
          Explorar mentores
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import MentorCard from "../../components/MentorCard.vue";
import PageHeader from "../../components/PageHeader.vue";
import { useFavoritesStore } from "../../stores/favoritesStore.js";

const router = useRouter();
const favoritesStore = useFavoritesStore();

const goToDetail = (id) => {
  router.push({ name: "mentorDetail", params: { id } });
};

const goToHome = () => {
  router.push({ name: "home" });
};
</script>
