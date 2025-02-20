<template>
    <div class="flex flex-col h-screen">
        <TopNavigationBar />
        <div class="flex flex-col items-center justify-center h-screen">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import TopNavigationBar from '../components/shared/Navigation/TopNavigationBar.vue';

const { t } = useI18n();
</script>