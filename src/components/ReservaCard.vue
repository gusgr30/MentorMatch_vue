<template>
    <div class="flex items-center justify-between bg-white border border-base-200 rounded-2xl px-4 py-3 shadow-sm">

        <div class="flex items-center gap-4">
            <img :src="reserva.reservaGuardada.fotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${nombre}`"
                class="w-12 h-12 rounded-xl border border-base-200" alt="Foto Perfil" />
            <div>
                <p class="font-bold text-base-content">{{ nombre }}</p>
                <p class="text-primary text-sm font-semibold flex items-center gap-1">
                    <CalendarClock :size="14" />
                    {{ reserva.reservaGuardada.slot }}
                </p>
                <p class="text-primary text-sm font-semibold flex items-center gap-1">
                    <Video :size="16" />
                    {{ reserva.reservaGuardada.urlZoom || "-" }}
                </p>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <StatusBadge :estado="reserva.reservaGuardada.estado" />
            <ButtonCommon v-if="reserva.reservaGuardada.estado != ESTADOS_RESERVA.CANCELADA" variant="danger"
                @click="$emit('cancelar', reserva)">
                Cancelar
            </ButtonCommon>
        </div>

    </div>
</template>

<script setup>
import { CalendarClock,Video } from '@lucide/vue'
import ButtonCommon from './ButtonCommon.vue'
import StatusBadge from './StatusBadge.vue'
import { ESTADOS_RESERVA } from '../constants/index.js'

defineProps({
    reserva: {
        type: Object,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
})

defineEmits(['cancelar'])
</script>
