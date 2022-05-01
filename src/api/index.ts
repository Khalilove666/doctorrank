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
                await refresh();
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

export async function register(user: Record<string, any>) {
    try {
        const res = await fetch(BASE_URL + "/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
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

export async function login(login: string, password: string) {
    try {
        const res = await fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({login, password}),
            credentials: "include",
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

export async function refresh() {
    try {
        const res = await fetch(BASE_URL + "/refresh", {
            method: "GET",
            credentials: "include",
        });
        const result = await res.json();
        if (res.ok) {
            const user = useUser();
            user.setToken(result.data);
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

export async function logOut() {
    try {
        const res = await fetch(BASE_URL + "/logout", {
            method: "POST",
            credentials: "include",
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