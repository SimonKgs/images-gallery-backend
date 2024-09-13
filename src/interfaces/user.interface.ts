
export interface User {
    _id?: string;
    username: string;
    email: string;
    passwordHash: string;
    profileImage?: string;
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}