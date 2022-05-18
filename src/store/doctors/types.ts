import {Profession} from "../professions";
import {Hospital} from "../hospitals/types";

export interface CompactDoctor {
    _id: string,
    user_id: string,
    title: string,
    first_name: string,
    last_name: string,
    img: string,
    profession: {
        id: string,
        name: string,
    },
    hospital: {
        id: string,
        name: string,
        img: string,
    },
}

export interface Doctor {
    _id: string,
    user_id: string,
    title: string,
    first_name: string,
    last_name: string,
    full_name: string,
    rate: number,
    reviews: number,
    img: string,
    about: string,
    profession: Profession,
    hospital: Hospital,
    experience: Array<Experience>,
    education: Array<Education>,
    contact: {
        phone: string,
        email: string,
        facebook: string,
    },
    created_at: number,
    updated_at: number,

}

export interface Experience {
    profession: string,
    hospital: string,
    field: string,
    term_start: number,
    term_end: number,
    country: string,
}

export interface Education {
    degree: string,
    major: string,
    institution: string,
    term_start: number,
    term_end: number,
    country: string,
}