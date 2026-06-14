<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <template v-if="!['login', 'register'].includes(route.name)">
      <NavbarStudent />
      <!-- <NavbarStudent v-if="authStore.isStudent" /> -->
      <!-- <NavbarMentor v-else-if="authStore.isMentor" /> -->
    </template>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth.js";
import NavbarStudent from "./components/NavbarStudent.vue";

const route = useRoute()
const authStore = useAuthStore()
</script>
