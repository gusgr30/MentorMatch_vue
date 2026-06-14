<template>
    <div
        class="mb-8 border-b pb-4 hidden md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-indigo-900">Portal del Mentor</h1>
            <p class="text-gray-500 mt-1">Panel de control profesional para {{ authStore.user.nombre }}</p>
        </div>
    </div>
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard titulo="CLASES POR CONFIRMAR" :valor="reservasPendientes" color="yellow" />
            <StatCard titulo="CONFIRMADAS" :valor="reservasConfirmadas" color="green" />
            <StatCard titulo="INGRESOS ESTIMADOS" :valor="ingresosEstimados" color="indigo">$</StatCard>
        </div>
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <h3 class="font-bold text-lg text-gray-900">Solicitudes de Alumnos</h3>
            </div>
            <div class="divide-y divide-gray-100">
                <ApplicationCard
                    v-for="reserva in reservaStore.reservas"
                    :key="reserva._id"
                    :reserva="reserva"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed } from "vue";
import { onMounted } from "vue";
import { ESTADOS_RESERVA } from "../../constants/index";
import { useReservaStore } from "../../stores/reserva";
import { useAuthStore } from "../../stores/auth";
import StatCard from "../../components/StatCard.vue";
import ApplicationCard from "../../components/ApplicationCard.vue";

const authStore = useAuthStore();
const reservaStore = useReservaStore();

onMounted(async() =>{
    await reservaStore.getReservas(authStore.user._id)
})

const reservasPendientes = computed(() => reservaStore.cantidadPendientes);
const reservasConfirmadas = computed(() => reservaStore.cantidadConfirmadas);
const ingresosEstimados = computed(() => reservasConfirmadas.value * authStore.user.mentorProfile.tarifa);

</script>
