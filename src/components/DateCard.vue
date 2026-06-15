<template>
            <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-row justify-between items-center">
                <span class="font-bold text-gray-700">
                    <CalendarDays :size="18" :stroke-width="2.5" color="indigo" /> {{texto}}
                </span>
                <button
                    class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition touch-manipulation"  
                    >
                        <Trash2 :size="20" :stroke-width="2.5" color="red" />
                </button>
            </div>
</template>

<script setup>
import { CalendarDays, Trash2 } from '@lucide/vue'

const props = defineProps({
    texto: String
})

</script>


 <!-- @click="$emit('clickCard', mentor._id)" -->