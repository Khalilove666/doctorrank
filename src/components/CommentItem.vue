<template>
    <div class="d-flex justify-space-between align-center">
        <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
                <v-rating
                    v-model="comment.rate"
                    half-increments
                    readonly
                    color="accent"
                    size="small"
                    density="compact"
                ></v-rating>
                <p class="ml-2">({{ comment.rate }})</p>
            </div>
            <p class="ml-2 text-grey-darken-1">{{ moment.unix(comment.updated_at).format("DD.MM.YYYY") }}</p>
        </div>
        <div class="d-flex justify-space-between align-center">
            <v-btn
                size="small"
                variant="text"
                icon="mdi-thumb-up"
                :color="currentUserLike === 1? 'accent': ''"
                @click="handleCommentLike(1)"
            ></v-btn>
            <p>{{ comment.likes.filter(like => like.status).length }}</p>
            <v-btn
                size="small"
                variant="text"
                icon="mdi-thumb-down"
                :color="currentUserLike === -1 ? 'accent': ''"
                @click="handleCommentLike(-1)"
            ></v-btn>
            <p>{{ comment.likes.filter(like => !like.status).length }}</p>
        </div>
    </div>
    <div class="v-row">
        <div class="v-col-12 v-col-md-2">
            <v-list-item
                class="pl-0"
                v-ripple
                :prepend-avatar="comment.user.img"
                :title="comment.user.first_name + ' ' + comment.user.last_name"
                :subtitle="comment.user.username"
            ></v-list-item>
        </div>
        <div class="v-col-12 v-col-md-10">
            <p>{{ comment.text }}</p>
        </div>
    </div>
    <v-divider></v-divider>
</template>

<script setup lang="ts">
import evelyn from "../assets/img/evelyn.jpg";
import {computed, ref} from "vue";
import {Comment} from "../store/comments/types";
import moment from "moment";
import {useUser} from "../store/user";
import {useComments} from "../store/comments";

const userStore = useUser();
const commentStore = useComments();

const props = defineProps<{ comment: Comment }>()

const currentUserLike = computed(() => {
    const obj = props.comment.likes.find(like => like.user_id === userStore.user._id);
    if (!obj) return 0;
    else if (obj.status) return 1;
    else return -1;
})

async function handleCommentLike(status: number) {
    let likeStatus = 0;
    if (currentUserLike.value === 1) {
        if (status === 1) likeStatus = 0;
        else likeStatus = -1;
    } else if (currentUserLike.value === -1) {
        if (status === -1) likeStatus = 0;
        else likeStatus = 1;
    } else likeStatus = status;
    await commentStore.likeOrDislikeComment(props.comment._id, likeStatus);
}

</script>

<style scoped lang="scss">
</style>