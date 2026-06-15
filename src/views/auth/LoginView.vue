<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    <div class="card bg-base-100 shadow-sm border border-base-200 w-full max-w-md">
      <div class="card-body gap-6">

        <div class="flex flex-col items-center gap-2 mb-2">
          <div class="bg-indigo-600 p-3 rounded-xl">
            <GraduationCap :size="32" color="white" :stroke-width="2.5" />
          </div>
          <h1 class="text-2xl font-bold text-indigo-900 tracking-tight">Mentor Match</h1>
          <p class="text-sm text-base-content/50">
            {{ tab === 'login' ? 'Ingresá a tu cuenta para continuar' : 'Creá tu cuenta para comenzar' }}
          </p>
        </div>

        <div class="flex gap-sm mb-lg" style="border-bottom:1px solid var(--border-color);margin-bottom:var(--spacing-sm)">
          <button class="btn"
            :style="tab === 'login' ? 'border-bottom:2px solid var(--color-primary);border-radius:0;color:var(--color-primary)' : 'color:var(--text-muted)'"
            @click="tab = 'login'">Ingresar</button>
          <button class="btn"
            :style="tab === 'register' ? 'border-bottom:2px solid var(--color-primary);border-radius:0;color:var(--color-primary)' : 'color:var(--text-muted)'"
            @click="tab = 'register'">Registrarse</button>
        </div>

        <LoginForm v-if="tab === 'login'" />
        <RegisterForm v-else />

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GraduationCap } from '@lucide/vue'
import LoginForm from '../../components/LoginForm.vue'
import RegisterForm from '../../components/RegisterForm.vue'

const tab = ref('login')
</script>
