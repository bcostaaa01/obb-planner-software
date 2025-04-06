<template>
    <AppLayout>
        <div class="flex flex-col h-full"
            style="background-image: url('https://www.oeamtc.at/oebb%2Bzug.jpg/article-default/18.297.092'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div class="flex flex-col items-start justify-start h-screen relative px-8 pt-10 mb-10">
                <div class="w-full px-4 md:w-auto md:px-0 md:absolute md:right-0 md:bottom-10 md:m-4 pb-10">
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