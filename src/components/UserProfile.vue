<template>
    <div class="max-w-3xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 class="font-bold text-xl text-gray-900 border-b pb-3 mb-6">Editar Datos Personales</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <InputComponent :disabled="isSaved" label="Nombre Completo" type="text" v-model="formData.nombreCompleto" />
            <InputComponent :disabled="isSaved" label="Email" type="email" v-model="formData.email" />
            <InputComponent :disabled="isSaved" label="Contraseña" type="password" v-model="formData.password" />

            <div class="flex flex-col gap-2 md:col-span-2">
                <label class="text-xs font-bold text-slate-400 uppercase">FOTO DE PERFIL</label>
                <div class="flex items-center gap-4">
                    <div class="relative shrink-0">
                        <img :src="fotoPreview || resolverFoto(authStore.user.fotoUrl, authStore.user.nombre)"
                            class="w-14 h-14 rounded-full object-cover border border-base-300" />
                        <button v-if="fotoPreview" type="button" @click="quitarFoto"
                            class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition">
                            ✕
                        </button>
                    </div>
                    <input :disabled="isSaved" ref="fotoInputRef" type="file" accept="image/*" class="file-input w-full" @change="onFotoChange" />
                </div>
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
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useUsuarioStore } from "../stores/usuario";
import { useToast } from "../composables/useToast";
import { resolverFoto } from "../utils/fecha.js";


const { showToast } = useToast()

const authStore = useAuthStore()
const usuarioStore = useUsuarioStore()

const isSaved = ref(true)

const formData = ref({
    nombreCompleto: authStore.user.nombre,
    email: authStore.user.email
})

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

const toggleEdit = () => {
    isSaved.value = !isSaved.value
}

const guardarPerfil = async () => {
    try{
        const fd = new FormData()
        fd.append('nombre', formData.value.nombreCompleto)
        fd.append('email', formData.value.email)
        if (formData.value.password) fd.append('password', formData.value.password)
        if (fotoArchivo.value) fd.append('fotoUrl', fotoArchivo.value)

        await usuarioStore.actualizarUsuario(authStore.user._id, fd)

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
    quitarFoto()
    toggleEdit()
}
</script>