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
        
        <!-- Tabs -->
        <div class="flex gap-sm mb-lg" style="border-bottom:1px solid var(--border-color);margin-bottom:var(--spacing-sm)">
          <button
            class="btn"
            :style="tab==='login' ? 'border-bottom:2px solid var(--color-primary);border-radius:0;color:var(--color-primary)' : 'color:var(--text-muted)'"
            @click="tab='login'; error=''"
          >Ingresar</button>
          <button
            class="btn"
            :style="tab==='register' ? 'border-bottom:2px solid var(--color-primary);border-radius:0;color:var(--color-primary)' : 'color:var(--text-muted)'"
            @click="tab='register'; error=''"
          >Registrarse</button>
        </div>

        <!-- FORM LOGIN -->
        <form v-if="tab==='login'" @submit.prevent="onSubmit">
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

        <!-- FORM REGISTER -->
        <form v-else @submit.prevent="handleRegister">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-2 flex flex-col">
            
            <!-- Datos Comunes -->
            <label class="font-bold">NOMBRE COMPLETO</label>
            <input v-model="registerForm.nombre" type="text" class="input w-full" placeholder="Juan Pérez" required minlength="3" />

            <label class="font-bold">EMAIL</label>
            <input v-model="registerForm.email" type="email" class="input w-full" placeholder="tu@email.com" required />

            <label class="font-bold">CONTRASEÑA</label>
            <input v-model="registerForm.password" type="password" class="input w-full" placeholder="Mínimo 6 caracteres" required minlength="6" />

            <label class="font-bold mt-2">¿CÓMO VAS A USAR LA PLATAFORMA?</label>
            <select v-model="registerForm.rol" class="input w-full bg-white">
              <option value="student">Quiero aprender (Alumno)</option>
              <option value="mentor">Quiero enseñar (Mentor)</option>
            </select>

            <!-- Datos Extra SOLO para Mentores -->
            <div v-if="registerForm.rol === 'mentor'" class="flex flex-col gap-2 mt-4 border-t border-gray-300 pt-4">
              <h3 class="text-indigo-700 font-bold mb-2">Perfil Profesional</h3>
              
              <label class="font-bold text-xs">TÍTULO (Ej: Full Stack Developer)</label>
              <input v-model="registerForm.titulo" type="text" class="input w-full" required minlength="3" />

              <label class="font-bold text-xs">AÑOS DE EXPERIENCIA</label>
              <input v-model="registerForm.experiencia" type="number" min="1" class="input w-full" required />

              <label class="font-bold text-xs">TARIFA POR HORA (USD)</label>
              <input v-model="registerForm.tarifa" type="number" min="1" class="input w-full" required />

              <label class="font-bold text-xs">LINKEDIN URL</label>
              <input v-model="registerForm.linkedin" type="url" class="input w-full" placeholder="https://linkedin.com/in/tuperfil" required />

              <label class="font-bold text-xs">SKILLS (Separadas por coma)</label>
              <input v-model="registerForm.skills" type="text" class="input w-full" placeholder="React, Node, Vue" required />

              <label class="font-bold text-xs">DISPONIBILIDAD (Separadas por coma)</label>
              <input v-model="registerForm.disponibilidad" type="text" class="input w-full" placeholder="Lunes 18:00, Jueves 10:00" required />

              <label class="font-bold text-xs">DESCRIPCIÓN</label>
              <textarea v-model="registerForm.descripcion" class="input w-full h-24 py-2" placeholder="Contanos sobre tu experiencia..." required minlength="10"></textarea>
            </div>

            <p v-if="error" class="text-sm text-red-600 font-medium">{{ error }}</p>

            <ButtonCommon class="w-full mt-4" :disabled="authStore.loading" @click="handleRegister">
              {{ authStore.loading ? 'Registrando...' : 'Crear Cuenta' }}
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
import { useToast } from '../../composables/useToast.js'

const router = useRouter()
const authStore = useAuthStore()

const { showToast } = useToast()

const tab = ref('login')
const form = ref({ email: '', password: '' })
const error = ref('')

// Estado para el formulario de registro
const registerForm = ref({
  nombre: '',
  email: '',
  password: '',
  rol: 'student',
  // Campos del mentor
  titulo: '',
  descripcion: '',
  experiencia: '',
  tarifa: '',
  skills: '',
  linkedin: '',
  disponibilidad: ''
})

const onSubmit = async () => {
  error.value = ''
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push(authStore.isMentor ? { name: "mentorDashboard" } : { name: "home" })
  } catch (e) {
    error.value = authStore.error || 'Email o contraseña incorrectos.'
  }
}

const handleRegister = async () => {
  error.value = ''
  
  //datos comunes
  const payload = {
    nombre: registerForm.value.nombre,
    email: registerForm.value.email,
    password: registerForm.value.password,
    rol: registerForm.value.rol
  }

  // si es mentor, agregamos el mentorProfile
  if (registerForm.value.rol === 'mentor') {
    payload.mentorProfile = {
      titulo: registerForm.value.titulo,
      descripcion: registerForm.value.descripcion,
      experiencia: Number(registerForm.value.experiencia),
      tarifa: Number(registerForm.value.tarifa),
      linkedin: registerForm.value.linkedin,
      // convertimos los textos separados por coma en Arrays
      skills: registerForm.value.skills.split(',').map(s => s.trim()).filter(s => s),
      disponibilidad: registerForm.value.disponibilidad.split(',').map(s => s.trim()).filter(s => s)
    }
  }

  try {

    await authStore.register(payload)
    
    showToast("¡Cuenta creada con éxito!", "success")

    //luego de crear la cuenta se inicia sesion automaticamente
    await authStore.login(registerForm.value.email, registerForm.value.password)
    router.push(authStore.isMentor ? { name: "mentorDashboard" } : { name: "home" })
  } catch (e) {
    showToast(authStore.error || 'Error al registrar la cuenta. Revisá los datos.', "error")
  }
}
</script>
