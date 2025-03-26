<template>
    <CheckoutStepLayout>
        <form class="flex flex-col gap-2 items-center mt-4" @submit.prevent="handleSubmit">
            <div v-for="field in customerDetailsConfig" :key="field.id" class="flex flex-row gap-4 items-center">
                <label :for="field.id" class="text-sm font-medium w-36 self-center">{{ t(field.labelKey) }}</label>
                <input :type="field.type" :id="field.id" v-model="formInputs[field.id]"
                    class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    :required="field.required" />
            </div>
            <button type="submit" :disabled="!isFormValid || loading"
                class="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 w-64"
                :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || loading }">
                <span v-if="loading">
                    <FontAwesomeIcon :icon="faCircleNotch" class="animate-spin" />
                </span>
                <span v-else>{{ t('checkout.next') }}</span>
            </button>
        </form>
    </CheckoutStepLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { customerDetailsConfig } from './formConfig';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import CheckoutStepLayout from '../layouts/CheckoutStepLayout.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '../../stores/User.store';

const { t } = useI18n();
const userStore = useUserStore();
const loading = ref(false);

const formInputs = ref(
    customerDetailsConfig.reduce((acc: Record<string, string>, field) => {
        acc[field.id] = '';
        return acc;
    }, {})
);

const isFormValid = computed(() => {
    return customerDetailsConfig.every(field => {
        return !field.required || formInputs.value[field.id].trim() !== '';
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

onMounted(async () => {
    try {
        loading.value = true;
        const userData = await userStore.loadUserData();

        if (userData) {
            const fieldMapping: Record<string, keyof typeof userData> = {
                'first_name': 'first_name',
                'email': 'email',
                'address': 'address',
                'city': 'city',
                'state': 'state',
                'zip': 'zip',
                'phone': 'phone',
                'country': 'country'
            };

            customerDetailsConfig.forEach(field => {
                const mappedField = fieldMapping[field.id];
                if (mappedField && userData[mappedField]) {
                    formInputs.value[field.id] = userData[mappedField];
                }
            });
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    } finally {
        loading.value = false;
    }
});
</script>