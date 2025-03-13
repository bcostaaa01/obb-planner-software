<template>
    <CheckoutStepLayout>
        <form class="flex flex-col gap-2 items-center mt-4" @submit.prevent="handleSubmit">
            <div v-for="field in customerDetailsConfig" :key="field.id" class="flex flex-row gap-4 items-center">
                <label :for="field.id" class="text-sm font-medium w-36 self-center">{{ t(field.labelKey) }}</label>
                <input :type="field.type" :id="field.id" v-model="formInputs[field.id]"
                    class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    :required="field.required" />
            </div>
            <button type="submit" :disabled="!isFormValid"
                class="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 w-64"
                :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }">
                <span v-if="loading">
                    <FontAwesomeIcon :icon="faCircleNotch" class="animate-spin" />
                </span>
                <span v-else>{{ t('checkout.next') }}</span>
            </button>
        </form>
    </CheckoutStepLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { customerDetailsConfig } from './formConfig';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const loading = ref(false);

const formInputs = ref(
    customerDetailsConfig.reduce((acc: Record<string, string>, field) => {
        acc[field.id] = '';
        return acc;
    }, {})
);

const isFormValid = computed(() => {
    return customerDetailsConfig.every(field => {
        return formInputs.value[field.id].trim() !== '';
    });
});

const props = defineProps<{
    goToNextStep: () => void;
}>();

const handleSubmit = () => {
    if (!isFormValid.value) return;
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        props.goToNextStep();
    }, 2000);
};
</script>