import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {CompactDoctor, Doctor} from "./types";
import {FetchAllDoctors, FetchDoctorById, performRequest} from "../../api";


export const useDoctors = defineStore("doctors", () => {
    const doctorListState = ref<CompactDoctor[]>([]);
    const doctorState = ref<Doctor>({
        _id: "",
        about: "",
        contact: {email: "", facebook: "", phone: ""},
        created_at: 0,
        education: [],
        experience: [],
        first_name: "",
        full_name: "",
        hospital: {_id: "", name: "", img: ""},
        img: "",
        last_name: "",
        profession: {_id: "", name: ""},
        rate: 0,
        reviews: 0,
        title: "",
        updated_at: 0,
        user_id: ""
    });
    const loadMoreState = ref(true);
    const nothingFoundState = ref(false);

    // GETTERS
    const doctorList = computed(() => doctorListState.value);
    const doctor = computed(() => doctorState.value);
    const loadMore = computed(() => loadMoreState.value)
    const nothingFound = computed(() => nothingFoundState.value)


    // ACTIONS

    function setLoadMore(value: boolean) {
        loadMoreState.value = value;
    }

    function setNothingFound(value: boolean) {
        nothingFoundState.value = value;
    }

    async function fetchAllDoctors(term: string, skip: number, limit: number = 12) {
        const res = await FetchAllDoctors(term, skip, limit);
        if (res.ok) {
            if (res.data === null) {
                if (skip === 0) {
                    doctorListState.value = [];
                    nothingFoundState.value = true;
                }
                setLoadMore(false);
            } else {
                nothingFoundState.value = false;
                const prev = doctorListState.value;
                doctorListState.value = skip === 0 ? res.data : prev.concat(res.data);
            }
        }
    }

    async function fetchDoctorById(doctor_id: string) {
        const res = await FetchDoctorById(doctor_id);
        if (res.ok) {
            doctorState.value = res.data;
        }
    }

    return {doctorList, doctor, loadMore, nothingFound, setLoadMore, fetchAllDoctors, fetchDoctorById};

})