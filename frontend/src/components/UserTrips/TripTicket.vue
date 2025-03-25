<template>
    <div v-if="isTicketVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        @click.self="$emit('closeTicket')">
        <div class="w-96 shadow-2xl relative mx-4 bg-gray-900 h-screen border-2 border-gray-800">
            <div v-if="isTicketLoading" class="flex items-center justify-center h-full">
                <FontAwesomeIcon :icon="faCircleNotch" class="text-red-600 animate-spin text-6xl" />
            </div>

            <!-- Ticket Content -->
            <div v-else class="flex flex-col h-full">
                <!-- Header -->
                <div class="bg-gray-900 py-2 px-2 flex flex-row justify-between items-center">
                    <div>
                        <span class="bg-green-500 text-white text-xs px-2 py-1">{{ t('trip-ticket.paid') }}</span>
                    </div>
                    <button @click="$emit('closeTicket')" class="text-white hover:text-gray-300 cursor-pointer">
                        <FontAwesomeIcon :icon="faXmark"
                            class="h-5 w-5 hover:text-gray-300 dark:hover:text-gray-300 transition-all duration-300" />
                    </button>
                </div>

                <!-- Main Content -->
                <div class="bg-gray-50 p-4 mx-1 my-2 overflow-y-auto flex-1">
                    <!-- Logo -->
                    <div class="flex justify-between items-center mb-6">
                        <img src="../../assets/obb-logo.png" alt="Logo" class="h-8">
                        <div class="text-right">
                            <div class="text-sm text-gray-500">{{ t('trip-ticket.price') }}</div>
                            <div class="text-xl font-semibold">€{{ trip.price }}</div>
                        </div>
                    </div>

                    <!-- Passenger Info -->
                    <div class="mb-6">
                        <div class="text-sm text-gray-500">{{ t('trip-ticket.passenger') }}</div>
                        <div class="text-lg font-semibold">{{ trip.passenger?.count }}</div>
                        <div class="text-sm text-gray-600">ID: {{ trip.id }}</div>
                    </div>

                    <!-- Seat Info -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div class="text-sm text-gray-500">{{ t('trip-ticket.class') }}</div>
                            <div class="text-lg font-semibold">{{ trip.passenger?.type }}</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-500">{{ t('trip-ticket.seat') }}</div>
                            <div class="text-lg font-semibold">{{ trip.passenger?.seat }}</div>
                        </div>
                    </div>

                    <!-- Time and Route -->
                    <div class="mb-6">
                        <div class="text-sm text-gray-500">{{ t('trip-ticket.time') }}</div>
                        <div class="text-lg font-semibold">{{ trip.date }} - {{ trip.starttime }}</div>
                    </div>

                    <!-- Route -->
                    <div class="flex justify-between items-center mb-6">
                        <div class="text-2xl font-bold text-red-600">
                            {{ trip.startstation }} - {{ trip.endstation }}
                        </div>
                    </div>

                    <!-- Train Info -->
                    <div class="text-sm text-gray-600">
                        TRAIN <span v-for="segment in trip.segments" :key="segment.trainType"
                            class="flex flex-row gap-2">
                            <span class="font-bold"> {{ segment.trainType }} </span>
                            <span class="text-xs"> {{ segment.duration }} </span>
                        </span>
                    </div>

                    <!-- QR Code section -->
                    <div class="max-w-sm mx-auto p-6 mt-6 rounded-lg shadow-lg overflow-hidden bg-gray-200">
                        <div class="mt-6 h-48 w-48 mx-auto">
                            <img :src="qrCodeUrl" alt="QR Code" class="w-full">
                        </div>
                        <div class="mt-4 text-center text-sm text-gray-500">
                            {{ t('trip-ticket.booking-code') }}
                            <div class="font-mono text-lg">{{ trip.id }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
import type { ExtendedTrip } from '../../types/Trip';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    trip: ExtendedTrip;
    isTicketVisible: boolean;
}>();

defineEmits(['closeTicket']);

const qrCodeUrl = ref('');
const isTicketLoading = ref(true);

onMounted(async () => {
    try {
        isTicketLoading.value = true;
        setTimeout(async () => {
            const ticketData = `${props.trip.id}-${props.trip.startStation}-${props.trip.endStation}`;
            qrCodeUrl.value = await QRCode.toDataURL(ticketData);
            isTicketLoading.value = false;
        }, 2000);
    } catch (error) {
        console.error('Error generating QR code:', error);
        isTicketLoading.value = false;
    }
});
</script>
