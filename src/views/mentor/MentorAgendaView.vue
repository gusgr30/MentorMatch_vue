<template>

<PageHeader title="Portal del Mentor" :subtitle="`Panel de control profesional para ${authStore.user?.nombre }`"/>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 class="font-bold text-lg text-indigo-900 border-b pb-2">
            Agregar Bloque Horario
        </h3>
        <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Día de la semana
            </label>
            <select v-model="selectedDay" class="w-full p-3 border rounded-xl outline-none bg-gray-50 focus:ring-2 focus:ring-indigo-500">
                <option v-for="day in days" :value="day" :key="day">{{day}}</option>
            </select>
        </div>
        <div>
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Hora de inicio
            </label>
            <input type="time" v-model="selectedTime" step="900" class="w-full p-3 border rounded-xl outline-none bg-gray-50 focus:ring-2 focus:ring-indigo-500">
        </div>

        <!-- Implementar BUTTONCOMMON -->
        <div  class="w-full flex justify-center">
            <ButtonCommon 
                variant="secundary"
                @click="agregarDisponibilidad"> Agregar Horario
            </ButtonCommon>
        </div>

    </div>
    <div class="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div class="flex justify-between items-center border-b pb-4 mb-6">
            <h3 class="font-bold text-lg text-gray-900">Tus Turnos de Atención Activos</h3>
            
            <span
                class="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
                {{ disponibilidadUsuario.length }} bloques activos   
            </span>

        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateCard
                v-for="disp in disponibilidadUsuario"
                :key="disp"
                :texto="disp"
                @click="eliminarDisponibilidad(disp)"
            />
        </div>
    </div>
</div>

</template>

<script setup>
import PageHeader from "../../components/PageHeader.vue";

import { computed, onMounted, ref } from 'vue'
import { Funnel, HouseHeart } from '@lucide/vue'
import { useAuthStore } from '../../stores/auth.js'
import { useUsuarioStore } from '../../stores/usuario.js'
import DateCard from '../../components/DateCard.vue'
import { ordenarSlots } from '../../utils/fecha.js'
import { useToast } from '../../composables/useToast.js'

import ButtonCommon from '../../components/ButtonCommon.vue'

const { showToast } = useToast()

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const diasOrden = {
    'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Miercoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6, 'Sabado': 6, 'Domingo': 7
}

const selectedDay = ref('Lunes')
const selectedTime = ref('14:00')

const authStore = useAuthStore()
const usuarioStore = useUsuarioStore()

const idUsuario = authStore.user._id
const disponibilidadUsuario = computed(() =>{
    return authStore.user.mentorProfile.disponibilidad || []
})

const agregarDisponibilidad = async () =>{
    
    if(!selectedDay.value || !selectedTime.value) return

    const dateTime = `${selectedDay.value} ${selectedTime.value}`
    
    const estaIngresado = disponibilidadUsuario.value.includes(dateTime)
    if(estaIngresado) {
        showToast("El dia y la hora seleccionada ya están ingresados.", "error")    
        return
    }
    
    disponibilidadUsuario.value.push(dateTime)
    disponibilidadUsuario.value.sort((a,b) => {
        const [diaA, horaA] = a.split(' ')
        const [diaB, horaB] = b.split(' ')
        
        if(diasOrden[diaA] !== diasOrden[diaB]) return diasOrden[diaA] - diasOrden[diaB]
        return horaA.localeCompare(horaB)
    })
    
    const payload = {mentorProfile: {disponibilidad: disponibilidadUsuario.value}}
    await usuarioStore.actualizarUsuario(idUsuario, payload)
    
    showToast("Disponibilidad agregada con éxito.", "success")    
    selectedDay.value = 'Lunes'
    selectedTime.value = '14:00' 
}

const eliminarDisponibilidad = async (dateTimeAEliminar) => {
    const index = disponibilidadUsuario.value.indexOf(dateTimeAEliminar)
    if(index === -1) return
    
    disponibilidadUsuario.value.splice(index, 1)
    const payload = {mentorProfile: {disponibilidad: disponibilidadUsuario.value}}
    await usuarioStore.actualizarUsuario(idUsuario, payload)
    showToast("Horario eliminado con éxito.", "success")    
 
}


</script>