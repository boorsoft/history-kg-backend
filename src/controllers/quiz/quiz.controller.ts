import { BadRequestException, Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
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
      return this.quizService.createQuiz(title).then(
        (quiz) => {
          for (let q of questions) {
            this.quizService.createQuestion(q.text, quiz.id, q.answers);
          }
        }
      ).catch((error) => new BadRequestException(error.message))
    }

    @Put()
    async updateQuiz(@Body() { title, questions }: IQuiz, @Param('id') id: string) {
      return this.quizService.updateQuiz(+id, title).then((quiz) => {
        for (let q of questions) {
          this.quizService.updateQuestion(q.id, q.text, quiz.id, q.answers);
        }
      }).catch((error) => new BadRequestException(error.message))
    }

    @Delete()
    deleteQuiz(@Param('id') id) {
      return this.deleteQuiz(+id);
    }
}
