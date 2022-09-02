export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    username: string;
    email?: string;
    password: string;
    isAdmin: boolean;
}

export interface Book {
    id?: number;
    title: string;
    author: string;
    city?: string;
    year?: number;
    fileName: string;
    subjectId: number;
}

export interface Person {
    id?: number;
    firstName: string;
    lastName: string;
    bio: string;
    image: string;
    subjectId: number;
}

export interface Quiz {
    id?: number;
    title: string;
    questions: Question[]
    subjectId: number;
}
export interface Question {
    id?: number;
    text: string;
    quizId: number;
    answers: Answer[]
}

export interface Answer {
    id?: number;
    text: string;
    isCorrectAnswer: boolean;
    questionId: number;
}

export interface Subject {
    id?: number;
    title: string;
}

export interface Article {
    id?: number;
    title: string;
    text: string;
    subjectId: number;
}