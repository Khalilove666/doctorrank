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
    img: string,
    about: string,
    profession: {
        id: string,
        name: string,
    },
    hospital: {
        id: string,
        name: string,
        img: string,
    },
    experience: {
        profession: string,
        hospital: string,
        field: string,
        term: string,
        country: string,
    },
    education: {
        degree: string,
        major: string,
        institution: string,
        term: string,
        country: string,
    },
    contact: {
        phone: string,
        email: string,
        facebook: string,
    },
    created_at: number,
    updated_at: number,

}