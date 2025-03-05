<template>
    <div class="flex flex-row">
        <span class="font-bold text-2xl">{{ hours }}</span>
        :
        <span class="font-semibold text-2xl">{{ minutes }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    time: string;
}>();

const hours = computed(() => props.time.slice(0, 2));
const minutes = computed(() => props.time.slice(3, 5));
</script>