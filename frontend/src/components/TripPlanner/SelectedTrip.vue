<template>
    <div class="flex flex-col bg-white shadow-md p-4 w-full">
        <div class="flex justify-between items-center mb-6">
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
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowsTurnToDots } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();

const props = defineProps({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    checkboxLabel: {
        type: String,
        default: "Beste Fahrkarte"
    }
});

const bestFareChecked = ref(false);
const isReversed = ref(false);
const filtersChecked = ref(false);

const currentDeparture = computed(() => isReversed.value ? props.destination : props.departure);
const currentDestination = computed(() => isReversed.value ? props.departure : props.destination);

function toggleDirection() {
    isReversed.value = !isReversed.value;
}

function toggleBestFare() {
    bestFareChecked.value = !bestFareChecked.value;
}

function toggleFilters() {
    filtersChecked.value = !filtersChecked.value;
}
</script>