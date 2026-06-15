<template>
  <form @submit.prevent="handleRegister">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-2 flex flex-col">

      <label class="font-bold">NOMBRE COMPLETO</label>
      <input v-model="form.nombre" type="text" class="input w-full" placeholder="Juan Pérez" required minlength="3" />

      <label class="font-bold">EMAIL</label>
      <input v-model="form.email" type="email" class="input w-full" placeholder="tu@email.com" required />

      <label class="font-bold">CONTRASEÑA</label>
      <input v-model="form.password" type="password" class="input w-full" placeholder="Mínimo 6 caracteres" required minlength="6" />

      <label class="font-bold mt-2">¿CÓMO VAS A USAR LA PLATAFORMA?</label>
      <select v-model="form.rol" class="select w-full">
        <option value="student">Quiero aprender (Alumno)</option>
        <option value="mentor">Quiero enseñar (Mentor)</option>
      </select>

      <div v-if="form.rol === 'mentor'" class="flex flex-col gap-2 mt-4 border-t border-gray-300 pt-4">
        <h3 class="text-indigo-700 font-bold mb-2">Perfil Profesional</h3>

        <label class="font-bold text-xs">TÍTULO (Ej: Full Stack Developer)</label>
        <input v-model="form.titulo" type="text" class="input w-full" required minlength="3" />

        <label class="font-bold text-xs">AÑOS DE EXPERIENCIA</label>
        <input v-model="form.experiencia" type="number" min="1" class="input w-full" required />

        <label class="font-bold text-xs">TARIFA POR HORA</label>
        <input v-model="form.tarifa" type="number" min="1" class="input w-full" required />

        <label class="font-bold text-xs">LINKEDIN URL</label>
        <input v-model="form.linkedin" type="url" class="input w-full" placeholder="https://linkedin.com/in/tuperfil" required />

        <label class="font-bold text-xs">SKILLS</label>
        <Multiselect
          v-model="form.skills"
          :options="skillsStore.skills"
          mode="tags"
          searchable
          placeholder="Seleccioná tus skills"
          :close-on-select="false"
          no-options-text="No hay opciones"
          no-results-text="No se encontraron resultados"
        />

        <label class="font-bold text-xs">DISPONIBILIDAD</label>
        <div class="flex gap-2">
          <select v-model="diaSeleccionado" class="select select-ms flex-1">
            <option value="" disabled>Día</option>
            <option v-for="dia in DIAS" :key="dia" :value="dia">{{ dia }}</option>
          </select>
          <input v-model="horaSeleccionada" type="time" class="select select-ms flex-1" />
          <button type="button" @click="agregarSlot" :disabled="!diaSeleccionado || !horaSeleccionada"
            class="btn btn-primary btn-sm text-white self-center">
              <CalendarPlus />
          </button>
        </div>
        <div v-if="form.disponibilidad.length" class="flex flex-wrap gap-2 mt-1">
          <span v-for="slot in form.disponibilidad" :key="slot"
            class="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
            {{ slot }}
            <button type="button" @click="eliminarSlot(slot)" class="hover:text-red-500 transition">✕</button>
          </span>
        </div>
        <p v-if="!form.disponibilidad.length" class="text-xs text-base-content/40">Agregá al menos un horario</p>

        <label class="font-bold text-xs">DESCRIPCIÓN</label>
        <textarea v-model="form.descripcion" class="input w-full h-24 py-2"
          placeholder="Contanos sobre tu experiencia..." required minlength="10"></textarea>
      </div>

      <ButtonCommon class="w-full mt-4" :disabled="authStore.loading" @click="handleRegister">
        {{ authStore.loading ? 'Registrando...' : 'Crear Cuenta' }}
      </ButtonCommon>
    </fieldset>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { useAuthStore } from '../stores/auth.js'
import { useSkillsStore } from '../stores/skills.js'
import { useToast } from '../composables/useToast.js'
import ButtonCommon from './ButtonCommon.vue'
import { CalendarPlus } from '@lucide/vue';

const router = useRouter()
const authStore = useAuthStore()
const skillsStore = useSkillsStore()
const { showToast } = useToast()

onMounted(() => skillsStore.cargarSkills())

const form = ref({
  nombre: '',
  email: '',
  password: '',
  rol: 'student',
  titulo: '',
  descripcion: '',
  experiencia: '',
  tarifa: '',
  skills: [],
  linkedin: '',
  disponibilidad: [],
})

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

const diaSeleccionado = ref('')
const horaSeleccionada = ref('')

const agregarSlot = () => {
  const slot = `${diaSeleccionado.value} ${horaSeleccionada.value}`
  if (!form.value.disponibilidad.includes(slot)) {
    form.value.disponibilidad.push(slot)
  }
  diaSeleccionado.value = ''
  horaSeleccionada.value = ''
}

const eliminarSlot = (slot) => {
  form.value.disponibilidad = form.value.disponibilidad.filter(s => s !== slot)
}

const handleRegister = async () => {
  const payload = {
    nombre: form.value.nombre,
    email: form.value.email,
    password: form.value.password,
    rol: form.value.rol,
  }

  if (form.value.rol === 'mentor') {
    payload.mentorProfile = {
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      experiencia: Number(form.value.experiencia),
      tarifa: Number(form.value.tarifa),
      linkedin: form.value.linkedin,
      skills: form.value.skills,
      disponibilidad: form.value.disponibilidad,
    }
  }

  try {
    await authStore.register(payload)
    showToast('¡Cuenta creada con éxito!', 'success')
    await authStore.login(form.value.email, form.value.password)
    router.push(authStore.isMentor ? { name: 'mentorDashboard' } : { name: 'home' })
  } catch {
    showToast(authStore.error || 'Error al registrar la cuenta. Revisá los datos.', 'error')
  }
}
</script>
