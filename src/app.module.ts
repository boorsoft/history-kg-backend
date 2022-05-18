import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { PrismaService } from './services/prisma.service';
import { QuizService } from './services/quiz/quiz.service';
import { QuizController } from './controllers/quiz/quiz.controller';
import { UserModule } from './controllers/user/user.module';
import { ParagraphService } from './services/paragraph/paragraph.service';
import { PersonService } from './services/person/person.service';
import { join } from 'path';
import { ParagraphController } from './controllers/paragraph/paragraph.controller';
import { MorganModule } from 'nest-morgan';
import { PersonController } from './controllers/person/person.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MorganModule,
        UserModule,
    ],
    controllers: [AppController, QuizController, ParagraphController, PersonController, AuthController],
    providers: [QuizService, PrismaService, ParagraphService, PersonService, AuthService],
})
export class AppModule {}
