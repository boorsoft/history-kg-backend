import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/services/user/user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
