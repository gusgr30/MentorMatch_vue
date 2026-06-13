<template>
    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-gray-400 font-bold text-xs uppercase">{{ titulo }}</p>
        <h3 class="text-3xl font-black text-{{color}}-600 mt-2">{{valor}}</h3>
    </div>
</template>
<script setup>
    import { computed } from "vue";
    import { reservasPendientes, reservasConfirmadas, ingresosEstimados } from "../views/mentor/MentorDashboardView.vue/index.js";
    import { defineProps } from "vue";

    defineProps({titulo: String}, {valor: Number}, {color: String})
    

</script>