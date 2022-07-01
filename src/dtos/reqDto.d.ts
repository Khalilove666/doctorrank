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

export interface UserUpdateDTO {
    field_name: string,
    value: string
}

export interface DoctorUpdateDTO {
    field_name: string,
    value: string
}

export interface DoctorExperienceUpdateDTO {
    action: string,
    _id: string | null,
    value?: {
        profession: string,
        field: string,
        hospital: string,
        country: string,
        term_start: number,
        term_end: number,
    }
}

export interface DoctorEducationUpdateDTO {
    action: string,
    _id: string | null,
    value?: {
        degree: string,
        major: string,
        institution: string,
        country: string,
        term_start: number,
        term_end: number,
    }
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