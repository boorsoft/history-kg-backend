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
        private readonly personService: PersonService,
    ) {}

    @Get()
    async search(@Query() { searchValue }) {
        if (!searchValue)
            return new BadRequestException('No search value given.');

        const [books, persons, quiz, articles] = await Promise.all([
            this.bookService.getBooksBySearch(searchValue),
            this.personService.getPersonBySearch(searchValue),
            this.quizService.getQuizBySearch(searchValue),
            this.articleService.getArticlesBySearch(searchValue),
        ]);

        if (
            books.length === 0 &&
            persons.length === 0 &&
            quiz.length === 0 &&
            articles.length === 0
        )
            return [];

        return [
            { type: 'books', data: books },
            { type: 'persons', data: persons },
            { type: 'quiz', data: quiz },
            { type: 'articles', data: articles },
        ];
    }
}
