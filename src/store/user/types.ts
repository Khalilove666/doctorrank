export type User = {
    _id: string
    first_name: string
    last_name: string
    email: string
    username: string
    role: string
    img: string
    created_at: number
    updated_at: number
}

export interface UserForRegister {
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
}