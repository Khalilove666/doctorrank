import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Profile from '../pages/Profile.vue';
import Doctors from '../pages/Doctors.vue';
import DoctorPage from '../pages/DoctorPage.vue';
import About from '../pages/About.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        component: About
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile
    },
    {
        path: "/doctors",
        name: "doctors",
        component: Doctors
    },
    {
        path: "/doctors/:username",
        name: "doctor",
        component: DoctorPage
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})