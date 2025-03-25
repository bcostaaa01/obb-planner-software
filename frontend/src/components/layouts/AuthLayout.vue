<template>
    <div v-if="showDropdown" class="absolute top-2 right-0 mr-2 bg-white p-4 shadow-md">
        <div v-if="isLogin && !isUserLogged" class="flex flex-col gap-4">
            <h1 class="text-2xl text-center text-gray-600">{{ t('auth.login') }}</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                <input type="text" placeholder="Email" v-model="email" class="border border-gray-300 p-2" />
                <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                <input type="password" placeholder="Password" v-model="password" class="border border-gray-300 p-2" />
                <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
                <button type="submit" class="bg-red-600 hover:bg-red-800 text-white px-4 py-2 cursor-pointer"
                    :disabled="isLoading">
                    <span v-if="!isLoading">{{ t('auth.login') }}</span>
                    <FontAwesomeIcon v-if="isLoading" :icon="faCircleNotch" class="w-4 h-4 ml-2 text-white" />
                </button>
            </form>

            <button @click="isLogin = false" class="text-red-700 cursor-pointer">
                {{ t('auth.switch-to-register') }}
            </button>
        </div>

        <div v-else-if="!isLogin && !isUserLogged" class="flex flex-col gap-4">
            <h1 class="text-2xl text-center text-gray-600">{{ t('auth.register') }}</h1>
            <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
                <input type="text" placeholder="First Name" v-model="firstName" class="border border-gray-300 p-2" />
                <span v-if="errors.firstName" class="text-red-500">{{ errors.firstName }}</span>
                <input type="text" placeholder="Email" v-model="email" class="border border-gray-300 p-2" />
                <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                <input type="password" placeholder="Password" v-model="password" class="border border-gray-300 p-2" />
                <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
                <button type="submit" class="bg-red-600 hover:bg-red-800 text-white px-4 py-2 cursor-pointer"
                    :disabled="isLoading">
                    <span v-if="!isLoading">{{ t('auth.register') }}</span>
                    <FontAwesomeIcon v-if="isLoading" :icon="faCircleNotch" class="w-4 h-4 ml-2 text-white" />
                </button>
            </form>
            <button @click="isLogin = true" class="text-red-700 cursor-pointer">{{ t('auth.switch-to-login') }}</button>
        </div>

        <div v-else-if="isUserLogged" class="flex flex-col gap-4">
            <UserMenu :user-first-name="userFirstName" @sign-out="handleSignOut" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '../../auth/useAuth';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useValidateInputs } from '../../composables/useValidateInputs';
import UserMenu from '../shared/Navigation/UserMenu.vue';

const { t } = useI18n();

const { signIn, signOut, signUp, getUser } = useAuth();
const email = ref('');
const password = ref('');
const firstName = ref('');
const isLogin = ref(true);
const isLoading = ref(false);

defineProps({
    showDropdown: {
        type: Boolean,
        default: false
    },
    isUserLogged: {
        type: Boolean,
        default: false
    }
});

const userSession = ref('');
const userEmail = ref('');
const userFirstName = ref('');
const { errors, validateAuthInputs } = useValidateInputs();

const handleLogin = async () => {
    if (!validateAuthInputs(email.value, password.value, firstName.value, isLogin.value)) return;
    isLoading.value = true;
    await signIn(email.value, password.value);
    isLoading.value = false;
}

const handleRegister = async () => {
    if (!validateAuthInputs(email.value, password.value, firstName.value, isLogin.value)) return;
    isLoading.value = true;
    await signUp(firstName.value, email.value, password.value);
    isLoading.value = false;
}

const handleSignOut = async () => {
    isLoading.value = true;
    await signOut();
    isLoading.value = false;
}

onMounted(async () => {
    const user = await getUser();
    userSession.value = sessionStorage.getItem("user") || '';
    if (userSession.value && user && user.identities && user.identities[0] && user.identities[0].identity_data) {
        userEmail.value = user.identities[0].identity_data.email || '';
        userFirstName.value = user.identities[0].identity_data.first_name || '';
    }
});
</script>