import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {Comment, CommentForUpload} from "./types";
import {LikeOrDislikeComment, performRequest, UploadComment} from "../../api";


export const useComments = defineStore("comments", () => {
    const comments = ref<Comment[]>([]);
    const load = ref(true);
    const successState = ref(false);
    const errorState = reactive({
        exist: false,
        text: "",
    });
    const skipState = ref(0);

    const allComments = computed(() => comments.value);
    const haveMoreToLoad = computed(() => load.value);
    const success = computed(() => successState.value);
    const error = computed(() => errorState);
    const skip = computed(() => skipState.value);

    function setSuccess(value: boolean) {
        successState.value = value;
    }

    function setError(exist: boolean, text: string) {
        errorState.exist = exist;
        errorState.text = text;
    }

    function setSkip(value: number) {
        skipState.value = value;
    }

    function incrementSkip() {
        skipState.value += 12;
    }

    async function fetchAllComments(doctorId: string) {
        const res = await performRequest(`/comments?doctorId=${doctorId}&skip=${skip.value}&limit=${12}`, null, "GET")
        if (res.ok) {
            if (res.data === null) {
                load.value = false;
            } else {
                let prev = comments.value;
                comments.value = skip.value === 0 ? res.data : prev.concat(res.data);
            }
            incrementSkip();
        }
    }

    async function uploadComment(doctorId: string, comment: CommentForUpload) {
        const res = await UploadComment(doctorId, comment);
        if (res.ok) {
            setSuccess(true);
            setSkip(0);
            await fetchAllComments(doctorId);
        } else setError(true, res.error);
    }

    async function likeOrDislikeComment(commentId: string, likeStatus: number) {
        const res = await LikeOrDislikeComment(commentId, likeStatus);
        if (res.ok) {
        }
    }

    return {allComments, success, error, skip, haveMoreToLoad, setSkip, fetchAllComments, uploadComment, likeOrDislikeComment};
})