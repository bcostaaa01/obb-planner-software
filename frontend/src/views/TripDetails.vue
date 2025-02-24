<template>
    <AppLayout>
        <div class="flex flex-col items-left pl-10 h-screen">
            <img src="https://cdn.verkehrsrundschau.de/thumb_750x422/media/5709/oebb-westbahngleisanlage2-1920.jpg"
                class="w-full h-full object-cover absolute top-0 left-0 z-0" />

            <div class="flex flex-col mt-10 z-10 cursor-pointer hover:bg-gray-300 w-24 mb-5">
                <router-link to="/" class="text-white hover:text-gray-800 font-bold p-2">
                    <FontAwesomeIcon :icon="faAngleLeft" class="mr-2" />
                    <span class="ml-2">{{ t('trip-details.back') }}</span>
                </router-link>
            </div>

            <div class="flex flex-col items-center justify-center w-1/2 z-10">
                <SelectedTrip :date="selectedTrip.date" :time="selectedTrip.time" :departure="selectedTrip.departure"
                    :destination="selectedTrip.arrival" />
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '../components/layouts/AppLayout.vue';
import SelectedTrip from '../components/TripPlanner/SelectedTrip.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const selectedTrip = ref({
    date: '22.02.2025',
    time: '10:00',
    departure: 'Wien Hbf',
    arrival: 'Salzburg Hbf',
})
</script>
