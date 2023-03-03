/* eslint-disable no-unused-vars */
import performRequest, { requestWithCredentials } from "./client";
import {
    CommentReqDTO,
    DoctorEducationUpdateDTO,
    DoctorExperienceUpdateDTO,
    DoctorUpdateDTO,
    LoginDTO,
    RegisterDTO,
    UserUpdateDTO,
} from "../dtos";

// USER
export async function Register(user: RegisterDTO) {
    return await performRequest("/register", "POST", user);
}

export async function ConfirmEmail(token: string) {
    return await performRequest("/activation?activationToken=" + token, "POST");
}

export async function SendPasswordResetEmail(login: string) {
    return await performRequest("/password-reset?login=" + login, "GET");
}

export async function ResetPassword(token: string, new_password: string) {
    return await performRequest("/password-reset?pswResetToken=" + token, "POST", { new_password });
}

export async function ChangePassword(old_password: string, new_password: string) {
    return await performRequest("/password", "PUT", { old_password, new_password });
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

export async function UpdateUser(update: UserUpdateDTO) {
    return await performRequest("/update", "PUT", update);
}

// DOCTORS
export async function UpdateDoctor(update: DoctorUpdateDTO) {
    return await performRequest("/doctors/update", "PUT", update);
}

export async function UploadDoctorAvatar(data: FormData, handleUploadProgress: (e: any) => void) {
    return await performRequest("/doctors/avatar", "PUT", data, handleUploadProgress);
}

export async function UpdateDoctorExperience(update: DoctorExperienceUpdateDTO) {
    return await performRequest("/doctors/update/experience", "PUT", update);
}

export async function UpdateDoctorEducation(update: DoctorEducationUpdateDTO) {
    return await performRequest("/doctors/update/education", "PUT", update);
}

export async function FetchAllDoctors(term: string, profession_id: string, skip: number, limit: number) {
    return await performRequest(`/doctors?term=${term}&profession_id=${profession_id}&skip=${skip}&limit=${limit}`, "GET");
}

export async function FetchDoctorById(doctor_id: string) {
    return await performRequest("/doctors/" + doctor_id, "GET");
}

export async function FetchDoctorByAuth() {
    return await performRequest("/doctors/self", "GET");
}

// COMMENTS
export async function FetchAllComments(doctorId: string, skip: number, limit: number) {
    return await performRequest(`/comments?doctorId=${doctorId}&skip=${skip}&limit=${limit}`, "GET");
}

export async function UploadComment(doctorId: string, comment: CommentReqDTO) {
    return await performRequest(`/comments?doctorId=${doctorId}`, "PUT", comment);
}

export async function LikeOrDislikeComment(commentId: string, like_status: number) {
    return await performRequest(`/comments/${commentId}/like`, "PUT", { like_status });
}

// PROFESSIONS
export async function FetchAllProfessions() {
    return await performRequest("/professions", "GET");
}

export async function CreateProfession(name: string) {
    return await performRequest("/professions", "POST", { name });
}

// HOSPITALS
export async function FetchAllHospitals() {
    return await performRequest("/hospitals", "GET");
}

export async function CreateHospital(name: string) {
    return await performRequest("/hospitals", "POST", { name });
}

export async function UploadHospitalAvatar(hospitalId: string, data: FormData, handleUploadProgress: (e: any) => void) {
    return await performRequest("/hospitals/" + hospitalId + "/avatar", "PUT", data, handleUploadProgress);
}
