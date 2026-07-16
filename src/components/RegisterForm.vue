<template>
  <form @submit.prevent="handleRegister">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-2 flex flex-col">

      <InputComponent label="nombre completo" type="text" placeholder="Juan Pérez" v-model="form.nombre" />
      <InputComponent label="email" type="email" placeholder="tu@email.com" v-model="form.email" />
      <InputComponent label="contraseña" type="password" placeholder="Mínimo 6 caracteres" v-model="form.password" />

      <label :class="VARIANT_CLASS.LABEL">FOTO DE PERFIL</label>
      <div class="flex items-center gap-4">
        <div class="relative shrink-0">
          <img v-if="fotoPreview" :src="fotoPreview" class="w-14 h-14 rounded-full object-cover border border-base-300" />
          <div v-else class="w-14 h-14 rounded-full bg-base-300 flex items-center justify-center text-base-content/40 text-xs">Sin foto</div>
          <button v-if="fotoPreview" type="button" @click="quitarFoto"
            class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition">
            ✕
          </button>
        </div>
        <input 
          ref="fotoInputRef" 
          type="file" accept="image/*" 
          class="[VARIANT_CLASS.DEFAULT, 'file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:cursor-pointer cursor-pointer !py-2 text-slate-500']" 
          @change="onFotoChange" />
      </div>

      <label :class="VARIANT_CLASS.LABEL">¿CÓMO VAS A USAR LA PLATAFORMA?</label>
      <select v-model="form.rol" :class="VARIANT_CLASS.DEFAULT">
        <option value="student">Quiero aprender (Alumno)</option>
        <option value="mentor">Quiero enseñar (Mentor)</option>
      </select>

      <div v-if="form.rol === 'mentor'" class="flex flex-col gap-2 mt-4 border-t border-gray-300 pt-4">
        <h3 class="text-indigo-700 font-bold mb-2">Perfil Profesional</h3>

        <InputComponent label="TÍTULO (Ej: Full Stack Developer)" type="text" v-model="form.titulo" />
        <InputComponent label="AÑOS DE EXPERIENCIA" type="number" v-model="form.experiencia" />
        <InputComponent label="TARIFA POR HORA" type="number" v-model="form.tarifa" />
        <InputComponent label="LINKEDIN URL" type="url" v-model="form.linkedin" placeholder="https://linkedin.com/in/tuperfil" />

        <label :class="VARIANT_CLASS.LABEL">SKILLS</label>
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

        <label :class="VARIANT_CLASS.LABEL">DISPONIBILIDAD</label>
        <div class="flex gap-2">
          <select v-model="diaSeleccionado" :class="VARIANT_CLASS.DEFAULT">
            <option value="" disabled>Día</option>
            <option v-for="dia in DIAS" :key="dia" :value="dia">{{ dia }}</option>
          </select>
          <input v-model="horaSeleccionada" type="time" :class="VARIANT_CLASS.DEFAULT" />
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

        <TextAreaComponent label="descripción" v-model="form.descripcion"/>

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
import InputComponent from './InputComponent.vue'
import TextAreaComponent from './TextAreaComponent.vue'
import { CalendarPlus } from '@lucide/vue';

import { VARIANT_CLASS } from '../constants/styles.js'


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

const fotoArchivo = ref(null)
const fotoPreview = ref(null)
const fotoInputRef = ref(null)

const onFotoChange = (e) => {
  const archivo = e.target.files[0]
  if (!archivo) return
  fotoArchivo.value = archivo
  fotoPreview.value = URL.createObjectURL(archivo)
}

const quitarFoto = () => {
  fotoArchivo.value = null
  fotoPreview.value = null
  if (fotoInputRef.value) fotoInputRef.value.value = ''
}

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
  const formData = new FormData()
  formData.append('nombre', form.value.nombre)
  formData.append('email', form.value.email)
  formData.append('password', form.value.password)
  formData.append('rol', form.value.rol)

  if (fotoArchivo.value) {
    formData.append('fotoUrl', fotoArchivo.value)
  }

  if (form.value.rol === 'mentor') {
    const mentorProfile = {
      titulo: form.value.titulo,
      descripcion: form.value.descripcion,
      experiencia: Number(form.value.experiencia),
      tarifa: Number(form.value.tarifa),
      linkedin: form.value.linkedin,
      skills: form.value.skills,
      disponibilidad: form.value.disponibilidad,
    }
    formData.append('mentorProfile', JSON.stringify(mentorProfile))
  }

  try {
    await authStore.register(formData)
    showToast('¡Cuenta creada con éxito!', 'success')
    await authStore.login(form.value.email, form.value.password)
    router.push(authStore.isMentor ? { name: 'mentorDashboard' } : { name: 'home' })
  } catch {
    showToast(authStore.error || 'Error al registrar la cuenta. Revisá los datos.', 'error')
  }
}
</script>
