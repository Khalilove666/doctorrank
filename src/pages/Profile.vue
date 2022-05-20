<template>
    <div>
        <div class="pt-2 d-flex justify-space-between">
            <h1>{{ role }}'s Profile</h1>
            <v-btn @click="user.logOut('logout_user_action')" class="bg-accent text-white-text" icon="mdi-logout"
                   size="small"></v-btn>
        </div>
        <v-btn v-if="role==='user'" @click="user.changeRole()" class="bg-accent text-white-text me-2" block>
            CHANGE TO DOCTOR PROFILE
        </v-btn>

        <v-row class="mt-2">
            <v-col cols="12" md="3">
                <v-card
                >
                    <v-img
                        class="align-end text-white rounded"
                        :src="img"
                        cover
                        height="400"
                    >
                        <v-btn
                            color="accent"
                            dark
                            @click="showDialog('avatar')"
                            icon="mdi-camera"
                            class="ms-2 mb-2"
                        ></v-btn>
                    </v-img>
                </v-card>
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
                        <v-text-field label="Email" variant="outlined" density="compact" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Phone" variant="outlined" density="compact" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field label="Facebook" variant="outlined" density="compact" hide-details></v-text-field>
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
                    <p class="btn-text mt-1" @click="showDialog('profession')">Add profession if it is not existing in
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
                    <p class="btn-text mt-1" @click="showDialog('hospital')">Add hospital if it is not existing in the
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
                    <v-toolbar-title>{{ dialog.title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            dark
                            text
                            @click="handleDialogSave"
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
                    <Error v-if="dialog.error" text="EROROROROOR"/>
                    <v-text-field v-if="dialog.type==='profession'" class="full-width mt-1" label="Profession name"
                                  variant="outlined"
                                  density="compact" hide-details></v-text-field>
                    <v-text-field v-if="dialog.type==='hospital'" class="full-width mt-1" label="Hospital name"
                                  variant="outlined" density="compact"
                                  hide-details></v-text-field>
                    <div v-if="dialog.type==='avatar' || dialog.type==='hospital'">
                        <cropper
                            v-if="!!img"
                            class="cropper"
                            :src="img"
                            :stencil-props="{aspectRatio: 1}"
                            @change="change"
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
    </div>
</template>

<script setup lang="ts">
import {useUser} from "../store/user";
import {storeToRefs} from "pinia";
import {reactive, ref} from "vue";
import {Education, Experience} from "../store/doctors/types";
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Error from "../components/Error.vue";

const user = useUser();
const {role} = storeToRefs(user);
const img = ref("");

const dialog = reactive({
    show: false,
    error: false,
    loading: false,
    title: "",
    type: "",
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

function handleImageChange(event: { target: { files: any[]; }; }) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
        console.log(reader.result)
        img.value = reader.result as string
    }
    reader.readAsDataURL(file);
}

function change(e: any) {
    console.log(e.coordinates, e.canvas)
}

function showDialog(dialogType: string) {
    dialog.show = true;
    dialog.error = false;
    dialog.loading = false;
    dialog.title = dialogType;
    dialog.type = dialogType;
}

function handleDialogSave() {
    // some async process
    dialog.show = false;
    dialog.error = false;
    dialog.loading = false;
    dialog.title = "";
    dialog.type = "";
}

function handleDialogCancel() {
    dialog.show = false;
    dialog.error = false;
    dialog.loading = false;
    dialog.title = "";
    dialog.type = "";
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