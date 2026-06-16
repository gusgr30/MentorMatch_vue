<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <RouterLink to="/" class="flex items-center gap-2 cursor-pointer">
          <div class="bg-indigo-600 p-2 rounded-lg">
            <GraduationCap :size="30" :stroke-width="2.8" color="white" />
          </div>
          <span class="text-xl font-bold text-indigo-900 tracking-tight">Mentor Match</span>
        </RouterLink>

        <div class="flex items-center space-x-8">
          <RouterLink v-if="authStore.isStudent" to="/" class="transition font-medium flex items-center gap-2"
            active-class="text-indigo-600 font-bold">
            Explorar mentores
          </RouterLink>
          <RouterLink v-if="authStore.isStudent" to="/mis-mentorias"
            class="transition font-medium flex items-center gap-2" active-class="text-indigo-600 font-bold">
            Mis Mentorías
          </RouterLink>
          <RouterLink v-if="authStore.isMentor" to="/portal/dashboard"
            class="transition font-medium flex items-center gap-2" active-class="text-indigo-600 font-bold">
            Panel de Clases
          </RouterLink>
          <RouterLink v-if="authStore.isMentor" to="/portal/agenda"
            class="transition font-medium flex items-center gap-2" active-class="text-indigo-600 font-bold">
            Mi Agenda
          </RouterLink>
          <RouterLink to="/portal/perfil"
            class="transition font-medium flex items-center gap-2" active-class="text-indigo-600 font-bold">
            Mi Perfil
          </RouterLink>

          <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
            <span class="text-sm font-medium text-gray-600 hidden md:inline">
              Hola, {{ authStore.user?.nombre }}
            </span>
            <div
              class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              {{ initiales }}
            </div>
            <button @click="modalLogoutRef?.open()"
              class="text-sm font-medium text-gray-600 hidden md:inline cursor-pointer">
              <LogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <ModalCommon ref="modalLogoutRef" title="Cerrar sesión" confirm-label="Sí, salir" cancel-label="Cancelar"
    @confirmar="manejarLogout">
    <p class="text-base-content/70">¿Estás seguro que querés cerrar sesión?</p>
  </ModalCommon>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { GraduationCap, LogOut } from '@lucide/vue'
import { useAuthStore } from '../stores/auth.js'
import { obtenerIniciales } from '../utils/utils.js'
import ModalCommon from './ModalCommon.vue'

const router = useRouter()
const authStore = useAuthStore()
const modalLogoutRef = ref(null)

const initiales = computed(() => obtenerIniciales(authStore.user?.nombre))

const manejarLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>
