import {computed} from "vue";
import {useUser} from "../store/user";
import avatarPlaceHolder from '../assets/img/avatar.png'

const BASE_URL = import.meta.env.VITE_BASE_URL

export function getFullImgUrl(relativePath: string) {
    return BASE_URL + relativePath;
}

export function useImage() {
    const userStore = useUser();
    const userAvatar = computed(() => userStore.user.img ? getFullImgUrl("/user/avatar/" + userStore.user.img) : avatarPlaceHolder)
    const userThumbnail = computed(() => userStore.user.img ? getFullImgUrl("/user/thumbnail/" + userStore.user.img) : avatarPlaceHolder)


    function doctorAvatar(imgName: string) {
        return imgName ? getFullImgUrl("/doctor/thumbnail/" + imgName) : avatarPlaceHolder
    }

    return {
        userAvatar,
        userThumbnail,
        doctorAvatar,
    }
}