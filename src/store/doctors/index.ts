import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {CompactDoctor, Doctor} from "./types";
import {performRequest} from "../../api";


export const useDoctors = defineStore("doctors", () => {
    const compactDoctors = ref<CompactDoctor[]>([]);
    const doctor = ref<Doctor | null>(null)

    // GETTERS
    const allDoctors = computed(() => compactDoctors.value);
    const singleDoctor = computed(() => doctor.value);


    // ACTIONS
    async function fetchAllDoctors(term: string, skip: number, limit: number = 12) {
        if (skip == 0) compactDoctors.value = [];
        const res = await performRequest(`/doctors?term=${term}&skip=${skip}&limit=${limit}`, null, "GET");
        if (res.ok && res.data != null) {
            let prev = compactDoctors.value;
            compactDoctors.value = prev.concat(res.data);
        }
    }

    async function fetchDoctorById(user_id: string) {
        const res = await performRequest("/doctors/" + user_id, null, "GET")
        if (res.ok) {
            doctor.value = res.data;
        }
    }

    return {allDoctors, singleDoctor, fetchAllDoctors, fetchDoctorById};

})