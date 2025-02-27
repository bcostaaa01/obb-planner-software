<template>
    <AppLayout>
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-4xl font-bold">{{ t('not-found.title') }}</h1>
            <div class="flex flex-col items-center justify-center">
                <p class="text-2xl mt-4">{{ t('not-found.message') }}</p>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layouts/AppLayout.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
