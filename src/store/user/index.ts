import {defineStore} from "pinia";
import {User, UserForRegister} from "./types";
import {Login, LogOut, performRequest, Register} from "../../api";
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
        img: "",
        created_at: 0,
        updated_at: 0,
    }
    // STATE
    let userState = ref<User>(getStoredState("user", defaultUser));
    const tokenState = ref("");
    const successState = ref(false);
    const errorState = reactive({
        exist: false,
        text: "",
    });

    // GETTERS
    const user = computed(() => userState.value);
    const loggedIn = computed(() => !!userState.value._id);
    const token = computed(() => tokenState.value);
    const role = computed(() => userState.value.role);
    const success = computed(() => successState.value);
    const error = computed(() => errorState);

    // ACTIONS
    function setUser(user: any, rememberMe: boolean) {
        tokenState.value = user.token;
        delete user.token;
        userState.value = user;
        if (rememberMe) setStoredState("user", user);
    }

    function setToken(token: string) {
        tokenState.value = token;
    }

    function setSuccess(value: boolean) {
        successState.value = value;
    }

    function setError(exist: boolean, text: string) {
        errorState.exist = exist;
        errorState.text = text;
    }

    async function register(user: UserForRegister) {
        setSuccess(false);
        setError(false, "");
        const res = await Register(user);
        if (res.ok) {
            setSuccess(true);
            await router.replace("/login");
        } else {
            setError(true, res.error);
        }
    }

    async function logIn(username: string, password: string, rememberMe: boolean) {
        setSuccess(false);
        setError(false, "");
        const res = await Login(username, password, rememberMe);
        if (res.ok) {
            setUser(res.data, rememberMe)
            setSuccess(true);
            await router.replace("/");
        } else {
            setError(true, res.error);
        }
    }

    async function logOut(message: string) {
        await router.replace("/login")
        setUser(defaultUser, false);
        setToken("");
        setSuccess(false);
        setError(false, "");
        localStorage.removeItem("user")
        await LogOut();
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
        success,
        error,
        setUser,
        setSuccess,
        setToken,
        setError,
        register,
        logIn,
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