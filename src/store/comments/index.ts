import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Comment} from "./types";
import {performRequest} from "../../api";


export const useComments = defineStore("comments", () => {
    const comments = ref<Comment[]>([]);
    const load = ref(true);

    const allComments = computed(() => comments.value)
    const haveMoreToLoad = computed(() => load.value)


    async function fetchAllComments(doctorId: string, skip: number, limit: number = 12) {
        const res = await performRequest(`/comments?doctorId=${doctorId}&skip=${skip}&limit=${limit}`, null, "GET")
        if (res.ok) {
            if (res.data === null) {
                load.value = false;
            } else {
                let prev = comments.value;
                comments.value = prev.concat(res.data);
            }
        }
    }

    return {allComments, haveMoreToLoad, fetchAllComments};
})