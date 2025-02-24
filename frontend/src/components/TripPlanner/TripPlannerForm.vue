<template>
    <div class="flex flex-col p-8 mx-4 shadow-md bg-gray-100">
        <div class="flex flex-row items-center absolute top-6">
            <FontAwesomeIcon :icon="faRoute" class="text-gray-800 mr-3" />
            <span class="text-gray-800 font-bold">{{ t('trip-planner.heading') }}</span>
        </div>
        <div class="flex flex-row">
            <div class="flex flex-col mt-10">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.departure') }}</span>
                <fwb-select id="abfahrt" model-value="" required size="sm" type="multiselect" class="h-10"
                    placeholder="Wähle eine Abfahrtsstation" :options="stations"
                    @update:model-value="startStation = $event" />
            </div>
            <div class="flex flex-col ml-6 mt-10">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.destination') }}</span>
                <fwb-select id="ankunft" model-value="" required size="sm" type="multiselect" class="h-10"
                    placeholder="Wähle eine Ankunftsstation" :options="stations"
                    @update:model-value="endStation = $event" />
            </div>
        </div>

        <div class="flex flex-row justify-between mt-4">
            <fwb-button type="submit" size="md" class="w-full cursor-pointer"
                style="background-color: #e2002a; border-radius: 0px;" @click="saveTripDetails">{{
                    t('trip-planner.search') }}</fwb-button>
            <fwb-button type="submit" size="md" class="w-full cursor-pointer ml-6"
                style="background-color: #e2002a; border-radius: 0px;">{{
                    t('trip-planner.buy-tickets') }}</fwb-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FwbButton, FwbSelect } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { useSaveTrip } from '../../composables/useSaveTrip';

const { t } = useI18n();

const startStation = ref("");
const endStation = ref("");

const { saveTrip } = useSaveTrip();

const saveTripDetails = () => {
    saveTrip({
        startStation: startStation.value,
        endStation: endStation.value,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        price: 10,
        id: 1
    });
};

const stations = ref([{
    name: "Wien Hbf",
    value: "Wien Hbf"
},
{
    name: "Wien Meidling",
    value: "Wien Meidling"
},
{
    name: "Wien Westbahnhof",
    value: "Wien Westbahnhof"
},
{
    name: "Wien Mitte",
    value: "Wien Mitte"
},
])
</script>
