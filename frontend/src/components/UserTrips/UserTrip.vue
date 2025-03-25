<template>
    <div class="flex flex-col bg-white shadow-md w-full">
        <Skeleton v-if="isTripLoading" :loading="isTripLoading" />
        <div v-else>
            <div class="flex flex-col">
                <div class="flex flex-col mb-2 cursor-pointer hover:bg-gray-100 p-4" @click="toggleTicketVisibility">
                    <h2 class="text-xl text-gray-900 font-bold">{{ trip.startstation }} › {{ trip.endstation }}</h2>
                    <span class="text-lg text-gray-700">{{ trip.date }} - {{ trip.starttime }}</span>
                    <div class="text-lg text-gray-700 mt-2">
                        <span class="font-bold">{{ t('user-trips.segments') }}</span>
                        <div v-for="(segment, index) in trip.segments" :key="index" class="mb-1">
                            {{ segment.trainType }} • {{ segment.duration }} • {{ segment.transfers }} {{
                                segment.transfers === 1 ? 'transfer' : 'transfers' }}
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mb-4 pr-4 mt-2">
                    <button
                        class="bg-red-600 hover:bg-red-800 transition-all duration-300 text-white px-4 py-2 cursor-pointer w-32"
                        @click.stop="removeTrip">
                        <span v-if="!isTripRemoving">{{ t('user-trips.remove') }}</span>
                        <FontAwesomeIcon v-if="isTripRemoving" :icon="faCircleNotch"
                            class="ml-2 animate-spin text-white" />
                    </button>
                </div>
            </div>
        </div>

        <TripTicket :trip="trip" :isTicketVisible="isTicketVisible" @closeTicket="closeTicket" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ExtendedTrip } from '../../types/Trip';
import { useTripsStore } from '../../stores/Trips.store';
import { useI18n } from 'vue-i18n';
import Skeleton from '../TripPlanner/Skeleton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import TripTicket from './TripTicket.vue';

const { t } = useI18n();
const tripsStore = useTripsStore();
const isTripLoading = ref(true);
const isTripRemoving = ref(false);

const props = defineProps<{
    trip: ExtendedTrip;
}>();

const isTicketVisible = ref(false);

const toggleTicketVisibility = () => {
    isTicketVisible.value = true;
};

const closeTicket = () => {
    isTicketVisible.value = false;
};

const removeTrip = async () => {
    isTripRemoving.value = true;
    await tripsStore.removeTripFromDatabase(props.trip.id.toString());
    isTripRemoving.value = false;
    window.location.reload();
};

onMounted(() => {
    setTimeout(() => {
        isTripLoading.value = false;
    }, 1000);
});
</script>
