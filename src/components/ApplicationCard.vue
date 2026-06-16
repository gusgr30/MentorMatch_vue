<template>
    <div class="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50 transition">

        <!-- Columnas 1 y 2: lado izquierdo -->
        <div class="flex items-center gap-6 flex-1">
            <!-- Columna 1: datos del alumno -->
            <div class="flex items-center gap-4 min-w-75">
                <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 shrink-0">
                    {{ iniciales }}
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 text-lg">{{ reserva.student.nombre }}</h4>
                    <p class="text-primary text-sm font-semibold flex items-center gap-1 mt-1">
                        <CalendarClock :size="14" />
                        {{ fechaYHora }}
                    </p>
                    <p class="text-primary text-sm font-semibold flex items-center gap-1">
                        <Video :size="14" />
                        {{ reserva.urlZoom || '-' }}
                    </p>
                </div>
            </div>

            <!-- Columna 2: estado -->
            <div class="w-32 flex justify-center shrink-0">
                <span :class="[coloresMap[reserva.estado.toUpperCase()], 'px-3 py-1.5 rounded-full text-xs font-bold border']">
                    {{ reserva.estado.toUpperCase() }}
                </span>
            </div>
        </div>

        <!-- Columna 3: botones -->
        <div class="flex items-center gap-3 shrink-0">
            <a
                v-if="reserva.estado === ESTADOS_RESERVA.CONFIRMADA && reserva.urlZoom"
                :href="reserva.urlZoom"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 font-bold hover:text-indigo-800 text-sm flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition"
            >
                <i class="fas fa-video"></i> Ir a la reunión
            </a>
            <div class="flex gap-2">
                <ButtonCommon v-if="reserva.estado === ESTADOS_RESERVA.PENDIENTE" variant="primary" @click="abrirModalConfirmar"> Confirmar </ButtonCommon>
                <ButtonCommon v-if="reserva.estado === ESTADOS_RESERVA.CONFIRMADA" variant="warning" @click="abrirModalEditar"> Editar </ButtonCommon>
                <ButtonCommon variant="danger" :disabled="reserva.estado === ESTADOS_RESERVA.CANCELADA" @click="abrirModalCancel"> Cancelar </ButtonCommon>
            </div>
        </div>

    </div>

    <ModalConfirmarReserva ref="modalConfirmarRef" :reserva="reserva" @confirmar="onConfirmarReserva" />
    <ModalCancel ref="modalCancelRef" :reserva="reserva" rol="mentor" @confirmar="onConfirmarCancel" />
    <ModalEditarReserva ref="modalEditarRef" :reserva="reserva" @confirmar="onConfirmarEdicion" />
</template>

<script setup>
import { computed, ref } from "vue";
import { CalendarClock, Video } from "@lucide/vue";
import ButtonCommon from "./ButtonCommon.vue";
import ModalConfirmarReserva from "./ModalConfirmarReserva.vue";
import ModalCancel from "./ModalCancel.vue";
import ModalEditarReserva from "./ModalEditarReserva.vue";
import { obtenerIniciales } from "../utils/utils.js";
import { ESTADOS_RESERVA } from "../constants/index.js";
import { formatearFecha } from "../utils/fecha.js";
import { useReservaStore } from "../stores/reserva.js";
import { useToast } from "../composables/useToast.js";

const reservaStore = useReservaStore()
const { showToast } = useToast()

const modalConfirmarRef = ref(null)
const modalCancelRef = ref(null)
const modalEditarRef = ref(null)

const props = defineProps({
    reserva: Object
})

const iniciales = computed(() => obtenerIniciales(props.reserva.student.nombre))
const fechaYHora = computed(() => formatearFecha(props.reserva.fechaHora))

const coloresMap = {
    PENDIENTE: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    CONFIRMADA: 'bg-green-50 text-green-700 border-green-200',
    CANCELADA: 'bg-red-50 text-red-700 border-red-200'
}

const abrirModalConfirmar = () => {
    modalConfirmarRef.value?.open()
}

const onConfirmarReserva = async ({ reserva, linkZoom }) => {
    try {
        modalConfirmarRef.value.setLoading(true)
        await reservaStore.confirmarReserva(reserva._id, linkZoom)
        modalConfirmarRef.value.setLoading(false)
        modalConfirmarRef.value.close()
        showToast('Reserva confirmada correctamente', 'success')
    } catch {
        modalConfirmarRef.value.setLoading(false)
        showToast('Error al confirmar la reserva', 'error')
    }
}

const abrirModalCancel = () => {
    modalCancelRef.value?.open()
}

const onConfirmarCancel = async (reserva) => {
    try {
        modalCancelRef.value.setLoading(true)
        await reservaStore.cancelarReserva(reserva._id)
        modalCancelRef.value.setLoading(false)
        modalCancelRef.value.close()
        showToast('Reserva cancelada correctamente', 'success')
    } catch {
        modalCancelRef.value.setLoading(false)
        showToast('Error al cancelar la reserva', 'error')
    }
}

const abrirModalEditar = () => {
    modalEditarRef.value?.open()
}

const onConfirmarEdicion = async ({ reserva, linkZoom: nuevoLink }) => {
    try {
        modalEditarRef.value.setLoading(true)
        await reservaStore.actualizarReserva(reserva._id, nuevoLink)
        modalEditarRef.value.setLoading(false)
        modalEditarRef.value.close()
        showToast('Reserva actualizada correctamente', 'success')
    } catch {
        modalEditarRef.value.setLoading(false)
        showToast('Error al actualizar la reserva', 'error')
    }
}
</script>
