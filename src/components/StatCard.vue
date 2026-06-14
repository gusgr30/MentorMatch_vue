<template>
    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-gray-400 font-bold text-xs uppercase">{{ titulo }}</p>
        <h3 :class="['text-3xl font-black mt-2', coloresMap[color]]"><slot></slot>{{ valor }}</h3>
    </div>
</template>

<script setup>
    const props = defineProps({
        titulo: String,
        valor: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: 'blue' // Siempre es buena práctica poner un default
        }
    })
    
    const coloresMap = {
        green: 'text-green-600',
        yellow: 'text-yellow-600',
        indigo: 'text-indigo-600',
        orange: 'text-orange-600'
    }
</script>