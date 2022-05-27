export interface RegisterDTO {
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
}

export interface LoginDTO {
    login: string
    password: string
    remember_me: boolean
}

export interface CommentReqDTO {
    text?: string,
    rate?: number,
}