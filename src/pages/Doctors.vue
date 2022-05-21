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
        <v-row v-if="!doctorStore.nothingFound" class="mt-4" >
            <v-col cols="12" sm="6" md="3" v-for="doctor in doctorStore.doctorList" :key="doctor._id">
                <DoctorCard :doctor="doctor"/>
            </v-col>
        </v-row>
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