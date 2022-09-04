import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { BookService } from 'src/book/book.service';
import { PersonService } from 'src/person/person.service';
import { QuizService } from 'src/quiz/quiz.service';

@Controller('api/search')
export class SearchController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly bookService: BookService,
    private readonly quizService: QuizService,
    private readonly personService: PersonService
  ) {}
  
  @Get()
  async search(@Query() { searchValue }) {
    if (!searchValue) return new BadRequestException('No search value given.')
    
    const [books, persons, quizzes, articles] = await Promise.all([
      this.bookService.getBooksBySearch(searchValue),
      this.personService.getPersonBySearch(searchValue),
      this.quizService.getQuizBySearch(searchValue),
      this.articleService.getArticlesBySearch(searchValue)
    ]);

    return [
      {type: 'books', data: books},
      {type: 'persons', data: persons},
      {type: 'quizzes', data: quizzes},
      {type: 'articles', data: articles}
    ]
  }
}
