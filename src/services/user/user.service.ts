import { Injectable } from '@nestjs/common';
import { User } from 'src/types/types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUser(username: string) {
        return this.prismaService.user.findFirst({
            where: {
                username,
            },
        });
    }

    async createUser(user: User) {
        return this.prismaService.user.create({
            data: user
        })
    }
}
