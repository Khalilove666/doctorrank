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
                <Error v-if="error.exist" :text="error.text" class="mt-4"/>
                <v-text-field v-model="username" class="mt-4" color="accent" :label="$t('username_or_email')"
                              variant="outlined"
                              density="compact" hide-details></v-text-field>
                <v-text-field v-model="password" class="mt-4" color="accent" :label="$t('password')" type="password"
                              variant="outlined"
                              density="compact" hide-details></v-text-field>
                <div class="d-flex justify-end">
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
import {reactive, ref} from "vue";
import {login} from "../api";
import Error from "../components/Error.vue";
import {useUser} from "../store/user";

const user = useUser();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = reactive({
    exist: false,
    text: "",
});

const handleLogin = async () => {
    error.exist = false;
    error.text = "";
    loading.value = true;
    loading.value = true;
    const res = await login(username.value, password.value);
    if (res.ok) {
        user.setUser(res.data)
    } else {
        error.exist = true;
        error.text = res.error;
    }
    loading.value = false;
}

</script>

<style scoped>

</style>