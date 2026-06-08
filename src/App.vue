<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <RouterLink to="/" class="flex items-center gap-2 cursor-pointer">
            <div class="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap :size="30" :stroke-width="2.8" color="white" />
            </div>
            <span class="text-xl font-bold text-indigo-900 tracking-tight"
              >Mentor Match</span
            >
          </RouterLink>

          <div class="flex items-center space-x-8">
            <RouterLink
              to="/mis-mentorias"
              class="transition font-medium flex items-center gap-2"
              active-class="text-indigo-600 font-bold"
            >
              Mis Mentorías
            </RouterLink>

            <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
              <span class="text-sm font-medium text-gray-600 hidden md:inline"
                >Hola, Estudiante</span
              >
              <div
                class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200"
              >
                JD
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { GraduationCap } from "@lucide/vue";
</script>
