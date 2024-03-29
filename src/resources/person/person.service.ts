import { Injectable } from '@nestjs/common';
import { Person } from 'src/types/types';
import { searchTransformForPrisma } from 'src/utils/utils';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PersonService {
    constructor(private readonly prisma: PrismaService) {}

    async getPersons(limit?: number) {
        if (limit) {
            return this.prisma.person.findMany({ take: limit });
        } else {
            return this.prisma.person.findMany();
        }
    }

    async getPerson(id: number) {
        return this.prisma.person.findUnique({
            where: {
                id,
            },
        });
    }

    async getPersonBySearch(searchValue: string) {
        return this.prisma.person.findMany({
            where: {
                OR: [
                    {
                        firstName: {
                            search: searchTransformForPrisma(searchValue),
                        },
                    },
                    {
                        lastName: {
                            search: searchTransformForPrisma(searchValue),
                        },
                    },
                ],
            },
        });
    }

    async createPerson({ firstName, lastName, bio, image, subjectId }: Person) {
        return this.prisma.person.create({
            data: {
                firstName,
                lastName,
                bio,
                image,
                Subject: {
                    connect: {
                        id: +subjectId,
                    },
                },
            },
        });
    }

    async updatePerson(
        id: number,
        { firstName, lastName, bio, image, subjectId }: Person,
    ) {
        return this.prisma.person.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
                bio,
                image,
                subjectId,
            },
        });
    }

    async deletePerson(id: number) {
        return this.prisma.person.delete({
            where: {
                id,
            },
        });
    }
}
