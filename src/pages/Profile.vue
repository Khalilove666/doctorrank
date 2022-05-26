<template>
    <div>
        <div class="pt-2 d-flex justify-space-between">
            <h1>{{ role }}'s Profile</h1>
            <v-btn @click="userStore.logOut('logout_user_action')" class="bg-accent text-white-text" icon="mdi-logout"
                   size="small"></v-btn>
        </div>
        <v-row class="mt-2">
            <v-col cols="12" md="3">
                <div class="d-flex position-relative justify-end">
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
                    <v-btn v-if="editingUser" @click="handleUserSave()" icon="mdi-content-save-outline"
                           size="x-small" class="bg-accent text-white-text"></v-btn>
                    <v-btn v-else @click="editingUser = true" icon="mdi-account-edit-outline"
                           size="x-small" class="bg-accent text-white-text"></v-btn>
                </div>
                <v-row class="mt-1">
                    <v-col cols="12" sm="6">
                        <v-text-field label="First Name" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Last Name" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-h5 mt-4">Contacts</p>
                <v-divider></v-divider>
                <v-row class="mt-1">
                    <v-col cols="12" md="4">
                        <v-text-field label="Email" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Phone" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Facebook" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-btn v-if="role==='user'" @click="userStore.changeRole()" class="bg-accent text-white-text mt-4" block>
        CHANGE TO DOCTOR PROFILE
    </v-btn>
    <div v-else class="doctor-info">
        <v-row class="mt-2">
            <v-col cols="12" md="3">
                <div class="d-flex position-relative justify-end">
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
                <p class="text-h5">Base info</p>
                <v-divider></v-divider>
                <v-row class="mt-1">
                    <v-col cols="12" sm="2">
                        <v-text-field label="Title" placeholder="Example: Dr." variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field label="First Name" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-text-field label="Last Name" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-h5 mt-4">Contacts</p>
                <v-divider></v-divider>
                <v-row class="mt-1">
                    <v-col cols="12" md="4">
                        <v-text-field label="Email" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Phone" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Facebook" variant="outlined" density="compact"
                                      hide-details></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-h5 mt-4">About</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-textarea color="accent" label="Detailed information about you" hide-details></v-textarea>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Profession</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-autocomplete
                        density="compact"
                        chips
                        small-chips
                        label="Select your profession"
                        clearable
                        variant="outlined"
                        color="accent"
                        hide-details
                    ></v-autocomplete>
                    <p class="btn-text mt-1" @click="showDialog(Dialog.Profession)">Add profession if it is not existing
                        in
                        the list above.</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Hospital</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-autocomplete
                        density="compact"
                        chips
                        small-chips
                        label="Select Hospital you currently work"
                        clearable
                        variant="outlined"
                        color="accent"
                        hide-details
                    ></v-autocomplete>
                    <p class="btn-text mt-1" @click="showDialog(Dialog.Hospital)">Add hospital if it is not existing in
                        the
                        list above.</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Experience</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-row v-if="experienceList.length >  0">
                        <v-col cols="12" md="6" v-for="(experience, index) in experienceList">
                            <v-card width="100%" color="transparent" class="pa-2">
                                <div class="d-flex justify-space-between align-center">
                                    <p>{{ index }}</p>
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
                                <v-text-field class="mt-2" label="Hospital" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Field" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Term Start" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Term End" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Country" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                            </v-card>
                        </v-col>
                    </v-row>
                    <p class="btn-text" @click="addExperience()" block>Add new Experience</p>
                </div>
            </v-col>
            <v-col cols="12" md="6">
                <p class="text-h5 mt-4">Education</p>
                <v-divider></v-divider>
                <div class="mt-2">
                    <v-row v-if="educationList.length >  0">
                        <v-col cols="12" md="6" v-for="(education, index) in educationList">
                            <v-card width="100%" color="transparent" class="pa-2">
                                <div class="d-flex justify-space-between align-center">
                                    <p>{{ index }}</p>
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
                                <v-text-field class="mt-2" label="Major" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Institution" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Term Start" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Term End" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                                <v-text-field class="mt-2" label="Country" variant="outlined" density="compact"
                                              hide-details></v-text-field>
                            </v-card>
                        </v-col>
                    </v-row>
                    <p class="btn-text" @click="addEducation()">Add Education
                    </p>
                </div>
            </v-col>
        </v-row>
        <v-btn class="mt-2" color="accent" block>SAVE ALL</v-btn>
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
                :active="dialog.loading"
                indeterminate
                color="accent"
                rounded
            ></v-progress-linear>
            <div class="v-container">
                <v-alert v-if="dialog.error.exist"
                         type="error"
                         density="compact"
                         transition="scale-transition"
                >{{ dialog.error.text }}
                </v-alert>
                <v-text-field v-if="dialog.type===Dialog.Profession" class="full-width mt-1" label="Profession name"
                              variant="outlined"
                              density="compact" hide-details></v-text-field>
                <v-text-field v-if="dialog.type===Dialog.Hospital" class="full-width mt-1" label="Hospital name"
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
    <v-snackbar v-model="dialog.success.exist" timeout="2000" color="success" top>{{ dialog.success.text }}</v-snackbar>
</template>

<script setup lang="ts">
import {useUser} from "../store/user";
import {storeToRefs} from "pinia";
import {computed, reactive, ref} from "vue";
import {Education, Experience} from "../store/doctors/types";
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Error from "../components/Error.vue";
import {UploadUserAvatar} from "../api";
import {useImage} from "../composables/image";

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
const editingUser = ref(false);
const file = ref<File>();
const imageCoordinates = ref<Coordinates>()

const dialog = reactive({
    show: false,
    loading: false,
    error: {exist: false, text: ""},
    success: {exist: false, text: ""},
    title: "",
    type: Dialog.Avatar,
})

const experienceList = ref<Experience[]>([{
    profession: "",
    hospital: "",
    field: "",
    term_start: 0,
    term_end: 0,
    country: ""
}]);
const educationList = ref<Education[]>([{
    degree: "",
    major: "",
    institution: "",
    term_start: 0,
    term_end: 0,
    country: ""
}]);

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

function handleUserSave() {
    editingUser.value = false;
}

function addExperience() {
    experienceList.value.push({
        profession: "",
        hospital: "",
        field: "",
        term_start: 0,
        term_end: 0,
        country: ""
    });
}

function addEducation() {
    educationList.value.push({
        degree: "",
        major: "",
        institution: "",
        term_start: 0,
        term_end: 0,
        country: ""
    });
}

function removeExperience(index: number) {
    experienceList.value.splice(index, 1);
}

function removeEducation(index: number) {
    educationList.value.splice(index, 1);
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
    dialog.success.exist = false;
    dialog.success.text = "";
    dialog.loading = false;
}

async function handleDialogSave() {
    if (dialog.type === Dialog.Avatar) {
        const data = new FormData;
        data.append("file", file.value as File);
        data.append("coordinates", JSON.stringify(imageCoordinates.value));
        dialog.loading = true;
        const res = await UploadUserAvatar(data);
        dialog.loading = false;
        if (res.ok) {
            dialog.success.exist = true;
            dialog.success.text = "Image uploaded successfully!";
            userStore.setUserImg(res.data);
            dialog.show = false;
        } else {
            dialog.error.exist = true;
            dialog.error.text = res.error;
        }
        imageToEdit.value = "";
    }
    // some async process
    // dialog.show = false;
    // dialog.error = false;
    // dialog.loading = false;
}

function handleDialogCancel() {
    dialog.show = false;
    dialog.error.exist = false;
    dialog.success.exist = false;
    dialog.loading = false;
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