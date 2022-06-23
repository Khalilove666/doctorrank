<template>
    <div class="pt-10 d-flex justify-center">
        <v-card class="px-4 py-4" min-width="350px">
            <h3>Profile Activation</h3>
            <v-progress-linear
                v-if="loading"
                height="4"
                color="primary"
                class="mt-4"
                rounded
                indeterminate
            ></v-progress-linear>
            <div v-if="success" class="d-flex flex-column mt-4">
                <v-alert type="success" transition="scale-transition">Email confirmed successfully!</v-alert>
                <router-link to="/login" replace class="mt-4 btn-text align-self-center">Go to login</router-link>
            </div>
            <v-alert v-if="error.exist" class="mt-4" type="error" transition="scale-transition">{{error.text}}</v-alert>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {ConfirmEmail} from "../api";

const route = useRoute();

const loading = ref(false);
const success = ref(false);
const error = reactive({exist: false, text: ""});

onMounted(async () => {
    const activationToken = route.query.activationToken as string;
    loading.value = true;
    const res = await ConfirmEmail(activationToken);
    loading.value = false;
    if (res.ok) {
        success.value = true;
    } else {
        error.exist = true;
        error.text = res.error;
    }
})

</script>

<style scoped>

</style>