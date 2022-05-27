import axios from "axios";
import {useUser} from "../store/user";
import {Refresh} from "./endpoints";

const BASE_URL = import.meta.env.VITE_BASE_URL


export default async function performRequest(
    url: string,
    method: string = "GET",
    data: any = null,
    handleUploadProgress = function (e: any) {
    },
    tries = 0
): Promise<any> {
    const userStore = useUser();
    const options = {
        url: BASE_URL + url,
        method,
        data,
        headers: {"Authorization": "Bearer " + userStore.token},
        onUploadProgress: handleUploadProgress,
    };
    try {
        const res = await axios(options);
        return {
            ok: true,
            status: res.status,
            data: res.data.data,
        }
    } catch (e: any) {
        if (e.response.status === 401 && tries < 1) {
            const res = await Refresh();
            if (res.ok) userStore.setToken(res.data)
            return performRequest(url, method, data, handleUploadProgress, tries + 1);
        } else if (tries == 1) await userStore.deleteUser("logout_authorization_problem");
        return {
            ok: false,
            status: e.response.status,
            error: e.response.data ? e.response.data.data : e.message,
        }
    }
}

export async function requestWithCredentials(url: string, method: string = "GET", data: any = null): Promise<any> {
    const options = {
        url: BASE_URL + url,
        method,
        data,
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
    };
    try {
        const res = await axios(options);
        return {
            ok: true,
            status: res.status,
            data: res.data.data
        }
    } catch (e: any) {
        return {
            ok: false,
            status: e.response.status,
            error: e.response.data ? e.response.data.data : e.message,
        }
    }
}