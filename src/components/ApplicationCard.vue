<template>
    <div
        class="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition">
        <div class="flex items-center gap-4">
            <div
                class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                {{iniciales}}
            </div>
            <div>
                <h4 class="font-bold text-gray-900 text-lg">{{ reserva.student.nombre }}</h4>
                <p class="text-sm text-gray-500 font-semibold flex items-center gap-1 mt-1"><i class="far fa-clock"></i>
                    Horario: <span class="text-indigo-600 font-bold">{{fechaYHora}}</span></p>
            </div>
            <span :class="[coloresMap[reserva.estado.toUpperCase()],'px-3 py-1.5 rounded-full text-xs font-bold border']">
                {{reserva.estado.toUpperCase()}}
            </span>
        </div>
        <div class="mr-2">
            <!-- input de zoom, solo visible si la reserva esta pendiente -->
             <input
                v-if="reserva.estado === ESTADOS_RESERVA.PENDIENTE || modoEdicion"
                type="text"
                v-model="linkZoom"  
                placeholder="Pegá el link de la reunión."
                class="border broder-gray-200 rounded-lg px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-indigo-500"
            >

            <!-- link clickeable a la reunion, solo si esta confirmada -->
            <a
                v-else-if="reserva.estado === ESTADOS_RESERVA.CONFIRMADA && reserva.urlZoom && !modoEdicion"
                :href="reserva.urlZoom"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 font-bold hover:text-indigo-800 text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition"
            >
                <i class="fas fa-video"></i> Ir a la reunión
            </a>
        </div>
        <div class="flex items-center gap-3 w-full md:w-auto justify-end">
            <!-- Acciones del Mentor -->
            <div class="flex gap-2">
                <ButtonCommon v-if="reserva.estado === ESTADOS_RESERVA.PENDIENTE" variant="primary" @click="confirmarReserva"> Confirmar </ButtonCommon>
                <ButtonCommon v-if="reserva.estado === ESTADOS_RESERVA.CONFIRMADA && !modoEdicion" variant="warning" @click="activarEdicion"> Editar </ButtonCommon>
                <ButtonCommon v-if="reserva.estado === ESTADOS_RESERVA.CONFIRMADA && modoEdicion" variant="primary" @click="guardarEdicion"> Guardar </ButtonCommon>
                <ButtonCommon variant="danger" @click="cancelarReserva"> Cancelar </ButtonCommon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ButtonCommon from "./ButtonCommon.vue";
import { obtenerIniciales } from "../utils/utils.js";
import { ESTADOS_RESERVA } from "../constants/index.js";
import { setFecha } from "../utils/utils.js";
import { useReservaStore } from "../stores/reserva.js";

const reservaStore = useReservaStore()

const props = defineProps({
    reserva: Object
})

const iniciales = computed(() => obtenerIniciales(props.reserva.student.nombre))

const linkZoom = ref("")
const modoEdicion = ref(false)

const activarEdicion = () => {
    modoEdicion.value = true
    linkZoom.value = props.reserva.urlZoom
}

const fechaYHora = setFecha(props.reserva.fechaHora)

const coloresMap = {
    PENDIENTE: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    CONFIRMADA: 'bg-green-50 text-green-700 border-green-200',
    CANCELADA: 'bg-red-50 text-red-700 border-red-200'
}

const confirmarReserva = async() => {
    if(!linkZoom.value){
        alert("Debes completar el link del zoom para confirmar la reserva")    //Despues implementar SweetAlert
        return
    }

    await reservaStore.confirmarReserva(props.reserva._id, linkZoom.value)
}

const cancelarReserva = async() => {
    await reservaStore.cancelarReserva(props.reserva._id)
}


const guardarEdicion = async() => {
    if(!linkZoom.value){
        alert("El link no puede estar vacío")
        return
    }

    await reservaStore.actualizarReserva(props.reserva._id, linkZoom.value)
    modoEdicion.value = false
}

</script>