import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
