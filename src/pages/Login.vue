<template>
    <div class="pt-10 d-flex justify-center">
        <v-card class="px-4 py-4" min-width="350px" max-width="350px">
            <v-progress-linear v-if="loading" height="4" rounded color="primary" indeterminate></v-progress-linear>
            <div>
                <h3>{{ $t("login") }}</h3>
                <!--                <Error v-if="error.exist" :text="error.text" class="mt-4"/>-->
                <v-alert
                    v-if="error.exist"
                    type="error"
                    density="compact"
                    transition="scale-transition"
                    closable
                    variant="outlined"
                    >{{ error.text }}
                </v-alert>
                <v-form ref="form">
                    <v-text-field
                        v-model="username"
                        class="mt-4"
                        color="accent"
                        :label="$t('username_or_email')"
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
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        :rules="[rules.empty]"
                        @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>
                </v-form>
                <div class="d-flex justify-space-between align-center">
                    <v-checkbox v-model="rememberMe" label="remember me" color="accent" hide-details></v-checkbox>
                    <router-link to="/forgot-password" class="mt-1 text-decoration-underline text-accent">
                        {{ $t("forgot_password") }}
                    </router-link>
                </div>
                <v-btn :disabled="loading" class="mt-4 bg-accent text-white-text" block @click="handleLogin()">
                    {{ $t("btn_login") }}
                </v-btn>
                <p class="mt-4">{{ $t("login_options") }}</p>
                <v-divider></v-divider>
                <div class="mt-4 d-flex justify-space-between">
                    <v-btn icon="mdi-google" variant="outlined" class="text-primary" size="small"></v-btn>
                    <v-btn icon="mdi-facebook" variant="outlined" class="text-primary" size="small"></v-btn>
                    <v-btn icon="mdi-twitter" variant="outlined" class="text-primary" size="small"></v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUser } from "../store/user";
import { useRouter } from "vue-router";
import { Login } from "../api";
import { LoginDTO } from "../dtos";
import { useRules } from "../composables/rules";

const router = useRouter();
const userStore = useUser();
const rules = useRules();

const username = ref("");
const password = ref("");
const rememberMe = ref(false);

const showPassword = ref(false);
const loading = ref(false);
const success = ref(false);
const error = reactive({ exist: false, text: "" });
const form = ref<(Element & { validate: () => Promise<{ valid: boolean; errorMessages: any }> }) | null>(null);

const handleLogin = async () => {
    const validation = await form.value?.validate();
    if (validation?.valid) {
        error.exist = false;
        error.text = "";
        loading.value = true;
        const user: LoginDTO = { login: username.value, password: password.value, remember_me: rememberMe.value };
        const res = await Login(user);
        if (res.ok) {
            userStore.setUser(res.data, rememberMe.value);
            success.value = true;
            await router.replace("/");
        } else {
            error.exist = true;
            error.text = res.error;
        }
        loading.value = false;
    }
};
</script>

<style scoped></style>
