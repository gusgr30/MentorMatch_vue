<template>
            <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-row justify-between items-center">
                <div class="flex flex-row justify-between items-center gap-3">
                    <CalendarDays :size="18" :stroke-width="2.5" color="indigo" /> 
                    <span class="font-bold text-gray-700"> {{texto}} </span>
                </div>
                <button
                    class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition touch-manipulation"  
                    @click="$emit(`click`)"
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
defineEmits(['click'])

</script>


 <!-- @click="$emit('clickCard', mentor._id)" -->