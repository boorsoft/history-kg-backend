export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    username: string;
    email?: string;
    password: string;
    isAdmin: boolean;
}

export interface Paragraph {
    id?: number;
    text: string;
    title: string;
    image: string;
}