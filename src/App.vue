<template>
    <v-app :theme="theme">
        <Header/>
        <v-main>
            <div class="px-4 bg-light-primary" style="min-height: calc(100vh - 48px)">
                <router-view></router-view>
            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import {ref} from "vue";

const theme = ref("lightTheme");
</script>

