<template>
    <div>
        <div v-if="!editing" class="d-flex justify-space-between">
            <p><b>Password:</b> ********</p>
            <button class="btn-text" @click="handleStartEdit()">Change</button>
        </div>
        <div v-else>
            <v-progress-linear v-if="loading" indeterminate class="mb-2" color="accent" height="2" rounded></v-progress-linear>
            <v-alert
                v-if="error.exist"
                class="my-4"
                type="error"
                transition="scale-transition"
                variant="outlined"
                density="compact"
                >{{ error.text }}
            </v-alert>
            <v-form ref="form">
                <v-text-field
                    v-model="oldPassword"
                    label="Old Password"
                    variant="outlined"
                    density="compact"
                    hide-details="auto"
                    :rules="[rules.empty]"
                    type="password"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="mt-4"
                    label="New Password"
                    variant="outlined"
                    density="compact"
                    hide-details="auto"
                    :rules="[rules.empty, rules.password]"
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                    v-model="passwordConfirm"
                    class="mt-4"
                    label="Confirm New Password"
                    variant="outlined"
                    density="compact"
                    hide-details="auto"
                    :rules="[rules.empty, passwordMatch]"
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
            </v-form>
            <div class="d-flex justify-end mt-2">
                <v-btn color="accent" variant="outlined" @click="handleCancel()">cancel</v-btn>
                <v-btn color="accent" class="ms-2" @click="handleSave()">save</v-btn>
            </div>
        </div>
        <v-divider></v-divider>
        <v-alert v-if="success" class="mt-4" type="success" transition="scale-transition" variant="outlined" density="compact"
            >Password changed successfully !
        </v-alert>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ChangePassword } from "../api";
import { useRules } from "../composables/rules";

const rules = useRules();

const showPassword = ref(false);
const editing = ref(false);
const loading = ref(false);
const success = ref(false);
const error = reactive({ exist: false, text: "" });
const form = ref<(Element & { validate: () => Promise<{ valid: boolean; errorMessages: any }> }) | null>(null);

const oldPassword = ref("");
const password = ref("");
const passwordConfirm = ref("");

function handleStartEdit() {
    oldPassword.value = "";
    password.value = "";
    passwordConfirm.value = "";
    editing.value = true;
}

function handleCancel() {
    editing.value = false;
    error.exist = false;
    error.text = "";
    loading.value = false;
}

async function handleSave() {
    const validation = await form.value?.validate();
    if (validation?.valid) {
        loading.value = true;
        error.text = "";
        loading.value = false;
        const res = await ChangePassword(oldPassword.value, password.value);
        loading.value = false;
        if (res.ok) {
            success.value = true;
            editing.value = false;
            setTimeout(() => (success.value = false), 2000);
        } else {
            error.exist = true;
            error.text = res.error;
        }
    }
}

function passwordMatch(value: string) {
    return value == password.value || "password_not_match";
}
</script>

<style scoped lang="scss"></style>
