<template>
    <div class="flex flex-row justify-between p-4 bg-white shadow-sm">
        <div class="flex flex-row cursor-pointer hover:bg-gray-100 transition-colors duration-200">
            <div class="flex flex-col pr-4 mr-4 relative">
                <TimeDisplay :time="trip.startTime" />
                <TimeDisplay :time="trip.endTime || ''" />
            </div>
            <div class="flex flex-col pl-2 ml-4 justify-between">
                <StationDisplay :station-name="trip.startStation" />
                <StationDisplay :station-name="trip.endStation" />
            </div>
        </div>

        <div class="flex flex-row items-center gap-8">
            <div class="flex flex-col cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                <h3 class="text-gray-600 text-sm mb-1">{{ t('cart.who-is-going') }}</h3>
                <PassengerInfo v-if="trip.passenger" :count="trip.passenger.count" :type="trip.passenger.type"
                    :discount="trip.passenger.discount" />
            </div>
            <div class="flex flex-col items-end cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                <h3 class="text-gray-600 text-sm mb-1">{{ t('cart.one-way-journey') }}</h3>
                <span class="text-2xl font-bold">€{{ trip.price?.toFixed(2) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Trip } from '../../types/Trip';
import TimeDisplay from './TimeDisplay.vue';
import StationDisplay from './StationDisplay.vue';
import PassengerInfo from './PassengerInfo.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    trip: Trip;
}>();
</script>