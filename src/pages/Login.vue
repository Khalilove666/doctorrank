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
                <h3>{{ $t('login') }}</h3>
<!--                <Error v-if="userStore.error.exist" :text="userStore.error.text" class="mt-4"/>-->
                <v-alert v-if="userStore.error.exist"
                         type="error"
                         density="compact"
                         transition="scale-transition"
                         closable
                         variant="outlined"
                >{{ userStore.error.text }}
                </v-alert>
                <v-text-field v-model="username" class="mt-4" color="accent" :label="$t('username_or_email')"
                              variant="outlined"
                              density="compact" hide-details></v-text-field>
                <v-text-field v-model="password" class="mt-4" color="accent" :label="$t('password')" type="password"
                              variant="outlined"
                              density="compact" hide-details></v-text-field>
                <div class="d-flex justify-space-between align-center">
                    <v-checkbox
                        v-model="rememberMe"
                        label="remember me"
                        color="accent"
                        hide-details
                    ></v-checkbox>
                    <router-link to="/register" class="mt-1 text-decoration-underline text-accent">
                        {{ $t('forgot_password') }}
                    </router-link>
                </div>
                <v-btn @click="handleLogin()" :disabled="loading" class="mt-4 bg-accent text-white-text" block>
                    {{ $t('btn_login') }}
                </v-btn>
                <p class="mt-4">{{ $t('login_options') }}</p>
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
import {onMounted, reactive, ref} from "vue";
import Error from "../components/Error.vue";
import {useUser} from "../store/user";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUser();

const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);

onMounted(() => {
    userStore.setSuccess(false);
    userStore.setError(false, "");
})
const handleLogin = async () => {
    loading.value = true;
    await userStore.logIn(username.value, password.value, rememberMe.value);
    loading.value = false;
}

</script>

<style scoped>

</style>