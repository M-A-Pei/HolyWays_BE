import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'lib/prisma.service';
import { CloudinaryService } from 'lib/cloudinary.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CloudinaryService],
})
export class UsersModule { }
