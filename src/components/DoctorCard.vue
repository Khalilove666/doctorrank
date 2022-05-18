<template>
    <router-link class="text-decoration-none" :to="'/doctors/' + props.doctor._id" target="_blank">
        <v-card
            class="mx-auto cursor-pointer"
            rounded
        >
            <v-img
                :src="props.doctor.img"
                cover
                height="400"
            ></v-img>
            <v-card-title>
                {{ props.doctor.title + " " + props.doctor.first_name + " " + props.doctor.last_name }}
            </v-card-title>
            <v-card-actions>
                <v-chip
                    color="pink"
                    label
                    text-color="white"
                >
                    <v-icon start icon="mdi-label"></v-icon>
                    {{ props.doctor.profession.name }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                    v-ripple
                    color="accent"
                    variant="outlined"
                >
                    <v-avatar left>
                        <v-img :src="props.doctor.hospital.img"></v-img>
                    </v-avatar>
                    {{ props.doctor.hospital.name }}
                </v-chip>
            </v-card-actions>
        </v-card>
    </router-link>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {CompactDoctor} from "../store/doctors/types";
import {useRouter} from "vue-router";

interface Obj {
    doctor: CompactDoctor
}

const router = useRouter();

const props = defineProps<Obj>()

const show = ref(false);

function goToDoctorPage() {
    router.push({name: "doctor", params: {doctorId: props.doctor._id,}})
}

</script>

<style scoped>

</style>