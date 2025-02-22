<template>
    <div class="flex flex-col"
        style="background-image: url('https://image-service.web.oebb.at/pv/.imaging/default/dam/reiseportal/opengraph/website.jpg/jcr:content.jpg?t=1632657987575&scale=1.0'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <TopNavigationBar />
        <div class="flex flex-col items-center justify-center h-screen relative">

            <div class="absolute right-0 bottom-10 m-4">
                <TripPlannerForm />

                <div v-for="trip in trips" :key="trip.id">
                    {{ trip.startStation }} - {{ trip.endStation }}
                </div>
            </div>
            <SelectedTrip :stations="stations" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import TopNavigationBar from '../components/shared/Navigation/TopNavigationBar.vue';
import TripPlannerForm from '../components/TripPlanner/TripPlannerForm.vue';
import { useTripsStore } from '../stores/Trips.store';
import { onMounted, computed } from 'vue';
import SelectedTrip from '../components/TripPlanner/SelectedTrip.vue';

const tripsStore = useTripsStore();
const trips = computed(() => tripsStore.trips);
const stations = [{
    date: '22.02.2025',
    time: '10:00',
    title: 'Wien Hbf',
}, {
    date: '22.02.2025',
    time: '12:24',
    title: 'Salzburg Hbf',
}, {
    date: '22.02.2025',
    time: '14:30',
    title: 'Innsbruck Hbf',
}]

const { t } = useI18n();

onMounted(() => {
    tripsStore.getTrips();
});
</script>