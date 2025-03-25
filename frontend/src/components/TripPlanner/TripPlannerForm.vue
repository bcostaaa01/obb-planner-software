<template>
    <div class="flex flex-col p-8 mx-4 shadow-md bg-gray-100">
        <div class="flex flex-row items-center absolute top-6">
            <FontAwesomeIcon :icon="faRoute" class="text-gray-800 mr-3" />
            <span class="text-gray-800 font-bold">{{ t('trip-planner.heading') }}</span>
        </div>
        <div class="flex flex-row">
            <div class="flex flex-col mt-10">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.departure') }}</span>
                <fwb-select id="abfahrt" :model-value="startStation" required size="sm" type="multiselect" class="h-10"
                    :placeholder="t('trip-planner.select-departure')" :options="stations"
                    @update:model-value="(value) => { startStation = value; updateValidationStatus(); }"
                    :validation-status="showError ? validationStatus : undefined" />
            </div>
            <div class="flex flex-col ml-6 mt-10">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.destination') }}</span>
                <fwb-select id="ankunft" :model-value="endStation" required size="sm" type="multiselect" class="h-10"
                    :placeholder="t('trip-planner.select-destination')" :options="stations"
                    @update:model-value="(value) => { endStation = value; updateValidationStatus(); }"
                    :validation-status="showError ? validationStatus : undefined" />
            </div>
            <div class="flex flex-col ml-6 mt-10">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.departure-time') }}</span>
                <input type="time" v-model="startTime" class="h-10 px-2 border border-gray-300 rounded text-gray-800" />
            </div>
            <div class="flex flex-col ml-6 mt-10">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.departure-date') }}</span>
                <Datepicker v-model="selectedDate" @update:model-value="updateSelectedDate" />
            </div>
        </div>

        <div class="flex flex-row mt-6">
            <div class="flex flex-col">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.passenger-type') }}</span>
                <fwb-select id="passenger-type" v-model="selectedPassenger.type" required size="sm" type="multiselect"
                    class="h-10" :options="passengerTypes" @update:model-value="updateDiscountOptions" />
            </div>
            <div class="flex flex-col ml-6">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.passenger-discount') }}</span>
                <fwb-select id="discount" v-model="selectedPassenger.discount" required size="sm" type="multiselect"
                    class="h-10" :options="availableDiscounts" />
            </div>
            <div class="flex flex-col ml-6">
                <span class="text-gray-800 font-bold mb-2">{{ t('trip-planner.passenger-count') }}</span>
                <input type="number" v-model="selectedPassenger.count" min="1" max="9"
                    class="h-10 px-2 border border-gray-300 rounded text-gray-800" />
            </div>
        </div>

        <div v-if="showError" class="mt-2">
            <span class="text-red-500">{{ errorMessage }}</span>
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
import { ref, reactive, watch } from 'vue';
import { FwbButton, FwbSelect } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { useSaveTrip } from '../../composables/useSaveTrip';
import { useRouter } from 'vue-router';
import { mockTrips } from '../../mocks/trips';
import type { ValidationStatus } from 'flowbite-vue/components/FwbSelect/types.js';
import type { Passenger, PassengerType, DiscountType } from '../../types/Passenger';
import Datepicker from '../shared/Date/Datepicker.vue';
import i18n from '../../composables/i18n';
import type { ExtendedTrip } from '../../types/Trip';
import { useValidateInputs } from '../../composables/useValidateInputs';

const { t } = useI18n();

const startStation = ref("");
const endStation = ref("");
const startTime = ref(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
const selectedDate = ref("");
const validationStatus = ref<ValidationStatus | undefined>(undefined);
const showError = ref(false);
const errorMessage = ref("");

const { saveTrip, setAvailableTrips } = useSaveTrip();
const router = useRouter();

const selectedPassenger = reactive<Passenger>({
    type: 'adult',
    count: 1,
    discount: 'without_discounts'
});

const passengerTypes = [
    { value: 'adult', name: t('passenger.types.adult') },
    { value: 'child', name: t('passenger.types.child') },
    { value: 'senior', name: t('passenger.types.senior') },
    { value: 'student', name: t('passenger.types.student') }
];

const discountOptions = {
    adult: ['without_discounts', 'vorteilscard', 'family_card'],
    child: ['without_discounts', 'family_card'],
    senior: ['without_discounts', 'vorteilscard'],
    student: ['without_discounts', 'student_card']
} as const;

const availableDiscounts = ref(
    discountOptions.adult.map(discount => ({
        value: discount as DiscountType,
        name: t(`passenger.discounts.${discount}`)
    }))
);

const updateDiscountOptions = (type: PassengerType) => {
    selectedPassenger.discount = 'without_discounts';
    availableDiscounts.value = discountOptions[type].map(discount => ({
        value: discount as DiscountType,
        name: t(`passenger.discounts.${discount}`)
    }));
};

const updateValidationStatus = () => {
    if (!startStation.value || !endStation.value) {
        validationStatus.value = "error";
    } else if (startStation.value === endStation.value) {
        validationStatus.value = "error";
    } else {
        validationStatus.value = undefined;
    }
};

const updateSelectedDate = (value: string) => {
    console.log("Date selected:", value);
    selectedDate.value = value;
};

const { errors, validateTripInputs } = useValidateInputs();

const validateForm = () => {
    return validateTripInputs(startStation.value, endStation.value, selectedDate.value, selectedPassenger.count);
};

const saveTripDetails = () => {
    if (!validateForm()) {
        showError.value = true;
        errorMessage.value = errors.value.startStation || errors.value.endStation || errors.value.selectedDate || errors.value.passengerCount;
        return;
    }

    const formattedDate = selectedDate.value;
    const formattedTime = startTime.value;

    const routeKey = `${startStation.value}-${endStation.value}`;

    const dateTrips = mockTrips[selectedDate.value];
    if (dateTrips && dateTrips[routeKey]) {
        setAvailableTrips(dateTrips[routeKey] as unknown as ExtendedTrip[]);
        showError.value = false;
        errorMessage.value = "";
    } else {
        setAvailableTrips([]);
        showError.value = true;
        errorMessage.value = t('trip-planner.no-trips-available');
    }

    saveTrip({
        startstation: startStation.value,
        endstation: endStation.value,
        starttime: startTime.value,
        date: formattedDate,
        discount: selectedPassenger.discount as DiscountType,
        passenger: selectedPassenger
    });

    localStorage.setItem('startStation', startStation.value);
    localStorage.setItem('endStation', endStation.value);
    localStorage.setItem('formDate', formattedDate);
    localStorage.setItem('formTime', formattedTime);
    localStorage.setItem('passengerType', selectedPassenger.type);
    localStorage.setItem('passengerCount', selectedPassenger.count.toString());
    localStorage.setItem('passengerDiscount', selectedPassenger.discount as DiscountType);

    router.push({ path: `/${i18n.global.locale}/trip-details` });
};

const stations = ref([
    {
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
    {
        name: "Graz Hbf",
        value: "Graz Hbf"
    },
    {
        name: "Salzburg Hbf",
        value: "Salzburg Hbf"
    }
]);

const emit = defineEmits<{
    (e: 'update:selectedDate', value: string): void;
    (e: 'update:selectedTime', value: string): void;
    (e: 'update:startStation', value: string): void;
    (e: 'update:endStation', value: string): void;
}>();

watch([selectedDate, startTime, startStation, endStation], ([newDate, newTime, newStart, newEnd]) => {
    emit('update:selectedDate', newDate);
    emit('update:selectedTime', newTime);
    emit('update:startStation', newStart);
    emit('update:endStation', newEnd);
});
</script>
