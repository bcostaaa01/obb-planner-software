<template>
    <span
        class="text-white text-md text-center bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mr-2"
        @click="toggleDropdown">{{ avatar }}</span>

    <AuthLayout :show-dropdown="showDropdown" class="mt-14" :is-user-logged="isUserLogged" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import { useUserAvatar } from "../../composables/useUserAvatar";

const showDropdown = ref(false);
const isUserLogged = ref(false);

function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
}

const { avatar } = useUserAvatar();

onMounted(() => {
    isUserLogged.value = sessionStorage.getItem("user") !== null;
});
</script>
