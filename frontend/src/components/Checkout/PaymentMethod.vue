<template>
    <CheckoutStepLayout title="Payment Method">
        <div class="bg-gray-100 p-4">
            <div class="flex flex-col items-center mt-4">
                <div class="flex space-x-8">
                    <div v-for="(method, index) in paymentMethods" :key="index"
                        class="flex flex-col items-center cursor-pointer" @click="selectPaymentMethod(index)">
                        <div :class="classes(index)"
                            class="flex items-center justify-center rounded-lg p-1 transition duration-200">
                            <img :src="method.icon" :alt="method.name" class="w-12" />
                        </div>
                        <span class="mt-2 text-sm text-gray-600">{{ method.name }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <form class="flex flex-col gap-2">
                    <div v-for="field in paymentMethodConfig" :key="field.id" class="flex flex-col">
                        <label :for="field.id" class="text-sm font-medium">{{ field.label }}</label>
                        <input :type="field.type" :id="field.id" class="w-full p-2 border border-gray-300 rounded-md"
                            :required="field.required" />
                    </div>
                    <button type="submit" @click="handleSubmit"
                        class="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 w-64">
                        <span v-if="loading">
                            <FontAwesomeIcon :icon="faCircleNotch" class="animate-spin" />
                        </span>
                        <span v-else>Next</span>
                    </button>
                </form>
            </div>
        </div>
    </CheckoutStepLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { paymentMethodConfig } from './formConfig';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';

const paymentMethods = [
    { name: 'iDeal', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/IDEAL_%28Bezahlsystem%29_logo.svg' },
    { name: 'MasterCard', icon: 'https://www.designenlassen.de/blog/wp-content/uploads/2024/02/Dein-Abschnittstext-35.png' },
];

const loading = ref(false);
const selectedMethod = ref(0);

const selectPaymentMethod = (index: number) => {
    selectedMethod.value = index;
};

const classes = (index: number) => {
    return {
        'border-2 border-blue-500': selectedMethod.value === index,
        'border-gray-300': selectedMethod.value !== index
    }
}

const handleSubmit = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>
