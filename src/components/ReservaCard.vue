<template>
    <div class="flex items-center justify-between bg-white border border-base-200 rounded-2xl px-4 py-3 shadow-sm">

        <!-- Lado izquierdo: info + estado -->
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-4 min-w-74">
                <img :src="resolverFoto(fotoUrl, nombre)"
                    @error="(e) => e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nombre}`"
                    class="w-12 h-12 rounded-xl border border-base-200 shrink-0" alt="Foto Perfil" />
                <div>
                    <p class="font-bold text-base-content">{{ nombre }}</p>
                    <p class="text-primary text-sm font-semibold flex items-center gap-1">
                        <CalendarClock :size="14" />
                        {{ fechaFormateada }}
                    </p>
                    <p class="text-primary text-sm font-semibold flex items-center gap-1">
                        <Video :size="16" />
                        {{ reserva.urlZoom || "-" }}
                    </p>
                </div>
            </div>

            <StatusBadge :estado="reserva.estado" />
        </div>

        <!-- Lado derecho: botones -->
        <div class="flex items-center gap-3 shrink-0">
            <a v-if="reserva.estado === ESTADOS_RESERVA.CONFIRMADA && reserva.urlZoom"
                :href="reserva.urlZoom"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 font-bold hover:text-indigo-800 text-sm flex items-center gap-1 bg-indigo-50 px-3 py-2 rounded-xl transition">
                <Video :size="14" /> Ir a la reunión
            </a>
            <ButtonCommon variant="danger"
                :disabled="reserva.estado === ESTADOS_RESERVA.CANCELADA"
                @click="$emit('cancelar', reserva)">
                Cancelar
            </ButtonCommon>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { CalendarClock, Video } from '@lucide/vue'
import { resolverFoto } from '../utils/utils.js'
import { formatearFecha } from '../utils/fecha.js'
import ButtonCommon from './ButtonCommon.vue'
import StatusBadge from './StatusBadge.vue'
import { ESTADOS_RESERVA } from '../constants/index.js'

const props = defineProps({
    reserva: {
        type: Object,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    fotoUrl: {
        type: String,
        default: null,
    },
})

const fechaFormateada = computed(() => formatearFecha(props.reserva.fechaHora))

defineEmits(['cancelar'])
</script>
