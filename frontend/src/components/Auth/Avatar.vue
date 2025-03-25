<template>
    <div v-if="isLoading"
        class="text-white text-md text-center bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center mr-2">
        <FontAwesomeIcon :icon="faCircleNotch" class="w-4 h-4 text-white animate-spin" />
    </div>
    <span v-else-if="isUserLogged"
        class="text-white text-md text-center bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mr-2"
        @click="toggleDropdown">
        {{ avatar }}
    </span>
    <span v-else
        class="text-gray-700 hover:text-gray-900 transition-colors hover:bg-gray-200 py-2 px-4 text-md text-center cursor-pointer mr-2"
        @click="toggleDropdown">
        {{ t('auth.login') }}
    </span>

    <AuthLayout :show-dropdown="showDropdown" class="mt-14" :is-user-logged="isUserLogged" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import { useUserAvatar } from "../../composables/useUserAvatar";
import { useI18n } from 'vue-i18n';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useUserStore } from "../../stores/User.store";

const { t } = useI18n();
const userStore = useUserStore();

const showDropdown = ref(false);
const isUserLogged = ref(false);

function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
}

const { avatar, isLoading } = useUserAvatar();

onMounted(async () => {
    isUserLogged.value = sessionStorage.getItem("user") !== null;
    if (isUserLogged.value) {
        await userStore.getUser();
    }
});
</script>
