<template>
    <div
        class="mb-8 border-b pb-4 hidden md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-indigo-900">Portal del Mentor</h1>
            <p class="text-gray-500 mt-1">Panel de control profesional para {{ store.activeMentor.nombre }}</p>
        </div>
    </div>
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard titulo="CLASES POR CONFIRMAR" :valor="reservasPendientes" :color="yellow" />
            <StatCard titulo="CONFIRMADAS" :valor="reservasConfirmadas" :color="green" />
            <StatCard titulo="INGRESOS ESTIMADOS" :valor="ingresosEstimados" :color="indigo" />
        </div>
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Solicitudes de Alumnos</h3>
            </div>
            <div class="divide-y divide-gray-100">

            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useMentorStore } from "../../stores/mentorStore.js";
import { ESTADOS_RESERVA } from "../../constants/index.js";
import StatCard from "../components/StatCard.vue";


const store = useMentorStore();
const reservasPendientes = computed(() => store.reservas.filter(res =>
    res.reservaGuardada.mentorId === store.activeMentorId
    && res.reservaGuardada.estado === ESTADOS_RESERVA.PENDIENTE
).length);
const reservasConfirmadas = computed(() => store.reservas.filter(res =>
    res.reservaGuardada.mentorId === store.activeMentorId
    && res.reservaGuardada.estado === ESTADOS_RESERVA.CONFIRMADA
).length);
const ingresosEstimados = computed(() => reservasConfirmadas.value * store.activeMentor.mentorProfile.tarifa);

</script>
