<template>
    <PageHeader title="Portal del Mentor" :subtitle="`Panel de control profesional para ${authStore.user?.nombre }`"/>

</template>
<script setup>
import PageHeader from "../../components/PageHeader.vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();


</script>