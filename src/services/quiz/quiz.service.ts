import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Answer } from 'src/types/types';

@Injectable()
export class QuizService {
    constructor(private prisma: PrismaService) {}

    async getQuizzes() {
        return this.prisma.quiz.findMany({
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }
        });
    }

    async getQuiz(id: number) {
        return this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        answers: true,
                    }
                }
            }
        })
    }

    async getQuestions(quizId: number) {
        return this.prisma.question.findMany({
            where: { quizId },
        });
    }

    async createQuiz(title: string) {
        return this.prisma.quiz.create({
            data: {
                title
            },
        })
    }

    async createQuestion(text: string, quizId: number, answers: Answer[]) {
        return this.prisma.question.create({
            data: {
                text,
                quizId,
                answers: {
                    createMany: {
                        data: answers
                    }
                }
            }
        })
    }

    async createManyQuestions(questions) {
        return this.prisma.question.createMany({
            data: questions
        })
    }

    async createAnswer(text: string, questionId: number, isCorrectAnswer: boolean) {
        return this.prisma.answer.create({
            data: {
                text,
                questionId,
                isCorrectAnswer
            }
        })
    }

    async createManyAnswers(answers: Answer[]) {
        return this.prisma.answer.createMany({
            data: answers
        })
    }
}
