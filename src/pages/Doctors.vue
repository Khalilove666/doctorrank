<template>
    <div>
        <h1>All Doctor's Page</h1>
        <div class="v-row">
            <div class="v-col-12 v-col-sm-6">
                <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Search term"
                    color="accent"
                    hide-details
                ></v-text-field>
            </div>
            <div class="v-col-12 v-col-sm-6">
                <v-autocomplete
                    v-model="values.selected"
                    :items="items"
                    density="compact"
                    chips
                    small-chips
                    label="Solo"
                    multiple
                    clearable
                    variant="outlined"
                    color="accent"
                    hide-details
                ></v-autocomplete>
            </div>
        </div>
        <div class="v-row">
            <div class="v-col-12 v-col-sm-6 v-col-md-3" v-for="doctor in doctors" :key="doctor.id">
                <DoctorCard/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DoctorCard from "../components/DoctorCard.vue";
import {reactive} from "vue";

const values = reactive({
    selected: ['foo', 'bar']
});
const items = ['foo', 'bar', 'fizz', 'buzz'];

const doctors = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
]
</script>

<style scoped>

</style>