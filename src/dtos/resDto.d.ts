export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    role: string;
    img: string;
    contact: {
        email: string;
        phone: string;
        facebook: string;
    };
    token?: string;
    created_at: number;
    updated_at: number;
}

export interface CompactDoctor {
    _id: string;
    user_id: string;
    title: string;
    first_name: string;
    last_name: string;
    img: string;
    profession: {
        id: string;
        name: string;
    } | null;
    hospital: {
        id: string;
        name: string;
        img: string;
    };
}

export interface Doctor {
    _id: string;
    user_id: string;
    title: string;
    first_name: string;
    last_name: string;
    full_name: string;
    rate: number;
    reviews: number;
    img: string;
    about: string;
    profession: Profession;
    hospital: Hospital;
    experience: Array<Experience>;
    education: Array<Education>;
    contact: {
        phone: string;
        email: string;
        facebook: string;
    };
    created_at: number;
    updated_at: number;
}

export interface Experience {
    _id: string;
    profession: string;
    hospital: string;
    field: string;
    term_start: number;
    term_end: number;
    country: string;
}

export interface Education {
    _id: string;
    degree: string;
    major: string;
    institution: string;
    term_start: number;
    term_end: number;
    country: string;
}

export interface Hospital {
    _id: string;
    name: string;
    img: string;
}

export interface Profession {
    _id: string;
    name: string;
}

export interface Comment {
    _id: string;
    doctor_id: string;
    user: {
        _id: string;
        username: string;
        first_name: string;
        last_name: string;
        img: string;
    };
    text: string;
    rate: number;
    likes: Array<{
        user_id: string;
        status: boolean;
    }>;
    created_at: number;
    updated_at: number;
}
