import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {User} from "../dtos";

export const useUser = defineStore("user", () => {
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

    // GETTERS
    const user = computed(() => userState.value);
    const loggedIn = computed(() => !!userState.value._id);
    const token = computed(() => tokenState.value);
    const role = computed(() => userState.value.role);

    // ACTIONS
    function setUser(user: any, rememberMe: boolean) {
        tokenState.value = user.token;
        delete user.token;
        userState.value = user;
        setLocalState(user, rememberMe);
    }

    function setUserImg(imgName: string) {
        userState.value.img = "";
        userState.value.img = imgName;
        localStorage.setItem('user', JSON.stringify(userState.value));
    }

    function setToken(token: string) {
        tokenState.value = token;
    }

    function deleteUser(message: string) {
        userState.value = defaultUser;
        setToken("");
        deleteLocalState();
    }

    function changeRole(role: string) {
        userState.value.role = "doctor";
    }

    return {
        user,
        loggedIn,
        token,
        role,
        setUser,
        setUserImg,
        setToken,
        deleteUser,
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