import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { PrismaService } from 'lib/prisma.service';
import { CloudinaryService } from 'lib/cloudinary.service';

@Module({
  controllers: [FundController],
  providers: [FundService, PrismaService, CloudinaryService],
})
export class FundModule { }
