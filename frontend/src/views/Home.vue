<template>
    <div class="flex flex-col"
        style="background-image: url('https://image-service.web.oebb.at/pv/.imaging/default/dam/reiseportal/opengraph/website.jpg/jcr:content.jpg?t=1632657987575&scale=1.0'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <TopNavigationBar />
        <div class="flex flex-col items-center justify-center h-screen relative">

            <div class="absolute right-0 bottom-10 m-4">
                <TripPlannerForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import TopNavigationBar from '../components/shared/Navigation/TopNavigationBar.vue';
import TripPlannerForm from '../components/TripPlanner/TripPlannerForm.vue';

const { t } = useI18n();
</script>