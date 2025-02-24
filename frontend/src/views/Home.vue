<template>
    <AppLayout>
        <div class="flex flex-col"
            style="background-image: url('https://image.kurier.at/images/cfs_landscape_616w_347h/8685779/bildschirmfoto2024-04-26um081350.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div class="flex flex-col items-center justify-center h-screen relative">
                <div class="absolute right-0 bottom-10 m-4">
                    <TripPlannerForm />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppLayout from '../components/layouts/AppLayout.vue';
import TripPlannerForm from '../components/TripPlanner/TripPlannerForm.vue';
import { useTripsStore } from '../stores/Trips.store';
import { onMounted } from 'vue';

const tripsStore = useTripsStore();

const { t } = useI18n();

onMounted(() => {
    tripsStore.getTrips();
});
</script>