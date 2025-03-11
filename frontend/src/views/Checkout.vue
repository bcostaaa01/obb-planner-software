<template>
    <AppLayout>
        <div class="flex flex-col container px-8 my-8">
            <CheckoutTimeline />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layouts/AppLayout.vue';
import CheckoutTimeline from '../components/Checkout/CheckoutTimeline.vue';
</script>