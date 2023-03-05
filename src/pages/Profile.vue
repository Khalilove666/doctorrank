<template>
    <div class="pt-2 d-flex justify-space-between">
        <h1>Public Profile</h1>
        <v-btn class="bg-accent text-white-text" icon="mdi-logout" size="small" @click="handleLogOut()"></v-btn>
    </div>
    <v-tabs v-model="tab" color="accent">
        <v-tab value="one">User info</v-tab>
        <v-tab value="two">Doctor info</v-tab>
    </v-tabs>
    <v-window v-model="tab" style="overflow: visible">
        <v-window-item value="one">
            <v-row class="mt-2">
                <v-col cols="12" md="6" lg="3">
                    <div class="d-flex position-relative justify-end full-height">
                        <img
                            :src="image.userAvatar.value"
                            alt="avatar"
                            class="material-card full-width full-height prevent-user-select"
                        />
                        <v-btn
                            color="accent"
                            dark
                            icon="mdi-image-edit-outline"
                            class="position-absolute mt-2 mr-2"
                            size="x-small"
                            @click="showDialog(ProfileDialog.Avatar)"
                        ></v-btn>
                    </div>
                </v-col>
                <v-col cols="12" md="6" lg="3">
                    <p class="text-h5">Base info</p>
                    <v-divider></v-divider>
                    <EditField
                        v-model="user.first_name"
                        class="mt-4"
                        label="First Name"
                        @save="handleUserSave('first_name', $event)"
                    />
                    <EditField
                        v-model="user.last_name"
                        class="mt-4"
                        label="Last Name"
                        @save="handleUserSave('last_name', $event)"
                    />
                </v-col>
                <v-col cols="12" md="6" lg="3">
                    <p class="text-h5">Contacts</p>
                    <v-divider></v-divider>
                    <EditField
                        v-model="user.contact_email"
                        class="mt-4"
                        label="Email"
                        @save="handleUserSave('contact_email', $event)"
                    />
                    <EditField
                        v-model="user.contact_phone"
                        class="mt-4"
                        label="Phone"
                        @save="handleUserSave('contact_phone', $event)"
                    />
                    <EditField
                        v-model="user.contact_facebook"
                        class="mt-4"
                        label="Facebook"
                        @save="handleUserSave('contact_facebook', $event)"
                    />
                </v-col>
                <v-col cols="12" md="6" lg="3">
                    <p class="text-h5">Change Password</p>
                    <v-divider></v-divider>
                    <ChangePassword class="mt-4" />
                </v-col>
            </v-row>
        </v-window-item>
        <v-window-item value="two">
            <v-btn v-if="role === 'user'" class="bg-accent text-white-text mt-4" block @click="handleChangeRole()">
                CHANGE TO DOCTOR PROFILE
            </v-btn>
            <div v-else class="doctor-info">
                <v-row class="mt-2">
                    <v-col cols="12" md="6" lg="3">
                        <div class="d-flex position-relative justify-end full-height">
                            <img
                                :src="doctorAvatar"
                                alt="avatar"
                                class="material-card full-width full-height prevent-user-select"
                            />
                            <v-btn
                                color="accent"
                                dark
                                icon="mdi-image-edit-outline"
                                class="position-absolute mt-2 mr-2"
                                size="x-small"
                                @click="showDialog(ProfileDialog.DoctorAvatar)"
                            ></v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5">Base info</p>
                        <v-divider></v-divider>
                        <EditField
                            v-model="doctor.title"
                            class="mt-4"
                            label="Title"
                            @save="handleDoctorSave('title', doctor.title, $event)"
                        />
                        <EditField
                            v-model="doctor.first_name"
                            class="mt-4"
                            label="First Name"
                            @save="handleDoctorSave('first_name', doctor.first_name, $event)"
                        />
                        <EditField
                            v-model="doctor.last_name"
                            class="mt-4"
                            label="Last Name"
                            @save="handleDoctorSave('last_name', doctor.last_name, $event)"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5">Contacts</p>
                        <v-divider></v-divider>
                        <EditField
                            v-model="doctor.contact.email"
                            class="mt-4"
                            label="Email"
                            @save="handleDoctorSave('contact_email', doctor.contact.email, $event)"
                        />
                        <EditField
                            v-model="doctor.contact.phone"
                            class="mt-4"
                            label="Phone"
                            @save="handleDoctorSave('contact_phone', doctor.contact.phone, $event)"
                        />
                        <EditField
                            v-model="doctor.contact.facebook"
                            class="mt-4"
                            label="Facebook"
                            @save="handleDoctorSave('contact_facebook', doctor.contact.facebook, $event)"
                        />
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5">About</p>
                        <v-divider></v-divider>
                        <div class="mt-2">
                            <EditField
                                v-model="doctor.about"
                                label="Detailed information about you"
                                :textarea="true"
                                @save="handleDoctorSave('about', doctor.about, $event)"
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5 mt-4">Profession</p>
                        <v-divider></v-divider>
                        <div v-if="editingProfession" class="mt-2">
                            <Autocomplete v-model="selectedProfession" :items="professions" />
                            <div class="d-flex justify-end mt-2">
                                <v-btn color="accent" variant="outlined" @click="handleProfessionCancel()">cancel </v-btn>
                                <v-btn color="accent" class="ms-2" @click="handleProfessionUpdate()">save</v-btn>
                            </div>
                            <p class="btn-text mt-1" @click="showDialog(ProfileDialog.Profession)">
                                Add profession if it is not existing in the list above.
                            </p>
                        </div>
                        <div v-else class="mt-2 d-flex justify-space-between">
                            <v-chip color="pink" label text-color="white">
                                <v-icon start icon="mdi-label"></v-icon>
                                {{ doctor.profession?.name }}
                            </v-chip>
                            <button class="btn-text" @click="handleProfessionEdit()">Edit</button>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5 mt-4">Current Hospital You Work</p>
                        <v-divider></v-divider>
                        <div v-if="editingHospital" class="mt-2">
                            <Autocomplete v-model="selectedHospital" :items="hospitals" />
                            <div class="d-flex justify-end mt-2">
                                <v-btn color="accent" variant="outlined" @click="handleHospitalCancel()">cancel</v-btn>
                                <v-btn color="accent" class="ms-2" @click="handleHospitalUpdate()">save</v-btn>
                            </div>
                            <p class="btn-text mt-1" @click="showDialog(ProfileDialog.Hospital)">
                                Add hospital if it is not existing in the list above.
                            </p>
                        </div>
                        <div v-else class="mt-2 d-flex justify-space-between">
                            <v-chip v-ripple color="accent" variant="outlined">
                                <v-avatar left>
                                    <v-img :src="doctor.hospital?.img"></v-img>
                                </v-avatar>
                                {{ doctor.hospital?.name }}
                            </v-chip>
                            <button class="btn-text" @click="handleHospitalEdit()">Edit</button>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5 mt-4">Experience</p>
                        <v-divider></v-divider>
                        <div class="mt-2">
                            <v-row v-if="doctor.experience?.length">
                                <v-col v-for="(experience, index) in doctor.experience" :key="index" cols="12">
                                    <EditExperience
                                        :experience="experience"
                                        :index="index"
                                        @save="updateExperience($event, index)"
                                        @remove="removeExperience(index)"
                                        @success="showSuccessSnackbar()"
                                        @error="showErrorSnackbar($event)"
                                    />
                                </v-col>
                            </v-row>
                            <p class="btn-text" @click="addExperience()">Add Experience</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <p class="text-h5 mt-4">Education</p>
                        <v-divider></v-divider>
                        <div class="mt-2">
                            <v-row v-if="doctor.education?.length">
                                <v-col v-for="(education, index) in doctor.education" :key="index" cols="12">
                                    <EditEducation
                                        :education="education"
                                        :index="index"
                                        @save="updateEducation($event, index)"
                                        @remove="removeEducation(index)"
                                        @success="showSuccessSnackbar()"
                                        @error="showErrorSnackbar($event)"
                                    />
                                </v-col>
                            </v-row>
                            <p class="btn-text" @click="addEducation()">Add Education</p>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-window-item>
    </v-window>
    <v-dialog v-model="dialog.show" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="handleDialogCancel()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="handleDialogSave()"> Save </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-progress-linear v-if="dialog.loading" color="accent" :model-value="progress.loaded" height="20" rounded>
                <strong>{{ progress.loaded }}</strong>
            </v-progress-linear>
            <div class="v-container">
                <v-alert v-if="dialog.error.exist" type="error" density="compact" transition="scale-transition"
                    >{{ dialog.error.text }}
                </v-alert>
                <v-text-field
                    v-if="dialog.type === ProfileDialog.Profession"
                    v-model="professionName"
                    class="full-width mt-1"
                    label="Profession name"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <v-text-field
                    v-if="dialog.type === ProfileDialog.Hospital"
                    v-model="hospitalName"
                    class="full-width mt-1"
                    label="Hospital name"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <div
                    v-if="
                        dialog.type === ProfileDialog.Avatar ||
                        dialog.type === ProfileDialog.Hospital ||
                        dialog.type === ProfileDialog.DoctorAvatar
                    "
                >
                    <cropper
                        v-if="!!imageToEdit"
                        class="cropper"
                        :src="imageToEdit"
                        :stencil-props="{ aspectRatio: 1 }"
                        @change="handleImageCoordinatesChange"
                    />
                    <div class="file-selector">
                        <label for="file-selector-input">
                            <v-icon>mdi-image</v-icon>
                            Browse image</label
                        >
                        <input id="file-selector-input" type="file" accept="image/*" @change="handleImageChange($event)" />
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="success.exist" timeout="2000" color="success" top>{{ success.text }}</v-snackbar>
    <v-snackbar v-model="error.exist" timeout="4000" color="error" top>{{ error.text }}</v-snackbar>
    <Progress v-if="loading" />
</template>
<script setup lang="ts">
import { useUser } from "../store/user";
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, ref } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useImage } from "../composables/image";
import {
    ChangeRole,
    CreateHospital,
    CreateProfession,
    FetchAllHospitals,
    FetchAllProfessions,
    FetchDoctorByAuth,
    LogOut,
    UpdateDoctor,
    UpdateUser,
    UploadDoctorAvatar,
    UploadHospitalAvatar,
    UploadUserAvatar,
} from "../api";
import type { Doctor, DoctorUpdateDTO, Profession, Hospital, UserUpdateDTO } from "../dtos";
import { ProfileDialog } from "@/dtos";
import { router } from "../router";
import EditField from "../components/EditField.vue";
import ChangePassword from "../components/ChangePassword.vue";
import EditExperience from "../components/EditExperience.vue";
import EditEducation from "../components/EditEducation.vue";
import Progress from "../components/Progress.vue";
import Autocomplete from "../components/Autocomplete.vue";

interface Coordinates {
    top: number;
    left: number;
    width: number;
    height: number;
}

const userStore = useUser();
const image = useImage();
const { role } = storeToRefs(userStore);

const professions = ref<Profession[]>([]);
const selectedProfession = ref<Profession | null>(null);

const hospitals = ref<Hospital[]>([]);
const selectedHospital = ref<Hospital | null>(null);

const tab = ref("one");
const imageToEdit = ref("");
const professionName = ref("");
const hospitalName = ref("");
const file = ref<File | null>();
const imageCoordinates = ref<Coordinates>();
const progress = reactive({ loaded: 0 });
const dialog = reactive({
    show: false,
    loading: false,
    error: { exist: false, text: "" },
    title: "",
    type: ProfileDialog.Avatar,
});

const editingProfession = ref(false);
const editingHospital = ref(false);
const loading = ref(false);
const success = reactive({ exist: false, text: "" });
const error = reactive({ exist: false, text: "" });

const user = reactive({
    first_name: "",
    last_name: "",
    contact_email: "",
    contact_phone: "",
    contact_facebook: "",
});

let initialDoctor: Doctor = {
    _id: "",
    user_id: "",
    title: "",
    first_name: "",
    last_name: "",
    full_name: "",
    rate: 0,
    reviews: 0,
    img: "",
    about: "",
    profession: {
        _id: "",
        name: "",
    },
    hospital: {
        _id: "",
        name: "",
        img: "",
    },
    contact: {
        email: "",
        phone: "",
        facebook: "",
    },
    experience: [],
    education: [],
    created_at: 0,
    updated_at: 0,
};
const doctor = ref<Doctor>(initialDoctor);
const profession = reactive({ _id: "", name: "" });
const hospital = reactive({ _id: "", name: "", img: "" });

const doctorAvatar = computed(() => {
    const imgName = doctor.value.img;
    return image.doctorAvatar(imgName);
});

const dialogTitle = computed(() => {
    switch (dialog.type) {
        case ProfileDialog.Avatar:
            return "Change Avatar";
        case ProfileDialog.DoctorAvatar:
            return "Change Doctor Avatar";
        case ProfileDialog.Hospital:
            return "Add Hospital";
        case ProfileDialog.Profession:
            return "Add Profession";
        default:
            return "";
    }
});

onMounted(async () => {
    user.first_name = userStore.user.first_name;
    user.last_name = userStore.user.last_name;
    user.contact_email = userStore.user.contact.email;
    user.contact_phone = userStore.user.contact.phone;
    user.contact_facebook = userStore.user.contact.facebook;
    const res = await FetchDoctorByAuth();
    if (res.ok && res.data) {
        doctor.value = res.data;
        initialDoctor = res.data;
        profession._id = res.data.profession?._id;
        profession.name = res.data.profession?.name;
        hospital._id = res.data.hospital?._id;
        hospital.name = res.data.hospital?.name;
        hospital.img = res.data.hospital?.img;
    }
    await fetchProfessions();
    await fetchHospitals();
});

async function fetchProfessions() {
    const res = await FetchAllProfessions();
    if (res.ok) professions.value = res.data;
}

async function fetchHospitals() {
    const res = await FetchAllHospitals();
    if (res.ok) hospitals.value = res.data;
}

async function handleChangeRole() {
    const res = await ChangeRole();
    if (res.ok) userStore.changeRole("doctor");
    const doctorRes = await FetchDoctorByAuth();
    if (doctorRes.ok && doctorRes.data) {
        doctor.value = res.data;
        initialDoctor = res.data;
    }
}

async function handleLogOut() {
    const res = await LogOut();
    if (res.ok) {
        userStore.deleteUser("logout_user_action");
        await router.replace("/login");
    }
}

async function handleUserSave(fieldName: string, callback: any) {
    const update: UserUpdateDTO = { field_name: fieldName, value: user[fieldName as keyof object] };
    loading.value = true;
    const res = await UpdateUser(update);
    loading.value = false;
    if (res.ok) {
        userStore.updateUser(fieldName, user[fieldName as keyof object]);
        showSuccessSnackbar();
        callback();
    } else {
        error.exist = true;
        error.text = res.error;
    }
}

async function handleDoctorSave(fieldName: string, value: string, callback: any): Promise<boolean> {
    const update: DoctorUpdateDTO = { field_name: fieldName, value };
    loading.value = true;
    const res = await UpdateDoctor(update);
    loading.value = false;
    if (res.ok) {
        showSuccessSnackbar();
        callback();
        return true;
    } else {
        error.exist = true;
        error.text = res.error;
        return false;
    }
}

async function handleProfessionUpdate() {
    if (selectedProfession.value) {
        const success = await handleDoctorSave("profession_id", selectedProfession.value._id, () => {});
        if (success) {
            editingProfession.value = false;
            doctor.value.profession = selectedProfession.value;
        }
    }
}

function handleProfessionCancel() {
    profession._id = doctor.value.profession?._id;
    profession.name = doctor.value.profession?.name;
    editingProfession.value = false;
}

function handleProfessionEdit() {
    editingProfession.value = true;
    selectedProfession.value = doctor.value.profession;
}

async function handleHospitalUpdate() {
    if (selectedHospital.value != null) {
        const success = await handleDoctorSave("hospital_id", selectedHospital.value._id, () => {});
        if (success) {
            editingHospital.value = false;
            doctor.value.hospital = selectedHospital.value;
        }
    }
}

function handleHospitalCancel() {
    hospital._id = doctor.value.hospital?._id;
    hospital.name = doctor.value.hospital?.name;
    hospital.img = doctor.value.hospital?.img;
    editingHospital.value = false;
}

function handleHospitalEdit() {
    editingHospital.value = true;
    selectedHospital.value = doctor.value.hospital;
}

function updateExperience(value: any, index: number) {
    doctor.value.experience[index] = value;
}

function updateEducation(value: any, index: number) {
    doctor.value.education[index] = value;
}

function addExperience() {
    if (!doctor.value.experience) doctor.value.experience = [];
    doctor.value.experience.push({
        _id: "-1",
        profession: "",
        hospital: "",
        field: "",
        term_start: 0,
        term_end: 0,
        country: "",
    });
}

function addEducation() {
    if (!doctor.value.education) doctor.value.education = [];
    doctor.value.education.push({
        _id: "-1",
        degree: "",
        major: "",
        institution: "",
        term_start: 0,
        term_end: 0,
        country: "",
    });
}

function removeExperience(index: number) {
    doctor.value.experience.splice(index, 1);
}

function removeEducation(index: number) {
    doctor.value.education.splice(index, 1);
}

function handleImageChange(event: Event) {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    file.value = (target.files as FileList)[0];
    reader.onloadend = () => {
        console.log(reader.result);
        imageToEdit.value = reader.result as string;
    };
    reader.readAsDataURL(file.value);
}

function handleImageCoordinatesChange(event: any) {
    imageCoordinates.value = event.coordinates as Coordinates;
    console.log(event.coordinates);
}

function showDialog(dialogType: ProfileDialog) {
    dialog.type = dialogType;
    dialog.show = true;
    dialog.error.exist = false;
    dialog.error.text = "";
    success.exist = false;
    success.text = "";
    dialog.loading = false;
    file.value = null;
    imageToEdit.value = "";
}

async function handleDialogSave() {
    switch (dialog.type) {
        case ProfileDialog.Avatar:
            await handleUserAvatarChange();
            break;
        case ProfileDialog.DoctorAvatar:
            await handleDoctorAvatarChange();
            break;
        case ProfileDialog.Hospital:
            await handleCreateHospital();
            break;
        case ProfileDialog.Profession:
            await handleCreateProfession();
            break;
    }
}

async function handleUserAvatarChange() {
    const data = new FormData();
    data.append("file", file.value as File);
    data.append("coordinates", JSON.stringify(imageCoordinates.value));
    dialog.loading = true;
    const res = await UploadUserAvatar(data, (e: { loaded: number; total: number }) => {
        progress.loaded = (e.loaded * 100) / e.total;
    });
    dialog.loading = false;
    if (res.ok) {
        success.text = "Image uploaded successfully!";
        userStore.setUserImg(res.data);
        dialog.show = false;
        success.exist = true;
    } else {
        dialog.error.exist = true;
        dialog.error.text = res.error;
    }
    imageToEdit.value = "";
    file.value = null;
}

async function handleDoctorAvatarChange() {
    const data = new FormData();
    data.append("file", file.value as File);
    data.append("coordinates", JSON.stringify(imageCoordinates.value));
    dialog.loading = true;
    const res = await UploadDoctorAvatar(data, (e: { loaded: number; total: number }) => {
        progress.loaded = (e.loaded * 100) / e.total;
    });
    dialog.loading = false;
    if (res.ok) {
        success.text = "Image uploaded successfully!";
        doctor.value.img = res.data;
        dialog.show = false;
        success.exist = true;
    } else {
        dialog.error.exist = true;
        dialog.error.text = res.error;
    }
    imageToEdit.value = "";
    file.value = null;
}

async function handleHospitalAvatarUpload(hospitalId: string) {
    const data = new FormData();
    data.append("file", file.value as File);
    data.append("coordinates", JSON.stringify(imageCoordinates.value));
    dialog.loading = true;
    const res = await UploadHospitalAvatar(hospitalId, data, (e: { loaded: number; total: number }) => {
        progress.loaded = (e.loaded * 100) / e.total;
    });
    dialog.loading = false;
    if (res.ok) {
        success.text = "Image uploaded successfully!";
        dialog.show = false;
        success.exist = true;
    } else {
        dialog.error.exist = true;
        dialog.error.text = res.error;
    }
    imageToEdit.value = "";
    file.value = null;
}

async function handleCreateProfession() {
    dialog.loading = true;
    const res = await CreateProfession(professionName.value);
    dialog.loading = false;
    if (res.ok) {
        showSuccessSnackbar();
        // ADD PROFESSION TO PROFESSIONS
        dialog.show = false;
    } else {
        dialog.error.exist = true;
        dialog.error.text = res.error;
    }
}

async function handleCreateHospital() {
    dialog.loading = true;
    const res = await CreateHospital(hospitalName.value);
    dialog.loading = false;
    if (res.ok) {
        await handleHospitalAvatarUpload(res.data);
        // ADD PROFESSION TO PROFESSIONS
    } else {
        dialog.error.exist = true;
        dialog.error.text = res.error;
    }
}

function handleDialogCancel() {
    dialog.show = false;
    dialog.error.exist = false;
    success.exist = false;
    dialog.loading = false;
}

function showSuccessSnackbar() {
    success.exist = true;
    success.text = "Operation successful !";
}

function showErrorSnackbar(message: string) {
    error.exist = true;
    error.text = message;
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.cropper {
    height: 500px;
    background: #ddd;
    margin-top: 10px;
}

.file-selector {
    position: relative;
    width: 100%;

    > input {
        position: absolute;
        top: 20px;
        z-index: -1;
    }

    > label {
        margin-top: 20px;
    }

    > input,
    label {
        padding: 10px 0;
        width: 100%;
        border: 2px dashed $color-accent;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: $color-accent;
    }
}
</style>

<style lang="scss">
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
}
</style>
