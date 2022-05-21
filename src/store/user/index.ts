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
    let userState = ref<User>(getStoredState(defaultUser));
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
        setLocalState(user, rememberMe);
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
        const res = await LogOut();
        if (res.ok) {
            await router.replace("/login")
            userState.value = defaultUser;
            setToken("");
            setSuccess(false);
            setError(false, "");
            deleteLocalState();
        }
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

function getStoredState(defaultValue: any): any {
    const exist = document.cookie.split(';').some(c => {
        return c.trim().startsWith('user=');
    });
    const localState = localStorage.getItem('user');
    if (exist && localState) return JSON.parse(localState);
    else {
        localStorage.removeItem('user');
        return defaultValue;
    }
}

function setLocalState(value: any, rememberMe: boolean) {
    const maxAgeMinutes = 10080
    document.cookie = "user=loggedIn; SameSite=Lax; path=/" + ((rememberMe) ? "; max-age=" + 60 * maxAgeMinutes : "");
    localStorage.setItem('user', JSON.stringify(value));
}

function deleteLocalState() {
    document.cookie = "user=; SameSite=Lax; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    localStorage.removeItem("user");
}