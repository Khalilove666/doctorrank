<template>
    <div id="app">
        <v-app :theme="theme.currentTheme">
            <Header />
            <v-main>
                <div class="px-4 pb-4 bg-light-primary" style="min-height: calc(100vh - 48px)">
                    <router-view></router-view>
                </div>
            </v-main>
            <Footer />
        </v-app>
    </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import { useThemeAndLang } from "@/store";
import Footer from "@/components/Footer.vue";

const theme = useThemeAndLang();
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");

#app {
    font-family: Ubuntu, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
