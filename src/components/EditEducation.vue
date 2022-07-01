<template>
    <div>
        <v-card width="100%" color="transparent" class="pa-2">
            <div v-if="!editing">
                <div class="d-flex justify-space-between">
                    <p>No: {{ index + 1 }}</p>
                    <div>
                        <button @click="handleStartEdit()" class="btn-text">Edit</button>
                        <button @click="handleDelete()" class="btn-text ms-2" style="color: red">Delete</button>
                    </div>
                </div>
                <table>
                    <tr>
                        <td>Degree:</td>
                        <td><b>{{ educationModel.degree }}</b></td>
                    </tr>
                    <tr>
                        <td>Major:</td>
                        <td><b>{{ educationModel.major }}</b></td>
                    </tr>
                    <tr>
                        <td>Institution:</td>
                        <td><b>{{ educationModel.institution }}</b></td>
                    </tr>
                    <tr>
                        <td>Term Start:</td>
                        <td><b>{{ educationModel.term_start }}</b></td>
                    </tr>
                    <tr>
                        <td>Term End:</td>
                        <td><b>{{ educationModel.term_end }}</b></td>
                    </tr>
                    <tr>
                        <td>Country:</td>
                        <td><b>{{ educationModel.country }}</b></td>
                    </tr>
                </table>
            </div>
            <div v-else>
                <div>
                    <p>No: {{ index + 1 }}</p>
                    <v-text-field v-model="educationModel.degree"
                                  class="mt-2"
                                  label="Degree"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <v-text-field v-model="educationModel.major"
                                  class="mt-2"
                                  label="Major"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <v-text-field v-model="educationModel.institution"
                                  class="mt-2"
                                  label="Institution"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <v-text-field v-model="educationModel.term_start"
                                  type="number"
                                  class="mt-2"
                                  label="Term Start"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <v-text-field v-model="educationModel.term_end"
                                  type="number"
                                  class="mt-2"
                                  label="Term End"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                    <v-text-field v-model="educationModel.country"
                                  class="mt-2"
                                  label="Country"
                                  variant="outlined"
                                  density="compact"
                                  hide-details></v-text-field>
                </div>
                <div class="d-flex justify-end mt-2">
                    <v-btn @click="handleCancel()" color="accent" variant="outlined">cancel</v-btn>
                    <v-btn @click="handleSave()" color="accent" class="ms-2">save</v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {DoctorEducationUpdateDTO, Education} from "../dtos";
import {UpdateDoctorEducation} from "../api";

interface Props {
    education: Education,
    index: number,
}

const emit = defineEmits(["save", "remove", "cancel", "success", "error"])
const props = defineProps<Props>()

let initialVal = JSON.parse(JSON.stringify(props.education));

const editing = ref(props.education._id == "-1");
const educationModel = ref<Education>(props.education);

function handleStartEdit() {
    editing.value = true;
}

function handleCancel() {
    educationModel.value = initialVal;
    editing.value = false;
    if (props.education._id == "-1") {
        emit("remove");
    } else {
        emit("cancel");
    }
}

async function handleSave() {
    const res = await update(props.education._id == "-1" ? "create" : "edit");
    if (res.ok) {
        educationModel.value._id = res.data;
        emit("save", educationModel.value);
        emit("success");
        editing.value = false;
        initialVal = JSON.parse(JSON.stringify(educationModel.value));
    } else {
        emit("error", res.error);
    }
}

async function handleDelete() {
    const res = await update("delete")
    if (res.ok) {
        emit("remove");
        emit("success");
    } else {
        emit("error", res.error);
    }
}

async function update(actionType: string) {
    const update: DoctorEducationUpdateDTO = {
        action: actionType,
        _id: props.education._id != "-1" ? props.education._id : null,
        value: {
            degree: educationModel.value.degree,
            major: educationModel.value.major,
            institution: educationModel.value.institution,
            country: educationModel.value.country,
            term_start: educationModel.value.term_start,
            term_end: educationModel.value.term_end,
        }
    }
    return await UpdateDoctorEducation(update)
}
</script>

<style scoped lang="scss">

</style>