<template>
    <div class="flex top-0 z-50 w-full bg-red-900 py-4 pl-10">
        <span class="text-white text-2xl font-bold">{{ t('nav-bar.title') }}</span>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
