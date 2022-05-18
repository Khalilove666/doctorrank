import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {performRequest} from "../api";


export interface Profession {
    _id: string
    name: string
}

export const useProfessions = defineStore("professions", () => {
    // STATE
    const professions = ref<Profession[]>([]);

    // GETTERS
    const allProfessions = computed(() => professions.value)

    // ACTIONS
    async function fetchProfessions() {
        const res = await performRequest("/professions", null, "GET",);
        if (res.ok) {
            professions.value = res.data;
        }
    }

    return {allProfessions, fetchProfessions};
})