import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { QuizService } from './resources/quiz/quiz.service';
import { QuizController } from './resources/quiz/quiz.controller';
import { UserModule } from './resources/user/user.module';
import { PersonService } from './resources/person/person.service';
import { join } from 'path';
import { MorganModule } from 'nest-morgan';
import { PersonController } from './resources/person/person.controller';
import { AuthController } from './resources/auth/auth.controller';
import { AuthService } from './resources/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './resources/strategies/jwt.strategy';
import { UserService } from './resources/user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BookController } from './resources/book/book.controller';
import { BookService } from './resources/book/book.service';
import { SubjectController } from './resources/subject/subject.controller';
import { SubjectService } from './resources/subject/subject.service';
import { ArticleController } from './resources/article/article.controller';
import { ArticleService } from './resources/article/article.service';
import { SearchController } from './resources/search/search.controller';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MorganModule,
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '30d',
            },
        }),
    ],
    controllers: [
        AppController,
        QuizController,
        PersonController,
        AuthController,
        BookController,
        SubjectController,
        ArticleController,
        SearchController,
    ],
    providers: [
        QuizService,
        PrismaService,
        PersonService,
        UserService,
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
        BookService,
        SubjectService,
        ArticleService,
    ],
})
export class AppModule {}
