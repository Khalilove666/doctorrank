<template>
    <div>
        <h1>All Doctor's Page</h1>
        <div class="v-row">
            <div class="v-col-12 v-col-sm-6">
                <v-text-field
                    v-model="searchTerm"
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
                    v-model="values.selected"
                    :items="professionStore.allProfessions"
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
        <div v-if="doctorStore.allDoctors" class="v-row mt-4" v-for="doctorSquad in displayDoctors">
            <div class="v-col-12 v-col-sm-6 v-col-md-3" v-for="doctor in doctorSquad" :key="doctor._id">
                <DoctorCard :doctor="doctor"/>
            </div>
        </div>
        <p v-else class="text-h3">Nothing Found</p>
    </div>
</template>

<script setup lang="ts">
import DoctorCard from "../components/DoctorCard.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {debounce} from "ts-debounce";
import {useProfessions} from "../store/professions";
import {useDoctors} from "../store/doctors";
import {CompactDoctor} from "../store/doctors/types";

const term = ref("");
const skip = ref(0);
const searchTerm = ref("");
const values = reactive({
    selected: []
});

const professionStore = useProfessions();
const doctorStore = useDoctors();
const searchDoctors = debounce(searchByTerm, 600);


const displayDoctors = computed(() => {
    const allDoctors = doctorStore.allDoctors;
    let doctorSquad: CompactDoctor[] = [];
    let doctors: CompactDoctor[][] = [];
    let count = 0;
    allDoctors.forEach((doctor) => {
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
    await professionStore.fetchProfessions();
    await doctorStore.fetchAllDoctors("", 0);
    window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            await loadMore();
        }
    };
});

async function searchByTerm(event: any) {
    term.value = event.target.value;
    skip.value = 0;
    await doctorStore.fetchAllDoctors(term.value, skip.value);
}

async function loadMore() {
    skip.value = skip.value + 12;
    await doctorStore.fetchAllDoctors(term.value, skip.value);
}

</script>

<style scoped>

</style>