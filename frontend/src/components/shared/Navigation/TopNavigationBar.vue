<template>
    <div class="flex top-0 z-50 w-full bg-red-900 py-4 pl-10">
        <router-link to="/">
            <span class="text-white text-2xl font-bold cursor-pointer">{{ t('nav-bar.title') }}</span>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
