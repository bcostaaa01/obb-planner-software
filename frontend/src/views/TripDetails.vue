<template>
    <AppLayout>
        <div class="flex flex-col items-left pl-10 h-screen">
            <img src="https://cdn.verkehrsrundschau.de/thumb_750x422/media/5709/oebb-westbahngleisanlage2-1920.jpg"
                class="w-full min-h-screen object-cover absolute top-0 left-0" />
            <TopBannerLoader :loading="loading" />

            <div class="flex flex-col items-left pl-10 h-screen">
                <div class="flex flex-col mt-10 z-10 cursor-pointer hover:bg-gray-300 w-24 mb-5">
                    <router-link to="/" class="text-white hover:text-gray-800 font-bold p-2">
                        <FontAwesomeIcon :icon="faAngleLeft" class="mr-2" />
                        <span class="ml-2">{{ t('trip-details.back') }}</span>
                    </router-link>
                </div>

                <div class="flex flex-col items-center justify-center w-1/2 z-10">
                    <SelectedTrip :date="formattedDate" :time="formattedTime"
                        :departure="selectedTrip?.startStation || ''" :destination="selectedTrip?.endStation || ''"
                        v-if="!loading" />

                    <div v-if="selectedTrip" class="bg-white shadow-md p-4 w-full mb-4 mt-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-gray-600">{{ t('trip-details.price') }}:</span>
                                <span class="font-bold text-gray-800 ml-2">{{ selectedTrip.price.toFixed(2) }}€</span>
                            </div>
                            <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                                @click="addToCart">
                                {{ t('trip-details.buy-tickets') }}
                            </button>
                        </div>
                    </div>

                    <Skeleton :loading="loading" class="z-10" />

                    <div v-if="!loading" class="mt-4 w-full">
                        <h3 class="text-lg font-semibold text-white mb-2">{{ t('trip-details.other-connections') }}</h3>
                        <div v-if="availableTrips.length > 0">
                            <AvailableTrips :trips="availableTrips" />
                        </div>
                        <div v-else class="bg-white text-gray-800 p-4">
                            {{ t('trip-planner.no-alternative-trips') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '../components/layouts/AppLayout.vue';
import SelectedTrip from '../components/TripPlanner/SelectedTrip.vue';
import { useI18n } from 'vue-i18n';
import AvailableTrips from '../components/TripPlanner/AvailableTrips.vue';
import { useSaveTrip } from '../composables/useSaveTrip';
import TopBannerLoader from '../components/shared/Loader/TopBannerLoader.vue';
import Skeleton from '../components/TripPlanner/Skeleton.vue';
import { useTripsStore } from '../stores/Trips.store';

const { t } = useI18n();
const { selectedTrip, availableTrips } = useSaveTrip();
const loading = ref(false);
const { addTripToCart } = useTripsStore();

const formattedDate = computed(() => {
    if (!selectedTrip.value) return '';
    const today = new Date();
    return today.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
});

const formattedTime = computed(() => {
    if (!selectedTrip.value) return '';
    return selectedTrip.value.startTime;
});

const addToCart = () => {
    if (selectedTrip.value) {
        addTripToCart(selectedTrip.value);
    }
};

onMounted(() => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
});
</script>
