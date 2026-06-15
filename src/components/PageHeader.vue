<template>
    <div class="mb-8 border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-indigo-900">{{ title }}</h1>
            <p class="text-gray-500 mt-1">{{ subtitle }}</p>
        </div>
        
        <!-- por si tenemos que agregar botones dps -->
        <div v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    }
})
</script>