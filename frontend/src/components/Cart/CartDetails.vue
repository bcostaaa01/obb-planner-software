<template>
    <div class="flex flex-col items-center justify-center p-8 w-full bg-white backdrop-blur-sm shadow-lg">
        <div v-if="cartIsEmpty" class="flex flex-col items-center justify-center py-16">
            <FontAwesomeIcon :icon="faX" class="text-2xl text-gray-400" />
            <FontAwesomeIcon :icon="faCartShopping" class="h-16 w-16 text-7xl text-gray-400 mt-4" />
            <span class="mt-6 text-xl text-gray-500">{{ t('cart.empty') }}</span>
            <button @click="goBack"
                class="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-6 py-3 mt-8 text-lg">
                {{ t('cart.go-back') }}
            </button>
        </div>
        <div v-else class="flex flex-col justify-between w-full gap-4">
            <SelectedTripDetails v-for="trip in cart" :key="trip.id" :trip="trip" />
            <div class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <span class="text-xl font-bold text-gray-800">{{ t('cart.total') }}: {{ totalPrice.toFixed(2) }}€</span>
                <button @click="addTripToCheckout"
                    class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg cursor-pointer">
                    {{ t('cart.proceed-to-checkout') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
import { useTripsStore } from '../../stores/Trips.store';
import SelectedTripDetails from '../TripPlanner/SelectedTripDetails.vue';
import { useI18n } from 'vue-i18n';
import { useSaveTrip } from '../../composables/useSaveTrip';

const { t } = useI18n();
const { getCart } = useTripsStore();
// const { addTripToCheckoutDB } = useSaveTrip();
const cart = computed(() => getCart());
const cartIsEmpty = computed(() => cart.value.length === 0);
const totalPrice = computed(() => cart.value.reduce((sum, trip) => sum + (trip.price || 0), 0));

const router = useRouter();

const goBack = () => {
    router.push('/');
};

const addTripToCheckout = async () => {
    try {
        // for (const trip of cart.value) {
        //     console.log(trip);
        //     await addTripToCheckoutDB({
        //         ...trip,
        //         date: trip.date,
        //     });
        // }
        router.push('/checkout');
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};
</script>
