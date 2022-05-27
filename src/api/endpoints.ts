import performRequest, {requestWithCredentials} from "./client";
import {CommentReqDTO, LoginDTO, RegisterDTO} from "../dtos";


// USER
export async function Register(user: RegisterDTO) {
    return await performRequest("/register", "POST", user);
}

export async function Login(user: LoginDTO) {
    return await requestWithCredentials("/login", "POST", user);
}

export async function LogOut() {
    return await requestWithCredentials("/logout", "POST");
}

export async function Refresh() {
    return await requestWithCredentials("/refresh", "GET");
}

export async function ChangeRole() {
    return await performRequest("/role", "PUT");
}

export async function UploadUserAvatar(data: FormData, handleUploadProgress: (e: any) => void) {
    return await performRequest("/avatar", "PUT", data, handleUploadProgress);
}

// DOCTORS
export async function FetchAllDoctors(term: string, skip: number, limit: number) {
    return await performRequest(`/doctors?term=${term}&skip=${skip}&limit=${limit}`, "GET");
}

export async function FetchDoctorById(doctor_id: string) {
    return await performRequest("/doctors/" + doctor_id, "GET");
}

// COMMENTS
export async function FetchAllComments(doctorId: string, skip: number, limit: number) {
    return await performRequest(`/comments?doctorId=${doctorId}&skip=${skip}&limit=${limit}`, "GET");
}

export async function UploadComment(doctorId: string, comment: CommentReqDTO) {
    return await performRequest(`/comments?doctorId=${doctorId}`, "PUT", comment);
}

export async function LikeOrDislikeComment(commentId: string, like_status: number) {
    return await performRequest(`/comments/${commentId}/like`, "PUT", {like_status});
}

// PROFESSIONS
export async function FetchAllProfessions() {
    return await performRequest("/professions", "GET");
}
