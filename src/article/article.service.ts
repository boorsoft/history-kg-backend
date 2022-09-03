import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Article } from 'src/types/types';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma: PrismaService) {}

    async getArticles(limit?: number) {
        return this.prisma.article.findMany(limit && { take: limit! });
    }

    async getArticle(id: number) {
        return this.prisma.article.findUnique({
            where: {
                id,
            },
        });
    }

    async createArticle({ title, text, subjectId }: Article) {
        return this.prisma.article.create({
            data: {
                title,
                text,
                subjectId,
            },
        });
    }

    async updateArticle(id: number, { title, text, subjectId }: Article) {
        return this.prisma.article.update({
            where: {
                id,
            },
            data: {
                title,
                text,
                subjectId,
            },
        });
    }

    async deleteArticle(id: number) {
        return this.prisma.article.delete({
            where: {
                id,
            },
        });
    }
}
