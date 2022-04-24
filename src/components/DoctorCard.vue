<template>
    <v-card
        class="mx-auto cursor-pointer"
        rounded
    >
        <v-img
            :src="evelyn"
            cover
            height="400"
        ></v-img>
        <v-card-title>
            Evelyn Claire
        </v-card-title>
        <v-card-actions>
            <v-chip
                color="pink"
                label
                text-color="white"
            >
                <v-icon start icon="mdi-label"></v-icon>
                Mama-ginekoloq
            </v-chip>
            <v-spacer></v-spacer>
            <v-chip
                v-ripple
                color="accent"
                variant="outlined"
            >
                <v-avatar left>
                    <v-img :src="av_hsp"></v-img>
                </v-avatar>
                Avrasiya Hospital
            </v-chip>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import evelyn from "../assets/img/evelyn.jpg";
import av_hsp from "../assets/img/av_hsp.png";

interface Doctor {
    first_name: string,
    last_name: string,
    img: string,
    profession: string,
    hospital: [
        name: string,
        logo: string,
    ],
}

interface Obj {
    doctor: Doctor
}

const props = defineProps<Obj>()

const show = ref(false);

</script>

<style scoped>

</style>