import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './services/prisma.service';
import { QuizService } from './services/quiz/quiz.service';
import { QuizController } from './controllers/quiz/quiz.controller';
import { UserModule } from './controllers/user/user.module';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma'
import AdminJS from 'adminjs';

AdminJS.registerAdapter({Database, Resource})

@Module({
    imports: [
        UserModule,
        AdminModule.createAdmin({
            adminJsOptions: {
                rootPath: '/admin',
                resources: [],
            },
        }),
    ],
    controllers: [AppController, QuizController],
    providers: [QuizService, PrismaService],
})
export class AppModule {
  admin = new AdminJS({
    resources: [{
      resource: {}
    }]
  })
}
