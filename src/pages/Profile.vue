<template>
    <div>
        <div class="pt-2 d-flex justify-space-between">
            <h1>{{ role }}'s Profile</h1>
            <v-btn @click="handleLogOut()" class="bg-accent text-white-text" icon="mdi-logout"
                   size="small"></v-btn>
        </div>
        <v-row class="mt-2">
            <v-col cols="12" md="3">
                <div class="d-flex position-relative justify-end full-height">
                    <img :src="image.userAvatar.value" alt="avatar"
                         class="material-card full-width full-height prevent-user-select"/>
                    <v-btn
                        color="accent"
                        dark
                        @click="showDialog(Dialog.Avatar)"
                        icon="mdi-image-edit-outline"
                        class="position-absolute mt-2 mr-2"
                        size="x-small"
                    ></v-btn>
                </div>
            </v-col>
            <v-col cols="12" md="9">
                <div class="d-flex justify-space-between">
                    <div class="full-width">
                        <p class="text-h5">Base info</p>
                        <v-divider></v-divider>
                    </div>
                    <v-btn v-if="!editingUser" @click="editingUser = true" icon="mdi-account-edit-outline"
                           size="x-small" class="bg-accent text-white-text"></v-btn>
                </div>
                <v-row class="mt-1">
                    <v-col cols="12" sm="6">
                        <v-text-field :readonly="!editingUser"
                                      label="First Name"
                                      variant="outlined"
                                      density="compact"
                                      hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field :readonly="!editingUser"
                                      label="Last Name"
                                      variant="outlined"
                                      density="compact"
                                      hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-h5 mt-4">Contacts</p>
                <v-divider></v-divider>
                <v-row class="mt-1">
                    <v-col cols="12" md="4">
                        <v-text-field :readonly="!editingUser" label="Email" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field :readonly="!editingUser" label="Phone" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field :readonly="!editingUser" label="Facebook" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
                <v-btn v-if="editingUser" @click="handleUserSave()" class="mt-2" color="accent" block>SAVE USER INFO
                </v-btn>
            </v-col>
        </v-row>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-btn v-if="role==='user'" @click="handleChangeRole()" class="bg-accent text-white-text mt-4" block>
        CHANGE TO DOCTOR PROFILE
    </v-btn>
    <div v-else class="doctor-info">
        <h1 class="mt-4">Public Information</h1>
        <v-row class="mt-2">
            <v-col cols="12" md="3">
                <div class="d-flex position-relative justify-end full-height">
                    <img :src="image.userAvatar.value" alt="avatar"
                         class="material-card full-width full-height prevent-user-select"/>
                    <v-btn
                        color="accent"
                        dark
                        @click="showDialog(Dialog.DoctorAvatar)"
                        icon="mdi-image-edit-outline"
                        class="position-absolute mt-2 mr-2"
                        size="x-small"
                    ></v-btn>
                </div>
            </v-col>
            <v-col cols="12" md="9">
                <div class="d-flex justify-space-between">
                    <div class="full-width">
                        <p class="text-h5">Base info</p>
                        <v-divider></v-divider>
                    </div>
                    <v-btn v-if="!editingDoctor" @click="editingDoctor = true" icon="mdi-pencil-outline"
                           size="x-small" class="bg-accent text-white-text"></v-btn>
                </div>
                <v-row class="mt-1">
                    <v-col cols="12" sm="2">
                        <v-text-field v-model="doctor.title" :readonly="!editingDoctor" label="Title"
                                      placeholder="Example: 'Dr.', 'Uzm.Dr.'"
                                      variant="outlined"
                                      density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field v-model="doctor.first_name" :readonly="!editingDoctor" label="First Name"
                                      variant="outlined"
                                      density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field v-model="doctor.last_name" :readonly="!editingDoctor" label="Last Name"
                                      variant="outlined"
                                      density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-h5 mt-4">Contacts</p>
                <v-divider></v-divider>
                <v-row class="mt-1">
                    <v-col cols="12" md="4">
                        <v-text-field v-model="doctor.contact.email" :readonly="!editingDoctor" label="Email"
                                      variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="doctor.contact.phone" :readonly="!editingDoctor" label="Phone"
                                      variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="doctor.contact.facebook" :readonly="!editingDoctor" label="Facebook"
                                      variant="outlined"
                                      density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-h5 mt-4">About</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-textarea v-model="doctor.about" :readonly="!editingDoctor" color="accent"
                                label="Detailed information about you"
                                hide-details></v-textarea>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Profession</p>
                <v-divider></v-divider>
                <div v-if="editingDoctor" class="mt-2">
                    <v-text-field v-model="doctor.profession._id" :readonly="!editingDoctor"
                                  label="Profession ID FOR NOW" variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <!--                    <v-autocomplete-->
                    <!--                        density="compact"-->
                    <!--                        chips-->
                    <!--                        small-chips-->
                    <!--                        label="Select your profession"-->
                    <!--                        clearable-->
                    <!--                        variant="outlined"-->
                    <!--                        color="accent"-->
                    <!--                        hide-details-->
                    <!--                    ></v-autocomplete>-->
                    <p class="btn-text mt-1" @click="showDialog(Dialog.Profession)">Add profession if it is not existing
                        in the list above.</p>
                </div>
                <v-chip v-else class="mt-2" color="pink" label text-color="white">
                    <v-icon start icon="mdi-label"></v-icon>
                    {{ doctor.profession.name }}
                </v-chip>
            </v-col>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Current Hospital You Work</p>
                <v-divider></v-divider>
                <div v-if="editingDoctor" class="mt-2">
                    <v-text-field v-model="doctor.hospital._id" :readonly="!editingDoctor" label="Hospital ID FOR NOW"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <!--                    <v-autocomplete-->
                    <!--                        density="compact"-->
                    <!--                        chips-->
                    <!--                        small-chips-->
                    <!--                        label="Select Hospital you currently work"-->
                    <!--                        clearable-->
                    <!--                        variant="outlined"-->
                    <!--                        color="accent"-->
                    <!--                        hide-details-->
                    <!--                    ></v-autocomplete>-->
                    <p class="btn-text mt-1" @click="showDialog(Dialog.Hospital)">Add hospital if it is not existing in
                        the list above.</p>
                </div>
                <v-chip v-else v-ripple class="mt-2" color="accent" variant="outlined">
                    <v-avatar left>
                        <v-img :src="doctor.hospital.img"></v-img>
                    </v-avatar>
                    {{ doctor.hospital.name }}
                </v-chip>
            </v-col>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Experience</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-row v-if="doctor.experience?.length">
                        <v-col cols="12" md="6" v-for="(experience, index) in doctor.experience">
                            <v-card width="100%" color="transparent" class="pa-2">
                                <div v-if="editingDoctor">
                                    <div class="d-flex justify-space-between align-center">
                                        <p>No: {{ index + 1 }}</p>
                                        <v-btn
                                            class="text-white-text"
                                            color="red"
                                            icon="mdi-delete"
                                            size="x-small"
                                            @click="removeExperience(index)"
                                        ></v-btn>
                                    </div>
                                    <v-text-field v-model="experience.profession" class="mt-2" label="Profession"
                                                  variant="outlined"
                                                  density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="experience.hospital" class="mt-2" label="Hospital"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="experience.field" class="mt-2" label="Field"
                                                  variant="outlined"
                                                  density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="experience.term_start" class="mt-2" label="Term Start"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="experience.term_end" class="mt-2" label="Term End"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="experience.country" class="mt-2" label="Country"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                </div>
                                <div v-else>
                                    <p>No: {{ index + 1 }}</p>
                                    <table>
                                        <tr>
                                            <td>Profession:</td>
                                            <td><b>{{ experience.profession }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Hospital:</td>
                                            <td><b>{{ experience.hospital }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Term Start:</td>
                                            <td><b>{{ experience.term_start }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Term End:</td>
                                            <td><b>{{ experience.term_end }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Country:</td>
                                            <td><b>{{ experience.country }}</b></td>
                                        </tr>
                                    </table>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                    <p v-if="editingDoctor" class="btn-text" @click="addExperience()" block>Add new Experience</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Education</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-row v-if="doctor.education?.length">
                        <v-col cols="12" md="6" v-for="(education, index) in doctor.education">
                            <v-card width="100%" color="transparent" class="pa-2">
                                <div v-if="editingDoctor">
                                    <div class="d-flex justify-space-between align-center">
                                        <p>No: {{ index + 1 }}</p>
                                        <v-btn
                                            class="text-white-text"
                                            color="red"
                                            icon="mdi-delete"
                                            size="x-small"
                                            @click="removeEducation(index)"
                                        ></v-btn>
                                    </div>
                                    <v-text-field v-model="education.degree" class="mt-2" label="Degree"
                                                  variant="outlined"
                                                  density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="education.major" class="mt-2" label="Major"
                                                  variant="outlined"
                                                  density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="education.institution" class="mt-2" label="Institution"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="education.term_start" class="mt-2" label="Term Start"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="education.term_end" class="mt-2" label="Term End"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                    <v-text-field v-model="education.country" class="mt-2" label="Country"
                                                  variant="outlined" density="compact"
                                                  hide-details></v-text-field>
                                </div>
                                <div v-else>
                                    <p>No: {{ index + 1 }}</p>
                                    <table>
                                        <tr>
                                            <td>Major:</td>
                                            <td><b>{{ education.major }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Institution:</td>
                                            <td><b>{{ education.institution }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Term Start:</td>
                                            <td><b>{{ education.term_start }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Term End:</td>
                                            <td><b>{{ education.term_end }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Country:</td>
                                            <td><b>{{ education.country }}</b></td>
                                        </tr>
                                    </table>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                    <p v-if="editingDoctor" class="btn-text" @click="addEducation()">Add Education</p>
                </div>
            </v-col>
        </v-row>
        <v-progress-linear
            :active="updatingDoctor"
            indeterminate
            rounded
            color="accent"
            class="mt-4"
        ></v-progress-linear>
        <v-btn v-if="editingDoctor" @click="handleDoctorSave()" class="mt-2" color="accent" block>SAVE ALL</v-btn>
        <v-btn v-if="editingDoctor" @click="cancelEditingDoctor()" class="mt-2" color="accent" block>CANCEL</v-btn>
    </div>
    <v-dialog
        v-model="dialog.show"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar
                dark
                color="primary"
            >
                <v-btn
                    icon
                    dark
                    @click="handleDialogCancel()"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        @click="handleDialogSave()"
                    >
                        Save
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-progress-linear
                v-if="dialog.loading"
                color="accent"
                :model-value="progress.loaded"
                height="20"
                rounded
            >
                <strong>{{ progress.loaded }}</strong>
            </v-progress-linear>
            <div class="v-container">
                <v-alert v-if="dialog.error.exist"
                         type="error"
                         density="compact"
                         transition="scale-transition"
                >{{ dialog.error.text }}
                </v-alert>
                <v-text-field v-model="professionName" v-if="dialog.type===Dialog.Profession" class="full-width mt-1"
                              label="Profession name"
                              variant="outlined"
                              density="compact" hide-details></v-text-field>
                <v-text-field v-model="hospitalName" v-if="dialog.type===Dialog.Hospital" class="full-width mt-1"
                              label="Hospital name"
                              variant="outlined" density="compact"
                              hide-details></v-text-field>
                <div
                    v-if="dialog.type===Dialog.Avatar || dialog.type===Dialog.Hospital || dialog.type===Dialog.DoctorAvatar">
                    <cropper
                        v-if="!!imageToEdit"
                        class="cropper"
                        :src="imageToEdit"
                        :stencil-props="{aspectRatio: 1}"
                        @change="handleImageCoordinatesChange"
                    />
                    <div class="file-selector">
                        <label for="file-selector-input">
                            <v-icon>mdi-image</v-icon>
                            Browse image</label>
                        <input id="file-selector-input" type="file" @change="handleImageChange($event)"
                               accept="image/*"/>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="success.exist" timeout="2000" color="success" top>{{ success.text }}</v-snackbar>
</template>

<script setup lang="ts">
import {useUser} from "../store/user";
import {storeToRefs} from "pinia";
import {computed, onMounted, reactive, ref} from "vue";
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import {useImage} from "../composables/image";
import {ChangeRole, CreateOrUpdateDoctor, CreateProfession, FetchDoctorByAuth, LogOut, UploadUserAvatar} from "../api";
import {Doctor, DoctorDTO, User} from "../dtos";
import {router} from "../router";

enum Dialog {Avatar, DoctorAvatar, Hospital, Profession}

interface Coordinates {
    top: number,
    left: number,
    width: number,
    height: number,
}

const userStore = useUser();
const image = useImage();
const {role} = storeToRefs(userStore);


const imageToEdit = ref("");
const professionName = ref("");
const hospitalName = ref("");
const editingUser = ref(false);
const editingDoctor = ref(false);
const updatingDoctor = ref(false);
const file = ref<File>();
const imageCoordinates = ref<Coordinates>()
const progress = reactive({
    loaded: 0,
});

const success = reactive({
    exist: false,
    text: "",
})

const dialog = reactive({
    show: false,
    loading: false,
    error: {exist: false, text: ""},
    title: "",
    type: Dialog.Avatar,
});

let initialUser: User = {
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    role: "",
    img: "",
    created_at: 0,
    updated_at: 0
}

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
        name: "Nevropatoloq",
    },
    hospital: {
        _id: "",
        name: "Avrasiya Hospital",
        img: "",
    },
    contact: {
        email: "",
        phone: "",
        facebook: ""
    },
    experience: [
        {
            profession: "Baş anestezioloq",
            hospital: "",
            field: "",
            term_start: 0,
            term_end: 0,
            country: ""
        }
    ],
    education: [
        {
            degree: "",
            major: "",
            institution: "",
            term_start: 0,
            term_end: 0,
            country: ""
        }
    ],
    created_at: 0,
    updated_at: 0
};
const doctor = ref<Doctor>(initialDoctor);

const dialogTitle = computed(() => {
    switch (dialog.type) {
        case Dialog.Avatar:
            return "Change Avatar";
        case Dialog.DoctorAvatar:
            return "Change Doctor Avatar";
        case Dialog.Hospital:
            return "Add Hospital";
        case Dialog.Profession:
            return "Add Profession";
    }
})


onMounted(async () => {
    const res = await FetchDoctorByAuth();
    if (res.ok && res.data) {
        doctor.value = res.data;
        initialUser = userStore.user;
        initialDoctor = res.data;
    }
})


async function handleChangeRole() {
    const res = await ChangeRole();
    if (res.ok) userStore.changeRole("doctor");
}

async function handleLogOut() {
    const res = await LogOut();
    if (res.ok) {
        userStore.deleteUser("logout_user_action");
        await router.replace("/login");
    }

}

async function handleUserSave() {
    editingUser.value = false;
}

async function handleDoctorSave() {
    const doctorDto: DoctorDTO = {
        title: doctor.value.title,
        first_name: doctor.value.first_name,
        last_name: doctor.value.last_name,
        about: doctor.value.about,
        profession_id: doctor.value.profession._id,
        hospital_id: doctor.value.hospital._id,
        contact: doctor.value.contact,
        experience: doctor.value.experience,
        education: doctor.value.education,
    }
    updatingDoctor.value = true;
    const res = await CreateOrUpdateDoctor(doctorDto);
    if (res.ok) {
        success.exist = true;
        success.text = "Profile Updated Successfully!"
        editingDoctor.value = false;
    }
    updatingDoctor.value = false;
}

function addExperience() {
    if (!doctor.value.experience) doctor.value.experience = [];
    doctor.value.experience.push({
        profession: "",
        hospital: "",
        field: "",
        term_start: 0,
        term_end: 0,
        country: ""
    });
}

function addEducation() {
    if (!doctor.value.education) doctor.value.education = [];
    doctor.value.education.push({
        degree: "",
        major: "",
        institution: "",
        term_start: 0,
        term_end: 0,
        country: ""
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
        console.log(reader.result)
        imageToEdit.value = reader.result as string
    }
    reader.readAsDataURL(file.value);
}

function handleImageCoordinatesChange(event: any) {
    imageCoordinates.value = event.coordinates as Coordinates;
    console.log(event.coordinates)
}

function showDialog(dialogType: Dialog) {
    dialog.type = dialogType;
    dialog.show = true;
    dialog.error.exist = false;
    dialog.error.text = "";
    success.exist = false;
    success.text = "";
    dialog.loading = false;
}

async function handleDialogSave() {
    switch (dialog.type) {
        case Dialog.Avatar:
            await handleUserAvatarChange();
            break;
        case Dialog.DoctorAvatar:
            break;
        case Dialog.Hospital:
            break;
        case Dialog.Profession:
            await handleCreateProfession();
            break;
    }
}

async function handleUserAvatarChange() {
    const data = new FormData;
    data.append("file", file.value as File);
    data.append("coordinates", JSON.stringify(imageCoordinates.value));
    dialog.loading = true;
    const res = await UploadUserAvatar(data, (e: { loaded: number; total: number; }) => {
        console.log("PROGRESS", (e.loaded * 100) / e.total);
        progress.loaded = (e.loaded * 100) / e.total;
    });
    dialog.loading = false;
    if (res.ok) {
        success.exist = true;
        success.text = "Image uploaded successfully!";
        userStore.setUserImg(res.data);
        dialog.show = false;
    } else {
        dialog.error.exist = true;
        dialog.error.text = res.error;
    }
    imageToEdit.value = "";
}

async function handleCreateProfession() {
    dialog.loading = true;
    const res = await CreateProfession(professionName.value);
    dialog.loading = false;
    if (res.ok) {
        success.exist = true;
        success.text = "Profession added successfully!";
        // ADD PROFESSION TO PROFESSIONS
        dialog.show = false;
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

function cancelEditingDoctor() {
    doctor.value = initialDoctor;
    editingDoctor.value = false;
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.cropper {
    height: 500px;
    background: #DDD;
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

    > input, label {
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
    transition: transform .2s ease-in-out;
}
</style>