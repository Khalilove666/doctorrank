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
                <h3>Qeydiyyat</h3>
                <Error class="mt-4" text="Username already taken"/>
                <v-text-field
                    v-model="firstName"
                    type="text"
                    class="mt-4"
                    color="accent"
                    label="Ad"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <v-text-field
                    v-model="lastName"
                    type="text"
                    class="mt-4"
                    color="accent"
                    label="Soyad"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    class="mt-4"
                    color="accent"
                    label="Email"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <v-text-field
                    v-model="username"
                    class="mt-4"
                    color="accent"
                    label="İstifadəçi adı seçin"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    class="mt-4"
                    color="accent"
                    label="Şifrə"
                    type="password"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <v-text-field
                    v-model="passwordConfirm"
                    class="mt-4"
                    color="accent"
                    label="Şifrə təkrar"
                    type="password"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
                <div class="d-flex justify-end">
                </div>
                <v-btn @click="handleRegister()" :disabled="loading" class="mt-4 bg-accent text-white-text" block>
                    QEYDİYYAT
                </v-btn>
                <p class="mt-4">Digər qeydiyyat seçimləri</p>
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
import Error from "../components/Error.vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const passwordConfirm = ref("");
const loading = ref(false);

const handleRegister = () => {
    loading.value = true;
}
</script>

<style scoped>

</style>