<template>
    <div>
        <v-card width="100%" color="transparent" class="pa-2">
            <div v-if="!editing">
                <div class="d-flex justify-space-between">
                    <p>No: {{ index + 1 }}</p>
                    <div>
                        <button class="btn-text" @click="handleStartEdit()">Edit</button>
                        <button class="btn-text ms-2" style="color: red" @click="handleDelete()">Delete</button>
                    </div>
                </div>
                <table>
                    <tr>
                        <td>Profession:</td>
                        <td>
                            <b>{{ experienceModel.profession }}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Field:</td>
                        <td>
                            <b>{{ experienceModel.field }}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Hospital:</td>
                        <td>
                            <b>{{ experienceModel.hospital }}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Term Start:</td>
                        <td>
                            <b>{{ experienceModel.term_start }}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Term End:</td>
                        <td>
                            <b>{{ experienceModel.term_end }}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Country:</td>
                        <td>
                            <b>{{ experienceModel.country }}</b>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                <div>
                    <p>No: {{ index + 1 }}</p>
                    <v-text-field
                        v-model="experienceModel.profession"
                        class="mt-2"
                        label="Profession"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="experienceModel.hospital"
                        class="mt-2"
                        label="Hospital"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="experienceModel.field"
                        class="mt-2"
                        label="Field"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="experienceModel.term_start"
                        type="number"
                        class="mt-2"
                        label="Term Start"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="experienceModel.term_end"
                        type="number"
                        class="mt-2"
                        label="Term End"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="experienceModel.country"
                        class="mt-2"
                        label="Country"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                </div>
                <div class="d-flex justify-end mt-2">
                    <v-btn color="accent" variant="outlined" @click="handleCancel()">cancel</v-btn>
                    <v-btn color="accent" class="ms-2" @click="handleSave()">save</v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DoctorExperienceUpdateDTO, Experience } from "../dtos";
import { UpdateDoctorExperience } from "../api";

interface Props {
    experience: Experience;
    index: number;
}

const emit = defineEmits(["save", "remove", "cancel", "success", "error"]);
const props = defineProps<Props>();

let initialVal = JSON.parse(JSON.stringify(props.experience));

const editing = ref(props.experience._id == "-1");
const experienceModel = ref<Experience>(props.experience);

function handleStartEdit() {
    editing.value = true;
}

function handleCancel() {
    experienceModel.value = initialVal;
    editing.value = false;
    if (props.experience._id == "-1") {
        emit("remove");
    } else {
        emit("cancel");
    }
}

async function handleSave() {
    const res = await update(props.experience._id == "-1" ? "create" : "edit");
    if (res.ok) {
        experienceModel.value._id = res.data;
        emit("save", experienceModel.value);
        emit("success");
        editing.value = false;
        initialVal = JSON.parse(JSON.stringify(experienceModel.value));
    } else {
        emit("error", res.error);
    }
}

async function handleDelete() {
    const res = await update("delete");
    if (res.ok) {
        emit("remove");
        emit("success");
    } else {
        emit("error", res.error);
    }
}

async function update(actionType: string) {
    const update: DoctorExperienceUpdateDTO = {
        action: actionType,
        _id: props.experience._id != "-1" ? props.experience._id : null,
        value: {
            profession: experienceModel.value.profession,
            field: experienceModel.value.field,
            hospital: experienceModel.value.hospital,
            country: experienceModel.value.country,
            term_start: experienceModel.value.term_start,
            term_end: experienceModel.value.term_end,
        },
    };
    return await UpdateDoctorExperience(update);
}
</script>

<style scoped lang="scss"></style>
