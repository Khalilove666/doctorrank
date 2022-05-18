export interface Comment {
    _id: string,
    doctor_id: string,
    user: {
        _id: string,
        username: string,
        first_name: string,
        last_name: string,
        img: string,
    }
    text: string,
    rate: number,
    likes: Array<{
        user_id: string,
        status: boolean,
    }>,
    created_at: number,
    updated_at: number,
}

export interface CommentForUpload {
    text?: string,
    rate?: number,
}