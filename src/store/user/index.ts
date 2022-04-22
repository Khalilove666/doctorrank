import {defineStore} from "pinia";
import {User} from "./types";


export const useUser = defineStore("user", {
    // STATE
    state: () => {
        return {
            user: {
                _id: "",
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                role: "",
                token: "",
                created_at: 0,
                updated_at: 0,
            },
        }
    },
    getters: {
        getUser: (state) => state.user,
        loggedIn: (state) => !!state.user._id,
        token: (state) => state.user.token
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
    }


    // let userState: User = reactive({
    //     _id: "",
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     username: "",
    //     role: "",
    //     token: "",
    //     created_at: 0,
    //     updated_at: 0,
    // });
    //
    // // GETTERS
    // const user = computed(() => userState);
    // const loggedIn = computed(() => userState._id != "");
    // const token = computed(() => userState?.token);
    //
    // // ACTIONS
    // function setUser(user: User) {
    //     userState = user;
    // }
    //
    // return {user, loggedIn, token, setUser};
})