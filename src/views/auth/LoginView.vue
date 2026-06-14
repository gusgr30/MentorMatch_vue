<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="card bg-base-100 shadow-sm border border-base-200 w-full max-w-md">
      <div class="card-body gap-6">

        <div class="flex flex-col items-center gap-2 mb-2">
          <div class="bg-indigo-600 p-3 rounded-xl">
            <GraduationCap :size="32" color="white" :stroke-width="2.5" />
          </div>
          <h1 class="text-2xl font-bold text-indigo-900 tracking-tight">Mentor Match</h1>
          <p class="text-sm text-base-content/50">Ingresá a tu cuenta para continuar</p>
        </div>

        <form @submit.prevent="onSubmit">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-2 flex flex-col">

            <label class="font-bold">EMAIL</label>
            <input v-model="form.email" type="email" class="input w-full" placeholder="tu@email.com" required />

            <label class="font-bold">CONTRASEÑA</label>
            <input v-model="form.password" type="password" class="input w-full" placeholder="••••••••" required />

            <p v-if="error" class="text-sm text-red-600 font-medium">{{ error }}</p>

            <ButtonCommon class="w-full mt-2" :disabled="authStore.loading" @click="onSubmit">
              {{ authStore.loading ? 'Ingresando...' : 'Ingresar' }}
            </ButtonCommon>
          </fieldset>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GraduationCap } from '@lucide/vue'
import { useAuthStore } from '../../stores/auth.js'
import ButtonCommon from "../../components/ButtonCommon.vue"

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  try {
    await authStore.login(form.value.email, form.value.password)
    console.log(authStore.isMentor)
    router.push(authStore.isMentor ? { name: "mentorDashboard" } : { name: "home" })

  } catch (e) {
    error.value = authStore.error || 'Email o contraseña incorrectos.'
  }
}
</script>
