import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { QuizService } from './quiz.service';
import { Quiz as IQuiz } from 'src/types/types';

@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get()
    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    getQuizzes(@Query() query): Promise<Quiz[]> {
        return this.quizService.getQuizzes(+query.limit);
    }

    @Get(':id')
    getQuiz(@Param('id') id: string): Promise<Quiz> {
        return this.quizService.getQuiz(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createQuiz(@Body() { title, questions, subjectId }: IQuiz) {
        return this.quizService
            .createQuiz(title, subjectId)
            .then((quiz) => {
                for (const q of questions) {
                    this.quizService.createQuestion(q.text, quiz.id, q.answers);
                }
            })
            .catch((error) => new BadRequestException(error.message));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateQuiz(
        @Body() { title, questions, subjectId }: IQuiz,
        @Param('id') id: string,
    ) {
        return this.quizService
            .updateQuiz(+id, title, subjectId)
            .then((quiz) => {
                this.quizService.deleteManyQuestions(quiz.id).then(() => {
                    for (const q of questions) {
                        this.quizService
                            .createQuestion(q.text, quiz.id)
                            .then((newQuestion) => {
                                for (const answer of q.answers) {
                                    this.quizService.createAnswer(
                                        answer.text,
                                        newQuestion.id,
                                        answer.isCorrectAnswer,
                                    );
                                }
                            });
                    }
                });
            })
            .catch((error) => new BadRequestException(error.message));
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteQuiz(@Param('id') id: string) {
        return this.quizService
            .deleteQuiz(+id)
            .catch((error) => new BadRequestException(error));
    }
}
