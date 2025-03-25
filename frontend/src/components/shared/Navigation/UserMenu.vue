<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl text-center text-gray-600">{{ t('auth.welcome') + ' ' + userFirstName }}</h1>

        <nav class="flex flex-col gap-2">
            <MenuLink href="/user-trips" :icon="faTrainTram" :label="t('user-trips.title')" />
            <MenuLink href="/user-settings" :icon="faUser" :label="t('user-settings.title')" />
        </nav>

        <button @click="onSignOut" class="text-red-700 cursor-pointer">
            {{ t('auth.logout') }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrainTram, faUser } from '@fortawesome/free-solid-svg-icons';
import MenuLink from './MenuLink.vue';

const { t } = useI18n();

defineProps<{
    userFirstName: string
}>();

const emit = defineEmits<{
    (e: 'signOut'): void
}>();

const onSignOut = () => {
    emit('signOut');
};
</script>
