<template>
    <div class="flex flex-row items-center">
        <span class="text-gray-800 text-xl pl-4">{{ stationName }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    stationName: string;
}>();
</script>