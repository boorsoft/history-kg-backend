import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(username: string, password: string) {
        const user = await this.userService.getUser(username);
        let token: string;

        if (!user) throw new NotFoundException('User not found');

        if (!user.isAdmin) throw new ForbiddenException('You are not an admin');

        await bcrypt.compare(password, user.password).then(async (result) => {
            if (result) {
                token = await this.jwtService.signAsync({
                    id: user.id,
                    username,
                });
            } else {
                throw new ForbiddenException('Password or user did not match');
            }
        });

        return {
            message: 'Authorization successful!',
            token: token,
            user: {
                id: user.id,
                username: user.username,
            },
        };
    }

    async signup(user: User) {
        if (!user.password)
            throw new BadRequestException('No password provided');

        const hash = await bcrypt.hash(user.password, 12);

        if (!hash)
            throw new BadRequestException(
                'An error occured while creating a user',
            );

        await this.userService
            .createUser({
                ...user,
                password: hash,
                isAdmin: false,
            })
            .catch((err) => {
                throw new BadRequestException(err.message);
            });

        return {
            message: 'User created successfully!',
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
}
