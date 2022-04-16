<template>
    <div class="pt-10 d-flex justify-center">
        <v-card  class="px-4 py-4" min-width="350px">
            <v-progress-linear
                v-if="loading"
                height="4"
                rounded
                color="primary"
                indeterminate
            ></v-progress-linear>
            <div>
                <h3>{{ $t('login') }}</h3>
                <v-text-field v-model="username" class="mt-4" color="accent" :label="$t('username_or_email')" variant="outlined"
                              density="compact" hide-details></v-text-field>
                <v-text-field v-model="password" class="mt-4" color="accent" :label="$t('password')" type="password" variant="outlined"
                              density="compact" hide-details></v-text-field>
                <div class="d-flex justify-end">
                    <router-link to="/register" class="mt-1 text-decoration-underline text-accent">{{ $t('forgot_password') }}</router-link>
                </div>
                <v-btn @click="handleLogin()" :disabled="loading" class="mt-4 bg-accent text-white-text" block>{{$t('btn_login')}}</v-btn>
                <p class="mt-4">{{$t('login_options')}}</p>
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
import {ref} from "vue";

const username = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = () => {
    loading.value = true;
}

</script>

<style scoped>

</style>