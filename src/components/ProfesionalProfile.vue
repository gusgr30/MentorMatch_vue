<template>
        <div class="max-w-3xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 class="font-bold text-xl text-gray-900 border-b pb-3 mb-6">Editar Datos Profesionales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            <InputComponent :disabled="isSaved" label="título profesional" type="text" v-model="formData.tituloProfesional" />     
            <InputComponent :disabled="isSaved" label="experiencia actual (años)" type="number" v-model="formData.experienciaActual" />
            <InputComponent :disabled="isSaved" label="tarifa por hora" type="number" v-model="formData.tarifaPorHora" />
            <InputComponent :disabled="isSaved" label="linkedin url" type="text" v-model="formData.linkedinUrl" />

        </div>

        <TextAreaComponent :disabled="isSaved" label="Biografía Profesional" v-model="formData.biografiaProfesional"/>

        <div class="mb-6">
            <label
                :class="VARIANT_CLASS.LABEL">
                Tecnologías/Skills
            </label>
            <div class="flex flex-wrap gap-2 mt-2">
                
                <button 
                    v-for="skill in allSkills"
                    :key="skill"
                    :class="selectedSkills.includes(skill) ? VARIANT_CLASS.BUTTON_SELECTED : VARIANT_CLASS.BUTTON_UNSELECTED"
                    @click="toggleSkill(skill)"
                    :disabled="isSaved"
                    type="button"
                    >
                    {{skill}}
                </button>


            </div>
        </div>
        <div v-if="isSaved" class="w-full flex justify-center">
            <ButtonCommon @click="toggleEdit" variant="primary"> Editar </ButtonCommon>
        </div>
        <div v-if="!isSaved" class="w-full flex justify-center gap-4">
            <ButtonCommon @click="guardarPerfil" variant="secundary"> Guardar Perfil </ButtonCommon>
            <ButtonCommon @click="cancelarEdicion" variant="danger"> Cancelar </ButtonCommon>
        </div>

    </div>
</template>
<script setup>
import ButtonCommon from "./ButtonCommon.vue";
import InputComponent from "./InputComponent.vue";
import TextAreaComponent from "./TextAreaComponent.vue";

import { VARIANT_CLASS } from "../constants/styles";

import { onMounted, ref } from "vue";
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useUsuarioStore } from "../stores/usuario";
import { useSkillsStore } from "../stores/skills.js";
import { useToast } from "../composables/useToast";


const { showToast } = useToast()

const authStore = useAuthStore()
const usuarioStore = useUsuarioStore()
const skillsStore = useSkillsStore()

const isSaved = ref(true)


onMounted(async () => {
    await skillsStore.cargarSkills()
})


const allSkills = computed(() => skillsStore.skills)

const selectedSkills = ref([...authStore.user.mentorProfile.skills])

const formData = ref({
    tituloProfesional: authStore.user.mentorProfile.titulo,
    experienciaActual: authStore.user.mentorProfile.experiencia,
    tarifaPorHora: authStore.user.mentorProfile.tarifa,
    linkedinUrl: authStore.user.mentorProfile.linkedin,
    biografiaProfesional: authStore.user.mentorProfile.descripcion,
    skills: selectedSkills.value
})

const toggleSkill = async (skillClickeado) => {
    if(selectedSkills.value.includes(skillClickeado)){
        selectedSkills.value = selectedSkills.value.filter(s => s !== skillClickeado)
    }else{
        selectedSkills.value.push(skillClickeado)
    }
}

const toggleEdit = () => {
    isSaved.value = !isSaved.value
}

const guardarPerfil = async () => {
    try{
        const payload = {
            mentorProfile: {
                titulo: formData.value.tituloProfesional,
                experiencia: formData.value.experienciaActual,
                tarifa: formData.value.tarifaPorHora,
                linkedin: formData.value.linkedinUrl,
                descripcion: formData.value.biografiaProfesional,
                skills: selectedSkills.value
            }
        }

        await usuarioStore.actualizarUsuario(authStore.user._id, payload)

        await authStore.init()

        showToast("Perfil actualizado con éxito.", "success")
    }catch (err){
        showToast("Error al actualizar el perfil.", "error")
    }

    toggleEdit()
}

const cancelarEdicion = () => {
    
    formData.value.tituloProfesional = authStore.user.mentorProfile.titulo
    formData.value.experienciaActual = authStore.user.mentorProfile.experiencia
    formData.value.tarifaPorHora = authStore.user.mentorProfile.tarifa
    formData.value.linkedinUrl = authStore.user.mentorProfile.linkedin
    formData.value.biografiaProfesional = authStore.user.mentorProfile.descripcion

    selectedSkills.value = [...authStore.user.mentorProfile.skills]

    formData.value.skills = selectedSkills.value


    toggleEdit()
}
</script>