import {createRouter, createWebHistory} from "vue-router";

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Profile from '../pages/Profile.vue';
import Doctors from '../pages/Doctors.vue';
import DoctorPage from '../pages/DoctorPage.vue';
import About from '../pages/About.vue';
import ProfileActivation from "../pages/ProfileActivation.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import {useUser} from "../store/user";

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
        path: "/activation",
        name: "activation",
        component: ProfileActivation
    },
    {
        path: "/forgot-password",
        name: "forgotPassword",
        component: ForgotPassword
    },
    {
        path: "/reset-password",
        name: "resetPassword",
        component: ResetPassword
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
        path: "/doctors/:doctorId",
        name: "doctor",
        component: DoctorPage
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const user = useUser();
    if ((to.name == "login" || to.name == "register" || to.name == "forgotPassword" || to.name == "resetPassword") && user.loggedIn) {
        return {name: "home"}
    } else if (to.name == "profile" && !user.loggedIn) {
        return {name: "login"}
    }
})