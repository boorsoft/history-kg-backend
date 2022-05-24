import { Controller, Post, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController { 
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Req() req) {
        return this.authService.login(req.body.username, req.body.password);
    }

    @Post('/signup')
    signup(@Req() req) {
        return this.authService.signup(req.body);
    }

    @Post('/logout')
    logout() {
        return this.authService.logout();
    }
}