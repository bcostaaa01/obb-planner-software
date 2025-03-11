<template>
    <div class="flex flex-col mx-8">
        <div class="flex justify-between items-center mb-4">
            <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center cursor-pointer"
                @click="currentStep = index">
                <div :class="stepClass(index)"
                    class="w-8 h-8 rounded-full flex items-center justify-center border bg-white">
                    <span v-if="step.completed">
                        <FontAwesomeIcon :icon="faCheck" class="text-green-400" />
                    </span>
                    <span v-else>{{ index + 1 }}</span>
                </div>
                <h3 class="text-lg text-gray-500">{{ step.title }}</h3>
            </div>
        </div>

        <div class="w-full">
            <component :is="currentComponent" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CustomerDetails from './CustomerDetails.vue';
import PaymentMethod from './PaymentMethod.vue';
import CheckoutConfirmation from './CheckoutConfirmation.vue';

const steps = [
    { title: 'Customer Details', completed: false },
    { title: 'Payment Method', completed: false },
    { title: 'Confirmation', completed: false }
];

const currentStep = ref(0);
const currentComponent = computed(() => {
    switch (currentStep.value) {
        case 0:
            return CustomerDetails;
        case 1:
            return PaymentMethod;
        case 2:
            return CheckoutConfirmation;
        default:
            return CustomerDetails;
    }
});

const stepClass = (index: number) => {
    const step = steps[index];
    return {
        'bg-green-300 border-green-300': step.completed,
        'bg-gray-200 border-gray-300': !step.completed,
    };
};
</script>
