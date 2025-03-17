<template>
    <img src="https://static01.nyt.com/images/2025/02/13/multimedia/13paddingtonperu-review-kcjg/13paddingtonperu-review-kcjg-facebookJumbo.jpg"
        alt="Avatar" class="w-10 h-10 mr-2 cursor-pointer" @click="toggleDropdown" />

    <AuthLayout :show-dropdown="showDropdown" class="mt-14" :is-user-logged="isUserLogged" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "../../auth/useAuth";
import AuthLayout from "../layouts/AuthLayout.vue";

const isUserLogged = ref(false);

const { user } = useAuth();

const showDropdown = ref(false);

function toggleDropdown() {
    console.log('toggleDropdown');
    showDropdown.value = !showDropdown.value;
}

onMounted(() => {
    
    isUserLogged.value = sessionStorage.getItem("user") !== null;
});
</script>
