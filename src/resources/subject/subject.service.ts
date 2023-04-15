import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Subject } from 'src/types/types';

@Injectable()
export class SubjectService {
    constructor(private readonly prisma: PrismaService) {}

    async getSubjects() {
        return this.prisma.subject.findMany();
    }

    async getSubject(id: number) {
        return this.prisma.subject.findUnique({
            where: {
                id,
            },
        });
    }

    async createSubject({ title }: Subject) {
        return this.prisma.subject.create({
            data: {
                title,
            },
        });
    }

    async deleteSubject(id: number) {
        return this.prisma.subject.delete({
            where: {
                id,
            },
        });
    }
}
