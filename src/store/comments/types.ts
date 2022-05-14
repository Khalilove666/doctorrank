export interface Comment {
    _id: string,
    doctor_id: string,
    user_id: string,
    text: string,
    rate: number,
    likes: Array<{
        user_id: string,
        status: boolean,
    }>,
    created_at: number,
    updated_at: number,
}