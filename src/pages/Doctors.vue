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
                    :items="professionStore.allProfessions"
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
        <div v-if="!doctorStore.nothingFound" class="v-row mt-4" v-for="doctorSquad in displayDoctors">
            <div class="v-col-12 v-col-sm-6 v-col-md-3" v-for="doctor in doctorSquad" :key="doctor._id">
                <DoctorCard :doctor="doctor"/>
            </div>
        </div>
        <div v-else class="nothing-found">
            <p class="text-h3 mt-4 full-width text-align-center">Nothing Found</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import DoctorCard from "../components/DoctorCard.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {debounce} from "ts-debounce";
import {Profession, useProfessions} from "../store/professions";
import {useDoctors} from "../store/doctors";
import {CompactDoctor} from "../store/doctors/types";
import {useScreen} from "../composables/screen";

const searchDoctors = debounce(searchByTerm, 600);
const professionStore = useProfessions();
const doctorStore = useDoctors();
const screen = useScreen();

const term = ref("");
const skip = ref(0);
const loading = ref(true);
const selectedProfessions = ref<Array<Profession>>([]);

const displayDoctors = computed(() => {
    const allDoctors = doctorStore.doctorList;
    let doctorSquad: CompactDoctor[] = [];
    let doctors: CompactDoctor[][] = [];
    let count = 0;
    allDoctors.forEach((doctor: CompactDoctor) => {
        if (count < 4) {
            doctorSquad.push(doctor)
        } else {
            doctors.push(doctorSquad);
            count = 0;
            doctorSquad = [];
        }
    })
    doctors.push(doctorSquad);
    return doctors;
});


onMounted(async () => {
    loading.value = true;
    await professionStore.fetchProfessions();
    await doctorStore.fetchAllDoctors("", 0);
    loading.value = false;
    screen.onScrolledBottom(async () => {
        if (doctorStore.loadMore) {
            loading.value = true;
            await loadMore();
            loading.value = false;
        }
    })
});

async function searchByTerm(event: any) {
    term.value = event.target.value;
    skip.value = 0;
    doctorStore.setLoadMore(true);
    loading.value = true;
    await doctorStore.fetchAllDoctors(term.value, skip.value);
    loading.value = false;
}

async function loadMore() {
    skip.value = skip.value + 12;
    await doctorStore.fetchAllDoctors(term.value, skip.value);
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