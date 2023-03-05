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
                    v-model="selectedProfession"
                    :items="professions"
                    density="compact"
                    hide-no-data
                    hide-details
                    variant="outlined"
                    label="Professions"
                    clearable
                    color="accent"
                    no-data-text="No professions"
                    item-title="name"
                    item-value="_id"
                >
                </v-autocomplete>
            </div>
        </div>
        <v-progress-linear :active="loading" indeterminate rounded color="accent" class="mt-4"></v-progress-linear>
        <v-row v-if="!nothingFound" class="mt-4">
            <v-col v-for="doctor in doctors" :key="doctor._id" cols="12" sm="6" md="3">
                <DoctorCard :doctor="doctor" />
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
import { onMounted, ref, watch } from "vue";
import { debounce } from "ts-debounce";
import { useScreen } from "../composables/screen";
import { FetchAllDoctors, FetchAllProfessions } from "../api";
import { CompactDoctor, Profession } from "../dtos";
import DoctorCard from "../components/DoctorCard.vue";
// import Autocomplete from "../components/Autocomplete.vue";

const screen = useScreen();
const searchDoctors = debounce(searchByTerm, 600);

const professions = ref<Array<Profession>>([]);
const selectedProfession = ref<string | null>(null);
const doctors = ref<Array<CompactDoctor>>([]);

const term = ref("");
const skip = ref(0);
const loading = ref(true);
const nothingFound = ref(false);
const haveMore = ref(true);

watch(selectedProfession, async () => {
    console.log(selectedProfession.value);

    skip.value = 0;
    haveMore.value = true;
    await fetchAllDoctors();
});

onMounted(async () => {
    await fetchProfessions();
    await fetchAllDoctors();
    screen.onScrolledBottom(async () => {
        if (haveMore.value) {
            skip.value += 24;
            await fetchAllDoctors();
        }
    });
});

async function searchByTerm(event: any) {
    term.value = event.target.value;
    skip.value = 0;
    haveMore.value = true;
    await fetchAllDoctors();
}

async function fetchProfessions() {
    const res = await FetchAllProfessions();
    if (res.ok && res.data) professions.value = res.data;
}

async function fetchAllDoctors() {
    const professionId = selectedProfession.value || "";
    loading.value = true;
    const res = await FetchAllDoctors(term.value, professionId, skip.value, 24);
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
