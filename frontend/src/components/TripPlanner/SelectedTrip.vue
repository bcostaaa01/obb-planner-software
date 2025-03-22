<template>
    <div class="flex flex-col bg-white shadow-md p-4 w-full">
        <div class="flex flex-col mb-6">
            <h2 class="text-xl text-gray-900">{{ currentDeparture }} › {{ currentDestination }}</h2>
        </div>
        <div class="flex justify-between items-center">
            <div class="flex items-center">
                <button class="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2"
                    @click="toggleBestFare">
                    <input type="checkbox" class="mr-2" v-model="bestFareChecked" />
                    <span class="text-sm">{{ checkboxLabel }}</span>
                </button>
                <button class="text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2 ml-2"
                    @click="toggleDirection">
                    <FontAwesomeIcon :icon="faArrowsTurnToDots" class="mr-2" />
                    {{ t('trip-planner.direction') }}
                </button>
                <button class="text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2 ml-2"
                    @click="toggleFilters">
                    <svg class="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {{ t('trip-planner.filters') }}
                </button>
            </div>
            <span class="text-lg">{{ date }} {{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowsTurnToDots } from '@fortawesome/free-solid-svg-icons';
import { useSaveTrip } from '../../composables/useSaveTrip';
import { useTripDirection } from '../../composables/useTripDirection';
import { useTripFilters } from '../../composables/useTripFilters';

const { t } = useI18n();
const { savedTrip } = useSaveTrip();

const {
    toggleDirection,
    updateAvailableTrips,
    isLoading,
    currentDeparture,
    currentDestination
} = useTripDirection();

const {
    bestFareChecked,
    filtersChecked,
    toggleBestFare,
    toggleFilters
} = useTripFilters();

defineProps<{
    date: string;
    time: string;
    checkboxLabel: string;
}>();

watch(savedTrip, () => {
    updateAvailableTrips();
}, { immediate: true });

onMounted(() => {
    updateAvailableTrips();
});
</script>