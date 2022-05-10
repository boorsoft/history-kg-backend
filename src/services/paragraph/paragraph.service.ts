import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface Paragraph {
    id?: number;
    text: string;
    title: string;
    image: string;
}

@Injectable()
export class ParagraphService {
    constructor(private readonly prisma: PrismaService) {}
    
    async getParagraphs() {
        return this.prisma.paragraph.findMany()
    }

    async getParagraph(id: number) {
        return this.prisma.paragraph.findUnique({
            where: {
                id
            }
        })
    }

    async createParagraph({text, title, image}: Paragraph) {
        return this.prisma.paragraph.create({
            data: {
                title,
                text,
                image
            }
        })
    }
}
