<template>
    <!-- trip cancellations, delays, disruptions, etc. for the UserTrip -->
    <div class="flex flex-col gap-2">
        <div class="inline-flex items-center gap-2">
            <FontAwesomeIcon :icon="notificationIcon" :class="notificationTypeClasses" />
            <span class="font-bold gap-2" :class="notificationTypeClasses">{{ update.message
                }}</span>
        </div>
        <span class="text-sm text-gray-500">{{ formatDate(update.created_at) }}</span>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { PropType } from 'vue';
import { TripUpdateSeverity, type TripUpdate } from '../../types/Trip';
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWarning, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();

const props = defineProps({
    update: {
        type: Object as PropType<TripUpdate>,
        required: true
    }
});

const notificationTypeClasses = computed(() => {
    switch (props.update?.severity) {
        case TripUpdateSeverity.LOW:
            return 'text-yellow-500';
        case TripUpdateSeverity.MEDIUM:
            return 'text-red-500';
        case TripUpdateSeverity.HIGH:
            return 'text-red-700';
    }
})

const notificationIcon = computed(() => {
    switch (props.update?.severity) {
        case TripUpdateSeverity.LOW:
            return faWarning;
        case TripUpdateSeverity.MEDIUM:
            return faExclamationTriangle;
        case TripUpdateSeverity.HIGH:
            return faExclamationCircle;
    }
})

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
</script>