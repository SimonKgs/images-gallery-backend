export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}