import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Answer, Question, Quiz } from 'src/types/types';
import { connect } from 'http2';

@Injectable()
export class QuizService {
    constructor(private prisma: PrismaService) {}

    async getQuizzes(limit?: number) {
        return this.prisma.quiz.findMany({
            take: limit,
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

    async getQuestion(id: number) {
        return this.prisma.question.findFirst({
            where: { id }
        })
    }

    async createQuiz(title: string, subjectId: number) {
        return this.prisma.quiz.create({
            data: {
                title,
                subjectId
            },
        })
    }

    async updateQuiz(id: number, title: string, subjectId: number) {
        return this.prisma.quiz.update({
            where: {
                id
            },
            data: {
                title,
                subjectId
            }
        })
    }

    async createQuestion(text: string, quizId: number, answers?: Answer[]) {
        return answers ? this.prisma.question.create({
            data: {
                text,
                quizId,
                answers: {
                    createMany: {
                        data: answers
                    }
                }
            }
        }) : this.prisma.question.create({data: {
            text,
            quizId
        }})
    }

    async updateQuestion(id: number, text: string, answers: Answer[]) {
        return this.prisma.question.update({
            where: {
                id
            },
            data: {
                text,
                answers: {
                    updateMany: {
                        where: {
                            questionId: id
                        },
                        data: answers
                    }
                }
            }
        })
    }

    async createManyQuestions(questions: Question[]) {
        return this.prisma.question.createMany({
            data: questions
        })
    }

    async deleteManyQuestions(quizId: number) {
        return this.prisma.question.deleteMany({
            where: {
                quizId
            }
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

    async createOrConnectManyAnswers(answers: Answer[]) {
        return this.prisma.answer.updateMany
    }

    async deleteQuiz(id: number) {
        return this.prisma.quiz.delete({
            where: {
                id
            }
        })
    }
}
