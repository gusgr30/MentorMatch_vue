<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <template v-if="!['login', 'register'].includes(route.name)">
      <Navbar />
    </template>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>

    <ToastContainer />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth.js";
import Navbar from "./components/Navbar.vue";
import ToastContainer from "./components/ToastContainer.vue";

const route = useRoute()
const authStore = useAuthStore()
</script>
