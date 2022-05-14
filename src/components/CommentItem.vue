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
            ></v-btn>
            <p>{{ comment.likes.filter(like => like.status).length }}</p>
            <v-btn
                size="small"
                variant="text"
                icon="mdi-thumb-down"
            ></v-btn>
            <p>{{ comment.likes.filter(like => !like.status).length }}</p>
        </div>
    </div>
    <div class="v-row">
        <div class="v-col-12 v-col-md-2">
            <v-list-item
                class="pl-0"
                v-ripple
                :prepend-avatar="evelyn"
                :title="comment.user_id"
                subtitle="evelynclaire@gmail.com"
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
import {ref} from "vue";
import {Comment} from "../store/comments/types";
import moment from "moment";


const props = defineProps<{ comment: Comment }>()


</script>

<style scoped lang="scss">
</style>