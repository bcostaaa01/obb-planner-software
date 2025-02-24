<template>
    <div class="flex flex-col h-screen">
        <TopNavigationBar />
        <slot />
    </div>
</template>

<script setup lang="ts">
import TopNavigationBar from '../shared/Navigation/TopNavigationBar.vue';
</script>
