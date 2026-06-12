<template>
    <div>
        <header class="mb-10 text-center md:text-left">
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
                Mis mentorías reservadas
            </h1>
            <h4>Seguimiento de tus solicitudes y estado de confirmación.</h4>
        </header>

        <div v-if="reservas.length" class="flex flex-col gap-3">
            <ReservaCard v-for="reserva in reservas" :key="reserva.reservaGuardada._id" :reserva="reserva" :nombre="reserva.mentorObj.nombre"
                @cancelar="abrirModalCancel" />
        </div>

        <div v-else class="text-center text-base-content/40 mt-20">
            <p class="text-lg font-semibold">No tenés mentorías reservadas aún.</p>
        </div>

        <ModalCancel ref="modalCancelRef" :reserva="reservaSeleccionada" @confirmar="onConfirmarCancel" />
    </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import ReservaCard from '../../components/ReservaCard.vue'
import ModalCancel from '../../components/ModalCancel.vue'
import { reservas as reservasMock } from '../../mocks/reservas.js'

const reservas = ref(reservasMock)
const reservaSeleccionada = ref(null)
const modalCancelRef = useTemplateRef('modalCancelRef')

const abrirModalCancel = (reserva) => {
    reservaSeleccionada.value = reserva
    modalCancelRef.value?.open()
}

const onConfirmarCancel = async (reserva) => {
    // acá va el cancelarReserva del backend
    modalCancelRef.value.setLoading(true)
    console.log('Cancelar reserva:', reserva._id)
    modalCancelRef.value.close()
    modalCancelRef.value.setLoading(false)
}
</script>
