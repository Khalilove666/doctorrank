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
            <div>
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
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        class="mt-4"
                        color="accent"
                        :label="$t('email')"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="username"
                        class="mt-4"
                        color="accent"
                        :label="$t('select_username')"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        class="mt-4"
                        color="accent"
                        :label="$t('password')"
                        type="password"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                    <v-text-field
                        v-model="passwordConfirm"
                        class="mt-4"
                        color="accent"
                        :label="$t('confirm_password')"
                        type="password"
                        variant="outlined"
                        density="compact"
                        hide-details
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
        </v-card>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import Error from "../components/Error.vue";
import {useRules} from "../composables/rules";
import {useUser} from "../store/user";
import {Register} from "../api";
import {useRouter} from "vue-router";
import {RegisterDTO} from "../dtos";

const router = useRouter();
const rules = useRules();
const userStore = useUser();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");

const loading = ref(false);
const success = ref(false);
const error = reactive({exist: false, text: ""});

const handleRegister = async () => {
    const user: RegisterDTO = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        username: username.value,
        password: password.value,
    }
    success.value = false;
    error.exist = false;
    error.text = "";
    loading.value = true;
    const res = await Register(user);
    if (res.ok) {
        success.value = true;
        await router.replace("/login");
    } else {
        error.exist = true;
        error.text = res.error;
    }
    loading.value = false;
}
</script>

<style scoped>

</style>