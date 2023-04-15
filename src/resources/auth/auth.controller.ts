import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() body: LoginDto) {
        console.log(body);

        if (!body.username || !body.password) {
            return new BadRequestException('Username or password not provided');
        }

        return this.authService.login(body.username, body.password);
    }

    @Post('/signup')
    signup(@Body() body) {
        return this.authService.signup(body);
    }
}
