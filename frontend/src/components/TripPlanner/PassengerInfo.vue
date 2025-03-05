<template>
    <div class="flex flex-row items-center gap-2">
        <span class="font-semibold">{{ count }}</span>
        <span class="text-gray-600">×</span>
        <span class="text-gray-800">{{ t(`passenger.types.${type}`) }}</span>
        <span class="text-gray-600 text-sm">{{ t(`passenger.discounts.${discount || 'without_discounts'}`) }}</span>
    </div>
</template>

<script setup lang="ts">
import { type PassengerType, type DiscountType } from '../../types/Passenger';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    count: number;
    type: PassengerType;
    discount?: DiscountType;
}>();
</script>