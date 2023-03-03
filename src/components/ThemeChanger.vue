<template>
    <v-icon
        v-ripple
        :icon="bool ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        size="large"
        class="round-btn cursor-pointer"
        :class="bool ? 'day' : 'night'"
        @click="theme.toggleTheme()"
    ></v-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeAndLang } from "../store/theme";

const theme = useThemeAndLang();
const bool = computed(() => {
    return theme.currentTheme == "lightTheme";
});
</script>

<style scoped lang="scss">
.day {
    transform: rotate(0deg);
    transition: transform 300ms;
}

.night {
    transform: rotate(360deg);
    transition: transform 300ms;
}
</style>
