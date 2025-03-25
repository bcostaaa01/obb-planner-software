<template>
    <a :href="href" class="cursor-pointer flex items-center justify-center">
        <FontAwesomeIcon :icon="icon" class="w-4 h-4 mr-2" />
        <span class="text-gray-500 text-md">{{ label }}</span>
    </a>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

defineProps<{
    href: string
    icon: IconDefinition
    label: string
}>();
</script>
