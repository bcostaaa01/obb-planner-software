<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1>{{ t('home.title') }}</h1>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>