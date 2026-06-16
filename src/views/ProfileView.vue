<template>
    <PageHeader 
        :title="authStore.user?.rol === 'mentor' ? 'Perfil del Mentor' : 'Perfil del Alumno'" 
        :subtitle="authStore.user?.rol === 'mentor' ? 'Gestioná tus datos, experiencia y tarifas para destacarte.' : 'Actualizá tu información para encontrar al mentor ideal.'"/>    

    <div v-if="authStore.user.rol === 'mentor'" class="flex gap-4 mb-8 border-b border-gray-200">
        <button 
            :class="tab === 'userCommon' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700'"
            class="pb-3 px-2 transition-all duration-200"
            @click="tab = 'userCommon'"
        >
            Datos Personales
        </button>
        <button 
            :class="tab === 'mentorUser' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700'"
            class="pb-3 px-2 transition-all duration-200"
            @click="tab = 'mentorUser'"
        >
            Datos Profesionales
        </button>
    </div>

    <UserProfile v-if="tab === 'userCommon'" />
    <ProfesionalProfile v-else />



</template>

<script setup>
import PageHeader from "../components/PageHeader.vue";
import UserProfile from "../components/UserProfile.vue";
import ProfesionalProfile from "../components/ProfesionalProfile.vue";


const tab = ref('userCommon')

import { onMounted, ref } from "vue";
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";

onMounted(async () => {
    await authStore.init()
})

const authStore = useAuthStore()


</script>