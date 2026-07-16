<template>
    <div class="mb-6">
        <div class="flex items-center justify-between">
            <label :class="VARIANT_CLASS.LABEL">
            {{props.label.toUpperCase()}}
            </label>
            <slot name="actions"></slot>
        </div>
        <textarea
            rows="4" 
            v-model="modelValue" 
            :placeholder="props.placeholder" 
            :disabled="props.disabled" 
            :class="`${variantClass} leading-relaxed`"
        ></textarea>
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