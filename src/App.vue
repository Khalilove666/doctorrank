<template>
    <v-app>
        <v-main>
            <Header/>
            <div class="px-4 bgc-light-primary" style="min-height: calc(100vh - 56px)">
                <router-view></router-view>
            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

