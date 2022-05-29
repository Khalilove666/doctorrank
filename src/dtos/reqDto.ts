import {Education, Experience} from "./resDto";

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

export interface DoctorDTO {
    title: string,
    first_name: string,
    last_name: string,
    about: string,
    profession_id: string,
    hospital_id: string,
    contact: {
        email: string,
        phone: string,
        facebook: string,
    },
    experience: Array<Experience>,
    education: Array<Education>,
}

export interface CommentReqDTO {
    text?: string,
    rate?: number,
}