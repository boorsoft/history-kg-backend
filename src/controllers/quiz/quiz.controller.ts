import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { QuizService } from 'src/services/quiz/quiz.service';
import { Quiz as IQuiz} from 'src/types/types';

@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get()
    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    getQuizzes(): Promise<Quiz[]> {
      return this.quizService.getQuizzes()
    }

    @Get(':id')
    getQuiz(@Param('id') id: string): Promise<Quiz> {
      return this.quizService.getQuiz(+id);
    }

    @Post()
    async createQuiz(@Body() { title, questions }: IQuiz) {
      const quiz = await this.quizService.createQuiz(title);
      
      for (let q of questions) {
        await this.quizService.createQuestion(q.text, quiz.id, q.answers);
      }

    }
}
