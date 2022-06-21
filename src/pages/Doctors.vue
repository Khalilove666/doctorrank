<template>
    <div>
        <h1>All Doctor's Page</h1>
        <div class="v-row">
            <div class="v-col-12 v-col-sm-6">
                <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Axtarış sözü"
                    color="accent"
                    hide-details
                    @input="searchDoctors($event)"
                ></v-text-field>
            </div>
            <div class="v-col-12 v-col-sm-6">
                <v-autocomplete
                    v-model="selectedProfessions"
                    :items="professions"
                    density="compact"
                    chips
                    small-chips
                    label="İxtisas"
                    clearable
                    variant="outlined"
                    color="accent"
                    hide-details
                ></v-autocomplete>
            </div>
        </div>
        <v-progress-linear
            :active="loading"
            indeterminate
            rounded
            color="accent"
            class="mt-4"
        ></v-progress-linear>
        <v-row v-if="!nothingFound" class="mt-4">
            <v-col cols="12" sm="6" md="3" v-for="doctor in doctors" :key="doctor._id">
                <DoctorCard :doctor="doctor"/>
            </v-col>
        </v-row>
        <div v-else class="nothing-found">
            <p class="text-h3 mt-4 full-width text-align-center">Nothing Found</p>
        </div>
        <div v-if="!nothingFound && !haveMore">
            <p class="text-h3 mt-4 full-width text-align-center">No more result</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {debounce} from "ts-debounce";
import {useScreen} from "../composables/screen";
import {FetchAllDoctors, FetchAllProfessions} from "../api";
import {CompactDoctor, Profession} from "../dtos";
import DoctorCard from "../components/DoctorCard.vue";

const screen = useScreen();
const searchDoctors = debounce(searchByTerm, 600);

const professions = ref<Profession[]>([]);
const selectedProfessions = ref<Array<Profession>>([]);
const doctors = ref<Array<CompactDoctor>>([]);

const term = ref("");
const skip = ref(0);
const loading = ref(true);
const nothingFound = ref(false);
const haveMore = ref(true);

onMounted(async () => {
    await fetchProfessions();
    await fetchAllDoctors();
    screen.onScrolledBottom(async () => {
        if (haveMore.value) {
            skip.value += 24;
            await fetchAllDoctors();
        }
    })
});

async function searchByTerm(event: any) {
    term.value = event.target.value;
    skip.value = 0;
    haveMore.value = true;
    await fetchAllDoctors();
}

async function fetchProfessions() {
    const res = await FetchAllProfessions();
    if (res.ok) professions.value = res.data;
}

async function fetchAllDoctors() {
    loading.value = true;
    const res = await FetchAllDoctors(term.value, skip.value, 24);
    loading.value = false;
    if (res.ok) {
        if (!res.data) {
            if (skip.value === 0) {
                doctors.value = [];
                nothingFound.value = true;
            } else {
                haveMore.value = false;
            }
        } else {
            nothingFound.value = false;
            const prev = doctors.value;
            doctors.value = skip.value === 0 ? res.data : prev.concat(res.data);
        }
    }
}


</script>

<style scoped lang="scss">
.nothing-found {
    background: url("../assets/img/confused.svg") no-repeat center;
    background-size: auto 200px;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: end;
}
</style>