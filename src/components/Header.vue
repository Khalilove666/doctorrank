<template>
    <div class="wrapper">
        <v-row>
            <v-col v-if="mobile" cols="3">
                <div class="d-flex align-center">
                    <v-icon @click="drawer=!drawer" class="round-btn color-text" v-ripple>mdi-menu</v-icon>
                </div>
            </v-col>
            <v-col v-else cols="4">
                <div class="d-flex align-center">
                    <a class="color-text">Ana Səhifə</a>
                    <a class="color-text">Həkimlər</a>
                    <a class="color-text">Haqqında</a>
                </div>
            </v-col>
            <v-col :cols="mobile ? 6 : 4">
                <div class="d-flex justify-center align-center">
                    <h2 class="color-text">Doctor Rank</h2>
                </div>
            </v-col>
            <v-col v-if="!mobile" cols="4">
                 <div class="d-flex justify-end align-center">
                    <a class="color-text">AZ</a>
                    <v-avatar v-if="loggedIn" v-ripple @click="">
                        <v-img
                            :src="evelyn"
                            alt="Evelyn"
                        ></v-img>
                    </v-avatar>
                    <template v-else>
                        <a class="color-text">Daxil ol</a>
                        <a class="color-text">Qeydiyyat</a>
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
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon icon="mdi-login"></v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Daxil ol</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon icon="mdi-account-plus-outline"></v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Qeydiyyat</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon icon="mdi-home"></v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Ana Səhifə</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon icon="mdi-doctor"></v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Həkimlər</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon icon="mdi-information-variant"></v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Haqqında</v-list-item-title>
                </v-list-item>
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
const loggedIn = ref(true);


</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: darkblue;
    padding: 8px 0;
}
.round-btn {
    padding: 20px;
    border-radius: 100%;
}
</style>