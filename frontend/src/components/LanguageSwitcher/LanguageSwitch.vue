<template>
    <div class="relative inline-block text-left">
        <div>
            <button type="button"
                class="inline-flex justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
                id="menu-button" aria-expanded="true" aria-haspopup="true" @click="toggleDropdown">
                <div class="flex items-center">
                    <img :src="currentLanguage.icon" alt="Language Icon" class="rounded-sm w-5 h-4 mr-3">
                    {{ currentLanguage.label }}
                    <FontAwesomeIcon :icon="faChevronDown" class="w-4 h-4 ml-2" />
                </div>
            </button>
        </div>

        <div v-if="dropdownOpen"
            class="absolute right-0 z-10 mt-2 w-56 bg-white ring-1 shadow-lg ring-black/5" role="menu"
            aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <a v-for="language in languages" :key="language.code" href="#"
                    @click.prevent="changeLanguage(language.code)"
                    :class="['flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-700', { 'bg-red-600': language.code === currentLanguage.code }]"
                    role="menuitem" tabindex="-1">
                    <img :src="language.icon" alt="Language Icon" class="rounded-sm w-5 h-4 mr-2">
                    <div :class="['text-gray-700', { 'text-white': language.code === currentLanguage.code }]">
                        {{ language.label }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLanguageSwitch } from '../../composables/useLanguageSwitch';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const { languages, currentLanguage, dropdownOpen, toggleDropdown, changeLanguage } = useLanguageSwitch();

onMounted(() => {
    const languageParams = new URLSearchParams(window.location.search);
    const language = languageParams.get('language');
    if (language) {
        changeLanguage(language);
    }
});
</script>