<template>
    <AppLayout>
        <div class="container px-4 py-8">
            <h1 class="text-2xl font-bold">{{ t('user-settings.title') }}</h1>

            <div v-if="userStore.error" class="text-red-500 mb-4">
                {{ userStore.error }}
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label for="name">{{ t('user-settings.personal-details.name') }}</label>
                    <input type="text" id="name" v-model="name" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="email">{{ t('user-settings.personal-details.email') }}</label>
                    <input type="email" id="email" v-model="email" />
                </div>
                <span class="text-sm text-gray-500">{{ t('user-settings.personal-details.title') }}</span>
                <div class="flex flex-col gap-2">
                    <label for="address">{{ t('user-settings.personal-details.address') }}</label>
                    <input type="text" id="address" v-model="address" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="city">{{ t('user-settings.personal-details.city') }}</label>
                    <input type="text" id="city" v-model="city" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="state">{{ t('user-settings.personal-details.state') }}</label>
                    <input type="text" id="state" v-model="state" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="zip">{{ t('user-settings.personal-details.zip') }}</label>
                    <input type="text" id="zip" v-model="zip" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="phone">{{ t('user-settings.personal-details.phone') }}</label>
                    <input type="text" id="phone" v-model="phone" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="country">{{ t('user-settings.personal-details.country') }}</label>
                    <input type="text" id="country" v-model="country" />
                </div>
                <span class="text-sm text-gray-500">{{ t('user-settings.customer-details.title') }}</span>
                <div class="flex flex-col gap-2">
                    <label for="discount">{{ t('user-settings.customer-details.discount') }}</label>
                    <input type="text" id="discount" v-model="discount" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="passenger-type">{{ t('user-settings.customer-details.passenger-type') }}</label>
                    <input type="text" id="passenger-type" v-model="passengerType" />
                </div>
            </div>

            <div class="flex justify-end mt-4">
                <button @click="handleSave"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
                    :disabled="userStore.loading">
                    {{ userStore.loading ? 'Saving...' : t('user-settings.save') }}
                </button>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layouts/AppLayout.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/User.store';
import { useToast } from 'vue-toastification';

const { t } = useI18n();
const userStore = useUserStore();

const name = ref('');
const email = ref('');
const address = ref('');
const city = ref('');
const state = ref('');
const zip = ref('');
const phone = ref('');
const country = ref('');
const discount = ref('');
const passengerType = ref('');

const toast = useToast();

const handleSave = async () => {
    try {
        await userStore.saveUserData({
            first_name: name.value,
            email: email.value,
            address: address.value,
            city: city.value,
            state: state.value,
            zip: zip.value,
            phone: phone.value,
            country: country.value,
            discount: discount.value,
            passenger_type: passengerType.value
        });
        toast.success(t('user-settings.notifications.success'));
    } catch (error) {
        toast.error(t('user-settings.notifications.error'));
    }
};

onMounted(async () => {
    try {
        const userData = await userStore.loadUserData();
        if (userData) {
            name.value = userData.first_name || '';
            email.value = userData.email || '';
            address.value = userData.address || '';
            city.value = userData.city || '';
            state.value = userData.state || '';
            zip.value = userData.zip || '';
            phone.value = userData.phone || '';
            country.value = userData.country || '';
            discount.value = userData.discount || '';
            passengerType.value = userData.passenger_type || '';
        }
    } catch (error) {
        toast.error(t('user-settings.notifications.error') + ' ' + (error as Error).message);
    }
});
</script>
