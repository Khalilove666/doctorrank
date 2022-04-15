<template>
    <v-menu transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                class="text-white-text pa-0 pr-2"
            >
                <country-flag class="ma-0" country="az" size="normal" rounded></country-flag>
                <p>AZ</p>
            </v-btn>
        </template>
        <v-list rounded>
            <v-list-item
                v-for="lang in languages"
                :key="lang.id"
                link
            >
                <v-list-item-avatar>
                    <country-flag :country="lang.id" size="normal"></country-flag>
                </v-list-item-avatar>
                <v-list-item-title>{{ lang.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next';

const languages = [
    {
        id: "az",
        short: "AZ",
        text: "Azərbaycanca",
    },
    {
        id: "gb",
        short: "EN",
        text: "English",
    },
    {
        id: "ru",
        short: "РУ",
        text: "Русский",
    },
]
</script>

<style scoped>
</style>