<template>
    <AppLayout>
        <div class="container px-4 py-8">
            <h1 class="text-2xl font-bold">{{ t('user-settings.title') }}</h1>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label for="name">{{ t('user-settings.name') }}</label>
                    <input type="text" id="name" v-model="name" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="email">{{ t('user-settings.email') }}</label>
                    <input type="email" id="email" v-model="email" />
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

onMounted(async () => {
    const user = await userStore.getUser();
    name.value = user?.user_metadata.first_name || '';
    email.value = user?.email || '';
});
</script>
