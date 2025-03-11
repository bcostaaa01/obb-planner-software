<template>
    <CheckoutStepLayout title="Checkout Confirmation">
        <div class="flex flex-col justify-start">
            <h1>{{ t('checkout.confirmation') }}</h1>
        </div>
    </CheckoutStepLayout>
</template>

<script setup lang="ts">
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
