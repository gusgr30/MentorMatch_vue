<template>
    <div>
        <label :class="VARIANT_CLASS.LABEL">
            {{ props.label.toUpperCase() }}
        </label>
        <div class="relative">
            <input 
                :type="inputType" 
                v-model="modelValue" 
                :placeholder="props.placeholder"      
                :disabled="props.disabled"
                :class="variantClass">

            <button 
                v-if="props.type === 'password'" 
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition"
            >
                <EyeOff v-if="!isPasswordVisible" :size="20" />
                <Eye v-else :size="20" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { VARIANT_CLASS } from '../constants/styles.js'
import { Eye, EyeOff, ToggleLeft } from '@lucide/vue'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const modelValue = defineModel()


const variantClass = computed(() => {
  if (props.disabled) return VARIANT_CLASS.DISABLED

  return VARIANT_CLASS.DEFAULT
})

const isPasswordVisible = ref(false)

const inputType = computed(() => {
    if(props.type === 'password' && isPasswordVisible.value) return 'text'
    
    return props.type
})

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}



</script>
