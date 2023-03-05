import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import { useUser } from "../store/user";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/pages/About.vue"),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/pages/Login.vue"),
        meta: {
            requireAuth: false,
            requireNotAuth: true,
        },
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/pages/Register.vue"),
        meta: {
            requireAuth: false,
            requireNotAuth: true,
        },
    },
    {
        path: "/activation",
        name: "activation",
        component: () => import("@/pages/ProfileActivation.vue"),
        meta: {
            requireAuth: false,
            requireNotAuth: true,
        },
    },
    {
        path: "/forgot-password",
        name: "forgotPassword",
        component: () => import("@/pages/ForgotPassword.vue"),
        meta: {
            requireAuth: false,
            requireNotAuth: true,
        },
    },
    {
        path: "/reset-password",
        name: "resetPassword",
        component: () => import("@/pages/ResetPassword.vue"),
        meta: {
            requireAuth: false,
            requireNotAuth: true,
        },
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/pages/Profile.vue"),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/doctors",
        name: "doctors",
        component: () => import("@/pages/Doctors.vue"),
    },
    {
        path: "/doctors/:doctorId",
        name: "doctor",
        component: () => import("@/pages/DoctorPage.vue"),
        meta: {
            requireAuth: false,
        },
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const user = useUser();
    if (to.meta.requireNotAuth && user.loggedIn) {
        return { name: "home" };
    } else if (to.meta.requireAuth && !user.loggedIn) {
        return { name: "login" };
    }
});
