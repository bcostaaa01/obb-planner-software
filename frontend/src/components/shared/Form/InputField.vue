<template>
    <div class="flex flex-col">
        <fwb-input :id="id" :label="label" :model-value="modelValue" :required="required" type="text" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { FwbInput } from 'flowbite-vue';

defineProps<{
    id: string;
    label: string;
    modelValue: string;
    required: boolean;
    size: string;
}>();
</script>
