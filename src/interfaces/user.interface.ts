export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
}