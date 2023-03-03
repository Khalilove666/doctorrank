<template>
    <div>
        <div v-if="!editing">
            <div class="d-flex justify-space-between">
                <p>
                    <b>{{ label }}:</b> {{ textarea ? "" : modelValue }}
                </p>
                <button class="btn-text" @click="handleStartEdit()">Edit</button>
            </div>
            <p v-if="textarea">{{ modelValue }}</p>
        </div>
        <div v-else>
            <v-textarea
                v-if="textarea"
                :model-value="modelValue"
                :label="label"
                hide-details="auto"
                @input="handleInput($event)"
            ></v-textarea>
            <v-text-field
                v-else
                :model-value="modelValue"
                :label="label"
                variant="outlined"
                density="compact"
                hide-details="auto"
                @input="handleInput($event)"
            ></v-text-field>
            <div class="d-flex justify-end mt-2">
                <v-btn color="accent" variant="outlined" @click="handleCancel()">cancel</v-btn>
                <v-btn color="accent" class="ms-2" @click="handleSave()">save</v-btn>
            </div>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["update:modelValue", "save"]);
const props = defineProps({
    label: { type: String, required: true },
    textarea: { type: Boolean, required: false, default: false },
    modelValue: { type: String, required: true, default: "" },
});
const editing = ref(false);
let initialVal = "";

function handleInput(event: any) {
    emit("update:modelValue", event.target.value);
}

function handleStartEdit() {
    editing.value = true;
    initialVal = props.modelValue;
}

function handleCancel() {
    emit("update:modelValue", initialVal);
    editing.value = false;
}

async function handleSave() {
    emit("save", function () {
        editing.value = false;
    });
}
</script>

<style scoped lang="scss"></style>
