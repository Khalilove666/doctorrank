<template>
    <h1>Doctor Page</h1>
    <div class="v-row">
        <div class="v-col-12 v-col-sm-3">
            <v-card
                class="mx-auto"
                rounded
            >
                <v-img
                    :src="doctor.singleDoctor?.img"
                    cover
                    height="400"
                ></v-img>
            </v-card>
        </div>
        <div class="v-col-12 v-col-sm-9">
            <div class="v-row">
                <div class="v-col-12 v-col-sm-8">
                    <div class="d-flex flex-column">
                        <p class="text-h3">{{
                                doctor.singleDoctor?.title + " " + doctor.singleDoctor?.first_name + " " + doctor.singleDoctor?.last_name
                            }}</p>
                        <v-chip
                            color="pink"
                            label
                            text-color="white"
                            class="mt-2 width-fit-content"
                        >
                            <v-icon start icon="mdi-label"></v-icon>
                            {{ doctor.singleDoctor?.profession.name }}
                        </v-chip>
                        <div class="d-flex align-center">
                            <v-rating
                                v-model="rating"
                                half-increments
                                readonly
                                color="yellow"
                                size="large"
                                density="compact"
                            ></v-rating>
                            <p class="ml-2">({{ rating }})</p>
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
                            <v-img :src="doctor.singleDoctor?.hospital.img"></v-img>
                        </v-avatar>
                        {{ doctor.singleDoctor?.hospital.name }}
                    </v-chip>
                </div>
            </div>
            <p class="text-h5 mt-4">Haqqında</p>
            <v-divider></v-divider>
            <p class="mt-2">{{ doctor.singleDoctor?.about }}</p>
        </div>
    </div>
    <p class="text-h5 mt-4">İş təcrübəsi</p>
    <v-table class="bg-light-primary">
        <thead>
        <tr>
            <th class="text-left">
                Vəzifə
            </th>
            <th class="text-left">
                Klinika
            </th>
            <th class="text-left">
                Bölmə
            </th>
            <th class="text-left">
                Tarix
            </th>
            <th class="text-left">
                Ölkə
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in experience"
            :key="item.term"
        >
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
            <th class="text-left">
                Dərəcə
            </th>
            <th class="text-left">
                İxtisas
            </th>
            <th class="text-left">
                Təhsil müəssisəsi
            </th>

            <th class="text-left">
                Tarix
            </th>
            <th class="text-left">
                Ölkə
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in education"
            :key="item.term"
        >
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
    <div class="write-comment">
        <div class="d-flex align-center mt-2">
            <v-avatar>
                <v-img
                    :src="evelyn"
                    alt="Evelyn"
                ></v-img>
            </v-avatar>
            <v-rating
                v-model="rating"
                hover
                half-increments
                color="yellow"
                size="large"
                density="compact"
            ></v-rating>
            <p>({{ rating }})</p>
        </div>
        <v-textarea class="mt-2" color="accent" label="Rəyinizi buraya yazın" hide-details></v-textarea>
        <v-btn class="mt-2" color="accent" block>Göndər</v-btn>
        <v-divider class="mt-2"></v-divider>
        <CommentItem/>
        <v-divider class="my-5"></v-divider>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import evelyn from "../assets/img/evelyn.jpg";
import av_hsp from "../assets/img/av_hsp.png";
import {useDoctors} from "../store/doctors";
import {useRoute, useRouter} from "vue-router";
import CommentItem from "../components/CommentItem.vue";

const route = useRoute();
const doctor = useDoctors();
const rating = ref(3.5)


onMounted(async () => {
    await doctor.fetchDoctorById(route.params.username);
})


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