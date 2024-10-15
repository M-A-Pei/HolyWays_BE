import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { PrismaService } from 'src/lib/prisma.service';
import { CloudinaryService } from 'src/lib/cloudinary.service';

@Module({
  controllers: [FundController],
  providers: [FundService, PrismaService, CloudinaryService],
})
export class FundModule { }
