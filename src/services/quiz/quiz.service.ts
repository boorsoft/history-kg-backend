import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizService {
    constructor(private prisma: PrismaService) {}

    async getQuizzes() {
        return this.prisma.quiz.findMany();
    }

    async getQuiz(id: number) {
        return this.prisma.quiz.findUnique({
            where: { id },
        })
    }

    async getQuestions(quizId: number) {
        return this.prisma.question.findMany({
            where: { quizId },
        });
    }

    async getQuestionAnswers(questionId: number) {
        return this.prisma.questionAnswer.findUnique({
            where: { questionId },
        });
    }
}
