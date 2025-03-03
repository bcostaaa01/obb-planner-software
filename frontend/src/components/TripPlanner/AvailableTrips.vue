<template>
    <div class="w-full mt-4">
        <div v-if="availableTrips.length > 0" class="flex flex-col gap-4">
            <AvailableTrip v-for="trip in availableTrips" :key="trip.id" :trip="trip" />
        </div>
        <div v-else class="text-center p-8 bg-white shadow-sm">
            <p class="text-gray-800">Keine Verbindungen gefunden. Bitte wähle andere Stationen.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AvailableTrip from '../TripPlanner/AvailableTrip.vue';
import { useSaveTrip } from '../../composables/useSaveTrip';

const { availableTrips } = useSaveTrip();

onMounted(() => {
    console.log(availableTrips.value);
});
</script>
