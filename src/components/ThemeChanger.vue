<template>
    <v-icon
        @click="theme.toggleTheme()"
        :icon="bool ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        v-ripple
        size="large"
        class="round-btn"
        :class="bool ? 'day': 'night'"
    ></v-icon>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useCustomTheme} from "../store/theme";

const theme = useCustomTheme();
const bool = computed(() => {
    return theme.currentTheme == "lightTheme"
})

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