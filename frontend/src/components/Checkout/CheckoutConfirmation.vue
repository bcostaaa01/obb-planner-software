<template>
    <CheckoutStepLayout title="Checkout Confirmation">
        <div class="flex flex-col justify-start items-center">
            <span class="text-2xl font-bold mb-4 flex flex-row items-center gap-2">
                {{ t('checkout.confirmation') }}
                <FontAwesomeIcon :icon="faCheckCircle" class="text-green-500 ml-2" />
            </span>
            <div class="flex flex-col gap-2">
                <span class="text-sm">{{ t('checkout.payment-success') }}</span>
                <span class="text-sm">{{ t('checkout.ticket-sent-to-email') }}</span>
            </div>
        </div>
    </CheckoutStepLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSaveTrip } from '../../composables/useSaveTrip';
import { useTripsStore } from '../../stores/Trips.store';

const { t } = useI18n();
const { addTripToCheckoutDB } = useSaveTrip();
const { getCart } = useTripsStore();

onMounted(async () => {
    try {
        const cart = getCart();
        for (const trip of cart) {
            await addTripToCheckoutDB({
                ...trip,
                date: trip.date,
            });
        }
        console.log('Trips successfully added to the database.');
    } catch (error) {
        console.error('Error adding trips to the database:', error);
    }
});
</script>
