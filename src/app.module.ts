import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';
import { ParagraphService } from './paragraph/paragraph.service';
import { PersonService } from './person/person.service';
import { join } from 'path';
import { ParagraphController } from './paragraph/paragraph.controller';
import { MorganModule } from 'nest-morgan';
import { PersonController } from './person/person.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MorganModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '30d'
            }
        })
    ],
    controllers: [AppController, QuizController, ParagraphController, PersonController, AuthController],
    providers: [QuizService, PrismaService, ParagraphService, PersonService, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
