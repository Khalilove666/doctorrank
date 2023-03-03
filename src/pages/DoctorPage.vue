<template>
    <div>
        <h1>Doctor Page</h1>
        <div class="v-row">
            <div class="v-col-12 v-col-sm-3">
                <v-card class="mx-auto" rounded>
                    <v-img :src="doctor.img" cover></v-img>
                </v-card>
            </div>
            <div class="v-col-12 v-col-sm-9">
                <div class="v-row">
                    <div class="v-col-12 v-col-sm-8">
                        <div class="d-flex flex-column">
                            <p class="text-h3">{{ doctor.title + " " + doctor.first_name + " " + doctor.last_name }}</p>
                            <v-chip color="pink" label text-color="white" class="mt-2 width-fit-content">
                                <v-icon start icon="mdi-label"></v-icon>
                                {{ doctor.profession.name }}
                            </v-chip>
                            <div class="d-flex align-center">
                                <v-rating
                                    :model-value="doctor.rate"
                                    half-increments
                                    readonly
                                    color="yellow"
                                    size="large"
                                    density="compact"
                                ></v-rating>
                                <p class="ml-2">({{ doctor.reviews }})</p>
                            </div>
                        </div>
                    </div>
                    <div class="v-col-12 v-col-sm-4 no-gutters">
                        <v-chip v-ripple color="accent" variant="outlined" :class="{ 'float-right': !$vuetify.display.mobile }">
                            <v-avatar left>
                                <v-img :src="doctor.hospital.img"></v-img>
                            </v-avatar>
                            {{ doctor.hospital.name }}
                        </v-chip>
                    </div>
                </div>
                <p class="text-h5 mt-4">Haqqında</p>
                <v-divider></v-divider>
                <p class="mt-2">{{ doctor.about }}</p>
            </div>
        </div>
        <p class="text-h5 mt-4">İş təcrübəsi</p>
        <v-table class="bg-light-primary">
            <thead>
                <tr>
                    <th class="text-left">Vəzifə</th>
                    <th class="text-left">Klinika</th>
                    <th class="text-left">Bölmə</th>
                    <th class="text-left">Tarix</th>
                    <th class="text-left">Ölkə</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in experience" :key="item.term">
                    <td>{{ item.profession }}</td>
                    <td>{{ item.hospital }}</td>
                    <td>{{ item.field }}</td>
                    <td>{{ item.term }}</td>
                    <td>{{ item.country }}</td>
                </tr>
            </tbody>
        </v-table>
        <v-divider></v-divider>
        <p class="text-h5 mt-4">Təhsil</p>
        <v-divider></v-divider>
        <v-table class="bg-light-primary">
            <thead>
                <tr>
                    <th class="text-left">Dərəcə</th>
                    <th class="text-left">İxtisas</th>
                    <th class="text-left">Təhsil müəssisəsi</th>
                    <th class="text-left">Tarix</th>
                    <th class="text-left">Ölkə</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in education" :key="item.term">
                    <td>{{ item.degree }}</td>
                    <td>{{ item.hospital }}</td>
                    <td>{{ item.major }}</td>
                    <td>{{ item.term }}</td>
                    <td>{{ item.country }}</td>
                </tr>
            </tbody>
        </v-table>
        <p class="text-h5 mt-4">Rəylər</p>
        <v-divider></v-divider>
        <div v-if="userStore.loggedIn && !currentUserComment" class="write-comment">
            <v-progress-linear :active="commentUploading" indeterminate color="accent" rounded></v-progress-linear>
            <div class="d-flex align-center mt-2">
                <v-avatar>
                    <v-img :src="userStore.user.img || avatarPlaceHolder" alt="User Avatar"></v-img>
                </v-avatar>
                <v-rating v-model="comment.rate" hover half-increments color="yellow" size="large" density="compact"></v-rating>
                <p>({{ comment.rate }})</p>
            </div>
            <v-textarea
                v-model="comment.text"
                class="mt-2"
                color="accent"
                label="Rəyinizi buraya yazın"
                hide-details
            ></v-textarea>
            <v-btn :disabled="commentUploading" class="mt-2" color="accent" block @click="uploadComment">Göndər</v-btn>
        </div>
        <div v-if="!userStore.loggedIn" class="text-align-center mt-2">
            <router-link color="accent" to="/login">Log in To write comment</router-link>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div v-for="commentItem in commentStore.comments" :key="commentItem._id">
            <CommentItem :comment="commentItem" />
        </div>
        <v-progress-linear :active="commentsLoading" indeterminate rounded color="accent"></v-progress-linear>
        <div v-if="noComments" class="py-2 text-align-center">No reviews yet</div>
        <div v-if="!noComments && !haveMoreComments" class="py-2 text-align-center">No more reviews to load</div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { useScreen } from "../composables/screen";
import { useUser } from "../store/user";
import { useComments } from "../store/comments";
import { FetchAllComments, FetchDoctorById, UploadComment } from "../api";
import { CommentReqDTO, Doctor } from "../dtos";
import CommentItem from "../components/CommentItem.vue";
import avatarPlaceHolder from "../assets/img/avatar.png";

const route = useRoute();
const userStore = useUser();
const commentStore = useComments();
const screen = useScreen();

const doctorId = route.params.doctorId as string;
const doctor = ref<Doctor>({
    _id: "",
    about: "",
    contact: { email: "", facebook: "", phone: "" },
    created_at: 0,
    education: [],
    experience: [],
    first_name: "",
    full_name: "",
    hospital: { _id: "", name: "", img: "" },
    img: "",
    last_name: "",
    profession: { _id: "", name: "" },
    rate: 0,
    reviews: 0,
    title: "",
    updated_at: 0,
    user_id: "",
});
// const comments = ref<Array<Comment>>([]);
const comment = reactive<CommentReqDTO>({
    rate: 5,
    text: "",
});

const commentUploading = ref(false);
const commentsLoading = ref(false);
const haveMoreComments = ref(true);
const noComments = ref(false);
const success = ref(false);
const error = reactive({
    exist: false,
    text: "",
});
const skip = ref(0);

const currentUserComment = computed(() => {
    return commentStore.comments.find((comment) => comment.user._id === userStore.user._id);
});

onMounted(async () => {
    const res = await FetchDoctorById(doctorId);
    if (res.ok) doctor.value = res.data;
    await fetchAllComments();
    screen.onScrolledBottom(async () => {
        if (haveMoreComments.value) {
            await fetchAllComments();
        }
    });
});

async function fetchAllComments() {
    commentsLoading.value = true;
    const res = await FetchAllComments(doctorId, skip.value, 50);
    commentsLoading.value = false;
    if (res.ok) {
        if (res.data === null) {
            if (skip.value === 0) {
                noComments.value = true;
            } else {
                haveMoreComments.value = false;
            }
        } else {
            commentStore.setComments(res.data, skip.value === 0);
        }
        skip.value += 50;
    }
}

async function uploadComment() {
    commentUploading.value = true;
    const res = await UploadComment(doctorId, comment);
    commentUploading.value = false;
    if (res.ok) {
        success.value = true;
        const cUser = userStore.user;
        const newComment = res.data;
        delete newComment.user_id;
        newComment.user = {
            _id: cUser._id,
            first_name: cUser.first_name,
            last_name: cUser.last_name,
            username: cUser.username,
            img: cUser.img,
        };
        commentStore.appendUserComment(newComment);
    } else {
        error.exist = true;
        error.text = res.error;
    }
}

const experience = [
    {
        profession: "Mama-Ginekoloq",
        hospital: "Şuşa səhər mərkəzi klinikası",
        field: "Doğum şövbəsi",
        term: "02.1988 - 05.1992",
        country: "Azərbaycan",
    },
];
const education = [
    {
        degree: "Uzman",
        major: "Müalicə işi",
        institution: "Azərbaycan Dövlət tibb universiteti",
        term: "02.1988 - 05.1992",
        country: "Azərbaycan",
        hospital: "hospital",
    },
];
</script>

<style scoped></style>
