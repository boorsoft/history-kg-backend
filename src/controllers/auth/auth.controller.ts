import { Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController { 
    constructor(private authService: AuthService) {}

    @Post('/login')
    login() {
        this.authService.login();
    }

    @Post('/signup')
    signup() {
        this.authService.signup();
    }

    @Post('/logout')
    logout() {
        this.authService.logout();
    }
}
