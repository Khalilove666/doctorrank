<template>
    <v-menu v-model="expand" transition="scroll-y-transition">
        <template #activator="{ props }">
            <div
                v-ripple
                v-bind="props"
                class="d-flex align-center pa-0 pr-2 cursor-pointer"
                :class="{ 'full-width': fullWidth, 'text-white-text': whiteText }"
            >
                <country-flag class="ma-0" :country="selectedLang?.id" size="normal" rounded></country-flag>
                <p>{{ selectedLang?.short }}</p>
            </div>
        </template>
        <v-list rounded>
            <v-list-item v-for="lang in languages" :key="lang.id" link @click="changeLocale(lang.id)">
                <template #prepend>
                    <country-flag class="ma-0" :country="lang.id" size="normal"></country-flag>
                </template>
                <v-list-item-title>{{ lang.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import CountryFlag from "vue-country-flag-next";
import { computed, ref } from "vue";
import { useThemeAndLang } from "../store/theme";

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
];

defineProps({
    fullWidth: Boolean,
    whiteText: Boolean,
});
const themeAndLang = useThemeAndLang();
const expand = ref(false);
const selectedLang = computed(() => languages.find((lang) => lang.id == themeAndLang.currentLang));

const changeLocale = (id: string) => {
    themeAndLang.changeLang(id);
    expand.value = false;
};
</script>

<style scoped></style>
