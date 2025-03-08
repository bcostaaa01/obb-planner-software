<template>
    <div class="flex flex-row h-32 justify-between mb-2 p-4 border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md cursor-pointer"
        @click="() => selectTrip(trip)">
        <Skeleton v-if="getIsLoading()" loading />
        <div v-else class="flex flex-row justify-between w-full">
            <div class="flex flex-col pr-4 mr-4 relative">
                <span class="text-gray-800">
                    {{ trip.date }}
                </span>
                <span class="text-gray-800">
                    {{ trip.startStation }}
                </span>
                <div class="flex flex-row">
                    <span class="font-bold">{{ startTime.hours }}</span>
                    :
                    <span class="font-semibold">{{ startTime.minutes }}</span>
                </div>
                <div class="absolute top-0 bottom-0 right-0 w-px bg-gray-300 h-full"></div>
            </div>
            <div class="relative w-full mt-2">
                <div class="absolute top-0 left-0 w-1/2 flex flex-col">
                    <span class="text-gray-800 text-sm text-center">{{ segment.trainType }}</span>
                    <hr class="border-b border-red-600 border-2 ml-2 mr-2">
                    <div class="flex flex-col mt-1">
                        <span class="text-gray-800 text-xs text-left ml-2">{{ segment.duration }}</span>
                        <span class="text-gray-800 text-xs text-left ml-2">{{ transfersText }}</span>
                    </div>
                </div>
                <div v-if="trip.segments.length > 1" class="absolute top-0 right-0 w-2/4 flex flex-col">
                    <span class="text-gray-800 text-sm text-center">{{ secondSegment?.trainType || '' }}</span>
                    <hr class="border-b border-red-700 border-2 mr-2">
                </div>
            </div>
            <div class="flex flex-col pl-2 ml-4 relative">
                <div class="border-l border-gray-300 h-full pl-5">
                    <span class="text-gray-800">
                        {{ trip.endStation }}
                    </span>
                    <div class="flex flex-row">
                        <span class="font-bold">{{ endTime.hours }}</span>
                        :
                        <span class="font-semibold">{{ endTime.minutes }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end justify-between ml-4">
                <div class="flex items-center">
                    <span class="font-bold text-gray-800">{{ trip.price?.toFixed(2) }}€</span>
                </div>
                <PassengerInfo v-if="trip.passenger" :count="trip.passenger.count" :type="trip.passenger.type"
                    :discount="trip.passenger.discount" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ExtendedTrip } from '../../types/Trip';
import { useSaveTrip, useTripSelection } from '../../composables/index';
import { useTimeFormat } from '../../utils/useTimeFormat';
import Skeleton from './Skeleton.vue';
import PassengerInfo from './PassengerInfo.vue';

const { getIsLoading } = useSaveTrip();
const { selectTrip } = useTripSelection();

const props = defineProps<{
    trip: ExtendedTrip;
}>();

const startTime = useTimeFormat(props.trip.startTime);
const endTime = useTimeFormat(props.trip.endTime || '');

const segment = computed(() => props.trip.segments[0] || { trainType: '', duration: '', transfers: 0 });
const secondSegment = computed(() => props.trip.segments.length > 1 ? props.trip.segments[1] : null);

const transfersText = computed(() => {
    const transfers = segment.value.transfers;
    return transfers === 0 ? 'Direkt' :
        transfers === 1 ? '1 Umstieg' :
            `${transfers} Umstiege`;
});
</script>