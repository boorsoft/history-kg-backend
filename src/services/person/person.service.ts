import { Injectable } from '@nestjs/common';
import { Person } from 'src/types/types';
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

    async createPerson({ firstName, lastName, bio, image }: Person) {
        return this.prisma.person.create({
            data: {
                firstName,
                lastName, 
                bio,
                image
            }
        })
    }

    async updatePerson(id: number, {firstName, lastName, bio, image}: Person) {
        return this.prisma.person.update({
            where: {
                id
            },
            data: {
                firstName,
                lastName,
                bio,
                image
            }
        })
    }

    async deletePerson(id: number) {
        return this.prisma.person.delete({
            where: {
                id
            }
        })
    }
}
