<template>
    <div v-if="loading" class="flex flex-col gap-4 w-full">
        <div class="animate-pulse p-2 space-y-3">
            <div class="h-3 w-full bg-gray-200 rounded-md"></div>
            <div class="h-3 w-full bg-gray-200 rounded-md"></div>
            <div class="h-3 w-full bg-gray-200 rounded-md"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    loading: boolean;
}>();
</script>
