<template>
    <div>
        <label :class="VARIANT_CLASS.LABEL">
            {{ props.label.toUpperCase() }}
        </label>
        <input 
            :type="props.type" 
            v-model="modelValue" 
            :placeholder="props.placeholder"      
            :disabled="props.disabled"
            :class="variantClass">
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { VARIANT_CLASS } from '../constants/styles.js'

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
  if (props.disabled) return VARIANT_CLASS.DISABLED //modificar estilo para el boton disabled

  return VARIANT_CLASS.DEFAULT
})

</script>
