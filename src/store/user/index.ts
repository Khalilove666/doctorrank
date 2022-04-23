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
    let userState = reactive(getStoredState("user", defaultUser));
    const tokenState = ref("");

    // WATCHERS
    watch(userState, (value) => {
        setStoredState("user", value);
    }, {deep: true})

    // GETTERS
    const user = computed(() => userState);
    const loggedIn = computed(() => !!userState._id);
    const token = computed(() => tokenState);
    const role = computed(() => userState.role);

    // ACTIONS
    function setUser(user: User) {
        userState = reactive(user);
    }

    function setToken(token: string) {
        tokenState.value = token;
    }

    async function logOut(message: string) {
        await router.replace("/login")
        userState = reactive(defaultUser);
        tokenState.value = "";
        localStorage.removeItem("user")
        // await logOut();
    }

    async function changeRole() {
        const res = await performRequest("/role", null, "PUT");
        if (res.ok) {
            userState.role = "doctor";
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