<template>
    <div class="pt-10 d-flex justify-center">
        <v-card class="px-4 py-4" min-width="350px">
            <h3>Reset Password</h3>
            <v-progress-linear
                v-if="loading"
                height="4"
                color="primary"
                class="mt-4"
                rounded
                indeterminate
            ></v-progress-linear>
            <v-alert v-if="error.exist" class="mt-4" type="error" transition="scale-transition">{{ error.text }}
            </v-alert>
            <div v-if="!success">
                <v-form ref="form">
                    <v-text-field
                        v-model="password"
                        class="mt-4"
                        color="accent"
                        :label="$t('password')"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPassword = !showPassword"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty, rules.password]"
                    ></v-text-field>
                    <v-text-field
                        v-model="passwordConfirm"
                        class="mt-4"
                        color="accent"
                        :label="$t('confirm_password')"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPassword = !showPassword"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[passwordMatch]"
                    ></v-text-field>
                </v-form>
                <v-btn @click="handleSubmit()" :disabled="loading" class="mt-4 bg-accent text-white-text" block>
                    Confirm
                </v-btn>
            </div>
            <div v-else class="d-flex flex-column mt-4">
                <v-alert type="success" transition="scale-transition">Password reset successfully !</v-alert>
                <router-link to="/login" replace class="mt-4 btn-text align-self-center">Go to login</router-link>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {ConfirmEmail, ResetPassword, SendPasswordResetEmail} from "../api";
import {useRules} from "../composables/rules";

const route = useRoute();
const rules = useRules();

const pswResetToken = route.query.pswResetToken;

const password = ref("");
const passwordConfirm = ref("");
const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);
const error = reactive({exist: false, text: ""});
const form = ref<Element & { validate: () => Promise<{ valid: boolean, errorMessages: any }> } | null>(null);

async function handleSubmit() {
    const validation = await form.value?.validate()
    if (validation?.valid) {
        if (!pswResetToken) {
            error.exist = true;
            error.text = "token does not exist in url";
        } else {
            error.exist = false;
            error.text = "";
            loading.value = true;
            const res = await ResetPassword(pswResetToken as string, password.value);
            loading.value = false;
            if (res.ok) {
                success.value = true;
            } else {
                error.exist = true;
                error.text = res.error;
            }
        }
    }
}

function passwordMatch(value: string) {
    return value == password.value || "password_not_match"
}

</script>

<style scoped>

</style>