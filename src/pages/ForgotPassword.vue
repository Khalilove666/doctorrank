<template>
    <div class="pt-10 d-flex justify-center">
        <v-card class="px-4 py-4" min-width="350px" max-width="350px">
            <h3>Send password reset email</h3>
            <v-progress-linear v-if="loading" height="4" color="primary" class="mt-4" rounded indeterminate></v-progress-linear>
            <v-alert v-if="error.exist" class="mt-4" type="error" transition="scale-transition">{{ error.text }} </v-alert>
            <div v-if="!success">
                <v-form ref="form">
                    <v-text-field
                        v-model="login"
                        class="mt-4"
                        color="accent"
                        :label="$t('username_or_email')"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty]"
                    ></v-text-field>
                </v-form>
                <v-btn :disabled="loading" class="mt-4 bg-accent text-white-text" block @click="handleSubmit()">
                    Send Email
                </v-btn>
            </div>
            <div v-else class="d-flex flex-column mt-4">
                <v-alert type="success" transition="scale-transition">Email sent successfully!</v-alert>
                <p class="mt-4 align-self-center">We have just sent you email. Please check your inbox to reset your password.</p>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { SendPasswordResetEmail } from "../api";
import { useRules } from "../composables/rules";

const rules = useRules();

const login = ref("");
const loading = ref(false);
const success = ref(false);
const error = reactive({ exist: false, text: "" });
const form = ref<(Element & { validate: () => Promise<{ valid: boolean; errorMessages: any }> }) | null>(null);

async function handleSubmit() {
    const validation = await form.value?.validate();
    if (validation?.valid) {
        error.exist = false;
        error.text = "";
        loading.value = true;
        const res = await SendPasswordResetEmail(login.value);
        loading.value = false;
        if (res.ok) {
            success.value = true;
        } else {
            error.exist = true;
            error.text = res.error;
        }
    }
}
</script>

<style scoped></style>
