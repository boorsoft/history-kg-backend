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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Article } from 'src/types/types';
import { ArticleService } from './article.service';

@Controller('api/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    @Get()
    getArticles(@Query() query) {
        return this.articleService.getArticles(+query.limit);
    }

    @Get(':id')
    getArticle(@Param('id') id: string) {
        return this.articleService.getArticle(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createArticle(@Body() { title, text, subjectId }: Article) {
        return this.articleService
            .createArticle({ title, text, subjectId })
            .catch((error) => new BadRequestException(error.message));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateArticle(
        @Param('id') id: string,
        @Body() { title, text, subjectId }: Article,
    ) {
        return this.articleService.updateArticle(+id, {
            title,
            text,
            subjectId,
        }).catch((error) => new BadRequestException(error.message))
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        return this.articleService
            .deleteArticle(+id)
            .catch((error) => new BadRequestException(error.message));
    }
}
