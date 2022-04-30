import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PersonService {
    constructor(private readonly prisma: PrismaService) {}

    async getPersons() {
        return this.prisma.person.findMany()
    }

    async getPerson(id: number) {
        return this.prisma.person.findUnique({
            where: {
                id
            }
        })
    }
}
