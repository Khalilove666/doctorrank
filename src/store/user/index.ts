import {defineStore} from "pinia";
import {User} from "./types";
import {logOut, performRequest} from "../../api";
import {useRouter} from "vue-router";
import {computed, reactive, ref, watch} from "vue";


export const useUser = defineStore("user", () => {
    const router = useRouter();

    const defaultUser: User = {
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        role: "",
        created_at: 0,
        updated_at: 0,
    }
    // STATE
    let userState = ref(getStoredState("user", defaultUser));
    const tokenState = ref("");

    // WATCHERS
    watch(userState, (value) => {
        setStoredState("user", value);
    }, {deep: true})

    // GETTERS
    const user = computed(() => userState.value);
    const loggedIn = computed(() => !!userState.value._id);
    const token = computed(() => tokenState.value);
    const role = computed(() => userState.value.role);

    // ACTIONS
    function setUser(user: any) {
        tokenState.value = user.token;
        delete user.token;
        userState.value = user;
    }

    function setToken(token: string) {
        tokenState.value = token;
    }

    async function logOut(message: string) {
        await router.replace("/login")
        userState.value = defaultUser;
        tokenState.value = "";
        localStorage.removeItem("user")
        // await logOut();
    }

    async function changeRole() {
        const res = await performRequest("/role", null, "PUT");
        if (res.ok) {
            userState.value.role = "doctor";
        }
    }

    return {
        user,
        loggedIn,
        token,
        role,
        setUser,
        setToken,
        logOut,
        changeRole,
    }
})

function getStoredState(key: string, defaultValue: any): any {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    else return defaultValue;
}

function setStoredState(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}