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
        <div class="flex items-center gap-3 w-full md:w-auto justify-end">

            <!-- Acciones del Mentor -->
            <div class="flex gap-2">
                <ButtonCommon v-if="reserva.estado === ESTADOS_RESERVA.PENDIENTE" variant="primary"> Confirmar </ButtonCommon>
                <ButtonCommon variant="danger"> Cancelar </ButtonCommon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import ButtonCommon from "./ButtonCommon.vue";
import { obtenerIniciales } from "../utils/utils.js";
import { ESTADOS_RESERVA } from "../constants/index.js";
import { setFecha } from "../utils/utils.js";


const props = defineProps({
    reserva: Object
})

const iniciales = computed(() => obtenerIniciales(props.reserva.student.nombre))

const fechaYHora = setFecha(props.reserva.fechaHora)

const coloresMap = {
    PENDIENTE: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    CONFIRMADA: 'bg-green-50 text-green-700 border-green-200',
    CANCELADA: 'bg-red-50 text-red-700 border-red-200'
}

</script>