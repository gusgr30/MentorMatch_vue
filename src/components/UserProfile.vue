<template>
    <div class="max-w-3xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 class="font-bold text-xl text-gray-900 border-b pb-3 mb-6">Editar Datos Personales</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
            <InputComponent :disabled="isSaved" label="Nombre Completo" type="text" v-model="formData.nombreCompleto" />     
            <InputComponent :disabled="isSaved" label="Email" type="email" v-model="formData.email" />
            <InputComponent :disabled="isSaved" label="contraseña" type="password" v-model="formData.password" />

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

import { onMounted, ref } from "vue";
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useUsuarioStore } from "../stores/usuario";
import { useToast } from "../composables/useToast";


const { showToast } = useToast()

const authStore = useAuthStore()
const usuarioStore = useUsuarioStore()

const isSaved = ref(true)

const formData = ref({
    nombreCompleto: authStore.user.nombre,
    email: authStore.user.email
})

const toggleEdit = () => {
    isSaved.value = !isSaved.value
}

const guardarPerfil = async () => {
    try{
        const payload = {
            nombre: formData.value.nombreCompleto,
            email: formData.value.email,
            password: formData.value.password
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
    
    formData.value.nombreCompleto = authStore.user.nombre
    formData.value.email = authStore.user.email
    formData.value.password = ""

    toggleEdit()
}
</script>