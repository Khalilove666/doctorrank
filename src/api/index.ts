import {User} from "../store/user/types";

const BASE_URL = "http://localhost:8000"

export async function performRequest(url: string, method: string, tries: number) {
    await fetch(BASE_URL + url, {
        method: "POST",
    })
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