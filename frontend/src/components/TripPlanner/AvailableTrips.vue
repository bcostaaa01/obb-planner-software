<template>
    <div class="w-full mt-4">
        <div v-if="availableTrips.length > 0" class="flex flex-col gap-4">
            <div class="text-gray-700 mb-4">
                {{ t('trip-planner.showing-trips-for') }} {{ formatDate(selectedDate) }}
            </div>
            <AvailableTrip v-for="trip in availableTrips" :key="trip.id" :trip="trip" />
        </div>
        <div v-else class="text-center p-8 bg-white shadow-sm">
            <p class="text-gray-800">
                {{ t('trip-planner.no-trips-available-for-date', { date: formatDate(selectedDate) }) }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AvailableTrip from './AvailableTrip.vue';
import { useSaveTrip } from '../../composables/useSaveTrip';

const { t } = useI18n();
const { availableTrips, savedTrip } = useSaveTrip();

const selectedDate = computed(() => savedTrip.value?.date || '');

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
};

onMounted(() => {
    console.log('Available trips:', availableTrips.value);
    console.log('Selected date:', selectedDate.value);
});
</script>
