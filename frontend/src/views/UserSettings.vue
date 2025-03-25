<template>
    <AppLayout>
        <div class="container px-4 py-8">
            <h1 class="text-2xl font-bold">{{ t('user-settings.title') }}</h1>
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
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layouts/AppLayout.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/User.store';

const { t } = useI18n();
const userStore = useUserStore();

const name = ref('');
const email = ref('');
const address = ref('');
const city = ref('');
const state = ref('');
const zip = ref('');
const phone = ref('');
const discount = ref('');
const passengerType = ref('');


onMounted(async () => {
    const user = await userStore.getUser();
    name.value = user?.user_metadata.first_name || '';
    email.value = user?.email || '';
});
</script>
