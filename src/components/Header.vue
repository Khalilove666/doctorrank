<template>
    <div class="wrapper py-2" :class="mobile? '' : 'px-4'">
        <v-row>
            <v-col v-if="mobile" cols="3">
                <div class="d-flex align-center full-height">
                    <v-icon @click="drawer=!drawer" class="round-btn color-text" v-ripple>mdi-menu</v-icon>
                </div>
            </v-col>
            <v-col v-else cols="4">
                <div class="d-flex align-center full-height">
                    <router-link to="/doctors" class="color-text text-decoration-none mr-4">Həkimlər</router-link>
                    <router-link to="/about" class="color-text text-decoration-none">Haqqında</router-link>
                </div>
            </v-col>
            <v-col :cols="mobile ? 6 : 4">
                <div class="d-flex justify-center align-center">
                    <router-link to="/" class="color-text text-decoration-none"><h2>Doctor Rank</h2></router-link>
                </div>
            </v-col>
            <v-col v-if="!mobile" cols="4">
                <div class="d-flex justify-end align-center full-height">
                    <a class="color-text">AZ</a>
                    <v-avatar v-if="loggedIn" v-ripple @click="">
                        <v-img
                            :src="evelyn"
                            alt="Evelyn"
                        ></v-img>
                    </v-avatar>
                    <template v-else>
                        <router-link to="/login" class="color-text text-decoration-none ml-4">Daxil ol</router-link>
                        <router-link to="/register" class="color-text text-decoration-none ml-4">Qeydiyyat</router-link>
                    </template>
                </div>
            </v-col>
        </v-row>
        <v-navigation-drawer v-if="mobile" v-model="drawer" temporary>
            <v-list v-if="loggedIn">
                <v-list-item
                    v-ripple
                    :prepend-avatar="evelyn"
                    title="Evelyn Claire"
                    subtitle="evelynclaire@gmail.com"
                >
                    <template v-slot:append>
                        <v-list-item-avatar end>
                            <v-btn size="small" variant="text" icon="mdi-logout"></v-btn>
                        </v-list-item-avatar>
                    </template>
                </v-list-item>
            </v-list>
            <v-list v-else density="compact">
                <router-link to="/login" class="text-decoration-none color-primary-text">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon icon="mdi-login"></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Daxil ol</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/register" class=" text-decoration-none color-primary-text">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon icon="mdi-account-plus-outline"></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Qeydiyyat</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact">
                <router-link to="/doctors" class="text-decoration-none color-primary-text">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon icon="mdi-doctor"></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Həkimlər</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/about" class="text-decoration-none color-primary-text">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon icon="mdi-information-variant"></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Haqqında</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon icon="mdi-translate"></v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>AZ</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useDisplay} from "vuetify";
import evelyn from '../assets/img/evelyn.jpg'

const {mobile} = useDisplay();
const drawer = ref(false);
const loggedIn = ref(false);


</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: $color-dark-primary;
}
.round-btn {
    padding: 20px;
    border-radius: 100%;
}
.nav-link {
    padding: 4px 0;
    width: 100% !important;
}
</style>