<template>
    <div>
        <h1>Doctor Page</h1>
        <div class="v-row">
            <div class="v-col-12 v-col-sm-3">
                <v-card class="mx-auto" rounded>
                    <v-img :src="doctorStore.doctor.img" cover></v-img>
                </v-card>
            </div>
            <div class="v-col-12 v-col-sm-9">
                <div class="v-row">
                    <div class="v-col-12 v-col-sm-8">
                        <div class="d-flex flex-column">
                            <p class="text-h3">{{
                                    doctorStore.doctor.title + " " + doctorStore.doctor.first_name + " " + doctorStore.doctor.last_name
                                }}</p>
                            <v-chip
                                color="pink"
                                label
                                text-color="white"
                                class="mt-2 width-fit-content"
                            >
                                <v-icon start icon="mdi-label"></v-icon>
                                {{ doctorStore.doctor.profession.name }}
                            </v-chip>
                            <div class="d-flex align-center">
                                <v-rating
                                    :model-value="doctorStore.doctor.rate"
                                    half-increments
                                    readonly
                                    color="yellow"
                                    size="large"
                                    density="compact"
                                ></v-rating>
                                <p class="ml-2">({{ doctorStore.doctor.reviews }})</p>
                            </div>

                        </div>
                    </div>
                    <div class="v-col-12 v-col-sm-4 no-gutters">
                        <v-chip
                            v-ripple
                            color="accent"
                            variant="outlined"
                            :class="{'float-right': !$vuetify.display.mobile}"
                        >
                            <v-avatar left>
                                <v-img :src="doctorStore.doctor.hospital.img"></v-img>
                            </v-avatar>
                            {{ doctorStore.doctor.hospital.name }}
                        </v-chip>
                    </div>
                </div>
                <p class="text-h5 mt-4">Haqqında</p>
                <v-divider></v-divider>
                <p class="mt-2">{{ doctorStore.doctor.about }}</p>
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
        <div class="write-comment" v-if="userStore.loggedIn && !currentUserComment && !commentStore.haveMoreToLoad">
            <v-progress-linear
                :active="commentUploading"
                indeterminate
                color="accent"
                rounded
            ></v-progress-linear>
            <div class="d-flex align-center mt-2">
                <v-avatar>
                    <v-img :src="userStore.user.img || avatarPlaceHolder" alt="User Avatar"></v-img>
                </v-avatar>
                <v-rating
                    v-model="comment.rate"
                    hover
                    half-increments
                    color="yellow"
                    size="large"
                    density="compact"
                ></v-rating>
                <p>({{ comment.rate }})</p>
            </div>
            <v-textarea v-model="comment.text" class="mt-2" color="accent" label="Rəyinizi buraya yazın"
                        hide-details></v-textarea>
            <v-btn :disabled="commentUploading" @click="uploadComment" class="mt-2" color="accent" block>Göndər</v-btn>
        </div>
        <div v-if="!userStore.loggedIn" class="text-align-center mt-2">
            <router-link color="accent" to="/login">Log in To write comment</router-link>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div v-for="comment in commentStore.allComments" :key="comment._id">
            <CommentItem :comment="comment"/>
        </div>
        <v-progress-linear
            :active="commentsLoading"
            indeterminate
            rounded
            color="accent"
        ></v-progress-linear>
        <div v-if="commentStore.skip===12 && !commentStore.haveMoreToLoad" class="py-2 text-align-center">No reviews
            yet
        </div>
        <div v-if="commentStore.skip!==12 && !commentStore.haveMoreToLoad" class="py-2 text-align-center">No more
            reviews to load
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {useDoctors} from "../store/doctors";
import {useRoute} from "vue-router";
import CommentItem from "../components/CommentItem.vue";
import {useComments} from "../store/comments";
import {useScreen} from "../composables/screen";
import {useUser} from "../store/user";
import {CommentForUpload} from "../store/comments/types";
import avatarPlaceHolder from "../assets/img/avatar.png";
const route = useRoute();
const userStore = useUser();
const doctorStore = useDoctors();
const commentStore = useComments();
const screen = useScreen();


const comment = reactive<CommentForUpload>({
    rate: 5,
    text: "",
})
const commentUploading = ref(false);
const commentsLoading = ref(false);
const doctorId = route.params.doctorId as string;

const currentUserComment = computed(() => {
    return commentStore.allComments.find(comment => comment.user._id === userStore.user._id);
});

onMounted(async () => {
    commentStore.setSkip(0);
    await doctorStore.fetchDoctorById(doctorId);
    screen.onScrolledBottom(async () => {
        if (commentStore.haveMoreToLoad) {
            await loadComments();
        }
    });
})

async function loadComments() {
    commentsLoading.value = true;
    await commentStore.fetchAllComments(doctorId);
    commentsLoading.value = false;
}

async function uploadComment() {
    commentUploading.value = true;
    await commentStore.uploadComment(doctorId, comment);
    commentUploading.value = false;
}

const experience = [
    {
        profession: "Mama-Ginekoloq",
        hospital: "Şuşa səhər mərkəzi klinikası",
        field: "Doğum şövbəsi",
        term: "02.1988 - 05.1992",
        country: "Azərbaycan",
    },
]
const education = [
    {
        degree: "Uzman",
        major: "Müalicə işi",
        institution: "Azərbaycan Dövlət tibb universiteti",
        term: "02.1988 - 05.1992",
        country: "Azərbaycan",
    },
]

</script>

<style scoped>

</style>