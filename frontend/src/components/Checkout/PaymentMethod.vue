<template>
    <CheckoutStepLayout title="Payment Method">
        <div class="flex flex-col items-center mt-4 w-full">
            <div class="flex flex-col space-y-4 w-full">
                <div v-for="(method, index) in paymentMethods" :key="index"
                    class="flex items-center hover:bg-indigo-50 transition duration-200"
                    @click="selectPaymentMethod(method.name)">
                    <input type="radio" :value="method.name" v-model="selectedMethod" class="hidden peer" />
                    <label :for="method.name" :class="classes(method.name)"
                        class="flex items-center justify-between w-full p-3 border rounded-md transition duration-200 peer-checked:bg-indigo-100 peer-checked:text-indigo-900 peer-checked:ring-2 peer-checked:ring-indigo-200 cursor-pointer">
                        <div class="flex items-center">
                            <img :src="method.icon" :alt="method.name" class="w-8 mr-2" />
                            <span class="text-sm">{{ method.name }}</span>
                        </div>
                        <div v-if="selectedMethod === method.name" class="w-4 h-4 rounded-full bg-indigo-500"></div>
                    </label>
                </div>
            </div>
        </div>
        <!-- <div class="flex flex-col mt-4">
            <form class="flex flex-col gap-2">
                <div v-for="field in paymentMethodConfig" :key="field.id" class="flex flex-row gap-4 items-center">
                    <label :for="field.id" class="text-sm font-medium self-center">{{ t(field.labelKey) }}</label>
                    <input :type="field.type" :id="field.id" class="w-full p-2 border border-gray-300 rounded-md"
                        :required="field.required" />
                </div>

                <button type="submit" @click="handleSubmit"
                    class="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 w-64">
                    <span v-if="loading">
                        <FontAwesomeIcon :icon="faCircleNotch" class="animate-spin" />
                    </span>
                    <span v-else>{{ t('checkout.next') }}</span>
                </button>
            </form>
        </div> -->
    </CheckoutStepLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { paymentMethodConfig } from './formConfig';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const paymentMethods = [
    { name: 'Google Pay', icon: 'https://brandlogos.net/wp-content/uploads/2021/10/google-pay-logo.png' },
    { name: 'Apple Pay', icon: 'https://download.logo.wine/logo/Apple_Pay/Apple_Pay-Logo.wine.png' },
    { name: 'Credit Card', icon: 'https://www.designenlassen.de/blog/wp-content/uploads/2024/03/visa.png' },
];

const loading = ref(false);
const selectedMethod = ref('');

const selectPaymentMethod = (name: string) => {
    selectedMethod.value = name;
};

const classes = (name: string) => {
    return {
        'border-2 border-purple-300 bg-indigo-100 text-indigo-900 ring-purple-300': selectedMethod.value === name,
        'border-gray-300 hover:bg-gray-200': selectedMethod.value !== name
    }
}

const handleSubmit = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>
