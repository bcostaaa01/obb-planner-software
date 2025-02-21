<template>
    <fwb-card class="flex flex-col p-5 mx-4">
        <div class="flex flex-col mb-10">
            <fwb-select id="abfahrt" :label="t('trip-planner.departure')" model-value="" required size="sm"
                type="multiselect" class="h-10" placeholder="Wähle eine Abfahrtsstation" :options="stations" />
        </div>
        <div class="flex flex-col mb-10">
            <fwb-select id="ankunft" :label="t('trip-planner.destination')" model-value="" required size="sm"
                type="multiselect" class="h-10" placeholder="Wähle eine Ankunftsstation" :options="stations" />
        </div>

        <div class="flex flex-col">
            <fwb-button type="submit" size="sm" class="cursor-pointer">{{ t('trip-planner.search') }}</fwb-button>
        </div>
    </fwb-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FwbButton, FwbSelect, FwbCard } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
