<template>
    <PageHeader title="Portal del Mentor" :subtitle="`Panel de control profesional para ${authStore.user?.nombre }`"/>    

    <div class="max-w-3xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 class="font-bold text-xl text-gray-900 border-b pb-3 mb-6">Editar Datos Profesionales</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            <!-- LES FALTA EL V-MODEL -->
            <InputComponent label="título profesional" type="text" />     
            <InputComponent label="empresa actual" type="text" />
            <InputComponent label="tarifa por hora (usd)" type="number" />
            <InputComponent label="linkedin url" type="text" />

        </div>

            <!--  LE FALTA EL V-MODEL -->
        <TextAreaComponent label="Biografía Profesional"/>

        <div class="mb-6">
            <label
                :class="VARIANT_CLASS.DEFAULT">
                Tecnologías/Skills
            </label>
            <div class="flex flex-wrap gap-2 mt-2">
                
                <!-- ***HACER V-FOR con el traido de la base -->
                <button 
                    v-for="skill in skills"
                    :key="skill"
                    :class="variantClass"
                    >{{skill}}</button>


            </div>
        </div>
        <!-- <button class="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition touch-manipulation">
            Guardar Perfil 
        </button> -->
        <ButtonCommon> Guardar Perfil </ButtonCommon>

    </div>
</template>
<script setup>
import PageHeader from "../../components/PageHeader.vue";
import ButtonCommon from "../../components/ButtonCommon.vue";
import InputComponent from "../../components/InputComponent.vue";
import TextAreaComponent from "../../components/TextAreaComponent.vue";

import { VARIANT_CLASS } from "../../constants/styles";

import { ref } from "vue";
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useUsuarioStore } from "../../stores/usuario";
import { useSkillsStore } from "../../stores/skills.js";
import { useToast } from "../../composables/useToast";

const { showToast } = useToast()

const authStore = useAuthStore()
const usuarioStore = useUsuarioStore()
const skillsStore = useSkillsStore()

const allSkills = computed(() => skillsStore.skills)

const selectedSkills = ref([])




</script>