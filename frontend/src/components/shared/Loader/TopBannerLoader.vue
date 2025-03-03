<template>
    <div class="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden">
        <div class="h-full bg-blue-500 animate-progress-bar" :style="{ width: loading ? '100%' : '0%' }"></div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
@keyframes progress {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

.animate-progress-bar {
    animation: progress 2s ease-in-out;
    transition: width 0.3s ease;
}
</style>