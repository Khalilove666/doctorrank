<template>
    <v-app>
        <v-main>
            <Header/>
            <div class="px-4 ">
                <router-view></router-view>
            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

