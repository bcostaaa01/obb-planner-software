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
                    <TripUpdate :update="trip.updates?.[1] as TripUpdateType" v-if="trip.updates?.[1]" />
                </div>

                <div class="flex justify-start mb-2">
                    <button
                        class="bg-blue-600 hover:bg-blue-800 transition-all duration-300 text-white px-4 py-2 cursor-pointer w-32"
                        @click="subscribeToTrip">
                        {{ t('user-trips.subscribe') }}
                    </button>
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
import supabase from '../../composables/useSupabaseConfig';
import TripUpdate from './TripUpdate.vue';
import type { TripUpdate as TripUpdateType } from '../../types/Trip';

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

const subscribeToTrip = async () => {
    try {
        console.log('\n--- Frontend Debug Start ---');

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            console.error('Session error:', sessionError);
            return;
        }

        if (!session) {
            console.error('No session found');
            return;
        }

        console.log('Session found:', {
            expires_at: session.expires_at,
            token_type: session.token_type,
            access_token_preview: session.access_token.substring(0, 10) + '...'
        });

        const token = session.access_token;

        console.log('Trip ID:', props.trip);

        console.log('Making POST request to create notification...');
        const response = await fetch('http://localhost:3000/api/notifications/trip-interruption', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: session.user.id,
                trip_id: props.trip.id,
                message: 'Train was cancelled due to a technical issue',
                severity: 'HIGH',
                type: 'CANCELLATION',
                created_at: new Date().toISOString()
            })
        });

        const result = await response.json();
        console.log('Create notification response:', {
            status: response.status,
            ok: response.ok,
            result
        });

        if (!response.ok) {
            throw new Error(`Failed to create notification with user id ${session.user.id} for trip ${props.trip.id}: ${result.message}`);
        }

        console.log('Making GET request for notifications...');
        const notificationsResponse = await fetch('http://localhost:3000/api/notifications', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const notifications = await notificationsResponse.json();
        console.log('Get notifications response:', {
            status: notificationsResponse.status,
            ok: notificationsResponse.ok,
            notifications
        });

        if (!notificationsResponse.ok) {
            throw new Error(`Failed to get notifications: ${notifications.message}`);
        }

        console.log('--- Frontend Debug End ---\n');
    } catch (error) {
        console.error('Error in subscribeToTrip:', error);
    }
};

onMounted(() => {
    setTimeout(() => {
        isTripLoading.value = false;
    }, 1000);
});
</script>
