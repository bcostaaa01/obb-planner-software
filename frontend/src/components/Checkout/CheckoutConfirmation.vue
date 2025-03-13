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
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();
</script>
