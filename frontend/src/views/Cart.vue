<template>
    <AppLayout>
        <div class="relative w-full h-screen">
            <img src="https://www.spiritdesign.com/wp-content/uploads/2022/02/OEBB_railjet-Header.jpg" alt="cart"
                class="h-full w-full object-cover">
            <CartDetails
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl" />
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layouts/AppLayout.vue';
import CartDetails from '../components/Cart/CartDetails.vue';
</script>
