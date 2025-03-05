<template>
    <button
        class="flex flex-row justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
        @click="goToCart">
        <div class="flex flex-row">
            <FontAwesomeIcon :icon="faCartShopping" :class="activeClasses" />
        </div>
        <div class="flex flex-row ml-2">
            <span class="text-gray-800 font-bold" :class="activeClasses">{{ totalPrice.toFixed(2) }}€</span>
        </div>
    </button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTripsStore } from '../../stores/Trips.store';

defineProps<{
    price: number;
}>();

const router = useRouter();
const { getCart, getTotalPrice } = useTripsStore();

const cart = computed(() => getCart());
const totalPrice = computed(() => getTotalPrice());

const activeClasses = computed(() => {
    return router.currentRoute.value.path === '/cart' ? 'text-red-600' : 'text-gray-800';
});

const goToCart = () => {
    router.push('/cart');
};
</script>