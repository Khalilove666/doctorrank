import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Comment} from "../dtos";

export const useComments = defineStore("comments", () => {
    const commentsState = ref<Array<Comment>>([]);

    const comments = computed(() => commentsState.value);

    function setComments(comments: Array<Comment>, reset: boolean) {
        let prev = commentsState.value;
        commentsState.value = reset ? comments : prev.concat(comments);
    }

    function appendUserComment(comment: Comment) {
        commentsState.value.splice(0, 0, comment);
    }

    function updateLikeStatus(currentUserId: string, commentId: string, likeStatus: number) {
        const index = commentsState.value.findIndex(comment => comment._id === commentId);
        const likeIndex = commentsState.value[index].likes.findIndex(like => like.user_id === currentUserId);
        if (likeIndex === -1) {
            if (likeStatus === 1) commentsState.value[index].likes.push({user_id: currentUserId, status: true});
            else commentsState.value[index].likes.push({user_id: currentUserId, status: false});
        } else {
            if (likeStatus === 1) commentsState.value[index].likes[likeIndex].status = true;
            else if (likeStatus === -1) commentsState.value[index].likes[likeIndex].status = false;
            else commentsState.value[index].likes.splice(likeIndex, 1);
        }
    }

    return {comments, setComments, appendUserComment, updateLikeStatus};
})