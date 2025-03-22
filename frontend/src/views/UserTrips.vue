<template>
    <AppLayout>
        <div class="flex flex-col gap-4 p-4">
            <span class="text-2xl text-gray-900 mb-4">{{ t('user-trips.title') }}</span>
            <div class="flex flex-col gap-4" v-if="trips.length > 0">
                <UserTrip v-for="trip in trips" :key="trip.id" :trip="trip" />
            </div>
            <div class="flex flex-col gap-4" v-else>
                <span class="text-lg text-gray-500">{{ t('user-trips.no-trips') }}</span>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layouts/AppLayout.vue';
import { ref, onMounted } from 'vue';
import type { ExtendedTrip } from '../types/Trip';
import { useTripsStore } from '../stores/Trips.store';
import UserTrip from '../components/UserTrips/UserTrip.vue';
import { useI18n } from 'vue-i18n';

const tripsStore = useTripsStore();
const trips = ref<ExtendedTrip[]>([]);
const { t } = useI18n();

onMounted(async () => {
    try {
        trips.value = await tripsStore.fetchUserTrips();
        console.log('Fetched trips:', trips.value);
    } catch (error) {
        console.error('Error fetching trips:', error);
    }
});
</script>