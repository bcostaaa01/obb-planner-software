<template>
    <div class="flex top-0 z-50 w-full py-4 pl-5 bg-gray-100 border-b border-gray-200">
        <router-link to="/" class="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Logo_%C3%96BB.svg/1200px-Logo_%C3%96BB.svg.png"
                class="h-6" />
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
