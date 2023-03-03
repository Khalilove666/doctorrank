<template>
    <div>
        <v-app-bar density="compact" color="primary" priority="0">
            <div class="full-width d-flex align-center">
                <v-row>
                    <v-col v-if="mobile" cols="3">
                        <div class="d-flex align-center full-height">
                            <v-icon v-ripple class="round-btn" @click="drawer = !drawer">mdi-menu</v-icon>
                        </div>
                    </v-col>
                    <v-col v-else cols="4">
                        <div class="d-flex align-center full-height">
                            <router-link to="/doctors" class="text-white-text text-decoration-none mr-4">
                                {{ $t("doctors") }}
                            </router-link>
                            <router-link to="/about" class="text-white-text text-decoration-none">{{ $t("about") }} </router-link>
                        </div>
                    </v-col>
                    <v-col :cols="mobile ? 6 : 4">
                        <div class="d-flex justify-center align-center full-height">
                            <router-link to="/" class="text-white-text text-decoration-none"><h2>Doctor Rank</h2> </router-link>
                        </div>
                    </v-col>
                    <v-col v-if="!mobile" cols="4">
                        <div class="d-flex justify-end align-center full-height">
                            <ThemeChanger />
                            <Language :white-text="true" />
                            <router-link
                                v-if="userStore.loggedIn"
                                v-ripple
                                to="/profile"
                                class="cursor-pointer round-btn text-decoration-none"
                            >
                                <UserItem
                                    class="text-white"
                                    :full-name="fullName"
                                    :username="userStore.user.username"
                                    :img="image.userThumbnail.value"
                                />
                            </router-link>
                            <template v-else>
                                <router-link to="/login" class="text-white-text text-decoration-none ml-4">
                                    {{ $t("login") }}
                                </router-link>
                                <router-link to="/register" class="text-white-text text-decoration-none ml-4">
                                    {{ $t("register") }}
                                </router-link>
                            </template>
                        </div>
                    </v-col>
                    <v-col v-else>
                        <div class="d-flex justify-end align-center full-height">
                            <ThemeChanger />
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-app-bar>
        <v-navigation-drawer v-if="mobile" v-model="drawer" temporary priority="-1">
            <v-list v-if="userStore.loggedIn">
                <router-link to="/profile" class="text-decoration-none text-text">
                    <UserItem :full-name="fullName" :username="userStore.user.username" :img="image.userThumbnail.value" />
                </router-link>
            </v-list>
            <v-list v-else density="compact">
                <router-link to="/login" class="text-decoration-none text-text">
                    <v-list-item v-ripple>
                        <template #prepend>
                            <v-icon icon="mdi-login"></v-icon>
                        </template>
                        <v-list-item-title>{{ $t("login") }}</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/register" class="text-decoration-none text-text">
                    <v-list-item v-ripple>
                        <template #prepend>
                            <v-icon icon="mdi-account-plus-outline"></v-icon>
                        </template>
                        <v-list-item-title>{{ $t("register") }}</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact">
                <router-link to="/doctors" class="text-decoration-none text-text">
                    <v-list-item v-ripple active-class="text-accent">
                        <template #prepend>
                            <v-icon icon="mdi-doctor"></v-icon>
                        </template>
                        <v-list-item-title>{{ $t("doctors") }}</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/about" class="text-decoration-none text-text">
                    <v-list-item v-ripple>
                        <template #prepend>
                            <v-icon icon="mdi-information-variant"></v-icon>
                        </template>
                        <v-list-item-title>{{ $t("about") }}</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact">
                <v-list-item>
                    <Language :full-width="true" />
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import ThemeChanger from "./ThemeChanger.vue";
import Language from "./Language.vue";
import { useUser } from "../store/user";
import { useImage } from "../composables/image";
import UserItem from "./UserItem.vue";

const { mobile } = useDisplay();
const image = useImage();
const userStore = useUser();
const drawer = ref(false);

const fullName = computed(() => userStore.user.first_name + " " + userStore.user.last_name);
</script>

<style scoped lang="scss">
.nav-link {
    padding: 4px 0;
    width: 100% !important;
}
</style>
