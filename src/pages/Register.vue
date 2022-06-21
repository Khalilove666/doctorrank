<template>
    <div class="pt-10 d-flex justify-center">
        <v-card class="px-4 py-4" min-width="350px" max-width="350px">
            <v-progress-linear
                v-if="loading"
                height="4"
                rounded
                color="primary"
                indeterminate
            ></v-progress-linear>
            <div v-if="!success">
                <h3>{{ $t('register') }}</h3>
                <Error v-if="error.exist" :text="error.text" class="mt-4"/>
                <v-form
                    ref="form"
                >
                    <v-text-field
                        v-model="firstName"
                        type="text"
                        class="mt-4"
                        color="accent"
                        :label="$t('first_name')"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty]"
                    ></v-text-field>
                    <v-text-field
                        v-model="lastName"
                        type="text"
                        class="mt-4"
                        color="accent"
                        :label="$t('last_name')"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty]"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        class="mt-4"
                        color="accent"
                        :label="$t('email')"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty, rules.email]"
                    ></v-text-field>
                    <v-text-field
                        v-model="username"
                        class="mt-4"
                        color="accent"
                        :label="$t('select_username')"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty]"
                    ></v-text-field>
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
                <div class="d-flex justify-end">
                </div>
                <v-btn @click="handleRegister()" :disabled="loading" class="mt-4 bg-accent text-white-text" block>
                    {{ $t('btn_register') }}
                </v-btn>
                <p class="mt-4">{{ $t('register_options') }}</p>
                <v-divider></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                    <v-btn
                        icon="mdi-google"
                        variant="outlined"
                        class="text-primary"
                        size="small"
                    ></v-btn>
                    <v-btn
                        icon="mdi-facebook"
                        variant="outlined"
                        class="text-primary"
                        size="small"
                    ></v-btn>
                    <v-btn
                        icon="mdi-twitter"
                        variant="outlined"
                        class="text-primary"
                        size="small"
                    ></v-btn>
                </div>
            </div>
            <div v-else class="d-flex flex-column mt-4">
                <v-alert type="success" transition="scale-transition">Registration successful !</v-alert>
                <p class="mt-4 align-self-center">We have just sent you confirmation mail. Please check your inbox to
                    activate your profile.</p>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import Error from "../components/Error.vue";
import {useRules} from "../composables/rules";
import {Register} from "../api";
import {useRouter} from "vue-router";
import {RegisterDTO} from "../dtos";

const router = useRouter();
const rules = useRules();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");

const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);
const error = reactive({exist: false, text: ""});
const form = ref<Element & { validate: () => Promise<{ valid: boolean, errorMessages: any }> } | null>(null);

const handleRegister = async () => {
    const validation = await form.value?.validate()
    if (validation?.valid) {
        const user: RegisterDTO = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            username: username.value,
            password: password.value,
        }
        error.exist = false;
        error.text = "";
        loading.value = true;
        const res = await Register(user);
        loading.value = false;
        if (res.ok) {
            success.value = true;
        } else {
            error.exist = true;
            error.text = res.error;
        }
    }

}

function passwordMatch(value: string) {
    return value == password.value || "password_not_match"
}
</script>

<style scoped>

</style>