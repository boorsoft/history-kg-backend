import { Injectable } from '@nestjs/common';
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
        bcrypt.compare(password, user.password).then((err, same) => {
            if (same) {
                const token = this.jwtService.sign({ id: user.id, username });

                return {
                    message: 'Authorization successful!',
                    token: token,
                    user: {
                        username: user.username,
                        email: user.email,
                    },
                };
            }
        });
    }

    async signup(user: User) {
        try {
            await bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) throw Error('An error occured while creating');

                this.userService.createUser({
                    ...user,
                    password: hash,
                    isAdmin: false
                });

                return {
                    message: 'User created successfully!',
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                };
            });
        } catch (error) {
            return {
                message: error.message,
            };
        }
    }

    logout() {}
}
