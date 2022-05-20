<template>
    <v-app :theme="theme.currentTheme">
        <Header/>
        <v-main>
            <div class="px-4 pb-4 bg-light-primary" style="min-height: calc(100vh - 48px)">
                <router-view></router-view>
            </div>
        </v-main>
        <Footer/>
    </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import {ref} from "vue";
import {useThemeAndLang} from "./store/theme";
import Footer from "./components/Footer.vue";

const theme = useThemeAndLang();
</script>

