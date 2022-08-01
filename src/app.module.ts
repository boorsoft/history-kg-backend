import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';
import { UserModule } from './user/user.module';
import { PersonService } from './person/person.service';
import { join } from 'path';
import { MorganModule } from 'nest-morgan';
import { PersonController } from './person/person.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from './user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MorganModule,
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '30d'
            }
        })
    ],
    controllers: [AppController, QuizController, PersonController, AuthController, BookController],
    providers: [QuizService, PrismaService, PersonService, UserService, AuthService, JwtStrategy, JwtAuthGuard, BookService],
})
export class AppModule {}
