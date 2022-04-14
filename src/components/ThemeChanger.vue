<template>
    <v-icon
        @click="handleChange()"
        :icon="check? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        v-ripple
        size="large"
        class="round-btn"
        :class="check ? 'day': 'night'"
    ></v-icon>
</template>

<script setup lang="ts">
import {ref} from "vue";

const check = ref(true);
const handleChange = () => {
    check.value = !check.value;
}
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