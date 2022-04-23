<template>
    <div>
        <h1>Profile Page</h1>
        <h2>You are a {{ role }}</h2>
        <v-btn v-if="role==='user'" @click="user.changeRole()" class="mt-4 bg-accent text-white-text" block>CHANGE
            ROLE
        </v-btn>
        <v-btn @click="user.logOut('logout_user_action')" class="mt-4 bg-accent text-white-text" block>LOGOUT</v-btn>
    </div>
</template>

<script setup lang="ts">
import {useUser} from "../store/user";
import {storeToRefs} from "pinia";

const user = useUser();
const {role} = storeToRefs(user);
</script>

<style scoped>

</style>