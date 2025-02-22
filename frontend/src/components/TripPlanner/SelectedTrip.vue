<template>
    <div class="flex flex-col bg-white p-4 mr-8">
        <ol class="relative border-s border-gray-200 dark:border-gray-500">
            <li v-for="(station, index) in stations" :key="index" class="mb-4 ms-4">
                <div
                    class="absolute w-3 h-3 bg-gray-200 rounded-full mt-2 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                </div>
                <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-900">{{ station.title }}</h3>
                    <p class="mb-1 text-base font-normal text-gray-500 dark:text-gray-400">{{ station.description }}</p>
                </div>
                <div class="flex flex-col">
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ station.date
                        }}</time>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ station.time
                        }}</time>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup>
defineProps({
    stations: {
        type: Array,
        required: true
    },
});
</script>