<template>
    <div class="flex flex-col bg-gray-50 h-screen">
        <TopNavigationBar />
        <slot />
    </div>
</template>

<script setup lang="ts">
import TopNavigationBar from '../shared/Navigation/TopNavigationBar.vue';
</script>
