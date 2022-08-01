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
    fileName: string;
}

export interface Person {
    id?: number;
    firstName: string;
    lastName: string;
    bio: string;
    image: string;
}

export interface Quiz {
    id?: number;
    title: string;
    questions: Question[]
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