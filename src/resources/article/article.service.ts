import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Article } from 'src/types/types';
import { searchTransformForPrisma } from 'src/utils/utils';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma: PrismaService) {}

    async getArticles(limit?: number) {
        if (limit) {
            return this.prisma.article.findMany({ take: limit });
        } else {
            return this.prisma.article.findMany();
        }
    }

    async getArticle(id: number) {
        return this.prisma.article.findUnique({
            where: {
                id,
            },
        });
    }

    async getArticlesBySearch(searchValue: string) {
        return this.prisma.article.findMany({
            where: {
                title: {
                    search: searchTransformForPrisma(searchValue),
                },
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
