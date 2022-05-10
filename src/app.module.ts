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

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MorganModule,
        UserModule,
    ],
    controllers: [AppController, QuizController, ParagraphController],
    providers: [QuizService, PrismaService, ParagraphService, PersonService],
})
export class AppModule {}
