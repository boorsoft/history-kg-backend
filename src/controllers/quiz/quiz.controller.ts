import { Controller, Get, Param } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { QuizService } from 'src/services/quiz/quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get()
    getQuizzes(): Promise<Quiz[]> {
      return this.quizService.getQuizzes()
    }

    @Get(':id')
    getQuiz(@Param('id') id: string): Promise<Quiz> {
      return this.quizService.getQuiz(+id);
    }
}
