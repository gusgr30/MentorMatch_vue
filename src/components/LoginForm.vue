<template>
  <form @submit.prevent="onSubmit">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-2 flex flex-col">

      <InputComponent label="email" type="email" placeholder="tu@email.com" v-model="form.email" />
      <InputComponent label="contraseña" type="password" placeholder="******" v-model="form.password" />

      <p v-if="error" class="text-sm text-red-600 font-medium">{{ error }}</p>

      <ButtonCommon class="w-full mt-2" :disabled="authStore.loading" @click="onSubmit">
        {{ authStore.loading ? 'Ingresando...' : 'Ingresar' }}
      </ButtonCommon>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import ButtonCommon from './ButtonCommon.vue'
import InputComponent from './InputComponent.vue'


const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push(authStore.isMentor ? { name: 'mentorDashboard' } : { name: 'home' })
  } catch {
    error.value = authStore.error || 'Email o contraseña incorrectos.'
  }
}
</script>
