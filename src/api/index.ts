import {User} from "../store/user/types";
import {useUser} from "../store/user";

const BASE_URL = "http://localhost:8000"


export async function performRequest(url: string, body: any, method: string = "GET", tries: number = 0): Promise<any> {
    const user = useUser();
    try {
        const res = await fetch(BASE_URL + url, {
            method,
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + user.token},
            body: body ? JSON.stringify(body) : null,
        });
        const result = await res.json();
        if (res.ok) {
            return {
                ok: true,
                status: result.status,
                data: result.data
            }
        } else {
            if (res.status == 401 && tries < 3) {
                const res = await Refresh();
                if (res.ok) user.setToken(res.data)
                return performRequest(url, body, method, tries + 1);
            } else if (tries == 3) {
                await user.logOut("logout_session_end")
            } else return {
                ok: false,
                error: result.data
            }
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}

async function requestWithoutToken(url: string, body: any, method: string = "GET", credentials: boolean = false) {
    try {
        const res = await fetch(BASE_URL + url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: body ? JSON.stringify(body) : null,
            credentials: credentials ? "include" : "omit"
        });
        const result = await res.json();
        if (res.ok) {
            return {
                ok: true,
                status: result.status,
                data: result.data
            }
        } else return {
            ok: false,
            error: result.data
        }
    } catch (e) {
        return {
            ok: false,
            error: e,
        }
    }
}

export async function Register(user: Record<string, any>) {
    return await requestWithoutToken("/register", user, "POST");
}

export async function Login(login: string, password: string, remember_me: boolean) {
    return await requestWithoutToken("/login", {login, password, remember_me}, "POST", true);
}

export async function LogOut() {
    return await requestWithoutToken("/logout", null, "POST", true);
}

export async function Refresh() {
    return await requestWithoutToken("/refresh", null, "GET", true);
}
