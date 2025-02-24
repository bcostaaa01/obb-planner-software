<template>
    <AppLayout>
        <div class="flex flex-col items-center justify-center h-screen">
            <img src="https://cdn.verkehrsrundschau.de/thumb_750x422/media/5709/oebb-westbahngleisanlage2-1920.jpg"
                class="w-full h-full object-cover absolute top-0 left-0 z-0" />
            <div class="flex flex-col items-center justify-center w-1/2 z-10">
                <SelectedTrip :date="selectedTrip.date" :time="selectedTrip.time" :departure="selectedTrip.departure"
                    :destination="selectedTrip.arrival" />
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '../components/layouts/AppLayout.vue';
import SelectedTrip from '../components/TripPlanner/SelectedTrip.vue';

const selectedTrip = ref({
    date: '22.02.2025',
    time: '10:00',
    departure: 'Wien Hbf',
    arrival: 'Salzburg Hbf',
})
</script>
