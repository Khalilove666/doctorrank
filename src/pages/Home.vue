<template>
    <h1>Home Page</h1>
    <div class="v-row">
        <div class="v-col-12">
            <Autocomplete v-model="selected" :items="items" />
        </div>
        <div class="v-col-12">
            <v-text-field variant="outlined" density="compact"></v-text-field>
        </div>
        <p>{{ selected?.text }}</p>
        <p>{{ selected?.img }}</p>
    </div>
</template>

<script setup lang="ts">
import Autocomplete from "../components/Autocomplete.vue";
import { ref } from "vue";

const items = ref([
    {
        img: "",
        text: "Avrasiya Hospital",
    },
    {
        img: "",
        text: "Respublikanski",
    },
    {
        img: "",
        text: "HB Guven Hospital",
    },
    {
        img: "",
        text: "Istanbul NS",
    },
]);
const selected = ref<{ text: string; img: string } | null>(null);
</script>

<style scoped></style>
