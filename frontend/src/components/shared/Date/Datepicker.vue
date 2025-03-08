<template>
    <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        </div>
        <input ref="datepickerEl" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="t('trip-planner.select-date')" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Datepicker from 'flowbite-datepicker/Datepicker';
import moment from 'moment-timezone';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const datepickerEl = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (datepickerEl.value) {
        new Datepicker(datepickerEl.value, {
            format: 'yyyy-mm-dd',
            autohide: true,
            todayHighlight: true,
        });

        datepickerEl.value.addEventListener('changeDate', (e: any) => {
            if (e.detail && e.detail.date) {
                const date = e.detail.date;
                const formattedDate = moment(date).tz('Europe/Vienna').format('YYYY-MM-DD');
                emit('update:modelValue', formattedDate);
            }
        });
    }
});
</script>
