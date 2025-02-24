<template>
    <div class="flex flex-col bg-white shadow-md p-4 w-full">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">{{ departure }} › {{ destination }}</h2>
            <div class="flex items-center">
                <input type="checkbox" class="mr-2" v-model="bestFareChecked" />
                <span class="text-sm">{{ t('trip-planner.best-fare') }}</span>
            </div>
        </div>
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center">
                <span class="text-sm">{{ t('trip-planner.direction') }}</span>
                <svg class="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="text-sm">{{ t('trip-planner.filters') }}</span>
            </div>
            <span class="text-lg font-semibold">{{ date }} {{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();

defineProps({
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

const bestFareChecked = ref(false);
</script>